import { Post } from '@/types/post'
import { PostCard } from './PostCard'

interface RelatedPostsProps {
  posts: (Post & { id: number })[]
  title?: string
}

export function RelatedPosts({ posts, title = 'Bài viết liên quan' }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
