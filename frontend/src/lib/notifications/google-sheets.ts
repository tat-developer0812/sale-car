import type { LeadData } from '@/app/api/leads/route'

interface GoogleSheetsCredentials {
  type: string
  project_id: string
  private_key_id: string
  private_key: string
  client_email: string
  client_id: string
  auth_uri: string
  token_uri: string
  auth_provider_x509_cert_url: string
  client_x509_cert_url: string
}

const typeLabels: Record<string, string> = {
  contact: 'Liên hệ',
  'test-drive': 'Lái thử',
  quote: 'Báo giá',
  'quick-contact': 'Tư vấn nhanh',
}

export async function saveToGoogleSheets(lead: LeadData): Promise<void> {
  const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  const spreadsheetId = process.env.GOOGLE_SHEET_ID

  if (!credentialsJson || !spreadsheetId) {
    console.warn('Google Sheets not configured, skipping save')
    return
  }

  try {
    const credentials: GoogleSheetsCredentials = JSON.parse(credentialsJson)
    const accessToken = await getAccessToken(credentials)

    const timeStr = new Date(lead.createdAt).toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
    })

    // Prepare row data
    const rowData = [
      timeStr,                                    // A: Thời gian
      typeLabels[lead.type] || lead.type,        // B: Loại
      lead.name || '',                            // C: Họ tên
      lead.phone,                                 // D: SĐT
      lead.email || '',                           // E: Email
      lead.carName || '',                         // F: Xe quan tâm
      lead.province || '',                        // G: Tỉnh/TP
      formatPayment(lead.paymentMethod),          // H: Thanh toán
      lead.preferredDate || '',                   // I: Ngày lái thử
      formatTime(lead.preferredTime),             // J: Thời gian
      lead.message || '',                         // K: Tin nhắn
      lead.source,                                // L: Nguồn
      lead.status,                                // M: Trạng thái
      lead.ipAddress,                             // N: IP
    ]

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Leads!A:N:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [rowData],
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Google Sheets API error: ${error}`)
    }
  } catch (error) {
    console.error('Google Sheets save failed:', error)
    throw error
  }
}

async function getAccessToken(credentials: GoogleSheetsCredentials): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const expiry = now + 3600 // 1 hour

  // Create JWT header and claim
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  }

  const claim = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: credentials.token_uri,
    exp: expiry,
    iat: now,
  }

  // Encode header and claim
  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedClaim = base64UrlEncode(JSON.stringify(claim))
  const signatureInput = `${encodedHeader}.${encodedClaim}`

  // Sign with private key
  const signature = await signWithPrivateKey(signatureInput, credentials.private_key)
  const jwt = `${signatureInput}.${signature}`

  // Exchange JWT for access token
  const response = await fetch(credentials.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Token exchange failed: ${error}`)
  }

  const data = await response.json()
  return data.access_token
}

async function signWithPrivateKey(data: string, privateKey: string): Promise<string> {
  // Convert PEM to ArrayBuffer
  const pemContents = privateKey
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\n/g, '')

  const binaryKey = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0))

  // Import the key
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  )

  // Sign the data
  const encoder = new TextEncoder()
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    encoder.encode(data)
  )

  return base64UrlEncode(signature)
}

function base64UrlEncode(data: string | ArrayBuffer): string {
  let base64: string

  if (typeof data === 'string') {
    base64 = btoa(data)
  } else {
    const bytes = new Uint8Array(data)
    let binary = ''
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    base64 = btoa(binary)
  }

  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function formatTime(time?: string): string {
  switch (time) {
    case 'morning':
      return 'Sáng'
    case 'afternoon':
      return 'Chiều'
    case 'evening':
      return 'Tối'
    default:
      return ''
  }
}

function formatPayment(method?: string): string {
  switch (method) {
    case 'cash':
      return 'Một lần'
    case 'loan':
      return 'Trả góp'
    case 'undecided':
      return 'Chưa quyết định'
    default:
      return ''
  }
}
