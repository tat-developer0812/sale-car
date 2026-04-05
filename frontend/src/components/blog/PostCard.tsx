import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/types/post'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getStrapiImageUrl } from '@/lib/strapi'
import { formatDate } from '@/lib/format'
import { Calendar, Clock, Eye } from 'lucide-react'

interface PostCardProps {
  post: Post & { id: number }
  variant?: 'default' | 'horizontal'
}

const categoryLabels: Record<string, string> = {
  review: 'Đánh giá',
  comparison: 'So sánh',
  guide: 'Hướng dẫn',
  news: 'Tin tức',
  promotion: 'Khuyến mãi',
}

const categoryColors: Record<string, string> = {
  review: 'bg-blue-100 text-blue-800',
  comparison: 'bg-purple-100 text-purple-800',
  guide: 'bg-green-100 text-green-800',
  news: 'bg-orange-100 text-orange-800',
  promotion: 'bg-red-100 text-red-800',
}

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  const imageUrl = getStrapiImageUrl(post.featuredImage)

  if (variant === 'horizontal') {
    return (
      <Card className="group overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <Link
            href={`/tin-tuc/${post.slug}`}
            className="relative aspect-video w-full sm:aspect-[4/3] sm:w-48 flex-shrink-0"
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
          </Link>
          <CardContent className="flex flex-1 flex-col justify-center p-4">
            <div className="flex items-center gap-2">
              <Badge className={categoryColors[post.category] || ''} variant="secondary">
                {categoryLabels[post.category] || post.category}
              </Badge>
            </div>
            <Link href={`/tin-tuc/${post.slug}`}>
              <h3 className="mt-2 line-clamp-2 font-semibold transition-colors group-hover:text-primary">
                {post.title}
              </h3>
            </Link>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {post.excerpt}
            </p>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(post.publishedAt)}
              </span>
              {post.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime} phút đọc
                </span>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group overflow-hidden">
      <Link href={`/tin-tuc/${post.slug}`}>
        <div className="relative aspect-video overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
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
          <Badge className={categoryColors[post.category] || ''} variant="secondary">
            {categoryLabels[post.category] || post.category}
          </Badge>
          {post.views > 0 && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Eye className="h-3 w-3" />
              {post.views}
            </span>
          )}
        </div>
        <Link href={`/tin-tuc/${post.slug}`}>
          <h3 className="mt-3 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-primary">
            {post.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(post.publishedAt)}
          </span>
          {post.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime} phút đọc
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
