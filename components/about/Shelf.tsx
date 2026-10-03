import { useRef, useState } from "react";
import { books, Book } from "../../lib/about";
import BookModal from "./BookModal";

const Shelf: React.FC = () => {
  const [open, setOpen] = useState<{ book: Book; origin: DOMRect } | null>(null);
  const lastSpine = useRef<HTMLButtonElement | null>(null);

  const close = () => {
    setOpen(null);
    // wait for the modal to unmount: the item is still hidden until then
    setTimeout(() => lastSpine.current?.focus(), 60);
  };

  return (
    <section aria-labelledby="shelf-h" className="mt-24">
      <h2 id="shelf-h" className="text-3xl font-bold tracking-tight text-ink" style={{ lineHeight: 1.2 }}>
        Books I recommend
      </h2>
      <p className="mt-2 text-lg text-sub">Pull one off the shelf.</p>

      <div className="mt-6 overflow-x-auto">
        <div
          className="flex items-end gap-2 px-4 pt-8"
          style={{ minWidth: 640, borderBottom: "8px solid var(--shelf)" }}
        >
          {books.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={(e) => {
                lastSpine.current = e.currentTarget;
                setOpen({ book: b, origin: e.currentTarget.getBoundingClientRect() });
              }}
              aria-haspopup="dialog"
              aria-label={`${b.title}, ${b.author}`}
              className="spine flex flex-shrink-0 flex-col items-center justify-start"
              style={{
                width: 64,
                height: b.height,
                padding: "16px 0",
                border: 0,
                borderRadius: "4px 4px 0 0",
                cursor: "pointer",
                font: "inherit",
                background: b.bg,
                color: b.fg,
                // the book is "in hand" while its modal is open
                visibility: open?.book.id === b.id ? "hidden" : undefined,
              }}
            >
              <span
                className="whitespace-nowrap text-ui font-bold"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {b.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {open && <BookModal book={open.book} origin={open.origin} onClose={close} />}
    </section>
  );
};

export default Shelf;
