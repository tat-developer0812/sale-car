# 🚗 Car Sales Website - Master Plan

## Project Overview

**Goal**: Build a high-performance car sales website with Next.js 14 + Strapi CMS
**Timeline**: 8 weeks (56 days)
**Primary Objectives**:
1. SEO Rankings (Top 3 for target keywords)
2. Lead Generation (5% conversion rate)
3. Cost Optimization (< $15/month)

---

## 📋 Plan Execution Order

Execute these plans **sequentially** - each plan depends on the previous one:

```
┌─────────────────────────────────────────────────────┐
│                 PHASE 1: FOUNDATION                 │
│                    (Weeks 1-2)                      │
└─────────────────────────────────────────────────────┘
  │
  ├─► Plan 01: Environment Setup           (Days 1-2)
  │    └─► Initialize project, install dependencies
  │
  ├─► Plan 02: Strapi Backend             (Days 3-4)
  │    └─► Setup CMS, database, content types
  │
  ├─► Plan 03: Layout Components          (Days 5-7)
  │    └─► Build Header, Footer, Navigation
  │
  └─► Plan 04: API Integration            (Days 8-10)
       └─► Connect frontend to Strapi

┌─────────────────────────────────────────────────────┐
│                PHASE 2: CORE PAGES                  │
│                    (Weeks 3-4)                      │
└─────────────────────────────────────────────────────┘
  │
  ├─► Plan 05: Homepage & Listing         (Days 11-14)
  │    └─► Build homepage and car listing
  │
  ├─► Plan 06: Car Detail Page            (Days 15-17)
  │    └─► Complete product detail page
  │
  └─► Plan 07: Blog System                (Days 18-21)
       └─► Blog listing and detail pages

┌─────────────────────────────────────────────────────┐
│              PHASE 3: LEAD CAPTURE                  │
│                    (Week 4)                         │
└─────────────────────────────────────────────────────┘
  │
  ├─► Plan 08: Forms & UI                 (Days 22-24)
  │    └─► Contact forms, validation
  │
  ├─► Plan 09: Lead Backend               (Days 25-26)
  │    └─► API, notifications, integrations
  │
  └─► Plan 10: Interactive Widgets        (Days 27-28)
       └─► Sticky buttons, popups, exit intent

┌─────────────────────────────────────────────────────┐
│             PHASE 4: SEO & LAUNCH                   │
│                  (Weeks 5-8)                        │
└─────────────────────────────────────────────────────┘
  │
  ├─► Plan 11: SEO Implementation         (Days 29-35)
  │    └─► Metadata, schema, analytics
  │
  └─► Plan 12: Testing & Deployment       (Days 36-56)
       └─► QA, launch, monitoring

```

---

## 🎯 Success Criteria

### Phase 1 Complete When:
- ✅ Next.js project running
- ✅ Strapi CMS with sample data
- ✅ Header/Footer working
- ✅ API client fetching data

### Phase 2 Complete When:
- ✅ Homepage displaying cars
- ✅ Car detail pages functional
- ✅ Blog system working
- ✅ All navigation functional

### Phase 3 Complete When:
- ✅ Forms submitting successfully
- ✅ Leads saving to database
- ✅ Notifications working (Email + Telegram)
- ✅ Widgets interactive

### Phase 4 Complete When:
- ✅ SEO metadata on all pages
- ✅ PageSpeed score 90+
- ✅ All tests passing
- ✅ Deployed to production

---

## 📊 Dependencies Graph

```
01 (Env) ──┐
           ├──► 03 (Layout) ──┐
02 (CMS) ──┘                  ├──► 05 (Homepage) ──┐
                               │                     │
           04 (API) ───────────┘                     ├──► 11 (SEO)
                                                      │
           06 (Detail) ────────────────────────────┐ │
           07 (Blog) ──────────────────────────────┤ │
           08 (Forms) ──┐                          │ │
                        ├──► 10 (Widgets) ────────┴─┴──► 12 (Deploy)
           09 (Backend) ┘
```

---

## ⚠️ Critical Path Items

These MUST be completed in order:

1. **Plans 01-02**: Foundation (can't proceed without environment + CMS)
2. **Plan 04**: API Integration (all pages need data)
3. **Plan 09**: Lead Backend (forms won't work without it)
4. **Plan 11**: SEO (affects production deployment)

---

## 🔧 Tech Stack Summary

| Component | Technology | Cost |
|-----------|-----------|------|
| Frontend | Next.js 14 | Free |
| Styling | Tailwind CSS | Free |
| UI Components | Shadcn/ui | Free |
| Backend | Strapi CMS | Free |
| Database | PostgreSQL | $5/mo |
| Hosting (Frontend) | Vercel | Free |
| Hosting (Backend) | Railway | $5/mo |
| CDN | Cloudinary | Free |
| Email | Resend | Free |
| Notifications | Telegram Bot | Free |
| Analytics | Google Analytics | Free |

**Total Monthly Cost**: ~$10/month

---

## 📝 Daily Workflow

For each plan:

1. **Read** the plan file completely
2. **Check** prerequisites are met
3. **Execute** tasks in order (use checklist)
4. **Test** completion criteria
5. **Commit** code to Git
6. **Update** this master plan status
7. **Move** to next plan

---

## 🚦 Current Status

| Plan | Status | Completion Date |
|------|--------|----------------|
| 01 - Environment Setup | ⬜ Not Started | - |
| 02 - Strapi Backend | ⬜ Not Started | - |
| 03 - Layout Components | ⬜ Not Started | - |
| 04 - API Integration | ⬜ Not Started | - |
| 05 - Homepage & Listing | ⬜ Not Started | - |
| 06 - Car Detail Page | ⬜ Not Started | - |
| 07 - Blog System | ⬜ Not Started | - |
| 08 - Forms & UI | ⬜ Not Started | - |
| 09 - Lead Backend | ⬜ Not Started | - |
| 10 - Interactive Widgets | ⬜ Not Started | - |
| 11 - SEO Implementation | ⬜ Not Started | - |
| 12 - Testing & Deployment | ⬜ Not Started | - |

**Legend**: ⬜ Not Started | 🟡 In Progress | ✅ Completed | ⚠️ Blocked

---

## 📞 Getting Help

If stuck on any plan:

1. Review the specific plan's troubleshooting section
2. Check the main project plan document
3. Consult Next.js 14 docs: https://nextjs.org/docs
4. Consult Strapi docs: https://docs.strapi.io

---

## 🎉 Ready to Start?

**Next Step**: Open `01-environment-setup.md` and begin!

```bash
# Start with plan 01
cat docs/plans/01-environment-setup.md
```
