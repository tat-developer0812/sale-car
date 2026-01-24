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
