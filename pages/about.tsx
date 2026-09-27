import { IPostSummary } from "../types/post";
import { getAllPostSummaries } from "../lib/posts";
import SiteLayout from "../components/site/SiteLayout";

type Props = {
  posts: IPostSummary[];
};

const interests = [
  "Building small tools and side projects",
  "Reading books",
  "Trying to experiment with music",
  "Coffee, correctly made",
];

const About: React.FC<Props> = ({ posts }) => {
  return (
    <SiteLayout posts={posts} title="About" description="A bit about Henok Tsegaye.">
      <div className="mb-10">
        <h1 className="mb-2 text-xl font-bold text-black dark:text-white">
          Henok Tsegaye
        </h1>
        <p className="max-w-[52ch] text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          I&apos;m a software engineer who spends most days deep in code, and the
          rest figuring out what else is worth doing with the time. This is
          where I write about both.
        </p>
      </div>

      <p className="mb-4  text-gray-600 dark:text-gray-400">
        Things I like
      </p>
      <ul className="flex flex-col ml-0 gap-3">
        {interests.map((interest) => (
          <li
            key={interest}
            className="flex pl-0 ml-0 gap-2.5 text-sm text-gray-700 dark:text-gray-300"
          >
            <span className="text-gray-600 dark:text-gray-400">→</span>
            {interest}
          </li>
        ))}
      </ul>
    </SiteLayout>
  );
};

export default About;

export const getStaticProps = async () => {
  return { props: { posts: getAllPostSummaries() } };
};
