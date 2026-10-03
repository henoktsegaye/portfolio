// pages/works/[slug].tsx
import "../../styles/blog.module.css";
import { useState } from "react";
import { GetStaticPaths } from "next";
import Head from "next/head";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import ImageBox from "../../components/basic/imageBox";

import Layout from "../../components/layout/layout";
import { IPost } from "../../types/post";
import { SITE_URL } from "../../lib/constants";
import { getPost, getAllPosts } from "../../lib/mdxUtils";
import Footer from "../../components/layout/footer";
import LanguageStrings, { langType } from "../../lib/lang";
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
  locale: "am" | "en";
  slug: string;
};

const WorksPage: React.FC<Props> = ({
  source,
  frontMatter,
  localeString,
  locale,
  slug,
}: Props) => {
  const [theme, setTheme] = useState<boolean>(false);
  const changeTheme = () => {
    if (!theme) {
      localStorage.setItem("theme", "dark");

      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-black");
    } else {
      localStorage.setItem("theme", "light");

      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-black");
    }
    setTheme(!theme);
  };
  const ogImage = SITE_URL + frontMatter.thumbnail;
  const { footer, general, socialMedia } = localeString;
  return (
    <Layout
      locale={locale}
      pageTitle={frontMatter.title}
      pageDescription={frontMatter.description}
      pageImage={frontMatter.thumbnail}
      strings={general}
      changeTheme={changeTheme}
      theme={theme}
      allStrings={localeString}
      slug={`/works/${slug}`}
    >
      <Head>
        <meta
          name="description"
          content={frontMatter.description}
          key="description"
        />
        <meta
          property="og:description"
          content={frontMatter.description}
          key="ogDescription"
        />
        <meta property="og:image" content={ogImage} key="ogImage" />
      </Head>
      <div className="lg:max-w-screen-lg max-w-sm mx-auto mt-10 pb-10">
        <article className="prose prose-blue">
          <h1 className="text-5xl text-black dark:text-white font-bold mb-4">
            {frontMatter.title}
          </h1>
          <span className="text-gray-500 mb-0 text-xl dark:text-gray-400">
            {frontMatter?.type} | {frontMatter?.date} 
            <span className=" ml-4 ">

            {frontMatter?.tech?.map(el => (<span className="mr-2 text-base text-gray-400 dark:text-gray-600"> {el} </span>))}
            </span>
          </span>

          <div className="text-lg blog ">
            <MDXRemote {...source} components={{ ImageBox } as unknown as Record<string, React.ReactNode>} />
          </div>
        </article>
      </div>
      <Footer socialMedia={socialMedia} footer={footer} smaller />
    </Layout>
  );
};

export default WorksPage;

export const getStaticProps = async ({
  params,
  locale = "en",
}: {
  locale: "am" | "en";
  params: {
    slug: string;
  };
}) => {
  const { content, data } = getPost(params?.slug as string, true);

  const mdxSource = await serialize(content, { scope: data });
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

export const getStaticPaths: GetStaticPaths = async () => {
  const { works } = getAllPosts(["slug"]);
  const enPaths: returnPath[] = works.map((post) => ({
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
