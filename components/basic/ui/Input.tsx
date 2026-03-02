import classNames from "classnames";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  shell?: boolean;
}

const Input = ({ className, shell = false, ...props }: InputProps) => {
  return (
    <input
      className={classNames(
        "w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition-colors",
        "border-black bg-white text-black placeholder:text-black focus:border-black focus:ring-2 focus:ring-black",
        "dark:border-white dark:bg-black dark:text-white dark:placeholder:text-white dark:focus:border-white dark:focus:ring-white",
        {
          "font-mono text-xs tracking-wide": shell,
        },
        className
      )}
      {...props}
    />
  );
};

export { Input };
