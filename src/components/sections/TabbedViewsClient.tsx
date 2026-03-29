"use client";
// src/components/sections/TabbedViewsClient.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Thin wrapper that switches between ProductsClient and TrendingClient.
// Keeping tab state client-side avoids a full page reload on tab change.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { ShoppingBag, Handshake } from "lucide-react";
import ProductsClient from "@/components/sections/ProductsClient";
import TrendingClient from "@/components/sections/TrendingClient";
import type { Product, AffiliatePartner } from "@/lib/csvProcessor";

interface Props {
  products:            Product[];
  productCategories:   string[];
  partners:            AffiliatePartner[];
  affiliateCategories: string[];
}

const TABS = [
  { id: "products",   label: "Products",   icon: ShoppingBag  },
  { id: "affiliates", label: "Programmes", icon: Handshake    },
] as const;

type TabId = typeof TABS[number]["id"];

export default function TabbedViewsClient({
  products,
  productCategories,
  partners,
  affiliateCategories,
}: Props) {
  const [active, setActive] = useState<TabId>("products");

  return (
    <div>
      {/* Tab bar */}
      <div
        className="inline-flex bg-white border border-slate-200 rounded-xl p-1 mb-8 shadow-sm"
        role="tablist"
        aria-label="View switcher"
      >
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={active === id}
            aria-controls={`panel-${id}`}
            id={`tab-${id}`}
            onClick={() => setActive(id)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold
                        transition-all duration-150 focus:outline-none focus-visible:ring-2
                        focus-visible:ring-indigo-400 ${
              active === id
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Icon size={15} aria-hidden="true" />
            {label}
            <span
              className={`ml-1 text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                active === id
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {id === "products" ? products.length : partners.length}
            </span>
          </button>
        ))}
      </div>

      {/* Panels */}
      <div
        id="panel-products"
        role="tabpanel"
        aria-labelledby="tab-products"
        hidden={active !== "products"}
      >
        <ProductsClient products={products} categories={productCategories} />
      </div>

      <div
        id="panel-affiliates"
        role="tabpanel"
        aria-labelledby="tab-affiliates"
        hidden={active !== "affiliates"}
      >
        <TrendingClient partners={partners} categories={affiliateCategories} />
      </div>
    </div>
  );
}
