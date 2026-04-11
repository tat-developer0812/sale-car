'use client'

import { useCompare } from '@/hooks/useCompare'
import { Button } from '@/components/ui/button'
import { GitCompare, Check } from 'lucide-react'

export function CompareButton({ slug, name }: { slug: string; name: string }) {
  const { isInList, add, remove, list } = useCompare()
  const inList = isInList(slug)
  const full = list.length >= 3 && !inList

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`text-xs ${inList ? 'text-primary' : ''}`}
      disabled={full}
      onClick={(e) => {
        e.preventDefault()
        inList ? remove(slug) : add(slug)
      }}
      title={full ? 'Tối đa 3 xe' : inList ? 'Bỏ so sánh' : 'Thêm để so sánh'}
    >
      {inList ? <Check className="mr-1 h-3 w-3" /> : <GitCompare className="mr-1 h-3 w-3" />}
      {inList ? 'Đang so sánh' : 'So sánh'}
    </Button>
  )
}
