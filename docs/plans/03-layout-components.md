# Plan 03: Layout Components

**Duration**: Days 5-7
**Phase**: Foundation
**Prerequisites**: Plans 01-02 completed

---

## 🎯 Goals

- Build Header with responsive navigation
- Build Footer with links and contact info
- Create Mobile menu (hamburger)
- Implement Breadcrumbs component
- Setup Container component
- Create loading skeletons
- Build error boundaries
- Configure global styles and theme

---

## ✅ Prerequisites Check

- [ ] Plan 01 completed (Environment setup)
- [ ] Plan 02 completed (Strapi running with data)
- [ ] Shadcn/ui components installed
- [ ] Development server running

---

## 📋 Tasks Checklist

### Day 5: Global Layout & Theme

#### 5.1 Setup Theme Provider

Create `src/providers/theme-provider.tsx`:
```typescript
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

Update `src/app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/providers/theme-provider'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
})

const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Your Car Showroom'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description:
    'Chuyên mua bán xe ô tô chính hãng. Tư vấn, hỗ trợ trả góp, bảo hành chính hãng.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} ${roboto.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**✅ Verification**: Dark mode toggle works

#### 5.2 Create Container Component

Create `src/components/layout/Container.tsx`:
```typescript
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}
```

**✅ Verification**: Container centers content with proper padding

### Day 6: Header & Navigation

#### 6.1 Create Main Navigation Config

Update `src/config/navigation.ts` (already exists):
```typescript
export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: string
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items?: NavItem[]
}

export type MainNavItem = NavItemWithChildren

export const mainNav: MainNavItem[] = [
  {
    title: 'Trang chủ',
    href: '/',
  },
  {
    title: 'Xe ô tô',
    href: '/cars',
  },
  {
    title: 'Thương hiệu',
    href: '/brands',
  },
  {
    title: 'Tin tức',
    href: '/blog',
  },
  {
    title: 'Giới thiệu',
    href: '/about',
  },
  {
    title: 'Liên hệ',
    href: '/contact',
  },
]
```

#### 6.2 Create Header Component

Create `src/components/layout/Header.tsx`:
```typescript
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
```

#### 6.3 Create Desktop Navigation

Create `src/components/layout/MainNav.tsx`:
```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mainNav } from '@/config/navigation'
import { cn } from '@/lib/utils'

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex md:gap-6">
      {mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center text-sm font-medium transition-colors hover:text-primary',
            pathname === item.href
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
```

#### 6.4 Create Mobile Navigation

Create `src/components/layout/MobileNav.tsx`:
```typescript
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
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
```

**Note**: Install Sheet component if not already:
```bash
npx shadcn@latest add sheet
```

**✅ Verification**:
- Header appears on all pages
- Desktop navigation works
- Mobile menu opens/closes
- Active link highlighting works

### Day 7: Footer & Additional Components

#### 7.1 Create Footer Component

Create `src/components/layout/Footer.tsx`:
```typescript
import Link from 'next/link'
import { Container } from './Container'
import { siteConfig } from '@/config/site'
import { footerNav } from '@/config/navigation'
import { Separator } from '@/components/ui/separator'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/50">
      <Container>
        <div className="grid gap-8 py-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{siteConfig.name}</h3>
            <p className="text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Công ty</h3>
            <ul className="space-y-2">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Hỗ trợ</h3>
            <ul className="space-y-2">
              {footerNav.support.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-primary">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-muted-foreground">
                  {siteConfig.contact.address}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-muted-foreground">
                  {siteConfig.contact.workingHours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {siteConfig.company.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {footerNav.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
```

**✅ Verification**: Footer appears with all links and contact info

#### 7.2 Create Breadcrumbs Component

Create `src/components/layout/Breadcrumbs.tsx`:
```typescript
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  title: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
      <Link
        href="/"
        className="flex items-center text-muted-foreground hover:text-foreground"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={item.title} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            {isLast || !item.href ? (
              <span className="font-medium text-foreground">{item.title}</span>
            ) : (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {item.title}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
```

**✅ Verification**: Breadcrumbs display navigation path

#### 7.3 Create Loading Skeleton Components

Create `src/components/common/Loading.tsx`:
```typescript
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

export function LoadingDots() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
    </div>
  )
}
```

Create `src/components/common/CarCardSkeleton.tsx`:
```typescript
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

export function CarCardSkeleton() {
  return (
    <Card>
      <CardHeader className="p-0">
        <Skeleton className="h-48 w-full rounded-t-lg" />
      </CardHeader>
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="mt-2 h-4 w-1/2" />
        <Skeleton className="mt-4 h-8 w-full" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}
```

**✅ Verification**: Skeletons display while loading

#### 7.4 Create Error Boundary

Create `src/components/common/ErrorBoundary.tsx`:
```typescript
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
      <AlertCircle className="h-16 w-16 text-destructive" />
      <h2 className="mt-4 text-2xl font-bold">Something went wrong!</h2>
      <p className="mt-2 text-muted-foreground">
        {error.message || 'An unexpected error occurred'}
      </p>
      <Button onClick={reset} className="mt-6">
        Try again
      </Button>
    </div>
  )
}
```

Create `src/app/error.tsx`:
```typescript
'use client'

import { ErrorBoundary } from '@/components/common/ErrorBoundary'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <ErrorBoundary error={error} reset={reset} />
}
```

**✅ Verification**: Error boundary catches errors gracefully

#### 7.5 Update Root Page with Layout

Update `src/app/page.tsx`:
```typescript
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Container className="py-12">
          <h1 className="text-4xl font-bold">Welcome to Car Showroom</h1>
          <p className="mt-4 text-muted-foreground">
            Homepage content will be built in Plan 05
          </p>
        </Container>
      </main>
      <Footer />
    </>
  )
}
```

**✅ Verification**: Full layout appears with Header and Footer

---

## 🧪 Testing Criteria

Before moving to Plan 04:

- [ ] Header appears on all pages
- [ ] Navigation links work correctly
- [ ] Active link highlighting works
- [ ] Mobile menu opens and closes
- [ ] Footer displays with all information
- [ ] Breadcrumbs component works
- [ ] Loading skeletons render properly
- [ ] Error boundary catches errors
- [ ] Theme provider allows dark mode toggle
- [ ] Container centers content properly
- [ ] Responsive on mobile, tablet, desktop

---

## 📸 Expected Output

Visit http://localhost:3000 and verify:

```
┌────────────────────────────────────────┐
│  LOGO    Nav1  Nav2  Nav3   [Call] ☰  │ ← Header
├────────────────────────────────────────┤
│                                        │
│                                        │
│         Page Content Here              │ ← Main
│                                        │
│                                        │
├────────────────────────────────────────┤
│  Col1     Col2     Col3     Col4       │
│  Links    Links    Links    Contact    │ ← Footer
│                                        │
│  © 2026 Company Name                   │
└────────────────────────────────────────┘
```

---

## 🚨 Common Issues & Solutions

### Issue 1: Header Not Sticky
**Solution**: Ensure `sticky top-0 z-50` classes in Header

### Issue 2: Mobile Menu Not Opening
**Solution**: Install Sheet component:
```bash
npx shadcn@latest add sheet
```

### Issue 3: Dark Mode Not Working
**Solution**: Verify ThemeProvider wraps app in layout.tsx

### Issue 4: Footer Links 404
**Solution**: Pages will be created in later plans (expected)

---

## ✅ Completion Checklist

- [ ] ThemeProvider configured
- [ ] Container component created
- [ ] Header component with navigation
- [ ] Desktop navigation working
- [ ] Mobile navigation working
- [ ] Footer component with all sections
- [ ] Breadcrumbs component
- [ ] Loading skeletons
- [ ] Error boundary
- [ ] All components responsive
- [ ] Layout applied to root page

---

## ➡️ Next Steps

1. Mark Plan 03 as ✅ in `00-master-plan.md`
2. Commit changes:
```bash
git add .
git commit -m "feat: add layout components (Plan 03)"
```
3. Proceed to **Plan 04: API Integration**

---

**Status**: ⬜ Not Started
**Last Updated**: 2026-01-23
