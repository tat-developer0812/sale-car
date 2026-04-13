import {
  getCompareList,
  addToCompare,
  removeFromCompare,
  clearCompare,
} from '@/lib/compare'

const KEY = 'vukia-compare'

beforeEach(() => {
  localStorage.clear()
})

describe('getCompareList', () => {
  it('returns empty array when storage is empty', () => {
    expect(getCompareList()).toEqual([])
  })

  it('returns stored slugs', () => {
    localStorage.setItem(KEY, JSON.stringify(['toyota-camry', 'honda-crv']))
    expect(getCompareList()).toEqual(['toyota-camry', 'honda-crv'])
  })

  it('returns empty array when storage contains invalid JSON', () => {
    localStorage.setItem(KEY, 'not-valid-json{')
    expect(getCompareList()).toEqual([])
  })
})

describe('addToCompare', () => {
  it('adds a slug to an empty list', () => {
    const result = addToCompare('toyota-camry')
    expect(result).toEqual(['toyota-camry'])
    expect(JSON.parse(localStorage.getItem(KEY)!)).toEqual(['toyota-camry'])
  })

  it('does not add duplicate slugs', () => {
    addToCompare('toyota-camry')
    const result = addToCompare('toyota-camry')
    expect(result).toEqual(['toyota-camry'])
  })

  it('allows up to 3 cars', () => {
    addToCompare('car-a')
    addToCompare('car-b')
    const result = addToCompare('car-c')
    expect(result).toHaveLength(3)
  })

  it('does not exceed 3 cars (MAX limit)', () => {
    addToCompare('car-a')
    addToCompare('car-b')
    addToCompare('car-c')
    const result = addToCompare('car-d')
    expect(result).toHaveLength(3)
    expect(result).not.toContain('car-d')
  })

  it('persists to localStorage', () => {
    addToCompare('kia-seltos')
    expect(localStorage.getItem(KEY)).toBe('["kia-seltos"]')
  })
})

describe('removeFromCompare', () => {
  it('removes a slug from the list', () => {
    localStorage.setItem(KEY, JSON.stringify(['car-a', 'car-b', 'car-c']))
    const result = removeFromCompare('car-b')
    expect(result).toEqual(['car-a', 'car-c'])
  })

  it('returns unchanged list if slug not found', () => {
    localStorage.setItem(KEY, JSON.stringify(['car-a']))
    const result = removeFromCompare('car-z')
    expect(result).toEqual(['car-a'])
  })

  it('returns empty array when removing last item', () => {
    localStorage.setItem(KEY, JSON.stringify(['car-a']))
    const result = removeFromCompare('car-a')
    expect(result).toEqual([])
  })

  it('persists the updated list to localStorage', () => {
    localStorage.setItem(KEY, JSON.stringify(['car-a', 'car-b']))
    removeFromCompare('car-a')
    expect(JSON.parse(localStorage.getItem(KEY)!)).toEqual(['car-b'])
  })
})

describe('clearCompare', () => {
  it('empties the compare list', () => {
    localStorage.setItem(KEY, JSON.stringify(['car-a', 'car-b']))
    clearCompare()
    expect(JSON.parse(localStorage.getItem(KEY)!)).toEqual([])
  })

  it('getCompareList returns [] after clear', () => {
    addToCompare('car-a')
    clearCompare()
    expect(getCompareList()).toEqual([])
  })
})
