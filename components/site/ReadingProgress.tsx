import { useEffect, useState } from "react";

// Share of the article scrolled past, 0..1. `target` is the article element.
export function useReadingProgress(target: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = target.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.5;
      const passed = window.innerHeight * 0.5 - rect.top;
      setProgress(total <= 0 ? 1 : Math.min(1, Math.max(0, passed / total)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [target]);

  return progress;
}

export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div aria-hidden="true" style={{ height: 3, background: "var(--callout)" }}>
    <div
      style={{ width: `${Math.round(progress * 100)}%`, height: 3, background: "var(--accent)", transition: "width .1s linear" }}
    />
  </div>
);
