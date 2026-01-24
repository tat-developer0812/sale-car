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
