// src/app/trending/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Server Component — reads BOTH CSVs at build/request time:
//   · data/Affiliate.csv  → brand directory (TrendingClient)
//   · data/products.csv   → individual products (ProductsClient)
//
// Tab switcher lets users navigate between the two views.
// All interactive state (filters, search, tabs) lives in Client Components.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import {
  getAffiliatePartners,
  getCategories,
  getProducts,
  getProductCategories,
} from "@/lib/csvProcessor";
import TrendingClient  from "@/components/sections/TrendingClient";
import ProductsClient  from "@/components/sections/ProductsClient";

// ── SEO ───────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Trending Products & Affiliate Programmes | ATY Digital Store",
  description:
    "Browse curated products and 200+ affiliate partnerships across Apple accessories, " +
    "dev tools, AI, ergonomics, and more — independently tested and editorially scored.",
  alternates: { canonical: "https://atydigitalstore.com/trending" },
  openGraph: {
    title: "Trending | ATY Digital Store",
    description:
      "Individual products and brand affiliate programmes — curated, tested, and scored by the ATY Digital editorial team.",
    type: "website",
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TrendingPage() {
  // Both calls are synchronous fs.readFileSync — safe only in Server Components.
  const partners          = getAffiliatePartners();
  const affiliateCategories = getCategories(partners);

  const products          = getProducts();
  const productCategories = getProductCategories(products);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Page header ─────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-10">

          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100
                          text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full
                          uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"
                  aria-hidden="true" />
            Live Catalogue
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
                Trending{" "}
                <span className="text-indigo-600">Picks</span>
              </h1>
              <p className="mt-3 text-slate-500 max-w-xl leading-relaxed text-sm">
                {products.length} individual products · {partners.length} affiliate
                programmes · curated by the ATY Digital editorial team.
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-6 flex-shrink-0">
              {[
                { value: products.length,                                      label: "Products"   },
                { value: partners.length,                                      label: "Brands"     },
                { value: partners.filter((p) => p.matchScore === 10).length,   label: "Top Picks"  },
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

      {/* ── Tab views ───────────────────────────────────────────────── */}
      {/*
        Both Client Components are rendered server-side and hydrated.
        The tab UI is handled by a simple client-side wrapper below
        so we avoid a full page reload between views.
      */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <TabbedViews
          products={products}
          productCategories={productCategories}
          partners={partners}
          affiliateCategories={affiliateCategories}
        />
      </main>

    </div>
  );
}

// ── TabbedViews — thin client wrapper so tabs work without a full reload ──────
// We keep it in the same file for simplicity; move to its own file if preferred.

import TabbedViewsClient from "@/components/sections/TabbedViewsClient";

// Re-export as a named function so Next.js tree-shakes cleanly
function TabbedViews(props: {
  products:           ReturnType<typeof getProducts>;
  productCategories:  string[];
  partners:           ReturnType<typeof getAffiliatePartners>;
  affiliateCategories: string[];
}) {
  return <TabbedViewsClient {...props} />;
}
