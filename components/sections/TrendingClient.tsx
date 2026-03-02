"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search, Filter, ExternalLink, Mail, Star,
  Flame, SlidersHorizontal, X, ArrowUpRight,
} from "lucide-react";
import type { AffiliatePartner } from "@/lib/csvProcessor";

interface Props {
  partners:   AffiliatePartner[];
  categories: string[];
}

// ─── Helpers actualizados para mostrar "Direct Link" ──────────────────────────
const JOIN_BADGE: Record<AffiliatePartner["joinType"], { label: string; classes: string }> = {
  join:        { label: "Verified Link", classes: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  search:      { label: "Direct Access", classes: "bg-indigo-50 text-indigo-700 border-indigo-200"    },
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
  const filled = Math.round(((score - 5) / 5) * 5);
  return (
    <div className="flex items-center gap-0.5" aria-label={`Match score: ${score} out of 10`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={11}
          className={i < filled ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}
        />
      ))}
      <span className="ml-1 text-xs font-bold text-slate-500">{score}/10</span>
    </div>
  );
}

function PartnerCard({ partner }: { partner: AffiliatePartner }) {
  const badge   = JOIN_BADGE[partner.joinType];
  const accent  = CATEGORY_ACCENT[partner.categoryGroup] ?? "from-indigo-500 to-violet-600";
  const isPerfect = partner.matchScore === 10;

  return (
    <article className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <Image
          src={partner.imageUrl}
          alt={`${partner.brandName}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-60`} />
        <div className="absolute inset-0 flex items-end p-4">
          <h3 className="text-white font-black text-lg leading-tight drop-shadow-sm line-clamp-1">
            {partner.brandName}
          </h3>
        </div>
        {isPerfect && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-400 text-amber-900 text-xs font-black px-2 py-1 rounded-full shadow">
            <Flame size={11} />
            10/10
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
            {partner.category}
          </span>
          <span className={`text-xs font-bold border px-2.5 py-1 rounded-full ${badge.classes}`}>
            {badge.label}
          </span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-3">
          {partner.description}
        </p>

        <div className="mb-4">
          <ScoreDots score={partner.matchScore} />
        </div>

        <a
          href={`mailto:${partner.contactEmail}`}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors mb-4 truncate"
        >
          <Mail size={11} className="flex-shrink-0" />
          <span className="truncate">{partner.contactEmail}</span>
        </a>

        {/* BOTÓN CORREGIDO: Ahora usa partner.affiliateUrl directamente */}
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
        >
          Visit Platform
          <ArrowUpRight size={13} />
        </a>
      </div>
    </article>
  );
}

export default function TrendingClient({ partners, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query,          setQuery]          = useState("");
  const [sort,           setSort]           = useState<"score" | "az" | "za">("score");

  const filtered = useMemo(() => {
    let result = partners;
    if (activeCategory !== "All") {
      result = result.filter((p) => p.categoryGroup === activeCategory);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.brandName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
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

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brands…"
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 outline-none"
          />
        </div>
        <div className="relative flex-shrink-0">
          <SlidersHorizontal size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="pl-8 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl appearance-none cursor-pointer"
          >
            <option value="score">Sort: Best Match</option>
            <option value="az">Sort: A → Z</option>
            <option value="za">Sort: Z → A</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        <Filter size={13} className="text-slate-400 flex-shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === cat ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
      
      {/* Footer Disclaimer Actualizado */}
      <div className="mt-16 pt-8 border-t border-slate-200">
        <div className="flex items-start gap-2 text-xs text-slate-400 max-w-3xl">
          <ExternalLink size={12} className="flex-shrink-0 mt-0.5 text-emerald-500" />
          <p>
            <strong className="text-slate-600">Affiliate disclosure:</strong>{" "}
            All links lead directly to the official platform partners. ATY Digital may earn commissions from qualifying referrals.{" "}
            <a href="/privacy#affiliate" className="text-indigo-500 hover:underline">Full policy →</a>
          </p>
        </div>
      </div>
    </div>
  );
}