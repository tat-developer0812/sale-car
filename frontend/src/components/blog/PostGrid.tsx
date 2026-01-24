'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { PostCard } from './PostCard'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Post } from '@/types/post'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PostGridProps {
  posts: (Post & { id: number })[]
  pagination?: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
  isLoading?: boolean
}

function PostCardSkeleton() {
  return (
    <div className="rounded-lg border overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  )
}

export function PostGrid({ posts, pagination, isLoading }: PostGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`?${params.toString()}`)
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg font-medium">Không tìm thấy bài viết nào</p>
        <p className="mt-2 text-muted-foreground">
          Thử thay đổi bộ lọc hoặc quay lại sau
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Results Count */}
      {pagination && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Hiển thị {posts.length} trong tổng số {pagination.total} bài viết
          </p>
        </div>
      )}

      {/* Post Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.pageCount > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: pagination.pageCount }, (_, i) => i + 1)
              .filter((page) => {
                const current = pagination.page
                return (
                  page === 1 ||
                  page === pagination.pageCount ||
                  (page >= current - 1 && page <= current + 1)
                )
              })
              .map((page, index, array) => {
                const prevPage = array[index - 1]
                const showEllipsis = prevPage && page - prevPage > 1

                return (
                  <div key={page} className="flex items-center gap-1">
                    {showEllipsis && (
                      <span className="px-2 text-muted-foreground">...</span>
                    )}
                    <Button
                      variant={page === pagination.page ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  </div>
                )
              })}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.pageCount}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
