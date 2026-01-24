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
    return null
  }

  return extractAttributes(response.data[0])
}

export async function getBrandSlugs() {
  const searchParams = new URLSearchParams({
    'fields[0]': 'slug',
    'pagination[pageSize]': '100',
  })

  const response = await fetchAPI<StrapiResponse<StrapiData<{ slug: string }>[]>>(
    `/api/brands?${searchParams.toString()}`
  )

  return response.data.map((item) => item.attributes.slug)
}
