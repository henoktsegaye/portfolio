import { useMemo, useState } from "react";
import { IPostSummary } from "../types/post";
import { getAllPostSummaries } from "../lib/posts";
import SiteLayout, { useOpenSearch } from "../components/site/SiteLayout";
import { usePosts } from "../hooks/usePosts";
import PostRow from "../components/site/PostRow";

type Props = {
  posts: IPostSummary[];
};

const HomeList: React.FC = () => {
  const posts = usePosts();
  const openSearch = useOpenSearch();

  const categories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.category))).sort(),
    [posts]
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(
    posts[0]?.slug ?? null
  );

  const filteredPosts = activeCategory
    ? posts.filter((post) => post.category === activeCategory)
    : posts;

  const selectCategory = (category: string | null) => {
    setActiveCategory(category);
    const nextPosts = category
      ? posts.filter((post) => post.category === category)
      : posts;
    setExpandedSlug(nextPosts[0]?.slug ?? null);
  };

  return (
    <>
      <p className="mb-6 max-w-[46ch] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Notes on software, and the occasional detour into life and the things I do outside of it.
      </p>

      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="flex gap-4 font-mono text-xs tracking-wider">
          <button
            onClick={() => selectCategory(null)}
            className={
              activeCategory === null
                ? "border-b border-black text-black dark:border-white dark:text-white"
                : "text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
            }
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => selectCategory(category)}
              className={
                activeCategory === category
                  ? "border-b border-black text-black dark:border-white dark:text-white"
                  : "text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
              }
            >
              {category}
            </button>
          ))}
        </div>
        <button
          onClick={openSearch}
          className="flex items-center gap-1.5 font-mono text-xs tracking-wider text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
        >
          <span>Search</span>
          <span className="rounded border border-gray-300 px-1 text-[10px] dark:border-gray-700">
            ⌘K
          </span>
        </button>
      </div>

      <div>
        {filteredPosts.length === 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-400">No posts here yet.</p>
        )}
        {filteredPosts.map((post) => (
          <PostRow
            key={post.slug}
            post={post}
            expanded={post.slug === expandedSlug}
            onToggle={() =>
              setExpandedSlug(expandedSlug === post.slug ? null : post.slug)
            }
          />
        ))}
      </div>
    </>
  );
};

const Home: React.FC<Props> = ({ posts }) => (
  <SiteLayout posts={posts} title="Home">
    <HomeList />
  </SiteLayout>
);

export default Home;

export const getStaticProps = async () => {
  return { props: { posts: getAllPostSummaries() } };
};
