// components/blog/AuthorProfile.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Author byline for blog posts.
//   variant="inline"  → compact row shown in the article header (default)
//   variant="card"    → full bio card shown at the end of an article
// Used in: app/blog/[slug]/page.tsx
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { Twitter, Clock, CalendarDays, ShieldCheck } from "lucide-react";
import type { Author } from "@/lib/mockData";

// ─── Props ────────────────────────────────────────────────────────────────────

interface AuthorProfileProps {
  author: Author;
  publishedAt: string;            // ISO date "2026-02-28"
  readTime: number;               // minutes
  variant?: "inline" | "card";
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  // FIX: year must be "numeric", not "month" (was a TypeScript type error)
  return new Date(iso).toLocaleDateString("en-US", {
    year:  "numeric",
    month: "long",
    day:   "numeric",
  });
}

// ─── Inline variant ───────────────────────────────────────────────────────────

function AuthorInline({
  author,
  publishedAt,
  readTime,
}: Omit<AuthorProfileProps, "variant">) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Avatar + name */}
      <div className="flex items-center gap-2.5">
        <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-slate-100 flex-shrink-0">
          <Image
            src={author.avatar}
            alt={`${author.name} avatar`}
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 leading-none">{author.name}</p>
          <p className="text-xs text-slate-400 leading-none mt-0.5">{author.role}</p>
        </div>
      </div>

      <span className="w-px h-6 bg-slate-200 hidden sm:block" aria-hidden="true" />

      {/* Publish date */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <CalendarDays size={13} className="text-slate-300 flex-shrink-0" aria-hidden="true" />
        <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
      </div>

      {/* Read time */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Clock size={13} className="text-slate-300 flex-shrink-0" aria-hidden="true" />
        <span>{readTime} min read</span>
      </div>

      {/* Trust badge */}
      <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
        <ShieldCheck size={13} aria-hidden="true" />
        <span>Independently tested</span>
      </div>
    </div>
  );
}

// ─── Card variant ─────────────────────────────────────────────────────────────

function AuthorCard({
  author,
  publishedAt,
  readTime,
}: Omit<AuthorProfileProps, "variant">) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 my-10">
      <div className="flex items-start gap-5">
        {/* Avatar */}
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-slate-100 flex-shrink-0">
          <Image
            src={author.avatar}
            alt={`${author.name} profile photo`}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Name row */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <div>
              <p className="font-black text-slate-900 text-base leading-tight">{author.name}</p>
              <p className="text-xs text-indigo-600 font-semibold mt-0.5">{author.role}</p>
            </div>

            {author.twitter && (
              <Link
                href={`https://twitter.com/${author.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl transition-all"
                aria-label={`Follow ${author.name} on Twitter`}
              >
                <Twitter size={12} aria-hidden="true" />
                @{author.twitter}
              </Link>
            )}
          </div>

          {/* Bio */}
          <p className="text-sm text-slate-600 leading-relaxed mb-3">{author.bio}</p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={11} className="text-slate-300" aria-hidden="true" />
              Published{" "}
              <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            </span>
            <span className="text-slate-200" aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <Clock size={11} className="text-slate-300" aria-hidden="true" />
              {readTime} min read
            </span>
            <span className="text-slate-200" aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <ShieldCheck size={11} aria-hidden="true" />
              Independent review
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Default export ───────────────────────────────────────────────────────────

export default function AuthorProfile({
  author,
  publishedAt,
  readTime,
  variant = "inline",
}: AuthorProfileProps) {
  if (variant === "card") {
    return <AuthorCard author={author} publishedAt={publishedAt} readTime={readTime} />;
  }
  return <AuthorInline author={author} publishedAt={publishedAt} readTime={readTime} />;
}
