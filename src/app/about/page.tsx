// app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Users,
  Zap,
  Award,
  ExternalLink,
  Twitter,
  Mail,
} from "lucide-react";

// ── SEO ───────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "About Us | ATY Digital Store",
  description:
    "Meet the independent editorial team behind ATY Digital Store. Real reviews, zero sponsored content, and a simple mission: help you buy better tech.",
  alternates: { canonical: "https://atydigitalstore.com/about" },
  openGraph: {
    title: "About ATY Digital Store",
    description:
      "Independent tech reviews with no sponsored content. Meet the team testing every product before recommending it.",
    type: "website",
    url: "https://atydigitalstore.com/about",
  },
};

// ── Data ──────────────────────────────────────────────────────────────────────

const team = [
  {
    name: "Alex Chen",
    role: "Senior Content Engineer & Founder",
    avatar: "https://i.pravatar.cc/150?img=33",
    bio: "Former hardware engineer turned tech reviewer with 800+ products tested since 2019. Alex specialises in desk setups, mechanical keyboards, and hosting infrastructure. He started ATY Digital Store after growing frustrated with review sites that ranked products they had never touched.",
    twitter: "alexchen_tech",
    email: "alex@atydigitalstore.com",
  },
  {
    name: "Sara Kim",
    role: "Mobile & Wearables Editor",
    avatar: "https://i.pravatar.cc/150?img=47",
    bio: "Sara covers the Apple and Android ecosystems full-time. She tests every product for a minimum of 30 days before publishing — because a two-week review misses half the story. Her iPhone 15 Pro long-term test ran for 11 months.",
    twitter: "sarakim_reviews",
    email: "sara@atydigitalstore.com",
  },
  {
    name: "Marco Silva",
    role: "Audio & Peripherals Specialist",
    avatar: "https://i.pravatar.cc/150?img=52",
    bio: "Audiophile, mechanical keyboard collector, and measurement nerd based in Berlin. Marco reviews are known for their depth: every claim is backed by data from his home lab. He has reviewed over 400 peripherals since 2017.",
    twitter: "marcosilva_hifi",
    email: "marco@atydigitalstore.com",
  },
];

const values = [
  {
    icon: ShieldCheck,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    title: "Independent Editorial",
    body: "No brand pays to appear on ATY Digital. Every product in our guides was selected, purchased, and tested by our team. We keep editorial and commercial decisions completely separate.",
  },
  {
    icon: Zap,
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    title: "Real-World Testing",
    body: "We test products the way you actually use them. That means running mechanical keyboards through six-month daily use, benchmarking monitors after the panel has warmed up, and stress-testing cases with actual drops.",
  },
  {
    icon: Users,
    color: "bg-violet-50 text-violet-600 border-violet-100",
    title: "Transparent Affiliates",
    body: "ATY Digital earns commissions through affiliate links. These are clearly marked and never influence our rankings. We have recommended against products from our highest-paying partners when the test results did not hold up.",
  },
  {
    icon: Award,
    color: "bg-amber-50 text-amber-600 border-amber-100",
    title: "Corrections Policy",
    body: "We get things wrong sometimes. When we do, we correct the record publicly at the top of the affected article and note the date of the update. We do not quietly edit mistakes out of published reviews.",
  },
];

const stats = [
  { value: "1,200+", label: "Products tested" },
  { value: "6 yrs",  label: "Publishing since" },
  { value: "30 days", label: "Min. test period" },
  { value: "0",      label: "Sponsored posts" },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-14">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-slate-700 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-600 font-medium" aria-current="page">About</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-6">
            <ShieldCheck size={12} aria-hidden="true" />
            Independent Editorial
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight mb-5">
            We test tech so you
            <br className="hidden sm:block" />
            <span className="text-indigo-600"> don&apos;t buy the wrong thing.</span>
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mb-8">
            ATY Digital Store is an independent tech review publication. We buy the products,
            run the tests, and tell you exactly what we found &mdash; without advertiser pressure,
            without sponsored rankings, and without the vague hedging that makes most tech
            reviews useless.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-center">
                <p className="text-2xl font-black text-slate-900 mb-0.5">{value}</p>
                <p className="text-xs text-slate-400 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">Why we started this</h2>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>
                In 2020, our founder Alex Chen was trying to buy a mechanical keyboard.
                He spent two weeks reading reviews and realised that every top-ranking
                article was either written by someone who had used the board for three days,
                or was quietly funded by the brands being ranked.
              </p>
              <p>
                He built ATY Digital Store to be the site he wished existed: one where
                the methodology is published, the test periods are real, the affiliate
                relationships are disclosed, and the conclusion is honest even when it
                costs a commission.
              </p>
              <p>
                Today, a team of three full-time editors publishes reviews across Apple,
                Android, PC peripherals, desk setups, and digital tools. Every product
                recommendation is backed by a minimum 30-day test period.
              </p>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 mt-7 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              Read our latest reviews
              <ExternalLink size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="relative bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-8 text-white overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-black/10 rounded-full blur-xl pointer-events-none" aria-hidden="true" />
            <div className="relative space-y-5">
              {[
                "Every product tested for 30+ days",
                "Affiliate relationships fully disclosed",
                "Corrections published publicly",
                "No sponsored rankings, ever",
                "Methodology published per category",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <ShieldCheck size={16} className="text-emerald-300 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm font-medium text-white/90 leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white border-y border-slate-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-slate-900 mb-2">Our editorial standards</h2>
          <p className="text-slate-500 text-sm mb-10 max-w-xl">
            These are not aspirational principles &mdash; they are enforced policies that every piece of content on this site is held to.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map(({ icon: Icon, color, title, body }) => (
              <div key={title} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl border ${color} mb-4`}>
                  <Icon size={16} aria-hidden="true" />
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Meet the team</h2>
        <p className="text-slate-500 text-sm mb-10 max-w-xl">
          Three editors, zero freelance content farms. Everything published under our bylines was written by the person who actually did the testing.
        </p>
        <div className="space-y-6">
          {team.map((member) => (
            <article key={member.name} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-5">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-slate-100 self-start">
                <Image src={member.avatar} alt={`${member.name} profile photo`} fill sizes="64px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-black text-slate-900 text-base leading-tight">{member.name}</h3>
                    <p className="text-xs text-indigo-600 font-semibold mt-0.5">{member.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={`https://twitter.com/${member.twitter}`} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on Twitter`} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl transition-all">
                      <Twitter size={12} aria-hidden="true" />
                      @{member.twitter}
                    </a>
                    <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`} className="flex items-center justify-center w-8 h-8 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all">
                      <Mail size={13} aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Disclosure */}
      <section className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6" role="note" aria-label="Affiliate disclosure">
            <div className="flex items-start gap-3">
              <ShieldCheck size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-black text-slate-900 mb-1">Affiliate Disclosure</h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  ATY Digital Store is a participant in the Amazon Services LLC Associates Program and other affiliate programmes. When you click a link marked with a Verified Link badge and make a purchase, we may earn a commission at no extra cost to you. Affiliate relationships never influence our editorial rankings or review conclusions.{" "}
                  <Link href="/privacy#affiliate" className="text-indigo-500 hover:underline font-medium">Full disclosure policy</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-3">Have a question or a tip?</h2>
        <p className="text-slate-500 text-sm mb-7 max-w-md mx-auto">
          We read every message. For press inquiries, product corrections, or partnership proposals, reach out directly.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-7 rounded-xl transition-colors text-sm">
          <Mail size={15} aria-hidden="true" />
          Get in touch
        </Link>
      </section>

    </div>
  );
}
