// components/blog/Sidebar.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Sticky blog sidebar — Popular Articles + Categories + Tags + Affiliate CTA
// Server component (no "use client" needed — no interactivity).
// Used in: app/blog/[slug]/page.tsx
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  Tag,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Clock,
  LayoutGrid,
} from "lucide-react";
import { getPopularPosts, blogCategories, type BlogPost } from "@/lib/mockData";

// ─── Props ────────────────────────────────────────────────────────────────────

interface SidebarProps {
  /** The currently-viewed post — excluded from the Popular Articles list */
  post: BlogPost;
}

// ─── Section heading sub-component ───────────────────────────────────────────

function SectionHeading({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon size={13} className="text-white" aria-hidden="true" />
      </div>
      <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">
        {label}
      </h2>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Sidebar({ post }: SidebarProps) {
  const popularPosts = getPopularPosts(post.slug);

  return (
    <aside className="space-y-6 lg:sticky lg:top-8 self-start" aria-label="Blog sidebar">

      {/* ── Popular Articles ──────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <SectionHeading icon={TrendingUp} label="Popular Articles" />

        <ul className="space-y-4" role="list">
          {popularPosts.map((p, index) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="flex items-start gap-3 group"
                aria-label={`Read: ${p.title}`}
              >
                {/* Rank badge */}
                <span
                  className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-indigo-600 group-hover:text-white transition-colors"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {p.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock size={11} className="text-slate-300 flex-shrink-0" aria-hidden="true" />
                    <span className="text-xs text-slate-400">{p.readTime} min read</span>
                    <span className="text-slate-200" aria-hidden="true">·</span>
                    <span className="text-xs text-slate-400">
                      {new Date(p.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day:   "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Thumbnail */}
                {p.coverImage && (
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                    <Image
                      src={p.coverImage}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
              </Link>

              {/* Divider between items */}
              {index < popularPosts.length - 1 && (
                <div className="border-t border-slate-50 mt-4" aria-hidden="true" />
              )}
            </li>
          ))}
        </ul>

        <Link
          href="/blog"
          className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors pt-4 border-t border-slate-100"
        >
          View all articles
          <ChevronRight size={12} aria-hidden="true" />
        </Link>
      </div>

      {/* ── Categories ───────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <SectionHeading icon={LayoutGrid} label="Categories" />

        <ul className="space-y-1.5" role="list">
          {blogCategories.map(({ label, slug, count, icon }) => (
            <li key={slug}>
              <Link
                href={`/blog/category/${slug}`}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-all group"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base leading-none" aria-hidden="true">{icon}</span>
                  {label}
                </span>
                <span className="text-xs font-bold text-slate-300 bg-slate-50 group-hover:bg-indigo-100 group-hover:text-indigo-500 px-2 py-0.5 rounded-full transition-colors">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Tags from current post ────────────────────────────────────── */}
      {post.tags.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <SectionHeading icon={Tag} label="Tags" />
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs font-medium text-slate-600 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 px-3 py-1.5 rounded-full transition-all"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Affiliate CTA ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-5 text-white">
        {/* Decorative blobs */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-black/10 rounded-full blur-xl pointer-events-none" aria-hidden="true" />

        <div className="relative">
          <div className="flex items-center gap-1.5 mb-3">
            <ShieldCheck size={13} className="text-indigo-200" aria-hidden="true" />
            <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">
              Verified Affiliate
            </span>
          </div>

          <p className="text-sm font-black leading-tight mb-1">
            Find the best deals on our featured products
          </p>
          <p className="text-xs text-indigo-200 leading-relaxed mb-4">
            Every product is independently tested by the ATY Digital editorial team.
          </p>

          <Link
            href="/trending"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors group"
          >
            View Top Picks
            <ExternalLink
              size={12}
              className="group-hover:translate-x-0.5 transition-transform"
              aria-hidden="true"
            />
          </Link>

          <p className="text-xs text-indigo-300 mt-3 leading-relaxed">
            Affiliate links are marked with a shield. We earn a small commission at no extra cost to you.
          </p>
        </div>
      </div>
    </aside>
  );
}
