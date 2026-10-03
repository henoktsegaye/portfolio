import { ReactNode, useEffect, useState } from "react";
import Meta from "../layout/meta";
import LanguageStrings from "../../lib/lang";
import Header from "./Header";
import Footer from "./Footer";
import SpotlightSearch from "./SpotlightSearch";
import { SearchContext } from "./searchContext";
import { SiteWidth, widthClass } from "./width";
import { PostsProvider } from "../../hooks/usePosts";
import { IPostSummary } from "../../types/post";

const { general, socialMedia } = LanguageStrings.en;

type Props = {
  children: ReactNode;
  posts: IPostSummary[];
  title?: string;
  description?: string;
  width?: SiteWidth;
  // Content shown under the header on a tinted band (the post title block).
  band?: ReactNode;
  // Rendered inside the band, above the header (reading progress).
  bandTop?: ReactNode;
  // Pages that lay out their own content width render children bare.
  bare?: boolean;
  showHeaderSearch?: boolean;
};

const SiteLayout: React.FC<Props> = ({
  children,
  posts,
  title,
  description,
  width = "col",
  band,
  bandTop,
  bare = false,
  showHeaderSearch = false,
}) => {
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

  const header = <Header width={width} showSearch={showHeaderSearch} sticky={!band} />;

  return (
    <PostsProvider posts={posts}>
      <SearchContext.Provider value={openSearch}>
        <div className="flex min-h-screen w-full flex-col bg-page text-ink">
          <Meta
            socialMedia={socialMedia}
            siteString={{
              siteTitle: general.siteTitle,
              siteDescription: general.siteDescription,
            }}
            title={title ?? "homepage"}
            description={description ?? general.siteDescription}
          />
          {band ? (
            <>
              {/* pinned: the header (and reading progress) in the band's tint */}
              <div className="glass-band sticky top-0 z-40">
                {bandTop}
                {header}
              </div>
              <div className="bg-band">{band}</div>
            </>
          ) : (
            header
          )}
          {bare ? (
            <main className="flex-1">{children}</main>
          ) : (
            <main className={`mx-auto w-full flex-1 px-6 pb-24 pt-14 ${widthClass[width]}`}>
              {children}
            </main>
          )}
          <Footer width={width} />
          <SpotlightSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
      </SearchContext.Provider>
    </PostsProvider>
  );
};

export default SiteLayout;
