import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Phone, MessageCircle } from 'lucide-react'
import { HeroSearch } from './HeroSearch'
import { siteConfig } from '@/config/site'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-secondary/30 to-background py-16 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl">
            Tư Vấn Mua Xe{' '}
            <span className="text-accent">KIA & Mazda</span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl">Chính Hãng Tại Gò Vấp</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Chuyên tư vấn xe ô tô chính hãng với giá tốt nhất thị trường.
            Hỗ trợ trả góp lên đến 80%, bảo hành chính hãng toàn quốc.
          </p>

          {/* Trust indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-muted-foreground md:gap-6">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Đang hoạt động
            </span>
            <span className="hidden md:inline">|</span>
            <span>KIA - MAZDA Gò Vấp</span>
            <span className="hidden md:inline">|</span>
            <span>Trả góp 80%</span>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 sm:w-auto" asChild>
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}>
                <Phone className="mr-2 h-5 w-5" />
                Gọi ngay: {siteConfig.contact.phone}
              </a>
            </Button>
            <Button size="lg" variant="outline" className="w-full text-lg px-8 py-6 sm:w-auto" asChild>
              <a href={siteConfig.links.zalo} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Nhắn Zalo
              </a>
            </Button>
          </div>

          {/* Search Form */}
          <div className="mt-8">
            <HeroSearch />
          </div>

          {/* Quick Links */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href="/xe-o-to?brand=kia">Xe KIA</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/xe-o-to?brand=mazda">Xe Mazda</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/xe-o-to?category=sedan">Sedan</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/xe-o-to?category=suv">SUV</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/tra-gop">Trả góp</a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
