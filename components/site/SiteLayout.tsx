import { createContext, useContext, useEffect, useState } from "react";
import Meta from "../layout/meta";
import LanguageStrings from "../../lib/lang";
import Header from "./Header";
import Footer from "./Footer";
import SpotlightSearch from "./SpotlightSearch";
import { PostsProvider } from "../../hooks/usePosts";
import { IPostSummary } from "../../types/post";

const { general, socialMedia } = LanguageStrings.en;

const SearchContext = createContext<() => void>(() => {});
export const useOpenSearch = () => useContext(SearchContext);

type Props = {
  children: React.ReactNode;
  posts: IPostSummary[];
  title?: string;
  description?: string;
};

const SiteLayout: React.FC<Props> = ({ children, posts, title, description }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const openSearch = () => setIsSearchOpen(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <PostsProvider posts={posts}>
      <SearchContext.Provider value={openSearch}>
        <div className="flex min-h-screen w-full flex-col bg-white dark:bg-black">
          <Meta
            socialMedia={socialMedia}
            siteString={{
              siteTitle: general.siteTitle,
              siteDescription: general.siteDescription,
            }}
            title={title ?? "homepage"}
            description={description ?? general.siteDescription}
          />
          <Header />
          <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-8">{children}</main>
          <Footer />
          <SpotlightSearch
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        </div>
      </SearchContext.Provider>
    </PostsProvider>
  );
};

export default SiteLayout;
