import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { usePosts } from "../../hooks/usePosts";
import CategoryTag from "./CategoryTag";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SpotlightSearch: React.FC<Props> = ({ isOpen, onClose }) => {
  const posts = usePosts();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts.slice(0, 8);
    return posts
      .filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.description.toLowerCase().includes(q) ||
          post.category.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query, posts]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const goToResult = (slug: string) => {
    router.push(`/blog/${slug}`);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const active = results[activeIndex];
      if (active) goToResult(active.slug);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40 px-4 pt-24"
      style={{ backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-3 dark:border-gray-800">
          <span className="text-gray-400">⌘</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search posts..."
            className="w-full bg-transparent text-sm text-black outline-none placeholder:text-gray-400 dark:text-white"
          />
          <span className="hidden rounded border border-gray-300 px-1 font-mono text-[10px] text-gray-400 dark:border-gray-700 sm:inline">
            Esc
          </span>
        </div>
        <div className="max-h-80 overflow-y-auto py-2">
          {results.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
              No posts found.
            </p>
          )}
          {results.map((post, index) => (
            <button
              key={post.slug}
              type="button"
              onClick={() => goToResult(post.slug)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`block w-full px-4 py-2.5 text-left ${
                index === activeIndex
                  ? "bg-gray-100 dark:bg-gray-800"
                  : ""
              }`}
            >
              <p className="text-sm font-medium text-black dark:text-white">
                {post.title}
              </p>
              <p className="mt-0.5 line-clamp-1 text-xs text-gray-700 dark:text-gray-300">
                {post.description}
              </p>
              <div className="mt-1.5">
                <CategoryTag category={post.category} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpotlightSearch;
