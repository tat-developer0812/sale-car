import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedCars } from '@/components/home/FeaturedCars'
import { BrandShowcase } from '@/components/home/BrandShowcase'
import { LatestNews } from '@/components/home/LatestNews'
import { CTASection } from '@/components/home/CTASection'
import { WebsiteJsonLd } from '@/components/seo'
import { getAllBrands } from '@/lib/api/brands'
import { getFeaturedCars } from '@/lib/api/cars'
import { getLatestPosts } from '@/lib/api/posts'

export default async function HomePage() {
  let brands: Awaited<ReturnType<typeof getAllBrands>> = []
  let cars: Awaited<ReturnType<typeof getFeaturedCars>> = { data: [], pagination: undefined }
  let posts: Awaited<ReturnType<typeof getLatestPosts>> = { data: [], pagination: undefined }

  try {
    ;[brands, cars, posts] = await Promise.all([
      getAllBrands(),
      getFeaturedCars(8),
      getLatestPosts(3),
    ])
  } catch (error) {
    // Silently fail - components will show empty states
    console.error('Failed to fetch homepage data:', error)
  }

  return (
    <>
      <WebsiteJsonLd />
      <Header />
      <main>
        <HeroSection />
        <FeaturedCars cars={cars.data} />
        <BrandShowcase brands={brands} />
        <LatestNews posts={posts.data} />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
