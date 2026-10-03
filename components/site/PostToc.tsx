import { useEffect, useState } from "react";
import { ITocItem } from "../../types/post";

type Props = {
  items: ITocItem[];
  readingTime: number;
};

const PostToc: React.FC<Props> = ({ items, readingTime }) => {
  let section = 0;
  const [active, setActive] = useState(items[0]?.id);

  // The active section is the last heading that has scrolled past the top third.
  useEffect(() => {
    const update = () => {
      const line = window.innerHeight / 3;
      let current = items[0]?.id;
      items.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      });
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [items]);

  // Sub-sections only show under the main section being read, so long posts
  // keep a short rail.
  let parent = -1;
  const parentOf = items.map((item, i) => {
    if (item.depth === 0) parent = i;
    return parent;
  });
  const activeIndex = Math.max(0, items.findIndex((item) => item.id === active));
  const visible = items.filter((item, i) => item.depth === 0 || parentOf[i] === parentOf[activeIndex]);

  return (
    <aside className="min-w-0" style={{ flex: "1 1 200px", maxWidth: 240 }}>
      <div className="sticky" style={{ top: 120 }}>
        {items.length > 1 && (
          <>
            <p className="font-semibold uppercase text-mute" style={{ fontSize: 13, letterSpacing: "0.06em" }}>
              On this page
            </p>
            <nav aria-label="On this page" className="mt-3.5 flex flex-col gap-0.5">
              {visible.map((item) => {
                const on = item.id === active;
                const main = item.depth === 0;
                if (main) section += 1;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={on ? "location" : undefined}
                    className={`flex items-center rounded-lg ${main ? "text-ui" : "text-sm"} ${
                      on ? "bg-callout font-semibold text-accent" : "text-sub hover:text-ink"
                    }`}
                    style={{ minHeight: main ? 36 : 30, paddingLeft: 12 + item.depth * 16 }}
                  >
                    {main && (
                      <span
                        className={`mr-2.5 font-mono ${on ? "text-accent" : "text-mute"}`}
                        style={{ fontSize: 12 }}
                      >
                        {String(section).padStart(2, "0")}
                      </span>
                    )}
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </>
        )}
        <p className={`${items.length > 1 ? "mt-7" : ""} text-sm text-mute`}>
          {readingTime} min read
        </p>
      </div>
    </aside>
  );
};

export default PostToc;
