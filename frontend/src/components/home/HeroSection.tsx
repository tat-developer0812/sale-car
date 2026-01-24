'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export function HeroSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/xe-o-to?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-20 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Tìm Chiếc Xe <span className="text-primary">Hoàn Hảo</span> Cho Bạn
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Khám phá bộ sưu tập xe hơi đa dạng với giá cả cạnh tranh.
            Hỗ trợ trả góp lên đến 80%, bảo hành chính hãng.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mt-10 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Tìm kiếm theo tên xe, hãng xe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-10 text-base"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8">
              Tìm kiếm
            </Button>
          </form>

          {/* Quick Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href="/xe-o-to?category=sedan">Sedan</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/xe-o-to?category=suv">SUV</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/xe-o-to?category=mpv">MPV</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/xe-o-to?fuelType=electric">Xe điện</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/xe-o-to?fuelType=hybrid">Xe Hybrid</a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
