import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { headers } from 'next/headers'
import { sendTelegramNotification } from '@/lib/notifications/telegram'
import { saveToGoogleSheets } from '@/lib/notifications/google-sheets'
import { sendLeadEmails } from '@/lib/notifications/email'

const leadSchema = z.object({
  // Required fields
  phone: z.string().min(10),

  // Optional fields
  name: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  carId: z.number().optional(),
  carName: z.string().optional(),
  message: z.string().optional(),
  source: z.string().default('website'),
  type: z.enum(['contact', 'test-drive', 'quote', 'quick-contact']).default('contact'),

  // Test drive specific
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  location: z.string().optional(),

  // Quote specific
  province: z.string().optional(),
  paymentMethod: z.string().optional(),

  // Contact specific
  subject: z.string().optional(),
})

export type LeadData = z.infer<typeof leadSchema> & {
  ipAddress: string
  userAgent: string
  status: string
  createdAt: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = leadSchema.parse(body)

    // Get request metadata
    const headersList = await headers()
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
    const userAgent = headersList.get('user-agent') || ''

    const leadData: LeadData = {
      ...data,
      ipAddress,
      userAgent,
      status: 'new',
      createdAt: new Date().toISOString(),
    }

    // Run all notifications in parallel (don't let one failure block others)
    const results = await Promise.allSettled([
      // 1. Save to Strapi (if configured)
      saveToStrapi(leadData),

      // 2. Send Telegram notification
      sendTelegramNotification(leadData),

      // 3. Save to Google Sheets backup
      saveToGoogleSheets(leadData),

      // 4. Send email notifications
      sendLeadEmails(leadData),
    ])

    // Log any failures but don't fail the request
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        const services = ['Strapi', 'Telegram', 'Google Sheets', 'Email']
        console.error(`${services[index]} notification failed:`, result.reason)
      }
    })

    // Check if at least Strapi save was successful
    const strapiResult = results[0]
    if (strapiResult.status === 'rejected') {
      // If Strapi failed but we have backup (Telegram or Sheets), still return success
      const hasBackup = results.slice(1).some(r => r.status === 'fulfilled')
      if (!hasBackup) {
        throw new Error('Failed to save lead to any system')
      }
    }

    return NextResponse.json(
      { success: true, message: 'Lead submitted successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Lead submission error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    )
  }
}

async function saveToStrapi(lead: LeadData): Promise<void> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL
  const strapiToken = process.env.STRAPI_API_TOKEN

  if (!strapiUrl || !strapiToken) {
    console.warn('Strapi not configured, skipping save')
    return
  }

  const response = await fetch(`${strapiUrl}/api/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${strapiToken}`,
    },
    body: JSON.stringify({
      data: {
        name: lead.name || null,
        phone: lead.phone,
        email: lead.email || null,
        carId: lead.carId || null,
        carName: lead.carName || null,
        message: lead.message || null,
        source: lead.source,
        type: lead.type,
        status: lead.status,
        ipAddress: lead.ipAddress,
        userAgent: lead.userAgent,
        metadata: {
          preferredDate: lead.preferredDate,
          preferredTime: lead.preferredTime,
          location: lead.location,
          province: lead.province,
          paymentMethod: lead.paymentMethod,
          subject: lead.subject,
        },
      },
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Strapi save failed: ${error}`)
  }
}
