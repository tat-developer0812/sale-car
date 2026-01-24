import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { Brand } from '@/types/brand'
import { getStrapiImageUrl } from '@/lib/strapi'

interface BrandShowcaseProps {
  brands: (Brand & { id: number })[]
}

export function BrandShowcase({ brands }: BrandShowcaseProps) {
  if (!brands || brands.length === 0) {
    return null
  }

  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold">Thương Hiệu Xe</h2>
          <p className="mt-2 text-muted-foreground">
            Đại lý ủy quyền chính hãng các thương hiệu hàng đầu
          </p>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {brands.map((brand) => {
            const logoUrl = getStrapiImageUrl(brand.logo)

            return (
              <Link
                key={brand.id}
                href={`/thuong-hieu/${brand.slug}`}
                className="group flex flex-col items-center rounded-lg bg-background p-4 transition-shadow hover:shadow-md"
              >
                <div className="relative h-16 w-16">
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={brand.name}
                      fill
                      className="object-contain transition-transform group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-muted text-lg font-bold">
                      {brand.name.charAt(0)}
                    </div>
                  )}
                </div>
                <span className="mt-2 text-sm font-medium text-muted-foreground group-hover:text-foreground">
                  {brand.name}
                </span>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
