// components/ui/AffiliateButton.tsx
"use client";

import { ExternalLink, ShieldCheck, TrendingDown } from "lucide-react";

interface Product {
  price: number;
  originalPrice?: number;
  store: string;
  affiliateUrl: string;
}

interface AffiliateButtonProps {
  product: Product;
  /** Whole-number discount percentage (e.g. 20 for 20%). Pass undefined to auto-calculate. */
  discount?: number;
  /** Show full card UI (price + secondary actions) or compact button-only mode */
  variant?: "card" | "button";
}

export default function AffiliateButton({
  product,
  discount,
  variant = "card",
}: AffiliateButtonProps) {
  const resolvedDiscount =
    discount ??
    (product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : undefined);

  if (variant === "button") {
    return (
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl transition-colors text-sm"
      >
        View on {product.store}
        <ExternalLink size={14} />
      </a>
    );
  }

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
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
        {resolvedDiscount && (
          <div className="flex items-center gap-1 bg-red-50 text-red-600 font-bold text-sm px-3 py-1.5 rounded-xl border border-red-100">
            <TrendingDown size={14} />
            Save {resolvedDiscount}%
          </div>
        )}
      </div>

      {/* Stock badge */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-5">
        <span className="w-2 h-2 bg-emerald-400 rounded-full" />
        <span>In stock on</span>
        <span className="font-semibold text-slate-700">{product.store}</span>
      </div>

      {/* Primary CTA */}
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block w-full bg-slate-900 hover:bg-slate-700 text-white font-bold py-4 rounded-xl text-center transition-colors"
      >
        <span className="flex items-center justify-center gap-2 text-base">
          View on {product.store}
          <ExternalLink size={16} />
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

      {/* Trust signal */}
      <div className="flex items-center gap-2 mt-4 text-xs text-slate-400">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span>Affiliate disclosure: we may earn a commission from qualifying purchases.</span>
      </div>
    </div>
  );
}
