# Plan 05: Homepage & Car Listing

**Duration**: Days 11-14
**Phase**: Core Pages
**Prerequisites**: Plans 01-04 completed

---

## 🎯 Goals

- Build homepage with hero section
- Create featured cars grid
- Implement car listing page with filters
- Add sort and pagination
- Build car card component
- Implement search functionality

---

## 📋 Tasks Checklist

### Day 11-12: Homepage

#### Homepage Structure

Update `src/app/page.tsx`:
```typescript
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedCars } from '@/components/home/FeaturedCars'
import { BrandShowcase } from '@/components/home/BrandShowcase'
import { LatestNews } from '@/components/home/LatestNews'
import { CTASection } from '@/components/home/CTASection'
import { getAllBrands } from '@/lib/api/brands'
import { getFeaturedCars } from '@/lib/api/cars'
import { getLatestPosts } from '@/lib/api/posts'

export default async function HomePage() {
  const [brands, cars, posts] = await Promise.all([
    getAllBrands(),
    getFeaturedCars(8),
    getLatestPosts(3),
  ])

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturedCars cars={cars.data} />
        <BrandShowcase brands={brands} />
        <LatestNews posts={posts.data} />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
```

Create components in `src/components/home/`:

**HeroSection.tsx**: Hero with search
**FeaturedCars.tsx**: Car grid showcase
**BrandShowcase.tsx**: Brand logos grid
**LatestNews.tsx**: Blog post cards
**CTASection.tsx**: Contact CTA

### Day 13-14: Car Listing Page

#### Car Card Component

Create `src/components/car/CarCard.tsx`:
```typescript
import Image from 'next/image'
import Link from 'next/link'
import { Car } from '@/types/car'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice, getStrapiImageUrl } from '@/lib/utils'

export function CarCard({ car }: { car: Car }) {
  const imageUrl = getStrapiImageUrl(car.mainImage)
  const currentPrice = car.pricePromo || car.price

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={`/cars/${car.slug}`}>
        <div className="relative aspect-video">
          <Image
            src={imageUrl}
            alt={car.name}
            fill
            className="object-cover"
          />
          {car.pricePromo && (
            <Badge className="absolute top-2 right-2">Sale</Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/cars/${car.slug}`}>
          <h3 className="text-lg font-semibold hover:text-primary">
            {car.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">
          {car.year} • {car.transmission}
        </p>
        <div className="mt-4">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(currentPrice)}
          </span>
          {car.pricePromo && (
            <span className="ml-2 text-sm text-muted-foreground line-through">
              {formatPrice(car.price)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/cars/${car.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
```

#### Car Listing Page

Create `src/app/cars/page.tsx`:
```typescript
import { getAllCars } from '@/lib/api/cars'
import { getAllBrands } from '@/lib/api/brands'
import { CarGrid } from '@/components/car/CarGrid'
import { CarFilter } from '@/components/car/CarFilter'
import { Container } from '@/components/layout/Container'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export default async function CarsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const page = Number(searchParams.page) || 1
  const brand = searchParams.brand
  const category = searchParams.category
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : undefined
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined

  const [cars, brands] = await Promise.all([
    getAllCars({ page, brand, category, minPrice, maxPrice }),
    getAllBrands(),
  ])

  return (
    <Container className="py-8">
      <Breadcrumbs items={[{ title: 'Cars' }]} />
      <h1 className="mt-4 text-3xl font-bold">All Cars</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <CarFilter brands={brands} />
        </aside>
        <div className="lg:col-span-3">
          <CarGrid cars={cars.data} pagination={cars.pagination} />
        </div>
      </div>
    </Container>
  )
}
```

Create filter and grid components in `src/components/car/`

**✅ Verification**:
- Homepage displays with all sections
- Car listing page shows filtered cars
- Filters work correctly
- Pagination works

---

## ✅ Completion Checklist

- [ ] Homepage hero section
- [ ] Featured cars display
- [ ] Brand showcase
- [ ] Latest news section
- [ ] Car card component
- [ ] Car listing page
- [ ] Car filter sidebar
- [ ] Car grid with pagination
- [ ] Search functionality

---

## ➡️ Next Steps

Proceed to **Plan 06: Car Detail Page**

**Status**: ⬜ Not Started
