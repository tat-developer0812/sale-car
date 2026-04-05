import { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { ContactForm } from '@/components/forms/ContactForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { MapPin, Phone, Mail, Clock, MessageCircle, Award, Shield, Users, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Liên Hệ Tư Vấn Mua Xe KIA & Mazda - VuKia Gò Vấp',
  description:
    'Liên hệ chuyên viên VuKia để được tư vấn mua xe KIA, Mazda chính hãng tại Gò Vấp, TP.HCM. Hotline: 0931 456 204. Hỗ trợ trả góp 80%, giao xe tận nơi, tư vấn miễn phí.',
  alternates: {
    canonical: `${siteConfig.url}/lien-he`,
  },
  openGraph: {
    title: 'Liên Hệ Tư Vấn Mua Xe KIA & Mazda - VuKia',
    description: 'Tư vấn miễn phí xe KIA & Mazda chính hãng. Hotline: 0931 456 204.',
    url: `${siteConfig.url}/lien-he`,
    images: [{ url: `${siteConfig.url}/og-image.jpg` }],
  },
}

export default function ContactPage() {
  const consultant = siteConfig.consultant

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: consultant.name,
    jobTitle: consultant.title,
    telephone: consultant.phone,
    image: `${siteConfig.url}${consultant.photo}`,
    url: `${siteConfig.url}/lien-he`,
    sameAs: [siteConfig.links.facebook, siteConfig.links.zalo].filter(Boolean),
    worksFor: {
      '@type': 'AutoDealer',
      name: siteConfig.company.name,
      telephone: siteConfig.contact.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.contact.address,
        addressLocality: 'Gò Vấp',
        addressRegion: 'Hồ Chí Minh',
        addressCountry: 'VN',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Header />
      <main className="min-h-screen">
        <Container className="py-8">
          <Breadcrumbs items={[{ title: 'Liên Hệ' }]} />

          <div className="mt-6">
            <h1 className="text-2xl font-bold text-primary md:text-3xl">
              Tư Vấn Mua Xe KIA & Mazda Miễn Phí
            </h1>
            <p className="mt-2 text-muted-foreground">
              Điền form bên dưới hoặc gọi thẳng <strong>{siteConfig.contact.phone}</strong> — chúng tôi phản hồi trong vòng 15 phút.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">

              {/* Consultant Profile Card */}
              <Card className="overflow-hidden border-primary/20">
                {/* Photo — square crop, not too tall */}
                <div className="relative aspect-[3/2] overflow-hidden sm:aspect-[4/3]">
                  <Image
                    src={consultant.photo}
                    alt={`${consultant.name} - ${consultant.title}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 400px"
                    priority
                  />
                  {/* subtle scrim so text pops */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {/* Star badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white shadow">
                    <Star className="h-3 w-3 fill-white" />
                    Chuyên gia
                  </div>
                </div>

                <CardContent className="p-5 space-y-4">
                  {/* Name + title below photo — no clipping */}
                  <div>
                    <p className="text-lg font-bold text-primary leading-tight">{consultant.name}</p>
                    <p className="text-sm text-muted-foreground">{consultant.title}</p>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {consultant.experience}
                  </p>

                  {/* Highlights */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-primary/5 p-2.5">
                      <Award className="mx-auto h-5 w-5 text-primary" />
                      <p className="mt-1 text-xs font-medium">Chuyên gia</p>
                    </div>
                    <div className="rounded-lg bg-primary/5 p-2.5">
                      <Shield className="mx-auto h-5 w-5 text-primary" />
                      <p className="mt-1 text-xs font-medium">Uy tín</p>
                    </div>
                    <div className="rounded-lg bg-primary/5 p-2.5">
                      <Users className="mx-auto h-5 w-5 text-primary" />
                      <p className="mt-1 text-xs font-medium">Tận tâm</p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-2">
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-base font-semibold" asChild>
                      <a href={`tel:${consultant.phone.replace(/\s/g, '')}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        {consultant.phone}
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={consultant.zalo} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Nhắn Zalo tư vấn
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Thông tin liên hệ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      icon: MapPin,
                      label: 'Showroom',
                      content: siteConfig.contact.address,
                    },
                    {
                      icon: Phone,
                      label: 'Điện thoại',
                      content: (
                        <a
                          href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                          className="text-accent hover:underline"
                        >
                          {siteConfig.contact.phone}
                        </a>
                      ),
                    },
                    {
                      icon: Mail,
                      label: 'Email',
                      content: (
                        <a
                          href={`mailto:${siteConfig.contact.email}`}
                          className="hover:text-primary"
                        >
                          {siteConfig.contact.email}
                        </a>
                      ),
                    },
                    {
                      icon: Clock,
                      label: 'Giờ làm việc',
                      content: siteConfig.contact.workingHours,
                    },
                  ].map(({ icon: Icon, label, content }) => (
                    <div key={label} className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">{label}</p>
                        <p className="text-sm">{content}</p>
                      </div>
                    </div>
                  ))}
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
