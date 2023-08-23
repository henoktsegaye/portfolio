import Image from "next/image";
import Link from "next/link";
import { string404 } from "../../lib/lang";

type props = {
  strings: string404;
};

const Display404: React.FC<props> = ({ strings }) => {
  const { title, subTitle, buttonText } = strings;
  return (
    <div className="2xl:max-w-screen-xl mt-20 xl:max-w-screen-lg lg:max-w-screen-md max-w-sm mx-auto my-10">
      <div className="grid lg:grid-cols-1 grid-cols-1 items-center py-10 ">
        <div >
          <div className="text-4xl capitalize font-bold mb-4 text-gray-600 dark:text-gray-100 ">
            {title}
          </div>

          <p className="text-lg text-gray-500 dark:text-gray-400 ">
            {subTitle}
          </p>

          <Link href="/" passHref={true}>
            <button className="bg-blue-600 py-3 px-6 rounded mt-8 text-white">
            <span className="mr-3 transform rotate-180 ">
              &rarr;
                </span>
              {buttonText} 
              
             
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Display404;
