import { renderHook, act } from '@testing-library/react'
import { useCompare } from '@/hooks/useCompare'

// compare.ts uses localStorage which is available in jsdom
beforeEach(() => {
  localStorage.clear()
})

describe('useCompare', () => {
  it('initializes with empty list', () => {
    const { result } = renderHook(() => useCompare())
    expect(result.current.list).toEqual([])
  })

  it('initializes from existing localStorage data', () => {
    localStorage.setItem('vukia-compare', JSON.stringify(['toyota-camry']))

    const { result } = renderHook(() => useCompare())

    expect(result.current.list).toEqual(['toyota-camry'])
  })

  it('add() appends a slug to the list', () => {
    const { result } = renderHook(() => useCompare())

    act(() => {
      result.current.add('kia-seltos')
    })

    expect(result.current.list).toContain('kia-seltos')
  })

  it('add() does not add duplicate slugs', () => {
    const { result } = renderHook(() => useCompare())

    act(() => {
      result.current.add('kia-seltos')
      result.current.add('kia-seltos')
    })

    expect(result.current.list).toHaveLength(1)
  })

  it('add() respects MAX = 3 limit', () => {
    const { result } = renderHook(() => useCompare())

    act(() => {
      result.current.add('car-a')
      result.current.add('car-b')
      result.current.add('car-c')
      result.current.add('car-d')
    })

    expect(result.current.list).toHaveLength(3)
    expect(result.current.list).not.toContain('car-d')
  })

  it('remove() removes a slug from the list', () => {
    const { result } = renderHook(() => useCompare())

    act(() => {
      result.current.add('car-a')
      result.current.add('car-b')
    })

    act(() => {
      result.current.remove('car-a')
    })

    expect(result.current.list).toEqual(['car-b'])
  })

  it('clear() empties the list', () => {
    const { result } = renderHook(() => useCompare())

    act(() => {
      result.current.add('car-a')
      result.current.add('car-b')
    })

    act(() => {
      result.current.clear()
    })

    expect(result.current.list).toEqual([])
  })

  it('isInList() returns true for added slug', () => {
    const { result } = renderHook(() => useCompare())

    act(() => {
      result.current.add('mazda-cx5')
    })

    expect(result.current.isInList('mazda-cx5')).toBe(true)
  })

  it('isInList() returns false for absent slug', () => {
    const { result } = renderHook(() => useCompare())

    expect(result.current.isInList('nonexistent')).toBe(false)
  })

  it('dispatches compare-updated event on add', () => {
    const handler = jest.fn()
    window.addEventListener('compare-updated', handler)

    const { result } = renderHook(() => useCompare())

    act(() => {
      result.current.add('toyota-camry')
    })

    expect(handler).toHaveBeenCalled()
    window.removeEventListener('compare-updated', handler)
  })

  it('dispatches compare-updated event on remove', () => {
    const handler = jest.fn()

    const { result } = renderHook(() => useCompare())
    act(() => result.current.add('car-x'))

    window.addEventListener('compare-updated', handler)
    act(() => result.current.remove('car-x'))

    expect(handler).toHaveBeenCalled()
    window.removeEventListener('compare-updated', handler)
  })

  it('dispatches compare-updated event on clear', () => {
    const handler = jest.fn()
    window.addEventListener('compare-updated', handler)

    const { result } = renderHook(() => useCompare())
    act(() => result.current.clear())

    expect(handler).toHaveBeenCalled()
    window.removeEventListener('compare-updated', handler)
  })
})
