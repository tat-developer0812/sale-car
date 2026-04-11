import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { TestDriveForm } from '@/components/forms/TestDriveForm'
import { siteConfig } from '@/config/site'
import { Car, CheckCircle, MapPin, Phone, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Đăng Ký Lái Thử Xe - Trải Nghiệm Miễn Phí Tại VuKia',
  description:
    'Đăng ký lái thử xe KIA, Mazda tại VuKia Gò Vấp hoàn toàn miễn phí. Lái thử tại showroom hoặc tại nhà. Liên hệ 0931 456 204.',
  alternates: { canonical: `${siteConfig.url}/dat-lich-lai-thu` },
  openGraph: {
    title: 'Đăng Ký Lái Thử Xe Miễn Phí - VuKia',
    description: 'Trải nghiệm lái thử xe KIA & Mazda tại VuKia Gò Vấp. Hoàn toàn miễn phí.',
    url: `${siteConfig.url}/dat-lich-lai-thu`,
  },
}

const benefits = [
  { icon: CheckCircle, text: 'Hoàn toàn miễn phí, không ràng buộc' },
  { icon: Car, text: 'Lái thử tại showroom hoặc tại nhà (nội thành)' },
  { icon: Clock, text: 'Đặt lịch linh hoạt từ 8:00 - 20:00 hàng ngày' },
  { icon: MapPin, text: 'KIA - MAZDA Gò Vấp, TP. Hồ Chí Minh' },
]

export default function TestDrivePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="border-b bg-muted/30 py-12 md:py-16">
          <Container>
            <Breadcrumbs items={[{ title: 'Đăng ký lái thử' }]} />
            <div className="mt-6 max-w-2xl">
              <h1 className="text-3xl font-bold md:text-4xl">
                Đăng Ký Lái Thử Xe Miễn Phí
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Trải nghiệm cảm giác lái trước khi quyết định mua. Đội ngũ VuKia sẽ hỗ trợ bạn tận tình.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {benefits.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-2 text-sm">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Form + Contact */}
        <section className="py-12">
          <Container>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <TestDriveForm carId={0} carName="" />
              </div>
              <aside className="space-y-4">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <h3 className="font-semibold">Liên hệ trực tiếp</h3>
                    <div className="space-y-3 text-sm">
                      <a
                        href={`tel:${siteConfig.contact.phone}`}
                        className="flex items-center gap-2 text-primary font-medium"
                      >
                        <Phone className="h-4 w-4" />
                        {siteConfig.contact.phone}
                      </a>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{siteConfig.contact.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 shrink-0" />
                        <span>{siteConfig.contact.workingHours}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">Quy trình lái thử</h3>
                    <ol className="space-y-2 text-sm">
                      {[
                        'Điền form đăng ký',
                        'Chuyên viên xác nhận lịch hẹn',
                        'Đến showroom hoặc chờ xe tới nhà',
                        'Lái thử và trải nghiệm',
                      ].map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                            {i + 1}
                          </span>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
