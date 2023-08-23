import classNames from "classnames";
import { createElement, ReactNode } from "react";
type TextTitles = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
interface TextProps {
  isTitle?: boolean;
  size?: "md" | "sm" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  children?: ReactNode;
  title?: TextTitles;
  bold?: "thin" | "bold" | "extrabold" | "extralight";
  className?: string;
}

const Text = ({
  isTitle = false,
  bold,
  size = "md",
  children = "",
  title,
  className,
}: TextProps) => {
  const classes = classNames({
    "text-sm": size === "sm",
    "text-base ": size === "md",
    "text-lg": size === "lg",
    "text-xl ": size === "xl",
    "text-2xl": size === "2xl",
    "text-3xl": size === "3xl",
    "text-4xl": size === "4xl",
    "text-gray-600 dark:text-gray-400": !isTitle,
    "text-gray-900 dark:text-gray-200": isTitle,
    "font-bold": bold === "bold",
    "font-thin": bold === "thin",
    "font-extrabold": bold === "extrabold",
    "font-extralight": bold === "extralight",
    [className as string]: className !== undefined,
  });

  if (title) {
    return createElement(title, { className: classes }, children);
  }

  return <p className={classes}>{children}</p>;
};

export { Text };
