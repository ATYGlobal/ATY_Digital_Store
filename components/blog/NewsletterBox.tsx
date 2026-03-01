// components/blog/NewsletterBox.tsx
"use client";

import { useState, type FormEvent } from "react";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    // Replace with your newsletter API: POST /api/newsletter
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-8 my-12 not-prose">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">
          <span className="w-8 h-px bg-indigo-500" aria-hidden />
          Weekly Newsletter
        </div>

        <h2 className="text-2xl font-black text-white mb-2 leading-tight">
          Join 12,000+ tech readers.
        </h2>
        <p className="text-slate-400 text-sm mb-6 max-w-sm leading-relaxed">
          Every Sunday: the best hosting deals, affiliate tools, and developer resources —
          curated, not cluttered.
        </p>

        {status === "success" ? (
          <div
            role="status"
            aria-live="polite"
            className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-5 py-3.5 rounded-xl text-sm font-semibold w-fit"
          >
            <CheckCircle2 size={16} aria-hidden />
            You&apos;re in! Check your inbox for a confirmation email.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md" noValidate>
            <div className="flex-1 flex items-center gap-2 bg-white/10 border border-white/10 px-4 rounded-xl focus-within:border-indigo-500 transition-colors">
              <Mail size={15} className="text-slate-500 flex-shrink-0" aria-hidden />
              <label htmlFor="newsletter-email" className="sr-only">
                Your email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                disabled={status === "loading"}
                className="bg-transparent text-white placeholder-slate-500 text-sm py-3 outline-none w-full disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading" || !email}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors whitespace-nowrap flex items-center justify-center gap-2 min-w-[140px]"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={15} className="animate-spin" aria-hidden />
                  Subscribing…
                </>
              ) : (
                "Subscribe Free"
              )}
            </button>
          </form>
        )}

        {status !== "success" && (
          <p className="text-slate-600 text-xs mt-3">
            No spam. Unsubscribe at any time. We respect your privacy.
          </p>
        )}
      </div>
    </div>
  );
}
