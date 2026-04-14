# VuKia — Car Sales Website

Website bán xe ô tô cho **KIA - MAZDA Gò Vấp**, xây dựng bằng Next.js 16 + Strapi v5. Hỗ trợ danh mục xe, blog, đặt lịch lái thử, so sánh xe, và hệ thống thu thập khách hàng tiềm năng (lead) tự động qua Telegram, Email, Google Sheets.

**Live:** [vukia.vn](https://vukia.vn) &nbsp;|&nbsp; **Liên hệ:** 0931 456 204

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16.1.4, React 19, TypeScript 5, TailwindCSS v4 |
| UI Components | Radix UI, shadcn/ui, Lucide Icons |
| Forms & Validation | React Hook Form, Zod |
| Data Fetching | React Query v5, Axios |
| CMS Backend | Strapi v5.33.4 |
| Database | PostgreSQL (production), SQLite (development) |
| Image Hosting | Cloudinary |
| Deployment | Vercel (frontend), Railway (backend) |
| Analytics | Vercel Analytics, Speed Insights, Google Analytics |
| Testing | Jest 30, React Testing Library |
| CI/CD | GitHub Actions |

---

## Project Structure

```
sale-car/
├── frontend/               # Next.js app (deployed to Vercel)
│   ├── src/
│   │   ├── app/            # App Router pages & API routes
│   │   ├── components/     # UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities, API clients, helpers
│   │   ├── providers/      # React context providers
│   │   └── types/          # TypeScript type definitions
│   ├── jest.config.ts
│   └── package.json
├── backend/                # Strapi CMS (deployed to Railway)
│   ├── src/api/            # Content types: brand, car, lead, post
│   ├── config/             # Database, plugins, server config
│   ├── scripts/            # Seed & sync scripts
│   └── package.json
└── .github/workflows/      # CI/CD pipeline
    └── ci.yml
```

---

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Homepage — featured cars, brands, blog preview |
| `/xe-o-to` | Car listing with filters (brand, category, price, fuel type) |
| `/xe-o-to/[slug]` | Car detail — specs, gallery, quote/test drive forms |
| `/thuong-hieu/[slug]` | Brand page |
| `/tin-tuc` | Blog listing |
| `/tin-tuc/[slug]` | Blog post |
| `/so-sanh-xe` | Car comparison (up to 3 xe) |
| `/dat-lich-lai-thu` | Test drive booking |
| `/tra-gop` | Installment calculator |
| `/lien-he` | Contact page |
| `/gioi-thieu` | About page |
| `/api/leads` | POST — lead capture endpoint |

---

## Getting Started

### Prerequisites

- Node.js >= 20
- npm >= 6

### 1. Clone & install

```bash
git clone https://github.com/tat-developer0812/sale-car.git
cd sale-car

# Install frontend
cd frontend && npm install

# Install backend
cd ../backend && npm install
```

### 2. Environment variables

**Frontend** — tạo `frontend/.env.local`:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Server-only (không expose ra browser)
STRAPI_API_TOKEN=your_strapi_api_token
RESEND_API_KEY=re_xxxxxxxxxxxx
SALES_EMAIL=sales@vukia.vn
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_chat_id
GOOGLE_SHEET_ID=your_sheet_id
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

**Backend** — tạo `backend/.env`:
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_salt
ADMIN_JWT_SECRET=your_secret
JWT_SECRET=your_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
```

### 3. Chạy local

```bash
# Terminal 1 — Backend (Strapi)
cd backend && npm run dev
# → http://localhost:1337/admin

# Terminal 2 — Frontend (Next.js)
cd frontend && npm run dev
# → http://localhost:3000
```

### 4. Seed dữ liệu

```bash
# Seed local database
cd backend && npm run seed

# Sync local → production Strapi
cd backend && LOCAL_TOKEN=<your_local_token> node scripts/sync-to-remote.js
```

---

## Testing

```bash
# Frontend — 120 tests
cd frontend && npm test

# Backend — 96 tests
cd backend && npm test

# Coverage report
cd frontend && npm run test:coverage
```

### Test coverage

| Suite | Tests | Coverage |
|---|---|---|
| `lib/format` | 18 | Price formatting, date, slug generation |
| `lib/compare` | 14 | localStorage car comparison, MAX limit |
| `lib/strapi` | 17 | Image URL proxy, data extraction (v4/v5) |
| `lib/validations` | 26 | Zod schemas — phone, email, form enums |
| `lib/api/cars` | 18 | API filters, search, pagination |
| `lib/api/brands` | 10 | Brand fetching by slug |
| `lib/api/posts` | 12 | Post listing, category filter |
| `hooks/useCompare` | 12 | Hook state, events, MAX limit |
| `backend/utils` | 8 | `stripIds` utility |
| `backend/seed-data` | 88 | Brand & car shape validation |

---

## CI/CD

GitHub Actions tự động chạy mỗi khi push lên `master`:

```
git push master
      │
      ▼
[Job: Run Tests] — frontend (120) + backend (96)
      │ pass
      ▼
[Job: Deploy] — vercel build --prod → vercel deploy --prod
```

Nếu test fail → deploy bị block, Vercel không nhận code mới.

**Xem log:**
- Test/Deploy lỗi → `github.com/[repo]/actions`
- Runtime lỗi sau deploy → `vercel.com/project/deployments`

---

## Architecture

### Lead Capture Flow

```
User submit form (QuickContact / TestDrive / Quote)
      │
      ▼
POST /api/leads  (Next.js API Route)
      │
      ├── Strapi (lưu database)
      ├── Telegram Bot (thông báo tức thì)
      ├── Email (Resend)
      └── Google Sheets (backup)
```

### Image Proxy

Strapi upload ảnh lên Cloudinary. Ảnh từ `localhost:1337/uploads/` được proxy qua `/strapi-uploads/` trong Next.js để tránh lỗi private IP trong production:

```
/uploads/car.jpg  →  /strapi-uploads/car.jpg
```

Cấu hình trong `next.config.ts` → `rewrites`.

### Car Comparison

Dùng `localStorage` để lưu danh sách xe đang so sánh (tối đa 3 xe). `useCompare` hook đồng bộ state qua `window.dispatchEvent('compare-updated')`.

---

## Content Types (Strapi)

### Brand
| Field | Type | Notes |
|---|---|---|
| name | String | Required |
| slug | UID | Auto-generated |
| logo | Media | Cloudinary |
| description | Text | |

### Car
| Field | Type | Notes |
|---|---|---|
| name | String | Required |
| slug | UID | Auto-generated |
| brand | Relation | → Brand |
| price | Integer | VND |
| pricePromo | Integer | Optional |
| year | Integer | |
| status | Enum | available, sold, coming_soon |
| category | Enum | sedan, suv, mpv, hatchback, pickup |
| fuelType | Enum | gasoline, diesel, electric, hybrid |
| transmission | Enum | automatic, manual, cvt |
| specs | Component | engine, power, torque, seats, dimensions |
| gallery | Media (multiple) | |
| highlights | JSON | Array of strings |

### Lead
| Field | Type | Notes |
|---|---|---|
| phone | String | Required |
| name | String | |
| email | Email | |
| type | Enum | contact, test-drive, quote, quick-contact |
| carName | String | |
| source | String | homepage, car-detail, etc. |
| status | Enum | new, contacted, converted |

---

## Deployment

### Frontend (Vercel)

1. Connect GitHub repo tại [vercel.com](https://vercel.com)
2. **Root Directory:** `frontend`
3. **Build Command:** `next build`
4. Thêm environment variables trong Vercel Dashboard
5. Enable **Web Analytics** và **Speed Insights** trong Project Settings

### Backend (Railway)

1. Create new project tại [railway.app](https://railway.app)
2. Add **PostgreSQL** service
3. Deploy từ GitHub repo — **Root Directory:** `backend`
4. Set environment variables (xem `.env` template ở trên)
5. Sau khi deploy, tạo API token trong Strapi Admin → dùng làm `STRAPI_API_TOKEN`

### GitHub Secrets (cho CI/CD)

Vào `github.com/[repo]/settings/secrets/actions`:

| Secret | Value |
|---|---|
| `VERCEL_TOKEN` | Vercel account token |
| `VERCEL_ORG_ID` | `orgId` từ `frontend/.vercel/project.json` |
| `VERCEL_PROJECT_ID` | `projectId` từ `frontend/.vercel/project.json` |

---

## Key Features

- **Danh mục xe** — filter theo thương hiệu, loại xe, nhiên liệu, hộp số, khoảng giá
- **Tìm kiếm** — search theo tên xe và mô tả
- **So sánh xe** — so sánh thông số kỹ thuật tối đa 3 xe
- **Lead capture** — form liên hệ, đặt lịch lái thử, báo giá
- **Thông báo tức thì** — Telegram + Email ngay khi có khách hàng
- **Blog** — tin tức xe hơi với category filter
- **Dark mode** — tự động theo system preference
- **SEO** — JSON-LD, sitemap.xml, robots.txt, Open Graph
- **ISR** — revalidate mỗi 60 giây, không cần rebuild khi cập nhật CMS
- **Mobile-first** — tối ưu cho 70%+ traffic mobile

---

## Business Info

```
Showroom:   KIA - MAZDA Gò Vấp, TP. Hồ Chí Minh
Hotline:    0931 456 204
Email:      info@vukia.vn
Giờ mở:    8:00 – 20:00, Thứ 2 – Chủ nhật
Zalo:       zalo.me/0931456204
```
