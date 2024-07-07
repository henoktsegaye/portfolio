import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type Blog = {
  slug: string;
  date: string;
  hashtag: string;
  thumbnail: string;
  title: string;
  description: string;
  author: string;
  content: string;
  canonical?: string;
  mdxContent: MDXRemoteSerializeResult
  type?: 'memo'
};
