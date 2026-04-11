const KEY = 'vukia-compare'
const MAX = 3

export function getCompareList(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function addToCompare(slug: string): string[] {
  const list = getCompareList()
  if (list.includes(slug) || list.length >= MAX) return list
  const next = [...list, slug]
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}

export function removeFromCompare(slug: string): string[] {
  const next = getCompareList().filter((s) => s !== slug)
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}

export function clearCompare(): void {
  localStorage.setItem(KEY, '[]')
}
