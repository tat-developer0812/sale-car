'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

const categories = [
  { value: '', label: 'Tất cả' },
  { value: 'news', label: 'Tin tức' },
  { value: 'review', label: 'Đánh giá' },
  { value: 'comparison', label: 'So sánh' },
  { value: 'guide', label: 'Hướng dẫn' },
  { value: 'promotion', label: 'Khuyến mãi' },
]

export function PostCategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category') || ''

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    params.delete('page') // Reset to page 1
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={currentCategory === category.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleCategoryChange(category.value)}
        >
          {category.label}
        </Button>
      ))}
    </div>
  )
}
