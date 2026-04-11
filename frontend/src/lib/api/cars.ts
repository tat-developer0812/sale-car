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
  search?: string
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
    search,
  } = params

  const searchParams = new URLSearchParams({
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
    sort,
    'populate[brand][fields][0]': 'name',
    'populate[brand][fields][1]': 'slug',
    'populate[brand][populate][logo][fields][0]': 'url',
    'populate[brand][populate][logo][fields][1]': 'alternativeText',
    'populate[mainImage][fields][0]': 'url',
    'populate[mainImage][fields][1]': 'alternativeText',
    'populate[mainImage][fields][2]': 'width',
    'populate[mainImage][fields][3]': 'height',
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

  if (search) {
    searchParams.append('filters[$or][0][name][$containsi]', search)
    searchParams.append('filters[$or][1][shortDescription][$containsi]', search)
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
    'populate[brand][fields][0]': 'name',
    'populate[brand][fields][1]': 'slug',
    'populate[brand][populate][logo][fields][0]': 'url',
    'populate[brand][populate][logo][fields][1]': 'alternativeText',
    'populate[mainImage][fields][0]': 'url',
    'populate[mainImage][fields][1]': 'alternativeText',
    'populate[mainImage][fields][2]': 'width',
    'populate[mainImage][fields][3]': 'height',
    'populate[gallery][fields][0]': 'url',
    'populate[gallery][fields][1]': 'alternativeText',
    'populate[gallery][fields][2]': 'width',
    'populate[gallery][fields][3]': 'height',
    'populate[brochure][fields][0]': 'url',
    'populate[brochure][fields][1]': 'name',
    'populate[specs]': 'true',
    'populate[relatedCars][fields][0]': 'name',
    'populate[relatedCars][fields][1]': 'slug',
    'populate[relatedCars][fields][2]': 'price',
    'populate[relatedCars][populate][brand][fields][0]': 'name',
    'populate[relatedCars][populate][mainImage][fields][0]': 'url',
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

  // Handle both Strapi v4 and v5 formats
  return response.data.map((item) => {
    // Strapi v5: slug is directly on item
    if ('slug' in item && typeof item.slug === 'string') {
      return item.slug
    }
    // Strapi v4: slug is in item.attributes
    return item.attributes?.slug || ''
  }).filter(Boolean)
}
