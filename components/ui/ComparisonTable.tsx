// components/ui/ComparisonTable.tsx
"use client";

import { CheckCircle2, MinusCircle, XCircle, ShieldCheck } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tier = "best" | "good" | "ok" | "bad" | "info";

interface CellValue {
  value: string;
  tier: Tier;
}

interface TableRow {
  feature: string;
  vercel: CellValue;
  netlify: CellValue;
  hostinger: CellValue;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const tableData: TableRow[] = [
  {
    feature: "Deployment Speed",
    vercel: { value: "< 30s avg", tier: "best" },
    netlify: { value: "~45s avg", tier: "good" },
    hostinger: { value: "~60s avg", tier: "ok" },
  },
  {
    feature: "Ease of Use",
    vercel: { value: "⭐⭐⭐⭐⭐", tier: "best" },
    netlify: { value: "⭐⭐⭐⭐⭐", tier: "best" },
    hostinger: { value: "⭐⭐⭐⭐", tier: "good" },
  },
  {
    feature: "Scalability",
    vercel: { value: "Enterprise-grade", tier: "best" },
    netlify: { value: "Team-scale", tier: "good" },
    hostinger: { value: "Mass-scale", tier: "best" },
  },
  {
    feature: "Free Tier",
    vercel: { value: "Yes — generous", tier: "best" },
    netlify: { value: "Yes — generous", tier: "best" },
    hostinger: { value: "None", tier: "bad" },
  },
  {
    feature: "Global Edge CDN",
    vercel: { value: "100+ PoPs", tier: "best" },
    netlify: { value: "30+ PoPs", tier: "good" },
    hostinger: { value: "Regional", tier: "ok" },
  },
  {
    feature: "Best Use Case",
    vercel: { value: "Next.js / React Apps", tier: "info" },
    netlify: { value: "JAMstack / Teams", tier: "info" },
    hostinger: { value: "WordPress / High Traffic", tier: "info" },
  },
  {
    feature: "Starting Price",
    vercel: { value: "$0 → $20/mo", tier: "good" },
    netlify: { value: "$0 → $19/mo", tier: "best" },
    hostinger: { value: "$2.99/mo", tier: "best" },
  },
  {
    feature: "Analytics Built-in",
    vercel: { value: "Yes (Pro+)", tier: "good" },
    netlify: { value: "Limited", tier: "ok" },
    hostinger: { value: "Yes (hPanel)", tier: "good" },
  },
  {
    feature: "Deploy Previews",
    vercel: { value: "Yes", tier: "best" },
    netlify: { value: "Yes (best-in-class)", tier: "best" },
    hostinger: { value: "No", tier: "bad" },
  },
  {
    feature: "Serverless Functions",
    vercel: { value: "Edge + Node.js", tier: "best" },
    netlify: { value: "Edge + Node.js", tier: "best" },
    hostinger: { value: "Limited", tier: "ok" },
  },
];

// ─── Tier Styling ─────────────────────────────────────────────────────────────

const tierConfig: Record<Tier, { text: string; icon: React.ReactNode | null }> = {
  best: {
    text: "text-emerald-700 font-semibold",
    icon: <CheckCircle2 size={13} className="text-emerald-500 ml-1.5 flex-shrink-0" aria-hidden />,
  },
  good: { text: "text-slate-700 font-medium", icon: null },
  ok: {
    text: "text-amber-600 font-medium",
    icon: <MinusCircle size={13} className="text-amber-400 ml-1.5 flex-shrink-0" aria-hidden />,
  },
  bad: {
    text: "text-red-500 font-medium",
    icon: <XCircle size={13} className="text-red-400 ml-1.5 flex-shrink-0" aria-hidden />,
  },
  info: { text: "text-indigo-700 font-medium italic", icon: null },
};

function TableCell({ cell }: { cell: CellValue }) {
  const config = tierConfig[cell.tier];
  return (
    <div className="flex items-center">
      <span className={`text-sm ${config.text}`}>{cell.value}</span>
      {config.icon}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ComparisonTable() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 overflow-hidden shadow-sm not-prose">
      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table
          className="w-full border-collapse"
          role="table"
          aria-label="Hosting platform comparison"
        >
          <thead>
            <tr className="bg-slate-900 text-white">
              <th
                scope="col"
                className="px-5 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider w-[22%]"
              >
                Feature
              </th>
              {[
                { name: "Vercel", dot: "bg-indigo-500", sublabel: "Performance King" },
                { name: "Netlify", dot: "bg-teal-500", sublabel: "Workflow Pro" },
                { name: "Hostinger", dot: "bg-violet-500", sublabel: "Scale Specialist" },
              ].map(({ name, dot, sublabel }) => (
                <th key={name} scope="col" className="px-5 py-4 text-left w-[26%]">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dot}`} aria-hidden />
                    <span className="text-sm font-bold">{name}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-normal">{sublabel}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr
                key={row.feature}
                className={`border-t border-slate-100 transition-colors hover:bg-indigo-50/40 ${
                  i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                }`}
              >
                <td className="px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  {row.feature}
                </td>
                <td className="px-5 py-3.5"><TableCell cell={row.vercel} /></td>
                <td className="px-5 py-3.5"><TableCell cell={row.netlify} /></td>
                <td className="px-5 py-3.5"><TableCell cell={row.hostinger} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card layout */}
      <div className="sm:hidden divide-y divide-slate-100">
        {tableData.map((row, i) => (
          <div key={row.feature} className={`px-4 py-4 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              {row.feature}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: "Vercel", cell: row.vercel, dot: "bg-indigo-500" },
                { name: "Netlify", cell: row.netlify, dot: "bg-teal-500" },
                { name: "Hostinger", cell: row.hostinger, dot: "bg-violet-500" },
              ].map(({ name, cell, dot }) => (
                <div key={name} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${dot}`} aria-hidden />
                    <span className="text-xs text-slate-500 font-semibold">{name}</span>
                  </div>
                  <TableCell cell={cell} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
        <ShieldCheck size={13} className="text-emerald-500 flex-shrink-0" aria-hidden />
        <p className="text-xs text-slate-400">
          Data accurate as of Q1 2026. Prices may vary — always check provider sites for current plans.
        </p>
      </div>
    </div>
  );
}
