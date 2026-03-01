// lib/mockData.ts
// ─────────────────────────────────────────────────────────────────────────────
// ATY Digital Store — Central mock data layer.
// Replace with a CMS (Contentful / Sanity) or database queries in production.
// ─────────────────────────────────────────────────────────────────────────────

// ════════════════════════════════════════════════════════════════════════════
// TYPES
// ════════════════════════════════════════════════════════════════════════════

export interface Product {
  id: string;
  slug?: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  affiliateUrl: string;
  /** Retailer name shown on CTAs, e.g. "Amazon" */
  store: string;
  badge?: string;
  badgeColor?: "indigo" | "emerald" | "amber";
  inStock: boolean;
  commissionPct?: number;
  featured?: boolean;
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  twitter?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  headline?: string;
  excerpt: string;
  /** Full article HTML rendered with dangerouslySetInnerHTML */
  contentHtml: string;
  author: Author;
  publishedAt: string;   // ISO date "2026-02-28"
  updatedAt?: string;
  readTime: number;      // minutes
  /** Array of category strings — rendered as pills in the article header */
  categories: string[];
  tags: string[];
  coverImage: string;
  metaTitle?: string;
  metaDescription?: string;
  featured?: boolean;
  /** Renders <ComparisonTable /> inline in the article body */
  hasComparisonTable?: boolean;
  /** Renders <AffiliateButton /> cards at the bottom of the article */
  featuredProducts?: Product[];
}

export interface Video {
  id: string;
  title: string;
  youtubeId?: string;
  thumbnail: string;
  category?: string;
  duration: string;
  views: string;
  publishedAt?: string;
  url?: string;
}

// NavSubcategory — used by Navbar mega-menu
export interface NavSubcategory {
  label: string;
  /** Category slug used for the group heading */
  slug: string;
  /** Individual link items inside the group */
  items: string[];
}

// NavItem — consumed by components/navigation/Navbar.tsx
export interface NavItem {
  label: string;
  slug: string;
  subcategories: NavSubcategory[];
}

export interface BlogCategory {
  label: string;
  slug: string;
  count: number;
  icon: string;
}

// ════════════════════════════════════════════════════════════════════════════
// NAVIGATION  (shape must match Navbar.tsx exactly)
// ════════════════════════════════════════════════════════════════════════════

export const navigation: NavItem[] = [
  {
    label: "Apple Hub",
    slug: "apple",
    subcategories: [
      { label: "iPhone",   slug: "iphone",  items: ["Cases & Covers", "MagSafe Chargers", "Screen Protectors", "Cables"] },
      { label: "Audio",    slug: "audio",   items: ["AirPods Pro", "AirPods Max", "Beats Headphones"] },
      { label: "Watch",    slug: "watch",   items: ["Apple Watch Ultra 2", "Watch Bands", "Watch Chargers"] },
    ],
  },
  {
    label: "Android Hub",
    slug: "android",
    subcategories: [
      { label: "Samsung",  slug: "samsung", items: ["Galaxy S24 Cases", "Galaxy Buds", "Galaxy Watch"] },
      { label: "Google",   slug: "google",  items: ["Pixel 8 Cases", "Pixel Buds", "Pixel Watch"] },
      { label: "Other",    slug: "other",   items: ["OnePlus", "Xiaomi", "Nothing Phone"] },
    ],
  },
  {
    label: "PC & Desk",
    slug: "pc",
    subcategories: [
      { label: "Displays", slug: "monitors",  items: ["4K Monitors", "Gaming Monitors", "Ultrawide"] },
      { label: "Input",    slug: "input",     items: ["Mechanical Keyboards", "Wireless Mice", "Trackpads"] },
      { label: "Setup",    slug: "setup",     items: ["Desk Lamps", "Monitor Arms", "Cable Management"] },
    ],
  },
  {
    label: "Digital Hub",
    slug: "digital",
    subcategories: [
      { label: "Hosting",  slug: "hosting",  items: ["Vercel", "Netlify", "Hostinger", "Cloudflare"] },
      { label: "Security", slug: "security", items: ["NordVPN", "ExpressVPN", "1Password"] },
      { label: "Tools",    slug: "tools",    items: ["SaaS Deals", "Domain Registrars", "CDN Services"] },
    ],
  },
];

// ════════════════════════════════════════════════════════════════════════════
// AUTHORS
// ════════════════════════════════════════════════════════════════════════════

export const authors: Record<string, Author> = {
  "alex-chen": {
    name:    "Alex Chen",
    role:    "Senior Content Engineer",
    avatar:  "https://i.pravatar.cc/150?img=33",
    bio:     "Former hardware engineer turned tech reviewer with 800+ products tested since 2019. Alex specialises in desk setups, mechanical keyboards, and hosting infrastructure. He believes every millisecond of TTFB is a conversion waiting to happen.",
    twitter: "alexchen_tech",
  },
  "sara-kim": {
    name:    "Sara Kim",
    role:    "Mobile & Wearables Editor",
    avatar:  "https://i.pravatar.cc/150?img=47",
    bio:     "Sara covers the Apple and Android ecosystems full-time. She tests every product for a minimum of 30 days before publishing — because a two-week review misses half the story.",
    twitter: "sarakim_reviews",
  },
  "marco-silva": {
    name:    "Marco Silva",
    role:    "Audio & Peripherals Specialist",
    avatar:  "https://i.pravatar.cc/150?img=52",
    bio:     "Audiophile, mechanical keyboard collector, and measurement nerd based in Berlin. Marco's reviews are known for their depth: every claim is backed by data from his home lab.",
    twitter: "marcosilva_hifi",
  },
};

// ════════════════════════════════════════════════════════════════════════════
// PRODUCTS
// ════════════════════════════════════════════════════════════════════════════

const allProducts: Product[] = [
  {
    id:            "anker-magsafe-3in1",
    slug:          "anker-magsafe-3in1",
    name:          "Anker MagGo 3-in-1 Charging Station",
    brand:         "Anker",
    category:      "Apple",
    subcategory:   "MagSafe",
    description:   "Charge iPhone, AirPods, and Apple Watch simultaneously at MagSafe 15W speeds — with a single cable to the wall.",
    image:         "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80",
    price:         85.99,
    originalPrice: 109.99,
    rating:        4.7,
    reviewCount:   8921,
    affiliateUrl:  "https://www.amazon.com/dp/B09X4XMTBJ?tag=atydigital-20",
    store:         "Amazon",
    badge:         "Best Value",
    badgeColor:    "emerald",
    inStock:       true,
    commissionPct: 3.0,
    featured:      true,
  },
  {
    id:            "keychron-q1-pro",
    slug:          "keychron-q1-pro",
    name:          "Keychron Q1 Pro QMK Wireless Keyboard",
    brand:         "Keychron",
    category:      "PC",
    subcategory:   "Keyboards",
    description:   "Gasket-mounted, hot-swappable, QMK-programmable wireless keyboard in CNC aluminium. The board that converted 10,000 office workers into mechanical keyboard enthusiasts.",
    image:         "https://images.unsplash.com/photo-1615869442320-fd02a129c77c?w=400&q=80",
    price:         199.00,
    rating:        4.9,
    reviewCount:   3102,
    affiliateUrl:  "https://www.amazon.com/dp/B0BKTM8LQF?tag=atydigital-20",
    store:         "Amazon",
    badge:         "Editor's Pick",
    badgeColor:    "indigo",
    inStock:       true,
    commissionPct: 3.5,
    featured:      true,
  },
  {
    id:            "lg-ultragear-27gp850",
    slug:          "lg-ultragear-27gp850",
    name:          "LG UltraGear 27GP850-B 27\" QHD 165Hz",
    brand:         "LG",
    category:      "PC",
    subcategory:   "Monitors",
    description:   "27-inch QHD Nano IPS panel with 165Hz refresh rate and 1ms GtG — the sweet spot between colour accuracy and gaming responsiveness.",
    image:         "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80",
    price:         349.99,
    originalPrice: 399.99,
    rating:        4.8,
    reviewCount:   4521,
    affiliateUrl:  "https://www.amazon.com/dp/B08YD3N7TL?tag=atydigital-20",
    store:         "Amazon",
    badge:         "Top Rated",
    badgeColor:    "amber",
    inStock:       true,
    commissionPct: 3.0,
    featured:      true,
  },
  {
    id:            "logitech-mx-master-3s",
    slug:          "logitech-mx-master-3s",
    name:          "Logitech MX Master 3S Wireless Mouse",
    brand:         "Logitech",
    category:      "PC",
    subcategory:   "Mice",
    description:   "Ultra-fast MagSpeed electromagnetic scrolling with 8,000 DPI Darkfield sensor. Works on every surface including glass — the mouse that spoils you for everything else.",
    image:         "https://images.unsplash.com/photo-1586882829491-b81178aa622e?w=400&q=80",
    price:         99.99,
    rating:        4.9,
    reviewCount:   18750,
    affiliateUrl:  "https://www.amazon.com/dp/B09HM94VDS?tag=atydigital-20",
    store:         "Amazon",
    badge:         "Best in Class",
    badgeColor:    "emerald",
    inStock:       true,
    commissionPct: 3.0,
    featured:      true,
  },
  {
    id:            "apple-airpods-pro-2",
    slug:          "apple-airpods-pro-2",
    name:          "Apple AirPods Pro 2nd Generation",
    brand:         "Apple",
    category:      "Apple",
    subcategory:   "Audio",
    description:   "Active noise cancellation with the H2 chip and Adaptive Transparency. The earbuds that set the standard everyone else chases.",
    image:         "https://images.unsplash.com/photo-1588423771073-b8903fead85b?w=400&q=80",
    price:         199.00,
    rating:        4.8,
    reviewCount:   45200,
    affiliateUrl:  "https://www.amazon.com/dp/B0BDHWDR12?tag=atydigital-20",
    store:         "Amazon",
    badge:         "Most Popular",
    badgeColor:    "indigo",
    inStock:       true,
    commissionPct: 2.5,
    featured:      true,
  },
  {
    id:            "sony-wh1000xm5",
    slug:          "sony-wh1000xm5",
    name:          "Sony WH-1000XM5 Wireless Headphones",
    brand:         "Sony",
    category:      "Audio",
    subcategory:   "Headphones",
    description:   "Industry-leading noise cancellation with Speak-to-Chat auto-pausing and a 30-hour battery. The benchmark every other over-ear headphone is measured against.",
    image:         "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80",
    price:         279.99,
    originalPrice: 349.99,
    rating:        4.8,
    reviewCount:   28500,
    affiliateUrl:  "https://www.amazon.com/dp/B09XS7JWHH?tag=atydigital-20",
    store:         "Amazon",
    badge:         "ANC King",
    badgeColor:    "indigo",
    inStock:       true,
    commissionPct: 3.0,
    featured:      true,
  },
];

// ════════════════════════════════════════════════════════════════════════════
// BLOG POSTS
// ════════════════════════════════════════════════════════════════════════════

const blogPosts: BlogPost[] = [
  {
    slug:        "vercel-vs-netlify-vs-hostinger-2026",
    title:       "The 2026 Hosting Battle: Vercel vs. Netlify vs. Hostinger",
    headline:    "6 Weeks. 18 Tests. One Clear Winner.",
    excerpt:     "We deployed the same Next.js affiliate site on all three platforms and ran real user monitoring for 6 weeks. The results will change how you think about hosting.",
    contentHtml: `
      <h2>Why Hosting Is a Revenue Decision</h2>
      <p>A 100ms improvement in Time to First Byte correlates with a 1% lift in conversion rate. When you're running affiliate traffic, that compounds fast. We ran the same site — same code, same content — on Vercel, Netlify, and Hostinger for six weeks and measured everything that matters to affiliate revenue: TTFB, Core Web Vitals, deployment friction, and conversion deltas via A/B traffic splitting.</p>
      <h2>Vercel — The Performance King</h2>
      <p>Built for Next.js with 100+ Edge PoPs globally, Vercel delivered a consistent 38ms TTFB across US, EU, and APAC regions. Core Web Vitals scores improved 23% within 8 weeks of migration, which correlated directly with a measurable CTR lift in Google Search Console.</p>
      <h2>Netlify — The Workflow Pro</h2>
      <p>Netlify's Deploy Previews are the gold standard for team collaboration. Every pull request gets its own live URL with full functionality — invaluable when you're iterating on landing pages that need editorial sign-off before going live. TTFB averaged 52ms versus Vercel's 38ms, but the DX gap closes that in team productivity terms.</p>
      <h2>Hostinger — The Scale Specialist</h2>
      <p>29 million customers across 178 countries. LiteSpeed + NVMe SSD delivering exceptional WordPress performance at a fraction of managed hosting costs. The hPanel AI tools are genuinely useful. If your affiliate site runs on WordPress, Hostinger is the strongest value proposition in the market at any price.</p>
    `,
    author:          authors["alex-chen"],
    publishedAt:     "2026-02-28",
    readTime:        14,
    categories:      ["Web Hosting", "Digital Tools"],
    tags:            ["Hosting", "Vercel", "Netlify", "Hostinger", "Next.js", "SEO", "2026"],
    coverImage:      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    metaTitle:       "Vercel vs Netlify vs Hostinger 2026 — Full Comparison | ATY Digital Store",
    metaDescription: "In-depth 2026 comparison of Vercel, Netlify, and Hostinger tested in production. Deployment speed, Core Web Vitals, pricing, and affiliate conversion impact.",
    featured:        true,
    hasComparisonTable: true,
    featuredProducts: [allProducts[0]],
  },
  {
    slug:        "best-mechanical-keyboards-2026",
    title:       "Best Mechanical Keyboards in 2026: The Definitive Guide",
    headline:    "We Typed 10 Million Words to Find the Best Boards.",
    excerpt:     "From sub-$100 hot-swap boards to gasket-mount enthusiast builds — we tested 24 keyboards across every price tier. Here's exactly which one belongs on your desk.",
    contentHtml: `
      <h2>Why Your Keyboard Matters More Than You Think</h2>
      <p>The average knowledge worker types approximately 10 million keystrokes a year. Your keyboard is not an accessory — it's a health decision, a productivity decision, and, if you pick right, a joy decision.</p>
      <h2>Budget Tier — Under $100</h2>
      <p>The Keychron K2 Pro dominates this tier. Hot-swap sockets, QMK support, and tri-mode Bluetooth in a sub-$90 package was unthinkable in 2022. The typing experience punches far above its price class.</p>
      <h2>Mid-Range — $100–$200: Our Top Pick</h2>
      <p>The Keychron Q1 Pro is the keyboard that earns a permanent spot on your desk. Gasket-mounted CNC aluminium construction absorbs typing shock beautifully. The volume knob is not a gimmick — after two weeks you'll wonder how you ever lived without it.</p>
      <h2>Enthusiast Tier — $200+</h2>
      <p>At this price, you're paying for typing feel above everything else. The Dygma Raise 2 and ZSA Moonlander enter the conversation for ergonomic split keyboards that can genuinely reduce injury risk for heavy typists. The GMMK Pro barebones is the gateway to the custom keycap rabbit hole.</p>
    `,
    author:          authors["marco-silva"],
    publishedAt:     "2026-02-20",
    readTime:        12,
    categories:      ["PC & Desk", "Keyboards"],
    tags:            ["Keyboards", "Mechanical", "Keychron", "2026", "Best Of"],
    coverImage:      "https://images.unsplash.com/photo-1597466765537-1fbda0f5f38a?w=1200&q=80",
    metaTitle:       "Best Mechanical Keyboards 2026 — Full Guide | ATY Digital Store",
    metaDescription: "Our definitive ranking of the best mechanical keyboards in 2026. 24 boards tested from budget to premium.",
    featured:        true,
    hasComparisonTable: false,
    featuredProducts: [allProducts[1]],
  },
  {
    slug:        "iphone-15-pro-magsafe-ecosystem",
    title:       "Building the Perfect iPhone 15 Pro MagSafe Ecosystem",
    headline:    "Every MagSafe Accessory That's Actually Worth Buying.",
    excerpt:     "We tested 40+ MagSafe accessories over 3 months to find which ones genuinely improve your iPhone experience and which are pure gimmick.",
    contentHtml: `
      <h2>MagSafe Is Now a Real Ecosystem</h2>
      <p>Three years after Apple introduced MagSafe on the iPhone 12, the accessory ecosystem has finally matured. There are hundreds of MagSafe-compatible products now — and most of them are not worth your money. We spent three months testing 40+ accessories to find the ones that actually change how you use your phone.</p>
      <h2>Charging: What Actually Delivers 15W</h2>
      <p>Not all MagSafe chargers deliver the advertised 15W peak. Only Apple's official charger and a handful of Anker MagGo products consistently hit 15W in our testing. Everything else hovers at 12–13W under real-world conditions. The Anker MagGo 3-in-1 is our top pick for nightstand setups.</p>
      <h2>Cases: Leather vs. Synthetic</h2>
      <p>Nomad Modern Leather wins on premium feel and long-term ageing. Peak Design wins on versatility with their integrated case-and-strap ecosystem. Spigen wins on value — the Ultra Hybrid MagFit at $20 delivers surprising drop protection with a MagSafe ring that actually works properly.</p>
    `,
    author:          authors["sara-kim"],
    publishedAt:     "2026-02-14",
    readTime:        10,
    categories:      ["Apple", "Accessories"],
    tags:            ["iPhone", "MagSafe", "Apple", "Accessories", "2026"],
    coverImage:      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=1200&q=80",
    metaTitle:       "Best MagSafe Accessories for iPhone 15 Pro 2026 | ATY Digital Store",
    metaDescription: "The only MagSafe accessories worth buying in 2026. 40+ products tested over 3 months on iPhone 15 Pro.",
    featured:        false,
    hasComparisonTable: false,
    featuredProducts: [allProducts[0]],
  },
];

// ════════════════════════════════════════════════════════════════════════════
// VIDEOS
// ════════════════════════════════════════════════════════════════════════════

const featuredVideos: Video[] = [
  {
    id:          "desk-setup-2026",
    title:       "The Ultimate 2026 Desk Setup — Full Tour",
    youtubeId:   "dQw4w9WgXcQ",
    thumbnail:   "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=640&q=80",
    category:    "Desk Setup",
    duration:    "18:34",
    views:       "284K",
    publishedAt: "2026-02-15",
    url:         "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id:          "keyboard-sound-test",
    title:       "Keychron Q1 Pro vs GMMK Pro — Sound Test & Comparison",
    youtubeId:   "dQw4w9WgXcQ",
    thumbnail:   "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=640&q=80",
    category:    "Keyboards",
    duration:    "12:18",
    views:       "142K",
    publishedAt: "2026-02-08",
    url:         "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id:          "magsafe-wallet-comparison",
    title:       "Best MagSafe Wallets 2026 — Every Option Compared",
    youtubeId:   "dQw4w9WgXcQ",
    thumbnail:   "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=640&q=80",
    category:    "Apple",
    duration:    "09:55",
    views:       "98K",
    publishedAt: "2026-01-30",
    url:         "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

// ════════════════════════════════════════════════════════════════════════════
// BLOG CATEGORIES  (consumed by components/blog/Sidebar.tsx)
// ════════════════════════════════════════════════════════════════════════════

export const blogCategories: BlogCategory[] = [
  { label: "Web Hosting",  slug: "web-hosting",  count: 8,  icon: "🌐" },
  { label: "PC & Desk",    slug: "pc-desk",       count: 14, icon: "🖥️" },
  { label: "Audio",        slug: "audio",         count: 11, icon: "🎧" },
  { label: "Apple",        slug: "apple",         count: 19, icon: "🍎" },
  { label: "Android",      slug: "android",       count: 12, icon: "📱" },
  { label: "Keyboards",    slug: "keyboards",     count: 6,  icon: "⌨️" },
  { label: "Productivity", slug: "productivity",  count: 9,  icon: "⚡" },
  { label: "Desk Setup",   slug: "desk-setup",    count: 7,  icon: "✨" },
];

// ════════════════════════════════════════════════════════════════════════════
// DATA ACCESS FUNCTIONS
// ════════════════════════════════════════════════════════════════════════════

/** Featured products for the homepage grid (all marked featured: true) */
export function getFeaturedProducts(): Product[] {
  return allProducts.filter((p) => p.featured);
}

/** Single product by id */
export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

/** Products filtered by category string (case-insensitive) */
export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

/** All blog posts sorted newest-first */
export function getFeaturedPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/** Single post by slug — returns undefined if not found */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** All post slugs — used in generateStaticParams */
export function getAllPostSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

/** Popular posts for the sidebar, excluding the current post */
export function getPopularPosts(excludeSlug?: string): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== excludeSlug).slice(0, 4);
}

/** Featured videos for the homepage */
export function getFeaturedVideos(): Video[] {
  return featuredVideos;
}
