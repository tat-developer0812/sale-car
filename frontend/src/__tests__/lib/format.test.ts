import { formatPrice, formatDate, formatNumber, generateSlug } from '@/lib/format'

describe('formatPrice', () => {
  it('[TEST EMAIL] intentional fail — will revert', () => {
    expect(1 + 1).toBe(999)
  })

  it('formats millions with dot separators and ₫ symbol', () => {
    expect(formatPrice(1500000)).toBe('1.500.000 ₫')
  })

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('0 ₫')
  })

  it('accepts string input', () => {
    expect(formatPrice('1000000')).toBe('1.000.000 ₫')
  })

  it('rounds decimal values', () => {
    expect(formatPrice(1500000.6)).toBe('1.500.001 ₫')
    expect(formatPrice(1500000.4)).toBe('1.500.000 ₫')
  })

  it('formats large car prices correctly', () => {
    expect(formatPrice(1929000000)).toBe('1.929.000.000 ₫')
    expect(formatPrice(598000000)).toBe('598.000.000 ₫')
  })

  it('formats small prices', () => {
    expect(formatPrice(100)).toBe('100 ₫')
    expect(formatPrice(999)).toBe('999 ₫')
    expect(formatPrice(1000)).toBe('1.000 ₫')
  })
})

describe('formatDate', () => {
  it('formats a valid ISO date string', () => {
    const result = formatDate('2026-03-15T00:00:00.000Z')
    expect(result).toMatch(/15 tháng 3, 2026/)
  })

  it('formats a Date object', () => {
    const result = formatDate(new Date('2026-01-01'))
    expect(result).toMatch(/tháng 1, 2026/)
  })

  it('returns empty string for invalid date', () => {
    expect(formatDate('not-a-date')).toBe('')
  })

  it('returns empty string for empty string', () => {
    expect(formatDate('')).toBe('')
  })
})

describe('formatNumber', () => {
  it('formats with dot thousand separators', () => {
    expect(formatNumber(1000000)).toBe('1.000.000')
  })

  it('handles zero', () => {
    expect(formatNumber(0)).toBe('0')
  })

  it('handles numbers below 1000', () => {
    expect(formatNumber(500)).toBe('500')
  })

  it('rounds decimals', () => {
    expect(formatNumber(1000.7)).toBe('1.001')
    expect(formatNumber(1000.2)).toBe('1.000')
  })
})

describe('generateSlug', () => {
  it('converts basic English text to slug', () => {
    expect(generateSlug('Toyota Camry')).toBe('toyota-camry')
  })

  it('strips Vietnamese diacritics', () => {
    expect(generateSlug('xe ô tô')).toBe('xe-o-to')
    expect(generateSlug('Hà Nội')).toBe('ha-noi')
  })

  it('converts đ/Đ to d/D', () => {
    expect(generateSlug('đường phố')).toBe('duong-pho')
    expect(generateSlug('Đà Lạt')).toBe('da-lat')
  })

  it('replaces multiple spaces/symbols with single dash', () => {
    expect(generateSlug('hello   world')).toBe('hello-world')
    expect(generateSlug('foo & bar')).toBe('foo-bar')
  })

  it('trims leading and trailing dashes', () => {
    expect(generateSlug('  hello  ')).toBe('hello')
  })

  it('handles brand-model-variant patterns', () => {
    // The dot in "1.6" becomes a dash separator
    expect(generateSlug('Kia Seltos 1.6 Premium')).toBe('kia-seltos-1-6-premium')
    expect(generateSlug('Mercedes-Benz C200 AMG')).toBe('mercedes-benz-c200-amg')
  })
})
