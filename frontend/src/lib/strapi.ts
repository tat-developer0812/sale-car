import { STRAPI_URL } from './constants'
import { StrapiData } from '@/types/strapi'

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

// Helper to get image URL (Strapi v5 format)
// Uses /strapi-uploads/ proxy to avoid Next.js private IP blocking in dev
export function getStrapiImageUrl(image: { url: string } | { data: { attributes: { url: string } } | null } | null | undefined): string {
  if (!image) return ''

  let rawUrl = ''

  // Strapi v5 format: direct url property
  if ('url' in image && image.url) {
    rawUrl = image.url
  }
  // Strapi v4 format: nested data.attributes.url
  else if ('data' in image && image.data?.attributes?.url) {
    rawUrl = image.data.attributes.url
  }

  if (!rawUrl) return ''

  // If it's an external URL (e.g. Cloudinary), return as-is
  if (rawUrl.startsWith('http') && !rawUrl.includes('localhost') && !rawUrl.includes('127.0.0.1')) {
    return rawUrl
  }

  // For Strapi uploads, use the proxy path so Next.js Image can optimize them
  // /uploads/xxx.jpg -> /strapi-uploads/xxx.jpg
  if (rawUrl.startsWith('/uploads/')) {
    return `/strapi-uploads${rawUrl.replace('/uploads', '')}`
  }

  // Handle full localhost URLs
  if (rawUrl.includes('/uploads/')) {
    const uploadsPath = rawUrl.substring(rawUrl.indexOf('/uploads/') + '/uploads'.length)
    return `/strapi-uploads${uploadsPath}`
  }

  return rawUrl.startsWith('http') ? rawUrl : `${STRAPI_URL}${rawUrl}`
}

// Helper to extract attributes (Strapi v5 compatible)
// Strapi v5 returns data directly without attributes wrapper
export function extractAttributes<T>(data: StrapiData<T> | (T & { id: number; documentId?: string })): T & { id: number } {
  // Strapi v5 format: data is flat
  if (!('attributes' in data)) {
    return data as T & { id: number }
  }
  // Strapi v4 format: data has attributes
  return { ...data.attributes, id: data.id }
}

export function extractAttributesArray<T>(data: (StrapiData<T> | (T & { id: number; documentId?: string }))[]): (T & { id: number })[] {
  return data.map((item) => {
    // Strapi v5 format: data is flat
    if (!('attributes' in item)) {
      return item as T & { id: number }
    }
    // Strapi v4 format: data has attributes
    return { ...item.attributes, id: item.id }
  })
}

// Helper to extract relation data (Strapi v5 compatible)
export function extractRelation<T extends object>(
  relation: T | { data: { id: number; attributes: T } | null } | null | undefined
): (T & { id?: number }) | null {
  if (!relation) return null
  // Check if it's an object first
  if (typeof relation !== 'object') return null
  // Strapi v5 format: relation is direct object (no 'data' property)
  if (!('data' in relation)) {
    return relation as T & { id?: number }
  }
  // Strapi v4 format: relation has data.attributes
  const v4Relation = relation as { data: { id: number; attributes: T } | null }
  if (v4Relation.data) {
    return { ...v4Relation.data.attributes, id: v4Relation.data.id }
  }
  return null
}

export { fetchAPI }
