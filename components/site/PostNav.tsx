import Link from "next/link";
import { usePosts } from "../../hooks/usePosts";

const PostNav: React.FC<{ slug: string }> = ({ slug }) => {
  const posts = usePosts();
  const currentIndex = posts.findIndex((post) => post.slug === slug);
  const previousPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < posts.length - 1
      ? posts[currentIndex + 1]
      : null;

  if (!previousPost && !nextPost) return null;

  return (
    <div className="mt-10 flex items-start justify-between gap-4 text-sm">
      {previousPost ? (
        <Link href={`/blog/${previousPost.slug}`}>
          <a className="max-w-[45%] text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
            <span className="mb-1 block font-mono text-[10px] tracking-wider text-gray-600 dark:text-gray-400">
              ← Previous
            </span>
            {previousPost.title}
          </a>
        </Link>
      ) : (
        <span />
      )}
      {nextPost && (
        <Link href={`/blog/${nextPost.slug}`}>
          <a className="max-w-[45%] text-right text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
            <span className="mb-1 block font-mono text-[10px] tracking-wider text-gray-600 dark:text-gray-400">
              Next →
            </span>
            {nextPost.title}
          </a>
        </Link>
      )}
    </div>
  );
};

export default PostNav;
