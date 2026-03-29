// app/page.tsx
import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import CTABanner from "@/components/sections/CTABanner";
import VideoGallery from "@/components/sections/VideoGallery";
import BlogPreview from "@/components/sections/BlogPreview";
import { getFeaturedProducts, getFeaturedVideos, getFeaturedPosts } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Curated Tech Reviews & Affiliate Picks",
};

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const featuredVideos = getFeaturedVideos();
  const featuredPosts = getFeaturedPosts();

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
      <CTABanner />
      <VideoGallery videos={featuredVideos} />
      <BlogPreview posts={featuredPosts} />
    </>
  );
}
