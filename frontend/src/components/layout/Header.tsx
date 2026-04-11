import Link from 'next/link'
import { Container } from './Container'
import { MainNav } from './MainNav'
import { MobileNav } from './MobileNav'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { ThemeToggle } from '@/components/common/ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label={`${siteConfig.name} - Trang chủ`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt={siteConfig.name}
              width={150}
              height={37}
              className="h-9 w-auto"
              fetchPriority="high"
            />
          </Link>

          {/* Desktop Navigation */}
          <MainNav />

          {/* Call Button */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button size="sm" className="hidden md:flex" asChild>
              <a href={`tel:${siteConfig.contact.phone}`}>
                <Phone className="mr-2 h-4 w-4" />
                {siteConfig.contact.phone}
              </a>
            </Button>

            {/* Mobile Menu */}
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  )
}
