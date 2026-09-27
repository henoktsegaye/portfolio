import { ReactNode, createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext<{ isDark: boolean | null }>({
  isDark: null,
});

const isBrowserSchemeDark = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

// Follows the OS/browser color scheme only. There is no in-app toggle, so
// nothing should ever pin the theme away from the system setting.
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setDarkTheme] = useState<boolean | null>(null);

  useEffect(() => {
    setDarkTheme(isBrowserSchemeDark());

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setDarkTheme(e.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isDark === null) {
      return;
    }
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900");
      document.body.classList.remove("bg-white");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900");
      document.body.classList.add("bg-white");
    }
  }, [isDark]);

  return <ThemeContext.Provider value={{ isDark }}>{children}</ThemeContext.Provider>;
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
