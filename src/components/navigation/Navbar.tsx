// components/navigation/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { navigation } from "@/lib/mockData";

const categoryAccents: Record<string, string> = {
  apple: "text-indigo-600",
  android: "text-emerald-600",
  pc: "text-amber-600",
  desk: "text-pink-600",
};

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-100"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">A</span>
            </div>
            <span className="font-bold text-slate-900 text-sm tracking-tight">
              aty<span className="text-indigo-600">digital</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((nav) => (
              <div
                key={nav.slug}
                className="relative"
                onMouseEnter={() => setActiveMenu(nav.slug)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={`/category/${nav.slug}`}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
                    activeMenu === nav.slug
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {nav.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      activeMenu === nav.slug ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                {/* Mega Menu */}
                {activeMenu === nav.slug && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-900/10 p-5 w-[480px] grid grid-cols-3 gap-5 z-50">
                    {nav.subcategories.map((sub) => (
                      <div key={sub.label}>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                          {sub.label}
                        </p>
                        <ul className="space-y-1">
                          {sub.items.map((item) => (
                            <li key={item}>
                              <Link
                                href={`/category/${nav.slug}`}
                                className={`flex items-center gap-1.5 text-sm text-slate-600 hover:${
                                  categoryAccents[nav.slug] || "text-indigo-600"
                                } transition-colors group/item py-0.5`}
                              >
                                <ChevronRight
                                  size={12}
                                  className="opacity-0 group-hover/item:opacity-100 -ml-1 transition-opacity flex-shrink-0"
                                />
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/blog"
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/trending"
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Trending
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
              <Search size={16} />
              <span className="hidden sm:inline text-xs">Search</span>
              <kbd className="hidden sm:inline text-xs text-slate-300 font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                ⌘K
              </kbd>
            </button>
            <button
              className="lg:hidden p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-100 py-4 space-y-1 pb-6">
            {navigation.map((nav) => (
              <Link
                key={nav.slug}
                href={`/category/${nav.slug}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
              >
                {nav.label}
                <ChevronRight size={16} className="text-slate-400" />
              </Link>
            ))}
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Blog <ChevronRight size={16} className="text-slate-400" />
            </Link>
            <Link
              href="/trending"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Trending <ChevronRight size={16} className="text-slate-400" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
