import LanguageStrings from "../../lib/lang";
import { widthClass, SiteWidth } from "./width";

const { socialMedia } = LanguageStrings.en;

const links = [
  { label: "GitHub", href: socialMedia.github },
  { label: "LinkedIn", href: socialMedia.linkedIn },
  { label: "Twitter", href: socialMedia.twitter },
  { label: "Email", href: socialMedia.email },
];

const Footer: React.FC<{ width: SiteWidth }> = ({ width }) => (
  <footer
    className={`mx-auto flex w-full flex-wrap items-center justify-between gap-4 px-6 pb-12 pt-8 text-sm text-mute ${widthClass[width]}`}
  >
    <span>© {new Date().getFullYear()} Henok Tsegaye</span>
    <nav aria-label="Elsewhere" className="flex flex-wrap gap-5">
      {links.map(({ label, href }) => (
        <a key={label} href={href} className="text-sub hover:text-ink">
          {label}
        </a>
      ))}
    </nav>
  </footer>
);

export default Footer;
