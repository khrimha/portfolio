import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { BlogPost } from "@/types";

interface BlogPreviewProps {
  posts: BlogPost[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <section className="py-24 px-6 bg-zinc-50/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-2">
              Recent Writing
            </h2>
            <p className="text-slate-500">
              Thoughts on product, engineering, and everything in between.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            View all posts
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="h-full rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:shadow-md hover:border-zinc-300 hover:-translate-y-1">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                    <Calendar size={12} />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs text-slate-500 bg-zinc-100 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Mobile View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center sm:hidden"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            View all posts
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

