import { getAllPosts } from "./mdxUtils";
import { IPostSummary } from "../types/post";

const SUMMARY_FIELDS = ["slug", "date", "title", "description", "category"];

// Canonical post list for the home page, spotlight search, and prev/next
// navigation, so every page fetches the exact same shape the same way.
export function getAllPostSummaries(): IPostSummary[] {
  const { posts } = getAllPosts(SUMMARY_FIELDS);
  return posts as unknown as IPostSummary[];
}
