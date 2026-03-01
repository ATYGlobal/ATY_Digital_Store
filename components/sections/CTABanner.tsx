// components/sections/CTABanner.tsx
import Link from "next/link";
import { ShieldCheck, ArrowRight, Mail } from "lucide-react";

export default function CTABanner() {
  return (
    <section
      className="relative bg-indigo-600 overflow-hidden py-16"
      aria-labelledby="cta-heading"
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-violet-500/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold mb-6">
          <ShieldCheck size={12} />
          Independent. Transparent. Ad-Free.
        </div>

        <h2 id="cta-heading" className="text-3xl sm:text-5xl font-black tracking-tight mb-4 max-w-3xl mx-auto leading-tight">
          Get the Best Tech Deals
          <br />
          Straight to Your Inbox.
        </h2>

        <p className="text-indigo-200 text-base sm:text-lg mb-8 max-w-xl mx-auto">
          Weekly digest of editor-tested picks, exclusive deals, and first-look reviews.
          Zero spam. Unsubscribe anytime.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full sm:flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 text-sm focus:outline-none focus:border-white focus:bg-white/20 transition-all"
            aria-label="Email address for newsletter"
          />
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-5 py-3 rounded-xl text-sm hover:bg-indigo-50 transition-colors whitespace-nowrap"
          >
            <Mail size={15} />
            Subscribe Free
          </Link>
        </div>

        <p className="text-indigo-300 text-xs mt-4">
          Join 12,000+ subscribers · No spam · Unsubscribe anytime
        </p>
      </div>
    </section>
  );
}
