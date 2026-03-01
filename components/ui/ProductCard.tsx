// components/ui/ProductCard.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Uses the shared Product type from lib/mockData — single source of truth.
// store is now required (string), matching the mockData interface exactly.
// ─────────────────────────────────────────────────────────────────────────────
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Star, ShieldCheck } from "lucide-react";
import type { Product } from "@/lib/mockData";

// Re-export so any file that previously imported Product from this path
// continues to compile without changes.
export type { Product };

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={12}
          aria-hidden
          className={
            i < Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-slate-200 fill-slate-200"
          }
        />
      ))}
      <span className="ml-1 text-xs font-semibold text-slate-600">{rating.toFixed(1)}</span>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const storeName = product.store ?? "Amazon";
  const productHref = `/product/${product.slug ?? product.id ?? product.name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
      {/* Image block */}
      <Link href={productHref} aria-label={`View details for ${product.name}`}>
        <div className="relative overflow-hidden aspect-[4/3] bg-slate-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Discount badge */}
          {discount && discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              −{discount}%
            </div>
          )}
          {/* Product badge */}
          {product.badge && (
            <div className="absolute top-3 right-3 bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-semibold px-2 py-0.5 rounded-full shadow">
              {product.badge}
            </div>
          )}
          {/* Out of stock */}
          {product.inStock === false && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="bg-white border border-slate-200 text-slate-500 text-xs font-bold px-3 py-1 rounded-full shadow">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{product.brand}</p>
          {product.category && (
            <p className="text-xs text-slate-300 font-medium">{product.category}</p>
          )}
        </div>

        <Link href={productHref}>
          <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-slate-400">({product.reviewCount.toLocaleString()})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-black text-slate-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" aria-hidden />
            {storeName}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          aria-label={`Buy ${product.name} on ${storeName} (affiliate link)`}
          className="w-full bg-slate-900 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 group/btn"
        >
          <ShieldCheck size={13} className="text-emerald-400" aria-hidden />
          View on {storeName}
          <ExternalLink
            size={13}
            className="group-hover/btn:translate-x-0.5 transition-transform"
            aria-hidden
          />
        </a>
      </div>
    </div>
  );
}
