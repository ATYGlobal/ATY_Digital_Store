// app/blog/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ComparisonTable from "@/components/ui/ComparisonTable";
import AffiliateButton from "@/components/ui/AffiliateButton";
import NewsletterBox from "@/components/blog/NewsletterBox";
import Sidebar from "@/components/blog/Sidebar";
import AuthorProfile from "@/components/blog/AuthorProfile";
import { getPostBySlug, getAllPostSlugs } from "@/lib/mockData";

interface Props {
  params: { slug: string };
}

// Pre-generate known slugs at build time
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero header */}
      <header className="bg-white border-b border-slate-100 pt-12 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1 rounded-full border border-violet-200"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-6">{post.excerpt}</p>

            <AuthorProfile author={post.author} publishedAt={post.publishedAt} readTime={post.readTime} />
          </div>
        </div>
      </header>

      {/* Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* Main content */}
          <article className="prose prose-slate prose-lg max-w-none">
            {/* Inline comparison table where relevant */}
            {post.hasComparisonTable && <ComparisonTable />}

            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

            {/* Newsletter CTA mid-article */}
            <NewsletterBox />

            {/* Affiliate CTAs for featured products */}
            {post.featuredProducts?.map((product) => (
              <AffiliateButton key={product.affiliateUrl} product={product} />
            ))}
          </article>

          {/* Sticky sidebar */}
          <Sidebar post={post} />
        </div>
      </div>
    </div>
  );
}
