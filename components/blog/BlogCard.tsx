import { Blog } from "../../types/post";
import { motion } from "framer-motion";
import Link from "next/link";
import { format, isValid } from "date-fns";
import { Card, Button, Badge } from "../basic/ui";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const { title, description, slug, date, thumbnail, hashtag } = blog;
  const tags =
    hashtag
      ?.split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 3) ?? [];
  const parsedDate = new Date(date);
  const publishedDate = isValid(parsedDate)
    ? format(parsedDate, "MMM do yyyy")
    : "Unknown date";

  return (
    <motion.div
      key={title}
      initial={{ transform: "translateY(30px)" }}
      animate={{ transform: "translateY(0px)" }}
      className="grid bg-transparent"
    >
      <Card
        interactive
        className="overflow-hidden border-black bg-white dark:border-white dark:bg-black"
      >
        <div className="grid items-stretch gap-4 lg:grid-cols-6">
          <div className="col-span-4 flex flex-col justify-between px-4 py-4 md:px-5 md:py-5">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-widest text-black dark:text-white">
                {publishedDate}
              </p>
              <Link href={`/blogs/${slug}`}>
                <a className="block">
                  <h3 className="line-clamp-2 text-xl font-semibold leading-snug text-black dark:text-white md:text-2xl">
                    {title}
                  </h3>
                </a>
              </Link>
              <p className="line-clamp-2 text-sm text-black dark:text-white md:text-base">
                {description}
              </p>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={`${slug}-${tag}`} label={tag} />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="font-mono text-xs uppercase tracking-wider text-black dark:text-white">
                2 min read
              </p>
              <Link href={`/blogs/${slug}`}>
                <a>
                  <Button variant="primary" size="sm">
                    Open
                  </Button>
                </a>
              </Link>
            </div>
          </div>

          <div className="col-span-2 hidden border-l border-black bg-white p-4 dark:border-white dark:bg-black lg:flex lg:items-center lg:justify-center">
            <img
              src={thumbnail}
              alt={title}
              className="h-full max-h-44 rounded-md object-cover"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export { BlogCard };
