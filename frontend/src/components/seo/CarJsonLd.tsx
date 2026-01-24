import { Car } from '@/types/car'
import { getStrapiImageUrl } from '@/lib/strapi'
import { siteConfig } from '@/config/site'

interface CarJsonLdProps {
  car: Car & { id: number }
}

export function CarJsonLd({ car }: CarJsonLdProps) {
  const imageUrl = getStrapiImageUrl(car.mainImage)
  const brandName = car.brand?.data?.attributes?.name || 'Unknown'
  const currentPrice = car.pricePromo || car.price

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: car.name,
    description: car.shortDescription,
    image: imageUrl,
    brand: {
      '@type': 'Brand',
      name: brandName,
    },
    manufacturer: {
      '@type': 'Organization',
      name: brandName,
    },
    modelDate: car.year.toString(),
    vehicleTransmission: car.transmission,
    fuelType: car.fuelType,
    bodyType: car.category,
    offers: {
      '@type': 'Offer',
      price: currentPrice,
      priceCurrency: 'VND',
      availability:
        car.status === 'available'
          ? 'https://schema.org/InStock'
          : car.status === 'sold'
            ? 'https://schema.org/SoldOut'
            : 'https://schema.org/PreOrder',
      seller: {
        '@type': 'Organization',
        name: siteConfig.company.name,
        telephone: siteConfig.contact.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: siteConfig.contact.address,
        },
      },
    },
    ...(car.specs?.seats && { seatingCapacity: car.specs.seats }),
    ...(car.specs?.fuelConsumption && {
      fuelConsumption: {
        '@type': 'QuantitativeValue',
        value: car.specs.fuelConsumption,
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
