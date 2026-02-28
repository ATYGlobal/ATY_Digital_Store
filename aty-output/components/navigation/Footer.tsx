// components/navigation/Footer.tsx
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const footerLinks: Record<string, string[]> = {
  "Apple Hub": ["iPhone Accessories", "MagSafe Gear", "Nomad Cases", "Apple Watch Bands"],
  "Android Hub": ["Samsung Cases", "Google Pixel", "Xiaomi Gear", "Earbuds"],
  "PC & Desk": ["Monitors", "Keyboards", "Desk Lighting", "Ergonomic Mice"],
  "Digital Hub": ["Web Hosting", "VPN Services", "Digital Courses", "SaaS Tools"],
};

const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact"];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-black text-sm">A</span>
              </div>
              <span className="font-bold text-white text-sm tracking-tight">
                aty<span className="text-indigo-400">digital</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Independent tech reviews and curated affiliate picks. Every product tested by the
              ATY Digital editorial team.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>Independent editorial. No sponsored content.</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                {category}
              </p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-slate-500 hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Affiliate Disclosure — required exact text */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl px-5 py-4 mb-6">
            <div className="flex items-start gap-3">
              <ShieldCheck size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed">
                <span className="font-semibold text-slate-300">Affiliate Disclosure:</span> At
                atydigitalstore.com, we are committed to transparency. Some links are affiliate
                links, meaning we may earn a commission at no extra cost to you. This supports our
                independent tech content.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">
              © {currentYear} ATY Digital Store. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link}
                  href={link === "Contact" ? "/contact" : "#"}
                  className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
