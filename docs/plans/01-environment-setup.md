# Plan 01: Environment & Project Setup

**Duration**: Days 1-2
**Phase**: Foundation
**Prerequisites**: None (Starting point)

---

## 🎯 Goals

- Initialize Next.js 14 project with App Router
- Install all required dependencies
- Setup Shadcn/ui component library
- Configure development tools (ESLint, Prettier, TypeScript)
- Create proper folder structure
- Setup version control

---

## ✅ Prerequisites Check

Before starting:
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm or pnpm installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] GitHub account (optional, for version control)

---

## 📋 Tasks Checklist

### Day 1: Project Initialization

#### 1.1 Create Next.js Project
```bash
# Navigate to frontend directory (it already exists)
cd frontend

# Verify Next.js is already initialized
cat package.json
```

**✅ Verification**: Check that `package.json` exists with Next.js 16.1.4

#### 1.2 Install Core Dependencies

```bash
# Navigate to frontend directory
cd frontend

# Install form handling
npm install react-hook-form zod @hookform/resolvers

# Install utilities
npm install axios date-fns clsx tailwind-merge

# Install icons
npm install lucide-react

# Already installed: @tanstack/react-query, next-themes
```

**✅ Verification**: All packages appear in `package.json`

#### 1.3 Install Shadcn/ui Components

```bash
# Shadcn is already configured (components.json exists)
# Install additional components we'll need:

npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add select
npx shadcn@latest add form
npx shadcn@latest add dropdown-menu
npx shadcn@latest add navigation-menu
npx shadcn@latest add badge
npx shadcn@latest add skeleton
npx shadcn@latest add alert
npx shadcn@latest add toast
```

**✅ Verification**: Components appear in `src/components/ui/`

#### 1.4 Setup Environment Variables

```bash
# Create .env.local file
touch .env.local
```

Add to `.env.local`:
```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Car Showroom

# Strapi Configuration (will setup in Plan 02)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=

# Cloudinary (will setup later)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

# Email (Resend - will setup later)
RESEND_API_KEY=

# Telegram Bot (will setup later)
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# Google Sheets (will setup later)
GOOGLE_SERVICE_ACCOUNT_KEY=
GOOGLE_SHEET_ID=

# Analytics (will setup later)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

Create `.env.example`:
```bash
cp .env.local .env.example
# Remove all values, keep only keys
```

**✅ Verification**: `.env.local` exists and is in `.gitignore`

### Day 2: Configuration & Structure

#### 2.1 Update TypeScript Configuration

The `tsconfig.json` already exists. Verify it has:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**✅ Verification**: TypeScript paths work (`@/` imports)

#### 2.2 Configure ESLint

Check `eslint.config.mjs` exists. If needed, update:
```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default eslintConfig;
```

**✅ Verification**: Run `npm run lint` without errors

#### 2.3 Configure Prettier

Check `.prettierrc` exists:
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**✅ Verification**: Run `npm run format:check`

#### 2.4 Create Additional Folders

```bash
# Navigate to src directory
cd src

# Create missing directories
mkdir -p hooks
mkdir -p lib
mkdir -p types
mkdir -p styles
mkdir -p app/api/leads
mkdir -p app/api/contact
mkdir -p app/api/webhooks
mkdir -p components/blog
mkdir -p components/car
mkdir -p components/common
mkdir -p components/forms
mkdir -p components/layout
mkdir -p components/seo
mkdir -p components/widgets
```

**✅ Verification**: All directories exist

#### 2.5 Create Utility Files

Create `src/lib/utils.ts` (already exists, verify content):
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Create `src/lib/constants.ts`:
```typescript
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Your Car Showroom'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export const ITEMS_PER_PAGE = 12
export const MAX_PRICE = 5000000000 // 5 billion VND

export const CAR_CATEGORIES = [
  'sedan',
  'suv',
  'mpv',
  'hatchback',
  'pickup',
] as const

export const FUEL_TYPES = [
  'gasoline',
  'diesel',
  'hybrid',
  'electric',
] as const

export const TRANSMISSION_TYPES = [
  'manual',
  'automatic',
  'cvt',
] as const
```

Create `src/lib/format.ts`:
```typescript
/**
 * Format price in VND
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(price)
}

/**
 * Format date
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('vi-VN').format(num)
}

/**
 * Generate slug from Vietnamese text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
```

**✅ Verification**: Files created without TypeScript errors

#### 2.6 Setup Git (if not already done)

```bash
# Initialize git (if needed)
git init

# Add all files
git add .

# Create initial commit
git commit -m "chore: initial project setup with Next.js 14"

# Optional: Connect to GitHub
# git remote add origin <your-repo-url>
# git push -u origin main
```

**✅ Verification**: Git history shows initial commit

#### 2.7 Test Development Server

```bash
# Start development server
npm run dev

# Server should start on http://localhost:3000
```

**✅ Verification**:
- Server starts without errors
- Can access http://localhost:3000
- Hot reload works when editing files

---

## 🧪 Testing Criteria

Before moving to Plan 02, verify:

- [ ] `npm run dev` starts without errors
- [ ] `npm run build` completes successfully
- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes
- [ ] All Shadcn components imported without errors
- [ ] `.env.local` file exists with all keys
- [ ] Git repository initialized
- [ ] All folder structure created

---

## 📸 Expected Output

Your project structure should look like:

```
frontend/
├── .env.local ✅
├── .env.example ✅
├── .gitignore ✅
├── components.json ✅
├── next.config.ts ✅
├── package.json ✅
├── tsconfig.json ✅
├── eslint.config.mjs ✅
├── .prettierrc ✅
├── public/
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── app/
│   │   ├── layout.tsx ✅
│   │   ├── page.tsx ✅
│   │   ├── globals.css ✅
│   │   └── api/ ✅
│   ├── components/
│   │   ├── ui/ ✅ (20+ Shadcn components)
│   │   ├── layout/ ✅
│   │   ├── car/ ✅
│   │   ├── blog/ ✅
│   │   ├── forms/ ✅
│   │   ├── seo/ ✅
│   │   ├── common/ ✅
│   │   └── widgets/ ✅
│   ├── lib/
│   │   ├── utils.ts ✅
│   │   ├── constants.ts ✅
│   │   └── format.ts ✅
│   ├── types/ ✅
│   ├── hooks/ ✅
│   ├── config/ ✅
│   └── styles/ ✅
└── node_modules/
```

---

## 🚨 Common Issues & Solutions

### Issue 1: Port 3000 Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Issue 2: Module Not Found Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Issue 3: Shadcn Component Installation Fails
```bash
# Make sure components.json is configured correctly
npx shadcn@latest init

# Reinstall specific component
npx shadcn@latest add button --overwrite
```

### Issue 4: TypeScript Path Alias Not Working
- Restart TypeScript server in VS Code (Cmd+Shift+P > "TypeScript: Restart TS Server")
- Verify `tsconfig.json` has correct paths configuration

---

## 📚 Resources

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

## ✅ Completion Checklist

Mark complete when:
- [ ] All dependencies installed
- [ ] Development server runs successfully
- [ ] Build process works
- [ ] Linting and formatting configured
- [ ] Folder structure created
- [ ] Utility files created
- [ ] Git initialized and committed
- [ ] `.env.local` configured

---

## ➡️ Next Steps

**After completing this plan:**
1. Mark Plan 01 as ✅ Completed in `00-master-plan.md`
2. Commit all changes to Git
3. Proceed to **Plan 02: Strapi Backend Setup**

```bash
# Commit your progress
git add .
git commit -m "feat: complete environment setup (Plan 01)"

# Move to next plan
cat docs/plans/02-strapi-backend.md
```

---

**Status**: ⬜ Not Started
**Last Updated**: 2026-01-23
