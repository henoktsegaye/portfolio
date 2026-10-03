import Link from "next/link";
import { useRouter } from "next/router";
import { useOpenSearch } from "./searchContext";
import { widthClass, SiteWidth } from "./width";

const NavLink: React.FC<{ href: string; active: boolean; children: string }> = ({
  href,
  active,
  children,
}) => (
  <Link href={href}>
    <a
      aria-current={active ? "page" : undefined}
      className={`text-ui ${active ? "font-medium text-accent" : "text-sub hover:text-ink"}`}
    >
      {children}
    </a>
  </Link>
);

const SearchButton: React.FC = () => {
  const openSearch = useOpenSearch();
  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Search posts"
      className="flex items-center gap-2 rounded-full bg-page px-3 text-sm text-sub hover:text-ink"
      style={{ minHeight: 40 }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <span className="font-mono text-xs">⌘K</span>
    </button>
  );
};

type Props = { width: SiteWidth; showSearch?: boolean; sticky?: boolean };

const Header: React.FC<Props> = ({ width, showSearch = false, sticky = false }) => {
  const { pathname } = useRouter();
  const isAbout = pathname === "/about";

  const bar = (
    <header
      className={`mx-auto flex w-full items-center justify-between gap-4 px-6 ${widthClass[width]}`}
      style={{ height: 88 }}
    >
      <Link href="/">
        <a className="text-xl font-semibold tracking-tight text-ink">Henok Tsegaye</a>
      </Link>
      <nav aria-label="Primary" className="flex items-center gap-5">
        <NavLink href="/" active={!isAbout}>
          Writing
        </NavLink>
        <NavLink href="/about" active={isAbout}>
          About
        </NavLink>
        {showSearch && <SearchButton />}
      </nav>
    </header>
  );

  return sticky ? <div className="glass sticky top-0 z-40">{bar}</div> : bar;
};

export default Header;
