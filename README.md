# ATY Digital Store 🚀
### Premium Tech Affiliate & Viral Trends Platform

**ATY Digital Store** is a high-performance, minimalist affiliate marketing platform built with **Next.js 15 (App Router)**, **Tailwind CSS**, and **TypeScript**. Designed for the modern tech enthusiast, it combines editorial authority with high-conversion e-commerce components.

---

## 🎨 Design Philosophy: "Tech-Minimalism"
The site follows a strict "Apple-meets-Stripe" aesthetic:
* **Typography:** Using `DM Sans` for legibility and `Bebas Neue` for high-energy viral sections.
* **Palette:** Clean white/slate-50 backgrounds with sophisticated indigo and electric purple accents.
* **UX:** Smooth transitions, responsive grids, and high-contrast call-to-actions (CTAs).

## 🛠️ Features
* **Multi-Hub Architecture:** Dedicated sections for Apple Accessories, Android Ecosystems, PC/Desk Setups, and Digital SaaS.
* **Trending Now Hub:** A dedicated viral product tracker with "Viral Score" meters and social-media-ready card layouts.
* **Conversion-Optimized Blog:** Built-in comparison tables, sticky sidebars, and custom affiliate button components using `generateStaticParams`.
* **Community Review System:** User-generated content (UGC) capabilities with a built-in administration workflow for editorial approval (`app/admin/reviews`).
* **Professional Inquiry System:** Segmented contact channels using dedicated iCloud aliases (`support@` for writers, `contact@` for users).
* **Affiliate Transparency:** Legally compliant global disclosures integrated into the footer and product sections.

## 📂 Directory Structure

```text
app/
  layout.tsx            # DM Sans via next/font, wraps Navbar + Footer
  globals.css           # All fonts, tokens, animations in one place
  page.tsx              # Homepage
  blog/[slug]/page.tsx  # Dynamic blog posts with generateStaticParams
  trending/page.tsx     # Trending hub (thin server wrapper)
  contact/page.tsx      # Contact page (thin server wrapper)
  admin/reviews/page.tsx # Review supervision dashboard

components/
  navigation/
    Navbar.tsx          # Mega-menu, mobile drawer, scroll-aware
    Footer.tsx          # Link grid + required Affiliate Disclosure text
  ui/
    ProductCard.tsx     # With built-in StarRating, typed Product interface
    AffiliateButton.tsx # "card" (full price UI) or "button" (compact) variant
    ComparisonTable.tsx # Desktop table + mobile card layout, fully typed
    ProductReviews.tsx  # Submission form and display component
  blog/
    NewsletterBox.tsx   # Dark animated newsletter widget

tailwind.config.ts      # Bebas Neue + DM Sans + DM Serif Display, brand tokens
