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

// Strapi v5 compatible types - relations can be either v4 or v5 format
type StrapiRelation<T> = T | { data: { id: number; attributes: T } | null } | null
type StrapiRelationArray<T> = T[] | { data: Array<{ id: number; attributes: T }> | null } | null

export interface Car {
  name: string
  slug: string
  brand: StrapiRelation<Brand & { id?: number }>
  price: number | string
  pricePromo?: number | string
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
  mainImage: StrapiRelation<StrapiImage>
  gallery?: StrapiRelationArray<StrapiImage>
  video?: string
  brochure?: StrapiRelation<StrapiImage>
  specs?: CarSpecs
  highlights?: string[]
  pros?: string[]
  cons?: string[]
  seo?: SEO
  views: number
  leadCount: number
  relatedCars?: StrapiRelationArray<Car & { id?: number }>
  createdAt: string
  updatedAt: string
  publishedAt: string
}
