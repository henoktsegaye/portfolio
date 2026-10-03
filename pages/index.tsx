import { useMemo, useState } from "react";
import { IPostSummary } from "../types/post";
import { getAllPostSummaries } from "../lib/posts";
import SiteLayout from "../components/site/SiteLayout";
import { usePosts } from "../hooks/usePosts";
import PostRow from "../components/site/PostRow";

type Props = {
  posts: IPostSummary[];
};

const ALL = "All";

const HomeList: React.FC = () => {
  const posts = usePosts();
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState(ALL);

  const topics = useMemo(
    () => [
      ALL,
      ...Array.from(new Set(posts.map((post) => post.category))).sort(),
    ],
    [posts]
  );

  const q = query.trim().toLowerCase();
  const matches = posts.filter(
    (post) =>
      (topic === ALL || post.category === topic) &&
      (!q ||
        `${post.title} ${post.category} ${post.description}`
          .toLowerCase()
          .includes(q))
  );

  const featured = posts[0];
  const showFeatured = !q && topic === ALL && Boolean(featured);
  const rows = showFeatured
    ? matches.filter((post) => post !== featured)
    : matches;

  return (
    <>
      <div className="glass sticky z-30 pb-4 pt-2" style={{ top: 88 }}>
        <p
          className="mb-5 text-body font-normal text-copy"
          style={{ lineHeight: 1.5 }}
        >
          Notes on software, and the occasional detour into life.
        </p>
        <label
          htmlFor="post-search"
          className="flex cursor-text items-center gap-3.5 rounded-2xl bg-field px-5 text-sub"
          style={{ minHeight: 52 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id="post-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts by title or topic"
            aria-label="Search posts"
            className="min-w-0 flex-1 appearance-none border-0 bg-transparent text-lg text-ink outline-none"
          />
          <span className="rounded bg-page px-1.5 py-0.5 font-mono text-xs text-sub">
            ⌘K
          </span>
        </label>

        {topics.length > 2 && (
          <div
            role="group"
            aria-label="Filter by topic"
            className="mt-4 flex flex-wrap gap-2"
          >
            {topics.map((label) => {
              const on = topic === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setTopic(label)}
                  aria-pressed={on}
                  className={`rounded-full px-4 text-ui font-medium ${
                    on
                      ? "bg-fill text-white"
                      : "bg-transparent text-sub hover:text-ink"
                  }`}
                  style={{ minHeight: 40 }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="max-w-col">
        <div className="mt-10 flex flex-col gap-12">
          {showFeatured && <PostRow post={featured} featured />}
          {rows.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </div>

        {matches.length === 0 && (
          <p className="py-10 text-small text-sub">
            No posts match that. Try another word or topic.
          </p>
        )}
      </div>
    </>
  );
};

const Home: React.FC<Props> = ({ posts }) => (
  <SiteLayout posts={posts} title="Home" width="wide">
    <HomeList />
  </SiteLayout>
);

export default Home;

export const getStaticProps = async () => {
  return { props: { posts: getAllPostSummaries() } };
};
