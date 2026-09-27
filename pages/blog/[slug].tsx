import { GetStaticPaths } from "next";
import Link from "next/link";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import ImageBox from "../../components/basic/imageBox";
import CodeAndImageBox from "../../components/basic/CodeAndImageBox";
import { Code } from "../../components/basic/code";
import { IPost, IPostSummary } from "../../types/post";
import { getPost, getAllPosts } from "../../lib/mdxUtils";
import { getAllPostSummaries } from "../../lib/posts";
import { useTheme } from "../../hooks/useTheme";
import SiteLayout from "../../components/site/SiteLayout";
import PostMeta from "../../components/site/PostMeta";
import PostNav from "../../components/site/PostNav";

type Props = {
  source: MDXRemoteSerializeResult;
  frontMatter: Omit<IPost, "slug">;
  posts: IPostSummary[];
  slug: string;
};

const PostPage: React.FC<Props> = ({ source, frontMatter, posts, slug }) => {
  const { isDark } = useTheme();

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
    Link,
  };

  return (
    <SiteLayout
      posts={posts}
      title={frontMatter.title}
      description={frontMatter.description}
    >
      <Link href="/">
        <a className="mb-6 inline-block font-mono text-xs tracking-wider text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
          ← Back to posts
        </a>
      </Link>
      <h1 className="mb-2 text-lg font-bold leading-tight text-black dark:text-white">
        {frontMatter?.title}
      </h1>
      <div className="mb-6">
        <PostMeta date={frontMatter.date} category={frontMatter.category} />
      </div>

      <article className="blog text-base leading-8">
        <MDXRemote components={components} {...source} />
      </article>

      <PostNav slug={slug} />
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
