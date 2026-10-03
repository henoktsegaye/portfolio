import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Book } from "../../lib/about";

const W = 190;
const H = 280;
const FLIGHT_MS = 2000;
const RISE_PX = 110;
// Slight tilt while it's in the air so the top edge shows, like a real book.
const TILT = -12;
const SPINE_W = 64;

const face: React.CSSProperties = { position: "absolute", backfaceVisibility: "hidden" };
const PAGES = "#f1ead9";
const pageLines =
  "repeating-linear-gradient(90deg, rgba(0,0,0,0.07) 0 1px, transparent 1px 3px)";
const pageLinesAcross =
  "repeating-linear-gradient(0deg, rgba(0,0,0,0.07) 0 1px, transparent 1px 3px)";

type Props = {
  book: Book;
  // Where the spine sits on the shelf; the book starts its flight from here.
  origin: DOMRect;
  onClose: () => void;
};

const BookModal: React.FC<Props> = ({ book, origin, onClose }) => {
  const bookRef = useRef<HTMLDivElement>(null);
  const flight = useRef<Animation | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [closing, setClosing] = useState(false);

  // Scale the book so its spine face lines up with the spine it left.
  const startScale = origin.height / H;
  const depth = Math.min(90, Math.max(38, Math.round(SPINE_W / startScale)));

  useLayoutEffect(() => {
    const el = bookRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const to = el.getBoundingClientRect();
    const dx = origin.left + origin.width / 2 - (to.left + to.width / 2);
    const dy = origin.top + origin.height / 2 - (to.top + to.height / 2);
    const at = (x: number, y: number, s: number, ry: number, rx = 0) =>
      `perspective(1400px) translate(${x}px, ${y}px) scale(${s}) rotateX(${rx}deg) rotateY(${ry}deg)`;
    // One thing at a time: rise off the shelf, flip in place, come forward.
    // Every keyframe uses the same four transform functions so each one is
    // interpolated on its own, which keeps the motion smooth.
    flight.current = el.animate(
      [
        { transform: at(dx, dy, startScale, 90, TILT), offset: 0, easing: "cubic-bezier(0.3, 0, 0.2, 1)" },
        { transform: at(dx, dy - RISE_PX, startScale, 90, TILT), offset: 0.28, easing: "cubic-bezier(0.45, 0, 0.25, 1)" },
        { transform: at(dx, dy - RISE_PX, startScale, 0, TILT), offset: 0.58, easing: "cubic-bezier(0.25, 0.7, 0.2, 1)" },
        { transform: at(0, 0, 1, 0), offset: 1 },
      ],
      { duration: FLIGHT_MS, fill: "both" }
    );
    return () => flight.current?.cancel();
  }, [origin, startScale]);

  const close = () => {
    if (closing) return;
    const anim = flight.current;
    if (!anim) {
      onClose();
      return;
    }
    setClosing(true);
    anim.playbackRate = 2;
    anim.onfinish = onClose;
    anim.reverse();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        background: "rgba(5, 8, 14, 0.72)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        overflowY: "auto",
        opacity: closing ? 0 : 1,
        transition: "opacity 0.45s ease-out",
        animation: "fade-in 0.4s ease-out both",
      }}
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-title"
        className="relative flex w-full max-w-2xl flex-wrap items-center justify-center gap-x-12 gap-y-8 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute flex items-center justify-center rounded-full"
          style={{ top: 8, right: 8, width: 36, height: 36, background: "rgba(255,255,255,0.14)", color: "#e6e9ef" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>

        <div
          aria-hidden="true"
          style={{
            width: W + 20,
            flex: "0 0 auto",
            display: "flex",
            justifyContent: "center",
            filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.5))",
          }}
        >
          <div
            ref={bookRef}
            style={{
              position: "relative",
              width: W,
              height: H,
              // no filter here: a filter would flatten the 3D faces
              transformStyle: "preserve-3d",
            }}
          >
            <div
              style={{
                ...face,
                width: W,
                height: H,
                transform: `translateZ(${depth / 2}px)`,
                borderRadius: "4px 10px 10px 4px",
                overflow: "hidden",
                background: book.bg,
                color: book.fg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 18,
                textAlign: "center",
                fontWeight: 700,
                fontSize: 22,
                lineHeight: 1.2,
              }}
            >
              {book.title}
              {book.cover && (
                <img
                  src={book.cover}
                  alt=""
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
            </div>
            <div
              style={{
                ...face,
                width: depth,
                height: H,
                left: (W - depth) / 2,
                transform: `rotateY(-90deg) translateZ(${W / 2}px)`,
                background: book.bg,
                color: book.fg,
                borderRadius: "4px 0 0 4px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: `${16 / startScale}px 0`,
                boxShadow: "inset -6px 0 8px rgba(0,0,0,0.18), inset 3px 0 4px rgba(255,255,255,0.12)",
              }}
            >
              <span
                className="whitespace-nowrap font-bold"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: 16 / startScale }}
              >
                {book.title}
              </span>
            </div>
            <div
              style={{
                ...face,
                width: W,
                height: H,
                transform: `rotateY(180deg) translateZ(${depth / 2}px)`,
                borderRadius: "10px 4px 4px 10px",
                background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), ${book.bg}`,
              }}
            />
            <div
              style={{
                ...face,
                width: depth,
                height: H - 8,
                top: 4,
                left: (W - depth) / 2,
                transform: `rotateY(90deg) translateZ(${W / 2 - 3}px)`,
                background: `${pageLines}, ${PAGES}`,
              }}
            />
            <div
              style={{
                ...face,
                width: W - 8,
                height: depth,
                left: 4,
                top: (H - depth) / 2,
                transform: `rotateX(90deg) translateZ(${H / 2 - 2}px)`,
                background: `${pageLinesAcross}, ${PAGES}`,
              }}
            />
            <div
              style={{
                ...face,
                width: W - 8,
                height: depth,
                left: 4,
                top: (H - depth) / 2,
                transform: `rotateX(-90deg) translateZ(${H / 2 - 2}px)`,
                background: `${pageLinesAcross}, ${PAGES}`,
                filter: "brightness(0.8)",
              }}
            />
          </div>
        </div>

        <div
          className="min-w-0"
          style={{
            flex: "1 1 260px",
            opacity: closing ? 0 : undefined,
            transition: "opacity 0.2s",
            animation: closing ? undefined : "modal-in 0.5s ease-out 1.5s both",
          }}
        >
          <h3 id="book-title" className="font-bold tracking-tight" style={{ fontSize: 28, lineHeight: 1.2, color: "#f3f5f8" }}>
            {book.title}
          </h3>
          <p className="mt-1 text-base" style={{ color: "#9aa4b2" }}>
            {book.author}
          </p>
          <p className="mt-4 text-lg" style={{ lineHeight: 1.65, color: "#d4d9e1" }}>
            {book.description}
          </p>
          {book.why && (
            <p className="mt-3 text-lg" style={{ lineHeight: 1.65, color: "#d4d9e1" }}>
              {book.why}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookModal;
