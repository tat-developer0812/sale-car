# CAR SALES WEBSITE - COMPLETE PROJECT PLAN
## Next.js 14 + Strapi CMS Implementation

---

## TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Project Goals](#project-goals)
3. [Technology Stack](#technology-stack)
4. [System Architecture](#system-architecture)
5. [Database Schema](#database-schema)
6. [Folder Structure](#folder-structure)
7. [SEO Strategy](#seo-strategy)
8. [Lead Capture Strategy](#lead-capture-strategy)
9. [Implementation Timeline](#implementation-timeline)
10. [Code Examples](#code-examples)
11. [Deployment Guide](#deployment-guide)
12. [Budget Breakdown](#budget-breakdown)
13. [Success Metrics](#success-metrics)

---

## PROJECT OVERVIEW

### Project Type
Automotive e-commerce website focused on showcasing cars and generating sales leads

### Target Audience
- Potential car buyers in Vietnam
- Age: 25-45
- Middle to upper-middle income
- Mobile-first users (70%+ mobile traffic)

### Core Features
- Car catalog with advanced filtering
- Detailed car specifications
- Car comparison tool
- Blog/news section
- Lead capture forms (priority: phone number collection)
- Real-time lead notifications
- SEO-optimized pages

---

## PROJECT GOALS

### Primary Goal (Priority #1): SEO Rankings
**Objective:** Rank in top 3 Google search results for target keywords

**Target Keywords:**
- "giá xe [car name]" (e.g., "giá xe Honda Civic")
- "[car name] [year]" (e.g., "Honda Civic 2024")
- "mua xe [brand]" (e.g., "mua xe Honda")
- "so sánh [car A] và [car B]"
- "đánh giá xe [car name]"
- "trả góp xe [car name]"

**Success Metrics (3 months):**
- 50+ keywords in top 10
- 1,000+ organic visitors/month
- PageSpeed score 90+
- 100+ indexed pages

### Secondary Goal (Priority #2): Lead Generation
**Objective:** Capture potential customer information (especially phone numbers)

**Target:**
- 5% conversion rate
- 50+ leads/month (from 1,000 visitors)
- < 2 minutes response time to leads
- 80%+ phone number collection rate

**Success Metrics:**
- Average 10+ leads/day
- < 5% form abandonment rate
- 90%+ lead quality (valid phone numbers)

### Tertiary Goal: Cost Optimization
**Objective:** Minimize operational costs while maintaining quality

**Target:**
- Monthly costs < $15
- Zero paid advertising initially
- Self-hosted solutions where possible
- Scalable infrastructure

---

## TECHNOLOGY STACK

### Frontend
```
Framework: Next.js 14 (App Router)
Language: TypeScript
Styling: Tailwind CSS
UI Components: Shadcn/ui (free, customizable)
Icons: Lucide React
Fonts: Google Fonts (Inter/Roboto)
```

**Why Next.js 14?**
- ✅ Best SEO performance (SSR/SSG)
- ✅ Built-in image optimization
- ✅ Automatic code splitting
- ✅ Excellent Core Web Vitals
- ✅ Free hosting on Vercel
- ✅ Edge functions support

### Backend/CMS
```
CMS: Strapi (self-hosted, open-source)
Database: PostgreSQL
ORM: Built-in Strapi ORM
API: REST API (auto-generated)
```

**Why Strapi?**
- ✅ Free and open-source
- ✅ Easy content management
- ✅ Auto-generated API
- ✅ Media library with Cloudinary integration
- ✅ Role-based access control
- ✅ Webhook support

### Hosting & Infrastructure
```
Frontend Hosting: Vercel (Free tier)
Backend Hosting: Railway ($5/month) or Render (Free tier)
Database: PostgreSQL on Railway/Render
CDN: Cloudinary (Free: 25GB storage)
Domain: .vn domain (~$30/year)
SSL: Let's Encrypt (Free via Vercel/Railway)
```

### Third-Party Services
```
Email: Resend (Free: 3,000 emails/month)
SMS: Twilio or local gateway (Pay-per-use)
Analytics: Google Analytics 4 (Free)
Search Console: Google Search Console (Free)
Monitoring: Sentry (Free tier)
Lead Notifications: Telegram Bot API (Free)
Lead Backup: Google Sheets API (Free)
Performance: Vercel Analytics (Free tier)
```

### Development Tools
```
Version Control: Git + GitHub
Code Editor: VS Code
Package Manager: npm/pnpm
Linting: ESLint
Formatting: Prettier
Type Checking: TypeScript
Testing: Playwright (E2E), Jest (Unit)
API Testing: Postman/Insomnia
```

---

## SYSTEM ARCHITECTURE

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│                    USERS                         │
│          (Browser/Mobile Devices)                │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│              NEXT.JS 14 APP                      │
│               (Vercel Hosting)                   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │        App Router Pages                   │   │
│  │  ├── / (Homepage)                         │   │
│  │  ├── /cars (Listing)                      │   │
│  │  ├── /cars/[slug] (Detail)                │   │
│  │  ├── /brands/[slug]                       │   │
│  │  ├── /compare                             │   │
│  │  ├── /blog                                │   │
│  │  └── /contact                             │   │
│  │                                            │   │
│  │  Server Components (SEO)                  │   │
│  │  Client Components (Interactive)          │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │          API Routes                       │   │
│  │  ├── /api/leads (POST)                    │   │
│  │  ├── /api/contact (POST)                  │   │
│  │  └── /api/webhooks/strapi                │   │
│  └──────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│          STRAPI CMS BACKEND                      │
│        (Railway/Render Hosting)                  │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │      Content Types                        │   │
│  │  ├── Cars                                 │   │
│  │  ├── Brands                               │   │
│  │  ├── Blog Posts                           │   │
│  │  ├── Leads                                │   │
│  │  └── Categories                           │   │
│  │                                            │   │
│  │  REST API (auto-generated)                │   │
│  │  Media Library                            │   │
│  │  Role & Permissions                       │   │
│  └──────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│         PostgreSQL DATABASE                      │
│          (Railway/Supabase)                      │
│                                                  │
│  Tables: cars, brands, posts, leads,            │
│          users, media, etc.                      │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│          EXTERNAL SERVICES                       │
│                                                  │
│  ├── Cloudinary (Image CDN)                     │
│  ├── Resend (Email Notifications)               │
│  ├── Telegram Bot (Real-time Lead Alerts)       │
│  ├── Google Sheets (Lead Backup)                │
│  ├── Google Analytics (Tracking)                │
│  ├── Google Search Console (SEO)                │
│  └── Sentry (Error Monitoring)                  │
└─────────────────────────────────────────────────┘
```

### Data Flow

**1. User Visits Website:**
```
User Request → Vercel Edge Network → Next.js Server
→ Fetch data from Strapi API → Render page (SSR/SSG)
→ Return HTML to user
```

**2. User Submits Lead Form:**
```
User fills form → Client-side validation (Zod)
→ POST to /api/leads → Save to Strapi
→ Trigger notifications:
   ├── Send Telegram message (instant)
   ├── Save to Google Sheets (backup)
   ├── Send email to customer (Resend)
   └── Send email to sales team (Resend)
→ Return success response
```

**3. Admin Updates Content:**
```
Admin logs into Strapi → Updates car info/price
→ Save to PostgreSQL → Trigger webhook (optional)
→ Revalidate Next.js pages (ISR)
→ Updated content visible to users
```

---

## DATABASE SCHEMA

### Strapi Content Types

#### 1. Brand (Car Manufacturer)
```typescript
interface Brand {
  id: number
  name: string                    // "Honda", "Toyota"
  slug: string                    // "honda", "toyota"
  logo: Media                     // Brand logo
  description: text               // About the brand
  seo: SEO                        // SEO metadata
  cars: Relation<Car[]>           // One-to-many relationship
  createdAt: datetime
  updatedAt: datetime
  publishedAt: datetime
}
```

#### 2. Car (Main Product)
```typescript
interface Car {
  id: number
  name: string                    // "Honda Civic 2024"
  slug: string                    // "honda-civic-2024"
  brand: Relation<Brand>          // Many-to-one
  
  // Basic Info
  price: decimal                  // Regular price
  pricePromo: decimal             // Promotional price (optional)
  year: integer                   // 2024
  status: enum                    // 'available' | 'sold' | 'coming-soon'
  stockCount: integer             // For urgency messaging
  
  // Classification
  category: enum                  // 'sedan' | 'suv' | 'mpv' | 'hatchback' | 'pickup'
  fuelType: enum                  // 'gasoline' | 'diesel' | 'hybrid' | 'electric'
  transmission: enum              // 'manual' | 'automatic' | 'cvt'
  
  // Content
  shortDescription: text          // 150-200 chars for meta
  fullDescription: richtext       // Full HTML content
  features: json                  // [{icon, title, description}]
  colors: json                    // Available colors with images
  
  // Media
  mainImage: Media                // Featured image
  gallery: Media[]                // Multiple images
  video: string                   // YouTube URL (optional)
  brochure: Media                 // PDF (optional)
  
  // Specifications Component
  specs: {
    // Engine & Performance
    engine: string                // "1.5L VTEC Turbo"
    power: string                 // "176 HP"
    torque: string                // "220 Nm"
    fuelConsumption: string       // "5.5L/100km"
    topSpeed: string              // "200 km/h"
    acceleration: string          // "0-100 km/h in 8.2s"
    
    // Dimensions
    length: integer               // mm
    width: integer                // mm
    height: integer               // mm
    wheelbase: integer            // mm
    groundClearance: integer      // mm
    curbWeight: integer           // kg
    
    // Capacity
    seats: integer                // 5
    fuelTankCapacity: integer     // liters
    trunkCapacity: integer        // liters
    
    // Drivetrain
    driveType: string             // "FWD", "AWD", "RWD"
    suspension: string            // Front/Rear
    brakes: string                // Front/Rear
    tires: string                 // Size
    
    // Safety Features
    airbags: integer              // Number of airbags
    safetyFeatures: string[]      // Array of features
    
    // Comfort & Technology
    infotainment: string          // Screen size, features
    speakers: integer             // Audio system
    climateControl: string        // AC type
    other: string[]               // Additional features
  }
  
  // Comparison Data
  highlights: string[]            // Key selling points
  pros: string[]                  // Advantages
  cons: string[]                  // Disadvantages
  
  // SEO Component
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string
    canonicalURL: string
    ogImage: Media
    noIndex: boolean
  }
  
  // Analytics
  views: integer                  // Page view count
  leadCount: integer              // Number of leads generated
  
  // Relationships
  brand: Relation<Brand>
  relatedCars: Relation<Car[]>    // Manual selection
  leads: Relation<Lead[]>         // One-to-many
  
  // Timestamps
  createdAt: datetime
  updatedAt: datetime
  publishedAt: datetime
}
```

#### 3. Blog Post
```typescript
interface Post {
  id: number
  title: string
  slug: string
  excerpt: text                   // Short summary
  content: richtext               // Full article
  
  // Classification
  category: enum                  // 'review' | 'comparison' | 'guide' | 'news' | 'promotion'
  tags: string[]                  // Keywords
  
  // Media
  featuredImage: Media
  
  // Relationships
  relatedCars: Relation<Car[]>    // Many-to-many
  author: string                  // Author name
  
  // SEO
  seo: SEO
  
  // Analytics
  views: integer
  readTime: integer               // Minutes to read
  
  createdAt: datetime
  updatedAt: datetime
  publishedAt: datetime
}
```

#### 4. Lead (Customer Information)
```typescript
interface Lead {
  id: number
  
  // Contact Information (Priority: Phone)
  name: string
  phone: string                   // REQUIRED - Most important field
  email: string                   // Optional
  
  // Interest Information
  interestedCar: Relation<Car>    // Many-to-one
  message: text                   // Optional message
  budget: string                  // Price range
  source: enum                    // 'contact-form' | 'test-drive' | 'quote-request' | 'call-button'
  preferredContactTime: string    // Morning/Afternoon/Evening
  
  // Tracking Data
  status: enum                    // 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  utmSource: string               // Marketing attribution
  utmMedium: string
  utmCampaign: string
  utmContent: string
  utmTerm: string
  
  // Technical Data
  ipAddress: string
  userAgent: string
  referrer: string
  landingPage: string
  
  // Sales Notes
  notes: text                     // CRM-like notes
  followUpDate: date
  assignedTo: string              // Sales person
  
  // Timestamps
  createdAt: datetime             // Auto-generated
  updatedAt: datetime
  contactedAt: datetime           // When sales contacted
}
```

#### 5. Comparison (Track Popular Comparisons)
```typescript
interface Comparison {
  id: number
  car1: Relation<Car>
  car2: Relation<Car>
  viewCount: integer
  createdAt: datetime
}
```

### Database Relationships

```
Brand (1) ──< (N) Car
Car (N) ──> (N) Post (related)
Car (1) ──< (N) Lead
```

---

## FOLDER STRUCTURE

```
car-sales-website/
├── .env.local                      # Environment variables
├── .env.example                    # Example env file
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── next.config.js                  # Next.js configuration
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── components.json                 # Shadcn/ui config
├── README.md
│
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   ├── robots.txt                  # Static robots.txt
│   ├── manifest.json               # PWA manifest (optional)
│   └── images/
│       ├── placeholder.svg
│       └── og-default.jpg          # Default OG image
│
├── src/
│   ├── app/                        # Next.js 14 App Router
│   │   ├── layout.tsx              # Root layout (global)
│   │   ├── page.tsx                # Homepage
│   │   ├── loading.tsx             # Global loading
│   │   ├── error.tsx               # Global error
│   │   ├── not-found.tsx           # 404 page
│   │   ├── globals.css             # Global styles
│   │   │
│   │   ├── cars/                   # Car listing
│   │   │   ├── page.tsx            # /cars - Grid view
│   │   │   ├── loading.tsx
│   │   │   ├── [slug]/             # Car detail pages
│   │   │   │   ├── page.tsx        # /cars/honda-civic-2024
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── error.tsx
│   │   │   │   └── opengraph-image.tsx  # Dynamic OG image
│   │   │   └── layout.tsx
│   │   │
│   │   ├── brands/                 # Brand pages
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # /brands/honda
│   │   │
│   │   ├── compare/                # Comparison tool
│   │   │   └── page.tsx            # /compare?car1=X&car2=Y
│   │   │
│   │   ├── blog/                   # Blog section
│   │   │   ├── page.tsx            # /blog - Post listing
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx        # /blog/honda-civic-review
│   │   │   └── category/
│   │   │       └── [slug]/
│   │   │           └── page.tsx    # /blog/category/reviews
│   │   │
│   │   ├── contact/                # Contact page
│   │   │   └── page.tsx
│   │   │
│   │   ├── about/                  # About us
│   │   │   └── page.tsx
│   │   │
│   │   ├── api/                    # API Routes
│   │   │   ├── leads/
│   │   │   │   └── route.ts        # POST /api/leads
│   │   │   ├── contact/
│   │   │   │   └── route.ts        # POST /api/contact
│   │   │   ├── webhooks/
│   │   │   │   └── strapi/
│   │   │   │       └── route.ts    # Strapi webhooks
│   │   │   └── revalidate/
│   │   │       └── route.ts        # On-demand revalidation
│   │   │
│   │   ├── sitemap.ts              # Dynamic sitemap generator
│   │   ├── robots.ts               # Dynamic robots.txt
│   │   └── manifest.ts             # PWA manifest generator
│   │
│   ├── components/                 # React Components
│   │   ├── ui/                     # Shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── select.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── ... (more Shadcn components)
│   │   │
│   │   ├── layout/                 # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── Breadcrumbs.tsx
│   │   │   └── Container.tsx
│   │   │
│   │   ├── car/                    # Car-specific components
│   │   │   ├── CarCard.tsx         # Card for grid view
│   │   │   ├── CarGrid.tsx         # Grid container
│   │   │   ├── CarList.tsx         # List view
│   │   │   ├── CarFilter.tsx       # Filter sidebar
│   │   │   ├── CarSort.tsx         # Sort dropdown
│   │   │   ├── CarGallery.tsx      # Image gallery with lightbox
│   │   │   ├── CarSpecs.tsx        # Specifications table
│   │   │   ├── CarFeatures.tsx     # Features grid
│   │   │   ├── CarPricing.tsx      # Price display with variants
│   │   │   ├── CarComparison.tsx   # Side-by-side comparison
│   │   │   └── RelatedCars.tsx     # Related cars carousel
│   │   │
│   │   ├── forms/                  # Form components
│   │   │   ├── ContactForm.tsx     # General contact
│   │   │   ├── QuickContact.tsx    # Quick phone number form
│   │   │   ├── TestDriveForm.tsx   # Test drive request
│   │   │   ├── QuoteForm.tsx       # Get quote form
│   │   │   ├── FormInput.tsx       # Reusable input
│   │   │   ├── FormSelect.tsx      # Reusable select
│   │   │   ├── FormTextarea.tsx    # Reusable textarea
│   │   │   └── FormError.tsx       # Error message display
│   │   │
│   │   ├── seo/                    # SEO components
│   │   │   ├── JsonLd.tsx          # Generic JSON-LD wrapper
│   │   │   ├── CarJsonLd.tsx       # Product schema for cars
│   │   │   ├── ArticleJsonLd.tsx   # Article schema for blog
│   │   │   ├── BreadcrumbJsonLd.tsx
│   │   │   ├── OrganizationJsonLd.tsx
│   │   │   └── FAQJsonLd.tsx
│   │   │
│   │   ├── common/                 # Common/shared components
│   │   │   ├── Loading.tsx         # Loading spinner
│   │   │   ├── ErrorBoundary.tsx   # Error boundary
│   │   │   ├── Pagination.tsx      # Pagination component
│   │   │   ├── SearchBar.tsx       # Search input
│   │   │   ├── SocialShare.tsx     # Social sharing buttons
│   │   │   ├── BackToTop.tsx       # Scroll to top button
│   │   │   ├── Countdown.tsx       # Countdown timer
│   │   │   └── OptimizedImage.tsx  # Next.js Image wrapper
│   │   │
│   │   ├── widgets/                # Interactive widgets
│   │   │   ├── StickyContact.tsx   # Sticky contact button
│   │   │   ├── ExitIntent.tsx      # Exit intent popup
│   │   │   ├── ChatWidget.tsx      # Live chat (optional)
│   │   │   ├── PhoneCallButton.tsx # Click-to-call
│   │   │   └── WhatsAppButton.tsx  # WhatsApp contact
│   │   │
│   │   └── blog/                   # Blog components
│   │       ├── PostCard.tsx
│   │       ├── PostGrid.tsx
│   │       ├── PostContent.tsx
│   │       └── AuthorBio.tsx
│   │
│   ├── lib/                        # Utilities & helpers
│   │   ├── strapi.ts               # Strapi API client
│   │   ├── utils.ts                # General utilities
│   │   ├── constants.ts            # App constants
│   │   ├── validations.ts          # Zod schemas
│   │   ├── api.ts                  # API helper functions
│   │   ├── seo.ts                  # SEO helper functions
│   │   ├── analytics.ts            # GA4 helper
│   │   ├── telegram.ts             # Telegram bot API
│   │   ├── google-sheets.ts        # Google Sheets API
│   │   ├── email.ts                # Email service (Resend)
│   │   └── format.ts               # Formatting utilities
│   │
│   ├── types/                      # TypeScript types
│   │   ├── car.ts                  # Car types
│   │   ├── brand.ts                # Brand types
│   │   ├── post.ts                 # Blog post types
│   │   ├── lead.ts                 # Lead types
│   │   ├── strapi.ts               # Strapi API types
│   │   ├── api.ts                  # API response types
│   │   └── common.ts               # Common types
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useCarFilter.ts         # Car filtering logic
│   │   ├── useLeadForm.ts          # Form submission logic
│   │   ├── useAnalytics.ts         # Analytics tracking
│   │   ├── useDebounce.ts          # Debounce hook
│   │   ├── useMediaQuery.ts        # Responsive breakpoints
│   │   └── useLocalStorage.ts      # Local storage hook
│   │
│   ├── config/                     # Configuration files
│   │   ├── site.ts                 # Site-wide config
│   │   ├── navigation.ts           # Nav menu config
│   │   └── seo.ts                  # Default SEO config
│   │
│   └── styles/                     # Additional styles
│       └── markdown.css            # Markdown content styles
│
├── strapi-backend/                 # Separate Strapi project
│   ├── config/
│   │   ├── database.ts
│   │   ├── server.ts
│   │   ├── admin.ts
│   │   ├── middlewares.ts
│   │   └── plugins.ts
│   │
│   ├── src/
│   │   ├── api/                    # API endpoints
│   │   │   ├── car/
│   │   │   │   ├── content-types/
│   │   │   │   │   └── car/
│   │   │   │   │       └── schema.json
│   │   │   │   ├── controllers/
│   │   │   │   ├── routes/
│   │   │   │   └── services/
│   │   │   ├── brand/
│   │   │   ├── post/
│   │   │   └── lead/
│   │   │
│   │   └── extensions/             # Custom extensions
│   │       └── upload/
│   │           └── config/
│   │               └── settings.json  # Cloudinary config
│   │
│   ├── public/
│   ├── package.json
│   └── .env
│
└── docs/                           # Documentation
    ├── API.md                      # API documentation
    ├── DEPLOYMENT.md               # Deployment guide
    ├── CONTRIBUTING.md             # Contribution guide
    └── CHANGELOG.md                # Version history
```

---

## SEO STRATEGY

### Technical SEO Implementation

#### 1. Metadata Optimization

**Page-Level Metadata (Next.js 14):**

```typescript
// app/cars/[slug]/page.tsx
import { Metadata } from 'next'
import { getCarBySlug } from '@/lib/strapi'

export async function generateMetadata({ 
  params 
}): Promise<Metadata> {
  const car = await getCarBySlug(params.slug)
  
  const title = `${car.name} - Price ${formatPrice(car.price)} | Best Deals`
  const description = car.shortDescription || 
    `Buy ${car.name} at the best price. ${car.specs.engine}, ${car.specs.fuelConsumption}. 0% financing, home delivery available.`
  
  return {
    title,
    description,
    keywords: [
      car.name,
      `${car.name} price`,
      `buy ${car.brand.name}`,
      `${car.brand.name} ${car.category}`,
      `${car.category} car`,
      `${car.name} ${car.year}`,
      `${car.name} review`,
      `${car.name} specs`,
    ].join(', '),
    
    // Open Graph
    openGraph: {
      title: `${car.name} - Only ${formatPrice(car.pricePromo || car.price)}`,
      description,
      images: [
        {
          url: car.mainImage.url,
          width: 1200,
          height: 630,
          alt: car.name,
        },
      ],
      type: 'product',
      url: `https://yoursite.com/cars/${car.slug}`,
      siteName: 'Your Car Showroom',
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [car.mainImage.url],
      creator: '@yourhandle',
    },
    
    // Canonical URL
    alternates: {
      canonical: `https://yoursite.com/cars/${car.slug}`,
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Additional metadata
    category: car.category,
    other: {
      price: car.pricePromo || car.price,
      availability: car.status === 'available' ? 'in stock' : 'out of stock',
    },
  }
}
```

#### 2. Structured Data (Schema.org JSON-LD)

**Product Schema for Cars:**

```typescript
// components/seo/CarJsonLd.tsx
import { Car } from '@/types/car'

interface CarJsonLdProps {
  car: Car
}

export function CarJsonLd({ car }: CarJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: car.name,
    description: car.shortDescription,
    image: car.gallery.map(img => img.url),
    sku: car.id.toString(),
    mpn: car.id.toString(),
    brand: {
      '@type': 'Brand',
      name: car.brand.name,
      logo: car.brand.logo.url,
    },
    manufacturer: {
      '@type': 'Organization',
      name: car.brand.name,
    },
    offers: {
      '@type': 'Offer',
      price: car.pricePromo || car.price,
      priceCurrency: 'VND',
      availability: car.status === 'available' 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      url: `https://yoursite.com/cars/${car.slug}`,
      priceValidUntil: getNextYear(),
      seller: {
        '@type': 'Organization',
        name: 'Your Car Showroom',
        telephone: '+84909123456',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '123 Main Street',
          addressLocality: 'Ho Chi Minh City',
          addressCountry: 'VN',
        },
      },
    },
    aggregateRating: car.rating ? {
      '@type': 'AggregateRating',
      ratingValue: car.rating,
      reviewCount: car.reviewCount,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    // Vehicle-specific properties
    vehicleEngine: {
      '@type': 'EngineSpecification',
      name: car.specs.engine,
    },
    fuelConsumption: {
      '@type': 'QuantitativeValue',
      value: parseFloat(car.specs.fuelConsumption),
      unitText: 'L/100km',
    },
    numberOfDoors: 4,
    seatingCapacity: car.specs.seats,
    vehicleTransmission: car.transmission,
    driveWheelConfiguration: car.specs.driveType,
    productionDate: car.year.toString(),
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Engine',
        value: car.specs.engine,
      },
      {
        '@type': 'PropertyValue',
        name: 'Power',
        value: car.specs.power,
      },
      {
        '@type': 'PropertyValue',
        name: 'Torque',
        value: car.specs.torque,
      },
      {
        '@type': 'PropertyValue',
        name: 'Fuel Consumption',
        value: car.specs.fuelConsumption,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function getNextYear() {
  return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]
}
```

**Breadcrumb Schema:**

```typescript
// components/seo/BreadcrumbJsonLd.tsx
interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

**Article Schema for Blog:**

```typescript
// components/seo/ArticleJsonLd.tsx
import { Post } from '@/types/post'

export function ArticleJsonLd({ post }: { post: Post }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage.url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Your Car Showroom',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yoursite.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yoursite.com/blog/${post.slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

**Organization Schema:**

```typescript
// components/seo/OrganizationJsonLd.tsx
export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: 'Your Car Showroom',
    description: 'Leading car dealer in Vietnam',
    url: 'https://yoursite.com',
    logo: 'https://yoursite.com/logo.png',
    image: 'https://yoursite.com/showroom.jpg',
    telephone: '+84909123456',
    email: 'info@yoursite.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Main Street',
      addressLocality: 'Ho Chi Minh City',
      addressRegion: 'Ho Chi Minh',
      postalCode: '700000',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.8231,
      longitude: 106.6297,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    sameAs: [
      'https://facebook.com/yourpage',
      'https://instagram.com/yourpage',
      'https://youtube.com/yourchannel',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

#### 3. Dynamic Sitemap Generation

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllCars, getAllPosts, getAllBrands } from '@/lib/strapi'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yoursite.com'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/cars`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
  
  // Dynamic car pages
  const cars = await getAllCars()
  const carPages: MetadataRoute.Sitemap = cars.map(car => ({
    url: `${baseUrl}/cars/${car.slug}`,
    lastModified: new Date(car.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))
  
  // Brand pages
  const brands = await getAllBrands()
  const brandPages: MetadataRoute.Sitemap = brands.map(brand => ({
    url: `${baseUrl}/brands/${brand.slug}`,
    lastModified: new Date(brand.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))
  
  // Blog posts
  const posts = await getAllPosts()
  const postPages: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  
  return [...staticPages, ...carPages, ...brandPages, ...postPages]
}
```

#### 4. Robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/static/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: 'https://yoursite.com/sitemap.xml',
  }
}
```

#### 5. Performance Optimization

**Image Optimization:**

```typescript
// components/common/OptimizedImage.tsx
import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        priority={priority}
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"
        onLoadingComplete={() => setIsLoading(false)}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'}
        `}
      />
    </div>
  )
}
```

**Font Optimization:**

```typescript
// app/layout.tsx
import { Inter, Roboto } from 'next/font/google'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-roboto',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${roboto.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

**Code Splitting & Lazy Loading:**

```typescript
// app/cars/[slug]/page.tsx
import dynamic from 'next/dynamic'

// Lazy load heavy components
const CarGallery = dynamic(() => import('@/components/car/CarGallery'), {
  loading: () => <CarGallerySkeleton />,
  ssr: false, // Only client-side if not needed for SEO
})

const ExitIntentPopup = dynamic(
  () => import('@/components/widgets/ExitIntent'),
  { ssr: false }
)

const RelatedCars = dynamic(() => import('@/components/car/RelatedCars'))
```

#### 6. URL Structure Best Practices

**SEO-Friendly URLs:**

```
✅ Good:
https://yoursite.com/cars/honda-civic-2024
https://yoursite.com/brands/honda
https://yoursite.com/blog/honda-civic-review
https://yoursite.com/compare?car1=honda-civic&car2=mazda-3

❌ Bad:
https://yoursite.com/car?id=123
https://yoursite.com/product/view/456
https://yoursite.com/bài-viết/đánh-giá-xe (with Vietnamese diacritics)
```

**Slug Generation:**

```typescript
// lib/utils.ts
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompose Vietnamese characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Example: "Honda Civic 2024" → "honda-civic-2024"
// Example: "Đánh giá xe" → "danh-gia-xe"
```

#### 7. Internal Linking Strategy

**Breadcrumbs:**

```typescript
// components/layout/Breadcrumbs.tsx
interface BreadcrumbProps {
  items: { name: string; href: string }[]
}

export function Breadcrumbs({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            {index === items.length - 1 ? (
              <span className="text-gray-900 font-medium">{item.name}</span>
            ) : (
              <a
                href={item.href}
                className="hover:text-red-600 transition"
              >
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
```

**Related Content:**

```typescript
// Always include related links:
- Related cars (same category)
- Related blog posts (same topic)
- Cross-link between car pages and blog posts
- Link to comparison pages
```

### Content SEO Strategy

#### 1. Keyword Research & Targeting

**Primary Keywords (High Priority):**
```
- giá xe [car name]              // "giá xe Honda Civic"
- [car name] [year]              // "Honda Civic 2024"
- mua xe [brand]                 // "mua xe Honda"
- xe [category]                  // "xe sedan"
- [car name] thông số            // "Honda Civic thông số"
```

**Secondary Keywords (Medium Priority):**
```
- đánh giá xe [car name]
- so sánh [car A] và [car B]
- [car name] có tốt không
- nên mua xe [car name]
- [car name] bao nhiêu tiền
- trả góp xe [car name]
```

**Long-tail Keywords (High Conversion):**
```
- giá xe Honda Civic 2024 tại Hà Nội
- mua xe Honda Civic trả góp lãi suất 0%
- so sánh Honda Civic và Toyota Corolla Altis
- chi phí nuôi xe Honda Civic hàng tháng
- Honda Civic 2024 có mấy phiên bản
```

#### 2. Content Types & Templates

**A. Car Detail Pages (Product Pages):**

Template structure:
```markdown
# [Car Name] - Giá [Price] | [Showroom Name]

## Quick Overview (Above fold)
- Price (with promotion)
- Key specs (Engine, Fuel consumption, Seats)
- CTA: Contact form / Phone button

## Image Gallery
- 20-50 high-quality images
- 360° view (if available)

## Key Features (Bullet points)
- 5-10 main selling points
- Icons + short descriptions

## Detailed Specifications Table
- Engine & Performance
- Dimensions
- Safety features
- Technology & Comfort

## Full Description (1000-1500 words)
- Design highlights
- Interior quality
- Driving experience
- Technology features
- Safety ratings

## Pros & Cons
- Clear advantages
- Honest disadvantages

## Price & Variants Comparison Table

## FAQ Section (Schema markup)
- 5-10 common questions
- Structured data for rich snippets

## Related Cars
- 4-6 similar vehicles

## CTAs throughout the page
- Test drive request
- Get quote
- Contact sales
```

**B. Blog Posts (Informational):**

Categories:
1. **Reviews** (Đánh giá)
   - "[Car Name] 2024: Đánh giá chi tiết - Có nên mua?"
   - Length: 2000-3000 words
   - Include: specs, pros/cons, verdict

2. **Comparisons** (So sánh)
   - "So sánh [Car A] vs [Car B]: Chọn xe nào?"
   - Length: 1500-2500 words
   - Side-by-side comparison table

3. **Guides** (Hướng dẫn)
   - "Hướng dẫn mua xe trả góp: Thủ tục, lãi suất, kinh nghiệm"
   - "10 điều cần biết trước khi mua xe [Category]"
   - Length: 1500-2000 words

4. **News** (Tin tức)
   - "Bảng giá xe [Brand] tháng [Month/Year]"
   - "[Car Name] ra mắt phiên bản mới"
   - Length: 800-1200 words

5. **Promotions** (Khuyến mãi)
   - "[Car Name]: Ưu đãi lên đến [Amount] trong tháng [Month]"
   - Length: 600-1000 words

**C. Landing Pages:**

For targeted campaigns:
```
/xe-sedan-duoi-800-trieu
/xe-suv-7-cho
/xe-tiet-kiem-nhien-lieu
/tra-gop-lai-suat-0
```

#### 3. Content Publishing Schedule

**Week 1:**
- 3 car detail pages
- 1 review post
- 1 price list update

**Week 2:**
- 3 car detail pages
- 1 comparison post
- 1 guide post

**Week 3:**
- 3 car detail pages
- 1 review post
- 1 news post

**Week 4:**
- 3 car detail pages
- 1 comparison post
- 1 promotion post

**Monthly:** 12-15 new car pages + 10-12 blog posts

#### 4. On-Page SEO Checklist

For every page:

- [ ] Unique, keyword-rich title (50-60 characters)
- [ ] Compelling meta description (150-160 characters)
- [ ] One H1 tag with primary keyword
- [ ] Proper heading hierarchy (H2, H3, H4)
- [ ] Keyword in first paragraph
- [ ] Alt text for all images
- [ ] Internal links to related pages (3-5 links)
- [ ] External links to authoritative sources (if relevant)
- [ ] Schema markup (JSON-LD)
- [ ] Canonical URL
- [ ] Open Graph tags
- [ ] URL slug with keyword
- [ ] Image file names with keywords
- [ ] Fast load time (< 3 seconds)
- [ ] Mobile-friendly
- [ ] CTA above the fold

---

## LEAD CAPTURE STRATEGY

### Lead Capture Touch Points

#### 1. Strategic Placement

**On Car Detail Pages:**

```typescript
// Multiple contact opportunities throughout page

1. Hero Section (Top)
   - Sticky header with phone button
   - Quick contact form in sidebar

2. After Image Gallery
   - "Interested? Get a quote" CTA

3. After Specifications
   - "Request test drive" form

4. After Description
   - "Talk to our expert" button

5. Bottom of Page
   - Full contact form

6. Sticky Elements
   - Floating phone button (bottom-right)
   - Floating WhatsApp button
   - Sticky bottom bar on mobile

7. Exit Intent
   - Popup when user about to leave
   - Special offer to capture attention
```

#### 2. Form Types & Priority

**A. Quick Contact Form (Highest Priority - Phone First):**

```typescript
// components/forms/QuickContact.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Phone, Loader2 } from 'lucide-react'

// Validation schema - Phone is REQUIRED
const schema = z.object({
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[0-9]+$/, 'Invalid phone number'),
  name: z.string().optional(),
  carId: z.number(),
  carName: z.string(),
})

type FormData = z.infer<typeof schema>

interface QuickContactProps {
  carId: number
  carName: string
}

export function QuickContact({ carId, carName }: QuickContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      carId,
      carName,
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          source: 'quick-contact',
          // UTM parameters
          utmSource: new URLSearchParams(window.location.search).get('utm_source'),
          utmMedium: new URLSearchParams(window.location.search).get('utm_medium'),
          utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign'),
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        reset()

        // Track conversion in Google Analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'generate_lead', {
            event_category: 'engagement',
            event_label: carName,
            value: 1,
          })
        }

        // Track in Facebook Pixel (if applicable)
        if (typeof fbq !== 'undefined') {
          fbq('track', 'Lead', {
            content_name: carName,
            content_category: 'Car',
          })
        }
      } else {
        throw new Error('Failed to submit')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-5xl mb-4">✓</div>
        <h3 className="text-green-900 font-semibold text-xl mb-2">
          Thank You!
        </h3>
        <p className="text-green-700">
          We'll call you back within 5 minutes.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Input
          {...register('phone')}
          type="tel"
          placeholder="Your phone number *"
          className="text-lg py-6"
          autoComplete="tel"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          {...register('name')}
          type="text"
          placeholder="Your name (optional)"
          className="py-6"
          autoComplete="name"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-6 text-lg font-semibold"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Phone className="mr-2 h-5 w-5" />
            Get Free Consultation
          </>
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        By submitting, you agree to our privacy policy
      </p>
    </form>
  )
}
```

**B. Test Drive Form:**

```typescript
// components/forms/TestDriveForm.tsx
const testDriveSchema = z.object({
  phone: z.string().min(10).regex(/^[0-9]+$/),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email().optional(),
  carId: z.number(),
  preferredDate: z.string(),
  preferredTime: z.enum(['morning', 'afternoon', 'evening']),
  showroomLocation: z.string(),
})

// Similar implementation to QuickContact
// Additional fields: date, time, location
```

**C. Get Quote Form:**

```typescript
// components/forms/QuoteForm.tsx
const quoteSchema = z.object({
  phone: z.string().min(10).regex(/^[0-9]+$/),
  name: z.string().min(2),
  email: z.string().email().optional(),
  carId: z.number(),
  variant: z.string(), // Car variant/trim
  budget: z.string(), // Price range
  tradeIn: z.boolean(), // Has trade-in
  message: z.string().optional(),
})
```

#### 3. Sticky Contact Elements

**A. Floating Phone Button:**

```typescript
// components/widgets/FloatingPhone.tsx
'use client'

import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FloatingPhone() {
  const handleClick = () => {
    // Track call button click
    if (typeof gtag !== 'undefined') {
      gtag('event', 'call_button_click', {
        event_category: 'engagement',
      })
    }
  }

  return (
    <a
      href="tel:+84909123456"
      onClick={handleClick}
      className="fixed bottom-24 right-6 z-50 md:bottom-6"
    >
      <Button
        size="lg"
        className="h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-transform bg-green-500 hover:bg-green-600"
      >
        <Phone className="h-6 w-6" />
      </Button>
      <span className="sr-only">Call us</span>
    </a>
  )
}
```

**B. Sticky Contact Modal:**

```typescript
// components/widgets/StickyContactModal.tsx
'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { QuickContact } from '@/components/forms/QuickContact'

export function StickyContactModal({ car }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl md:bottom-6"
        size="lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold">Get Expert Advice</h3>
              <p className="text-gray-600 mt-2">
                Leave your phone number and we'll call you back within 5 minutes
              </p>
            </div>
            
            <QuickContact carId={car.id} carName={car.name} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
```

**C. Exit Intent Popup:**

```typescript
// components/widgets/ExitIntent.tsx
'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { QuickContact } from '@/components/forms/QuickContact'

export function ExitIntent({ car }) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if already shown in this session
    if (sessionStorage.getItem('exitIntentShown')) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves from top of page
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }
    }

    // Also trigger after 30 seconds on page
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }
    }, 30000)

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timer)
    }
  }, [hasShown])

  return (
    <Dialog open={isVisible} onOpenChange={setIsVisible}>
      <DialogContent className="sm:max-w-lg">
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🚗</div>
            <h2 className="text-3xl font-bold text-red-600 mb-3">
              Wait! Don't Miss Out!
            </h2>
            <p className="text-lg text-gray-700 mb-2">
              Special offer for <strong>{car.name}</strong>
            </p>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-900 font-semibold text-lg mb-2">
              🎁 Save up to $4,000 + Free insurance for 1 year
            </p>
            <p className="text-yellow-700 text-sm">
              Only 3 cars left at this price!
            </p>
          </div>

          <div>
            <p className="text-center font-medium mb-4">
              Get this exclusive deal now:
            </p>
            <QuickContact carId={car.id} carName={car.name} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

#### 4. Lead Processing Backend

**API Route for Lead Submission:**

```typescript
// app/api/leads/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { headers } from 'next/headers'

const leadSchema = z.object({
  phone: z.string().min(10),
  name: z.string().optional(),
  email: z.string().email().optional(),
  carId: z.number(),
  carName: z.string(),
  message: z.string().optional(),
  source: z.string(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = leadSchema.parse(body)

    // Get request metadata
    const headersList = headers()
    const ipAddress = headersList.get('x-forwarded-for') || 
                     headersList.get('x-real-ip') || 
                     'unknown'
    const userAgent = headersList.get('user-agent') || ''
    const referrer = headersList.get('referer') || ''

    const leadData = {
      ...data,
      ipAddress,
      userAgent,
      referrer,
      status: 'new',
      createdAt: new Date().toISOString(),
    }

    // 1. Save to Strapi CMS
    const strapiResponse = await fetch(
      `${process.env.STRAPI_URL}/api/leads`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({ data: leadData }),
      }
    )

    if (!strapiResponse.ok) {
      throw new Error('Failed to save lead to Strapi')
    }

    const strapiData = await strapiResponse.json()

    // 2. Send instant Telegram notification
    await sendTelegramNotification(leadData)

    // 3. Backup to Google Sheets
    await saveToGoogleSheets(leadData)

    // 4. Send confirmation email to customer
    await sendCustomerEmail(leadData)

    // 5. Send notification email to sales team
    await sendSalesEmail(leadData)

    // 6. Optional: Send SMS confirmation
    // await sendSMS(data.phone, `Thank you ${data.name}...`)

    return NextResponse.json(
      { success: true, id: strapiData.data.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Lead submission error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    )
  }
}
```

**Telegram Bot Integration:**

```typescript
// lib/telegram.ts
interface LeadData {
  name?: string
  phone: string
  email?: string
  carName: string
  source: string
  utmSource?: string
}

export async function sendTelegramNotification(lead: LeadData) {
  const message = `
🔥 <b>NEW LEAD!</b> 🔥

👤 Name: ${lead.name || 'Not provided'}
📱 Phone: <code>${lead.phone}</code>
📧 Email: ${lead.email || 'Not provided'}
🚗 Car: <b>${lead.carName}</b>
📝 Source: ${lead.source}
🎯 UTM Source: ${lead.utmSource || 'direct'}

⏰ ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })}
  `.trim()

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to send Telegram notification')
    }
  } catch (error) {
    console.error('Telegram notification error:', error)
    // Don't throw - continue with other notifications
  }
}
```

**Google Sheets Backup:**

```typescript
// lib/google-sheets.ts
import { google } from 'googleapis'

export async function saveToGoogleSheets(lead: any) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Leads!A:L', // Adjust columns as needed
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            lead.name || '',
            lead.phone,
            lead.email || '',
            lead.carName,
            lead.source,
            lead.utmSource || '',
            lead.utmMedium || '',
            lead.utmCampaign || '',
            lead.status,
            lead.ipAddress,
            lead.referrer,
          ],
        ],
      },
    })
  } catch (error) {
    console.error('Google Sheets error:', error)
    // Don't throw - this is just a backup
  }
}
```

**Email Notifications with Resend:**

```typescript
// lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendCustomerEmail(lead: any) {
  try {
    await resend.emails.send({
      from: 'Your Car Showroom <noreply@yoursite.com>',
      to: lead.email || lead.phone + '@example.com', // Fallback
      subject: `Thank you for your interest in ${lead.carName}`,
      html: `
        <h2>Thank you, ${lead.name || 'valued customer'}!</h2>
        <p>We've received your inquiry about the <strong>${lead.carName}</strong>.</p>
        <p>Our sales team will contact you at <strong>${lead.phone}</strong> within the next 5 minutes.</p>
        <p>If you have any urgent questions, please call us at: <strong>+84 909 123 456</strong></p>
        <br>
        <p>Best regards,<br>Your Car Showroom Team</p>
      `,
    })
  } catch (error) {
    console.error('Customer email error:', error)
  }
}

export async function sendSalesEmail(lead: any) {
  try {
    await resend.emails.send({
      from: 'Lead System <leads@yoursite.com>',
      to: 'sales@yoursite.com',
      subject: `🔥 New Lead: ${lead.carName}`,
      html: `
        <h2>New Lead Received</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.name || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.phone}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.email || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Car:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.carName}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Source:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.source}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>UTM:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.utmSource || 'direct'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Time:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td></tr>
        </table>
        <p><strong>Action required: Contact customer ASAP!</strong></p>
      `,
    })
  } catch (error) {
    console.error('Sales email error:', error)
  }
}
```

#### 5. Conversion Rate Optimization

**A. Psychological Triggers:**

```typescript
// Social Proof
<div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
  <p className="text-sm text-blue-800">
    ✅ <strong>156 customers</strong> registered for test drives this week
  </p>
</div>

// Urgency
<div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
  <p className="text-red-800 font-semibold flex items-center gap-2">
    <Clock className="w-5 h-5" />
    Only <span className="text-2xl mx-1">3</span> cars left at this price!
  </p>
  <Countdown deadline="2026-01-31" />
</div>

// Trust Signals
<div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
  <div className="flex items-center gap-2">
    <Shield className="w-4 h-4 text-green-600" />
    <span>3-Year Warranty</span>
  </div>
  <div className="flex items-center gap-2">
    <Award className="w-4 h-4 text-yellow-600" />
    <span>Authorized Dealer</span>
  </div>
  <div className="flex items-center gap-2">
    <Star className="w-4 h-4 text-yellow-500" />
    <span>4.8/5 (1,247 reviews)</span>
  </div>
  <div className="flex items-center gap-2">
    <Truck className="w-4 h-4 text-blue-600" />
    <span>Home Delivery</span>
  </div>
</div>
```

**B. Mobile-First Form Design:**

```typescript
// Optimized for mobile:
- Large tap targets (min 48px)
- Auto-focus on phone input
- Number keyboard for phone
- Minimal required fields
- One-column layout
- Clear error messages
- Progress indicators
- Success animations
```

**C. A/B Testing with Edge Middleware:**

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Assign variant for A/B testing
  const variant = Math.random() < 0.5 ? 'A' : 'B'
  
  const response = NextResponse.next()
  response.cookies.set('cta-variant', variant, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
  
  return response
}

export const config = {
  matcher: '/cars/:path*',
}
```

```typescript
// Use variant in component
'use client'

import { useEffect, useState } from 'react'

export function CTAButton() {
  const [variant, setVariant] = useState<'A' | 'B'>('A')

  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('cta-variant='))
    
    if (cookie) {
      setVariant(cookie.split('=')[1] as 'A' | 'B')
    }
  }, [])

  if (variant === 'A') {
    return (
      <Button size="lg" className="bg-red-600">
        Get Quote Now
      </Button>
    )
  }

  return (
    <Button size="lg" className="bg-green-600">
      Book Free Test Drive
    </Button>
  )
}
```

---

## IMPLEMENTATION TIMELINE

### Sprint 1: Weeks 1-2 (Foundation)

#### Week 1: Environment Setup & Infrastructure

**Days 1-2: Project Initialization**
- [ ] Create Git repository
- [ ] Initialize Next.js 14 project with TypeScript
  ```bash
  npx create-next-app@latest car-sales-website --typescript --tailwind --app
  ```
- [ ] Install dependencies:
  ```bash
  npm install @radix-ui/react-dialog @radix-ui/react-select
  npm install lucide-react
  npm install react-hook-form zod @hookform/resolvers/zod
  npm install date-fns
  npm install googleapis
  npm install resend
  ```
- [ ] Setup Shadcn/ui
  ```bash
  npx shadcn-ui@latest init
  ```
- [ ] Configure ESLint and Prettier
- [ ] Create `.env.local` with environment variables
- [ ] Setup folder structure

**Days 3-4: Strapi Backend Setup**
- [ ] Initialize Strapi project
  ```bash
  npx create-strapi-app@latest strapi-backend --quickstart
  ```
- [ ] Setup PostgreSQL database (local development)
- [ ] Create content types:
  - Brand
  - Car
  - Blog Post
  - Lead
- [ ] Configure Cloudinary plugin
- [ ] Configure roles & permissions
- [ ] Create sample data (5-10 cars for testing)
- [ ] Test API endpoints

**Days 5-7: Core Components Development**
- [ ] Build layout components:
  - Header with navigation
  - Footer
  - Mobile menu
  - Breadcrumbs
  - Container
- [ ] Setup Shadcn/ui components:
  - Button, Input, Card, Dialog, etc.
- [ ] Configure fonts (Google Fonts)
- [ ] Setup global styles
- [ ] Create loading skeletons
- [ ] Build error boundaries

#### Week 2: API Integration & Homepage

**Days 8-10: Strapi API Client**
- [ ] Create Strapi API client (`lib/strapi.ts`)
- [ ] Define TypeScript types for all content
- [ ] Implement data fetching functions:
  - getAllCars()
  - getCarBySlug()
  - getAllBrands()
  - getAllPosts()
  - etc.
- [ ] Configure ISR (Incremental Static Regeneration)
- [ ] Test API calls with real data
- [ ] Error handling

**Days 11-12: Homepage Development**
- [ ] Hero section with search
- [ ] Featured cars grid
- [ ] Brand showcase
- [ ] Latest blog posts
- [ ] CTA sections
- [ ] Trust signals
- [ ] Social proof
- [ ] Newsletter signup (optional)

**Days 13-14: Car Listing Page**
- [ ] Build filter sidebar:
  - Brand filter
  - Price range slider
  - Category filter
  - Year filter
  - Fuel type filter
- [ ] Car grid view
- [ ] Car list view toggle
- [ ] Sort functionality
- [ ] Pagination
- [ ] Loading states
- [ ] Empty states
- [ ] URL query parameter handling

---

### Sprint 2: Weeks 3-4 (Core Features)

#### Week 3: Car Detail Page & Comparison

**Days 15-17: Car Detail Page**
- [ ] Layout & structure
- [ ] Image gallery with lightbox
- [ ] Specifications table
- [ ] Features grid
- [ ] Price display with variants
- [ ] Pros & cons section
- [ ] Related cars carousel
- [ ] Breadcrumbs
- [ ] Schema markup (Product JSON-LD)
- [ ] Share buttons
- [ ] Print stylesheet

**Days 18-19: Car Comparison Tool**
- [ ] Comparison page UI
- [ ] Car selector (multi-select)
- [ ] Side-by-side comparison table
- [ ] Highlight differences
- [ ] Export comparison (PDF/Image)
- [ ] Share comparison URL
- [ ] Save comparison
- [ ] Mobile-responsive table

**Days 20-21: Blog System**
- [ ] Blog listing page with filters
- [ ] Blog detail page
- [ ] Category pages
- [ ] Related posts
- [ ] Reading time calculator
- [ ] Table of contents (for long posts)
- [ ] Article schema markup
- [ ] Social share buttons

#### Week 4: Forms & Lead Capture

**Days 22-24: Form Components**
- [ ] Quick contact form (phone priority)
- [ ] Test drive request form
- [ ] Get quote form
- [ ] Newsletter signup
- [ ] Form validation with Zod
- [ ] Error handling
- [ ] Success states
- [ ] Loading states
- [ ] Accessibility (a11y)

**Days 25-26: Lead Processing Backend**
- [ ] Create `/api/leads` endpoint
- [ ] Integrate with Strapi
- [ ] Setup Telegram bot
- [ ] Google Sheets integration
- [ ] Email notifications (Resend)
- [ ] SMS integration (optional)
- [ ] Lead tracking & analytics
- [ ] Error logging (Sentry)

**Days 27-28: Interactive Widgets**
- [ ] Sticky contact button
- [ ] Floating phone button
- [ ] WhatsApp button
- [ ] Exit intent popup
- [ ] Mobile bottom bar
- [ ] Live chat integration (optional)
- [ ] Chatbot (optional)

---

### Sprint 3: Weeks 5-6 (SEO & Optimization)

#### Week 5: SEO Implementation

**Days 29-31: On-Page SEO**
- [ ] Dynamic metadata for all pages
- [ ] JSON-LD structured data:
  - Product schema
  - Article schema
  - Breadcrumb schema
  - Organization schema
  - FAQ schema
- [ ] OpenGraph tags
- [ ] Twitter Cards
- [ ] Canonical URLs
- [ ] Alt text for all images
- [ ] Heading hierarchy audit

**Days 32-33: Technical SEO**
- [ ] Dynamic sitemap.xml generation
- [ ] robots.txt configuration
- [ ] Image optimization
- [ ] Font optimization
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Minimize bundle size
- [ ] Run Lighthouse audit
- [ ] Fix Core Web Vitals issues

**Days 34-35: Analytics & Tracking**
- [ ] Setup Google Analytics 4
- [ ] Setup Google Search Console
- [ ] Configure conversion tracking:
  - Form submissions
  - Phone clicks
  - Test drive requests
- [ ] Event tracking:
  - Page views
  - Car views
  - Button clicks
  - Video plays
- [ ] Setup Vercel Analytics
- [ ] Setup Sentry error tracking

#### Week 6: Polish & Accessibility

**Days 36-37: Mobile Optimization**
- [ ] Responsive design audit
- [ ] Mobile navigation improvements
- [ ] Touch-friendly buttons (min 48px)
- [ ] Mobile form optimization
- [ ] Mobile-specific features
- [ ] Test on real devices:
  - iPhone
  - Android phones
  - Tablets
- [ ] Mobile PageSpeed optimization

**Days 38-39: Accessibility (WCAG 2.1 AA)**
- [ ] Keyboard navigation
- [ ] Focus indicators
- [ ] ARIA labels
- [ ] Alt text for images
- [ ] Color contrast (4.5:1 minimum)
- [ ] Screen reader testing
- [ ] Skip navigation links
- [ ] Form labels & errors
- [ ] Heading hierarchy

**Days 40-42: Content Migration**
- [ ] Upload 50-100 cars to Strapi:
  - Car details
  - Images (optimized)
  - Specifications
  - Prices
- [ ] Upload 30-50 blog posts:
  - Reviews
  - Comparisons
  - Guides
  - News
- [ ] Optimize all media:
  - Compress images
  - Add alt text
  - Rename files with keywords
- [ ] Content review & QA
- [ ] SEO audit of all pages

---

### Sprint 4: Weeks 7-8 (Testing & Launch)

#### Week 7: Testing & Bug Fixes

**Days 43-45: Comprehensive Testing**
- [ ] **Functional Testing**
  - All forms submit correctly
  - Filters work properly
  - Search functionality
  - Pagination
  - Navigation
  - Links (internal & external)
  
- [ ] **Cross-Browser Testing**
  - Chrome
  - Firefox
  - Safari
  - Edge
  
- [ ] **Device Testing**
  - Desktop (1920x1080, 1366x768)
  - Tablet (iPad, Android tablets)
  - Mobile (iPhone, Android phones)
  
- [ ] **Performance Testing**
  - Lighthouse audit (aim for 90+ scores)
  - Core Web Vitals
  - Load testing
  
- [ ] **SEO Testing**
  - Meta tags present
  - Schema markup valid
  - Sitemap accessible
  - Robots.txt working
  
- [ ] **Security Testing**
  - HTTPS enforced
  - CORS configured
  - Rate limiting
  - Input validation
  - SQL injection prevention

**Days 46-47: Bug Fixes & Optimization**
- [ ] Fix all P0/P1 bugs
- [ ] Address console errors/warnings
- [ ] Fix accessibility issues
- [ ] Optimize slow-loading pages
- [ ] Polish UI/UX issues
- [ ] Update documentation

**Days 48-49: Deployment Preparation**
- [ ] Deploy Strapi to Railway/Render
- [ ] Configure production PostgreSQL
- [ ] Setup Cloudinary production account
- [ ] Configure all environment variables
- [ ] Setup custom domain
- [ ] SSL certificate verification
- [ ] CDN configuration
- [ ] Backup strategy

#### Week 8: Production Launch

**Days 50-51: Production Deployment**
- [ ] Deploy Next.js to Vercel
- [ ] Connect to Strapi production API
- [ ] DNS configuration
- [ ] SSL/HTTPS verification
- [ ] Test all features in production
- [ ] Submit sitemap to Google Search Console
- [ ] Submit site to Bing Webmaster Tools
- [ ] Setup monitoring (Sentry, Vercel)
- [ ] Setup uptime monitoring
- [ ] Create deployment runbook

**Days 52-53: Post-Launch Monitoring**
- [ ] Monitor error logs (first 48 hours)
- [ ] Check analytics for traffic
- [ ] Test lead submissions
- [ ] Verify email notifications
- [ ] Verify Telegram alerts
- [ ] Check Google Sheets integration
- [ ] Performance monitoring
- [ ] Gather initial user feedback
- [ ] Hot-fix any critical issues

**Days 54-56: Marketing Launch**
- [ ] Social media announcement
- [ ] Email to existing customer database
- [ ] Press release (if applicable)
- [ ] Paid advertising setup (Google Ads, Facebook)
- [ ] SEO indexing verification
- [ ] Content marketing kickoff
- [ ] Influencer outreach (car reviewers)
- [ ] Local SEO optimization

---

### Post-Launch: Weeks 9+ (Growth & Optimization)

#### Weeks 9-10: Content & SEO Expansion

**Content Creation:**
- [ ] Write 10 new blog posts (2 per day)
  - 4 car reviews
  - 3 comparison articles
  - 2 buying guides
  - 1 news/promotion post
- [ ] Add 20 more car listings
- [ ] Create video content (if applicable)
- [ ] User-generated content (testimonials)

**SEO Work:**
- [ ] Build 5-10 quality backlinks:
  - Guest posts on car blogs
  - Forum participation
  - Business directories
  - Local citations
- [ ] Monitor search rankings (weekly)