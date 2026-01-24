import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CarGallery } from '@/components/car/CarGallery'
import { CarSpecs } from '@/components/car/CarSpecs'
import { CarFeatures } from '@/components/car/CarFeatures'
import { CarPricing } from '@/components/car/CarPricing'
import { RelatedCars } from '@/components/car/RelatedCars'
import { QuickContact } from '@/components/forms/QuickContact'
import { CarJsonLd } from '@/components/seo/CarJsonLd'
import { getCarBySlug, getCarSlugs } from '@/lib/api/cars'
import { formatPrice } from '@/lib/format'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const slugs = await getCarSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const car = await getCarBySlug(slug)

    if (!car) {
      return {
        title: 'Không tìm thấy xe',
      }
    }

    const title = `${car.name} ${car.year} - ${formatPrice(car.pricePromo || car.price)}`

    return {
      title,
      description: car.shortDescription || car.seo?.metaDescription,
      keywords: car.seo?.keywords,
      openGraph: {
        title,
        description: car.shortDescription,
        type: 'website',
      },
    }
  } catch (error) {
    return {
      title: 'Không tìm thấy xe',
    }
  }
}

export default async function CarDetailPage({ params }: PageProps) {
  const { slug } = await params

  let car: Awaited<ReturnType<typeof getCarBySlug>> = null

  try {
    car = await getCarBySlug(slug)
  } catch (error) {
    console.error('Failed to fetch car:', error)
  }

  if (!car) {
    notFound()
  }

  const brandName = car.brand?.data?.attributes?.name || ''

  return (
    <>
      <CarJsonLd car={car} />
      <Header />
      <main className="min-h-screen">
        <Container className="py-8">
          <Breadcrumbs
            items={[
              { title: 'Xe Ô Tô', href: '/xe-o-to' },
              ...(brandName
                ? [{ title: brandName, href: `/thuong-hieu/${car.brand?.data?.attributes?.slug}` }]
                : []),
              { title: car.name },
            ]}
          />

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold">{car.name}</h1>
              {car.shortDescription && (
                <p className="mt-2 text-lg text-muted-foreground">
                  {car.shortDescription}
                </p>
              )}

              <div className="mt-6">
                <CarGallery
                  mainImage={car.mainImage}
                  gallery={car.gallery}
                  carName={car.name}
                />
              </div>

              <CarSpecs specs={car.specs} />

              <CarFeatures
                features={car.features as Record<string, unknown>}
                highlights={car.highlights}
                pros={car.pros}
                cons={car.cons}
                fullDescription={car.fullDescription}
              />
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <CarPricing car={car} />
              <QuickContact carId={car.id} carName={car.name} />
            </aside>
          </div>

          {/* Related Cars */}
          <RelatedCars cars={car.relatedCars} />
        </Container>
      </main>
      <Footer />
    </>
  )
}
