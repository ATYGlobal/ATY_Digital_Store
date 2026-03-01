// app/privacy/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// ATY Digital Store — Privacy Policy
// GDPR · CCPA · Amazon Associates compliant
// Design: Tech-Minimalist with DM Sans, slate-900, indigo accents
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Cookie,
  Link2,
  UserCheck,
  Mail,
  Globe,
  Lock,
  FileText,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

// ─── SEO ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "ATY Digital Store's Privacy Policy. Learn how we collect, use, and protect your data in compliance with GDPR and CCPA. Includes affiliate tracking and cookie disclosures.",
  openGraph: {
    title: "Privacy Policy | ATY Digital Store",
    description:
      "How ATY Digital collects, uses, and protects your personal data. GDPR & CCPA compliant.",
    type: "website",
  },
  alternates: {
    canonical: "https://atydigitalstore.com/privacy",
  },
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface Section {
  id: string;
  icon: React.ElementType;
  title: string;
  color: string;
  bgColor: string;
}

// ─── Table of Contents config ────────────────────────────────────────────────

const sections: Section[] = [
  { id: "overview",          icon: FileText,    title: "Overview",                        color: "text-indigo-600",  bgColor: "bg-indigo-50"  },
  { id: "data-collection",   icon: Globe,       title: "Data We Collect",                 color: "text-blue-600",    bgColor: "bg-blue-50"    },
  { id: "cookies",           icon: Cookie,      title: "Cookies & Tracking",              color: "text-amber-600",   bgColor: "bg-amber-50"   },
  { id: "affiliate",         icon: Link2,       title: "Affiliate Tracking",              color: "text-violet-600",  bgColor: "bg-violet-50"  },
  { id: "data-use",          icon: ShieldCheck, title: "How We Use Your Data",            color: "text-emerald-600", bgColor: "bg-emerald-50" },
  { id: "data-sharing",      icon: UserCheck,   title: "Data Sharing & Third Parties",    color: "text-rose-600",    bgColor: "bg-rose-50"    },
  { id: "user-rights",       icon: Lock,        title: "Your Rights (GDPR & CCPA)",       color: "text-teal-600",    bgColor: "bg-teal-50"    },
  { id: "data-retention",    icon: AlertCircle, title: "Data Retention",                  color: "text-orange-600",  bgColor: "bg-orange-50"  },
  { id: "contact",           icon: Mail,        title: "Contact & DPO",                   color: "text-slate-600",   bgColor: "bg-slate-100"  },
];

// ─── Helper Components ────────────────────────────────────────────────────────

function SectionAnchor({ id, icon: Icon, title, color, bgColor }: Section) {
  return (
    <div id={id} className="scroll-mt-28 mb-12">
      <div className={`inline-flex items-center gap-2.5 ${bgColor} ${color} text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4`}>
        <Icon size={13} aria-hidden />
        {title}
      </div>
    </div>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-5 py-4 my-5 text-sm text-indigo-900">
      <ShieldCheck size={16} className="text-indigo-500 flex-shrink-0 mt-0.5" aria-hidden />
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 my-5 text-sm text-amber-900">
      <AlertCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" aria-hidden />
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

function DataTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="my-5 rounded-xl overflow-hidden border border-slate-200 text-sm">
      <table className="w-full" aria-label="Data collection table">
        <thead>
          <tr className="bg-slate-900 text-white text-xs">
            <th className="px-5 py-3 text-left font-semibold uppercase tracking-wider w-2/5">Data Type</th>
            <th className="px-5 py-3 text-left font-semibold uppercase tracking-wider">Purpose / Legal Basis</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([type, purpose], i) => (
            <tr key={type} className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
              <td className="px-5 py-3 font-medium text-slate-800">{type}</td>
              <td className="px-5 py-3 text-slate-600 leading-relaxed">{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RightsBadge({ right, description }: { right: string; description: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-3">
      <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
        <Lock size={14} className="text-teal-600" aria-hidden />
      </div>
      <div>
        <p className="font-semibold text-slate-900 text-sm">{right}</p>
        <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{description}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrivacyPolicyPage() {
  const lastUpdated = "February 28, 2026";

  return (
    <>
      {/* ── Hero Header ── */}
      <header className="border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 mb-8">
            <Link href="/" className="hover:text-slate-700 transition-colors">Home</Link>
            <ChevronRight size={12} aria-hidden />
            <span className="text-slate-600" aria-current="page">Privacy Policy</span>
          </nav>

          <div className="flex items-start gap-5">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20">
              <ShieldCheck size={22} className="text-white" aria-hidden />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                Privacy Policy
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span>ATY Digital Store · atydigitalstore.com</span>
                <span className="text-slate-200" aria-hidden>|</span>
                <span>Last updated: <time dateTime="2026-02-28">{lastUpdated}</time></span>
                <span className="text-slate-200" aria-hidden>|</span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <ShieldCheck size={11} aria-hidden /> GDPR · CCPA Compliant
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Content + Sidebar Layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex gap-12 items-start">

          {/* ── Table of Contents Sidebar ── */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-8" aria-label="Page sections">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Sections</p>
            <nav>
              <ul className="space-y-0.5">
                {sections.map(({ id, title, color }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all group`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:${color.replace('text-', 'bg-')} transition-colors flex-shrink-0`} aria-hidden />
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 bg-slate-900 rounded-xl p-4 text-white text-xs leading-relaxed">
              <p className="font-bold mb-1">Questions?</p>
              <p className="text-slate-400 mb-3">Our privacy team responds within 48 hours.</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                <Mail size={11} aria-hidden /> Contact Us
              </Link>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <main className="flex-1 min-w-0 max-w-3xl">
            <article className="prose-legal">

              {/* OVERVIEW */}
              <section aria-labelledby="overview-heading">
                <div id="overview" className="scroll-mt-28 mb-4">
                  <div className="inline-flex items-center gap-2.5 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                    <FileText size={13} aria-hidden />
                    Overview
                  </div>
                </div>
                <h2 id="overview-heading" className="text-xl font-black text-slate-900 mb-4">
                  Our Commitment to Your Privacy
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                  ATY Digital Store (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the website{" "}
                  <strong className="text-slate-900">atydigitalstore.com</strong> (the &ldquo;Site&rdquo;). This Privacy Policy
                  explains what personal data we collect, how we use it, and the choices you have as a visitor
                  or subscriber.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                  This policy applies to all visitors of atydigitalstore.com and is drafted in compliance with:
                </p>
                <ul className="text-sm text-slate-600 space-y-1.5 mb-5 list-none pl-0">
                  {[
                    "The EU General Data Protection Regulation (GDPR) — Regulation (EU) 2016/679",
                    "The California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA)",
                    "The Amazon Associates Program Operating Agreement",
                    "The FTC Endorsement Guides (16 C.F.R. Part 255)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <ShieldCheck size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <InfoBox>
                  <strong>Plain-language summary:</strong> We collect minimal data necessary to operate the site.
                  We use affiliate links to earn commissions — this never changes our editorial independence
                  or the price you pay. You can opt out of non-essential data collection at any time.
                </InfoBox>
              </section>

              <hr className="border-slate-100 my-10" />

              {/* DATA COLLECTION */}
              <section aria-labelledby="data-collection-heading">
                <div id="data-collection" className="scroll-mt-28 mb-4">
                  <div className="inline-flex items-center gap-2.5 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                    <Globe size={13} aria-hidden />
                    Data We Collect
                  </div>
                </div>
                <h2 id="data-collection-heading" className="text-xl font-black text-slate-900 mb-4">
                  What Personal Data We Collect
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                  We collect information in two ways: data you provide directly (e.g., newsletter signup)
                  and data collected automatically (e.g., analytics). We do not sell personal data.
                </p>

                <DataTable rows={[
                  ["Email address",        "Newsletter signup · Consent (GDPR Art. 6(1)(a))"],
                  ["IP address",           "Security & fraud prevention · Legitimate interest (GDPR Art. 6(1)(f))"],
                  ["Browser & device info","Analytics & site performance · Legitimate interest"],
                  ["Pages visited / clicks","Usage analytics to improve content · Legitimate interest"],
                  ["Referring URL",         "Understanding traffic sources · Legitimate interest"],
                  ["Cookie identifiers",    "Session management, preferences · Consent (where required)"],
                ]} />

                <p className="text-slate-600 leading-relaxed text-sm">
                  We do <strong className="text-slate-900">not</strong> collect sensitive personal data
                  (racial origin, health, biometric data, financial account information) and we do not
                  knowingly collect data from children under 16 years of age.
                </p>
              </section>

              <hr className="border-slate-100 my-10" />

              {/* COOKIES */}
              <section aria-labelledby="cookies-heading">
                <div id="cookies" className="scroll-mt-28 mb-4">
                  <div className="inline-flex items-center gap-2.5 bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                    <Cookie size={13} aria-hidden />
                    Cookies & Tracking
                  </div>
                </div>
                <h2 id="cookies-heading" className="text-xl font-black text-slate-900 mb-4">
                  Cookies & Tracking Technologies
                </h2>
                <p className="text-slate-600 leading-relaxed mb-5 text-sm">
                  We use cookies and similar tracking technologies to operate the site and understand
                  how visitors engage with our content. You can control cookie settings through your
                  browser or our consent banner.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {[
                    { type: "Strictly Necessary",  color: "border-l-emerald-400", desc: "Required for the site to function. Cannot be disabled. Session management, security tokens.",             canOptOut: false },
                    { type: "Analytics",            color: "border-l-blue-400",    desc: "Help us understand page popularity and traffic patterns. We use privacy-first analytics (no cross-site tracking).", canOptOut: true  },
                    { type: "Affiliate Tracking",   color: "border-l-violet-400",  desc: "Set by Amazon and other affiliate partners when you click a product link. Required to attribute commissions.", canOptOut: true  },
                    { type: "Preference",           color: "border-l-amber-400",   desc: "Remember your settings such as region or notification preferences.",                                             canOptOut: true  },
                  ].map(({ type, color, desc, canOptOut }) => (
                    <div key={type} className={`bg-white border border-slate-200 border-l-4 ${color} rounded-r-xl p-4`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="font-bold text-slate-900 text-sm">{type}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${canOptOut ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                          {canOptOut ? "Opt-out available" : "Required"}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>

                <WarningBox>
                  <strong>Cookie lifespan:</strong> Most cookies we set expire within 30 days.
                  Amazon Associates cookies expire after 24 hours from first click. You can delete
                  cookies at any time via your browser settings.
                </WarningBox>
              </section>

              <hr className="border-slate-100 my-10" />

              {/* AFFILIATE TRACKING */}
              <section aria-labelledby="affiliate-heading">
                <div id="affiliate" className="scroll-mt-28 mb-4">
                  <div className="inline-flex items-center gap-2.5 bg-violet-50 text-violet-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                    <Link2 size={13} aria-hidden />
                    Affiliate Tracking
                  </div>
                </div>
                <h2 id="affiliate-heading" className="text-xl font-black text-slate-900 mb-4">
                  Affiliate Link Tracking & Disclosure
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                  ATY Digital Store participates in affiliate marketing programs, including but not
                  limited to the <strong className="text-slate-900">Amazon Associates Program</strong>.
                  When you click an affiliate link and make a purchase, we may earn a commission
                  from the retailer. This does not change the price you pay.
                </p>

                <InfoBox>
                  <strong>Amazon Associates disclosure:</strong> ATY Digital Store is a participant
                  in the Amazon Services LLC Associates Program, an affiliate advertising program
                  designed to provide a means for sites to earn advertising fees by advertising and
                  linking to amazon.com, amazon.co.uk, and other Amazon storefronts.
                </InfoBox>

                <h3 className="text-base font-bold text-slate-900 mt-6 mb-3">How affiliate tracking works</h3>
                <ol className="text-sm text-slate-600 space-y-2 pl-0 list-none">
                  {[
                    "You click a link on atydigitalstore.com marked with rel=\"sponsored\" per Google guidelines.",
                    "Your browser is redirected to the retailer's site with a tracking parameter (e.g., ?tag=atydigital-20).",
                    "The retailer places a cookie in your browser to attribute any qualifying purchase.",
                    "If you complete a purchase within the attribution window, we receive a commission.",
                    "We do not receive your name, payment information, or any financial data from the retailer.",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>

                <p className="text-slate-600 leading-relaxed mt-4 text-sm">
                  Our editorial opinions are <strong className="text-slate-900">never influenced</strong> by
                  affiliate relationships. We review products independently; affiliate links are added
                  only after editorial decisions are made.
                </p>
              </section>

              <hr className="border-slate-100 my-10" />

              {/* DATA USE */}
              <section aria-labelledby="data-use-heading">
                <div id="data-use" className="scroll-mt-28 mb-4">
                  <div className="inline-flex items-center gap-2.5 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                    <ShieldCheck size={13} aria-hidden />
                    How We Use Your Data
                  </div>
                </div>
                <h2 id="data-use-heading" className="text-xl font-black text-slate-900 mb-4">
                  How We Use Your Data
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                  We use collected data only for the purposes described below. We never sell personal
                  data to third parties, and we do not use it for automated decision-making or profiling.
                </p>

                <DataTable rows={[
                  ["Newsletter delivery",    "Send weekly digest emails you subscribed to"],
                  ["Site analytics",         "Understand which content is most useful to readers"],
                  ["Security & fraud prevention", "Detect and mitigate malicious traffic"],
                  ["Legal compliance",       "Maintain records required by tax and financial regulations"],
                  ["Product recommendations","Suggest relevant affiliate products based on the page you&apos;re reading (page-level, not user-profile)"],
                ]} />
              </section>

              <hr className="border-slate-100 my-10" />

              {/* DATA SHARING */}
              <section aria-labelledby="data-sharing-heading">
                <div id="data-sharing" className="scroll-mt-28 mb-4">
                  <div className="inline-flex items-center gap-2.5 bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                    <UserCheck size={13} aria-hidden />
                    Data Sharing
                  </div>
                </div>
                <h2 id="data-sharing-heading" className="text-xl font-black text-slate-900 mb-4">
                  Data Sharing &amp; Third Parties
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                  We share data only in the following limited circumstances:
                </p>

                <div className="space-y-3 mb-5">
                  {[
                    {
                      partner: "Email service provider",
                      example: "e.g. Resend, ConvertKit",
                      data: "Email address",
                      purpose: "Newsletter delivery",
                      location: "USA / EU (SCCs apply)",
                    },
                    {
                      partner: "Analytics provider",
                      example: "e.g. Plausible (privacy-first)",
                      data: "Aggregated page view data — no personal identifiers",
                      purpose: "Traffic analysis",
                      location: "EU",
                    },
                    {
                      partner: "Amazon Associates",
                      example: "Amazon Services LLC",
                      data: "Click tracking via cookie",
                      purpose: "Affiliate commission attribution",
                      location: "USA",
                    },
                    {
                      partner: "Hosting provider",
                      example: "e.g. Vercel",
                      data: "Server logs (IP, request metadata)",
                      purpose: "Site operation & security",
                      location: "Global edge network",
                    },
                  ].map(({ partner, example, data, purpose, location }) => (
                    <div key={partner} className="bg-white border border-slate-200 rounded-xl p-4 text-sm">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-semibold text-slate-900">{partner}</p>
                        <span className="text-xs text-slate-400 whitespace-nowrap">{example}</span>
                      </div>
                      <p className="text-slate-500 text-xs mb-1"><span className="font-medium text-slate-700">Data shared:</span> {data}</p>
                      <p className="text-slate-500 text-xs mb-1"><span className="font-medium text-slate-700">Purpose:</span> {purpose}</p>
                      <p className="text-slate-500 text-xs"><span className="font-medium text-slate-700">Location:</span> {location}</p>
                    </div>
                  ))}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  We may also disclose data to comply with a legal obligation, protect our legal rights,
                  or in connection with a business merger or acquisition. We will notify users of any
                  material change where required by law.
                </p>
              </section>

              <hr className="border-slate-100 my-10" />

              {/* USER RIGHTS */}
              <section aria-labelledby="user-rights-heading">
                <div id="user-rights" className="scroll-mt-28 mb-4">
                  <div className="inline-flex items-center gap-2.5 bg-teal-50 text-teal-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                    <Lock size={13} aria-hidden />
                    Your Rights
                  </div>
                </div>
                <h2 id="user-rights-heading" className="text-xl font-black text-slate-900 mb-2">
                  Your Rights — GDPR &amp; CCPA
                </h2>
                <p className="text-slate-600 leading-relaxed mb-5 text-sm">
                  Depending on your location, you have the following rights regarding your personal data.
                  We respond to all verified requests within <strong className="text-slate-900">30 days</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { right: "Right of Access",         description: "Request a copy of all personal data we hold about you."           },
                    { right: "Right to Rectification",  description: "Correct inaccurate or incomplete personal data."                  },
                    { right: "Right to Erasure",        description: 'Request deletion of your data ("right to be forgotten").'         },
                    { right: "Right to Portability",    description: "Receive your data in a structured, machine-readable format."      },
                    { right: "Right to Object",         description: "Object to processing based on legitimate interest."               },
                    { right: "Right to Restrict",       description: "Limit how we process your data in certain circumstances."        },
                    { right: "Opt-out of Sale",         description: "CCPA: We do not sell data. Exercise this right via contact form." },
                    { right: "Withdraw Consent",        description: "Unsubscribe from newsletter or revoke cookie consent at any time." },
                  ].map((item) => (
                    <RightsBadge key={item.right} {...item} />
                  ))}
                </div>

                <InfoBox>
                  To exercise any of these rights, email us at{" "}
                  <strong>privacy@atydigitalstore.com</strong> with subject line &ldquo;Privacy Request.&rdquo;
                  Include your name and email address. We will verify your identity before processing
                  the request. You also have the right to lodge a complaint with your local Data
                  Protection Authority (DPA).
                </InfoBox>
              </section>

              <hr className="border-slate-100 my-10" />

              {/* DATA RETENTION */}
              <section aria-labelledby="retention-heading">
                <div id="data-retention" className="scroll-mt-28 mb-4">
                  <div className="inline-flex items-center gap-2.5 bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                    <AlertCircle size={13} aria-hidden />
                    Data Retention
                  </div>
                </div>
                <h2 id="retention-heading" className="text-xl font-black text-slate-900 mb-4">
                  How Long We Keep Your Data
                </h2>

                <DataTable rows={[
                  ["Newsletter subscriber email", "Until you unsubscribe + 30-day suppression period"],
                  ["Server / access logs",          "90 days for security purposes, then deleted"],
                  ["Analytics data",                "Aggregated, rolling 24-month window"],
                  ["Affiliate commission records",   "7 years (tax / legal compliance)"],
                  ["Cookie data",                   "Per cookie type — see Cookies section above"],
                ]} />

                <p className="text-slate-600 text-sm leading-relaxed">
                  After the retention period expires, data is securely deleted or anonymized.
                </p>
              </section>

              <hr className="border-slate-100 my-10" />

              {/* CONTACT */}
              <section aria-labelledby="contact-heading">
                <div id="contact" className="scroll-mt-28 mb-4">
                  <div className="inline-flex items-center gap-2.5 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                    <Mail size={13} aria-hidden />
                    Contact & DPO
                  </div>
                </div>
                <h2 id="contact-heading" className="text-xl font-black text-slate-900 mb-4">
                  Contact &amp; Data Protection Officer
                </h2>

                <div className="bg-slate-900 text-white rounded-2xl p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">General Privacy Inquiries</p>
                      <p className="text-sm font-semibold text-white mb-0.5">ATY Digital Store Editorial Team</p>
                      <p className="text-slate-400 text-xs">privacy@atydigitalstore.com</p>
                      <p className="text-slate-400 text-xs mt-1">Response time: within 48 hours</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">GDPR Data Protection Officer</p>
                      <p className="text-sm font-semibold text-white mb-0.5">dpo@atydigitalstore.com</p>
                      <p className="text-slate-400 text-xs">For EU residents exercising data rights</p>
                      <p className="text-slate-400 text-xs mt-1">Max response: 30 days (GDPR Art. 12)</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-700 mt-5 pt-5">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                    >
                      <Mail size={14} aria-hidden />
                      Open Contact Form
                    </Link>
                  </div>
                </div>
              </section>

              {/* Policy footer */}
              <div className="mt-10 pt-6 border-t border-slate-100 text-xs text-slate-400 space-y-1">
                <p>This policy was last updated on <time dateTime="2026-02-28">{lastUpdated}</time>.</p>
                <p>
                  We may update this Privacy Policy periodically. Material changes will be announced
                  via newsletter or a prominent notice on the site. Continued use after notice constitutes acceptance.
                </p>
                <p className="pt-1 font-medium text-slate-500">
                  — The ATY Digital Editorial Team
                </p>
              </div>

            </article>
          </main>
        </div>
      </div>
    </>
  );
}
