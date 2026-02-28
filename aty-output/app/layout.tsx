// app/layout.tsx
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ATY Digital Store — Curated Tech Reviews & Affiliate Picks",
    template: "%s | ATY Digital Store",
  },
  description:
    "Expert tech reviews and curated affiliate picks for Apple, Android, PC & Desk Setup. Every product independently tested.",
  keywords: ["tech reviews", "affiliate", "apple accessories", "best keyboards", "desk setup"],
  openGraph: {
    siteName: "ATY Digital Store",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans bg-white antialiased">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
