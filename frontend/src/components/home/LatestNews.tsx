import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Post } from '@/types/post'
import { getStrapiImageUrl } from '@/lib/strapi'
import { formatDate } from '@/lib/format'
import { ArrowRight, Calendar } from 'lucide-react'

interface LatestNewsProps {
  posts: (Post & { id: number })[]
}

const categoryLabels: Record<string, string> = {
  review: 'Đánh giá',
  comparison: 'So sánh',
  guide: 'Hướng dẫn',
  news: 'Tin tức',
  promotion: 'Khuyến mãi',
}

export function LatestNews({ posts }: LatestNewsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Tin Tức & Đánh Giá</h2>
            <p className="mt-2 text-muted-foreground">
              Cập nhật thông tin mới nhất về thị trường ô tô
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <Link href="/tin-tuc">
              Xem tất cả
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => {
            const imageUrl = getStrapiImageUrl(post.featuredImage)

            return (
              <Card key={post.id} className="overflow-hidden">
                <Link href={`/tin-tuc/${post.slug}`}>
                  <div className="relative aspect-video">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <span className="text-muted-foreground">No image</span>
                      </div>
                    )}
                  </div>
                </Link>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {categoryLabels[post.category] || post.category}
                    </Badge>
                    <span className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                  <Link href={`/tin-tuc/${post.slug}`}>
                    <h3 className="mt-3 line-clamp-2 text-lg font-semibold hover:text-primary">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button asChild>
            <Link href="/tin-tuc">
              Xem tất cả tin tức
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
