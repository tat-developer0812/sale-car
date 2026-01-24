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
    return null
  }

  return extractAttributes(response.data[0])
}

export async function getLatestPosts(limit = 5) {
  return getAllPosts({
    pageSize: limit,
    sort: 'publishedAt:desc',
  })
}

export async function getPostsByCategory(category: string, limit = 10) {
  return getAllPosts({
    category,
    pageSize: limit,
  })
}

export async function getPostSlugs() {
  const searchParams = new URLSearchParams({
    'fields[0]': 'slug',
    'pagination[pageSize]': '1000',
  })

  const response = await fetchAPI<StrapiResponse<StrapiData<{ slug: string }>[]>>(
    `/api/posts?${searchParams.toString()}`
  )

  return response.data.map((item) => item.attributes.slug)
}
