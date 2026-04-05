export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'VuKia'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export const ITEMS_PER_PAGE = 12
export const MAX_PRICE = 5000000000 // 5 billion VND

export const CAR_CATEGORIES = [
  'sedan',
  'suv',
  'mpv',
  'hatchback',
  'pickup',
] as const

export const FUEL_TYPES = [
  'gasoline',
  'diesel',
  'hybrid',
  'electric',
] as const

export const TRANSMISSION_TYPES = [
  'manual',
  'automatic',
  'cvt',
] as const
