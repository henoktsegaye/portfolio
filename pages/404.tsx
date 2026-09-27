import Link from "next/link";
import { IPostSummary } from "../types/post";
import { getAllPostSummaries } from "../lib/posts";
import SiteLayout from "../components/site/SiteLayout";

type Props = {
  posts: IPostSummary[];
};

const NotFound: React.FC<Props> = ({ posts }) => {
  return (
    <SiteLayout posts={posts} title="Page not found">
      <div className="py-16 text-center">
        <h1 className="mb-3 text-2xl font-bold text-black dark:text-white">
          Page not found
        </h1>
        <p className="mb-6 text-sm text-gray-700 dark:text-gray-300">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/">
          <a className="font-mono text-xs tracking-wider text-black underline dark:text-white">
            Go home
          </a>
        </Link>
      </div>
    </SiteLayout>
  );
};

export default NotFound;

export const getStaticProps = async () => {
  return { props: { posts: getAllPostSummaries() } };
};
