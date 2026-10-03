import React, { useCallback, useEffect, useRef, useState } from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import { PrismTheme } from "prism-react-renderer";
import nightOwl from "prism-react-renderer/themes/nightOwl";
import nightOwlLight from "prism-react-renderer/themes/nightOwlLight";

interface Props {
  children: string;
  className?: string;
}

const MIN_LINES_FOR_NUMBERS = 3;

type BlockProps = { code: string; language: Language; theme: PrismTheme };

function CodeBlock({ code, language, theme }: BlockProps) {
  const showLineNumbers = code.split("\n").length >= MIN_LINES_FOR_NUMBERS;

  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollCue = useCallback(() => {
    const el = preRef.current;
    if (!el) return;
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollCue();
    // the hidden theme's block can't measure itself, so re-measure on a theme switch too
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    window.addEventListener("resize", updateScrollCue);
    scheme.addEventListener("change", updateScrollCue);
    return () => {
      window.removeEventListener("resize", updateScrollCue);
      scheme.removeEventListener("change", updateScrollCue);
    };
  }, [code, updateScrollCue]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="code-block relative">
      <button
        type="button"
        className="copy-button absolute right-3 top-2 z-10"
        onClick={copy}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={code}
        language={language}
      >
        {({ className: preClass, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            ref={preRef}
            onScroll={updateScrollCue}
            className={`code-scroll overflow-x-auto ${preClass}`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {showLineNumbers && (
                  <span className="mr-4 inline-block w-5 select-none text-right opacity-40">
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
      </Highlight>
      {canScrollRight && <div className="code-fade" aria-hidden />}
    </div>
  );
}

// Both themes are rendered and CSS shows the one matching the OS setting
// (.code-light / .code-dark in globals.css), so there is no flash of the
// wrong theme while the page loads.
function Code({ children, className = "" }: Props) {
  const language = (className.replace(/language-/, "") || "javascript") as Language;
  const code = children.trim();
  return (
    <>
      <div className="code-light">
        <CodeBlock code={code} language={language} theme={nightOwlLight} />
      </div>
      <div className="code-dark">
        <CodeBlock code={code} language={language} theme={nightOwl} />
      </div>
    </>
  );
}

export { Code };
