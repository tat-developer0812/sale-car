# Plan 11: SEO & Analytics Implementation

**Duration**: Days 29-35
**Phase**: SEO & Launch Preparation
**Prerequisites**: Plans 01-10 completed

---

## 🎯 Goals

- Implement dynamic metadata for all pages
- Add JSON-LD structured data (Product, Article, Organization, Breadcrumb)
- Setup sitemap.xml and robots.txt
- Configure Google Analytics 4
- Setup Google Search Console
- Optimize images and performance
- Achieve PageSpeed score 90+

---

## 📋 Tasks Checklist

### Day 29-31: Structured Data (JSON-LD)

#### Product Schema for Cars

Create `src/components/seo/CarJsonLd.tsx`:
```typescript
import { Car } from '@/types/car'

export function CarJsonLd({ car }: { car: Car }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: car.name,
    description: car.shortDescription,
    image: car.gallery?.data?.map(img => img.attributes.url) || [],
    brand: {
      '@type': 'Brand',
      name: car.brand.data.attributes.name,
    },
    offers: {
      '@type': 'Offer',
      price: car.pricePromo || car.price,
      priceCurrency: 'VND',
      availability: car.status === 'available'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/cars/${car.slug}`,
    },
    vehicleEngine: {
      '@type': 'EngineSpecification',
      name: car.specs.engine,
    },
    fuelConsumption: {
      '@type': 'QuantitativeValue',
      value: car.specs.fuelConsumption,
    },
    numberOfDoors: 4,
    seatingCapacity: car.specs.seats,
    vehicleTransmission: car.transmission,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

#### Article Schema for Blog

Create `src/components/seo/ArticleJsonLd.tsx`:
```typescript
import { Post } from '@/types/post'

export function ArticleJsonLd({ post }: { post: Post }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage.data.attributes.url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: process.env.NEXT_PUBLIC_SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

#### Organization Schema

Create `src/components/seo/OrganizationJsonLd.tsx`:
```typescript
export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: process.env.NEXT_PUBLIC_SITE_NAME,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    telephone: '+84909123456',
    email: 'info@yoursite.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Main Street',
      addressLocality: 'Ho Chi Minh City',
      addressCountry: 'VN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

#### Breadcrumb Schema

Create `src/components/seo/BreadcrumbJsonLd.tsx`:
```typescript
interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

### Day 32-33: Sitemap & Robots

#### Dynamic Sitemap

Create `src/app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next'
import { getAllCars } from '@/lib/api/cars'
import { getAllPosts } from '@/lib/api/posts'
import { getAllBrands } from '@/lib/api/brands'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/cars`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  const cars = await getAllCars({ pageSize: 1000 })
  const carPages: MetadataRoute.Sitemap = cars.data.map(car => ({
    url: `${baseUrl}/cars/${car.slug}`,
    lastModified: new Date(car.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const brands = await getAllBrands()
  const brandPages: MetadataRoute.Sitemap = brands.map(brand => ({
    url: `${baseUrl}/brands/${brand.slug}`,
    lastModified: new Date(brand.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const posts = await getAllPosts({ pageSize: 1000 })
  const postPages: MetadataRoute.Sitemap = posts.data.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...carPages, ...brandPages, ...postPages]
}
```

#### Robots.txt

Create `src/app/robots.ts`:
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/test-api/'],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }
}
```

### Day 34-35: Analytics & Tracking

#### Google Analytics 4 Setup

Create `src/lib/analytics.ts`:
```typescript
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

declare global {
  interface Window {
    gtag: any
  }
}

export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
```

Add to `src/app/layout.tsx`:
```typescript
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `}
</Script>
```

#### Performance Optimization

1. **Image Optimization**:
   - All images use Next.js `<Image />` component
   - Add blur placeholders
   - Use proper sizes

2. **Font Optimization**:
   - Already done with Google Fonts

3. **Code Splitting**:
   - Use `dynamic` imports for heavy components

4. **Bundle Size**:
   - Check with `npm run build`
   - Analyze with `@next/bundle-analyzer`

**Run Lighthouse Audit**:
```bash
# Open dev tools → Lighthouse → Run audit
# Target: 90+ scores for all metrics
```

**✅ Completion**: SEO fully optimized, PageSpeed 90+

---

## 🧪 Testing Checklist

- [ ] All pages have proper metadata
- [ ] JSON-LD schemas validate (test with Google Rich Results Test)
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt
- [ ] Google Analytics tracking works
- [ ] PageSpeed score 90+ (mobile & desktop)
- [ ] Core Web Vitals passing
- [ ] Images optimized with Next/Image
- [ ] No console errors

---

## ➡️ Next Steps

Proceed to **Plan 12: Testing & Deployment**

**Status**: ✅ Completed
