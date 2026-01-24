import { StrapiImage, SEO } from './strapi'
import { Car } from './car'

export interface Post {
  title: string
  slug: string
  excerpt: string
  content: string
  category: 'review' | 'comparison' | 'guide' | 'news' | 'promotion'
  tags?: string[]
  featuredImage: { data: { id: number; attributes: StrapiImage } | null }
  relatedCars?: { data: Array<{ id: number; attributes: Car }> | null }
  author: string
  seo?: SEO
  views: number
  readTime?: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}
