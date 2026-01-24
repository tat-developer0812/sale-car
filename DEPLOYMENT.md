# Deployment Guide

## Prerequisites

- Node.js 18+
- Git
- Vercel account
- Railway account (for Strapi)
- Domain name (optional)

## 1. Strapi Backend Deployment (Railway)

### Step 1: Prepare Backend

```bash
cd backend

# Install PostgreSQL adapter
npm install pg
```

### Step 2: Configure Database

Create/update `config/database.ts`:

```typescript
export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'),
      ssl: env.bool('DATABASE_SSL', true) && {
        rejectUnauthorized: false,
      },
    },
  },
});
```

### Step 3: Deploy to Railway

1. Go to https://railway.app
2. Create new project
3. Add PostgreSQL service
4. Connect your GitHub repo (backend folder)
5. Set environment variables:

```env
NODE_ENV=production
DATABASE_URL=<from Railway PostgreSQL>
APP_KEYS=<generate random keys>
API_TOKEN_SALT=<generate random>
ADMIN_JWT_SECRET=<generate random>
TRANSFER_TOKEN_SALT=<generate random>
JWT_SECRET=<generate random>
```

6. Deploy and get your Strapi URL

### Step 4: Create API Token

1. Access Strapi admin at `https://your-strapi.railway.app/admin`
2. Go to Settings → API Tokens
3. Create new token with "Full access"
4. Copy the token for frontend configuration

## 2. Next.js Frontend Deployment (Vercel)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for production"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Import your GitHub repository
3. Set root directory: `frontend`
4. Framework preset: Next.js

### Step 3: Configure Environment Variables

Add these in Vercel dashboard → Settings → Environment Variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=Your Car Showroom

# Strapi CMS
NEXT_PUBLIC_STRAPI_URL=https://your-strapi.railway.app
STRAPI_API_TOKEN=<your-strapi-api-token>

# Lead Notifications
TELEGRAM_BOT_TOKEN=<your-telegram-bot-token>
TELEGRAM_CHAT_ID=<your-telegram-chat-id>

# Email (Resend)
RESEND_API_KEY=<your-resend-api-key>
SALES_EMAIL=sales@your-domain.com
FROM_EMAIL=noreply@your-domain.com
FROM_NAME=Your Car Showroom

# Google Services (optional)
GOOGLE_SERVICE_ACCOUNT_KEY=<json-credentials>
GOOGLE_SHEET_ID=<spreadsheet-id>

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 4: Deploy

Click "Deploy" and wait for the build to complete.

## 3. Domain Configuration

### Add Custom Domain to Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., `yoursite.com`)
3. Configure DNS:

```
A Record:     @     →  76.76.21.21
CNAME Record: www   →  cname.vercel-dns.com
```

4. Wait for SSL certificate (automatic)

## 4. Post-Deployment Checklist

### Verify Everything Works

- [ ] Homepage loads correctly
- [ ] Car listing page works
- [ ] Car detail pages work
- [ ] Blog pages work
- [ ] Contact form submits
- [ ] Telegram notifications arrive
- [ ] Emails are sent
- [ ] All images load
- [ ] No console errors

### SEO Verification

- [ ] Visit `/sitemap.xml` - should show all pages
- [ ] Visit `/robots.txt` - should show rules
- [ ] Test with Google Rich Results Test
- [ ] Submit sitemap to Google Search Console

### Performance Check

- [ ] Run Lighthouse audit (target 90+ all categories)
- [ ] Check Core Web Vitals in Vercel Analytics
- [ ] Verify images are optimized

## 5. Monitoring Setup

### Google Search Console

1. Go to https://search.google.com/search-console
2. Add property with your domain
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: `https://your-domain.com/sitemap.xml`

### Google Analytics

1. Create GA4 property at https://analytics.google.com
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to Vercel environment variables
4. Verify tracking works

### Uptime Monitoring (Optional)

Use free services like:
- UptimeRobot (https://uptimerobot.com)
- Better Uptime (https://betteruptime.com)

Monitor these URLs:
- `https://your-domain.com`
- `https://your-domain.com/api/leads` (POST check)

## 6. Troubleshooting

### Build Fails

1. Check build logs in Vercel
2. Ensure all environment variables are set
3. Run `npm run build` locally to debug

### API Connection Issues

1. Verify `NEXT_PUBLIC_STRAPI_URL` is correct
2. Check CORS settings in Strapi
3. Ensure `STRAPI_API_TOKEN` has correct permissions

### Images Not Loading

1. Check Strapi media library
2. Verify `next.config.ts` has correct image domains
3. Check network tab for 404 errors

### Forms Not Submitting

1. Check browser console for errors
2. Verify `/api/leads` endpoint works
3. Check Telegram/Email credentials

## 7. Rollback

If critical issues occur:

### Vercel Rollback

1. Go to Vercel Dashboard → Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"

### Database Rollback (Railway)

1. Go to Railway Dashboard
2. Select PostgreSQL service
3. Use backups to restore

## Support

- Next.js Docs: https://nextjs.org/docs
- Strapi Docs: https://docs.strapi.io
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
