import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { Phone, MessageCircle, MapPin, Award, Clock, Shield } from 'lucide-react'

const highlights = [
  {
    icon: Award,
    title: 'Chuyên Gia KIA & Mazda',
    description: 'Nhiều năm kinh nghiệm tư vấn xe KIA và Mazda, am hiểu từng dòng xe.',
  },
  {
    icon: Shield,
    title: 'Giá Tốt Nhất',
    description: 'Cam kết mức giá cạnh tranh nhất thị trường, không phát sinh chi phí ẩn.',
  },
  {
    icon: Clock,
    title: 'Hỗ Trợ 24/7',
    description: 'Luôn sẵn sàng tư vấn, hỗ trợ bạn mọi lúc từ chọn xe đến nhận xe.',
  },
  {
    icon: MapPin,
    title: 'Gò Vấp, TP.HCM',
    description: 'Showroom chính hãng tại Gò Vấp, giao xe tận nơi toàn TP.HCM.',
  },
]

export function ConsultantSection() {
  const consultant = siteConfig.consultant

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: consultant.name,
    jobTitle: consultant.title,
    telephone: consultant.phone,
    image: `${siteConfig.url}${consultant.photo}`,
    worksFor: {
      '@type': 'AutoDealer',
      name: siteConfig.company.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Gò Vấp',
        addressRegion: 'Hồ Chí Minh',
        addressCountry: 'VN',
      },
    },
  }

  return (
    <section className="py-16" id="tu-van">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-5">
          {/* Photo - 2 cols */}
          <div className="flex justify-center lg:col-span-2">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={consultant.photo}
                  alt={consultant.name}
                  width={380}
                  height={480}
                  className="h-auto w-full object-cover"
                />
              </div>
              {/* Accent decoration */}
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border-2 border-accent/30 -z-10" />
            </div>
          </div>

          {/* Content - 3 cols */}
          <div className="lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Chuyên viên tư vấn
            </p>
            <h2 className="mt-2 text-3xl font-bold text-primary md:text-4xl">
              {consultant.name}
            </h2>
            <p className="mt-1 text-lg text-muted-foreground">
              {consultant.title}
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {consultant.experience}
              {' '}Với phương châm &ldquo;Khách hàng là trung tâm&rdquo;, tôi luôn đặt lợi ích của bạn
              lên hàng đầu. Từ việc chọn xe, làm hồ sơ trả góp đến nhận xe - tôi đồng hành cùng bạn
              trong suốt hành trình.
            </p>

            {/* Highlights grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto" asChild>
                <a href={`tel:${consultant.phone.replace(/\s/g, '')}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {consultant.phone}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <a href={consultant.zalo} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Nhắn Zalo tư vấn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
