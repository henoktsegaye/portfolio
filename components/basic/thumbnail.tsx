// components/Thumbnail.tsx
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const Thumbnail: React.FC<Props> = ({ title, src, slug }: Props) => {
  const image = (
    <div className="w-full h-56 mx-auto bg-transparent relative ">
      <Image
        src={src}
        alt={`Cover Image for ${title}`}
        layout="fill"
        objectFit="cover"
        className="rounded-xl"
      />
    </div>
  );
  return (
    <>
      {slug ? (
        <Link href={`/blogs/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </>
  );
};

export default Thumbnail;
