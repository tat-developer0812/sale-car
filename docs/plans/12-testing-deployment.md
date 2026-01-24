# Plan 12: Testing, Deployment & Launch

**Duration**: Days 36-56 (3 weeks)
**Phase**: Final Testing & Production Launch
**Prerequisites**: Plans 01-11 completed

---

## 🎯 Goals

- Comprehensive testing (functional, cross-browser, mobile)
- Performance optimization
- Security testing
- Deploy Strapi to Railway/Render
- Deploy Next.js to Vercel
- Domain configuration
- Post-launch monitoring
- Marketing launch

---

## 📋 Tasks Checklist

### Week 6: Testing & Bug Fixes (Days 36-42)

#### Day 36-37: Mobile Optimization

**Mobile Testing Checklist**:
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test on iPad (tablet view)
- [ ] All buttons >= 48px tap target
- [ ] Forms work on mobile keyboard
- [ ] Navigation hamburger menu works
- [ ] Images responsive
- [ ] No horizontal scroll
- [ ] Font sizes readable (min 16px body)

**Mobile-Specific Features**:
- [ ] Click-to-call buttons work (`tel:` links)
- [ ] WhatsApp button opens app
- [ ] Forms auto-focus appropriately
- [ ] Sticky elements don't overlap content

**✅ Test on**: BrowserStack or real devices

#### Day 38-39: Accessibility Audit (WCAG 2.1 AA)

**Keyboard Navigation**:
- [ ] Tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Skip navigation link present
- [ ] Modal dialogs trap focus

**Screen Reader**:
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] ARIA labels where needed
- [ ] Heading hierarchy correct (h1 → h2 → h3)

**Color & Contrast**:
- [ ] Text contrast >= 4.5:1 (WCAG AA)
- [ ] Interactive elements >= 3:1
- [ ] Test with color blindness simulator

**Tools**:
```bash
# Install axe DevTools extension
# Or use Lighthouse Accessibility audit
```

**✅ Run**: Lighthouse accessibility audit (aim for 95+)

#### Day 40-41: Cross-Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Test scenarios**:
1. Homepage loads correctly
2. Car listing with filters
3. Car detail page
4. Blog post page
5. Form submissions
6. Mobile menu
7. Image galleries
8. Dark mode toggle

**✅ Tools**: BrowserStack, LambdaTest, or real browsers

#### Day 42: Performance Testing

**Lighthouse Audit**:
```bash
# Open DevTools → Lighthouse
# Run audit for:
# - Performance
# - Accessibility
# - Best Practices
# - SEO

# Target scores:
# All >= 90 (preferably 95+)
```

**Core Web Vitals**:
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1

**Bundle Size**:
```bash
npm run build
# Check output for bundle sizes
# Each page should be < 200KB (gzipped)
```

**Image Optimization**:
- [ ] All images use Next/Image
- [ ] Proper sizes specified
- [ ] Lazy loading enabled
- [ ] Blur placeholders

**✅ Verify**: All PageSpeed scores >= 90

### Week 7: Deployment (Days 43-49)

#### Day 43-44: Strapi Deployment (Railway)

**1. Create Railway Account**:
- Go to https://railway.app
- Sign up with GitHub

**2. Deploy PostgreSQL**:
- New Project → Add PostgreSQL
- Copy connection string

**3. Deploy Strapi**:
```bash
cd backend

# Add to .env (production)
DATABASE_URL=postgresql://...
NODE_ENV=production
CLOUDINARY_NAME=your-name
CLOUDINARY_KEY=your-key
CLOUDINARY_SECRET=your-secret
```

- Connect GitHub repo
- Railway auto-detects Strapi
- Set environment variables in Railway dashboard
- Deploy

**4. Configure Domain**:
- Settings → Generate Domain
- Or add custom domain

**5. Test API**:
```bash
curl https://your-strapi.railway.app/api/cars?populate=*
```

**✅ Verification**: Strapi accessible, API returns data

#### Day 45-46: Next.js Deployment (Vercel)

**1. Push to GitHub**:
```bash
git add .
git commit -m "feat: ready for production deployment"
git push origin main
```

**2. Deploy to Vercel**:
- Go to https://vercel.com
- Import GitHub repo
- Framework preset: Next.js
- Root directory: `frontend`

**3. Configure Environment Variables**:
Add to Vercel dashboard:
```env
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_SITE_NAME=Your Car Showroom
NEXT_PUBLIC_STRAPI_URL=https://your-strapi.railway.app
STRAPI_API_TOKEN=your-token
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_xxx
TELEGRAM_BOT_TOKEN=xxx
TELEGRAM_CHAT_ID=xxx
```

**4. Deploy**:
- Click "Deploy"
- Wait for build to complete
- Visit preview URL

**✅ Verification**: Site works on Vercel preview

#### Day 47-48: Domain & SSL Configuration

**1. Purchase Domain**:
- Buy .vn or .com domain
- Recommended: Namecheap, Google Domains

**2. Configure DNS**:
In domain registrar:
```
A Record:     @     →  76.76.21.21 (Vercel)
CNAME Record: www   →  cname.vercel-dns.com
```

**3. Add Domain to Vercel**:
- Project Settings → Domains
- Add custom domain
- Verify DNS configuration

**4. SSL Certificate**:
- Vercel auto-provisions Let's Encrypt SSL
- Wait 24-48 hours for propagation

**✅ Verification**:
- Visit https://yoursite.com
- SSL certificate valid
- No mixed content warnings

#### Day 49: Final Production Tests

**Smoke Tests**:
- [ ] Homepage loads
- [ ] Car listing works
- [ ] Car detail pages work
- [ ] Blog works
- [ ] Forms submit successfully
- [ ] Leads save to Strapi
- [ ] Telegram notifications arrive
- [ ] Emails send successfully
- [ ] All images load
- [ ] No console errors

**SEO Tests**:
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt accessible
- [ ] Test structured data (Google Rich Results Test)
- [ ] Open Graph preview (Facebook Debugger)
- [ ] Twitter Card preview

**✅ Verification**: All systems operational

### Week 8: Post-Launch & Marketing (Days 50-56)

#### Day 50-51: Monitoring Setup

**1. Setup Sentry (Error Tracking)**:
```bash
npm install @sentry/nextjs

npx @sentry/wizard@latest -i nextjs
```

Add to `.env.local`:
```env
NEXT_PUBLIC_SENTRY_DSN=your-dsn
```

**2. Setup Uptime Monitoring**:
- Use Vercel Analytics (built-in)
- Or UptimeRobot (free)
- Monitor: Homepage, API endpoints

**3. Google Search Console**:
- Add property
- Verify ownership
- Submit sitemap: `https://yoursite.com/sitemap.xml`

**4. Google Analytics**:
- Verify tracking works
- Set up conversion goals:
  - Lead submissions
  - Phone clicks
  - Form starts

**✅ Verification**: All monitoring active

#### Day 52-53: Content Migration

**Upload Remaining Content**:
- [ ] 50-100 cars (full data + images)
- [ ] 30-50 blog posts
- [ ] All brand logos
- [ ] Optimize all images before upload

**SEO Optimization**:
- [ ] Every car has unique title/description
- [ ] Every blog post optimized
- [ ] All images have alt text
- [ ] Internal linking between pages

**✅ Verification**: 100+ pages indexed

#### Day 54-56: Marketing Launch

**Day 54: Soft Launch**
- [ ] Announce on social media
- [ ] Email existing customer list
- [ ] Share in relevant Facebook groups
- [ ] Post on car forums

**Day 55: SEO Submission**
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Submit to local directories
- [ ] Build initial backlinks (5-10)

**Day 56: Monitoring & Optimization**
- [ ] Monitor error logs (24 hours)
- [ ] Check lead submissions working
- [ ] Review analytics data
- [ ] Check Google Search Console
- [ ] Gather user feedback
- [ ] Create issues list for improvements

---

## 🚨 Emergency Rollback Plan

If critical issues found:

1. **Revert Vercel Deployment**:
   - Vercel Dashboard → Deployments
   - Click previous working deployment
   - Promote to production

2. **Database Issues**:
   - Railway dashboard → Backups
   - Restore from backup

3. **DNS Issues**:
   - Update DNS records back to old server
   - Wait for propagation (up to 48h)

---

## 📊 Success Metrics (First 30 Days)

Track these KPIs:

**Traffic**:
- [ ] 1,000+ organic visitors
- [ ] 50+ keywords ranking
- [ ] PageSpeed score >= 90

**Leads**:
- [ ] 50+ lead submissions
- [ ] 5%+ conversion rate
- [ ] < 2 min response time

**Technical**:
- [ ] 99.9%+ uptime
- [ ] < 3s average page load
- [ ] 0 critical errors

---

## ✅ Final Completion Checklist

### Pre-Launch
- [ ] All tests passing
- [ ] Mobile optimized
- [ ] Accessibility AA compliant
- [ ] PageSpeed 90+
- [ ] Strapi deployed
- [ ] Next.js deployed
- [ ] Domain configured
- [ ] SSL active
- [ ] Environment variables set

### Post-Launch
- [ ] Monitoring active
- [ ] Google Search Console verified
- [ ] Google Analytics tracking
- [ ] Sitemap submitted
- [ ] Content migrated
- [ ] Social media announced
- [ ] Error tracking enabled

---

## 🎉 Congratulations!

Your car sales website is now live!

**Next Steps**:
1. Monitor performance daily (week 1)
2. Respond to leads within 5 minutes
3. Create content schedule (2-3 posts/week)
4. Build backlinks (5-10/month)
5. Track keyword rankings weekly
6. Optimize based on analytics data

**Monthly Tasks**:
- Update car inventory
- Publish blog content
- Review analytics
- Check SEO rankings
- Optimize slow pages
- Fix reported bugs

---

## 📞 Support Resources

**Documentation**:
- Next.js: https://nextjs.org/docs
- Strapi: https://docs.strapi.io
- Vercel: https://vercel.com/docs
- Railway: https://docs.railway.app

**Community**:
- Next.js Discord
- Strapi Discord
- Stack Overflow

**Monitoring**:
- Vercel Dashboard
- Railway Dashboard
- Google Analytics
- Google Search Console
- Sentry

---

**Status**: ✅ Completed
**Last Updated**: 2026-01-23

---

## 🎯 Project Complete!

All 12 plans finished. Return to `00-master-plan.md` and mark your progress!
