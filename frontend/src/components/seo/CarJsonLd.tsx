import { Car } from '@/types/car'
import { getStrapiImageUrl, extractRelation } from '@/lib/strapi'
import { siteConfig } from '@/config/site'

interface CarJsonLdProps {
  car: Car & { id: number }
}

export function CarJsonLd({ car }: CarJsonLdProps) {
  const imageUrl = getStrapiImageUrl(car.mainImage)
  const brand = extractRelation(car.brand)
  const brandName = brand?.name || 'Unknown'
  const currentPrice = car.pricePromo || car.price

  const siteUrl = siteConfig.url

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: car.name,
    model: car.name,
    description: car.shortDescription,
    url: `${siteUrl}/xe-o-to/${car.slug}`,
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
    vehicleModelDate: car.year.toString(),
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
        '@type': 'AutoDealer',
        name: siteConfig.company.name,
        telephone: siteConfig.contact.phone,
        url: siteUrl,
        address: {
          '@type': 'PostalAddress',
          streetAddress: siteConfig.contact.address,
          addressCountry: 'VN',
        },
      },
    },
    ...(car.specs?.seats && { seatingCapacity: car.specs.seats }),
    ...(car.specs?.engine && {
      vehicleEngine: {
        '@type': 'EngineSpecification',
        name: car.specs.engine,
      },
    }),
    ...(car.specs?.fuelConsumption && {
      fuelConsumption: {
        '@type': 'QuantitativeValue',
        value: car.specs.fuelConsumption,
        unitText: 'L/100km',
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
