import classNames from "classnames";
import { ReactNode } from "react";

interface TerminalPanelProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

const TerminalPanel = ({
  title,
  subtitle,
  actions,
  children,
  className,
}: TerminalPanelProps) => {
  const shouldRenderHeader = Boolean(title || subtitle || actions);

  return (
    <section
      className={classNames(
        "overflow-hidden rounded-xl border border-black bg-white dark:border-white dark:bg-black",
        className
      )}
    >
      {shouldRenderHeader && (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-black bg-white px-4 py-3 dark:border-white dark:bg-black">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full border border-black bg-black dark:border-white dark:bg-white" />
            <span className="h-2.5 w-2.5 rounded-full border border-black bg-black dark:border-white dark:bg-white" />
            <span className="h-2.5 w-2.5 rounded-full border border-black bg-black dark:border-white dark:bg-white" />
            <div className="ml-2 flex flex-col">
              {title && (
                <p className="font-mono text-xs uppercase tracking-widest text-black dark:text-white">
                  {title}
                </p>
              )}
              {subtitle && (
                <p className="font-mono text-[11px] text-black dark:text-white">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className="p-4 md:p-6">{children}</div>
    </section>
  );
};

export { TerminalPanel };
