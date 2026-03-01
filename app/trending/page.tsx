// app/trending/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Server Component — reads Affiliate.csv at build / request time and passes
// typed data to TrendingClient for all interactive filtering.
// CSV is expected at: data/Affiliate.csv  (included in this repo)
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { getAffiliatePartners, getCategories } from "@/lib/csvProcessor";
import TrendingClient from "@/components/sections/TrendingClient";

// ── SEO ───────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Trending Affiliate Programmes | ATY Digital Store",
  description:
    "200 curated affiliate partnerships across Apple accessories, dev tools, AI, ergonomics, sustainable goods, and more — sorted by editorial match score.",
  alternates: { canonical: "https://atydigitalstore.com/trending" },
  openGraph: {
    title: "Trending Affiliate Programmes",
    description:
      "Browse 200 hand-scored affiliate programmes across 13 categories. Filter, search, and connect with the best partners in tech.",
    type: "website",
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TrendingPage() {
  // getAffiliatePartners() reads the file system — only safe in a Server Component.
  const partners   = getAffiliatePartners();
  const categories = getCategories(partners);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-10">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" aria-hidden="true" />
            Live Directory
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
                Trending{" "}
                <span className="text-indigo-600">Affiliate Picks</span>
              </h1>
              <p className="mt-3 text-slate-500 max-w-xl leading-relaxed">
                {partners.length} curated programmes across{" "}
                {categories.length - 1} categories &mdash; each scored by our editorial
                team on brand fit, commission quality, and audience relevance.
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-5 flex-shrink-0">
              {[
                { value: partners.length,                                       label: "Brands" },
                { value: categories.length - 1,                                 label: "Categories" },
                { value: partners.filter((p) => p.matchScore === 10).length,    label: "Top Picks" },
              ].map(({ value, label }) => (
                <div key={label} className="text-right">
                  <p className="text-2xl font-black text-slate-900">{value}</p>
                  <p className="text-xs text-slate-400 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Interactive grid — all state handled in TrendingClient */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <TrendingClient partners={partners} categories={categories} />
      </main>
    </div>
  );
}
