export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getCarBySlug } from '@/lib/api/cars'
import { formatPrice } from '@/lib/format'
import { getStrapiImageUrl } from '@/lib/strapi'
import { siteConfig } from '@/config/site'
import { Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'So Sánh Xe Ô Tô - So Sánh Thông Số Kỹ Thuật | VuKia',
  description: 'So sánh thông số kỹ thuật, giá xe, tính năng giữa các mẫu xe ô tô. Chọn xe phù hợp nhất với nhu cầu tại VuKia.',
  alternates: { canonical: `${siteConfig.url}/so-sanh-xe` },
}

interface PageProps {
  searchParams: Promise<{ slugs?: string }>
}

const transmissionLabels: Record<string, string> = {
  manual: 'Số sàn', automatic: 'Số tự động', cvt: 'CVT',
}
const fuelLabels: Record<string, string> = {
  gasoline: 'Xăng', diesel: 'Dầu', hybrid: 'Hybrid', electric: 'Điện',
}
const categoryLabels: Record<string, string> = {
  sedan: 'Sedan', suv: 'SUV', mpv: 'MPV', hatchback: 'Hatchback', pickup: 'Pickup',
}
const statusLabels: Record<string, string> = {
  available: 'Còn hàng', sold: 'Đã bán', 'coming-soon': 'Sắp về',
}

export default async function ComparePage({ searchParams }: PageProps) {
  const { slugs } = await searchParams
  const slugList = (slugs || '').split(',').filter(Boolean).slice(0, 3)

  const cars = await Promise.all(slugList.map((s) => getCarBySlug(s).catch(() => null)))
  const validCars = cars.filter(Boolean) as NonNullable<Awaited<ReturnType<typeof getCarBySlug>>>[]

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Container className="py-8">
          <Breadcrumbs items={[{ title: 'So sánh xe' }]} />

          <div className="mt-6">
            <h1 className="text-3xl font-bold">So Sánh Xe Ô Tô</h1>
            <p className="mt-2 text-muted-foreground">
              So sánh thông số kỹ thuật và giá xe để chọn xe phù hợp nhất
            </p>
          </div>

          {validCars.length < 2 ? (
            <div className="mt-12 text-center">
              <p className="text-muted-foreground">Chọn ít nhất 2 xe để so sánh.</p>
              <Button className="mt-4" asChild>
                <Link href="/xe-o-to">Xem danh sách xe</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="w-40 border-b p-3 text-left font-medium text-muted-foreground" />
                    {validCars.map((car) => {
                      const imgUrl = getStrapiImageUrl(car.mainImage)
                      return (
                        <th key={car.slug} className="border-b p-3 text-left">
                          <Link href={`/xe-o-to/${car.slug}`} className="group block">
                            {imgUrl && (
                              <div className="relative mb-2 aspect-[4/3] w-full overflow-hidden rounded-lg">
                                <Image
                                  src={imgUrl}
                                  alt={car.name}
                                  fill
                                  className="object-cover transition-transform group-hover:scale-105"
                                  sizes="(max-width: 768px) 50vw, 33vw"
                                />
                              </div>
                            )}
                            <span className="font-semibold group-hover:text-primary">{car.name}</span>
                          </Link>
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {/* Price */}
                  <CompareRow label="Giá bán">
                    {validCars.map((car) => (
                      <td key={car.slug} className="border-b p-3">
                        <div className="font-semibold text-primary">
                          {formatPrice(car.pricePromo || car.price)}
                        </div>
                        {car.pricePromo && Number(car.pricePromo) < Number(car.price) && (
                          <div className="text-xs text-muted-foreground line-through">
                            {formatPrice(car.price)}
                          </div>
                        )}
                      </td>
                    ))}
                  </CompareRow>

                  {/* Status */}
                  <CompareRow label="Tình trạng">
                    {validCars.map((car) => (
                      <td key={car.slug} className="border-b p-3">
                        <Badge variant={car.status === 'available' ? 'default' : 'secondary'}>
                          {statusLabels[car.status] || car.status}
                        </Badge>
                      </td>
                    ))}
                  </CompareRow>

                  {/* Year */}
                  <CompareRow label="Năm sản xuất">
                    {validCars.map((car) => (
                      <td key={car.slug} className="border-b p-3">{car.year}</td>
                    ))}
                  </CompareRow>

                  {/* Category */}
                  <CompareRow label="Phân loại">
                    {validCars.map((car) => (
                      <td key={car.slug} className="border-b p-3">{categoryLabels[car.category] || car.category}</td>
                    ))}
                  </CompareRow>

                  {/* Fuel */}
                  <CompareRow label="Nhiên liệu">
                    {validCars.map((car) => (
                      <td key={car.slug} className="border-b p-3">{fuelLabels[car.fuelType] || car.fuelType}</td>
                    ))}
                  </CompareRow>

                  {/* Transmission */}
                  <CompareRow label="Hộp số">
                    {validCars.map((car) => (
                      <td key={car.slug} className="border-b p-3">{transmissionLabels[car.transmission] || car.transmission}</td>
                    ))}
                  </CompareRow>

                  {/* Specs section */}
                  <tr className="bg-muted/40">
                    <td colSpan={validCars.length + 1} className="border-b p-3 font-semibold">Thông số kỹ thuật</td>
                  </tr>

                  <CompareRow label="Động cơ">
                    {validCars.map((car) => (
                      <td key={car.slug} className="border-b p-3">{car.specs?.engine || '—'}</td>
                    ))}
                  </CompareRow>

                  <CompareRow label="Công suất">
                    {validCars.map((car) => (
                      <td key={car.slug} className="border-b p-3">{car.specs?.power || '—'}</td>
                    ))}
                  </CompareRow>

                  <CompareRow label="Mô-men xoắn">
                    {validCars.map((car) => (
                      <td key={car.slug} className="border-b p-3">{car.specs?.torque || '—'}</td>
                    ))}
                  </CompareRow>

                  <CompareRow label="Tiêu hao nhiên liệu">
                    {validCars.map((car) => (
                      <td key={car.slug} className="border-b p-3">{car.specs?.fuelConsumption || '—'}</td>
                    ))}
                  </CompareRow>

                  <CompareRow label="Số ghế">
                    {validCars.map((car) => (
                      <td key={car.slug} className="border-b p-3">{car.specs?.seats ?? '—'}</td>
                    ))}
                  </CompareRow>

                  {/* CTA */}
                  <tr>
                    <td className="p-3" />
                    {validCars.map((car) => (
                      <td key={car.slug} className="p-3">
                        <div className="space-y-2">
                          <Button size="sm" className="w-full" asChild>
                            <Link href={`/xe-o-to/${car.slug}`}>Xem chi tiết</Link>
                          </Button>
                          <Button size="sm" variant="outline" className="w-full" asChild>
                            <a href={`tel:${siteConfig.contact.phone}`}>
                              <Phone className="mr-1 h-3 w-3" />
                              Liên hệ
                            </a>
                          </Button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  )
}

function CompareRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr className="hover:bg-muted/20">
      <td className="border-b p-3 font-medium text-muted-foreground">{label}</td>
      {children}
    </tr>
  )
}
