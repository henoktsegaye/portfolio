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
import { useRouter } from "next/router";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

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
  const { onOpenChange, onOpen, isOpen } = useDisclosure();

  const router = useRouter();
  const host = process.env.NEXT_PUBLIC_HOST;
  return (
    <DefaultLayout
      head={
        <NextSeo
          title={`${siteConfig.name} - ${frontMatter?.title}`}
          description={frontMatter?.description}
          twitter={{
            handle: "@henokcode",
            site: "@site",
            cardType: "summary_large_image",
          }}
          openGraph={{
            url: `${host}${router.asPath}`,
            title: frontMatter?.title,
            description: frontMatter?.description,
            images: [
              {
                url: `${host}${frontMatter?.thumbnail}`,
              },
            ],

            siteName: siteConfig.name,
          }}
        />
      }
    >
      <Modal size="2xl"  isOpen={isOpen} onClose={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Send message{" "}
          </ModalHeader>
          <ModalBody>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfq4ZfNd3iSTmfbQfPtcpn8fanFfcRrbAvNPM0kVFhfEKjDLw/viewform?embedded=true"
              width="100%"
              height="861"
             >
              Loading...
            </iframe>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div
        className="border-b dark:border-gray-800  w-full   "
        style={{
          backgroundImage: `url(${frontMatter?.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className=" pt-40 bg-gradient-to-b from-transparent to-gray-400 dark:from-transparent  dark:to-black  ">
          <div className="lg:max-w-screen-lg flex justify-start items-end max-w-sm mx-auto ">
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
      </div>
      <div className="lg:max-w-screen-lg xl:max-w-screen-xl max-w-sm relative mx-auto flex pb-10">
        <Content source={source} className="mt-10  w-9/12 pr-2" />

        <div className="sticky h-[200px] mt-9  top-20  w-3/12 ">
          <div className=" border top-10 border-gray-200 dark:border-gray-800 p-3 rounded-md ">
            <p className="text-medium font-bold  ">Hello fellow developer 👋🏾</p>
            <hr className="border-gray-200 dark:border-gray-700  my-3" />

            <p className="text-xs ">
              Looking for expert assistance with your web application
              development or code review?
            </p>
            <p className="text-xs  mb-3 ">
              Feel free to send me a message or email to discuss your specific
              needs
            </p>
            <hr className="border-gray-200 dark:border-gray-700  my-3" />

            <div className="flex gap-3 justify-end">
              <a id="email-me" href="mailto:maxhenock@gmail.com">
                <Button variant="light">Email me</Button>
              </a>
              <Button
                onClick={onOpen}
                color="primary"
                id="send-message"
                variant="light"
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
              >
                Send message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export function Content({
  source,
  className,
}: {
  source: MDXRemoteSerializeResult;
  className?: string;
}) {
  return (
    <article className={`prose  prose-blue  ${className ?? ""} `}>
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
  );
}

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

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      slug: params.slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await getAllPosts(["slug"]);
  const enPaths: returnPath[] = posts.map((post) => ({
    params: {
      slug: post.slug as string,
    },
  }));

  const paths = [...enPaths];

  return {
    paths,
    fallback: false,
  };
};
