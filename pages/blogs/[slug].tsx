import { GetStaticPaths } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import ImageBox from "../../components/basic/imageBox";
import CodeAndImageBox from "../../components/basic/CodeAndImageBox";
import { Code } from "../../components/basic/code";
import { getPost, getAllPosts } from "../../lib/mdxUtils";
import Link from "next/link";
import { NextSeo } from "next-seo";

import { format } from "date-fns";
import { Text } from "../../components/basic/genial/text";
import { Blog } from "@/types/blog";
import DefaultLayout from "@/layouts/default";
import { ReactNode } from "react";
import { config } from "process";
import { siteConfig } from "@/config/site";

interface returnPath {
  params: {
    slug: string;
  };
}

type Props = {
  source: MDXRemoteSerializeResult;
  frontMatter: Omit<Blog, "slug">;
  slug: string;
};

const PostPage: React.FC<Props> = ({ slug, source, frontMatter }: Props) => {
  return (
    <DefaultLayout
      head={
        <NextSeo
          title={`${siteConfig.name} - ${frontMatter?.title}`}
          description={frontMatter?.description}
          openGraph={{
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${slug}`,
            title: frontMatter?.title,
            description: frontMatter?.description,
            images: [
              {
                url: frontMatter?.thumbnail,
              },
            ],
            siteName: siteConfig.name,
          }}
        />
      }
    >
      <div className="  border-b dark:border-gray-800  w-full pt-12">
        <div className="lg:max-w-screen-lg flex justify-start items-end max-w-sm mx-auto">
          <div>
          <Text
              size="md"
              className="text-gray-500 block mb-2  dark:text-gray-400"
            >
              {format(new Date(frontMatter?.date), "MMM do yyyy")}
            </Text>
            <Text
              isTitle
              className="mb-6 line-clamp-2 dark:text-transparent text-transparent dark:bg-clip-text  bg-clip-text dark:bg-gradient-to-r bg-gradient-to-r dark:from-pink-200 from-green-800 hover:dark:to-red-100 hover:dark:from-green-100 transition-colors duration-75 dark:to-blue-300 to-blue-900 "
              bold="extrabold"
              size="3xl"
            >
              {frontMatter?.title}
            </Text>
          
          </div>
        </div>
      </div>
      <div className="lg:max-w-screen-lg max-w-sm mx-auto pb-10">
        <article className="prose  prose-blue mt-10">
          <div className="  blog dark:border-gray-900">
            <MDXRemote
              components={{
                ImageBox,
                CodeAndImageBox,
                code: (props: { className?: string; children?: ReactNode }) => {
                  if (
                    typeof props.children === "string" &&
                    props.children.split("\n").length === 1
                  ) {
                    return (
                      <pre className="bg-gray-200 inline-block text-red-500 px-2 rounded py-0 dark:text-red-200 dark:bg-gray-800">
                        {props.children}
                      </pre>
                    );
                  }
                  return <Code {...props} />;
                },

                Link: Link,
              }}
              {...source}
            />
          </div>
        </article>
      </div>
    </DefaultLayout>
  );
};

export default PostPage;

export const getStaticProps = async ({
  params,
  locale = "en",
}: {
  locale: "am" | "en";
  params: {
    slug: string;
  };
}) => {
  const { content, data } = getPost(params?.slug as string, false);
  const mdxSource = await serialize(content, {
    scope: data,
  });

  const { posts } = getAllPosts(["slug"]);

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      slug: params.slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = getAllPosts(["slug"]);
  const enPaths: returnPath[] = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  const paths = [...enPaths];

  return {
    paths,
    fallback: false,
  };
};
