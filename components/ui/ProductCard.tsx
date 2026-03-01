// components/ui/ProductCard.tsx
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Star } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Product {
  slug: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  store: string;
  affiliateUrl: string;
  badge?: string;
  badgeColor?: "indigo" | "emerald" | "amber";
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const badgeStyles: Record<string, string> = {
  indigo: "bg-indigo-50 text-indigo-700 border border-indigo-100",
  emerald: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  amber: "bg-amber-50 text-amber-700 border border-amber-100",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={12}
          className={
            i < Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-slate-200 fill-slate-200"
          }
        />
      ))}
      <span className="ml-1 text-xs font-medium text-slate-600">{rating.toFixed(1)}</span>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/8 hover:-translate-y-1">
      <Link href={`/product/${product.slug}`}>
        <div className="relative overflow-hidden aspect-[4/3] bg-slate-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {discount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              −{discount}%
            </div>
          )}
          {product.badge && (
            <div
              className={`absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full shadow ${
                badgeStyles[product.badgeColor ?? "indigo"]
              }`}
            >
              {product.badge}
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wide">
            {product.brand}
          </p>
          <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={product.rating} />
            <span className="text-xs text-slate-400">({product.reviewCount.toLocaleString()})</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through ml-2">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              {product.store}
            </div>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="w-full bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 group/btn"
          onClick={(e) => e.stopPropagation()}
        >
          View on {product.store}
          <ExternalLink
            size={13}
            className="group-hover/btn:translate-x-0.5 transition-transform"
          />
        </a>
      </div>
    </div>
  );
}
