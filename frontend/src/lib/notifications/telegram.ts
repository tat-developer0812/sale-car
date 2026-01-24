import type { LeadData } from '@/app/api/leads/route'

const typeLabels: Record<string, string> = {
  contact: 'Liên hệ',
  'test-drive': 'Đăng ký lái thử',
  quote: 'Yêu cầu báo giá',
  'quick-contact': 'Tư vấn nhanh',
}

export async function sendTelegramNotification(lead: LeadData): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.warn('Telegram not configured, skipping notification')
    return
  }

  const typeLabel = typeLabels[lead.type] || lead.type
  const timeStr = new Date(lead.createdAt).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })

  let message = `
🔥 <b>LEAD MỚI - ${typeLabel.toUpperCase()}</b>

👤 <b>Họ tên:</b> ${lead.name || 'Chưa cung cấp'}
📱 <b>SĐT:</b> ${lead.phone}
📧 <b>Email:</b> ${lead.email || 'Chưa cung cấp'}
`.trim()

  if (lead.carName) {
    message += `\n🚗 <b>Xe quan tâm:</b> ${lead.carName}`
  }

  if (lead.type === 'test-drive') {
    message += `\n📅 <b>Ngày lái thử:</b> ${lead.preferredDate || 'Chưa chọn'}`
    message += `\n⏰ <b>Thời gian:</b> ${formatTime(lead.preferredTime)}`
    if (lead.location) {
      message += `\n📍 <b>Địa điểm:</b> ${lead.location === 'showroom' ? 'Tại Showroom' : 'Tại nhà'}`
    }
  }

  if (lead.type === 'quote') {
    if (lead.province) {
      message += `\n📍 <b>Tỉnh/TP:</b> ${lead.province}`
    }
    if (lead.paymentMethod) {
      message += `\n💳 <b>Thanh toán:</b> ${formatPayment(lead.paymentMethod)}`
    }
  }

  if (lead.subject) {
    message += `\n📋 <b>Chủ đề:</b> ${lead.subject}`
  }

  if (lead.message) {
    message += `\n💬 <b>Tin nhắn:</b> ${lead.message}`
  }

  message += `\n\n📍 <b>Nguồn:</b> ${lead.source}`
  message += `\n⏰ <b>Thời gian:</b> ${timeStr}`

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Telegram API error: ${error}`)
    }
  } catch (error) {
    console.error('Telegram notification failed:', error)
    throw error
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
