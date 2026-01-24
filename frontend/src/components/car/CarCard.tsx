import Image from 'next/image'
import Link from 'next/link'
import { Car } from '@/types/car'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/format'
import { getStrapiImageUrl } from '@/lib/strapi'
import { Fuel, Settings, Calendar } from 'lucide-react'

interface CarCardProps {
  car: Car & { id: number }
}

const transmissionLabels: Record<string, string> = {
  manual: 'Số sàn',
  automatic: 'Số tự động',
  cvt: 'CVT',
}

const fuelTypeLabels: Record<string, string> = {
  gasoline: 'Xăng',
  diesel: 'Dầu',
  hybrid: 'Hybrid',
  electric: 'Điện',
}

const statusLabels: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' }> = {
  available: { label: 'Còn hàng', variant: 'default' },
  sold: { label: 'Đã bán', variant: 'destructive' },
  'coming-soon': { label: 'Sắp về', variant: 'secondary' },
}

export function CarCard({ car }: CarCardProps) {
  const imageUrl = getStrapiImageUrl(car.mainImage)
  const hasPromo = car.pricePromo && car.pricePromo < car.price
  const currentPrice = hasPromo ? car.pricePromo! : car.price
  const status = statusLabels[car.status] || statusLabels.available

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={`/xe-o-to/${car.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={car.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
          <div className="absolute left-2 top-2 flex gap-2">
            {hasPromo && (
              <Badge variant="destructive">Khuyến mãi</Badge>
            )}
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/xe-o-to/${car.slug}`}>
          <h3 className="line-clamp-1 text-lg font-semibold transition-colors group-hover:text-primary">
            {car.name}
          </h3>
        </Link>

        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {car.year}
          </span>
          <span className="flex items-center gap-1">
            <Settings className="h-3 w-3" />
            {transmissionLabels[car.transmission] || car.transmission}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="h-3 w-3" />
            {fuelTypeLabels[car.fuelType] || car.fuelType}
          </span>
        </div>

        <div className="mt-4">
          <span className="text-xl font-bold text-primary">
            {formatPrice(currentPrice)}
          </span>
          {hasPromo && (
            <span className="ml-2 text-sm text-muted-foreground line-through">
              {formatPrice(car.price)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/xe-o-to/${car.slug}`}>Xem chi tiết</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
