import Link from "next/link";
import { useTheme } from "../../hooks/useTheme";
import MoonIcon from "../icons/moon-outline.svg";
import SunIcon from "../icons/sun-outline.svg";
import { Button } from "../basic/ui";

interface BlogNavProps {}
const BlogNav = ({}: BlogNavProps) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="dark:text-white">
      <div
        className="fixed top-0 z-50 w-full border-b border-black bg-white backdrop-blur dark:border-white dark:bg-black"
        style={{
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="mx-auto flex w-full max-w-screen-xl flex-row items-center justify-between px-3 py-3 lg:px-0">
          <div className="grid grid-cols-4 items-center gap-8">
            <Link href="/">
              <a className="flex items-center gap-3">
                <img
                  src="/assets/logo1.png"
                  alt="Henok logo"
                  className="mt-1 h-10 cursor-pointer rounded"
                />
                <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-black dark:text-white md:inline">
                  henok terminal
                </span>
              </a>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {isDark ? (
                <MoonIcon
                  width={18}
                  height={18}
                  className="fill-current text-black dark:text-white"
                />
              ) : (
                <SunIcon
                  width={18}
                  height={18}
                  className="fill-current text-black dark:text-white"
                />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BlogNav };
