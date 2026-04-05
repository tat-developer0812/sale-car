'use client'

import { useRef } from 'react'
import { Car } from '@/types/car'
import { CarCard } from './CarCard'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Strapi v5 compatible type
type RelatedCarsRelation = (Car & { id?: number })[] | { data: Array<{ id: number; attributes: Car }> | null } | null

interface RelatedCarsProps {
  cars?: RelatedCarsRelation
  title?: string
}

export function RelatedCars({ cars, title = 'Xe liên quan' }: RelatedCarsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Handle both v4 and v5 formats
  let carsArray: (Car & { id: number })[] = []

  if (cars) {
    // Strapi v5 format: direct array
    if (Array.isArray(cars)) {
      carsArray = cars.map((car, index) => ({ ...car, id: car.id ?? index }))
    }
    // Strapi v4 format: nested data array
    else if ('data' in cars && cars.data) {
      carsArray = cars.data.map((item) => ({ ...item.attributes, id: item.id }))
    }
  }

  if (carsArray.length === 0) {
    return null
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {carsArray.map((car) => (
          <div
            key={car.id}
            className="w-72 flex-shrink-0"
            style={{ scrollSnapAlign: 'start' }}
          >
            <CarCard car={car} />
          </div>
        ))}
      </div>
    </section>
  )
}
