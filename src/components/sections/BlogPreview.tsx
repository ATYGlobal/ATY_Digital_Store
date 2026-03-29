import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/mockData";

interface Props {
  posts: BlogPost[];
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-0.5"
    >
      {/* Imagen */}
      <div className="aspect-[16/9] bg-slate-100 overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center gap-1 text-slate-400 text-xs">
            <Clock size={11} />
            {post.readTime || "5"} min read
          </span>
        </div>

        <h3 className="font-black text-slate-900 text-base leading-snug mb-2 group-hover:text-indigo-700 transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs font-semibold text-slate-700">{post.author.name}</span>
          </div>
          <span className="text-xs text-slate-400">
            {new Date(post.publishedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPreview({ posts }: Props) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Latest Research</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">In-Depth Reviews</h2>
          </div>
          <Link href="/blog" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900">
            All Articles <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}