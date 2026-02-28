# ATY Digital Store 🚀
### Premium Tech Affiliate & Viral Trends Platform

**ATY Digital Store** is a high-performance, minimalist affiliate marketing platform built with **Next.js 15**, **Tailwind CSS**, and **TypeScript**. Designed for the modern tech enthusiast, it combines editorial authority with high-conversion e-commerce components.

---

## 🎨 Design Philosophy: "Tech-Minimalism"
The site follows a strict "Apple-meets-Stripe" aesthetic:
* **Typography:** Using `DM Sans` for legibility and `Bebas Neue` for high-energy viral sections.
* **Palette:** Clean white/slate-50 backgrounds with sophisticated indigo and electric purple accents.
* **UX:** Smooth transitions, responsive grids, and high-contrast call-to-actions (CTAs).

## 🛠️ Features
* **Multi-Hub Architecture:** Dedicated sections for Apple Accessories, Android Ecosystems, PC/Desk Setups, and Digital SaaS.
* **Trending Now Hub:** A dedicated viral product tracker with "Viral Score" meters and social-media-ready card layouts.
* **Conversion-Optimized Blog:** Built-in comparison tables, sticky sidebars, and custom affiliate button components.
* **Community Review System:** User-generated content (UGC) capabilities with a built-in administration workflow for editorial approval.
* **Professional Inquiry System:** Segmented contact channels using dedicated iCloud aliases (`support@` for writers, `contact@` for users).
* **Affiliate Transparency:** Legally compliant global disclosures integrated into the footer and product sections.

## 📂 Directory Structure
```text
├── app/
│   ├── layout.tsx            # Global layout with Navbar/Footer
│   ├── page.tsx              # Homepage with Hero & Featured Grids
│   ├── blog/[slug]/          # Dynamic SEO-optimized articles
│   ├── trending/             # Viral product hub
│   ├── contact/              # Professional inquiry forms
│   └── admin/                # Review supervision dashboard
├── components/
│   ├── navigation/           # Navbar, Footer, Mega-menu
│   ├── ui/                   # ProductCard, AffiliateButton, ComparisonTable
│   └── blog/                 # NewsletterBox, AuthorProfile
└── public/                   # Optimized assets and logos
