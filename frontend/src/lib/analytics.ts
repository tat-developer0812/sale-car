export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
    dataLayer: unknown[]
  }
}

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Pre-defined events for car showroom
export const trackLeadSubmit = (formType: string, carName?: string) => {
  event({
    action: 'lead_submit',
    category: 'Lead',
    label: `${formType}${carName ? ` - ${carName}` : ''}`,
  })
}

export const trackCarView = (carName: string, carId: number) => {
  event({
    action: 'view_item',
    category: 'Car',
    label: carName,
    value: carId,
  })
}

export const trackPhoneClick = (source: string) => {
  event({
    action: 'phone_click',
    category: 'Contact',
    label: source,
  })
}

export const trackZaloClick = (source: string) => {
  event({
    action: 'zalo_click',
    category: 'Contact',
    label: source,
  })
}

export const trackSearch = (searchTerm: string, resultsCount: number) => {
  event({
    action: 'search',
    category: 'Search',
    label: searchTerm,
    value: resultsCount,
  })
}

export const trackFilterApply = (filterType: string, filterValue: string) => {
  event({
    action: 'filter_apply',
    category: 'Filter',
    label: `${filterType}: ${filterValue}`,
  })
}

// Google Ads conversion tracking
export const trackConversion = (conversionLabel: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionLabel,
      value: value,
      currency: 'VND',
    })
  }
}

export const trackGenerateLead = (formType: string, carName?: string) => {
  event({
    action: 'generate_lead',
    category: 'Lead',
    label: `${formType}${carName ? ` - ${carName}` : ''}`,
  })
}

export const trackBeginCheckout = (carName: string, price: number) => {
  event({
    action: 'begin_checkout',
    category: 'Car',
    label: carName,
    value: price,
  })
}
