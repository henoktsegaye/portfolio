import { ITocItem } from "../types/post";

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const MAX_DEPTH = 2;

// Every heading from ## to #### (skipping anything inside fenced code), as a
// flat list. The shallowest level a post uses is its main sections (depth 0);
// deeper headings nest under them. Ids come from slugify(), the same function
// the rendered headings use (see PostHeading), so rail links resolve.
export function extractToc(markdown: string): ITocItem[] {
  const headings: { level: number; label: string }[] = [];
  let inFence = false;
  markdown.split("\n").forEach((line) => {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (inFence) return;
    const match = /^(#{2,4})\s+(.+?)\s*#*\s*$/.exec(line);
    if (match) headings.push({ level: match[1].length, label: match[2].replace(/[`*_]/g, "") });
  });
  if (headings.length === 0) return [];

  const top = Math.min(...headings.map((h) => h.level));
  return headings.map(({ level, label }) => ({
    id: slugify(label),
    label,
    depth: Math.min(level - top, MAX_DEPTH),
  }));
}
