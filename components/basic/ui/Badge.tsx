import classNames from "classnames";

interface BadgeProps {
  label: string;
  active?: boolean;
  className?: string;
}

const Badge = ({ label, active = false, className }: BadgeProps) => {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs uppercase tracking-wide transition-colors",
        {
          "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black":
            active,
          "border-black bg-white text-black dark:border-white dark:bg-black dark:text-white":
            !active,
        },
        className
      )}
    >
      {label}
    </span>
  );
};

export { Badge };
