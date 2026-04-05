import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/types/post'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getStrapiImageUrl } from '@/lib/strapi'
import { formatDate } from '@/lib/format'
import { Calendar, Clock, User, Eye, Share2, Facebook, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PostContentProps {
  post: Post & { id: number }
  postUrl?: string
}

const categoryLabels: Record<string, string> = {
  review: 'Đánh giá',
  comparison: 'So sánh',
  guide: 'Hướng dẫn',
  news: 'Tin tức',
  promotion: 'Khuyến mãi',
}

export function PostContent({ post, postUrl = '' }: PostContentProps) {
  const imageUrl = getStrapiImageUrl(post.featuredImage)

  return (
    <article className="mx-auto max-w-3xl">
      {/* Category Badge */}
      <div className="mb-4">
        <Link href={`/tin-tuc?category=${post.category}`}>
          <Badge variant="secondary" className="text-sm">
            {categoryLabels[post.category] || post.category}
          </Badge>
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold leading-tight md:text-4xl">
        {post.title}
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="mt-4 text-lg text-muted-foreground">
          {post.excerpt}
        </p>
      )}

      {/* Meta Info */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <User className="h-4 w-4" />
          {post.author || 'Admin'}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {formatDate(post.publishedAt)}
        </span>
        {post.readTime && (
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readTime} phút đọc
          </span>
        )}
        {post.views > 0 && (
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {post.views} lượt xem
          </span>
        )}
      </div>

      <Separator className="my-6" />

      {/* Featured Image */}
      {imageUrl && (
        <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8">
          <Separator className="mb-6" />
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">Tags:</span>
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Share Buttons */}
      <div className="mt-8">
        <Separator className="mb-6" />
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-sm font-medium">
            <Share2 className="h-4 w-4" />
            Chia sẻ:
          </span>
          <Button variant="outline" size="sm" asChild>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  )
}
