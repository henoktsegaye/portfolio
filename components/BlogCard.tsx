import Link from "next/link";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { Text } from "./genial/Text";
import { Blog } from "@/types/blog";
import { predictReadMinutes } from "@/lib/minuteRead";
import { Code } from "@nextui-org/react";
import Image from "next/image";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const route = useRouter();
  const { title, description, slug, date, content } = blog;
  const mins = predictReadMinutes(content);
  return (
    <div className=" px-2 pb-2 h-50 border rounded-xl border-gray-200 dark:border-gray-800">
      <div
        className={` lg:col-span-6   gap-4   grid-cols-3 items-center cursor-pointer grid   rounded-lg lg:grid-cols-6   `}
        onClick={(e) => {
          e.preventDefault();
          route.push(`/blogs/${slug}`);
        }}
      >
        <div className=" mb-4 bg-gray  rounded-xl  px-4 pb-4 col-span-6  flex flex-col justify-between pr-4 ">
          <div>
            <Image
              objectFit="cover"
              width={500}
              height={300}
              src={blog.thumbnail}
              className=" rounded-xl mb-4 w-full"
              alt={title}
            />
            <Link href={`/blogs/${slug}`}>
              <Text
                isTitle
                size="xl"
                bold="extrabold"
                className=" h-20 line-clamp-2 dark:text-transparent text-transparent dark:bg-clip-text  bg-clip-text dark:bg-gradient-to-r bg-gradient-to-r dark:from-pink-200 from-green-800 leading-10 hover:dark:to-red-100 hover:dark:from-green-100 transition-colors duration-75 dark:to-blue-300 to-blue-900 "
              >
                {title}
              </Text>
              <Text size="xs" className=" mt-2 ">
                {format(new Date(date), "MMM do yyyy")}
              </Text>
            </Link>
            <div className="h-23 mt-4 mr-12">
              <Text size="xs" className="line-clamp-3  ">
                {description}
              </Text>
            </div>
          </div>
          <Text className=" mt-2">
            <Text size="xs" className="line-clamp-2    mr-12">
              {mins} minute read
            </Text>
          </Text>
        </div>
      </div>
    </div>
  );
};

export { BlogCard };
