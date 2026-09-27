import { createContext, ReactNode, useContext } from "react";
import { IPostSummary } from "../types/post";

const PostsContext = createContext<IPostSummary[]>([]);

// Seeded once by SiteLayout from the page's getStaticProps. Anything that
// needs "all the posts" (the home list, spotlight search) reads it from
// here instead of being passed its own copy.
export const PostsProvider: React.FC<{
  posts: IPostSummary[];
  children: ReactNode;
}> = ({ posts, children }) => (
  <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
);

export const usePosts = () => useContext(PostsContext);
