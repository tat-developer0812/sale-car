import { siteConfig } from '@/config/site'

export function OrganizationJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: siteConfig.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address,
      addressLocality: 'Hồ Chí Minh',
      addressRegion: 'Hồ Chí Minh',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.7769,
      longitude: 106.7009,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.youtube,
    ].filter(Boolean),
    priceRange: '$$',
    currenciesAccepted: 'VND',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
