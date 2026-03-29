// lib/csvProcessor.ts
// ─────────────────────────────────────────────────────────────────────────────
// SERVER-ONLY — uses Node.js `fs`. Never import this in a Client Component.
// Reads data/Affiliate.csv and returns a typed, sanitised AffiliatePartner[].
//
// CSV columns (semicolon-delimited):
//   Brand Name | Product Category | Affiliate Program URL |
//   Contact Email / Portal | Match Score
// ─────────────────────────────────────────────────────────────────────────────

import fs   from "fs";
import path from "path";

// ════════════════════════════════════════════════════════════════════════════
// TYPES
// ════════════════════════════════════════════════════════════════════════════

/** How to reach the affiliate programme. */
export type JoinType = "join" | "search" | "unavailable";

/** One row from Affiliate.csv, fully typed and enriched. */
export interface AffiliatePartner {
  /** Stable slug derived from brand name — safe for React keys / URLs. */
  id: string;
  /** Original brand name from CSV, e.g. "Twelve South" */
  brandName: string;
  /** Product category from CSV, e.g. "Apple Accessories" */
  category: string;
  /** Normalised category group for UI filter chips */
  categoryGroup: string;
  /** How to reach the affiliate programme */
  joinType: JoinType;
  /** Best-effort affiliate programme URL (Google search as fallback) */
  affiliateUrl: string;
  /** Contact e-mail from CSV */
  contactEmail: string;
  /** Match score 6–10 */
  matchScore: number;
  /** Curated Unsplash image for the category */
  imageUrl: string;
  /** Short description generated from brand + category */
  description: string;
}

// ════════════════════════════════════════════════════════════════════════════
// LOOKUP TABLES
// ════════════════════════════════════════════════════════════════════════════

/** Map every CSV category → a single UI filter group label */
const CATEGORY_GROUP: Record<string, string> = {
  "Apple Accessories":      "Apple",
  "Desk Setup":             "Desk Setup",
  "Software (SaaS)":        "Software",
  "Developer Tools":        "Dev Tools",
  "Smart Home":             "Smart Home",
  "Ergonomic Furniture":    "Ergonomics",
  "Content Creation":       "Content",
  "AI Productivity":        "AI",
  "AI Content":             "AI",
  "AI Design":              "AI",
  "Travel/Lifestyle":       "Travel",
  "Sustainable Goods":      "Sustainable",
  "Sustainable Accessories":"Sustainable",
  "Sustainable Tools":      "Sustainable",
  "Sustainable Bags":       "Sustainable",
  "Sustainable Carry":      "Sustainable",
  "Sustainable Tech":       "Sustainable",
  "Sustainable Marketplace":"Sustainable",
  "Sustainable Gear":       "Sustainable",
  "High-Fidelity Audio":    "Audio",
  "Niche Audio Gear":       "Audio",
  "Lifestyle Accessories":  "Lifestyle",
  "Financial SaaS":         "Fintech",
};

/** One Unsplash photo per UI filter group */
const CATEGORY_IMAGE: Record<string, string> = {
  "Apple":      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
  "Desk Setup": "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=600&q=80",
  "Software":   "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
  "Dev Tools":  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80",
  "Smart Home": "https://images.unsplash.com/photo-1558002038-1055e2dae1d7?w=600&q=80",
  "Ergonomics": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
  "Content":    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80",
  "AI":         "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
  "Travel":     "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=600&q=80",
  "Sustainable":"https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80",
  "Audio":      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
  "Lifestyle":  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  "Fintech":    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80";

/** Short description templates keyed by UI group */
const DESCRIPTION_TEMPLATE: Record<string, (brand: string) => string> = {
  "Apple":      (b) => `${b} crafts premium accessories engineered specifically for the Apple ecosystem — MagSafe, precision fit, and lasting build quality.`,
  "Desk Setup": (b) => `${b} designs workspace products that combine functionality and aesthetics for the modern knowledge worker's desk.`,
  "Software":   (b) => `${b} delivers SaaS tools that streamline workflows, boost productivity, and integrate deeply with the tools you already use.`,
  "Dev Tools":  (b) => `${b} provides developer-focused infrastructure and tooling trusted by engineering teams at high-growth startups and Fortune 500s.`,
  "Smart Home": (b) => `${b} makes connected home devices that are genuinely useful, reliable, and privacy-conscious — smart tech that stays out of your way.`,
  "Ergonomics": (b) => `${b} builds ergonomic furniture designed around how humans actually work, reducing strain and improving posture over long sessions.`,
  "Content":    (b) => `${b} equips photographers, videographers, and creators with professional gear built for the field and the studio.`,
  "AI":         (b) => `${b} harnesses AI to remove friction from knowledge work — writing, research, summarisation, and creative workflows, automated.`,
  "Travel":     (b) => `${b} builds thoughtfully designed carry gear for people who travel intentionally — lightweight, organised, and built to last.`,
  "Sustainable":(b) => `${b} is a leader in sustainable goods: eco-conscious materials, ethical supply chains, and products designed to reduce waste.`,
  "Audio":      (b) => `${b} is a high-fidelity audio brand trusted by audiophiles and professionals who refuse to compromise on sound quality.`,
  "Lifestyle":  (b) => `${b} creates refined everyday carry accessories — wallets, organisers, and accessories engineered for quiet elegance.`,
  "Fintech":    (b) => `${b} provides financial infrastructure and SaaS tools that help businesses and individuals manage money with more clarity and control.`,
};

// ════════════════════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════════════════════

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseJoinType(raw: string): JoinType {
  const s = raw.trim().toLowerCase();
  if (s === "join here")            return "join";
  if (s === "search google")        return "search";
  return "unavailable"; // catches "[suspicious link removed]" and unknowns
}

function buildAffiliateUrl(brandName: string): string {
  // Real URLs are not in the CSV. We generate the best-effort Google search.
  return `https://www.google.com/search?q=${encodeURIComponent(
    brandName + " affiliate program"
  )}`;
}

// ════════════════════════════════════════════════════════════════════════════
// PARSER
// ════════════════════════════════════════════════════════════════════════════

/** Parse the raw CSV text into an AffiliatePartner array. */
function parseCSV(text: string): AffiliatePartner[] {
  const lines = text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .filter(Boolean);

  if (lines.length < 2) return [];

  // Skip header row (index 0)
  const dataLines = lines.slice(1);

  const partners: AffiliatePartner[] = [];

  for (const line of dataLines) {
    const cols = line.split(";");
    if (cols.length < 5) continue; // skip malformed rows

    const brandName    = cols[0].trim();
    const category     = cols[1].trim();
    const rawUrl       = cols[2].trim();
    const contactEmail = cols[3].trim();
    const rawScore     = cols[4].trim();

    if (!brandName || !category) continue; // skip empty rows

    const matchScore = parseInt(rawScore, 10);
    if (isNaN(matchScore)) continue; // skip if score is not a number

    const joinType      = parseJoinType(rawUrl);
    const categoryGroup = CATEGORY_GROUP[category] ?? "Other";
    const imageUrl      = CATEGORY_IMAGE[categoryGroup] ?? FALLBACK_IMAGE;
    const descFn        = DESCRIPTION_TEMPLATE[categoryGroup];
    const description   = descFn
      ? descFn(brandName)
      : `${brandName} is a trusted brand in the ${category} space with a strong affiliate programme.`;

    partners.push({
      id: slugify(brandName) || `brand-${partners.length}`,
      brandName,
      category,
      categoryGroup,
      joinType,
      affiliateUrl: buildAffiliateUrl(brandName),
      contactEmail,
      matchScore,
      imageUrl,
      description,
    });
  }

  return partners;
}

// ════════════════════════════════════════════════════════════════════════════
// PUBLIC API
// ════════════════════════════════════════════════════════════════════════════

/**
 * Reads `data/Affiliate.csv` from the project root and returns all partners
 * sorted by matchScore descending, then brandName ascending.
 *
 * Call only from Server Components or Route Handlers.
 */
export function getAffiliatePartners(): AffiliatePartner[] {
  const csvPath = path.join(process.cwd(), "data", "Affiliate.csv");

  let raw: string;
  try {
    raw = fs.readFileSync(csvPath, "utf-8");
  } catch {
    console.error(
      `[csvProcessor] Could not read ${csvPath}. ` +
      `Make sure data/Affiliate.csv exists in your project root.`
    );
    return [];
  }

  const partners = parseCSV(raw);

  return partners.sort((a, b) => {
    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
    return a.brandName.localeCompare(b.brandName);
  });
}

/**
 * Returns the unique categoryGroup values present in the CSV,
 * sorted alphabetically — useful for building filter chips.
 */
export function getCategories(partners: AffiliatePartner[]): string[] {
  const set = new Set(partners.map((p) => p.categoryGroup));
  return ["All", ...Array.from(set).sort()];
}
