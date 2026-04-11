'use client'

import { useState, useEffect, useCallback } from 'react'
import { getCompareList, addToCompare, removeFromCompare, clearCompare } from '@/lib/compare'

export function useCompare() {
  const [list, setList] = useState<string[]>([])

  useEffect(() => {
    setList(getCompareList())
    const handler = () => setList(getCompareList())
    window.addEventListener('compare-updated', handler)
    return () => window.removeEventListener('compare-updated', handler)
  }, [])

  const add = useCallback((slug: string) => {
    setList(addToCompare(slug))
    window.dispatchEvent(new Event('compare-updated'))
  }, [])

  const remove = useCallback((slug: string) => {
    setList(removeFromCompare(slug))
    window.dispatchEvent(new Event('compare-updated'))
  }, [])

  const clear = useCallback(() => {
    clearCompare()
    setList([])
    window.dispatchEvent(new Event('compare-updated'))
  }, [])

  return { list, add, remove, clear, isInList: (slug: string) => list.includes(slug) }
}
