import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/lib/notion";

export const metadata = {
  title: "Blog | Portfolio",
  description: "Thoughts on product, engineering, and everything in between.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 mb-4">
            Blog
          </h1>
          <p className="text-xl text-slate-500">
            Thoughts on product, engineering, and everything in between.
          </p>
        </header>

        {/* Posts Grid */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="p-6 rounded-2xl border border-zinc-200 bg-white hover:shadow-md hover:border-zinc-300 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                    <Calendar size={14} />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>

                  <h2 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-slate-500 mb-4">{post.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs text-slate-500 bg-zinc-100 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-slate-400 group-hover:text-slate-600 flex items-center gap-1 transition-colors">
                      Read more
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400">No posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}

