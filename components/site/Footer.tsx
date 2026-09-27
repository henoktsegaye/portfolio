import Link from "next/link";
import LanguageStrings from "../../lib/lang";
import GithubIcon from "../icons/github.svg";
import LinkedInIcon from "../icons/linkedin.svg";
import TwitterIcon from "../icons/twitter.svg";
import EmailIcon from "../icons/email-outline.svg";

const { socialMedia } = LanguageStrings.en;

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-gray-600 dark:text-gray-400 sm:flex-row">
        <p className="font-mono text-xs lowercase tracking-wider">
          © {new Date().getFullYear()} Henok Tsegaye
        </p>
        <div className="flex items-center gap-4">
          <a href={socialMedia.github} aria-label="Github">
            <GithubIcon width={16} height={16} className="fill-current hover:text-black dark:hover:text-white" />
          </a>
          <a href={socialMedia.linkedIn} aria-label="LinkedIn">
            <LinkedInIcon width={16} height={16} className="fill-current hover:text-black dark:hover:text-white" />
          </a>
          <a href={socialMedia.twitter} aria-label="Twitter">
            <TwitterIcon width={16} height={16} className="fill-current hover:text-black dark:hover:text-white" />
          </a>
          <a href={socialMedia.email} aria-label="Email">
            <EmailIcon width={16} height={16} className="fill-current hover:text-black dark:hover:text-white" />
          </a>
          <Link href="/about">
            <a className="text-xs hover:text-black dark:hover:text-white">About me</a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
