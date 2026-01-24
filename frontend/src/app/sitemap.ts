import { MetadataRoute } from 'next'
import { getCarSlugs } from '@/lib/api/cars'
import { getPostSlugs } from '@/lib/api/posts'
import { getAllBrands } from '@/lib/api/brands'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/xe-o-to`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tin-tuc`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/lien-he`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Dynamic pages - wrap in try/catch to handle API failures
  let carPages: MetadataRoute.Sitemap = []
  let brandPages: MetadataRoute.Sitemap = []
  let postPages: MetadataRoute.Sitemap = []

  try {
    const carSlugs = await getCarSlugs()
    carPages = carSlugs.map((slug) => ({
      url: `${baseUrl}/xe-o-to/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
  } catch (error) {
    console.error('Failed to fetch car slugs for sitemap:', error)
  }

  try {
    const brands = await getAllBrands()
    brandPages = brands.map((brand) => ({
      url: `${baseUrl}/thuong-hieu/${brand.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Failed to fetch brands for sitemap:', error)
  }

  try {
    const postSlugs = await getPostSlugs()
    postPages = postSlugs.map((slug) => ({
      url: `${baseUrl}/tin-tuc/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Failed to fetch post slugs for sitemap:', error)
  }

  return [...staticPages, ...carPages, ...brandPages, ...postPages]
}
