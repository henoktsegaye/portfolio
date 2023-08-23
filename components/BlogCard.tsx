import Link from "next/link";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { Text } from "./genial/Text";
import { Blog } from "@/types/blog";
import { predictReadMinutes } from "@/lib/minuteRead";
import { Code } from "@nextui-org/react";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const route = useRouter();
  const { title, description, slug, date, content } = blog;
  const mins = predictReadMinutes(content);
  return (
    <div  className=" border h-50 rounded-xl border-gray-200 dark:border-gray-800">
      <div
        className={` lg:col-span-6  gap-4   grid-cols-3 items-center cursor-pointer grid   rounded-lg lg:grid-cols-6   `}
        onClick={(e) => {
          e.preventDefault();
          route.push(`/blogs/${slug}`);
        }}
      >
        <div className=" mb-4 bg-gray  rounded-xl  p-4 col-span-6  flex flex-col justify-between pr-4 ">
          <div>
         
            <Link href={`/blogs/${slug}`}>
              <Text
                isTitle
                size="2xl"
                bold="extrabold"
                className="line-clamp-2 dark:text-transparent text-transparent dark:bg-clip-text  bg-clip-text dark:bg-gradient-to-r bg-gradient-to-r dark:from-green-400 from-green-500 hover:dark:to-red-500 hover:dark:from-green-500 transition-colors duration-75 dark:to-blue-400 to-blue-600"
              >
                {title}
              </Text>
              <Text size="sm" className=" mt-2 ">
                {format(new Date(date), "MMM do yyyy")}
              </Text>
            </Link>

            <p className="line-clamp-2 mt-4 mr-12">{description}</p>
          </div>
          <Text className=" mt-2">
            <Text size="sm" title="h3" className="line-clamp-2  mr-12">
              {mins} minute read
            </Text>
          </Text>
        </div>
      </div>
    </div>
  );
};

export { BlogCard };
