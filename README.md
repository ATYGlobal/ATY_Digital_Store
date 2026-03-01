# ATY Digital Store

Independent tech reviews and curated affiliate picks. Built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**.

## Quick Start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run type-check   # TypeScript check only
```

## Project Structure

```
atydigitalstore/
├── app/                    # App Router pages
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── page.tsx            # Homepage
│   ├── about/page.tsx      # About Us
│   ├── blog/[slug]/page.tsx
│   ├── contact/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── trending/page.tsx   # Affiliate directory (reads data/Affiliate.csv)
├── components/
│   ├── blog/               # AuthorProfile, Sidebar, NewsletterBox
│   ├── navigation/         # Navbar, Footer
│   ├── sections/           # HeroSection, FeaturedProducts, BlogPreview,
│   │                       # CTABanner, VideoGallery, ContactClient,
│   │                       # TrendingClient (CSV-powered)
│   └── ui/                 # ProductCard, AffiliateButton, ComparisonTable
├── data/
│   └── Affiliate.csv       # 200 affiliate brand records (semicolon-delimited)
├── lib/
│   ├── mockData.ts         # All types + mock content data
│   └── csvProcessor.ts     # Server-only CSV parser for Affiliate.csv
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── next.config.mjs         # Next.js config (plain JS)
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Key Type Fixes Applied

| File | Fix |
|------|-----|
| `lib/mockData.ts` | `store: string` (required, not `string \| undefined`) |
| `components/ui/AffiliateButton.tsx` | Imports `Product` from `@/lib/mockData` |
| `components/ui/ProductCard.tsx` | Imports `Product` from `@/lib/mockData`, re-exports for compat |
| `next.config.mjs` | Converted from `.ts` to `.mjs` (no RTF risk) |
| `app/about/page.tsx` | Plain UTF-8 text, no RTF encoding |
| `lib/csvProcessor.ts` | Server-only CSV parser; never import in Client Components |

## CSV Data Source

`data/Affiliate.csv` is semicolon-delimited with 5 columns:

| Column | Description |
|--------|-------------|
| Brand Name | Company / product name |
| Product Category | Category string (23 unique values) |
| Affiliate Program URL | `Join Here` / `Search Google` / `[suspicious link removed]` |
| Contact Email / Portal | Affiliate contact address |
| Match Score | Editorial score 6–10 |

The `lib/csvProcessor.ts` parser reads this file at build time and enriches each row with category images, descriptions, and normalised UI group labels.

## Deployment (Vercel)

```bash
# 1. Push to GitHub
git add .
git commit -m "chore: initial project"
git push

# 2. Import repo in vercel.com — zero config needed for Next.js
```

No environment variables are required for the base build.
See `.env.example` for optional newsletter / contact form keys.
