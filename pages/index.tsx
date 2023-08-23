import DefaultLayout from "@/layouts/default";
import { getAllPosts } from "@/lib/mdxUtils";
import { Blog } from "@/types/blog";
import { BlogCard } from "@/components/BlogCard";
import { NextSeo } from "next-seo";
import { siteConfig } from "@/config/site";

type Props = {
  posts: Blog[];
};
export default function IndexPage({ posts }: Props) {
  return (
    <DefaultLayout
      head={
        <NextSeo title={siteConfig.name} description={siteConfig.description} />
      }
    >
      <div className=" max-w-screen-lg mx-auto ">
        <div className=" grid py-6 gap-x-12 gap-y-4 grid-cols-1 lg:grid-cols-2">
          {posts.map((el) => (
            <BlogCard key={el.title} blog={el} />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}

export const getStaticProps = async ({ locale = "en" }: { locale: "en" }) => {
  const files = getAllPosts([
    "slug",
    "date",
    "thumbnail",
    "title",
    "description",
    "hashtag",
    "content"
  ]);

  return { props: { posts: files.posts } };
};
