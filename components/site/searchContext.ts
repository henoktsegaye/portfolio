import { createContext, useContext } from "react";

export const SearchContext = createContext<() => void>(() => {});
export const useOpenSearch = () => useContext(SearchContext);
