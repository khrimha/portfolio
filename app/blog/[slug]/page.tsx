import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { getBlogPost, getBlogPosts } from "@/lib/notion";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 px-6">
      <article className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Calendar size={14} />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-slate-500">{post.description}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-sm text-slate-600 bg-zinc-100 rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content Placeholder */}
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-500 text-center py-16 border border-dashed border-zinc-300 rounded-2xl">
            Blog content will be rendered here from Notion using react-notion-x.
            <br />
            <span className="text-sm">Configure your NOTION_BLOG_PAGE_ID to enable.</span>
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-zinc-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to all posts
          </Link>
        </footer>
      </article>
    </div>
  );
}

