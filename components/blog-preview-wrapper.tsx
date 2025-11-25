"use client";

import { BlogPreview } from "./blog-preview";
import { BlogPost } from "@/types";

interface BlogPreviewWrapperProps {
  posts: BlogPost[];
}

export function BlogPreviewWrapper({ posts }: BlogPreviewWrapperProps) {
  return <BlogPreview posts={posts} />;
}

