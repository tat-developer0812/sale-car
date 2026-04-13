import { getAllCars, getCarBySlug, getFeaturedCars, getLatestCars, getCarSlugs } from '@/lib/api/cars'

// Mock fetchAPI so tests don't hit the network
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

const mockPagination = { page: 1, pageSize: 12, pageCount: 1, total: 2 }

const makeCar = (id: number, name: string, slug: string) => ({
  id,
  name,
  slug,
  price: 1000000,
  status: 'available',
})

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getAllCars', () => {
  it('calls fetchAPI with default pagination and sort', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: { pagination: { ...mockPagination, total: 0 } } })

    await getAllCars()

    const [url] = fetchAPI.mock.calls[0]
    expect(url).toContain('pagination%5Bpage%5D=1')
    expect(url).toContain('pagination%5BpageSize%5D=12')
    expect(url).toContain('sort=createdAt%3Adesc')
  })

  it('returns data and pagination', async () => {
    const cars = [makeCar(1, 'Toyota Camry', 'toyota-camry')]
    fetchAPI.mockResolvedValue({ data: cars, meta: { pagination: mockPagination } })

    const result = await getAllCars()

    expect(result.data).toHaveLength(1)
    expect(result.pagination).toEqual(mockPagination)
  })

  it('appends brand filter when brand param is set', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: { pagination: mockPagination } })

    await getAllCars({ brand: 'toyota' })

    const [url] = fetchAPI.mock.calls[0]
    expect(url).toContain('filters%5Bbrand%5D%5Bslug%5D%5B%24eq%5D=toyota')
  })

  it('appends search filters when search param is set', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: { pagination: mockPagination } })

    await getAllCars({ search: 'camry' })

    const [url] = fetchAPI.mock.calls[0]
    expect(url).toContain('camry')
    // Both name and shortDescription containsi filters
    expect(url).toContain('%24containsi')
  })

  it('does not append search filter for empty/whitespace search', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: { pagination: mockPagination } })

    await getAllCars({ search: '   ' })

    const [url] = fetchAPI.mock.calls[0]
    expect(url).not.toContain('containsi')
  })

  it('respects custom pageSize and page', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: { pagination: mockPagination } })

    await getAllCars({ page: 2, pageSize: 6 })

    const [url] = fetchAPI.mock.calls[0]
    expect(url).toContain('pagination%5Bpage%5D=2')
    expect(url).toContain('pagination%5BpageSize%5D=6')
  })

  it('appends minPrice and maxPrice filters', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: { pagination: mockPagination } })

    await getAllCars({ minPrice: 500000000, maxPrice: 1000000000 })

    const [url] = fetchAPI.mock.calls[0]
    expect(url).toContain('500000000')
    expect(url).toContain('1000000000')
  })
})

describe('getCarBySlug', () => {
  it('returns null when no car found', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: { pagination: mockPagination } })

    const result = await getCarBySlug('nonexistent-slug')

    expect(result).toBeNull()
  })

  it('returns the first car when found', async () => {
    const car = makeCar(1, 'Toyota Camry', 'toyota-camry')
    fetchAPI.mockResolvedValue({ data: [car], meta: { pagination: mockPagination } })

    const result = await getCarBySlug('toyota-camry')

    expect(result).not.toBeNull()
    expect(result!.slug).toBe('toyota-camry')
  })

  it('includes slug filter in URL', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: { pagination: mockPagination } })

    await getCarBySlug('mazda-cx5')

    const [url] = fetchAPI.mock.calls[0]
    expect(url).toContain('mazda-cx5')
  })
})

describe('getFeaturedCars', () => {
  it('fetches with views:desc sort and available status', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: { pagination: mockPagination } })

    await getFeaturedCars(4)

    const [url] = fetchAPI.mock.calls[0]
    expect(url).toContain('views%3Adesc')
    expect(url).toContain('available')
    expect(url).toContain('pagination%5BpageSize%5D=4')
  })
})

describe('getLatestCars', () => {
  it('fetches with createdAt:desc sort', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: { pagination: mockPagination } })

    await getLatestCars(6)

    const [url] = fetchAPI.mock.calls[0]
    expect(url).toContain('createdAt%3Adesc')
    expect(url).toContain('pagination%5BpageSize%5D=6')
  })
})

describe('getCarSlugs', () => {
  it('extracts slugs from v5 flat format', async () => {
    fetchAPI.mockResolvedValue({
      data: [
        { id: 1, slug: 'toyota-camry' },
        { id: 2, slug: 'honda-crv' },
      ],
      meta: { pagination: mockPagination },
    })

    const result = await getCarSlugs()

    expect(result).toEqual(['toyota-camry', 'honda-crv'])
  })

  it('filters out empty slugs', async () => {
    fetchAPI.mockResolvedValue({
      data: [{ id: 1, slug: 'valid-slug' }, { id: 2, slug: '' }],
      meta: { pagination: mockPagination },
    })

    const result = await getCarSlugs()

    expect(result).toEqual(['valid-slug'])
  })
})
