'use client'

import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

export function FloatingPhone() {
  // Format phone number for tel: link (remove spaces)
  const phoneNumber = siteConfig.contact.phone.replace(/\s/g, '')

  return (
    <a
      href={`tel:${phoneNumber}`}
      className="fixed bottom-24 right-6 z-50 md:bottom-6"
      aria-label="Gọi điện ngay"
    >
      <Button
        size="lg"
        className="h-14 w-14 rounded-full bg-green-500 shadow-2xl transition-transform hover:scale-110 hover:bg-green-600"
      >
        <Phone className="h-6 w-6" />
        <span className="sr-only">Gọi điện: {siteConfig.contact.phone}</span>
      </Button>

      {/* Pulsing animation */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-green-500 opacity-75" />
    </a>
  )
}
