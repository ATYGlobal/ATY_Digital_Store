// app/terms/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// ATY Digital Store — Terms of Service
// Covers: site use, intellectual property, affiliate disclaimers,
//         limitation of liability, governing law
// Design: Tech-Minimalist, matches Privacy Policy layout
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  Scale,
  Copyright,
  AlertTriangle,
  Handshake,
  Ban,
  Globe,
  ChevronRight,
  Mail,
} from "lucide-react";

// ─── SEO ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "ATY Digital Store's Terms of Service. Covering site use, intellectual property, affiliate disclaimers, and limitation of liability. Read before using atydigitalstore.com.",
  openGraph: {
    title: "Terms of Service | ATY Digital Store",
    description: "Terms governing the use of atydigitalstore.com, its content, and affiliate links.",
    type: "website",
  },
  alternates: {
    canonical: "https://atydigitalstore.com/terms",
  },
};

// ─── Section config ───────────────────────────────────────────────────────────

const tocItems = [
  { id: "acceptance",    label: "Acceptance of Terms"               },
  { id: "use",          label: "Permitted Use of Site"              },
  { id: "ip",           label: "Intellectual Property"              },
  { id: "affiliate",    label: "Affiliate Disclaimer"               },
  { id: "accuracy",     label: "Content Accuracy"                   },
  { id: "liability",    label: "Limitation of Liability"            },
  { id: "prohibited",  label: "Prohibited Conduct"                  },
  { id: "thirdparty",  label: "Third-Party Links"                   },
  { id: "governing",   label: "Governing Law"                       },
  { id: "changes",     label: "Changes to These Terms"              },
  { id: "contact",     label: "Contact"                             },
];

// ─── Helper components ────────────────────────────────────────────────────────

function SectionHeader({
  id,
  icon: Icon,
  title,
  accent,
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  accent: string;
}) {
  return (
    <div id={id} className="scroll-mt-28 mb-5">
      <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 ${accent}`}>
        <Icon size={13} aria-hidden />
        {title}
      </div>
    </div>
  );
}

function LegalBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 my-5 text-sm text-slate-700 leading-relaxed">
      {children}
    </div>
  );
}

function WarningBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 my-5 text-sm text-amber-900 leading-relaxed">
      <AlertTriangle size={15} className="text-amber-500 flex-shrink-0 mt-0.5" aria-hidden />
      <div>{children}</div>
    </div>
  );
}

function ProhibitedList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 my-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
          <Ban size={13} className="text-red-400 flex-shrink-0 mt-0.5" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

function AllowedList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 my-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
          <ShieldCheck size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TermsOfServicePage() {
  const lastUpdated = "February 28, 2026";
  const effectiveDate = "March 1, 2026";

  return (
    <>
      {/* ── Hero Header ── */}
      <header className="border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 mb-8">
            <Link href="/" className="hover:text-slate-700 transition-colors">Home</Link>
            <ChevronRight size={12} aria-hidden />
            <span className="text-slate-600" aria-current="page">Terms of Service</span>
          </nav>

          <div className="flex items-start gap-5">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Scale size={22} className="text-white" aria-hidden />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                Terms of Service
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span>ATY Digital Store · atydigitalstore.com</span>
                <span className="text-slate-200" aria-hidden>|</span>
                <span>Effective: <time dateTime="2026-03-01">{effectiveDate}</time></span>
                <span className="text-slate-200" aria-hidden>|</span>
                <span>Last updated: <time dateTime="2026-02-28">{lastUpdated}</time></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex gap-12 items-start">

          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-8" aria-label="Page sections">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Sections</p>
            <nav>
              <ul className="space-y-0.5">
                {tocItems.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-slate-700 transition-colors flex-shrink-0" aria-hidden />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs leading-relaxed">
              <p className="font-bold text-amber-800 mb-1">Legal Notice</p>
              <p className="text-amber-700">
                By using this site, you agree to these terms. Please read them carefully.
                Last updated {lastUpdated}.
              </p>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 max-w-3xl">
            <article>

              {/* INTRO NOTICE */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 mb-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Important Notice</p>
                <p className="text-sm leading-relaxed text-slate-300">
                  Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using{" "}
                  <strong className="text-white">atydigitalstore.com</strong> (the &ldquo;Site&rdquo;) operated
                  by ATY Digital (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using the Site,
                  you confirm that you are at least 18 years of age and agree to be bound by these
                  Terms. If you do not agree, please discontinue use immediately.
                </p>
              </div>

              {/* 1. ACCEPTANCE */}
              <section aria-labelledby="acceptance-heading" className="mb-10">
                <SectionHeader id="acceptance" icon={Handshake} title="Acceptance of Terms" accent="bg-indigo-50 text-indigo-700" />
                <h2 id="acceptance-heading" className="text-xl font-black text-slate-900 mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  These Terms constitute a legally binding agreement between you and ATY Digital.
                  By visiting, browsing, or otherwise using atydigitalstore.com, you accept and
                  agree to these Terms and our{" "}
                  <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
                    Privacy Policy
                  </Link>
                  , which is incorporated herein by reference.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  If you are using the Site on behalf of an organization, you represent and warrant
                  that you have authority to bind that organization to these Terms.
                </p>
              </section>

              <hr className="border-slate-100 my-8" />

              {/* 2. PERMITTED USE */}
              <section aria-labelledby="use-heading" className="mb-10">
                <SectionHeader id="use" icon={FileText} title="Permitted Use of Site" accent="bg-blue-50 text-blue-700" />
                <h2 id="use-heading" className="text-xl font-black text-slate-900 mb-4">
                  2. Permitted Use of the Site
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  Subject to these Terms, ATY Digital grants you a limited, non-exclusive,
                  non-transferable, revocable license to access and use the Site for your
                  personal, non-commercial informational purposes.
                </p>
                <p className="text-slate-600 text-sm font-semibold mb-2">You may:</p>
                <AllowedList items={[
                  "Browse and read content published on the Site.",
                  "Share links to articles using standard social sharing methods.",
                  "Print single copies of articles for personal, non-commercial use.",
                  "Subscribe to the newsletter and receive editorial communications.",
                ]} />
              </section>

              <hr className="border-slate-100 my-8" />

              {/* 3. INTELLECTUAL PROPERTY */}
              <section aria-labelledby="ip-heading" className="mb-10">
                <SectionHeader id="ip" icon={Copyright} title="Intellectual Property" accent="bg-violet-50 text-violet-700" />
                <h2 id="ip-heading" className="text-xl font-black text-slate-900 mb-4">
                  3. Intellectual Property of ATY Digital
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  All content published on atydigitalstore.com — including but not limited to
                  articles, reviews, product comparisons, photographs, graphics, logos, icons,
                  audio clips, and software — is the exclusive intellectual property of ATY Digital
                  or its licensors, and is protected by applicable copyright, trademark, and other
                  intellectual property laws.
                </p>

                <LegalBlock>
                  <p className="font-semibold text-slate-900 mb-1.5">
                    &copy; {new Date().getFullYear()} ATY Digital Store. All rights reserved.
                  </p>
                  <p>
                    &ldquo;ATY Digital,&rdquo; &ldquo;ATY Digital Store,&rdquo; &ldquo;atydigitalstore.com,&rdquo; and associated
                    logos are trademarks of ATY Digital. Unauthorized use of these marks is
                    strictly prohibited.
                  </p>
                </LegalBlock>

                <p className="text-slate-600 text-sm font-semibold mb-2">You may not, without prior written consent:</p>
                <ProhibitedList items={[
                  "Reproduce, republish, or redistribute any content from the Site in any medium.",
                  "Use ATY Digital content for commercial purposes or monetization.",
                  "Remove or alter copyright, trademark, or other proprietary notices.",
                  "Create derivative works based on Site content.",
                  "Use our brand name or logo in any way that implies endorsement or affiliation.",
                ]} />

                <p className="text-slate-600 text-sm leading-relaxed">
                  <strong className="text-slate-900">Fair Use:</strong> Brief quotations (under 50 words) with proper
                  attribution and a link back to the original article are permitted under fair use
                  principles. All other uses require written permission from ATY Digital.
                </p>
              </section>

              <hr className="border-slate-100 my-8" />

              {/* 4. AFFILIATE DISCLAIMER */}
              <section aria-labelledby="affiliate-heading" className="mb-10">
                <SectionHeader id="affiliate" icon={ShieldCheck} title="Affiliate Disclaimer" accent="bg-emerald-50 text-emerald-700" />
                <h2 id="affiliate-heading" className="text-xl font-black text-slate-900 mb-4">
                  4. Affiliate Disclaimer &amp; FTC Disclosure
                </h2>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden />
                    <p className="text-sm text-emerald-900 leading-relaxed">
                      <strong>Affiliate Disclosure:</strong> As an Amazon Associate and member of other affiliate
                      programs, ATY Digital earns from qualifying purchases. This supports our
                      independent editorial team at no extra cost to you. Prices shown are set by
                      the retailer and may change at any time.
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  ATY Digital participates in affiliate marketing programs including the Amazon
                  Associates Program and other third-party affiliate networks. When you click an
                  affiliate link and make a qualifying purchase:
                </p>
                <AllowedList items={[
                  "ATY Digital may receive a commission from the retailer.",
                  "The commission does not increase the price you pay.",
                  "Affiliate relationships do not influence editorial recommendations.",
                  "All affiliate links are marked with rel=\"sponsored\" per Google guidelines.",
                ]} />

                <p className="text-slate-600 text-sm leading-relaxed">
                  This disclosure complies with the U.S. Federal Trade Commission Endorsement
                  Guides (16 C.F.R. Part 255) and similar regulations in other jurisdictions.
                  ATY Digital&apos;s editorial content is produced independently of commercial
                  considerations.
                </p>
              </section>

              <hr className="border-slate-100 my-8" />

              {/* 5. CONTENT ACCURACY */}
              <section aria-labelledby="accuracy-heading" className="mb-10">
                <SectionHeader id="accuracy" icon={AlertTriangle} title="Content Accuracy" accent="bg-amber-50 text-amber-700" />
                <h2 id="accuracy-heading" className="text-xl font-black text-slate-900 mb-4">
                  5. Content Accuracy &amp; No Warranties
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  ATY Digital strives to provide accurate, up-to-date information; however, we make
                  no representations or warranties of any kind, express or implied, regarding:
                </p>
                <ProhibitedList items={[
                  "The completeness, accuracy, or reliability of any product review or recommendation.",
                  "The continued availability of any product or current pricing shown.",
                  "The suitability of any product for your specific needs or use case.",
                  "The security or uninterrupted operation of the Site.",
                ]} />

                <WarningBlock>
                  Product specifications, prices, and availability are provided for informational
                  purposes only and are subject to change by manufacturers and retailers without
                  notice. Always verify details directly with the retailer before purchasing.
                </WarningBlock>

                <p className="text-slate-600 text-sm leading-relaxed">
                  The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without any warranty
                  of any kind. Your use of the Site is at your sole risk.
                </p>
              </section>

              <hr className="border-slate-100 my-8" />

              {/* 6. LIMITATION OF LIABILITY */}
              <section aria-labelledby="liability-heading" className="mb-10">
                <SectionHeader id="liability" icon={Scale} title="Limitation of Liability" accent="bg-rose-50 text-rose-700" />
                <h2 id="liability-heading" className="text-xl font-black text-slate-900 mb-4">
                  6. Limitation of Liability
                </h2>

                <LegalBlock>
                  <p className="font-semibold text-slate-900 mb-2">Important — Please Read Carefully</p>
                  <p>
                    To the maximum extent permitted by applicable law, ATY Digital, its owners,
                    editors, contributors, affiliates, and agents shall not be liable for any indirect,
                    incidental, special, consequential, or punitive damages arising out of or in
                    connection with your use of the Site or any affiliate products, including but
                    not limited to: loss of profits, data, goodwill, or other intangible losses,
                    even if ATY Digital has been advised of the possibility of such damages.
                  </p>
                </LegalBlock>

                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  This limitation of liability applies specifically to:
                </p>
                <ProhibitedList items={[
                  "Product defects, malfunctions, or personal injury caused by third-party products we recommend or link to.",
                  "Losses arising from purchases made through affiliate links on this site.",
                  "Reliance on inaccurate or outdated product information or pricing.",
                  "Technical issues, downtime, or data loss related to the Site.",
                  "Unauthorized access to your data due to third-party security incidents.",
                ]} />

                <p className="text-slate-600 text-sm leading-relaxed">
                  In all cases, ATY Digital&apos;s total liability to you for any claim arising from
                  use of the Site shall not exceed <strong className="text-slate-900">$100 USD</strong> or
                  the amount you paid us (if any) in the 12 months preceding the claim, whichever
                  is greater. Some jurisdictions do not allow the exclusion of certain warranties
                  or limitation of liability; in such cases, liability is limited to the greatest
                  extent permitted by law.
                </p>
              </section>

              <hr className="border-slate-100 my-8" />

              {/* 7. PROHIBITED CONDUCT */}
              <section aria-labelledby="prohibited-heading" className="mb-10">
                <SectionHeader id="prohibited" icon={Ban} title="Prohibited Conduct" accent="bg-red-50 text-red-700" />
                <h2 id="prohibited-heading" className="text-xl font-black text-slate-900 mb-4">
                  7. Prohibited Conduct
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  When using the Site, you agree not to:
                </p>
                <ProhibitedList items={[
                  "Scrape, crawl, or systematically download content from the Site using automated tools.",
                  "Attempt to probe, scan, or test the vulnerability of our systems or networks.",
                  "Use the Site to distribute malware, spam, or unsolicited communications.",
                  "Impersonate ATY Digital, its staff, or any other person or entity.",
                  "Engage in any conduct that restricts or inhibits others' use of the Site.",
                  "Use the Site for any unlawful purpose or in violation of any applicable regulations.",
                  "Attempt to circumvent or disable any security measures on the Site.",
                  "Submit false or misleading information through any Site contact forms.",
                ]} />
              </section>

              <hr className="border-slate-100 my-8" />

              {/* 8. THIRD-PARTY LINKS */}
              <section aria-labelledby="thirdparty-heading" className="mb-10">
                <SectionHeader id="thirdparty" icon={Globe} title="Third-Party Links" accent="bg-slate-100 text-slate-700" />
                <h2 id="thirdparty-heading" className="text-xl font-black text-slate-900 mb-4">
                  8. Third-Party Links &amp; Affiliate Sites
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  The Site contains links to third-party websites, including retailer product pages
                  accessed via affiliate links. These sites are not under ATY Digital&apos;s control
                  and we are not responsible for their content, privacy practices, or terms.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Inclusion of a link to a third-party site does not imply endorsement of that site
                  or its operators. We encourage you to review the privacy policy and terms of any
                  third-party site you visit. ATY Digital shall not be held liable for any damage
                  or loss caused by a third-party website.
                </p>
              </section>

              <hr className="border-slate-100 my-8" />

              {/* 9. GOVERNING LAW */}
              <section aria-labelledby="governing-heading" className="mb-10">
                <SectionHeader id="governing" icon={Scale} title="Governing Law" accent="bg-blue-50 text-blue-700" />
                <h2 id="governing-heading" className="text-xl font-black text-slate-900 mb-4">
                  9. Governing Law &amp; Dispute Resolution
                </h2>
                <LegalBlock>
                  These Terms shall be governed by and construed in accordance with the laws of the
                  State of <strong className="text-slate-900">Delaware, United States</strong>, without
                  regard to its conflict of law provisions. You agree that any dispute arising from
                  these Terms or your use of the Site shall be resolved exclusively in the state or
                  federal courts located in Delaware.
                </LegalBlock>
                <p className="text-slate-600 text-sm leading-relaxed">
                  For users in the European Union: nothing in these Terms limits your rights as a
                  consumer under applicable EU law or your right to bring claims before the courts
                  of your country of residence.
                </p>
              </section>

              <hr className="border-slate-100 my-8" />

              {/* 10. CHANGES */}
              <section aria-labelledby="changes-heading" className="mb-10">
                <SectionHeader id="changes" icon={FileText} title="Changes to Terms" accent="bg-indigo-50 text-indigo-700" />
                <h2 id="changes-heading" className="text-xl font-black text-slate-900 mb-4">
                  10. Changes to These Terms
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  ATY Digital reserves the right to modify these Terms at any time. When we make
                  material changes, we will:
                </p>
                <AllowedList items={[
                  "Update the \"Last Updated\" date at the top of this page.",
                  "Notify newsletter subscribers via email where required by law.",
                  "Post a notice on the homepage for at least 30 days.",
                ]} />
                <p className="text-slate-600 text-sm leading-relaxed">
                  Your continued use of the Site after the effective date of any changes constitutes
                  your acceptance of the revised Terms. We recommend reviewing these Terms periodically.
                </p>
              </section>

              <hr className="border-slate-100 my-8" />

              {/* 11. CONTACT */}
              <section aria-labelledby="contact-heading" className="mb-10">
                <SectionHeader id="contact" icon={Mail} title="Contact" accent="bg-slate-100 text-slate-700" />
                <h2 id="contact-heading" className="text-xl font-black text-slate-900 mb-4">
                  11. Contact
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  If you have questions about these Terms, would like to request permission for
                  content use, or need to report a violation, please contact us:
                </p>

                <div className="bg-slate-900 text-white rounded-2xl p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                      <p className="text-sm text-white font-semibold">legal@atydigitalstore.com</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Response Time</p>
                      <p className="text-sm text-white font-semibold">Within 5 business days</p>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <Mail size={14} aria-hidden />
                    Open Contact Form
                  </Link>
                </div>
              </section>

              {/* Policy footer */}
              <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 space-y-1">
                <p>Effective date: <time dateTime="2026-03-01">{effectiveDate}</time>. Last updated: <time dateTime="2026-02-28">{lastUpdated}</time>.</p>
                <p>
                  These Terms of Service supersede all prior versions. The current version is always
                  available at atydigitalstore.com/terms.
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
