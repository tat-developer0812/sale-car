# Plan 06: Car Detail Page

**Duration**: Days 15-17
**Phase**: Core Pages
**Prerequisites**: Plans 01-05 completed

---

## 🎯 Goals

- Build complete car detail page
- Image gallery with lightbox
- Specifications display
- Features grid
- Related cars carousel
- Dynamic metadata for SEO

---

## 📋 Tasks

Create `src/app/cars/[slug]/page.tsx`:
```typescript
import { getCarBySlug } from '@/lib/api/cars'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/Container'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CarGallery } from '@/components/car/CarGallery'
import { CarSpecs } from '@/components/car/CarSpecs'
import { CarFeatures } from '@/components/car/CarFeatures'
import { CarPricing } from '@/components/car/CarPricing'
import { RelatedCars } from '@/components/car/RelatedCars'
import { QuickContact } from '@/components/forms/QuickContact'
import { CarJsonLd } from '@/components/seo/CarJsonLd'

export async function generateMetadata({ params }): Promise<Metadata> {
  const car = await getCarBySlug(params.slug)
  return {
    title: `${car.name} - ${formatPrice(car.price)}`,
    description: car.shortDescription,
  }
}

export default async function CarDetailPage({ params }) {
  const car = await getCarBySlug(params.slug)
  if (!car) notFound()

  return (
    <>
      <CarJsonLd car={car} />
      <Container className="py-8">
        <Breadcrumbs items={[
          { title: 'Cars', href: '/cars' },
          { title: car.name }
        ]} />

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CarGallery images={car.gallery} />
            <CarSpecs specs={car.specs} />
            <CarFeatures features={car.features} />
          </div>
          <aside>
            <CarPricing car={car} />
            <QuickContact carId={car.id} carName={car.name} />
          </aside>
        </div>

        <RelatedCars cars={car.relatedCars} />
      </Container>
    </>
  )
}
```

Create components in `src/components/car/`:
- CarGallery.tsx (with lightbox)
- CarSpecs.tsx (specifications table)
- CarFeatures.tsx (features grid)
- CarPricing.tsx (price display)
- RelatedCars.tsx (carousel)

**✅ Completion**: Car detail page fully functional

---

## ➡️ Next Steps

Proceed to **Plan 07: Blog System**

**Status**: ⬜ Not Started
