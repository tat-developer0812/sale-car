# Plan 02: Strapi Backend Setup

**Duration**: Days 3-4
**Phase**: Foundation
**Prerequisites**: Plan 01 completed

---

## 🎯 Goals

- Initialize Strapi CMS project
- Setup PostgreSQL database
- Create all content types (Brand, Car, Post, Lead)
- Configure Cloudinary for media storage
- Setup API permissions
- Create sample data for testing

---

## ✅ Prerequisites Check

- [ ] Plan 01 completed
- [ ] PostgreSQL installed locally OR Railway/Supabase account ready
- [ ] Cloudinary account created (free tier)
- [ ] Node.js 18+ installed

---

## 📋 Tasks Checklist

### Day 3: Strapi Installation & Configuration

#### 3.1 Initialize Strapi Project

```bash
# Navigate to project root
cd D:\Personal\sale-car

# The backend directory already exists, check if Strapi is initialized
cd backend
ls

# If Strapi is already initialized, skip to 3.2
# Otherwise, initialize:
npx create-strapi-app@latest backend --quickstart --no-run
```

**Note**: The `backend` folder already exists in your project. Check if it has Strapi files.

**✅ Verification**: `backend/` directory contains Strapi files

#### 3.2 Configure Database

**Option A: Local PostgreSQL** (Recommended for development)

Install PostgreSQL:
```bash
# Windows: Download from https://www.postgresql.org/download/windows/
# After installation, create database:
psql -U postgres
CREATE DATABASE car_sales_dev;
\q
```

Update `backend/config/database.ts`:
```typescript
export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'car_sales_dev'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'postgres'),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
      },
    },
    debug: false,
  },
});
```

**Option B: Railway (Cloud PostgreSQL)**

1. Go to https://railway.app
2. Create new project → Provision PostgreSQL
3. Copy connection URL
4. Add to `backend/.env`:

```env
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://user:password@host:5432/database
```

Update `backend/.env`:
```env
# Server
HOST=0.0.0.0
PORT=1337

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=car_sales_dev
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_SSL=false

# Admin JWT
ADMIN_JWT_SECRET=your-admin-jwt-secret-here
API_TOKEN_SALT=your-api-token-salt-here
APP_KEYS=your-app-keys-here
JWT_SECRET=your-jwt-secret-here

# Cloudinary (will setup in step 3.5)
CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```

**✅ Verification**: Strapi connects to database

#### 3.3 Start Strapi & Create Admin User

```bash
cd backend
npm run develop
```

- Open http://localhost:1337/admin
- Create admin account:
  - Email: your-email@example.com
  - Password: (strong password)
  - Username: admin

**✅ Verification**: Can log into Strapi admin panel

#### 3.4 Create Content Types

Create the following content types through Strapi admin UI (Content-Type Builder):

##### **3.4.1 Brand Content Type**

Navigate to: Content-Type Builder → Create new collection type → "Brand"

Fields:
- `name` - Text (Short text, Required, Unique)
- `slug` - UID (Attached to: name, Required)
- `logo` - Media (Single media, Images only)
- `description` - Rich text (Markdown)
- `seo` - Component (Create new):
  - `metaTitle` - Text
  - `metaDescription` - Text (Long text)
  - `keywords` - Text (Long text)
  - `canonicalURL` - Text

**Settings**:
- Enable Draft & Publish
- Enable Internationalization (if needed)

##### **3.4.2 Car Content Type**

Navigate to: Content-Type Builder → Create new collection type → "Car"

**Basic Information:**
- `name` - Text (Required)
- `slug` - UID (Attached to: name, Required, Unique)
- `brand` - Relation (Many-to-One with Brand)
- `price` - Decimal (Required)
- `pricePromo` - Decimal (Optional)
- `year` - Integer (Required)
- `status` - Enumeration (available, sold, coming-soon)
- `stockCount` - Integer (Default: 0)

**Classification:**
- `category` - Enumeration (sedan, suv, mpv, hatchback, pickup)
- `fuelType` - Enumeration (gasoline, diesel, hybrid, electric)
- `transmission` - Enumeration (manual, automatic, cvt)

**Content:**
- `shortDescription` - Text (Long text, 150-200 chars)
- `fullDescription` - Rich text (Markdown)
- `features` - JSON
- `colors` - JSON

**Media:**
- `mainImage` - Media (Single image, Required)
- `gallery` - Media (Multiple images)
- `video` - Text (YouTube URL)
- `brochure` - Media (Single file, PDF)

**Specifications Component** (Create new component: "specs"):
- `engine` - Text
- `power` - Text
- `torque` - Text
- `fuelConsumption` - Text
- `topSpeed` - Text
- `acceleration` - Text
- `length` - Integer
- `width` - Integer
- `height` - Integer
- `wheelbase` - Integer
- `groundClearance` - Integer
- `curbWeight` - Integer
- `seats` - Integer
- `fuelTankCapacity` - Integer
- `trunkCapacity` - Integer
- `driveType` - Text
- `suspension` - Text (Long text)
- `brakes` - Text
- `tires` - Text
- `airbags` - Integer
- `safetyFeatures` - JSON
- `infotainment` - Text
- `speakers` - Integer
- `climateControl` - Text
- `other` - JSON

**Comparison:**
- `highlights` - JSON (Array of strings)
- `pros` - JSON (Array of strings)
- `cons` - JSON (Array of strings)

**SEO Component:**
- `seo` - Component (Reuse from Brand)

**Analytics:**
- `views` - Integer (Default: 0)
- `leadCount` - Integer (Default: 0)

**Relations:**
- `brand` - Relation (Many-to-One) [already added]
- `relatedCars` - Relation (Many-to-Many with Car)

**Settings**: Enable Draft & Publish

##### **3.4.3 Post (Blog) Content Type**

Navigate to: Content-Type Builder → Create new collection type → "Post"

Fields:
- `title` - Text (Required)
- `slug` - UID (Attached to: title, Required, Unique)
- `excerpt` - Text (Long text, 150-200 chars)
- `content` - Rich text (Markdown)
- `category` - Enumeration (review, comparison, guide, news, promotion)
- `tags` - JSON (Array of strings)
- `featuredImage` - Media (Single image, Required)
- `relatedCars` - Relation (Many-to-Many with Car)
- `author` - Text (Default: "Admin")
- `seo` - Component (Reuse from Brand)
- `views` - Integer (Default: 0)
- `readTime` - Integer (Minutes)

**Settings**: Enable Draft & Publish

##### **3.4.4 Lead Content Type**

Navigate to: Content-Type Builder → Create new collection type → "Lead"

**Contact Information:**
- `name` - Text
- `phone` - Text (Required)
- `email` - Email

**Interest:**
- `interestedCar` - Relation (Many-to-One with Car)
- `message` - Text (Long text)
- `budget` - Text
- `source` - Enumeration (contact-form, test-drive, quote-request, call-button)
- `preferredContactTime` - Enumeration (morning, afternoon, evening)

**Status:**
- `status` - Enumeration (new, contacted, qualified, converted, lost) - Default: "new"

**Tracking:**
- `utmSource` - Text
- `utmMedium` - Text
- `utmCampaign` - Text
- `utmContent` - Text
- `utmTerm` - Text
- `ipAddress` - Text
- `userAgent` - Text (Long text)
- `referrer` - Text
- `landingPage` - Text

**CRM:**
- `notes` - Rich text
- `followUpDate` - Date
- `assignedTo` - Text
- `contactedAt` - DateTime

**Settings**:
- Enable Draft & Publish
- Disable public API access (we'll use it only internally)

**✅ Verification**: All 4 content types created

#### 3.5 Configure Cloudinary Plugin

Install Cloudinary provider:
```bash
cd backend
npm install @strapi/provider-upload-cloudinary
```

Create account at https://cloudinary.com (free tier: 25GB)

Get credentials:
- Cloud name
- API Key
- API Secret

Update `backend/config/plugins.ts`:
```typescript
export default ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
```

Add to `backend/.env`:
```env
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_KEY=your-api-key
CLOUDINARY_SECRET=your-api-secret
```

**✅ Verification**: Upload test image in Media Library

### Day 4: Permissions & Sample Data

#### 4.1 Configure API Permissions

Navigate to: Settings → Users & Permissions → Roles → Public

Enable public access for:
- **Brand**: find, findOne
- **Car**: find, findOne, count
- **Post**: find, findOne, count

**Lead**: Keep all disabled (will use API route)

**✅ Verification**: Can access `http://localhost:1337/api/brands` without auth

#### 4.2 Generate API Token

Navigate to: Settings → API Tokens → Create new API Token

- Name: "Next.js Frontend"
- Token type: Read-Only
- Token duration: Unlimited

Copy the token and add to `frontend/.env.local`:
```env
STRAPI_API_TOKEN=your-generated-token-here
```

**✅ Verification**: Token saved securely

#### 4.3 Create Sample Data

Create at least:
- **3 Brands** (e.g., Honda, Toyota, Mazda)
- **10 Cars** (minimum) with:
  - All fields filled
  - At least 5 images per car
  - Complete specifications
- **5 Blog Posts** with:
  - Featured images
  - Full content
  - Related cars

**Sample Brand: Honda**
```
Name: Honda
Slug: honda (auto-generated)
Description: Honda là thương hiệu xe hơi Nhật Bản...
Logo: [Upload Honda logo]
```

**Sample Car: Honda Civic 2024**
```
Name: Honda Civic 2024
Slug: honda-civic-2024
Brand: Honda
Price: 789000000 (789 million VND)
PricePromo: 749000000
Year: 2024
Status: available
Stock Count: 5
Category: sedan
Fuel Type: gasoline
Transmission: cvt
Short Description: Honda Civic 2024 - Sedan hạng C cao cấp với động cơ VTEC Turbo mạnh mẽ...
[Add full description, specs, features, images]
```

**✅ Verification**:
- Can see brands at `/content-manager/collectionType/api::brand.brand`
- Can see cars at `/content-manager/collectionType/api::car.car`
- All data published (not draft)

#### 4.4 Test API Endpoints

Test in browser or Postman:

```bash
# Get all brands
http://localhost:1337/api/brands?populate=*

# Get all cars with relations
http://localhost:1337/api/cars?populate=*

# Get single car by slug
http://localhost:1337/api/cars?filters[slug][$eq]=honda-civic-2024&populate=*

# Get all posts
http://localhost:1337/api/posts?populate=*
```

**✅ Verification**: All endpoints return correct JSON data

---

## 🧪 Testing Criteria

Before moving to Plan 03:

- [ ] Strapi admin accessible at http://localhost:1337/admin
- [ ] PostgreSQL database connected
- [ ] All 4 content types created (Brand, Car, Post, Lead)
- [ ] Cloudinary configured and working
- [ ] Public API permissions set correctly
- [ ] API token generated and saved
- [ ] At least 3 brands created
- [ ] At least 10 cars created with full data
- [ ] At least 5 blog posts created
- [ ] API endpoints return data correctly

---

## 📸 Expected Output

**Strapi Dashboard:**
```
Content-Type Builder:
├── Brand ✅
├── Car ✅
├── Post ✅
└── Lead ✅

Content Manager:
├── Brands (3) ✅
├── Cars (10) ✅
├── Posts (5) ✅
└── Leads (0)

Media Library:
└── 50+ images uploaded ✅
```

**API Test:**
```bash
curl http://localhost:1337/api/cars?populate=*
# Should return array of cars with all relations
```

---

## 🚨 Common Issues & Solutions

### Issue 1: Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**:
- Ensure PostgreSQL is running
- Check credentials in `.env`
- Try: `psql -U postgres -c "SELECT 1"`

### Issue 2: Strapi Admin Not Loading
```
Error: Cannot GET /admin
```
**Solution**:
```bash
# Rebuild admin panel
cd backend
npm run build
npm run develop
```

### Issue 3: Cloudinary Upload Fails
**Solution**:
- Verify credentials are correct
- Check free tier limits (25GB)
- Test connection manually

### Issue 4: API Returns Empty Data
**Solution**:
- Check content is **Published** (not Draft)
- Verify API permissions in Settings → Roles → Public
- Add `?populate=*` to include relations

### Issue 5: Port 1337 Already in Use
```bash
# Change port in backend/config/server.ts
PORT=1338

# Or kill process
npx kill-port 1337
```

---

## 📚 Resources

- [Strapi Documentation](https://docs.strapi.io)
- [Strapi Content-Type Builder](https://docs.strapi.io/user-docs/content-type-builder)
- [Cloudinary Integration](https://docs.strapi.io/developer-docs/latest/plugins/upload.html)
- [PostgreSQL Downloads](https://www.postgresql.org/download/)

---

## ✅ Completion Checklist

- [ ] Strapi initialized and running
- [ ] Database configured and connected
- [ ] All content types created correctly
- [ ] Cloudinary media storage configured
- [ ] API permissions set
- [ ] API token generated
- [ ] Sample brands created (3+)
- [ ] Sample cars created (10+)
- [ ] Sample posts created (5+)
- [ ] API endpoints tested and working
- [ ] `.env` files configured

---

## ➡️ Next Steps

1. Keep Strapi running: `npm run develop`
2. Mark Plan 02 as ✅ in `00-master-plan.md`
3. Commit changes:
```bash
git add backend/
git commit -m "feat: setup Strapi CMS with content types (Plan 02)"
```
4. Proceed to **Plan 03: Layout Components**

---

**Status**: ⬜ Not Started
**Last Updated**: 2026-01-23
