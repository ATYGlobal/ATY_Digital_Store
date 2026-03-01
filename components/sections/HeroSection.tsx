// components/sections/HeroSection.tsx
"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, Zap } from "lucide-react";

const stats = [
  { value: "800+",  label: "Products Tested" },
  { value: "200+",  label: "Affiliate Partners" },
  { value: "4.9★",  label: "Editorial Rating" },
  { value: "100%",  label: "Independent" },
];

export default function HeroSection() {
  return (
    <section
      className="relative bg-slate-900 text-white overflow-hidden min-h-[88vh] flex items-center"
      aria-label="Hero section"
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-semibold text-slate-300 mb-8">
          <Zap size={12} className="text-indigo-400" />
          The 2026 Tech Buying Guide is Live
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.0] mb-6 max-w-4xl">
          Every{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
            Product
          </span>
          <br />
          Independently Tested.
        </h1>

        <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
          ATY Digital tests hundreds of tech products every year so you don&apos;t have to.
          Curated affiliate picks, honest reviews, zero sponsored content.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-16">
          <Link
            href="/trending"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all hover:scale-[1.02] group text-sm"
          >
            Browse Trending Picks
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm"
          >
            Read Latest Reviews
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl px-4 py-4">
              <p className="text-2xl font-black text-white mb-0.5">{value}</p>
              <p className="text-xs text-slate-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Trust badge */}
        <div className="flex items-center gap-2 mt-8 text-xs text-slate-500">
          <ShieldCheck size={13} className="text-emerald-500" />
          <span>Independent editorial — no paid placements, no sponsored rankings</span>
          <span className="text-slate-700 mx-1">·</span>
          <Star size={11} className="text-amber-400 fill-amber-400" />
          <span>Affiliate links disclose commissions transparently</span>
        </div>
      </div>
    </section>
  );
}
