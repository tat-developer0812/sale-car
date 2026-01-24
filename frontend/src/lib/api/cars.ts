import { fetchAPI, extractAttributes, extractAttributesArray } from '../strapi'
import { StrapiResponse, StrapiData } from '@/types/strapi'
import { Car } from '@/types/car'

export interface GetCarsParams {
  page?: number
  pageSize?: number
  brand?: string
  category?: string
  fuelType?: string
  transmission?: string
  minPrice?: number
  maxPrice?: number
  status?: string
  sort?: string
}

export async function getAllCars(params: GetCarsParams = {}) {
  const {
    page = 1,
    pageSize = 12,
    brand,
    category,
    fuelType,
    transmission,
    minPrice,
    maxPrice,
    status,
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

  if (fuelType) {
    searchParams.append('filters[fuelType][$eq]', fuelType)
  }

  if (transmission) {
    searchParams.append('filters[transmission][$eq]', transmission)
  }

  if (status) {
    searchParams.append('filters[status][$eq]', status)
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
    'populate[specs]': '*',
    'populate[relatedCars][populate][brand]': '*',
    'populate[relatedCars][populate][mainImage]': '*',
  })

  const response = await fetchAPI<StrapiResponse<StrapiData<Car>[]>>(
    `/api/cars?${searchParams.toString()}`
  )

  if (!response.data || response.data.length === 0) {
    return null
  }

  return extractAttributes(response.data[0])
}

export async function getFeaturedCars(limit = 8) {
  return getAllCars({
    pageSize: limit,
    sort: 'views:desc',
    status: 'available',
  })
}

export async function getLatestCars(limit = 8) {
  return getAllCars({
    pageSize: limit,
    sort: 'createdAt:desc',
    status: 'available',
  })
}

export async function getCarsByBrand(brandSlug: string, limit = 12) {
  return getAllCars({
    brand: brandSlug,
    pageSize: limit,
  })
}

export async function getCarsByCategory(category: string, limit = 12) {
  return getAllCars({
    category,
    pageSize: limit,
  })
}

export async function getCarSlugs() {
  const searchParams = new URLSearchParams({
    'fields[0]': 'slug',
    'pagination[pageSize]': '1000',
  })

  const response = await fetchAPI<StrapiResponse<StrapiData<{ slug: string }>[]>>(
    `/api/cars?${searchParams.toString()}`
  )

  return response.data.map((item) => item.attributes.slug)
}
