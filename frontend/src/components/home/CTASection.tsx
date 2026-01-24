import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { Phone, MessageCircle } from 'lucide-react'

export function CTASection() {
  return (
    <section className="bg-primary py-16 text-primary-foreground md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Bạn Cần Tư Vấn?
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Đội ngũ tư vấn viên chuyên nghiệp sẵn sàng hỗ trợ bạn 24/7.
            Liên hệ ngay để được tư vấn miễn phí!
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="text-base"
              asChild
            >
              <a href={`tel:${siteConfig.contact.phone}`}>
                <Phone className="mr-2 h-5 w-5" />
                Gọi ngay: {siteConfig.contact.phone}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-base text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/lien-he">
                <MessageCircle className="mr-2 h-5 w-5" />
                Để lại thông tin
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-sm opacity-75">
            Giờ làm việc: {siteConfig.contact.workingHours}
          </p>
        </div>
      </Container>
    </section>
  )
}
