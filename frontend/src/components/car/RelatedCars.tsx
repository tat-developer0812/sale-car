'use client'

import { useRef } from 'react'
import { Car } from '@/types/car'
import { CarCard } from './CarCard'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface RelatedCarsProps {
  cars?: { data: Array<{ id: number; attributes: Car }> | null }
  title?: string
}

export function RelatedCars({ cars, title = 'Xe liên quan' }: RelatedCarsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (!cars?.data || cars.data.length === 0) {
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
        {cars.data.map((item) => (
          <div
            key={item.id}
            className="w-72 flex-shrink-0"
            style={{ scrollSnapAlign: 'start' }}
          >
            <CarCard car={{ ...item.attributes, id: item.id }} />
          </div>
        ))}
      </div>
    </section>
  )
}
