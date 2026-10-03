import { IPostSummary } from "../types/post";
import { getAllPostSummaries } from "../lib/posts";
import SiteLayout from "../components/site/SiteLayout";
import Desk from "../components/about/Desk";
import Shelf from "../components/about/Shelf";

type Props = {
  posts: IPostSummary[];
};

// A paragraph of the intro, kept to a readable line length.
const Row: React.FC<{ first?: boolean; children: React.ReactNode }> = ({ first = false, children }) => (
  <p className={`${first ? "mt-8" : "mt-7"} text-xl text-copy`} style={{ maxWidth: 700, lineHeight: 1.75 }}>
    {children}
  </p>
);

const About: React.FC<Props> = ({ posts }) => (
  <SiteLayout posts={posts} title="About" description="A bit about Henok Tsegaye." width="wide">
    <h1 className="text-display font-bold tracking-tight" style={{ lineHeight: 1.15, letterSpacing: "-0.03em" }}>
      Hi, I&apos;m Henok.
    </h1>

    <Row first>
      I&apos;m a full-stack engineer.
    </Row>
    <Row>
      Away from the screen I read about human behaviour, meaning and productivity. I love to try out music and experiment
      with it. I care more than is reasonable about coffee, and I like growing things: plants
      now, maybe a farm one day.
    </Row>
    <Row>
      This site is where I write about both: the code, and the rest. If something here was
      useful, or wrong,{" "}
      <a href="mailto:maxhenock@gmail.com" className="text-accent underline" style={{ textUnderlineOffset: 3 }}>
        tell me
      </a>
      .
    </Row>

    <Desk />
    <Shelf />
  </SiteLayout>
);

export default About;

export const getStaticProps = async () => {
  return { props: { posts: getAllPostSummaries() } };
};
