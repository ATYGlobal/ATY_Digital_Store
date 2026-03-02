# ATY Digital Store

Independent tech reviews and curated affiliate picks.  
Built with **Next.js 14 App Router · TypeScript · Tailwind CSS**.

## Repository Layout

```
atydigitalstore/         ← repo root (push contents here, NOT the folder itself)
├── src/
│   ├── app/             ← Next.js App Router entry point
│   │   ├── page.tsx     ← homepage  /
│   │   ├── layout.tsx   ← root layout (Navbar + Footer)
│   │   ├── globals.css
│   │   ├── about/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── trending/page.tsx
│   ├── components/
│   │   ├── blog/        ← AuthorProfile, Sidebar, NewsletterBox
│   │   ├── navigation/  ← Navbar, Footer
│   │   ├── sections/    ← Hero, FeaturedProducts, TrendingClient, ...
│   │   └── ui/          ← ProductCard, AffiliateButton, ComparisonTable
│   └── lib/
│       ├── mockData.ts  ← all types + mock data
│       └── csvProcessor.ts  ← server-only CSV parser
├── data/
│   └── Affiliate.csv   ← 200 affiliate records (stays at root for fs access)
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── next.config.mjs      ← plain JS config
├── tailwind.config.ts   ← content paths point to src/
├── tsconfig.json        ← @/* alias → ./src/*
├── postcss.config.js
└── package.json
```

## Local Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run type-check   # TypeScript only, no emit
```

## Deploy to Vercel / Netlify

**Important:** Push the *contents* of this folder to your GitHub repo root —
not the `atydigitalstore` folder itself. Vercel must find `package.json`
at the repo root, otherwise it cannot detect the framework.

```bash
# Inside this folder:
git init
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git add .
git commit -m "chore: initial project"
git push -u origin main
```

Then import the repo in Vercel — zero extra config needed.  
Next.js 14 auto-detects the `src/app/` directory.

## Key Type Rules

| File | Rule |
|------|------|
| `src/lib/mockData.ts` | `store: string` required (not optional) |
| `src/lib/csvProcessor.ts` | Server Component only — never import in `"use client"` files |
| `tsconfig.json` | `@/*` resolves to `./src/*` |
| `tailwind.config.ts` | Scans `./src/**` for class names |
