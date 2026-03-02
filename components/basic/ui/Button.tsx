import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "ghost";
type ButtonSize = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = ({
  variant = "ghost",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) => {
  const classes = classNames(
    "inline-flex items-center justify-center rounded-md border font-mono text-xs uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white",
    {
      "px-2.5 py-1.5": size === "sm",
      "px-3 py-2": size === "md",
      "border-black bg-black text-white hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white":
        variant === "primary",
      "border-black bg-white text-black hover:bg-black hover:text-white dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black":
        variant === "ghost",
    },
    className
  );

  return <button type={type} className={classes} {...props} />;
};

export { Button };
