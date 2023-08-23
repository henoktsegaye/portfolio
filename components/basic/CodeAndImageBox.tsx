import { Code } from "./code";

type Props = {
  url: string;
  alt?: string;
  limit?: boolean;
  code: string;
};

const CodeAndImageBox = ({ url, alt, limit = true, code }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "40%",
        }}
      >
        <Code className="" children={code} />
      </div>
      <img
        alt={alt}
        src={url}
        className={` my-6 ${limit ? "max-h-96" : ""} w-auto`}
      />
    </div>
  );
};
export default CodeAndImageBox;
