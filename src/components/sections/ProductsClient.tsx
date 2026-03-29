"use client";
// src/components/sections/ProductsClient.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client Component — receives Product[] from the Server Component (trending/page.tsx)
// and handles all interactive filtering / search client-side.
//
// Features:
//   · Search by name, brand or description
//   · Category filter chips (derived from the data)
//   · Conditional buy buttons: Amazon / Official Site / AliExpress
//   · Unsplash fallback images with graceful error handling
//   · Fully accessible (keyboard-navigable, aria labels)
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  ShoppingCart,
  Globe,
  Package,
  ExternalLink,
  SlidersHorizontal,
  X,
} from "lucide-react";
import type { Product } from "@/lib/csvProcessor";

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProductsClientProps {
  products:   Product[];
  categories: string[];
}

// ─── Buy button config ────────────────────────────────────────────────────────

interface BuyButton {
  label:  string;
  url:    string;
  icon:   React.ReactNode;
  /** Tailwind classes for the button */
  style:  string;
}

function getBuyButtons(product: Product): BuyButton[] {
  const buttons: BuyButton[] = [];

  if (product.amazonUrl) {
    buttons.push({
      label: "Amazon",
      url:   product.amazonUrl,
      icon:  <ShoppingCart size={13} aria-hidden="true" />,
      style:
        "bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold",
    });
  }

  if (product.officialUrl) {
    buttons.push({
      label: "Official Site",
      url:   product.officialUrl,
      icon:  <Globe size={13} aria-hidden="true" />,
      style:
        "bg-slate-900 hover:bg-slate-700 text-white font-semibold border border-slate-700",
    });
  }

  if (product.aliexpressUrl) {
    buttons.push({
      label: "AliExpress",
      url:   product.aliexpressUrl,
      icon:  <Package size={13} aria-hidden="true" />,
      style:
        "bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200",
    });
  }

  return buttons;
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);
  const buyButtons = getBuyButtons(product);

  const imgSrc = imgError
    ? "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80"
    : product.imagePath.startsWith("http")
    ? product.imagePath
    : "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80";

  return (
    <article
      className="group flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden
                 shadow-sm hover:shadow-md hover:-translate-y-0.5
                 transition-all duration-300"
      aria-label={product.name}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgError(true)}
        />

        {/* Category pill */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center bg-white/90 backdrop-blur-sm border border-slate-100
                           text-slate-600 text-[10px] font-bold uppercase tracking-widest
                           px-2.5 py-1 rounded-full shadow-sm">
            {product.category}
          </span>
        </div>

        {/* No-link badge */}
        {!product.hasPurchaseLink && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center bg-slate-800/80 text-slate-300
                             text-[10px] font-semibold px-2.5 py-1 rounded-full">
              Coming soon
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Brand */}
        <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest mb-1">
          {product.brand}
        </p>

        {/* Name */}
        <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 leading-relaxed mb-5 line-clamp-3 flex-1">
          {product.description}
        </p>

        {/* Buy buttons */}
        {buyButtons.length > 0 ? (
          <div className="flex flex-col gap-2">
            {buyButtons.map((btn) => (
              <a
                key={btn.label}
                href={btn.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                aria-label={`Buy ${product.name} on ${btn.label}`}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2.5
                            rounded-xl text-xs transition-colors ${btn.style}`}
              >
                {btn.icon}
                {btn.label}
                <ExternalLink size={11} className="ml-auto opacity-60" aria-hidden="true" />
              </a>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50
                          border border-slate-100 rounded-xl px-4 py-2.5">
            <Package size={13} aria-hidden="true" />
            No purchase links available yet
          </div>
        )}
      </div>
    </article>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductsClient({ products, categories }: ProductsClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery]                   = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return products.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchQ   = !q || [p.name, p.brand, p.description, p.category]
        .some((f) => f.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
  }, [products, activeCategory, query]);

  return (
    <div>
      {/* Controls bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">

        {/* Search */}
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            aria-label="Search products"
            className="w-full pl-9 pr-9 py-2.5 text-sm text-slate-700 bg-white
                       border border-slate-200 rounded-xl
                       placeholder-slate-400 focus:outline-none focus:border-indigo-400
                       focus:ring-2 focus:ring-indigo-100 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Result count */}
        <p className="text-xs text-slate-400 font-medium whitespace-nowrap">
          <SlidersHorizontal size={12} className="inline mr-1.5 text-slate-300" aria-hidden="true" />
          {filtered.length} of {products.length} products
        </p>
      </div>

      {/* Category chips */}
      <div
        className="flex flex-wrap gap-2 mb-8"
        role="group"
        aria-label="Filter by category"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border
                        transition-all duration-150 focus:outline-none focus-visible:ring-2
                        focus-visible:ring-indigo-400 ${
              activeCategory === cat
                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
            <Search size={20} className="text-slate-400" aria-hidden="true" />
          </div>
          <p className="text-sm font-semibold text-slate-700 mb-1">No products found</p>
          <p className="text-xs text-slate-400 max-w-xs">
            Try adjusting your search or selecting a different category.
          </p>
          <button
            onClick={() => { setQuery(""); setActiveCategory("All"); }}
            className="mt-4 text-xs text-indigo-600 font-semibold hover:text-indigo-500 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Affiliate disclosure */}
      <p className="mt-12 text-center text-[11px] text-slate-400 leading-relaxed">
        Affiliate disclosure: some links may earn ATY Digital a small commission
        at no extra cost to you. We only feature products our editorial team has reviewed.
      </p>
    </div>
  );
}
