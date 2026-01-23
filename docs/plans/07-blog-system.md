# Plan 07: Blog System

**Duration**: Days 18-21
**Phase**: Core Pages
**Prerequisites**: Plans 01-06 completed

---

## 🎯 Goals

- Blog listing page with categories
- Blog detail page with content
- Related posts
- Article schema markup
- Reading time calculation

---

## 📋 Tasks

### Blog Listing Page

Create `src/app/blog/page.tsx`:
```typescript
import { getAllPosts } from '@/lib/api/posts'
import { PostGrid } from '@/components/blog/PostGrid'
import { Container } from '@/components/layout/Container'

export default async function BlogPage({ searchParams }) {
  const page = Number(searchParams.page) || 1
  const category = searchParams.category

  const posts = await getAllPosts({ page, category })

  return (
    <Container className="py-8">
      <h1 className="text-3xl font-bold">Blog & News</h1>
      <PostGrid posts={posts.data} pagination={posts.pagination} />
    </Container>
  )
}
```

### Blog Detail Page

Create `src/app/blog/[slug]/page.tsx`:
```typescript
import { getPostBySlug } from '@/lib/api/posts'
import { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { PostContent } from '@/components/blog/PostContent'
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd'

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug)

  return (
    <>
      <ArticleJsonLd post={post} />
      <Container className="py-8">
        <PostContent post={post} />
      </Container>
    </>
  )
}
```

Create components in `src/components/blog/`:
- PostCard.tsx
- PostGrid.tsx
- PostContent.tsx
- RelatedPosts.tsx

**✅ Completion**: Blog system fully functional

---

## ➡️ Next Steps

Proceed to **Plan 08: Forms & Lead Capture UI**

**Status**: ⬜ Not Started
