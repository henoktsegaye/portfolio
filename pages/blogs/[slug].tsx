// pages/blogs/[slug].tsx
import { GetStaticPaths } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import ImageBox from "../../components/basic/imageBox";
import CodeAndImageBox from "../../components/basic/CodeAndImageBox";
import { Code } from "../../components/basic/code";
import { IPost } from "../../types/post";
import { getPost, getAllPosts } from "../../lib/mdxUtils";
import Footer from "../../components/layout/footer";
import LanguageStrings, { langType } from "../../lib/lang";
import Link from "next/link";
import { BlogNav } from "../../components/blog/blogNav";
import { useTheme } from "../../hooks/useTheme";
import { format, isValid } from "date-fns";
import Meta from "../../components/layout/meta";
import { TerminalPanel } from "../../components/basic/ui";

interface returnPath {
  params: {
    slug: string;
  };
  locale: string;
}

type Props = {
  source: MDXRemoteSerializeResult;
  frontMatter: Omit<IPost, "slug">;
  localeString: langType;
  locale: "en" | "am";
  slug: string;
};

const PostPage: React.FC<Props> = ({ source, frontMatter, localeString }: Props) => {
  const { isDark } = useTheme();
  const parsedDate = new Date(frontMatter?.date);
  const publishedDate = isValid(parsedDate)
    ? format(parsedDate, "MMM do yyyy")
    : "Unknown date";

  const { footer, general, socialMedia } = localeString;
  const components = {
    ImageBox,
    CodeAndImageBox,
    code: (props: { className: string; children: string }) => (
      <Code {...props} dark={!isDark} />
    ),
    inlineCode: (props: { className: string; children: string }) => (
      <code
        {...props}
        className={`${!isDark ? "bg-gray-100" : "bg-gray-800"} px-3 py-1 rounded ${
          props.className
        }`}
      />
    ),
    Link: Link,
  };
  return (
    <div className="min-h-screen w-full bg-white dark:bg-black">
      <Meta
        socialMedia={socialMedia}
        siteString={{
          siteTitle: general.siteTitle,
          siteDescription: general.siteDescription,
        }}
        title={frontMatter.title}
        description={frontMatter.description}
      />

      <BlogNav />
      <main className="mx-auto w-full max-w-screen-lg px-4 pb-14 pt-24 lg:px-0">
        <TerminalPanel className="border-black bg-white dark:border-white dark:bg-black">
          <div className="mb-8 border-b border-black pb-6 dark:border-white">
            <p className="font-mono text-xs uppercase tracking-wider text-black dark:text-white">
              Written on {publishedDate}
            </p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight text-black dark:text-white md:text-4xl">
              {frontMatter?.title}
            </h1>
            <p className="mt-3 text-sm text-black dark:text-white md:text-base">
              {frontMatter?.description}
            </p>
          </div>

          <article className="prose prose-zinc max-w-none text-base leading-8 dark:prose-invert">
            <div className="blog">
              <MDXRemote components={components} {...source} />
            </div>
          </article>
        </TerminalPanel>
      </main>
      <Footer socialMedia={socialMedia} footer={footer} smaller />
    </div>
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
  const localeString: langType = LanguageStrings[locale];

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      localeString,
      locale,
      slug: params.slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const { posts } = getAllPosts(["slug"]);
  const enPaths: returnPath[] = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
    locale: "en",
  }));

  const enPathsCopy = [...enPaths];
  const amPaths = enPathsCopy.map((zpath) => ({
    ...zpath,
    locale: "am",
  }));
  const paths = [...amPaths, ...enPaths];

  return {
    paths,
    fallback: false,
  };
};
