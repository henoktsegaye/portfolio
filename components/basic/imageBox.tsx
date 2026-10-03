import { useState } from "react";
import Lightbox from "react-image-lightbox";

type Props = {
  url: string;
  alt?: string;
  caption?: string;
  limit?: boolean;
  noPopup?: boolean;
};

// span rather than figure: markdown wraps images in <p>, where <figure> is invalid.
const ImageBox = ({ url, alt, caption, limit = true, noPopup = false }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <span className="figure">
        <img
          alt={alt}
          src={url}
          className={noPopup ? "" : "cursor-zoom-in"}
          style={limit ? undefined : { maxHeight: "none" }}
          onClick={() => !noPopup && setIsOpen(true)}
        />
        {caption && <span className="figure-caption">{caption}</span>}
      </span>
      {isOpen ? (
        <Lightbox mainSrc={url} onCloseRequest={() => setIsOpen(false)} />
      ) : null}
    </>
  );
};
export default ImageBox;
