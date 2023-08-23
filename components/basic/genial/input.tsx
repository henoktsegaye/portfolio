import classNames from "classnames";

type InputTypeSupported = "text" | "password" | "search" | "number";

type InputSize = "sm" | "lg" | "xl";

type InputVariant = "primary" | "secondary" | "gray";

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  type: InputTypeSupported;
  size: InputSize;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | string;
  variant: InputVariant;
}

export const Input = ({
  value,
  label,
  onChange,
  size = "lg",
  type,
  variant = "gray",
  ...others
}: InputProps) => {
  const inputClassName = classNames({
    "px-4 py-1 text-sm": size === "sm",
    "px-4 py-1 text-lg": size === "lg",
    "px-8 py-3 text-xl": size === "xl",
    "outline-none rounded  focus:ring-2 bg-transparent border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 ":
      true,
    "focus:border-green-400 dark:focus:border-green-600 ring-green-400 dark:ring-green-600": variant === "primary",
    "focus:border-blue-400 dark:focus:border-blue-600 ring-blue-400 dark:ring-blue-600": variant === "secondary",
    "focus:border-gray-400 dark:focus:border-gray-600 ring-gray-400 dark:ring-gray-600": variant === "gray",
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(type === 'search') {

    } else {
      onChange(e)
    }
  }

  return (
    <div>
      {label && <label> {label}</label>}
      <input
        className={inputClassName}
        type={type}
        value={value}
        onChange={onChange}
        {...others}
      ></input>
    </div>
  );
};
