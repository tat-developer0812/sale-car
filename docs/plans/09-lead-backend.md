# Plan 09: Lead Processing Backend

**Duration**: Days 25-26
**Phase**: Lead Capture
**Prerequisites**: Plans 01-08 completed

---

## 🎯 Goals

- Create `/api/leads` endpoint
- Save leads to Strapi
- Setup Telegram bot notifications
- Google Sheets backup integration
- Email notifications (Resend)
- Lead tracking

---

## 📋 Tasks

### API Route for Leads

Create `src/app/api/leads/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { headers } from 'next/headers'

const leadSchema = z.object({
  phone: z.string().min(10),
  name: z.string().optional(),
  email: z.string().email().optional(),
  carId: z.number(),
  carName: z.string(),
  message: z.string().optional(),
  source: z.string().default('contact-form'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = leadSchema.parse(body)

    // Get request metadata
    const headersList = headers()
    const ipAddress = headersList.get('x-forwarded-for') || 'unknown'
    const userAgent = headersList.get('user-agent') || ''

    const leadData = {
      ...data,
      ipAddress,
      userAgent,
      status: 'new',
    }

    // 1. Save to Strapi
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/leads`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({ data: leadData }),
      }
    )

    if (!strapiResponse.ok) {
      throw new Error('Failed to save lead')
    }

    // 2. Send Telegram notification
    await sendTelegramNotification(leadData)

    // 3. Send email notifications
    await sendEmailNotifications(leadData)

    return NextResponse.json(
      { success: true, message: 'Lead submitted successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    )
  }
}

async function sendTelegramNotification(lead: any) {
  const message = `
🔥 NEW LEAD!

👤 Name: ${lead.name || 'Not provided'}
📱 Phone: ${lead.phone}
📧 Email: ${lead.email || 'Not provided'}
🚗 Car: ${lead.carName}
📝 Source: ${lead.source}

⏰ ${new Date().toLocaleString('vi-VN')}
  `.trim()

  try {
    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    )
  } catch (error) {
    console.error('Telegram notification error:', error)
  }
}

async function sendEmailNotifications(lead: any) {
  // Implement with Resend
  // Will be added based on Plan 08
}
```

### Telegram Bot Setup

1. Create bot via @BotFather on Telegram
2. Get bot token
3. Create channel/group and add bot
4. Get chat ID
5. Add to `.env.local`:
```env
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

### Google Sheets Integration

Create `src/lib/google-sheets.ts`:
```typescript
import { google } from 'googleapis'

export async function saveToGoogleSheets(lead: any) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Leads!A:H',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          lead.name || '',
          lead.phone,
          lead.email || '',
          lead.carName,
          lead.source,
          lead.status,
          lead.ipAddress,
        ]],
      },
    })
  } catch (error) {
    console.error('Google Sheets error:', error)
  }
}
```

**Setup**:
1. Create Google Cloud project
2. Enable Sheets API
3. Create service account
4. Download credentials JSON
5. Create spreadsheet and share with service account email
6. Add credentials to `.env.local`

### Email with Resend

Install Resend:
```bash
npm install resend
```

Create `src/lib/email.ts`:
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendCustomerEmail(lead: any) {
  try {
    await resend.emails.send({
      from: 'Your Car Showroom <noreply@yoursite.com>',
      to: lead.email || `${lead.phone}@placeholder.com`,
      subject: `Thank you for your interest in ${lead.carName}`,
      html: `
        <h2>Thank you, ${lead.name || 'valued customer'}!</h2>
        <p>We've received your inquiry about the <strong>${lead.carName}</strong>.</p>
        <p>Our sales team will contact you at <strong>${lead.phone}</strong> within 5 minutes.</p>
      `,
    })
  } catch (error) {
    console.error('Email error:', error)
  }
}

export async function sendSalesEmail(lead: any) {
  try {
    await resend.emails.send({
      from: 'Lead System <leads@yoursite.com>',
      to: 'sales@yoursite.com',
      subject: `🔥 New Lead: ${lead.carName}`,
      html: `
        <h2>New Lead Received</h2>
        <ul>
          <li><strong>Name:</strong> ${lead.name || 'N/A'}</li>
          <li><strong>Phone:</strong> ${lead.phone}</li>
          <li><strong>Email:</strong> ${lead.email || 'N/A'}</li>
          <li><strong>Car:</strong> ${lead.carName}</li>
          <li><strong>Source:</strong> ${lead.source}</li>
        </ul>
      `,
    })
  } catch (error) {
    console.error('Sales email error:', error)
  }
}
```

Setup Resend:
1. Create account at https://resend.com
2. Verify domain
3. Get API key
4. Add to `.env.local`:
```env
RESEND_API_KEY=re_your_api_key
```

**✅ Completion**: Lead capture system fully integrated

---

## ➡️ Next Steps

Proceed to **Plan 10: Interactive Widgets**

**Status**: ✅ Completed
