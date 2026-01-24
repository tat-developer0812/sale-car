import { Suspense } from 'react'
import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CarGrid } from '@/components/car/CarGrid'
import { CarFilter } from '@/components/car/CarFilter'
import { CarCardSkeleton } from '@/components/common/CarCardSkeleton'
import { getAllCars } from '@/lib/api/cars'
import { getAllBrands } from '@/lib/api/brands'

export const metadata: Metadata = {
  title: 'Xe Ô Tô',
  description: 'Khám phá bộ sưu tập xe ô tô đa dạng với giá cả cạnh tranh. Hỗ trợ trả góp, bảo hành chính hãng.',
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>
}

async function CarListContent({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const page = Number(searchParams.page) || 1
  const brand = searchParams.brand
  const category = searchParams.category
  const fuelType = searchParams.fuelType
  const transmission = searchParams.transmission
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : undefined
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined

  let cars: Awaited<ReturnType<typeof getAllCars>> = { data: [], pagination: undefined }
  let brands: Awaited<ReturnType<typeof getAllBrands>> = []

  try {
    ;[cars, brands] = await Promise.all([
      getAllCars({ page, brand, category, fuelType, transmission, minPrice, maxPrice }),
      getAllBrands(),
    ])
  } catch (error) {
    console.error('Failed to fetch car data:', error)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-4">
      <aside className="lg:col-span-1">
        <CarFilter brands={brands} />
      </aside>
      <div className="lg:col-span-3">
        <CarGrid cars={cars.data} pagination={cars.pagination} />
      </div>
    </div>
  )
}

function CarListSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-4">
      <aside className="lg:col-span-1">
        <div className="rounded-lg border p-4">
          <div className="h-6 w-20 animate-pulse rounded bg-muted" />
          <div className="mt-4 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 animate-pulse rounded bg-muted" />
            ))}
          </div>
        </div>
      </aside>
      <div className="lg:col-span-3">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CarCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function CarsPage({ searchParams }: PageProps) {
  const params = await searchParams

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Container className="py-8">
          <Breadcrumbs items={[{ title: 'Xe Ô Tô' }]} />

          <div className="mt-6">
            <h1 className="text-3xl font-bold">Xe Ô Tô</h1>
            <p className="mt-2 text-muted-foreground">
              Khám phá bộ sưu tập xe ô tô đa dạng từ các thương hiệu hàng đầu
            </p>
          </div>

          <div className="mt-8">
            <Suspense fallback={<CarListSkeleton />}>
              <CarListContent searchParams={params} />
            </Suspense>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
