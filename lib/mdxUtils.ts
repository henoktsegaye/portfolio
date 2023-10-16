// utils/mdxUtils.ts
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

type Items = {
  [key: string]: string | MDXRemoteSerializeResult;
};

type Post = {
  data: {
    [key: string]: string;
  };
  content: string;
};

const POSTS_PATH = join(process.cwd(), "_blogs");
const WORKS_PATH = join(process.cwd(), "_works");

function getPostFilePaths(): string[] {
  return (
    fs
      .readdirSync(POSTS_PATH)
      // Only include md(x) files
      .filter((path) => /\.mdx?$/.test(path))
  );
}

function getWorkFilesPaths(): string[] {
  return (
    fs
      .readdirSync(WORKS_PATH)
      // Only include md(x) files
      .filter((path) => /\.mdx?$/.test(path))
  );
}

export function getPost(slug: string, isWorks: boolean): Post {
  const fullPath = join(isWorks ? WORKS_PATH : POSTS_PATH, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { data, content };
}

export async function getPostItems(
  filePath: string,
  fields: string[] = [],
  isWorks = false
): Promise<Items> {
  const slug = filePath.replace(/\.mdx?$/, "");
  const { data, content } = getPost(slug, isWorks);
  const mdxSource = await serialize(content, {
    scope: data,
  });
  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug;
    }
    if(field === 'mdxContent') {
      items[field] = mdxSource
    }
    if (field === "content") {
      items[field] = content as any;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export async function getAllPosts(fields: string[] = []): Promise<{
  posts: Items[];
}> {
  const filePaths = getPostFilePaths();
  const posts = await Promise.all(
    filePaths.map(async (filePath) => await getPostItems(filePath, fields))
  );

  // sort posts by date in descending order
  const sortedPosts = posts.sort((post1, post2) =>
    post1.date > post2.date ? -1 : 1
  );

  return { posts: sortedPosts };
}
