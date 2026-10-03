import Link from "next/link";
import { IPostSummary } from "../../types/post";
import PostMeta from "./PostMeta";

const PostRow: React.FC<{ post: IPostSummary; featured?: boolean }> = ({ post, featured = false }) => (
  <div>
    {featured && (
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase text-accent" style={{ letterSpacing: "0.06em" }}>
        <span className="inline-block rounded-full bg-accent" style={{ width: 6, height: 6 }} />
        Featured
      </p>
    )}
    <Link href={`/blog/${post.slug}`}>
      <a
        className={`block text-xl font-semibold leading-snug tracking-tight ${
          featured ? "text-accent" : "text-ink hover:text-accent"
        }`}
      >
        {post.title}
      </a>
    </Link>
    <PostMeta className="mt-1.5" date={post.date} category={post.category} readingTime={post.readingTime} />
  </div>
);

export default PostRow;
