import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { IPostSummary } from "../../types/post";
import PostMeta from "./PostMeta";

type Props = {
  post: IPostSummary;
  expanded: boolean;
  onToggle: () => void;
};

const PostRow: React.FC<Props> = ({ post, expanded, onToggle }) => {
  return (
    <div className="py-3">
      <div className="flex items-center gap-2">
        <motion.button
          onClick={onToggle}
          aria-label={expanded ? "Collapse" : "Expand"}
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="text-gray-600 dark:text-gray-400"
        >
          ›
        </motion.button>
        <Link href={`/blog/${post.slug}`}>
          <a className="text-base font-semibold text-black hover:underline dark:text-white">
            {post.title}
          </a>
        </Link>
      </div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-2 pl-5">
              <p className="mb-2 max-w-[58ch] text-sm text-gray-700 dark:text-gray-300">
                {post.description}
              </p>
              <PostMeta date={post.date} category={post.category} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostRow;
