import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { ContactForm } from '@/components/forms/ContactForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Liên Hệ',
  description: 'Liên hệ với chúng tôi để được tư vấn mua xe, đặt lịch lái thử, hoặc yêu cầu báo giá. Đội ngũ tư vấn viên sẵn sàng hỗ trợ bạn.',
}

const contactInfo = [
  {
    icon: MapPin,
    title: 'Địa chỉ Showroom',
    content: '123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh',
  },
  {
    icon: Phone,
    title: 'Hotline',
    content: '1900 1234',
    subContent: 'Miễn phí cuộc gọi',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'contact@salecar.vn',
  },
  {
    icon: Clock,
    title: 'Giờ làm việc',
    content: 'Thứ 2 - Thứ 7: 8:00 - 20:00',
    subContent: 'Chủ nhật: 8:00 - 17:00',
  },
]

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Container className="py-8">
          <Breadcrumbs items={[{ title: 'Liên Hệ' }]} />

          <div className="mt-6">
            <h1 className="text-3xl font-bold">Liên Hệ</h1>
            <p className="mt-2 text-muted-foreground">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ ngay!
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Contact Info */}
            <aside className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin liên hệ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{info.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {info.content}
                        </p>
                        {info.subContent && (
                          <p className="text-sm text-muted-foreground">
                            {info.subContent}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Map placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Bản đồ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0242440251384!2d106.69938831533417!3d10.727960292355604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x8e7c3d0c5b8b8b8b!2zMTIzIMSQxrDhu51uZyBOZ3V54buFbiBWxINuIExpbmgsIFTDom4gUGjDuiwgUXXhuq1uIDcsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: '200px' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
