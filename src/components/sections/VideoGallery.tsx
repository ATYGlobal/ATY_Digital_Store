// components/sections/VideoGallery.tsx
import Link from "next/link";
import { Play, ArrowRight, Eye } from "lucide-react";
import type { Video } from "@/lib/mockData";

interface Props {
  videos: Video[];
}

function VideoCard({ video }: { video: Video }) {
  const youtubeUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

  return (
    <a
      href={youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-0.5"
      aria-label={`Watch: ${video.title}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-slate-900 overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play size={20} className="text-slate-900 fill-slate-900 ml-1" />
          </div>
        </div>
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-0.5 rounded">
          {video.duration}
        </div>
        {/* Category badge */}
        <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {video.category}
        </div>
      </div>

      {/* Meta */}
      <div className="px-4 py-3">
        <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {video.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1"><Eye size={11} />{video.views} views</span>
          <span>{new Date(video.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        </div>
      </div>
    </a>
  );
}

export default function VideoGallery({ videos }: Props) {
  return (
    <section className="bg-white py-20" aria-labelledby="videos-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
              Video Reviews
            </p>
            <h2 id="videos-heading" className="text-3xl font-black text-slate-900 tracking-tight">
              Watch Before You Buy
            </h2>
          </div>
          <a
            href="https://youtube.com/@atydigital"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group"
          >
            YouTube Channel
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
