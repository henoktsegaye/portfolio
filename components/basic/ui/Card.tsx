import classNames from "classnames";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

const Card = ({ children, className, interactive = false }: CardProps) => {
  const classes = classNames(
    "rounded-lg border border-black bg-white dark:border-white dark:bg-black",
    {
      "transition-colors hover:opacity-90":
        interactive,
    },
    className
  );

  return <div className={classes}>{children}</div>;
};

export { Card };
