import React, { ReactNode } from "react";
import { Highlight, Language, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";

interface Props {
  children?: ReactNode;
  className?: string;
  inline?: boolean;
}
function Code({ children, className = "", inline = false }: Props) {
  const language = className.replace(/language-/, "") as Language;
  const [copy, setCopy] = React.useState(false);
  const { theme } = useTheme();
  const dark = theme === "dark";
  if (typeof children !== "string") return <></>;
  return (
    <div className="relative code-block">
      <Button
        type="button"
        color="primary"
        size="sm"
        variant="light"
        className="copy-button py-2 transition-opacity opacity-0 absolute top-1 right-5 z-50"
        onClick={() => {
          navigator.clipboard.writeText(children.trim());
          setCopy(true);
          setTimeout(() => {
            setCopy(false);
          }, 10000);
        }}
      >
        {copy ? "Copied!" : "Copy"}
      </Button>
      <Highlight
        theme={dark ? themes.vsDark : themes.vsLight}
        code={children.trim()}
        language={language || "javascript"}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => {
          return (
            <>
              {tokens.length > 0 && (
                <pre
                  className={` relative text-sm overflow-x-auto ${
                    inline ? "inline-block px-5 py-0 " : " py-2 text-base  "
                  } rounded-md ${className}`}
                  style={style}
                >
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })}>
                      {!inline && (
                        <span
                          className={` ${
                            i >= 9 ? "mr-3" : "mr-5"
                          }  dark:text-gray-700 text-gray-300`}
                        >
                          {" "}
                          {i + 1}
                        </span>
                      )}
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </>
          );
        }}
      </Highlight>
    </div>
  );
}

export { Code };
