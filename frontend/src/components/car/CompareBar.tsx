'use client'

import { useCompare } from '@/hooks/useCompare'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { GitCompare, X } from 'lucide-react'

export function CompareBar() {
  const { list, clear } = useCompare()
  const router = useRouter()

  if (list.length < 2) return null

  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 border-t bg-background/95 p-3 shadow-lg backdrop-blur md:bottom-0">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm">
          <GitCompare className="h-4 w-4 text-primary" />
          <span>Đang so sánh <strong>{list.length}</strong> xe</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={clear}>
            <X className="mr-1 h-3 w-3" />
            Xóa
          </Button>
          <Button size="sm" onClick={() => router.push(`/so-sanh-xe?slugs=${list.join(',')}`)}>
            So sánh ngay
          </Button>
        </div>
      </div>
    </div>
  )
}
