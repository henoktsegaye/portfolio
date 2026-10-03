import { getAllPosts } from "./mdxUtils";
import { readingTime } from "./readingTime";
import { IPostSummary } from "../types/post";

const SUMMARY_FIELDS = ["slug", "date", "title", "description", "category", "content"];

// Canonical post list for the home page, spotlight search, and "keep
// reading", so every page fetches the exact same shape the same way.
export function getAllPostSummaries(): IPostSummary[] {
  const { posts } = getAllPosts(SUMMARY_FIELDS);
  return posts.map(({ content, ...summary }) => ({
    ...summary,
    readingTime: readingTime(content ?? ""),
  })) as unknown as IPostSummary[];
}
