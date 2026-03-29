// components/navigation/Footer.tsx
// ─────────────────────────────────────────────────────────────────────────────
// ATY Digital Store — Site Footer (Legal Compliance Edition)
// • Amazon Associates disclosure (required exact wording)
// • GDPR/FTC affiliate transparency block
// • Full internal navigation with Next.js <Link>
// • Privacy Policy, Terms of Service, Contact quick links
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import { ShieldCheck, Mail, ArrowRight } from "lucide-react";

// ─── Navigation data ─────────────────────────────────────────────────────────

const footerColumns: Record<string, { label: string; href: string }[]> = {
  "Apple Hub": [
    { label: "iPhone Accessories", href: "/category/apple/iphone-accessories" },
    { label: "MagSafe Gear",       href: "/category/apple/magsafe"            },
    { label: "Nomad Cases",        href: "/category/apple/cases"              },
    { label: "Apple Watch Bands",  href: "/category/apple/watch-bands"        },
  ],
  "Android Hub": [
    { label: "Samsung Cases",   href: "/category/android/samsung" },
    { label: "Google Pixel",    href: "/category/android/pixel"   },
    { label: "Xiaomi Gear",     href: "/category/android/xiaomi"  },
    { label: "Earbuds",         href: "/category/android/earbuds" },
  ],
  "PC & Desk": [
    { label: "Monitors",        href: "/category/pc/monitors"     },
    { label: "Keyboards",       href: "/category/pc/keyboards"    },
    { label: "Desk Lighting",   href: "/category/desk/lighting"   },
    { label: "Ergonomic Mice",  href: "/category/pc/mice"         },
  ],
  "Digital Hub": [
    { label: "Web Hosting",     href: "/blog/vercel-vs-netlify-vs-hostinger-2026" },
    { label: "VPN Services",    href: "/category/digital/vpn"                     },
    { label: "Digital Courses", href: "/category/digital/courses"                 },
    { label: "SaaS Tools",      href: "/category/digital/saas"                    },
  ],
};

const legalLinks: { label: string; href: string }[] = [
  { label: "Privacy Policy",   href: "/privacy" },
  { label: "Terms of Service", href: "/terms"   },
  { label: "Cookie Policy",    href: "/privacy#cookies" },
  { label: "Contact",          href: "/contact" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white" aria-label="Site footer">

      {/* Main navigation grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group" aria-label="ATY Digital Store home">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:bg-indigo-50 transition-colors">
                <span className="text-slate-900 font-black text-sm" aria-hidden="true">A</span>
              </div>
              <span className="font-bold text-white text-sm tracking-tight">
                aty<span className="text-indigo-400">digital</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">
              Independent tech reviews and curated affiliate picks. Every product tested by the
              ATY Digital editorial team — no paid placements.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-5">
              <ShieldCheck size={12} className="text-emerald-500 flex-shrink-0" aria-hidden="true" />
              <span>Independent editorial. No sponsored content.</span>
            </div>

            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-colors group"
            >
              <Mail size={13} aria-hidden="true" />
              Join the Newsletter
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          {/* Category link columns */}
          {Object.entries(footerColumns).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                {category}
              </p>
              <ul className="space-y-2.5" role="list">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-slate-500 hover:text-white transition-colors leading-none"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Legal compliance block */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

          {/* Affiliate Disclosure — Required FTC / Amazon Associates wording */}
          <div
            className="bg-slate-800/60 border border-slate-700/60 rounded-2xl px-6 py-5 mb-5"
            role="note"
            aria-label="Affiliate disclosure"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <ShieldCheck size={16} className="text-emerald-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Affiliate Disclosure
                </p>
                <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                  As an Amazon Associate and member of other affiliate programs, ATY Digital earns
                  from qualifying purchases. This supports our independent editorial team at no
                  extra cost to you. We only recommend products we have independently reviewed.
                  Affiliate links are marked with a Verified Link badge throughout the site.
                </p>
                <Link
                  href="/privacy#affiliate"
                  className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 mt-2 transition-colors"
                >
                  Full disclosure policy
                  <ArrowRight size={10} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600 order-2 sm:order-1">
              &copy; {currentYear} ATY Digital Store. All rights reserved.
              <span className="mx-2 text-slate-700" aria-hidden="true">&middot;</span>
              Designed by the ATY Editorial Team.
            </p>

            <nav aria-label="Legal links" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 order-1 sm:order-2">
              {legalLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-xs text-slate-600 hover:text-slate-300 transition-colors whitespace-nowrap"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* FTC manufacturer disclaimer */}
          <p className="text-center text-xs text-slate-700 mt-5 leading-relaxed max-w-2xl mx-auto">
            atydigitalstore.com is not affiliated with, endorsed by, or sponsored by Amazon, Apple,
            Google, or any other manufacturer mentioned on this site unless explicitly stated.
            Product names, logos, and trademarks are the property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
