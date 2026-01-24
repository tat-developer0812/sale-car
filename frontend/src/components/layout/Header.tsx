'use client'

import Link from 'next/link'
import { Container } from './Container'
import { MainNav } from './MainNav'
import { MobileNav } from './MobileNav'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'
import { siteConfig } from '@/config/site'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <MainNav />

          {/* Call Button */}
          <div className="flex items-center gap-4">
            <a href={`tel:${siteConfig.contact.phone}`}>
              <Button size="sm" className="hidden md:flex">
                <Phone className="mr-2 h-4 w-4" />
                {siteConfig.contact.phone}
              </Button>
            </a>

            {/* Mobile Menu */}
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  )
}
