import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { FeaturedCars } from '@/components/home/FeaturedCars'
import { FAQSection } from '@/components/home/FAQSection'
import { CTASection } from '@/components/home/CTASection'
import { BreadcrumbJsonLd } from '@/components/seo'
import { getFeaturedCars } from '@/lib/api/cars'
import { siteConfig } from '@/config/site'
import { MapPin, Phone, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CityData {
  name: string
  slug: string
  description: string
  metaTitle: string
  metaDescription: string
}

const cities: Record<string, CityData> = {
  'ho-chi-minh': {
    name: 'TP. Hồ Chí Minh',
    slug: 'ho-chi-minh',
    description:
      'VuKia là đại lý xe ô tô uy tín tại TP. Hồ Chí Minh. Chuyên cung cấp xe mới chính hãng, hỗ trợ trả góp lãi suất ưu đãi, giao xe tận nơi trên địa bàn TP.HCM và các tỉnh lân cận.',
    metaTitle: 'Mua Xe Ô Tô Tại TP. Hồ Chí Minh - Đại Lý VuKia',
    metaDescription:
      'Mua xe ô tô chính hãng tại TP. Hồ Chí Minh. VuKia - đại lý uy tín, trả góp 80%, bảo hành chính hãng, giao xe tận nơi. Liên hệ ngay!',
  },
  'ha-noi': {
    name: 'Hà Nội',
    slug: 'ha-noi',
    description:
      'VuKia cung cấp xe ô tô chính hãng tại Hà Nội với giá cạnh tranh nhất. Hỗ trợ trả góp, bảo hành toàn quốc, giao xe tận nơi trên địa bàn Hà Nội.',
    metaTitle: 'Mua Xe Ô Tô Tại Hà Nội - Đại Lý VuKia',
    metaDescription:
      'Mua xe ô tô chính hãng tại Hà Nội. VuKia - đại lý xe hơi uy tín, hỗ trợ trả góp 80%, giá tốt nhất. Liên hệ tư vấn miễn phí!',
  },
  'da-nang': {
    name: 'Đà Nẵng',
    slug: 'da-nang',
    description:
      'Mua xe ô tô chính hãng tại Đà Nẵng với VuKia. Đại lý uy tín khu vực miền Trung, hỗ trợ trả góp, giao xe tận nơi.',
    metaTitle: 'Mua Xe Ô Tô Tại Đà Nẵng - Đại Lý VuKia',
    metaDescription:
      'Mua xe ô tô tại Đà Nẵng giá tốt. VuKia - đại lý chính hãng, trả góp ưu đãi, bảo hành toàn quốc. Hotline tư vấn 24/7!',
  },
  'can-tho': {
    name: 'Cần Thơ',
    slug: 'can-tho',
    description:
      'VuKia - đại lý xe ô tô uy tín tại Cần Thơ và khu vực Đồng bằng sông Cửu Long. Giá tốt, trả góp dễ dàng, giao xe tận nơi.',
    metaTitle: 'Mua Xe Ô Tô Tại Cần Thơ - Đại Lý VuKia',
    metaDescription:
      'Mua xe ô tô chính hãng tại Cần Thơ. VuKia hỗ trợ trả góp 80%, giá tốt nhất khu vực ĐBSCL. Liên hệ ngay!',
  },
  'hai-phong': {
    name: 'Hải Phòng',
    slug: 'hai-phong',
    description:
      'Đại lý xe ô tô VuKia tại Hải Phòng. Xe chính hãng, giá cạnh tranh, hỗ trợ trả góp lãi suất ưu đãi, giao xe tận nơi.',
    metaTitle: 'Mua Xe Ô Tô Tại Hải Phòng - Đại Lý VuKia',
    metaDescription:
      'Mua xe ô tô tại Hải Phòng giá tốt nhất. VuKia - xe chính hãng, trả góp 80%, bảo hành toàn quốc. Gọi ngay!',
  },
  'binh-duong': {
    name: 'Bình Dương',
    slug: 'binh-duong',
    description:
      'VuKia cung cấp xe ô tô chính hãng tại Bình Dương. Hỗ trợ trả góp, bảo hành chính hãng, giao xe nhanh chóng.',
    metaTitle: 'Mua Xe Ô Tô Tại Bình Dương - Đại Lý VuKia',
    metaDescription:
      'Mua xe ô tô chính hãng tại Bình Dương. VuKia - đại lý uy tín, giá tốt, trả góp 80%, giao xe tận nơi!',
  },
  'dong-nai': {
    name: 'Đồng Nai',
    slug: 'dong-nai',
    description:
      'Đại lý xe ô tô VuKia tại Đồng Nai. Xe mới 100% chính hãng, giá tốt nhất, trả góp dễ dàng, giao xe tận nơi.',
    metaTitle: 'Mua Xe Ô Tô Tại Đồng Nai - Đại Lý VuKia',
    metaDescription:
      'Mua xe ô tô chính hãng tại Đồng Nai. VuKia hỗ trợ trả góp 80%, bảo hành chính hãng, giao xe miễn phí!',
  },
}

export function generateStaticParams() {
  return Object.keys(cities).map((city) => ({ city }))
}

export function generateMetadata({
  params,
}: {
  params: { city: string }
}): Metadata {
  const city = cities[params.city]
  if (!city) {
    return { title: 'Không tìm thấy' }
  }

  const siteUrl = siteConfig.url

  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: {
      canonical: `${siteUrl}/mua-xe-o-to/${city.slug}`,
    },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `${siteUrl}/mua-xe-o-to/${city.slug}`,
      type: 'website',
      locale: 'vi_VN',
    },
  }
}

export default async function CityPage({
  params,
}: {
  params: { city: string }
}) {
  const city = cities[params.city]

  if (!city) {
    return <div>Không tìm thấy thành phố</div>
  }

  let cars: Awaited<ReturnType<typeof getFeaturedCars>> = { data: [], pagination: undefined }
  try {
    cars = await getFeaturedCars(8)
  } catch {
    // Silently fail
  }

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: `VuKia - ${city.name}`,
    description: city.description,
    url: `${siteConfig.url}/mua-xe-o-to/${city.slug}`,
    telephone: siteConfig.contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressCountry: 'VN',
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
    },
  }

  const breadcrumbs = [
    { name: 'Mua xe ô tô', url: '/mua-xe-o-to' },
    { name: city.name, url: `/mua-xe-o-to/${city.slug}` },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/30 to-background py-16">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold text-primary md:text-5xl">
                Mua Xe Ô Tô Tại {city.name}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                {city.description}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <a href={`tel:${siteConfig.contact.phone}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Gọi ngay: {siteConfig.contact.phone}
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/lien-he">
                    Đăng ký tư vấn miễn phí
                  </a>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Contact info */}
        <section className="py-8 border-b">
          <Container>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Showroom VuKia {city.name}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                {siteConfig.contact.phone}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                {siteConfig.contact.workingHours}
              </span>
            </div>
          </Container>
        </section>

        {/* Cars */}
        <FeaturedCars cars={cars.data} />

        {/* FAQ */}
        <FAQSection />

        {/* CTA */}
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
