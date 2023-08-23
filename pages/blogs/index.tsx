// pages/index.tsx
import { useState } from "react";
import Layout from "../../components/layout/layout";
import { IPost } from "../../types/post";
import { getAllPosts } from "../../lib/mdxUtils";
import Footer from "../../components/layout/footer";
import BlogsTeaser from "../../components/homePage/blogsTeaser";
import EmailMe from "../../components/homePage/emailMe";
import LanguageStrings, { langType } from "../../lib/lang";

type Props = {
    files: {
        posts: IPost[];
        works: IPost[];
    };
    localeString: langType;
    locale: "am" | "en";
};

const Blogs: React.FC<Props> = ({ files, localeString, locale }) => {
    const { posts } = files;
    const {
        blog,
        getConnected,
        footer,
        general,
        socialMedia
    } = localeString;

    const [theme, setTheme] = useState<boolean>(false);

    const changeTheme = () => {
        if (!theme) {
            localStorage.setItem("theme", "dark");

            document.documentElement.classList.add("dark");
            document.body.classList.add('bg-black')

        } else {
            localStorage.setItem("theme", "light");

            document.documentElement.classList.remove("dark");
            document.body.classList.remove('bg-black')

        }
        setTheme(!theme);
    };

    return (
        <Layout
            strings={general}
            pageTitle={blog.title}
            pageDescription={blog.description}
            pageImage="/assets/henok-face.jpg"
            changeTheme={changeTheme}
            theme={theme}
            locale={locale}
            allStrings={localeString}
            slug="/blogs"
        >
            <div>

                <BlogsTeaser strings={blog} posts={posts} />
                <EmailMe strings={getConnected} />

                <Footer socialMedia={socialMedia}  footer={footer} />
            </div>
        </Layout>
    );
};

export default Blogs;

export const getStaticProps = async ({
    locale = "en",
}: {
    locale: "am" | "en";
}) => {
    const files = getAllPosts([
        "slug",
        "date",
        "thumbnail",
        "title",
        "description",
        "hashtag",
        "color",
        "tech",
        "type",
    ]);

    const localeString: langType = LanguageStrings[locale];

    return { props: { files, localeString, locale } };
};
