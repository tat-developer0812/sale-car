import { getAllPosts, getPostBySlug, getLatestPosts, getPostsByCategory, getPostSlugs } from '@/lib/api/posts'

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

const mockPagination = { page: 1, pageSize: 10, pageCount: 1, total: 2 }

const makePost = (id: number, title: string, slug: string) => ({ id, title, slug })

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getAllPosts', () => {
  it('calls fetchAPI with default params', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: { pagination: { ...mockPagination, total: 0 } } })

    await getAllPosts()

    const [url] = fetchAPI.mock.calls[0]
    expect(url).toContain('/api/posts')
    expect(url).toContain('pagination%5Bpage%5D=1')
    expect(url).toContain('pagination%5BpageSize%5D=10')
    expect(url).toContain('publishedAt%3Adesc')
  })

  it('returns posts and pagination', async () => {
    const posts = [makePost(1, 'Tin tức xe KIA', 'tin-tuc-xe-kia')]
    fetchAPI.mockResolvedValue({ data: posts, meta: { pagination: mockPagination } })

    const result = await getAllPosts()

    expect(result.data).toHaveLength(1)
    expect(result.pagination).toEqual(mockPagination)
  })

  it('appends category filter when set', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: { pagination: mockPagination } })

    await getAllPosts({ category: 'review' })

    const [url] = fetchAPI.mock.calls[0]
    expect(url).toContain('review')
  })

  it('respects custom page and pageSize', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: { pagination: mockPagination } })

    await getAllPosts({ page: 3, pageSize: 5 })

    const [url] = fetchAPI.mock.calls[0]
    expect(url).toContain('pagination%5Bpage%5D=3')
    expect(url).toContain('pagination%5BpageSize%5D=5')
  })
})

describe('getPostBySlug', () => {
  it('returns null when post not found', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: { pagination: mockPagination } })

    const result = await getPostBySlug('nonexistent')

    expect(result).toBeNull()
  })

  it('returns the post when found', async () => {
    const post = makePost(1, 'Review KIA Seltos 2024', 'review-kia-seltos-2024')
    fetchAPI.mockResolvedValue({ data: [post], meta: { pagination: mockPagination } })

    const result = await getPostBySlug('review-kia-seltos-2024')

    expect(result).not.toBeNull()
    expect(result!.slug).toBe('review-kia-seltos-2024')
  })
})

describe('getLatestPosts', () => {
  it('fetches with publishedAt:desc sort', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: { pagination: mockPagination } })

    await getLatestPosts(3)

    const [url] = fetchAPI.mock.calls[0]
    expect(url).toContain('publishedAt%3Adesc')
    expect(url).toContain('pagination%5BpageSize%5D=3')
  })
})

describe('getPostsByCategory', () => {
  it('includes category filter', async () => {
    fetchAPI.mockResolvedValue({ data: [], meta: { pagination: mockPagination } })

    await getPostsByCategory('news', 5)

    const [url] = fetchAPI.mock.calls[0]
    expect(url).toContain('news')
    expect(url).toContain('pagination%5BpageSize%5D=5')
  })
})

describe('getPostSlugs', () => {
  it('extracts slugs from v5 flat format', async () => {
    fetchAPI.mockResolvedValue({
      data: [
        { id: 1, slug: 'bai-viet-1' },
        { id: 2, slug: 'bai-viet-2' },
      ],
      meta: { pagination: mockPagination },
    })

    const result = await getPostSlugs()

    expect(result).toEqual(['bai-viet-1', 'bai-viet-2'])
  })

  it('filters out empty slugs', async () => {
    fetchAPI.mockResolvedValue({
      data: [{ id: 1, slug: 'valid' }, { id: 2, slug: '' }],
      meta: { pagination: mockPagination },
    })

    const result = await getPostSlugs()

    expect(result).toEqual(['valid'])
  })
})
