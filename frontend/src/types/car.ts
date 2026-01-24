import { StrapiImage, SEO } from './strapi'
import { Brand } from './brand'

export interface CarSpecs {
  engine?: string
  power?: string
  torque?: string
  fuelConsumption?: string
  topSpeed?: string
  acceleration?: string
  length?: number
  width?: number
  height?: number
  wheelbase?: number
  groundClearance?: number
  curbWeight?: number
  seats?: number
  fuelTankCapacity?: number
  trunkCapacity?: number
  driveType?: string
  suspension?: string
  brakes?: string
  tires?: string
  airbags?: number
  safetyFeatures?: string[]
  infotainment?: string
  speakers?: number
  climateControl?: string
  other?: Record<string, unknown>
}

export interface Car {
  name: string
  slug: string
  brand: { data: { id: number; attributes: Brand } | null }
  price: number
  pricePromo?: number
  year: number
  status: 'available' | 'sold' | 'coming-soon'
  stockCount: number
  category: 'sedan' | 'suv' | 'mpv' | 'hatchback' | 'pickup'
  fuelType: 'gasoline' | 'diesel' | 'hybrid' | 'electric'
  transmission: 'manual' | 'automatic' | 'cvt'
  shortDescription: string
  fullDescription?: string
  features?: Record<string, unknown>
  colors?: Record<string, unknown>
  mainImage: { data: { id: number; attributes: StrapiImage } | null }
  gallery?: { data: Array<{ id: number; attributes: StrapiImage }> | null }
  video?: string
  brochure?: { data: { id: number; attributes: StrapiImage } | null }
  specs?: CarSpecs
  highlights?: string[]
  pros?: string[]
  cons?: string[]
  seo?: SEO
  views: number
  leadCount: number
  relatedCars?: { data: Array<{ id: number; attributes: Car }> | null }
  createdAt: string
  updatedAt: string
  publishedAt: string
}
