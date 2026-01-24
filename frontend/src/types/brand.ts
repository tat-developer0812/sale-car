import { StrapiImage, SEO } from './strapi'

export interface Brand {
  name: string
  slug: string
  logo: { data: { id: number; attributes: StrapiImage } | null }
  description?: string
  seo?: SEO
  createdAt: string
  updatedAt: string
  publishedAt: string
}
