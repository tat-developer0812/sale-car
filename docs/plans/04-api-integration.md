# Plan 04: API Integration

**Duration**: Days 8-10
**Phase**: Foundation
**Prerequisites**: Plans 01-03 completed

---

## 🎯 Goals

- Create Strapi API client
- Define TypeScript interfaces for all content
- Implement data fetching functions
- Configure ISR (Incremental Static Regeneration)
- Setup error handling
- Test API integration

---

## ✅ Prerequisites Check

- [ ] Strapi running with sample data (Plan 02)
- [ ] Layout components working (Plan 03)
- [ ] API token generated and in `.env.local`

---

## 📋 Tasks Checklist

### Day 8: TypeScript Types & API Client

#### 8.1 Create TypeScript Types

Create `src/types/strapi.ts`:
```typescript
export interface StrapiImage {
  id: number
  name: string
  alternativeText?: string
  caption?: string
  width: number
  height: number
  formats?: {
    thumbnail?: StrapiImageFormat
    small?: StrapiImageFormat
    medium?: StrapiImageFormat
    large?: StrapiImageFormat
  }
  url: string
  previewUrl?: string
}

export interface StrapiImageFormat {
  url: string
  width: number
  height: number
  size: number
}

export interface StrapiData<T> {
  id: number
  attributes: T
}

export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface SEO {
  metaTitle: string
  metaDescription: string
  keywords?: string
  canonicalURL?: string
}
```

Create `src/types/brand.ts`:
```typescript
import { StrapiImage, SEO } from './strapi'

export interface Brand {
  name: string
  slug: string
  logo: { data: { id: number; attributes: StrapiImage } }
  description?: string
  seo?: SEO
  createdAt: string
  updatedAt: string
  publishedAt: string
}
```

Create `src/types/car.ts`:
```typescript
import { StrapiImage, SEO } from './strapi'
import { Brand } from './brand'

export interface CarSpecs {
  engine: string
  power: string
  torque: string
  fuelConsumption: string
  topSpeed?: string
  acceleration?: string
  length: number
  width: number
  height: number
  wheelbase?: number
  groundClearance?: number
  curbWeight?: number
  seats: number
  fuelTankCapacity?: number
  trunkCapacity?: number
  driveType?: string
  suspension?: string
  brakes?: string
  tires?: string
  airbags?: number
  safetyFeatures?: string[]
  infotainment?: string
  speakers?: number
  climateControl?: string
  other?: string[]
}

export interface Car {
  name: string
  slug: string
  brand: { data: { id: number; attributes: Brand } }
  price: number
  pricePromo?: number
  year: number
  status: 'available' | 'sold' | 'coming-soon'
  stockCount: number
  category: 'sedan' | 'suv' | 'mpv' | 'hatchback' | 'pickup'
  fuelType: 'gasoline' | 'diesel' | 'hybrid' | 'electric'
  transmission: 'manual' | 'automatic' | 'cvt'
  shortDescription: string
  fullDescription?: string
  features?: any
  colors?: any
  mainImage: { data: { id: number; attributes: StrapiImage } }
  gallery?: { data: Array<{ id: number; attributes: StrapiImage }> }
  video?: string
  brochure?: { data: { id: number; attributes: StrapiImage } }
  specs: CarSpecs
  highlights?: string[]
  pros?: string[]
  cons?: string[]
  seo?: SEO
  views: number
  leadCount: number
  relatedCars?: { data: Array<{ id: number; attributes: Car }> }
  createdAt: string
  updatedAt: string
  publishedAt: string
}
```

Create `src/types/post.ts`:
```typescript
import { StrapiImage, SEO } from './strapi'
import { Car } from './car'

export interface Post {
  title: string
  slug: string
  excerpt: string
  content: string
  category: 'review' | 'comparison' | 'guide' | 'news' | 'promotion'
  tags?: string[]
  featuredImage: { data: { id: number; attributes: StrapiImage } }
  relatedCars?: { data: Array<{ id: number; attributes: Car }> }
  author: string
  seo?: SEO
  views: number
  readTime?: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}
```

**✅ Verification**: No TypeScript errors in types files

#### 8.2 Create Strapi API Client

Create `src/lib/strapi.ts`:
```typescript
import { STRAPI_URL } from './constants'
import { StrapiResponse, StrapiData } from '@/types/strapi'

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

export class StrapiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'StrapiError'
  }
}

async function fetchAPI<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = new URL(path, STRAPI_URL)

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
    ...options.headers,
  }

  try {
    const response = await fetch(url.toString(), {
      ...options,
      headers,
      next: options.next || { revalidate: 60 }, // ISR: revalidate every 60 seconds
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new StrapiError(
        error.error?.message || `HTTP ${response.status}`,
        response.status,
        error.error?.code
      )
    }

    return await response.json()
  } catch (error) {
    if (error instanceof StrapiError) {
      throw error
    }
    throw new StrapiError(
      error instanceof Error ? error.message : 'Unknown error occurred'
    )
  }
}

// Helper to get image URL
export function getStrapiImageUrl(image: any): string {
  if (!image?.data?.attributes?.url) return ''
  const url = image.data.attributes.url
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
}

// Helper to extract attributes
export function extractAttributes<T>(data: StrapiData<T>): T {
  return data.attributes
}

export function extractAttributesArray<T>(data: StrapiData<T>[]): T[] {
  return data.map((item) => item.attributes)
}

export { fetchAPI }
```

**✅ Verification**: API client compiles without errors

### Day 9: Data Fetching Functions

#### 9.1 Create Car API Functions

Create `src/lib/api/cars.ts`:
```typescript
import { fetchAPI, extractAttributes, extractAttributesArray } from '../strapi'
import { StrapiResponse, StrapiData } from '@/types/strapi'
import { Car } from '@/types/car'

export interface GetCarsParams {
  page?: number
  pageSize?: number
  brand?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  sort?: string
}

export async function getAllCars(params: GetCarsParams = {}) {
  const {
    page = 1,
    pageSize = 12,
    brand,
    category,
    minPrice,
    maxPrice,
    sort = 'createdAt:desc',
  } = params

  const searchParams = new URLSearchParams({
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
    sort,
    'populate[brand][populate][0]': 'logo',
    'populate[mainImage][populate][0]': '*',
  })

  if (brand) {
    searchParams.append('filters[brand][slug][$eq]', brand)
  }

  if (category) {
    searchParams.append('filters[category][$eq]', category)
  }

  if (minPrice) {
    searchParams.append('filters[price][$gte]', minPrice.toString())
  }

  if (maxPrice) {
    searchParams.append('filters[price][$lte]', maxPrice.toString())
  }

  const response = await fetchAPI<StrapiResponse<StrapiData<Car>[]>>(
    `/api/cars?${searchParams.toString()}`
  )

  return {
    data: extractAttributesArray(response.data),
    pagination: response.meta.pagination,
  }
}

export async function getCarBySlug(slug: string) {
  const searchParams = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate[brand][populate][0]': 'logo',
    'populate[mainImage][populate][0]': '*',
    'populate[gallery][populate][0]': '*',
    'populate[brochure][populate][0]': '*',
    'populate[relatedCars][populate][brand]': '*',
    'populate[relatedCars][populate][mainImage]': '*',
  })

  const response = await fetchAPI<StrapiResponse<StrapiData<Car>[]>>(
    `/api/cars?${searchParams.toString()}`
  )

  if (!response.data || response.data.length === 0) {
    throw new Error('Car not found')
  }

  return extractAttributes(response.data[0])
}

export async function getFeaturedCars(limit = 8) {
  return getAllCars({
    pageSize: limit,
    sort: 'views:desc',
  })
}

export async function getCarsByBrand(brandSlug: string, limit = 12) {
  return getAllCars({
    brand: brandSlug,
    pageSize: limit,
  })
}
```

#### 9.2 Create Brand API Functions

Create `src/lib/api/brands.ts`:
```typescript
import { fetchAPI, extractAttributes, extractAttributesArray } from '../strapi'
import { StrapiResponse, StrapiData } from '@/types/strapi'
import { Brand } from '@/types/brand'

export async function getAllBrands() {
  const searchParams = new URLSearchParams({
    'populate[0]': 'logo',
    sort: 'name:asc',
  })

  const response = await fetchAPI<StrapiResponse<StrapiData<Brand>[]>>(
    `/api/brands?${searchParams.toString()}`
  )

  return extractAttributesArray(response.data)
}

export async function getBrandBySlug(slug: string) {
  const searchParams = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate[0]': 'logo',
  })

  const response = await fetchAPI<StrapiResponse<StrapiData<Brand>[]>>(
    `/api/brands?${searchParams.toString()}`
  )

  if (!response.data || response.data.length === 0) {
    throw new Error('Brand not found')
  }

  return extractAttributes(response.data[0])
}
```

#### 9.3 Create Post API Functions

Create `src/lib/api/posts.ts`:
```typescript
import { fetchAPI, extractAttributes, extractAttributesArray } from '../strapi'
import { StrapiResponse, StrapiData } from '@/types/strapi'
import { Post } from '@/types/post'

export interface GetPostsParams {
  page?: number
  pageSize?: number
  category?: string
  sort?: string
}

export async function getAllPosts(params: GetPostsParams = {}) {
  const { page = 1, pageSize = 10, category, sort = 'publishedAt:desc' } = params

  const searchParams = new URLSearchParams({
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
    sort,
    'populate[featuredImage][populate][0]': '*',
    'populate[relatedCars][populate][brand]': '*',
    'populate[relatedCars][populate][mainImage]': '*',
  })

  if (category) {
    searchParams.append('filters[category][$eq]', category)
  }

  const response = await fetchAPI<StrapiResponse<StrapiData<Post>[]>>(
    `/api/posts?${searchParams.toString()}`
  )

  return {
    data: extractAttributesArray(response.data),
    pagination: response.meta.pagination,
  }
}

export async function getPostBySlug(slug: string) {
  const searchParams = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate[featuredImage][populate][0]': '*',
    'populate[relatedCars][populate][brand]': '*',
    'populate[relatedCars][populate][mainImage]': '*',
  })

  const response = await fetchAPI<StrapiResponse<StrapiData<Post>[]>>(
    `/api/posts?${searchParams.toString()}`
  )

  if (!response.data || response.data.length === 0) {
    throw new Error('Post not found')
  }

  return extractAttributes(response.data[0])
}

export async function getLatestPosts(limit = 5) {
  return getAllPosts({
    pageSize: limit,
    sort: 'publishedAt:desc',
  })
}
```

**✅ Verification**: All API functions compile without errors

### Day 10: Testing & React Query Setup

#### 10.1 Setup React Query Provider

Create `src/providers/query-provider.tsx`:
```typescript
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

Update `src/app/layout.tsx` to include QueryProvider:
```typescript
import { QueryProvider } from '@/providers/query-provider'

// Inside RootLayout
<ThemeProvider ...>
  <QueryProvider>
    {children}
    <Toaster />
  </QueryProvider>
</ThemeProvider>
```

#### 10.2 Create Custom Hooks

Create `src/hooks/useCars.ts`:
```typescript
import { useQuery } from '@tanstack/react-query'
import { getAllCars, getCarBySlug, GetCarsParams } from '@/lib/api/cars'

export function useCars(params?: GetCarsParams) {
  return useQuery({
    queryKey: ['cars', params],
    queryFn: () => getAllCars(params),
  })
}

export function useCar(slug: string) {
  return useQuery({
    queryKey: ['car', slug],
    queryFn: () => getCarBySlug(slug),
    enabled: !!slug,
  })
}
```

Create `src/hooks/useBrands.ts`:
```typescript
import { useQuery } from '@tanstack/react-query'
import { getAllBrands, getBrandBySlug } from '@/lib/api/brands'

export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: getAllBrands,
  })
}

export function useBrand(slug: string) {
  return useQuery({
    queryKey: ['brand', slug],
    queryFn: () => getBrandBySlug(slug),
    enabled: !!slug,
  })
}
```

#### 10.3 Test API Integration

Create test page `src/app/test-api/page.tsx`:
```typescript
import { getAllCars } from '@/lib/api/cars'
import { getAllBrands } from '@/lib/api/brands'
import { Container } from '@/components/layout/Container'

export default async function TestAPIPage() {
  const cars = await getAllCars({ pageSize: 5 })
  const brands = await getAllBrands()

  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold">API Integration Test</h1>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Brands ({brands.length})</h2>
        <ul className="mt-4 space-y-2">
          {brands.map((brand) => (
            <li key={brand.slug}>
              {brand.name} - {brand.slug}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">
          Cars ({cars.pagination?.total || 0})
        </h2>
        <ul className="mt-4 space-y-2">
          {cars.data.map((car) => (
            <li key={car.slug}>
              {car.name} - {car.price.toLocaleString()} VND
            </li>
          ))}
        </ul>
      </section>
    </Container>
  )
}
```

Visit http://localhost:3000/test-api

**✅ Verification**: Page displays brands and cars from Strapi

---

## 🧪 Testing Criteria

- [ ] All TypeScript types defined
- [ ] API client fetches data from Strapi
- [ ] Can get all cars with filters
- [ ] Can get single car by slug
- [ ] Can get all brands
- [ ] Can get brand by slug
- [ ] Can get all posts
- [ ] Can get post by slug
- [ ] React Query provider configured
- [ ] Custom hooks work correctly
- [ ] Test page displays data successfully
- [ ] ISR configured (60s revalidation)
- [ ] Error handling works

---

## ✅ Completion Checklist

- [ ] All type definitions created
- [ ] Strapi API client implemented
- [ ] Car API functions complete
- [ ] Brand API functions complete
- [ ] Post API functions complete
- [ ] React Query setup
- [ ] Custom hooks created
- [ ] Test page working
- [ ] No TypeScript errors

---

## ➡️ Next Steps

1. Mark Plan 04 as ✅ in `00-master-plan.md`
2. Commit:
```bash
git add .
git commit -m "feat: API integration with Strapi (Plan 04)"
```
3. Proceed to **Plan 05: Homepage & Car Listing**

---

**Status**: ⬜ Not Started
**Last Updated**: 2026-01-23
