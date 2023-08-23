import Image from "next/image";
import Link from "next/link";
import { link } from "../../lib/lang";

type props = {
  title: string;
  content: string[];
  link: link;
};

const MiddleContent: React.FC<props> = ({ title, content, link }) => {
  return (
    <div className="2xl:max-w-screen-xl bg-gradient-to-br from-blue-50 dark:from-gray-900 border  via-gray-50 dark:via-gray-900 to-gray-100  dark:to-black px-10 rounded-3xl xl:max-w-screen-lg lg:max-w-screen-md max-w-sm mx-auto  border-gray-50 dark:border-gray-900 my-10" id="middleContent">
      <div className="grid lg:grid-cols-2 grid-cols-1 items-center py-10 ">
        <div className="order-2 lg:order-1">
          <h3 className="text-3xl font-bold mb-10 text-black  dark:text-gray-100 ">
            {title}
          </h3>
          {content.map((text, index) => (
            <p
              key={`data${index}`}
              className="text-lg font-normal dark:text-gray-400 "
            >
              {text}
            </p>
          ))}
          <Link href={link.href} passHref={true}>
            <button className=" py-1  text-lg font-normal rounded-lg mt-8 dark:text-white text-blue-800">
              {link.text} &rarr;
            </button>
          </Link>
        </div>
        <div className="order-1 lg:order-2">
          <Image
            src="/assets/pic-3.png"
            alt={`Cover Image `}
            width={1280}
            height={720}
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};
export default MiddleContent;
