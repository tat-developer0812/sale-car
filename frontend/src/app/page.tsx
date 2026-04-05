import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { WhyVuKia } from '@/components/home/WhyVuKia'
import { FeaturedCars } from '@/components/home/FeaturedCars'
import { BrandShowcase } from '@/components/home/BrandShowcase'
import { InstallmentCalculator } from '@/components/home/InstallmentCalculator'
import { Testimonials } from '@/components/home/Testimonials'
import { LatestNews } from '@/components/home/LatestNews'
import { FAQSection } from '@/components/home/FAQSection'
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
    console.error('Failed to fetch homepage data:', error)
  }

  return (
    <>
      <WebsiteJsonLd />
      <Header />
      <main>
        <HeroSection />
        <WhyVuKia />
        <FeaturedCars cars={cars.data} />
        <BrandShowcase brands={brands} />
        <InstallmentCalculator />
        <Testimonials />
        <LatestNews posts={posts.data} />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
