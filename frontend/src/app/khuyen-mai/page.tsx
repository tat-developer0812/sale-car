import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { siteConfig } from '@/config/site'
import { Phone, Gift, CreditCard, Truck, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Khuyến Mãi Xe Ô Tô - Ưu Đãi Đặc Biệt Tại VuKia',
  description:
    'Chương trình khuyến mãi xe ô tô hấp dẫn tại VuKia. Giảm giá lên đến 100 triệu, tặng phụ kiện, hỗ trợ trả góp 0% lãi suất. Liên hệ ngay!',
  alternates: {
    canonical: `${siteConfig.url}/khuyen-mai`,
  },
}

const promotions = [
  {
    icon: Gift,
    title: 'Giảm giá lên đến 100 triệu',
    description: 'Áp dụng cho nhiều dòng xe phổ biến. Giá ưu đãi nhất thị trường khi mua xe tại VuKia.',
  },
  {
    icon: CreditCard,
    title: 'Trả góp 0% lãi suất',
    description: 'Chương trình trả góp 0% lãi suất trong 12 tháng đầu, áp dụng cho một số dòng xe nhất định.',
  },
  {
    icon: Truck,
    title: 'Miễn phí giao xe tận nơi',
    description: 'Giao xe miễn phí trên toàn quốc. Xe được vận chuyển bằng xe chuyên dụng đảm bảo an toàn.',
  },
  {
    icon: Shield,
    title: 'Tặng gói bảo hiểm 1 năm',
    description: 'Tặng bảo hiểm thân vỏ 1 năm trị giá lên đến 15 triệu đồng khi mua xe tại VuKia.',
  },
]

export default function KhuyenMaiPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-accent/10 via-background to-secondary/20 py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Ưu đãi có hạn
              </p>
              <h1 className="mt-4 text-3xl font-bold text-primary md:text-5xl">
                Khuyến Mãi Đặc Biệt Tại VuKia
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Cơ hội sở hữu xe ô tô trong mơ với mức giá ưu đãi nhất. Chương trình có thời hạn, liên hệ ngay để không bỏ lỡ!
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6" asChild>
                  <a href={`tel:${siteConfig.contact.hotline}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Gọi ngay: {siteConfig.contact.hotline}
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                  <a href="/lien-he">
                    Đăng ký nhận ưu đãi
                  </a>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Promotions */}
        <section className="py-16">
          <Container>
            <div className="grid gap-8 md:grid-cols-2">
              {promotions.map((promo) => (
                <Card key={promo.title} className="border-accent/20">
                  <CardContent className="flex gap-4 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <promo.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{promo.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{promo.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16 text-primary-foreground">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold">Đừng Bỏ Lỡ Cơ Hội!</h2>
              <p className="mt-4 text-lg opacity-90">
                Liên hệ VuKia ngay hôm nay để nhận tư vấn và báo giá tốt nhất.
              </p>
              <Button size="lg" variant="secondary" className="mt-8 text-lg px-8 py-6" asChild>
                <a href={`tel:${siteConfig.contact.phone}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {siteConfig.contact.phone}
                </a>
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
