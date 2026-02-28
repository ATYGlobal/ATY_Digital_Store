# ATY Digital Store — Project Structure

## Directory Tree

```
atydigitalstore/
├── app/
│   ├── layout.tsx                    ← Root layout (Navbar + Footer + fonts)
│   ├── globals.css                   ← Tailwind base + font imports + animations
│   ├── page.tsx                      ← Homepage (/)
│   ├── blog/
│   │   └── [slug]/
│   │       └── page.tsx              ← Blog post page (/blog/vercel-vs-netlify)
│   ├── trending/
│   │   └── page.tsx                  ← Trending hub (/trending)
│   └── contact/
│       └── page.tsx                  ← Contact & partnerships (/contact)
│
├── components/
│   ├── navigation/
│   │   ├── Navbar.tsx                ← Fixed top nav with mega-menu + mobile
│   │   └── Footer.tsx                ← Footer with links + Affiliate Disclosure
│   │
│   ├── ui/                           ← Reusable, drop-anywhere primitives
│   │   ├── ProductCard.tsx           ← Product card with image, rating, CTA
│   │   ├── AffiliateButton.tsx       ← Buy button (card or compact variant)
│   │   └── ComparisonTable.tsx       ← Responsive hosting comparison table
│   │
│   ├── blog/                         ← Blog-post-specific components
│   │   ├── NewsletterBox.tsx         ← Dark newsletter signup widget
│   │   ├── ComparisonTable.tsx       ← (re-export or duplicate of ui/ version)
│   │   ├── Sidebar.tsx               ← Sticky TOC + quick links
│   │   └── AuthorProfile.tsx         ← Author avatar + bio + date/read time
│   │
│   └── sections/                     ← Page-level section compositions
│       ├── HeroSection.tsx           ← Homepage hero
│       ├── FeaturedProducts.tsx      ← Homepage product grid
│       ├── CTABanner.tsx             ← Mid-page CTA strip
│       ├── VideoGallery.tsx          ← YouTube embed gallery
│       ├── BlogPreview.tsx           ← Latest posts grid
│       ├── TrendingClient.tsx        ← "use client" wrapper for TrendingPage
│       └── ContactClient.tsx         ← "use client" wrapper for ContactPage
│
├── lib/
│   └── mockData.ts                   ← All seed data + getter functions
│
├── public/
│   └── images/                       ← Static product/author images
│
├── tailwind.config.ts                ← Theme: DM Sans, Bebas Neue, brand colors
└── next.config.ts                    ← Image domains, redirects, etc.
```

## Import Convention

All imports use the `@/` alias pointing to the project root:

```typescript
import Navbar          from "@/components/navigation/Navbar";
import Footer          from "@/components/navigation/Footer";
import ProductCard     from "@/components/ui/ProductCard";
import AffiliateButton from "@/components/ui/AffiliateButton";
import ComparisonTable from "@/components/ui/ComparisonTable";
import NewsletterBox   from "@/components/blog/NewsletterBox";
import { getFeaturedProducts } from "@/lib/mockData";
```

## Font Strategy

| Font            | Use                              | CSS class        |
|-----------------|----------------------------------|------------------|
| DM Sans         | Body, UI, all prose              | default (`font-sans`) |
| Bebas Neue      | Display headings, Trending page  | `.font-bebas`    |
| DM Serif Display| Editorial headings (Contact page)| `.font-display-serif` |

Fonts are loaded once in `app/globals.css` via Google Fonts and exposed as
CSS variables via `tailwind.config.ts` → `fontFamily`.

## Deployment Checklist (Vercel)

1. `npm install` — installs all deps
2. Add env vars in Vercel dashboard (none required for static mock data)
3. Push to GitHub → Vercel auto-deploys on every `main` push
4. Set `NEXT_PUBLIC_SITE_URL` for OG image generation
5. Verify `next/image` domains in `next.config.ts` for product images
