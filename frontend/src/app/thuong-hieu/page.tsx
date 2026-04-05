import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { getAllBrands } from '@/lib/api/brands'
import { getStrapiImageUrl } from '@/lib/strapi'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Thương Hiệu Xe Ô Tô - VuKia',
  description:
    'Khám phá các thương hiệu xe ô tô chính hãng tại VuKia: KIA, Mazda và nhiều thương hiệu hàng đầu khác. Đại lý ủy quyền chính hãng tại Gò Vấp, TP.HCM.',
  alternates: {
    canonical: `${siteConfig.url}/thuong-hieu`,
  },
}

export default async function ThuongHieuPage() {
  const brands = await getAllBrands()

  return (
    <>
      <Header />
      <main>
        {/* Page Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/30 to-background py-10 md:py-16">
          <Container>
            <div className="mb-4">
              <Breadcrumbs items={[{ title: 'Thương Hiệu' }]} />
            </div>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold text-primary md:text-4xl">
                Thương Hiệu Xe Ô Tô
              </h1>
              <p className="mt-4 text-base text-muted-foreground md:text-lg">
                VuKia là đại lý ủy quyền chính hãng, cung cấp xe từ các thương
                hiệu hàng đầu thế giới với cam kết chất lượng và giá cả minh bạch.
              </p>
            </div>
          </Container>
        </section>

        {/* Brands Grid */}
        <section className="py-12 md:py-16">
          <Container>
            {brands && brands.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
                {brands.map((brand) => {
                  const logoUrl = getStrapiImageUrl(brand.logo)

                  return (
                    <Link
                      key={brand.id}
                      href={`/thuong-hieu/${brand.slug}`}
                      className="group flex flex-col items-center rounded-xl border border-border/50 bg-background p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                    >
                      {/* Logo container */}
                      <div className="relative h-20 w-20 flex-shrink-0">
                        {logoUrl ? (
                          <Image
                            src={logoUrl}
                            alt={`Logo thương hiệu ${brand.name}`}
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-110"
                            sizes="80px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                            {brand.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>

                      {/* Brand name */}
                      <span className="mt-4 text-center text-sm font-semibold text-foreground transition-colors group-hover:text-primary md:text-base">
                        {brand.name}
                      </span>

                      {/* Description if available */}
                      {brand.description && (
                        <p className="mt-2 line-clamp-2 text-center text-xs text-muted-foreground">
                          {brand.description}
                        </p>
                      )}

                      {/* CTA */}
                      <span className="mt-4 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Xem xe &rarr;
                      </span>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="py-24 text-center text-muted-foreground">
                <p className="text-lg">Chưa có thương hiệu nào được cập nhật.</p>
                <p className="mt-2 text-sm">Vui lòng quay lại sau.</p>
              </div>
            )}
          </Container>
        </section>

        {/* CTA Banner */}
        <section className="bg-primary py-12 text-primary-foreground">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold md:text-3xl">
                Chưa tìm được xe ưng ý?
              </h2>
              <p className="mt-4 opacity-90">
                Liên hệ ngay với chuyên viên tư vấn VuKia để được hỗ trợ chọn
                xe phù hợp với nhu cầu và ngân sách của bạn.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary shadow transition-opacity hover:opacity-90"
                >
                  Gọi {siteConfig.contact.phone}
                </a>
                <a
                  href={siteConfig.links.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                >
                  Chat Zalo
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
