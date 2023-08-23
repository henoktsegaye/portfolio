import { NavbarComponent } from "components/Navbar";
import { Link } from "@nextui-org/react";
import { Head } from "./head";
import { Button, Divider } from "@nextui-org/react";
import { Tools } from "@/config/site";
import ExternalLinkIcon from "icons/external-link.svg";

export default function DefaultLayout({
  children,
  head,
}: {
  children: React.ReactNode;
  head: React.ReactNode;
}) {
  return (
    <div className="relative   flex flex-col h-screen">
      {head}
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
