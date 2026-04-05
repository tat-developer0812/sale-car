'use client'

import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

export function ZaloButton() {
  const zaloUrl = siteConfig.links.zalo || `https://zalo.me/${siteConfig.contact.phone.replace(/\s/g, '')}`

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        size="lg"
        className="h-14 w-14 rounded-full bg-[#0068FF] shadow-2xl transition-transform hover:scale-110 hover:bg-[#0054CC]"
        asChild
      >
        <a
          href={zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat Zalo"
        >
          <svg viewBox="0 0 48 48" className="h-7 w-7" fill="currentColor">
            <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm10.09 28.04c-.169.43-.524.768-.965.922-.441.154-.926.096-1.32-.157l-6.45-4.13-3.256 3.256c-.39.39-1.024.39-1.414 0-.39-.39-.39-1.024 0-1.414l3.738-3.738-6.045-3.873c-.612-.392-.79-1.205-.398-1.817.392-.612 1.205-.79 1.817-.398l7.143 4.576 4.85-4.85c.39-.39 1.024-.39 1.414 0 .39.39.39 1.024 0 1.414l-4.368 4.368 5.254 3.367c.612.392.79 1.205.398 1.817-.087.136-.19.258-.308.362-.088.078-.183.148-.284.208l.194.087z"/>
          </svg>
          <span className="sr-only">Chat Zalo</span>
        </a>
      </Button>

      {/* Badge */}
      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white pointer-events-none">
        1
      </span>
    </div>
  )
}
