// components/sections/TrendingClient.tsx
// ─────────────────────────────────────────────────────────────────────────────
// "use client" — handles search, category filtering, and sort.
// Receives pre-loaded data from the Server Component (app/trending/page.tsx).
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search, Filter, ExternalLink, Mail, Star,
  Flame, SlidersHorizontal, X, ArrowUpRight,
} from "lucide-react";
import type { AffiliatePartner } from "@/lib/csvProcessor";

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  partners:   AffiliatePartner[];
  categories: string[];          // ["All", "AI", "Apple", ...]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const JOIN_BADGE: Record<AffiliatePartner["joinType"], { label: string; classes: string }> = {
  join:        { label: "Join Here",     classes: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  search:      { label: "Search Google", classes: "bg-sky-50 text-sky-700 border-sky-200"             },
  unavailable: { label: "Contact Only",  classes: "bg-slate-100 text-slate-500 border-slate-200"      },
};

const CATEGORY_ACCENT: Record<string, string> = {
  "AI":         "from-violet-500 to-indigo-600",
  "Apple":      "from-slate-700 to-slate-900",
  "Desk Setup": "from-amber-500 to-orange-600",
  "Dev Tools":  "from-indigo-500 to-blue-600",
  "Smart Home": "from-teal-500 to-cyan-600",
  "Ergonomics": "from-rose-500 to-pink-600",
  "Content":    "from-orange-500 to-red-600",
  "Travel":     "from-sky-500 to-blue-600",
  "Sustainable":"from-emerald-500 to-green-600",
  "Audio":      "from-purple-500 to-violet-600",
  "Lifestyle":  "from-amber-500 to-yellow-600",
  "Fintech":    "from-green-600 to-emerald-700",
  "Software":   "from-blue-500 to-indigo-600",
};

function ScoreDots({ score }: { score: number }) {
  // Normalise 6–10 range to 1–5 dots
  const filled = Math.round(((score - 5) / 5) * 5);
  return (
    <div className="flex items-center gap-0.5" aria-label={`Match score: ${score} out of 10`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={11}
          aria-hidden="true"
          className={
            i < filled
              ? "text-amber-400 fill-amber-400"
              : "text-slate-200 fill-slate-200"
          }
        />
      ))}
      <span className="ml-1 text-xs font-bold text-slate-500">{score}/10</span>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function PartnerCard({ partner }: { partner: AffiliatePartner }) {
  const badge   = JOIN_BADGE[partner.joinType];
  const accent  = CATEGORY_ACCENT[partner.categoryGroup] ?? "from-indigo-500 to-violet-600";
  const isPerfect = partner.matchScore === 10;

  return (
    <article className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Image block */}
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <Image
          src={partner.imageUrl}
          alt={`${partner.brandName} — ${partner.category}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-60`}
          aria-hidden="true"
        />

        {/* Brand name on image */}
        <div className="absolute inset-0 flex items-end p-4">
          <h3 className="text-white font-black text-lg leading-tight drop-shadow-sm line-clamp-1">
            {partner.brandName}
          </h3>
        </div>

        {/* Perfect score crown */}
        {isPerfect && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1 bg-amber-400 text-amber-900 text-xs font-black px-2 py-1 rounded-full shadow"
            aria-label="Perfect match score"
          >
            <Flame size={11} aria-hidden="true" />
            10/10
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category + join type row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
            {partner.category}
          </span>
          <span className={`text-xs font-bold border px-2.5 py-1 rounded-full ${badge.classes}`}>
            {badge.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-3">
          {partner.description}
        </p>

        {/* Score */}
        <div className="mb-4">
          <ScoreDots score={partner.matchScore} />
        </div>

        {/* Contact email */}
        <a
          href={`mailto:${partner.contactEmail}`}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors mb-4 truncate"
          aria-label={`Email ${partner.brandName}: ${partner.contactEmail}`}
        >
          <Mail size={11} className="flex-shrink-0" aria-hidden="true" />
          <span className="truncate">{partner.contactEmail}</span>
        </a>

        {/* CTA */}
        <a
          href={partner.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            w-full flex items-center justify-center gap-2
            bg-gradient-to-r ${accent}
            text-white text-xs font-bold
            py-2.5 rounded-xl
            transition-opacity hover:opacity-90
          `}
          aria-label={`View ${partner.brandName} affiliate programme (opens in new tab)`}
        >
          View Programme
          <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

type SortKey = "score" | "az" | "za";

export default function TrendingClient({ partners, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query,          setQuery]          = useState("");
  const [sort,           setSort]           = useState<SortKey>("score");

  const filtered = useMemo(() => {
    let result = partners;

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter((p) => p.categoryGroup === activeCategory);
    }

    // Search filter (brand name or category)
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.brandName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.categoryGroup.toLowerCase().includes(q)
      );
    }

    // Sort
    const copy = [...result];
    if (sort === "score") {
      copy.sort((a, b) => b.matchScore - a.matchScore || a.brandName.localeCompare(b.brandName));
    } else if (sort === "az") {
      copy.sort((a, b) => a.brandName.localeCompare(b.brandName));
    } else {
      copy.sort((a, b) => b.brandName.localeCompare(a.brandName));
    }

    return copy;
  }, [partners, activeCategory, query, sort]);

  const hasFilters = activeCategory !== "All" || query.trim() !== "";

  function clearAll() {
    setActiveCategory("All");
    setQuery("");
  }

  return (
    <div>
      {/* ── Toolbar ───────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brands or categories…"
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
            aria-label="Search affiliate brands"
          />
        </div>

        {/* Sort */}
        <div className="relative flex-shrink-0">
          <SlidersHorizontal
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            aria-hidden="true"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="pl-8 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 appearance-none cursor-pointer transition-all"
            aria-label="Sort order"
          >
            <option value="score">Sort: Best Match</option>
            <option value="az">Sort: A → Z</option>
            <option value="za">Sort: Z → A</option>
          </select>
        </div>
      </div>

      {/* ── Category filter chips ──────────────────────────────────────── */}
      <div
        className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide"
        role="tablist"
        aria-label="Filter by category"
      >
        <Filter size={13} className="text-slate-400 flex-shrink-0" aria-hidden="true" />
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all
              ${activeCategory === cat
                ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }
            `}
          >
            {cat === "All" && (
              <Flame size={11} className="inline mr-1" aria-hidden="true" />
            )}
            {cat}
          </button>
        ))}
      </div>

      {/* ── Results bar ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs text-slate-400">
          Showing{" "}
          <strong className="text-slate-700">{filtered.length}</strong>
          {" "}of{" "}
          <strong className="text-slate-700">{partners.length}</strong>
          {" "}programmes
          {activeCategory !== "All" && (
            <> in <strong className="text-indigo-600">{activeCategory}</strong></>
          )}
        </p>

        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors"
            aria-label="Clear all filters"
          >
            <X size={12} aria-hidden="true" />
            Clear filters
          </button>
        )}
      </div>

      {/* ── Grid ──────────────────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-slate-400">
          <Flame size={36} className="mx-auto mb-4 opacity-20" aria-hidden="true" />
          <p className="font-bold text-slate-600 mb-1">No programmes found</p>
          <p className="text-sm">
            Try a different category or{" "}
            <button
              onClick={clearAll}
              className="text-indigo-600 underline underline-offset-2 font-medium"
            >
              clear all filters
            </button>
          </p>
        </div>
      )}

      {/* ── Affiliate disclosure ──────────────────────────────────────── */}
      <div className="mt-16 pt-8 border-t border-slate-200">
        <div className="flex items-start gap-2 text-xs text-slate-400 max-w-3xl">
          <ExternalLink size={12} className="flex-shrink-0 mt-0.5 text-emerald-500" aria-hidden="true" />
          <p>
            <strong className="text-slate-600">Affiliate disclosure:</strong>{" "}
            Programme links lead to Google search results for the brand's affiliate page.
            Contact emails are sourced from publicly available affiliate directories.
            ATY Digital may earn commissions from qualifying referrals.{" "}
            <a href="/privacy#affiliate" className="text-indigo-500 hover:underline">
              Full policy →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
