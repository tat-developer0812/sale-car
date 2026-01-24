'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { mainNav } from '@/config/navigation'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="md:hidden"
          size="icon"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pr-0">
        <div className="flex flex-col gap-6 p-6">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <span className="text-xl font-bold">{siteConfig.name}</span>
          </Link>

          <nav className="flex flex-col gap-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center text-base font-medium transition-colors hover:text-primary',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="border-t pt-6">
            <a href={`tel:${siteConfig.contact.phone}`}>
              <Button className="w-full">
                Gọi ngay: {siteConfig.contact.phone}
              </Button>
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
