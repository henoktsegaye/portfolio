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
      <h1 className="text-display font-bold tracking-tight" style={{ lineHeight: 1.15, letterSpacing: "-0.03em" }}>
        Page not found
      </h1>
      <p className="mt-6 text-lg text-sub">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/">
        <a className="mt-4 inline-block text-lg text-accent underline" style={{ textUnderlineOffset: 3 }}>
          Go home
        </a>
      </Link>
    </SiteLayout>
  );
};

export default NotFound;

export const getStaticProps = async () => {
  return { props: { posts: getAllPostSummaries() } };
};
