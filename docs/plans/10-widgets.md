# Plan 10: Interactive Widgets

**Duration**: Days 27-28
**Phase**: Lead Capture
**Prerequisites**: Plans 01-09 completed

---

## 🎯 Goals

- Floating phone button
- Sticky contact modal
- WhatsApp button
- Exit intent popup
- Mobile bottom bar

---

## 📋 Tasks

### Floating Phone Button

Create `src/components/widgets/FloatingPhone.tsx`:
```typescript
'use client'

import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

export function FloatingPhone() {
  return (
    <a
      href={`tel:${siteConfig.contact.phone}`}
      className="fixed bottom-24 right-6 z-50 md:bottom-6"
      aria-label="Call us"
    >
      <Button
        size="lg"
        className="h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-transform bg-green-500 hover:bg-green-600"
      >
        <Phone className="h-6 w-6" />
      </Button>
    </a>
  )
}
```

### Sticky Contact Modal

Create `src/components/widgets/StickyContactModal.tsx`:
```typescript
'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { QuickContact } from '@/components/forms/QuickContact'

export function StickyContactModal({ car }: { car?: any }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-24 z-50 h-14 w-14 rounded-full shadow-2xl"
        size="lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Get Expert Advice</DialogTitle>
          </DialogHeader>
          <QuickContact carId={car?.id || 0} carName={car?.name || 'General'} />
        </DialogContent>
      </Dialog>
    </>
  )
}
```

### Exit Intent Popup

Create `src/components/widgets/ExitIntent.tsx`:
```typescript
'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { QuickContact } from '@/components/forms/QuickContact'

export function ExitIntent({ car }: { car?: any }) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('exitIntentShown')) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }
    }

    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }
    }, 30000)

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timer)
    }
  }, [hasShown])

  return (
    <Dialog open={isVisible} onOpenChange={setIsVisible}>
      <DialogContent className="sm:max-w-lg">
        <div className="text-center">
          <div className="text-6xl mb-4">🚗</div>
          <h2 className="text-3xl font-bold text-red-600 mb-3">
            Wait! Don't Miss Out!
          </h2>
          <p className="text-lg mb-4">
            Special offer - Save up to $4,000 + Free insurance for 1 year
          </p>
        </div>
        <QuickContact carId={car?.id || 0} carName={car?.name || 'General'} />
      </DialogContent>
    </Dialog>
  )
}
```

### WhatsApp Button

Create `src/components/widgets/WhatsAppButton.tsx`:
```typescript
'use client'

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function WhatsAppButton() {
  const phoneNumber = '84909123456' // Replace with actual number
  const message = 'Hi, I would like to inquire about a car'

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50"
    >
      <Button
        size="lg"
        className="h-14 w-14 rounded-full shadow-2xl bg-[#25D366] hover:bg-[#20BA5A]"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </a>
  )
}
```

### Add to Layout

Update `src/app/layout.tsx`:
```typescript
import { FloatingPhone } from '@/components/widgets/FloatingPhone'
import { StickyContactModal } from '@/components/widgets/StickyContactModal'
import { WhatsAppButton } from '@/components/widgets/WhatsAppButton'

// Inside body
<ThemeProvider>
  <QueryProvider>
    {children}
    <FloatingPhone />
    <StickyContactModal />
    <WhatsAppButton />
    <Toaster />
  </QueryProvider>
</ThemeProvider>
```

**✅ Completion**: All widgets interactive and working

---

## ➡️ Next Steps

Proceed to **Plan 11: SEO Implementation**

**Status**: ⬜ Not Started
