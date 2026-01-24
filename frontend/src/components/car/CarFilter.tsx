'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Brand } from '@/types/brand'
import { CAR_CATEGORIES, FUEL_TYPES, TRANSMISSION_TYPES } from '@/lib/constants'
import { X } from 'lucide-react'

interface CarFilterProps {
  brands: (Brand & { id: number })[]
}

const categoryLabels: Record<string, string> = {
  sedan: 'Sedan',
  suv: 'SUV',
  mpv: 'MPV',
  hatchback: 'Hatchback',
  pickup: 'Pickup',
}

const fuelLabels: Record<string, string> = {
  gasoline: 'Xăng',
  diesel: 'Dầu',
  hybrid: 'Hybrid',
  electric: 'Điện',
}

const transmissionLabels: Record<string, string> = {
  manual: 'Số sàn',
  automatic: 'Số tự động',
  cvt: 'CVT',
}

const priceRanges = [
  { label: 'Dưới 500 triệu', min: 0, max: 500000000 },
  { label: '500 triệu - 1 tỷ', min: 500000000, max: 1000000000 },
  { label: '1 tỷ - 2 tỷ', min: 1000000000, max: 2000000000 },
  { label: 'Trên 2 tỷ', min: 2000000000, max: undefined },
]

export function CarFilter({ brands }: CarFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentBrand = searchParams.get('brand') || ''
  const currentCategory = searchParams.get('category') || ''
  const currentFuelType = searchParams.get('fuelType') || ''
  const currentTransmission = searchParams.get('transmission') || ''
  const currentMinPrice = searchParams.get('minPrice') || ''
  const currentMaxPrice = searchParams.get('maxPrice') || ''

  const hasActiveFilters =
    currentBrand ||
    currentCategory ||
    currentFuelType ||
    currentTransmission ||
    currentMinPrice ||
    currentMaxPrice

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page') // Reset to page 1 when filter changes
    router.push(`?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('?')
  }

  const handlePriceRange = (rangeIndex: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (rangeIndex === '') {
      params.delete('minPrice')
      params.delete('maxPrice')
    } else {
      const range = priceRanges[parseInt(rangeIndex)]
      if (range.min !== undefined) {
        params.set('minPrice', range.min.toString())
      }
      if (range.max !== undefined) {
        params.set('maxPrice', range.max.toString())
      } else {
        params.delete('maxPrice')
      }
    }
    params.delete('page')
    router.push(`?${params.toString()}`)
  }

  const getCurrentPriceRangeIndex = () => {
    const min = currentMinPrice ? parseInt(currentMinPrice) : undefined
    const max = currentMaxPrice ? parseInt(currentMaxPrice) : undefined
    const index = priceRanges.findIndex(
      (r) => r.min === min && r.max === max
    )
    return index >= 0 ? index.toString() : ''
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Bộ lọc</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="mr-1 h-4 w-4" />
            Xóa lọc
          </Button>
        )}
      </div>

      <Separator className="my-4" />

      {/* Brand Filter */}
      <div className="space-y-2">
        <Label>Thương hiệu</Label>
        <Select value={currentBrand} onValueChange={(v) => updateFilter('brand', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Tất cả thương hiệu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tất cả thương hiệu</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.slug}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-4" />

      {/* Category Filter */}
      <div className="space-y-2">
        <Label>Dòng xe</Label>
        <Select value={currentCategory} onValueChange={(v) => updateFilter('category', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Tất cả dòng xe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tất cả dòng xe</SelectItem>
            {CAR_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {categoryLabels[cat] || cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-4" />

      {/* Price Range Filter */}
      <div className="space-y-2">
        <Label>Khoảng giá</Label>
        <Select value={getCurrentPriceRangeIndex()} onValueChange={handlePriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Tất cả mức giá" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tất cả mức giá</SelectItem>
            {priceRanges.map((range, index) => (
              <SelectItem key={index} value={index.toString()}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-4" />

      {/* Fuel Type Filter */}
      <div className="space-y-2">
        <Label>Nhiên liệu</Label>
        <Select value={currentFuelType} onValueChange={(v) => updateFilter('fuelType', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tất cả</SelectItem>
            {FUEL_TYPES.map((fuel) => (
              <SelectItem key={fuel} value={fuel}>
                {fuelLabels[fuel] || fuel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-4" />

      {/* Transmission Filter */}
      <div className="space-y-2">
        <Label>Hộp số</Label>
        <Select value={currentTransmission} onValueChange={(v) => updateFilter('transmission', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tất cả</SelectItem>
            {TRANSMISSION_TYPES.map((trans) => (
              <SelectItem key={trans} value={trans}>
                {transmissionLabels[trans] || trans}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
