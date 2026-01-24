'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, MessageSquare, Car, FileText, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { siteConfig } from '@/config/site'

const navItems = [
  {
    icon: Phone,
    label: 'Gọi ngay',
    href: `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`,
    color: 'text-green-600',
    external: true,
  },
  {
    icon: MessageSquare,
    label: 'Zalo',
    href: `https://zalo.me/${siteConfig.links.zalo || siteConfig.contact.phone.replace(/\s/g, '')}`,
    color: 'text-blue-600',
    external: true,
  },
  {
    icon: Car,
    label: 'Xe ô tô',
    href: '/xe-o-to',
    color: 'text-primary',
  },
  {
    icon: FileText,
    label: 'Tin tức',
    href: '/tin-tuc',
    color: 'text-orange-600',
  },
]

const menuItems = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Xe ô tô', href: '/xe-o-to' },
  { label: 'Tin tức', href: '/tin-tuc' },
  { label: 'Liên hệ', href: '/lien-he' },
]

export function MobileBottomBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background md:hidden">
      <div className="grid grid-cols-5 divide-x">
        {navItems.map((item) => {
          const Icon = item.icon
          const Component = item.external ? 'a' : Link

          return (
            <Component
              key={item.label}
              href={item.href}
              {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex flex-col items-center justify-center py-2"
            >
              <Icon className={`h-5 w-5 ${item.color}`} />
              <span className="mt-1 text-[10px]">{item.label}</span>
            </Component>
          )
        })}

        {/* Menu button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center py-2">
              <Menu className="h-5 w-5 text-muted-foreground" />
              <span className="mt-1 text-[10px]">Menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-4 grid gap-2">
              {menuItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="justify-start"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </nav>
            <div className="mt-6 border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Hotline: <strong>{siteConfig.contact.phone}</strong>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {siteConfig.contact.workingHours}
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
