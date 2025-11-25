import { Hero } from "@/components/hero";
import { WorkSection } from "@/components/work-section";
import { BlogPreviewWrapper } from "@/components/blog-preview-wrapper";
import { ContactSection } from "@/components/contact-section";
import { getBlogPosts } from "@/lib/notion";

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <>
      <Hero />
      <WorkSection />
      <BlogPreviewWrapper posts={posts} />
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">
              GitHub
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
