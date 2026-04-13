import {
  quickContactSchema,
  testDriveSchema,
  quoteSchema,
  contactSchema,
} from '@/lib/validations'

// ── quickContactSchema ────────────────────────────────────────────────────────

describe('quickContactSchema', () => {
  const valid = { name: 'Nguyễn Văn A', phone: '0931456204' }

  it('accepts valid minimal data', () => {
    expect(() => quickContactSchema.parse(valid)).not.toThrow()
  })

  it('rejects name shorter than 2 chars', () => {
    const result = quickContactSchema.safeParse({ ...valid, name: 'A' })
    expect(result.success).toBe(false)
  })

  it('rejects phone shorter than 10 digits', () => {
    const result = quickContactSchema.safeParse({ ...valid, phone: '093145' })
    expect(result.success).toBe(false)
  })

  it('rejects phone not starting with 0', () => {
    const result = quickContactSchema.safeParse({ ...valid, phone: '1931456204' })
    expect(result.success).toBe(false)
  })

  it('accepts valid 11-digit phone', () => {
    const result = quickContactSchema.safeParse({ ...valid, phone: '09314562040' })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email format', () => {
    const result = quickContactSchema.safeParse({ ...valid, email: 'not-an-email' })
    expect(result.success).toBe(false)
  })

  it('accepts empty string email', () => {
    const result = quickContactSchema.safeParse({ ...valid, email: '' })
    expect(result.success).toBe(true)
  })

  it('accepts valid email', () => {
    const result = quickContactSchema.safeParse({ ...valid, email: 'test@gmail.com' })
    expect(result.success).toBe(true)
  })

  it('accepts optional fields', () => {
    const result = quickContactSchema.safeParse({
      ...valid,
      message: 'Tôi muốn hỏi về xe KIA',
      source: 'homepage',
      carId: 3,
      carName: 'Kia Seltos',
    })
    expect(result.success).toBe(true)
  })
})

// ── testDriveSchema ───────────────────────────────────────────────────────────

describe('testDriveSchema', () => {
  const valid = {
    name: 'Trần Thị B',
    phone: '0909123456',
    carId: 1,
    carName: 'Toyota Camry',
    preferredDate: '2026-05-10',
    preferredTime: 'morning',
  }

  it('accepts valid data', () => {
    expect(() => testDriveSchema.parse(valid)).not.toThrow()
  })

  it('accepts all time enum values', () => {
    for (const time of ['morning', 'afternoon', 'evening'] as const) {
      expect(testDriveSchema.safeParse({ ...valid, preferredTime: time }).success).toBe(true)
    }
  })

  it('rejects invalid preferredTime', () => {
    const result = testDriveSchema.safeParse({ ...valid, preferredTime: 'night' })
    expect(result.success).toBe(false)
  })

  it('rejects missing preferredDate', () => {
    const { preferredDate: _, ...rest } = valid
    const result = testDriveSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it('rejects empty preferredDate', () => {
    const result = testDriveSchema.safeParse({ ...valid, preferredDate: '' })
    expect(result.success).toBe(false)
  })
})

// ── quoteSchema ───────────────────────────────────────────────────────────────

describe('quoteSchema', () => {
  const valid = {
    name: 'Lê Văn C',
    phone: '0912345678',
    carId: 2,
    carName: 'Honda CR-V',
  }

  it('accepts valid data', () => {
    expect(() => quoteSchema.parse(valid)).not.toThrow()
  })

  it('accepts all paymentMethod values', () => {
    for (const method of ['cash', 'loan', 'undecided'] as const) {
      expect(quoteSchema.safeParse({ ...valid, paymentMethod: method }).success).toBe(true)
    }
  })

  it('rejects invalid paymentMethod', () => {
    const result = quoteSchema.safeParse({ ...valid, paymentMethod: 'bitcoin' })
    expect(result.success).toBe(false)
  })

  it('rejects short name', () => {
    const result = quoteSchema.safeParse({ ...valid, name: 'L' })
    expect(result.success).toBe(false)
  })
})

// ── contactSchema ─────────────────────────────────────────────────────────────

describe('contactSchema', () => {
  const valid = {
    name: 'Phạm Văn D',
    phone: '0987654321',
    subject: 'Hỏi về giá xe',
    message: 'Tôi muốn biết thêm về chính sách giá xe KIA Seltos 2024.',
  }

  it('accepts valid data', () => {
    expect(() => contactSchema.parse(valid)).not.toThrow()
  })

  it('rejects missing subject', () => {
    const result = contactSchema.safeParse({ ...valid, subject: '' })
    expect(result.success).toBe(false)
  })

  it('rejects message shorter than 10 chars', () => {
    const result = contactSchema.safeParse({ ...valid, message: 'Hỏi giá' })
    expect(result.success).toBe(false)
  })

  it('accepts exactly 10-char message', () => {
    const result = contactSchema.safeParse({ ...valid, message: '1234567890' })
    expect(result.success).toBe(true)
  })

  it('rejects invalid phone', () => {
    const result = contactSchema.safeParse({ ...valid, phone: '1234567890' })
    expect(result.success).toBe(false)
  })
})
