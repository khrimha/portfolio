import { NotionAPI } from "notion-client";
import { BlogPost } from "@/types";

const notion = new NotionAPI();

// Replace with your Notion database/page ID
const NOTION_BLOG_PAGE_ID = process.env.NOTION_BLOG_PAGE_ID || "";

export async function getNotionPage(pageId: string) {
  try {
    const recordMap = await notion.getPage(pageId);
    return recordMap;
  } catch (error) {
    console.error("Error fetching Notion page:", error);
    return null;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  // For now, return mock data until Notion is configured
  // In production, this would fetch from Notion API
  if (!NOTION_BLOG_PAGE_ID) {
    return getMockBlogPosts();
  }

  try {
    const recordMap = await notion.getPage(NOTION_BLOG_PAGE_ID);
    // Parse the recordMap to extract blog posts
    // This depends on your Notion database structure
    return parseBlogPostsFromNotion(recordMap);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return getMockBlogPosts();
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseBlogPostsFromNotion(recordMap: any): BlogPost[] {
  // Implementation depends on your Notion structure
  // This is a placeholder that should be customized
  const blocks = recordMap?.block || {};
  const posts: BlogPost[] = [];

  Object.values(blocks).forEach((block: unknown) => {
    const typedBlock = block as { value?: { type?: string; properties?: { title?: string[][] } } };
    if (typedBlock?.value?.type === "page") {
      posts.push({
        id: String(Math.random()),
        slug: typedBlock.value.properties?.title?.[0]?.[0]?.toLowerCase().replace(/\s+/g, "-") || "",
        title: typedBlock.value.properties?.title?.[0]?.[0] || "Untitled",
        description: "",
        publishedAt: new Date().toISOString(),
        tags: [],
      });
    }
  });

  return posts;
}

function getMockBlogPosts(): BlogPost[] {
  return [
    {
      id: "1",
      slug: "bridging-product-engineering",
      title: "Bridging the Gap Between Product and Engineering",
      description: "How understanding both sides leads to better products and happier teams.",
      publishedAt: "2024-11-20",
      coverImage: "/blog/bridge.jpg",
      tags: ["Product Management", "Engineering", "Leadership"],
    },
    {
      id: "2",
      slug: "nextjs-15-deep-dive",
      title: "Next.js 15: A Deep Dive into Server Components",
      description: "Exploring the new features and patterns in Next.js 15's App Router.",
      publishedAt: "2024-11-15",
      coverImage: "/blog/nextjs.jpg",
      tags: ["Next.js", "React", "Web Development"],
    },
    {
      id: "3",
      slug: "roadmap-prioritization",
      title: "The Art of Roadmap Prioritization",
      description: "A framework for making tough decisions when everything seems important.",
      publishedAt: "2024-11-10",
      coverImage: "/blog/roadmap.jpg",
      tags: ["Product Management", "Strategy", "Frameworks"],
    },
  ];
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}

