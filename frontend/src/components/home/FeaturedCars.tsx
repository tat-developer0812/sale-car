import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { CarCard } from '@/components/car/CarCard'
import { Car } from '@/types/car'
import { ArrowRight } from 'lucide-react'

interface FeaturedCarsProps {
  cars: (Car & { id: number })[]
}

export function FeaturedCars({ cars }: FeaturedCarsProps) {
  if (!cars || cars.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Xe Nổi Bật</h2>
            <p className="mt-2 text-muted-foreground">
              Những mẫu xe được quan tâm nhiều nhất
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <Link href="/xe-o-to">
              Xem tất cả
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cars.slice(0, 8).map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button asChild>
            <Link href="/xe-o-to">
              Xem tất cả xe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
