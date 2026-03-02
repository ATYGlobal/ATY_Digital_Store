// components/sections/ContactClient.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Contact form — "use client" because it manages form state.
// Fields: Full Name, Email Address, Subject (select), Message.
// Used in: app/contact/page.tsx
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState, type FormEvent } from "react";
import {
  Send,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "idle" | "loading" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: "", email: "", subject: "", message: "" };

// ─── Input field sub-component ────────────────────────────────────────────────

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-bold text-slate-700 mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactClient() {
  const [form, setForm]     = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("loading");
    try {
      // ─── Replace with your real API endpoint ──────────────────────────────
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
      await new Promise((r) => setTimeout(r, 1400)); // simulated delay
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="max-w-lg mx-auto text-center py-20 success-pop">
        <CheckCircle2 size={52} className="text-emerald-500 mx-auto mb-5" aria-hidden="true" />
        <h2 className="text-2xl font-black text-slate-900 mb-2">Message Received</h2>
        <p className="text-slate-500 mb-8">
          Thanks for reaching out — our team responds within 48 hours on business days.
        </p>
        <button
          onClick={() => { setStatus("idle"); setForm(INITIAL_FORM); }}
          className="text-sm text-indigo-600 font-semibold hover:text-indigo-500 transition-colors underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  // ── Form state ─────────────────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-card">
        {/* Header */}
        <h2 className="text-2xl font-black text-slate-900 mb-1">Get in Touch</h2>
        <p className="text-slate-500 text-sm mb-8">
          For partnerships, press inquiries, content corrections, or general feedback on our reviews.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel htmlFor="name" required>Full Name</FieldLabel>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Alex Chen"
                className="field-input"
                autoComplete="name"
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="email" required>Email Address</FieldLabel>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="alex@example.com"
                className="field-input"
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <FieldLabel htmlFor="subject">Subject</FieldLabel>
            <select
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="field-input"
            >
              <option value="">Select a topic…</option>
              <option value="partnership">Affiliate / Partnership Inquiry</option>
              <option value="press">Press &amp; Media</option>
              <option value="correction">Content Correction</option>
              <option value="privacy">Privacy / Data Request</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <FieldLabel htmlFor="message" required>Message</FieldLabel>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us what's on your mind…"
              className="field-input resize-none"
              required
            />
          </div>

          {/* Error banner */}
          {status === "error" && (
            <div
              role="alert"
              className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
            >
              <AlertCircle size={15} aria-hidden="true" />
              Something went wrong. Please try again or email us directly.
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors text-sm"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                <Send size={15} aria-hidden="true" />
                Send Message
              </>
            )}
          </button>
        </form>

        {/* Privacy note */}
        <p className="flex items-center gap-1.5 mt-5 text-xs text-slate-400">
          <ShieldCheck size={12} className="text-emerald-500 flex-shrink-0" aria-hidden="true" />
          Your message is private and never shared with third parties.{" "}
          <a href="/privacy" className="text-indigo-500 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>

      {/* Direct email fallback */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500 mb-2">Prefer email?</p>
        <a
          href="mailto:hello@atydigitalstore.com"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <Mail size={14} aria-hidden="true" />
          hello@atydigitalstore.com
        </a>
      </div>
    </div>
  );
}
