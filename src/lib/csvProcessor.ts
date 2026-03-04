// lib/csvProcessor.ts
// ─────────────────────────────────────────────────────────────────────────────
// SERVER-ONLY — uses Node.js `fs`. Never import this in a Client Component.
//
// Exports:
//   getAffiliatePartners()  → reads data/Affiliate.csv  (brand directory)
//   getProducts()           → reads data/products.csv   (individual products)
//   getCategories()         → filter chips for AffiliatePartner[]
//   getProductCategories()  → filter chips for Product[]
// ─────────────────────────────────────────────────────────────────────────────

import fs   from "fs";
import path from "path";

// ═══════════════════════════════════════════════════════════════════
// TYPES — Affiliate brands
// ═══════════════════════════════════════════════════════════════════

export type JoinType = "join" | "search" | "unavailable";

export interface AffiliatePartner {
  id:            string;
  brandName:     string;
  category:      string;
  categoryGroup: string;
  joinType:      JoinType;
  affiliateUrl:  string;
  contactEmail:  string;
  matchScore:    number;
  imageUrl:      string;
  description:   string;
}

// ═══════════════════════════════════════════════════════════════════
// TYPES — Individual products  (data/products.csv)
// ═══════════════════════════════════════════════════════════════════

/**
 * One row from products.csv.
 * Columns: Product Name | Category | Brand Name | Amazon URL |
 *          Official Site URL | AliExpress URL | Description | Image Path
 * "No Disponible" values are normalised to null.
 */
export interface Product {
  /** Stable URL-safe slug derived from the product name. */
  id:              string;
  name:            string;
  category:        string;
  brand:           string;
  /** Amazon affiliate URL — null when not available. */
  amazonUrl:       string | null;
  /** Brand official product page — null when not available. */
  officialUrl:     string | null;
  /** AliExpress listing URL — null when not available. */
  aliexpressUrl:   string | null;
  description:     string;
  /** Resolved image: local path from CSV, or Unsplash fallback. */
  imagePath:       string;
  /** True when at least one purchase URL exists. */
  hasPurchaseLink: boolean;
}

// ═══════════════════════════════════════════════════════════════════
// LOOKUP TABLES — Affiliate brands
// ═══════════════════════════════════════════════════════════════════

const CATEGORY_GROUP: Record<string, string> = {
  "Apple Accessories":       "Apple",
  "Desk Setup":              "Desk Setup",
  "Software (SaaS)":         "Software",
  "Developer Tools":         "Dev Tools",
  "Smart Home":              "Smart Home",
  "Ergonomic Furniture":     "Ergonomics",
  "Content Creation":        "Content",
  "AI Productivity":         "AI",
  "AI Content":              "AI",
  "AI Design":               "AI",
  "Travel/Lifestyle":        "Travel",
  "Sustainable Goods":       "Sustainable",
  "Sustainable Accessories": "Sustainable",
  "Sustainable Tools":       "Sustainable",
  "Sustainable Bags":        "Sustainable",
  "Sustainable Carry":       "Sustainable",
  "Sustainable Tech":        "Sustainable",
  "Sustainable Marketplace": "Sustainable",
  "Sustainable Gear":        "Sustainable",
  "High-Fidelity Audio":     "Audio",
  "Niche Audio Gear":        "Audio",
  "Lifestyle Accessories":   "Lifestyle",
  "Financial SaaS":          "Fintech",
};

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

const DESCRIPTION_TEMPLATE: Record<string, (brand: string) => string> = {
  "Apple":      (b) => `${b} crafts premium accessories engineered for the Apple ecosystem.`,
  "Desk Setup": (b) => `${b} designs workspace products that combine functionality and aesthetics.`,
  "Software":   (b) => `${b} delivers SaaS tools that streamline workflows and boost productivity.`,
  "Dev Tools":  (b) => `${b} provides developer-focused tooling trusted by engineering teams worldwide.`,
  "Smart Home": (b) => `${b} makes connected home devices that are useful, reliable, and privacy-conscious.`,
  "Ergonomics": (b) => `${b} builds ergonomic furniture designed to reduce strain over long work sessions.`,
  "Content":    (b) => `${b} equips creators with professional gear built for the field and studio.`,
  "AI":         (b) => `${b} harnesses AI to remove friction from writing, research, and creative workflows.`,
  "Travel":     (b) => `${b} builds thoughtfully designed carry gear for intentional travellers.`,
  "Sustainable":(b) => `${b} leads in sustainable goods: eco-conscious materials and ethical supply chains.`,
  "Audio":      (b) => `${b} is a high-fidelity audio brand trusted by audiophiles and professionals.`,
  "Lifestyle":  (b) => `${b} creates refined everyday carry accessories engineered for quiet elegance.`,
  "Fintech":    (b) => `${b} provides financial SaaS tools that help businesses manage money with clarity.`,
};

// ═══════════════════════════════════════════════════════════════════
// LOOKUP TABLES — Products
// ═══════════════════════════════════════════════════════════════════

const PRODUCT_CATEGORY_IMAGE: Record<string, string> = {
  "Keyboards":           "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=600&q=80",
  "Keyboard Accessories":"https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=600&q=80",
  "Desk Accessories":    "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=600&q=80",
  "Desk Organization":   "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=600&q=80",
  "Desk Risers":         "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=600&q=80",
  "Home Office":         "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
  "Laptop Accessories":  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80",
  "Laptop Bags":         "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=600&q=80",
  "Laptop Stands":       "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80",
  "Monitor Arms":        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80",
  "Phone Accessories":   "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
  "Phone Cases":         "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
  "Phone Chargers":      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
  "Phone Stands":        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
  "Chargers":            "https://images.unsplash.com/photo-1588423771073-b8903fead85b?w=600&q=80",
  "Charging Stations":   "https://images.unsplash.com/photo-1588423771073-b8903fead85b?w=600&q=80",
  "Docks & Hubs":        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  "Audio":               "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
  "Audio Accessories":   "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
  "Lighting":            "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&q=80",
  "Storage":             "https://images.unsplash.com/photo-1531492744076-161ca9bcad58?w=600&q=80",
  "Wallets":             "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  "Everyday Carry":      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  "Travel Accessories":  "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=600&q=80",
  "Gadgets":             "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=600&q=80",
  "Tools":               "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  "Productivity Tools":  "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=600&q=80",
};

// ═══════════════════════════════════════════════════════════════════
// SHARED HELPERS
// ═══════════════════════════════════════════════════════════════════

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Returns null for blank / "No Disponible" values. */
function normaliseUrl(raw: string): string | null {
  const s = raw.trim();
  if (!s || s.toLowerCase() === "no disponible") return null;
  return s;
}

// ═══════════════════════════════════════════════════════════════════
// HELPERS — Affiliate brands
// ═══════════════════════════════════════════════════════════════════

function parseJoinType(raw: string): JoinType {
  const s = raw.trim().toLowerCase();
  if (s === "join here")     return "join";
  if (s === "search google") return "search";
  return "unavailable";
}

function buildAffiliateUrl(brandName: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(
    brandName + " affiliate program"
  )}`;
}

// ═══════════════════════════════════════════════════════════════════
// PARSER — Affiliate.csv
// ═══════════════════════════════════════════════════════════════════

function parseAffiliateCSV(text: string): AffiliatePartner[] {
  const lines = text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .filter(Boolean);

  if (lines.length < 2) return [];

  const partners: AffiliatePartner[] = [];

  for (const line of lines.slice(1)) {
    const cols = line.split(";");
    if (cols.length < 5) continue;

    const brandName    = cols[0].trim();
    const category     = cols[1].trim();
    const rawUrl       = cols[2].trim();
    const contactEmail = cols[3].trim();
    const rawScore     = cols[4].trim();

    if (!brandName || !category) continue;

    const matchScore = parseInt(rawScore, 10);
    if (isNaN(matchScore)) continue;

    const joinType      = parseJoinType(rawUrl);
    const categoryGroup = CATEGORY_GROUP[category] ?? "Other";
    const imageUrl      = CATEGORY_IMAGE[categoryGroup] ?? FALLBACK_IMAGE;
    const descFn        = DESCRIPTION_TEMPLATE[categoryGroup];
    const description   = descFn
      ? descFn(brandName)
      : `${brandName} is a trusted brand in the ${category} space.`;

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

// ═══════════════════════════════════════════════════════════════════
// PARSER — products.csv
// Columns (semicolon-delimited, row 0 is header):
//   0 Product Name | 1 Category | 2 Brand Name | 3 Amazon URL |
//   4 Official Site URL | 5 AliExpress URL | 6 Description | 7 Image Path
// ═══════════════════════════════════════════════════════════════════

function parseProductsCSV(text: string): Product[] {
  const lines = text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .filter(Boolean);

  if (lines.length < 2) return [];

  const products: Product[] = [];

  for (const line of lines.slice(1)) {
    const cols = line.split(";");
    if (cols.length < 8) continue;

    const name        = cols[0].trim();
    const category    = cols[1].trim();
    const brand       = cols[2].trim();
    const amazonUrl   = normaliseUrl(cols[3]);
    const officialUrl = normaliseUrl(cols[4]);
    const aliUrl      = normaliseUrl(cols[5]);
    const description = cols[6].trim();
    const rawImage    = cols[7].trim();

    if (!name || !category || !brand) continue;

    const hasPurchaseLink = Boolean(amazonUrl ?? officialUrl ?? aliUrl);
    const imagePath =
      rawImage && rawImage.toLowerCase() !== "no disponible"
        ? rawImage
        : (PRODUCT_CATEGORY_IMAGE[category] ?? FALLBACK_IMAGE);

    products.push({
      id: slugify(name) || `product-${products.length}`,
      name,
      category,
      brand,
      amazonUrl,
      officialUrl,
      aliexpressUrl: aliUrl,
      description,
      imagePath,
      hasPurchaseLink,
    });
  }

  return products;
}

// ═══════════════════════════════════════════════════════════════════
// PUBLIC API
// ═══════════════════════════════════════════════════════════════════

/**
 * Reads data/Affiliate.csv → sorted by matchScore desc, then brandName asc.
 * Call only from Server Components or Route Handlers.
 */
export function getAffiliatePartners(): AffiliatePartner[] {
  const csvPath = path.join(process.cwd(), "data", "Affiliate.csv");
  let raw: string;
  try {
    raw = fs.readFileSync(csvPath, "utf-8");
  } catch {
    console.error(`[csvProcessor] Cannot read ${csvPath}`);
    return [];
  }
  return parseAffiliateCSV(raw).sort((a, b) => {
    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
    return a.brandName.localeCompare(b.brandName);
  });
}

/**
 * Reads data/products.csv → sorted by category asc, then name asc.
 * Call only from Server Components or Route Handlers.
 */
export function getProducts(): Product[] {
  const csvPath = path.join(process.cwd(), "data", "products.csv");
  let raw: string;
  try {
    raw = fs.readFileSync(csvPath, "utf-8");
  } catch {
    console.error(`[csvProcessor] Cannot read ${csvPath}`);
    return [];
  }
  return parseProductsCSV(raw).sort((a, b) => {
    const catCmp = a.category.localeCompare(b.category);
    return catCmp !== 0 ? catCmp : a.name.localeCompare(b.name);
  });
}

/**
 * Unique categoryGroup values from AffiliatePartner[] with "All" prepended.
 */
export function getCategories(partners: AffiliatePartner[]): string[] {
  const set = new Set(partners.map((p) => p.categoryGroup));
  return ["All", ...Array.from(set).sort()];
}

/**
 * Unique category values from Product[] with "All" prepended.
 * Use this to build filter chips in ProductsClient.
 */
export function getProductCategories(products: Product[]): string[] {
  const set = new Set(products.map((p) => p.category));
  return ["All", ...Array.from(set).sort()];
}
