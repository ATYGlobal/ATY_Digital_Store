// components/ui/AffiliateButton.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Renders a buy-now CTA for a single affiliate product.
// Accepts the shared Product type from lib/mockData so that blog pages can
// pass featuredProducts directly without any type casting.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { ExternalLink, ShieldCheck, TrendingDown } from "lucide-react";
import type { Product } from "@/lib/mockData";

// ─── Props ────────────────────────────────────────────────────────────────────

interface AffiliateButtonProps {
  product: Product;
  /** Whole-number discount % (e.g. 20). Omit to auto-calculate from originalPrice. */
  discount?: number;
  /** "card" = full price card with secondary actions (default). "button" = compact link. */
  variant?: "card" | "button";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AffiliateButton({
  product,
  discount,
  variant = "card",
}: AffiliateButtonProps) {
  const resolvedDiscount =
    discount ??
    (product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : undefined);

  // ── Compact button variant ─────────────────────────────────────────────────
  if (variant === "button") {
    return (
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl transition-colors text-sm"
        aria-label={`View ${product.name} on ${product.store}`}
      >
        View on {product.store}
        <ExternalLink size={14} aria-hidden="true" />
      </a>
    );
  }

  // ── Full card variant ──────────────────────────────────────────────────────
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm not-prose">
      {/* Price block */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-xs text-slate-400 mb-1">Current Price</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-slate-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {resolvedDiscount && resolvedDiscount > 0 && (
          <div className="flex items-center gap-1 bg-red-50 text-red-600 font-bold text-sm px-3 py-1.5 rounded-xl border border-red-100">
            <TrendingDown size={14} aria-hidden="true" />
            Save {resolvedDiscount}%
          </div>
        )}
      </div>

      {/* In-stock badge */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-5">
        <span className="w-2 h-2 bg-emerald-400 rounded-full" aria-hidden="true" />
        <span>In stock on</span>
        <span className="font-semibold text-slate-700">{product.store}</span>
      </div>

      {/* Primary CTA */}
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block w-full bg-slate-900 hover:bg-slate-700 text-white font-bold py-4 rounded-xl text-center transition-colors"
        aria-label={`Buy ${product.name} on ${product.store} (affiliate link)`}
      >
        <span className="flex items-center justify-center gap-2 text-base">
          View on {product.store}
          <ExternalLink size={16} aria-hidden="true" />
        </span>
      </a>

      {/* Secondary actions */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <button className="flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
          Price History
        </button>
        <button className="flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
          Compare
        </button>
      </div>

      {/* Affiliate disclosure */}
      <div className="flex items-center gap-2 mt-4 text-xs text-slate-400">
        <ShieldCheck size={14} className="text-emerald-500" aria-hidden="true" />
        <span>
          Affiliate disclosure: we may earn a commission from qualifying purchases.
        </span>
      </div>
    </div>
  );
}
