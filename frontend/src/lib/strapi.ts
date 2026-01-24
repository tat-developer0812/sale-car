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

// Helper to get image URL
export function getStrapiImageUrl(image: { data: { attributes: { url: string } } | null } | undefined): string {
  if (!image?.data?.attributes?.url) return ''
  const url = image.data.attributes.url
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
}

// Helper to extract attributes
export function extractAttributes<T>(data: StrapiData<T>): T & { id: number } {
  return { ...data.attributes, id: data.id }
}

export function extractAttributesArray<T>(data: StrapiData<T>[]): (T & { id: number })[] {
  return data.map((item) => ({ ...item.attributes, id: item.id }))
}

export { fetchAPI }
