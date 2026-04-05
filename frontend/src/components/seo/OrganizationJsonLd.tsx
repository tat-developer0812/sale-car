import { siteConfig } from '@/config/site'

export function OrganizationJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: siteConfig.name,
    alternateName: 'VuKia',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og-image.jpg`,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address,
      addressLocality: 'Gò Vấp',
      addressRegion: 'Hồ Chí Minh',
      postalCode: '700000',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.7769,
      longitude: 106.7009,
    },
    areaServed: [
      { '@type': 'City', name: 'Hồ Chí Minh' },
      { '@type': 'City', name: 'Hà Nội' },
      { '@type': 'City', name: 'Đà Nẵng' },
      { '@type': 'Country', name: 'Việt Nam' },
    ],
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
      siteConfig.links.zalo,
    ].filter(Boolean),
    priceRange: '$$',
    currenciesAccepted: 'VND',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Xe ô tô chính hãng tại VuKia',
      itemListElement: [
        { '@type': 'OfferCatalog', name: 'Xe Sedan' },
        { '@type': 'OfferCatalog', name: 'Xe SUV' },
        { '@type': 'OfferCatalog', name: 'Xe MPV' },
        { '@type': 'OfferCatalog', name: 'Xe Điện' },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
