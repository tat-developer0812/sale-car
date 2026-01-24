import { Post } from '@/types/post'
import { getStrapiImageUrl } from '@/lib/strapi'
import { siteConfig } from '@/config/site'

interface ArticleJsonLdProps {
  post: Post & { id: number }
}

export function ArticleJsonLd({ post }: ArticleJsonLdProps) {
  const imageUrl = getStrapiImageUrl(post.featuredImage)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl || undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author || 'Admin',
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.company.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/tin-tuc/${post.slug}`,
    },
    ...(post.readTime && {
      timeRequired: `PT${post.readTime}M`,
    }),
    articleSection: post.category,
    ...(post.tags && post.tags.length > 0 && {
      keywords: post.tags.join(', '),
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
