// components/sections/FeaturedProducts.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/lib/mockData";

interface Props {
  products: Product[];
}

export default function FeaturedProducts({ products }: Props) {
  return (
    <section className="bg-slate-50 py-20" aria-labelledby="featured-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
              Curated Picks
            </p>
            <h2 id="featured-heading" className="text-3xl font-black text-slate-900 tracking-tight">
              Editor&apos;s Top Picks
            </h2>
          </div>
          <Link
            href="/trending"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group"
          >
            View All
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/trending"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600"
          >
            View All Products <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
