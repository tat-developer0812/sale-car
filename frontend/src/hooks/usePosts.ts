import { useQuery } from '@tanstack/react-query'
import { getAllPosts, getPostBySlug, GetPostsParams } from '@/lib/api/posts'

export function usePosts(params?: GetPostsParams) {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => getAllPosts(params),
  })
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug,
  })
}
