// app/layout.tsx
import Script from 'next/script';
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
  openGraph: { siteName: "ATY Digital Store", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        {/* 1. Código Google Tag Manager (Head) */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TWRTXVCX');
          `}
        </Script>
      </head>
      <body className="font-sans bg-white antialiased">
        {/* 2. Código Google Tag Manager (Body) - Dentro de body y con formato React */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-TWRTXVCX"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}