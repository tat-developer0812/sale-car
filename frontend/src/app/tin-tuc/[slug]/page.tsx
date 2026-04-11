import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PostContent } from '@/components/blog/PostContent'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd'
import { getPostBySlug, getPostsByCategory } from '@/lib/api/posts'
import { getStrapiImageUrl } from '@/lib/strapi'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const post = await getPostBySlug(slug)

    if (!post) {
      return {
        title: 'Không tìm thấy bài viết',
      }
    }

    const imageUrl = getStrapiImageUrl(post.featuredImage)

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    return {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      keywords: post.seo?.keywords,
      alternates: {
        canonical: `${siteUrl}/tin-tuc/${slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        url: `${siteUrl}/tin-tuc/${slug}`,
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        authors: [post.author || 'Admin'],
        images: imageUrl ? [{ url: imageUrl }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: imageUrl ? [imageUrl] : undefined,
      },
    }
  } catch {
    return {
      title: 'Không tìm thấy bài viết',
    }
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params

  let post: Awaited<ReturnType<typeof getPostBySlug>> = null
  let relatedPosts: Awaited<ReturnType<typeof getPostsByCategory>> = { data: [], pagination: undefined }

  try {
    post = await getPostBySlug(slug)

    if (post) {
      // Get related posts from the same category
      const related = await getPostsByCategory(post.category, 4)
      // Filter out current post
      relatedPosts = {
        ...related,
        data: related.data.filter((p) => p.slug !== slug).slice(0, 3),
      }
    }
  } catch (error) {
    console.error('Failed to fetch post:', error)
  }

  if (!post) {
    notFound()
  }

  const categoryLabels: Record<string, string> = {
    review: 'Đánh giá',
    comparison: 'So sánh',
    guide: 'Hướng dẫn',
    news: 'Tin tức',
    promotion: 'Khuyến mãi',
  }

  return (
    <>
      <ArticleJsonLd post={post} />
      <Header />
      <main className="min-h-screen">
        <Container className="py-8">
          <Breadcrumbs
            items={[
              { title: 'Tin Tức', href: '/tin-tuc' },
              { title: categoryLabels[post.category] || post.category, href: `/tin-tuc?category=${post.category}` },
              { title: post.title },
            ]}
          />

          <div className="mt-8">
            <PostContent post={post} postUrl={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/tin-tuc/${post.slug}`} />
          </div>

          {/* Related Cars Section */}
          {post.relatedCars?.data && post.relatedCars.data.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">Xe liên quan trong bài viết</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {post.relatedCars.data.map((carData) => {
                  const car = carData.attributes
                  return (
                    <a
                      key={carData.id}
                      href={`/xe-o-to/${car.slug}`}
                      className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted"
                    >
                      <div className="text-lg font-medium">{car.name}</div>
                    </a>
                  )
                })}
              </div>
            </section>
          )}

          {/* Related Posts */}
          <RelatedPosts posts={relatedPosts.data} />
        </Container>
      </main>
      <Footer />
    </>
  )
}
