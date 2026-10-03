import { Children, ReactNode, isValidElement } from "react";
import { slugify } from "../../lib/toc";
import { ITocItem } from "../../types/post";

const textOf = (node: ReactNode): string =>
  Children.toArray(node)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") return String(child);
      if (isValidElement(child)) return textOf((child.props as { children?: ReactNode }).children);
      return "";
    })
    .join("");

// MDX heading renderer: adds the anchor id the contents rail links to, and
// the 01, 02… number on the post's main sections.
export const makeHeading = (
  Tag: "h2" | "h3" | "h4",
  items: ITocItem[]
): React.FC<{ children?: ReactNode }> => {
  const HeadingComponent: React.FC<{ children?: ReactNode }> = ({ children }) => {
    const id = slugify(textOf(children));
    const sections = items.filter((item) => item.depth === 0);
    const number = sections.findIndex((item) => item.id === id);
    return (
      <Tag id={id} className={number >= 0 ? "toc-heading" : undefined}>
        {number >= 0 && <span className="toc-num">{String(number + 1).padStart(2, "0")}</span>}
        {children}
      </Tag>
    );
  };
  return HeadingComponent;
};
