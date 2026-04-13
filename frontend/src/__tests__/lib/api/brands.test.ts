import { getAllBrands, getBrandBySlug, getBrandSlugs } from '@/lib/api/brands'

jest.mock('@/lib/strapi', () => ({
  fetchAPI: jest.fn(),
  extractAttributes: (data: any) => {
    if (!('attributes' in data)) return data
    return { ...data.attributes, id: data.id }
  },
  extractAttributesArray: (data: any[]) =>
    data.map((item) => {
      if (!('attributes' in item)) return item
      return { ...item.attributes, id: item.id }
    }),
}))

const { fetchAPI } = require('@/lib/strapi')

const mockBrand = (id: number, name: string, slug: string) => ({ id, name, slug })

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getAllBrands', () => {
  it('fetches brands with logo populated and sorted by name', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: {} })

    await getAllBrands()

    const [url] = fetchAPI.mock.calls[0]
    expect(url).toContain('/api/brands')
    expect(url).toContain('logo')
    expect(url).toContain('name%3Aasc')
  })

  it('returns array of brands', async () => {
    const brands = [mockBrand(1, 'Kia', 'kia'), mockBrand(2, 'Mazda', 'mazda')]
    fetchAPI.mockResolvedValue({ data: brands, meta: {} })

    const result = await getAllBrands()

    expect(result).toHaveLength(2)
    expect(result[0].name).toBe('Kia')
  })

  it('returns empty array when no brands', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: {} })

    const result = await getAllBrands()

    expect(result).toEqual([])
  })
})

describe('getBrandBySlug', () => {
  it('returns null when brand not found', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: {} })

    const result = await getBrandBySlug('unknown-brand')

    expect(result).toBeNull()
  })

  it('returns the brand when found', async () => {
    const brand = mockBrand(3, 'Toyota', 'toyota')
    fetchAPI.mockResolvedValue({ data: [brand], meta: {} })

    const result = await getBrandBySlug('toyota')

    expect(result).not.toBeNull()
    expect(result!.slug).toBe('toyota')
    expect(result!.name).toBe('Toyota')
  })

  it('includes slug filter in URL', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: {} })

    await getBrandBySlug('honda')

    const [url] = fetchAPI.mock.calls[0]
    expect(url).toContain('honda')
  })
})

describe('getBrandSlugs', () => {
  it('extracts slugs from brand list', async () => {
    fetchAPI.mockResolvedValue({
      data: [
        { id: 1, attributes: { slug: 'kia' } },
        { id: 2, attributes: { slug: 'mazda' } },
      ],
      meta: {},
    })

    const result = await getBrandSlugs()

    expect(result).toEqual(['kia', 'mazda'])
  })

  it('returns empty array when no brands', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: {} })

    const result = await getBrandSlugs()

    expect(result).toEqual([])
  })
})
