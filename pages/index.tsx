// pages/index.tsx
import { useMemo, useState } from "react";
import { IPost } from "../types/post";
import { getAllPosts } from "../lib/mdxUtils";
import LanguageStrings, { langType } from "../lib/lang";
import { AnimatePresence } from "framer-motion";
import { BlogHeader } from "../components/blog/blogHeader";
import { BlogCard } from "../components/blog/BlogCard";
import { BlogNav } from "../components/blog/blogNav";
import { Text } from "../components/basic/genial/text";
import { TerminalPanel } from "../components/basic/ui";
import Footer from "../components/layout/footer";
import Meta from "../components/layout/meta";

type Props = {
  files: {
    posts: IPost[];
    works: IPost[];
  };
  localeString: langType;
  locale: "am" | "en";
};

const Home: React.FC<Props> = ({ files, localeString, locale }) => {
  const { posts } = files;
  const { footer, general, socialMedia } = localeString;
  const normalizeTag = (value?: string) => (value ?? "").trim();
  const splitTags = (value?: string) =>
    normalizeTag(value)
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

  const tags = useMemo(
    () =>
      new Set(
        posts
          .flatMap((el) => splitTags(el.hashtag))
          .filter(Boolean)
          .sort((tagA, tagB) => tagA.localeCompare(tagB))
      ),
    [posts]
  );
  const tagsList = useMemo(() => Array.from(tags), [tags]);

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const selectedPostsByTag = useMemo(
    () =>
      activeTag
        ? posts.filter((el) => splitTags(el.hashtag).includes(activeTag))
        : posts,
    [activeTag, posts]
  );
  const selectedPosts = useMemo(
    () =>
      search
        ? selectedPostsByTag.filter((el) =>
            el.title.toLowerCase().includes(search.toLowerCase())
          )
        : selectedPostsByTag,
    [selectedPostsByTag, search]
  );

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black">
      <Meta
        socialMedia={socialMedia}
        siteString={{
          siteTitle: general.siteTitle,
          siteDescription: general.siteDescription,
        }}
        title="homepage"
      />
      <BlogNav />
      <main className="mx-auto w-full max-w-screen-lg px-4 pb-14 pt-24 lg:px-0">
        <TerminalPanel>
          <div className="mb-4 flex justify-end">
            <p className="font-mono text-xs uppercase tracking-wider text-black dark:text-white">
              {selectedPosts.length} posts
            </p>
          </div>
          <BlogHeader
            tags={["All", ...tagsList]}
            search={search}
            onSearchChange={setSearch}
            activeTag={activeTag ?? "All"}
            onTagChange={(tag: string) => setActiveTag(tag !== "All" ? tag : null)}
          />
          <div className="grid grid-cols-1 gap-3">
            <AnimatePresence>
              {selectedPosts.length === 0 && (
                <Text size="xl" className="text-black dark:text-white">
                  No results found.
                </Text>
              )}
              {selectedPosts.map((el) => (
                <BlogCard key={el.slug} blog={el} />
              ))}
            </AnimatePresence>
          </div>
        </TerminalPanel>
      </main>
      <Footer footer={footer} socialMedia={socialMedia} />
    </div>
  );
};

export default Home;

export const getStaticProps = async ({
  locale = "en",
}: {
  locale: "am" | "en";
}) => {
  const files = getAllPosts([
    "slug",
    "date",
    "thumbnail",
    "title",
    "description",
    "hashtag",
  ]);

  const localeString: langType = LanguageStrings[locale];

  return { props: { files, localeString, locale } };
};
