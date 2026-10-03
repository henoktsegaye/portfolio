import { useMemo, useRef } from "react";
import { GetStaticPaths } from "next";
import Link from "next/link";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import ImageBox from "../../components/basic/imageBox";
import CodeAndImageBox from "../../components/basic/CodeAndImageBox";
import { Code } from "../../components/basic/code";
import { IPost, IPostSummary, ITocItem } from "../../types/post";
import { getPost, getAllPosts } from "../../lib/mdxUtils";
import { getAllPostSummaries } from "../../lib/posts";
import { readingTime } from "../../lib/readingTime";
import { extractToc } from "../../lib/toc";
import SiteLayout from "../../components/site/SiteLayout";
import PostMeta from "../../components/site/PostMeta";
import PostToc from "../../components/site/PostToc";
import KeepReading from "../../components/site/KeepReading";
import { makeHeading } from "../../components/site/PostHeading";
import { ProgressBar, useReadingProgress } from "../../components/site/ReadingProgress";

type Props = {
  source: MDXRemoteSerializeResult;
  frontMatter: Omit<IPost, "slug">;
  posts: IPostSummary[];
  slug: string;
  minutes: number;
  toc: ITocItem[];
};

const baseComponents = {
  ImageBox,
  CodeAndImageBox,
  code: Code,
  img: (props: { src: string; alt?: string; title?: string }) => (
    <ImageBox url={props.src} alt={props.alt} caption={props.title} />
  ),
  Link,
};

const PostPage: React.FC<Props> = ({ source, frontMatter, posts, slug, minutes, toc }) => {
  const articleRef = useRef<HTMLElement>(null);
  const progress = useReadingProgress(articleRef);

  const components = useMemo(
    () => ({
      ...baseComponents,
      h2: makeHeading("h2", toc),
      h3: makeHeading("h3", toc),
      h4: makeHeading("h4", toc),
    }),
    [toc]
  );

  const band = (
    <div className="mx-auto w-full max-w-post px-6 pb-16 pt-14">
      <PostMeta
        long
        date={frontMatter.date}
        category={frontMatter.category}
        readingTime={minutes}
        className="text-ui"
      />
      <h1
        className="mt-4 font-bold text-ink"
        style={{ maxWidth: 820, fontSize: "clamp(2.25rem, 6vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.035em" }}
      >
        {frontMatter.title}
      </h1>
      {frontMatter.description && (
        <p className="mt-5 text-lede text-sub" style={{ maxWidth: 640, lineHeight: 1.55 }}>
          {frontMatter.description}
        </p>
      )}
    </div>
  );

  return (
    <SiteLayout
      posts={posts}
      title={frontMatter.title}
      description={frontMatter.description}
      width="post"
      band={band}
      bandTop={<ProgressBar progress={progress} />}
      showHeaderSearch
      bare
    >
      <div className="mx-auto flex w-full max-w-post flex-wrap px-6 pb-24 pt-14" style={{ gap: "48px 72px" }}>
        <article ref={articleRef} className="blog min-w-0" style={{ flex: "999 1 560px", maxWidth: 680 }}>
          <MDXRemote components={components as unknown as Record<string, React.ReactNode>} {...source} />
        </article>
        <PostToc items={toc} readingTime={minutes} />
      </div>
      <KeepReading slug={slug} />
    </SiteLayout>
  );
};

export default PostPage;

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { content, data } = getPost(params?.slug as string, false);
  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      posts: getAllPostSummaries(),
      slug: params.slug,
      minutes: readingTime(content),
      toc: extractToc(content),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = getAllPosts(["slug"]);
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};
