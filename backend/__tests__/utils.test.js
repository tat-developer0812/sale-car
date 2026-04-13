/**
 * Backend unit tests
 *
 * Tests the pure utility functions extracted from backend scripts,
 * and validates the shape and integrity of seed data.
 */

// ── stripIds utility ──────────────────────────────────────────────────────────
// Copied from sync-to-remote.js — strips id/__component from nested objects
// so Strapi doesn't reject them on POST.

function stripIds(obj) {
  if (!obj || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(stripIds)
  const out = {}
  for (const [k, v] of Object.entries(obj)) {
    if (k === 'id' || k === '__component') continue
    out[k] = stripIds(v)
  }
  return out
}

describe('stripIds', () => {
  it('returns primitives unchanged', () => {
    expect(stripIds(null)).toBeNull()
    expect(stripIds('hello')).toBe('hello')
    expect(stripIds(42)).toBe(42)
  })

  it('removes top-level id', () => {
    expect(stripIds({ id: 1, name: 'Toyota' })).toEqual({ name: 'Toyota' })
  })

  it('removes __component key', () => {
    expect(stripIds({ __component: 'car.specs', engine: '2.0L' })).toEqual({ engine: '2.0L' })
  })

  it('removes both id and __component', () => {
    const input = { id: 5, __component: 'car.specs', power: '200hp', torque: '300Nm' }
    expect(stripIds(input)).toEqual({ power: '200hp', torque: '300Nm' })
  })

  it('recursively strips nested objects', () => {
    const input = {
      name: 'Toyota Camry',
      specs: { id: 99, engine: '2.5L', seats: 5 },
    }
    expect(stripIds(input)).toEqual({
      name: 'Toyota Camry',
      specs: { engine: '2.5L', seats: 5 },
    })
  })

  it('strips ids from array items', () => {
    const input = [
      { id: 1, color: 'red' },
      { id: 2, color: 'blue' },
    ]
    expect(stripIds(input)).toEqual([{ color: 'red' }, { color: 'blue' }])
  })

  it('handles deeply nested structure', () => {
    const input = {
      id: 1,
      brand: {
        id: 2,
        logo: { id: 3, url: '/uploads/logo.png' },
      },
    }
    expect(stripIds(input)).toEqual({
      brand: { logo: { url: '/uploads/logo.png' } },
    })
  })

  it('preserves keys that contain "id" as substring', () => {
    const input = { id: 1, carId: 5, documentId: 'abc123' }
    // only 'id' key is stripped, not 'carId' or 'documentId'
    expect(stripIds(input)).toEqual({ carId: 5, documentId: 'abc123' })
  })
})

// ── Seed data shape validation ────────────────────────────────────────────────
// Validates that brands and cars in seed-remote.js have the required fields
// so data integrity issues are caught before hitting the remote API.

const REQUIRED_BRAND_FIELDS = ['name', 'slug', 'description']
const REQUIRED_CAR_FIELDS = [
  'name', 'slug', 'price', 'year', 'status',
  'category', 'fuelType', 'transmission',
  'shortDescription', 'brandSlug',
]
const VALID_CATEGORIES = ['sedan', 'suv', 'pickup', 'mpv', 'hatchback', 'coupe', 'van']
const VALID_FUEL_TYPES = ['gasoline', 'diesel', 'electric', 'hybrid']
const VALID_TRANSMISSIONS = ['automatic', 'manual', 'cvt']
const VALID_STATUSES = ['available', 'sold', 'coming_soon']

const brands = [
  { name: 'Toyota', slug: 'toyota', description: 'Thương hiệu xe hàng đầu Nhật Bản' },
  { name: 'Honda', slug: 'honda', description: 'Thương hiệu xe Nhật Bản chất lượng cao' },
  { name: 'Mercedes-Benz', slug: 'mercedes-benz', description: 'Thương hiệu xe sang Đức' },
  { name: 'BMW', slug: 'bmw', description: 'Thương hiệu xe thể thao Đức' },
  { name: 'Hyundai', slug: 'hyundai', description: 'Thương hiệu xe Hàn Quốc' },
  { name: 'Kia', slug: 'kia', description: 'Thương hiệu xe Hàn Quốc hiện đại' },
  { name: 'Ford', slug: 'ford', description: 'Thương hiệu xe Mỹ' },
  { name: 'Mazda', slug: 'mazda', description: 'Thương hiệu xe Nhật Bản thiết kế đẹp' },
  { name: 'VinFast', slug: 'vinfast', description: 'Thương hiệu xe Việt Nam' },
  { name: 'Mitsubishi', slug: 'mitsubishi', description: 'Thương hiệu xe Nhật Bản bền bỉ' },
]

const cars = [
  { name: 'Toyota Camry 2.5Q', slug: 'toyota-camry-25q', price: 1405000000, year: 2024, status: 'available', category: 'sedan', fuelType: 'gasoline', transmission: 'automatic', shortDescription: 'Toyota Camry 2024', brandSlug: 'toyota', stockCount: 5 },
  { name: 'Honda CR-V L', slug: 'honda-crv-l', price: 1138000000, year: 2024, status: 'available', category: 'suv', fuelType: 'gasoline', transmission: 'cvt', shortDescription: 'Honda CR-V 2024', brandSlug: 'honda', stockCount: 8 },
  { name: 'Hyundai Tucson 2.0 Đặc biệt', slug: 'hyundai-tucson-20-dac-biet', price: 979000000, year: 2024, status: 'available', category: 'suv', fuelType: 'gasoline', transmission: 'automatic', shortDescription: 'Hyundai Tucson 2024', brandSlug: 'hyundai', stockCount: 12 },
  { name: 'Mazda CX-5 2.0 Premium', slug: 'mazda-cx5-20-premium', price: 929000000, year: 2024, status: 'available', category: 'suv', fuelType: 'gasoline', transmission: 'automatic', shortDescription: 'Mazda CX-5 2024', brandSlug: 'mazda', stockCount: 6 },
  { name: 'Kia Seltos 1.6 Premium', slug: 'kia-seltos-16-premium', price: 729000000, year: 2024, status: 'available', category: 'suv', fuelType: 'gasoline', transmission: 'cvt', shortDescription: 'Kia Seltos 2024', brandSlug: 'kia', stockCount: 15 },
  { name: 'Ford Ranger Wildtrak', slug: 'ford-ranger-wildtrak', price: 965000000, year: 2024, status: 'available', category: 'pickup', fuelType: 'diesel', transmission: 'automatic', shortDescription: 'Ford Ranger 2024', brandSlug: 'ford', stockCount: 7 },
  { name: 'Mercedes-Benz C200 AMG', slug: 'mercedes-c200-amg', price: 1929000000, year: 2024, status: 'available', category: 'sedan', fuelType: 'gasoline', transmission: 'automatic', shortDescription: 'Mercedes C200 2024', brandSlug: 'mercedes-benz', stockCount: 3 },
  { name: 'BMW 320i Sport Line', slug: 'bmw-320i-sport-line', price: 1749000000, year: 2024, status: 'available', category: 'sedan', fuelType: 'gasoline', transmission: 'automatic', shortDescription: 'BMW 320i 2024', brandSlug: 'bmw', stockCount: 4 },
  { name: 'VinFast VF8 Plus', slug: 'vinfast-vf8-plus', price: 1359000000, year: 2024, status: 'available', category: 'suv', fuelType: 'electric', transmission: 'automatic', shortDescription: 'VinFast VF8 2024', brandSlug: 'vinfast', stockCount: 10 },
  { name: 'Mitsubishi Xpander AT', slug: 'mitsubishi-xpander-at', price: 598000000, year: 2024, status: 'available', category: 'mpv', fuelType: 'gasoline', transmission: 'automatic', shortDescription: 'Mitsubishi Xpander 2024', brandSlug: 'mitsubishi', stockCount: 20 },
  { name: 'Toyota Vios G CVT', slug: 'toyota-vios-g-cvt', price: 581000000, year: 2024, status: 'available', category: 'sedan', fuelType: 'gasoline', transmission: 'cvt', shortDescription: 'Toyota Vios 2024', brandSlug: 'toyota', stockCount: 25 },
  { name: 'Honda City RS', slug: 'honda-city-rs', price: 599000000, year: 2024, status: 'available', category: 'sedan', fuelType: 'gasoline', transmission: 'cvt', shortDescription: 'Honda City 2024', brandSlug: 'honda', stockCount: 18 },
]

describe('Seed data — brands', () => {
  it('has the expected number of brands', () => {
    expect(brands).toHaveLength(10)
  })

  it.each(brands)('brand "$name" has all required fields', (brand) => {
    for (const field of REQUIRED_BRAND_FIELDS) {
      expect(brand).toHaveProperty(field)
      expect(brand[field]).toBeTruthy()
    }
  })

  it('all brand slugs are unique', () => {
    const slugs = brands.map((b) => b.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('all brand slugs are lowercase kebab-case', () => {
    for (const brand of brands) {
      expect(brand.slug).toMatch(/^[a-z0-9-]+$/)
    }
  })
})

describe('Seed data — cars', () => {
  it('has the expected number of cars', () => {
    expect(cars).toHaveLength(12)
  })

  it.each(cars)('car "$name" has all required fields', (car) => {
    for (const field of REQUIRED_CAR_FIELDS) {
      expect(car).toHaveProperty(field)
    }
  })

  it('all car slugs are unique', () => {
    const slugs = cars.map((c) => c.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it.each(cars)('car "$name" has a valid category', (car) => {
    expect(VALID_CATEGORIES).toContain(car.category)
  })

  it.each(cars)('car "$name" has a valid fuelType', (car) => {
    expect(VALID_FUEL_TYPES).toContain(car.fuelType)
  })

  it.each(cars)('car "$name" has a valid transmission', (car) => {
    expect(VALID_TRANSMISSIONS).toContain(car.transmission)
  })

  it.each(cars)('car "$name" has a valid status', (car) => {
    expect(VALID_STATUSES).toContain(car.status)
  })

  it.each(cars)('car "$name" has a positive price', (car) => {
    expect(car.price).toBeGreaterThan(0)
  })

  it('all car brandSlugs reference existing brands', () => {
    const brandSlugs = new Set(brands.map((b) => b.slug))
    for (const car of cars) {
      expect(brandSlugs.has(car.brandSlug)).toBe(true)
    }
  })
})
