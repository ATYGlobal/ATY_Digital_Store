// app/trending/page.tsx
import { Metadata } from "next";
import TrendingClient from "@/components/sections/TrendingClient";

export const metadata: Metadata = {
  title: "Trending Now — Viral Tech Picks",
  description:
    "The hottest tech products going viral right now. Real-time trending scores, social proof, and curated affiliate picks.",
};

export default function TrendingPage() {
  return <TrendingClient />;
}
