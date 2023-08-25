import { NavbarComponent } from "components/Navbar";
import { Link } from "@nextui-org/react";
import { Button, Divider } from "@nextui-org/react";
import { Tools } from "@/config/site";
import ExternalLinkIcon from "icons/external-link.svg";
import Head from "next/head";

export default function DefaultLayout({
  children,
  head,
}: {
  children: React.ReactNode;
  head: React.ReactNode;
}) {
  return (
    <div className="relative   flex flex-col h-screen">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#00a300" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#fff" />
        {head}
      </Head>
      <NavbarComponent />
      <main className=" relative contents ">{children}</main>
      <Divider />
      <footer className="w-full max-w-screen-lg lg:px-0 px-3 py-3 mx-auto ">
        <h2 className=" font-bold text-2xl mt-4 mb-1"> Tools to use</h2>
        <p> These are tools I built for myself use them if useful</p>
        <div className=" mt-8 mb-6 grid-cols-1 gap-4 grid md:grid-cols-4">
          {Tools.map((el) => (
            <div
              key={el.title}
              className=" py-2 min-w-[230px] px-4 rounded-xl border dark:border-gray-800 bg-gray-100 dark:bg-gray-800 border-gray-200 "
            >
              <p className="text-lg font-bold mb-4"> {el.title} </p>
              <p className=" text-sm mb-6 h-28 ">{el.description}</p>

              {el.link && (
                <Link target="_blank" href={el.link}>
                  <Button
                    variant="light"
                    type="button"
                    color="primary"
                    size="sm"
                    endContent={
                      <ExternalLinkIcon
                        fill="currentColor"
                        color="primary"
                        width="14px"
                        height="14px"
                      />
                    }
                  >
                    Open
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
