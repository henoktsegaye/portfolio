import { Code } from "./code";
import ImageBox from "./imageBox";

type Props = {
  url: string;
  alt?: string;
  limit?: boolean;
  code: string;
};

const CodeAndImageBox = ({ url, alt, limit = true, code }: Props) => (
  <div className="my-8 grid items-center gap-6 sm:grid-cols-2">
    <Code>{code}</Code>
    <ImageBox url={url} alt={alt} limit={limit} noPopup />
  </div>
);

export default CodeAndImageBox;
