import { Car } from '@/types/car'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/format'
import { siteConfig } from '@/config/site'
import {
  Phone,
  MessageCircle,
  Calendar,
  Fuel,
  Settings,
  Palette,
  Package,
} from 'lucide-react'

interface CarPricingProps {
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

const categoryLabels: Record<string, string> = {
  sedan: 'Sedan',
  suv: 'SUV',
  mpv: 'MPV',
  hatchback: 'Hatchback',
  pickup: 'Pickup',
}

const statusLabels: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' }> = {
  available: { label: 'Còn hàng', variant: 'default' },
  sold: { label: 'Đã bán', variant: 'destructive' },
  'coming-soon': { label: 'Sắp về', variant: 'secondary' },
}

export function CarPricing({ car }: CarPricingProps) {
  const price = Number(car.price)
  const pricePromo = car.pricePromo ? Number(car.pricePromo) : undefined
  const hasPromo = pricePromo && pricePromo < price
  const currentPrice = hasPromo ? pricePromo : price
  const savings = hasPromo ? price - pricePromo : 0
  const status = statusLabels[car.status] || statusLabels.available

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <Badge variant={status.variant}>{status.label}</Badge>
            {car.stockCount > 0 && car.status === 'available' && (
              <span className="ml-2 text-sm text-muted-foreground">
                Còn {car.stockCount} xe
              </span>
            )}
          </div>
          {hasPromo && (
            <Badge variant="destructive">Giảm {formatPrice(savings)}</Badge>
          )}
        </div>
        <CardTitle className="mt-2 text-2xl">{car.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price */}
        <div>
          <div className="text-3xl font-bold text-primary">
            {formatPrice(currentPrice)}
          </div>
          {hasPromo && (
            <div className="text-lg text-muted-foreground line-through">
              {formatPrice(car.price)}
            </div>
          )}
        </div>

        <Separator />

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Năm {car.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span>{transmissionLabels[car.transmission] || car.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4 text-muted-foreground" />
            <span>{fuelTypeLabels[car.fuelType] || car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span>{categoryLabels[car.category] || car.category}</span>
          </div>
        </div>

        {/* Colors */}
        {car.colors && Array.isArray(car.colors) && car.colors.length > 0 && (
          <>
            <Separator />
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Palette className="h-4 w-4" />
                Màu sắc
              </div>
              <div className="flex flex-wrap gap-2">
                {car.colors.map((color: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {color}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button className="w-full" size="lg" asChild>
            <a href={`tel:${siteConfig.contact.phone}`}>
              <Phone className="mr-2 h-5 w-5" />
              Gọi ngay: {siteConfig.contact.phone}
            </a>
          </Button>
          <Button variant="outline" className="w-full" size="lg" asChild>
            <a href="#quick-contact">
              <MessageCircle className="mr-2 h-5 w-5" />
              Để lại thông tin
            </a>
          </Button>
        </div>

        {/* Notes */}
        <p className="text-center text-xs text-muted-foreground">
          * Giá có thể thay đổi tùy theo phiên bản và khuyến mãi
        </p>
      </CardContent>
    </Card>
  )
}
