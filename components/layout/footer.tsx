import { footer, socialMedia } from "../../lib/lang";
import TwitterIcon from "../icons/twitter.svg";
import LinkedInIcon from "../icons/linkedin.svg";
import InstagramIcon from "../icons/instagram.svg";
import EmailIcon from "../icons/email-outline.svg";
import GithubIcon from "../icons/github.svg";
import { Badge, Card } from "../basic/ui";

type props = {
  socialMedia: socialMedia;
  footer?: footer;
  smaller?: boolean;
};

const Footer: React.FC<props> = ({ socialMedia, footer, smaller = false }) => {
  const tools = [
    {
      href: "http://audio-waveform.henoktsegaye.com/",
      title: "Audio Waveform",
      description: "make a video from audio and image",
    },
    {
      href: "http://json-formatter.henoktsegaye.com/",
      title: "JSON Formatter",
      description: "format JSON with syntax highlight",
    },
    {
      href: "http://flow-chart-maker.henoktsegaye.com/",
      title: "Flow Chart Maker",
      description: "build and export flow charts",
    },
  ];

  return (
    <footer className="border-t border-black bg-white py-8 dark:border-white dark:bg-black">
      <div className="mx-auto w-full max-w-screen-lg px-4 lg:px-0">
        <Card className="border-black bg-white p-4 dark:border-white dark:bg-black md:p-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge label="contact" active />
                <p className="font-mono text-xs uppercase tracking-wider text-black dark:text-white">
                  find me online
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <a href={socialMedia.github} aria-label="Github">
                  <GithubIcon width={20} height={20} className="fill-current text-black dark:text-white" />
                </a>
                <a href={socialMedia.linkedIn} aria-label="LinkedIn">
                  <LinkedInIcon width={20} height={20} className="fill-current text-black dark:text-white" />
                </a>
                <a href={socialMedia.twitter} aria-label="Twitter">
                  <TwitterIcon width={20} height={20} className="fill-current text-black dark:text-white" />
                </a>
                <a href={socialMedia.instagram} aria-label="Instagram">
                  <InstagramIcon width={20} height={20} className="fill-current text-black dark:text-white" />
                </a>
                <a href={socialMedia.email} aria-label="Email">
                  <EmailIcon width={20} height={20} className="fill-current text-black dark:text-white" />
                </a>
              </div>
              <p className="text-sm leading-7 text-black dark:text-white">
                Hi, I am Henok Tsegaye. I am a full stack software engineer.
                You can contact me through my social media or email.
              </p>
            </div>

            {!smaller && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge label="tools" active />
                  <p className="font-mono text-xs uppercase tracking-wider text-black dark:text-white">
                    built for productivity
                  </p>
                </div>
                <div className="space-y-3">
                  {tools.map((tool) => (
                    <a
                      key={tool.title}
                      href={tool.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-md border border-black bg-white px-3 py-2 text-sm text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
                    >
                      <p className="font-medium">{tool.title}</p>
                      <p className="text-xs text-current opacity-80">{tool.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-8 border-t border-black pt-4 dark:border-white">
            <p className="font-mono text-xs uppercase tracking-wider text-black dark:text-white">
              {footer?.title ?? "Developed with Next.js and Tailwind CSS."}
            </p>
          </div>
        </Card>
      </div>
    </footer>
  );
};

export default Footer;
