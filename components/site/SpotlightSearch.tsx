import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { usePosts } from "../../hooks/usePosts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const MAX_RESULTS = 8;

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const Highlight: React.FC<{ text: string; query: string }> = ({ text, query }) => {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escapeRegExp(q)})`, "ig"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark
            key={i}
            className="rounded-sm bg-callout text-accent"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

const SpotlightSearch: React.FC<Props> = ({ isOpen, onClose }) => {
  const posts = usePosts();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const router = useRouter();

  const showTags = useMemo(
    () => new Set(posts.map((post) => post.category)).size > 1,
    [posts]
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q)
    );
  }, [query, posts]);
  const results = matches.slice(0, MAX_RESULTS);

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

  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

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
        role="dialog"
        aria-modal="true"
        aria-label="Search posts"
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-rule bg-page shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-rule px-4 py-3">
          <span className="text-mute">⌘</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search posts..."
            aria-label="Search posts"
            className="w-full bg-transparent text-base text-ink outline-none placeholder:text-mute"
          />
          <span className="hidden rounded bg-field px-1.5 font-mono text-xs text-sub sm:inline">
            Esc
          </span>
        </div>

        <div role="listbox" className="max-h-96 overflow-y-auto py-1">
          {results.length === 0 && (
            <p className="px-4 py-8 text-center text-base text-sub">
              No posts match &ldquo;{query.trim()}&rdquo;.
            </p>
          )}
          {results.map((post, index) => (
            <button
              key={post.slug}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              onClick={() => goToResult(post.slug)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`block w-full border-l-2 px-4 py-2.5 text-left ${
                index === activeIndex
                  ? "border-accent bg-field"
                  : "border-transparent"
              }`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="truncate text-base font-medium text-ink">
                  <Highlight text={post.title} query={query} />
                </span>
                {showTags && <span className="flex-shrink-0 text-sm font-medium text-accent">{post.category}</span>}
              </span>
              <span className="mt-0.5 block truncate text-sm text-sub">
                <Highlight text={post.description} query={query} />
              </span>
            </button>
          ))}
        </div>

        <div className="border-t border-rule px-4 py-2 text-sm text-mute">
          {query.trim()
            ? `${matches.length} ${matches.length === 1 ? "result" : "results"}`
            : `${posts.length} ${posts.length === 1 ? "post" : "posts"}`}
        </div>
      </div>
    </div>
  );
};

export default SpotlightSearch;
