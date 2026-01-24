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
