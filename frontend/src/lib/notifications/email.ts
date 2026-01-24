import type { LeadData } from '@/app/api/leads/route'

const typeLabels: Record<string, string> = {
  contact: 'Liên hệ',
  'test-drive': 'Đăng ký lái thử',
  quote: 'Yêu cầu báo giá',
  'quick-contact': 'Tư vấn nhanh',
}

export async function sendLeadEmails(lead: LeadData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const salesEmail = process.env.SALES_EMAIL || 'sales@example.com'
  const fromEmail = process.env.FROM_EMAIL || 'noreply@example.com'
  const fromName = process.env.FROM_NAME || 'Sale Car'

  if (!apiKey) {
    console.warn('Resend not configured, skipping email')
    return
  }

  // Send both emails in parallel
  await Promise.all([
    sendSalesNotification(lead, { apiKey, salesEmail, fromEmail, fromName }),
    sendCustomerConfirmation(lead, { apiKey, fromEmail, fromName }),
  ])
}

interface EmailConfig {
  apiKey: string
  salesEmail?: string
  fromEmail: string
  fromName: string
}

async function sendSalesNotification(
  lead: LeadData,
  config: EmailConfig
): Promise<void> {
  const { apiKey, salesEmail, fromEmail, fromName } = config

  if (!salesEmail) return

  const typeLabel = typeLabels[lead.type] || lead.type
  const timeStr = new Date(lead.createdAt).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .field { margin-bottom: 12px; }
    .label { font-weight: bold; color: #374151; }
    .value { color: #1f2937; }
    .footer { text-align: center; padding: 16px; color: #6b7280; font-size: 12px; }
    .highlight { background: #fef3c7; padding: 12px; border-radius: 4px; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">🔥 Lead Mới - ${typeLabel}</h1>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Họ tên:</span>
        <span class="value">${lead.name || 'Chưa cung cấp'}</span>
      </div>
      <div class="field">
        <span class="label">Số điện thoại:</span>
        <span class="value"><strong>${lead.phone}</strong></span>
      </div>
      <div class="field">
        <span class="label">Email:</span>
        <span class="value">${lead.email || 'Chưa cung cấp'}</span>
      </div>
      ${lead.carName ? `
      <div class="field">
        <span class="label">Xe quan tâm:</span>
        <span class="value">${lead.carName}</span>
      </div>
      ` : ''}
      ${lead.type === 'test-drive' ? `
      <div class="field">
        <span class="label">Ngày lái thử:</span>
        <span class="value">${lead.preferredDate || 'Chưa chọn'}</span>
      </div>
      <div class="field">
        <span class="label">Thời gian:</span>
        <span class="value">${formatTime(lead.preferredTime)}</span>
      </div>
      ${lead.location ? `
      <div class="field">
        <span class="label">Địa điểm:</span>
        <span class="value">${lead.location === 'showroom' ? 'Tại Showroom' : 'Tại nhà'}</span>
      </div>
      ` : ''}
      ` : ''}
      ${lead.type === 'quote' ? `
      ${lead.province ? `
      <div class="field">
        <span class="label">Tỉnh/TP:</span>
        <span class="value">${lead.province}</span>
      </div>
      ` : ''}
      ${lead.paymentMethod ? `
      <div class="field">
        <span class="label">Hình thức thanh toán:</span>
        <span class="value">${formatPayment(lead.paymentMethod)}</span>
      </div>
      ` : ''}
      ` : ''}
      ${lead.message ? `
      <div class="field">
        <span class="label">Tin nhắn:</span>
        <span class="value">${lead.message}</span>
      </div>
      ` : ''}
      <div class="highlight">
        <div class="field">
          <span class="label">Nguồn:</span>
          <span class="value">${lead.source}</span>
        </div>
        <div class="field">
          <span class="label">Thời gian:</span>
          <span class="value">${timeStr}</span>
        </div>
      </div>
    </div>
    <div class="footer">
      Vui lòng liên hệ khách hàng trong vòng 5 phút
    </div>
  </div>
</body>
</html>
  `.trim()

  await sendEmail({
    apiKey,
    from: `${fromName} <${fromEmail}>`,
    to: salesEmail,
    subject: `🔥 Lead Mới: ${typeLabel} - ${lead.phone}`,
    html,
  })
}

async function sendCustomerConfirmation(
  lead: LeadData,
  config: EmailConfig
): Promise<void> {
  const { apiKey, fromEmail, fromName } = config

  // Only send if customer provided email
  if (!lead.email) return

  const typeLabel = typeLabels[lead.type] || lead.type

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1e40af; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .footer { text-align: center; padding: 16px; color: #6b7280; font-size: 12px; }
    .button { display: inline-block; background: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">Cảm ơn bạn đã liên hệ!</h1>
    </div>
    <div class="content">
      <p>Xin chào <strong>${lead.name || 'Quý khách'}</strong>,</p>

      <p>Chúng tôi đã nhận được yêu cầu <strong>${typeLabel.toLowerCase()}</strong> của bạn${lead.carName ? ` về xe <strong>${lead.carName}</strong>` : ''}.</p>

      <p>Đội ngũ tư vấn viên sẽ liên hệ với bạn qua số điện thoại <strong>${lead.phone}</strong> trong thời gian sớm nhất (thường trong vòng 5 phút trong giờ làm việc).</p>

      ${lead.type === 'test-drive' && lead.preferredDate ? `
      <p>📅 Lịch hẹn lái thử dự kiến: <strong>${lead.preferredDate}</strong> - ${formatTime(lead.preferredTime)}</p>
      ` : ''}

      <p>Nếu cần hỗ trợ gấp, vui lòng gọi Hotline: <strong>1900 1234</strong></p>

      <p>Trân trọng,<br><strong>${fromName}</strong></p>
    </div>
    <div class="footer">
      Email này được gửi tự động, vui lòng không trả lời trực tiếp.
    </div>
  </div>
</body>
</html>
  `.trim()

  await sendEmail({
    apiKey,
    from: `${fromName} <${fromEmail}>`,
    to: lead.email,
    subject: `Xác nhận ${typeLabel.toLowerCase()} - ${fromName}`,
    html,
  })
}

interface SendEmailParams {
  apiKey: string
  from: string
  to: string
  subject: string
  html: string
}

async function sendEmail(params: SendEmailParams): Promise<void> {
  const { apiKey, from, to, subject, html } = params

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Resend API error: ${error}`)
  }
}

function formatTime(time?: string): string {
  switch (time) {
    case 'morning':
      return 'Buổi sáng (8h-12h)'
    case 'afternoon':
      return 'Buổi chiều (12h-17h)'
    case 'evening':
      return 'Buổi tối (17h-20h)'
    default:
      return 'Chưa chọn'
  }
}

function formatPayment(method?: string): string {
  switch (method) {
    case 'cash':
      return 'Thanh toán một lần'
    case 'loan':
      return 'Trả góp ngân hàng'
    case 'undecided':
      return 'Chưa quyết định'
    default:
      return 'Chưa chọn'
  }
}
