import { getStrapiImageUrl, extractAttributes, extractAttributesArray, extractRelation, StrapiError } from '@/lib/strapi'

// Mock the constants module so we don't need env vars
jest.mock('@/lib/constants', () => ({
  STRAPI_URL: 'http://localhost:1337',
}))

describe('getStrapiImageUrl', () => {
  it('returns empty string for null', () => {
    expect(getStrapiImageUrl(null)).toBe('')
  })

  it('returns empty string for undefined', () => {
    expect(getStrapiImageUrl(undefined)).toBe('')
  })

  it('returns external Cloudinary URL as-is', () => {
    const url = 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
    expect(getStrapiImageUrl({ url })).toBe(url)
  })

  it('converts /uploads/ path to /strapi-uploads/ proxy', () => {
    expect(getStrapiImageUrl({ url: '/uploads/car-image.jpg' })).toBe('/strapi-uploads/car-image.jpg')
  })

  it('converts full localhost URL to proxy path', () => {
    expect(getStrapiImageUrl({ url: 'http://localhost:1337/uploads/photo.jpg' })).toBe('/strapi-uploads/photo.jpg')
  })

  it('handles Strapi v4 nested data format', () => {
    const image = { data: { attributes: { url: '/uploads/logo.png' } } }
    expect(getStrapiImageUrl(image)).toBe('/strapi-uploads/logo.png')
  })

  it('returns empty string for v4 null data', () => {
    expect(getStrapiImageUrl({ data: null })).toBe('')
  })

  it('returns empty string for object with empty url', () => {
    expect(getStrapiImageUrl({ url: '' })).toBe('')
  })
})

describe('extractAttributes', () => {
  it('returns Strapi v5 flat data as-is', () => {
    const data = { id: 1, name: 'Toyota', slug: 'toyota' }
    expect(extractAttributes(data)).toEqual({ id: 1, name: 'Toyota', slug: 'toyota' })
  })

  it('extracts v4 attributes and merges id', () => {
    const data = { id: 5, attributes: { name: 'Honda', slug: 'honda' } }
    expect(extractAttributes(data as any)).toEqual({ id: 5, name: 'Honda', slug: 'honda' })
  })
})

describe('extractAttributesArray', () => {
  it('maps over array of v5 flat items', () => {
    const data = [
      { id: 1, name: 'Toyota' },
      { id: 2, name: 'Honda' },
    ]
    expect(extractAttributesArray(data)).toEqual(data)
  })

  it('maps over array of v4 attribute items', () => {
    const data = [
      { id: 1, attributes: { name: 'Toyota', slug: 'toyota' } },
      { id: 2, attributes: { name: 'Honda', slug: 'honda' } },
    ]
    const result = extractAttributesArray(data as any)
    expect(result[0]).toEqual({ id: 1, name: 'Toyota', slug: 'toyota' })
    expect(result[1]).toEqual({ id: 2, name: 'Honda', slug: 'honda' })
  })

  it('returns empty array for empty input', () => {
    expect(extractAttributesArray([])).toEqual([])
  })
})

describe('extractRelation', () => {
  it('returns null for null/undefined', () => {
    expect(extractRelation(null)).toBeNull()
    expect(extractRelation(undefined)).toBeNull()
  })

  it('returns v5 direct object relation', () => {
    const relation = { id: 3, name: 'Kia', slug: 'kia' }
    expect(extractRelation(relation)).toEqual(relation)
  })

  it('extracts v4 data.attributes relation', () => {
    const relation = { data: { id: 4, attributes: { name: 'Mazda', slug: 'mazda' } } }
    expect(extractRelation(relation as any)).toEqual({ id: 4, name: 'Mazda', slug: 'mazda' })
  })

  it('returns null when v4 data is null', () => {
    expect(extractRelation({ data: null } as any)).toBeNull()
  })
})

describe('StrapiError', () => {
  it('has the correct name', () => {
    const err = new StrapiError('Not found', 404)
    expect(err.name).toBe('StrapiError')
    expect(err.message).toBe('Not found')
    expect(err.status).toBe(404)
  })

  it('is instanceof Error', () => {
    expect(new StrapiError('oops')).toBeInstanceOf(Error)
  })
})
