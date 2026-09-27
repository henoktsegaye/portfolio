import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();
  const isAbout = router.pathname === "/about";

  return (
    <header
      className="sticky top-0 z-40 bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-70"
      style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
    >
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-5">
        <Link href="/">
          <a className="text-base font-semibold text-black dark:text-white">
            Henok Tsegaye
          </a>
        </Link>
        <Link href="/about">
          <a
            className={`text-sm ${
              isAbout
                ? "text-black underline dark:text-white"
                : "text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            About me
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
