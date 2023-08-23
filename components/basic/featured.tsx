/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

type Props = {
  title: string;
  src: string;
  slug?: string;
  color?: string;
};
// TD: [genial](3) - use next/img and make it readable
const Featured: React.FC<Props> = ({ title, src, slug, color }: Props) => {
  const image = (
    <div className={` bg-transparent py-4`}>
      <div className="mx-auto flex justify-center dark:bg-gray-900 bg-gray-200 rounded-xl py-4 relative ">
        <img
          src={src}
          alt={`Cover Image for ${title}`}
          className="h-96 w-auto rounded-xl"
        />
      </div>
    </div>
  );
  return (
    <>
      {slug ? (
        <Link href={`/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </>
  );
};

export default Featured;
