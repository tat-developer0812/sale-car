export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PostGrid } from '@/components/blog/PostGrid'
import { PostCategoryFilter } from '@/components/blog/PostCategoryFilter'
import { getAllPosts } from '@/lib/api/posts'

export const metadata: Metadata = {
  title: 'Tin Tức Ô Tô',
  description: 'Cập nhật tin tức, đánh giá, so sánh xe ô tô mới nhất. Hướng dẫn mua xe, khuyến mãi hấp dẫn.',
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>
}

async function PostListContent({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const page = Number(searchParams.page) || 1
  const category = searchParams.category

  let posts: Awaited<ReturnType<typeof getAllPosts>> = { data: [], pagination: undefined }

  try {
    posts = await getAllPosts({ page, category })
  } catch (error) {
    console.error('Failed to fetch posts:', error)
  }

  return (
    <div>
      <div className="mb-8">
        <PostCategoryFilter />
      </div>
      <PostGrid posts={posts.data} pagination={posts.pagination} />
    </div>
  )
}

function PostListSkeleton() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-9 w-20 animate-pulse rounded-md bg-muted" />
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg border">
            <div className="aspect-video animate-pulse bg-muted" />
            <div className="p-4">
              <div className="h-4 w-16 animate-pulse rounded bg-muted" />
              <div className="mt-2 h-6 w-full animate-pulse rounded bg-muted" />
              <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-muted" />
              <div className="mt-4 flex gap-4">
                <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Container className="py-8">
          <Breadcrumbs items={[{ title: 'Tin Tức' }]} />

          <div className="mt-6">
            <h1 className="text-3xl font-bold">Tin Tức Ô Tô</h1>
            <p className="mt-2 text-muted-foreground">
              Cập nhật tin tức, đánh giá, so sánh và hướng dẫn mua xe mới nhất
            </p>
          </div>

          <div className="mt-8">
            <Suspense fallback={<PostListSkeleton />}>
              <PostListContent searchParams={params} />
            </Suspense>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
