/* eslint-disable @next/next/no-img-element */
import { FC, useState } from "react";
import Lightbox from "react-image-lightbox";

type Props = {
  url: string;
  alt?: string;
  limit?: boolean;
  noPopup?: boolean;
};
const ImageBox = ({ url, alt, limit = true, noPopup = false }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <img
        alt={alt}
        src={url}
        className={`cursor-pointer ${!noPopup ? "hover:shadow-2xl" : ""} my-6 ${
          limit ? "max-h-96" : ""
        } w-auto`}
        onClick={() => !noPopup && setIsOpen(!isOpen)}
      />
      {isOpen ? (
        <Lightbox mainSrc={url} onCloseRequest={() => setIsOpen(false)} />
      ) : null}
    </>
  );
};
export default ImageBox;
