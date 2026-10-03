import Link from "next/link";
import { usePosts } from "../../hooks/usePosts";

const MAX = 3;

const KeepReading: React.FC<{ slug: string }> = ({ slug }) => {
  const posts = usePosts();
  const others = posts.filter((post) => post.slug !== slug);
  const index = Math.max(0, posts.findIndex((post) => post.slug === slug));
  // Start with the posts right after this one, wrapping to the newest.
  const ordered = [...others.slice(index), ...others.slice(0, index)].slice(0, MAX);

  if (ordered.length === 0) return null;

  return (
    <section aria-labelledby="next-h" className="mx-auto w-full max-w-post px-6 pb-16">
      <h2 id="next-h" className="text-sm font-semibold uppercase text-mute" style={{ letterSpacing: "0.06em" }}>
        Keep reading
      </h2>
      <div className="mt-5 grid gap-6 sm:grid-cols-3">
        {ordered.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <a className="block rounded-2xl bg-tint p-6 text-ink">
              <span className="block text-sm font-medium text-accent">{post.category}</span>
              <span className="mt-2 block text-body font-semibold" style={{ lineHeight: 1.35 }}>
                {post.title}
              </span>
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default KeepReading;
