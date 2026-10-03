import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { deskItems } from "../../lib/about";
import { DeskArt, DeskObject } from "./deskObjects";

const FLIGHT_MS = 1400;
const LIFT_PX = 18;
const TARGET = 320;
const MAX_SCALE = 2.4;

type Props = {
  object: DeskObject;
  // Where the object sits on the desk; it grows out of here.
  origin: DOMRect;
  onClose: () => void;
};

const DeskModal: React.FC<Props> = ({ object, origin, onClose }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const flight = useRef<Animation | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [closing, setClosing] = useState(false);
  const details = deskItems[object.key];

  const scale = Math.min(MAX_SCALE, TARGET / Math.max(object.width, object.height));

  useLayoutEffect(() => {
    const el = itemRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const to = el.getBoundingClientRect();
    const dx = origin.left + origin.width / 2 - (to.left + to.width / 2);
    const dy = origin.top + origin.height / 2 - (to.top + to.height / 2);
    const at = (x: number, y: number, s: number, r: number) =>
      `translate(${x}px, ${y}px) scale(${s}) rotate(${r}deg)`;
    // Lift off the desk, then grow and straighten out beside the details.
    flight.current = el.animate(
      [
        { transform: at(dx, dy, 1, object.rotate), offset: 0, easing: "cubic-bezier(0.3, 0, 0.2, 1)" },
        { transform: at(dx, dy - LIFT_PX, 1.08, object.rotate), offset: 0.2, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
        { transform: at(0, 0, scale, 0), offset: 1 },
      ],
      { duration: FLIGHT_MS, fill: "both" }
    );
    return () => flight.current?.cancel();
  }, [origin, object.rotate, scale]);

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
        aria-labelledby="desk-title"
        className="relative flex w-full max-w-3xl flex-wrap items-center justify-center gap-x-12 gap-y-8 p-6"
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
            width: object.width * scale,
            height: object.height * scale,
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.5))",
          }}
        >
          <div ref={itemRef} style={{ flex: "0 0 auto" }}>
            <DeskArt object={object} />
          </div>
        </div>

        <div
          className="min-w-0"
          style={{
            flex: "1 1 260px",
            opacity: closing ? 0 : undefined,
            transition: "opacity 0.2s",
            animation: closing ? undefined : "modal-in 0.5s ease-out 1s both",
          }}
        >
          <p className="font-mono text-xs uppercase" style={{ letterSpacing: "0.08em", color: "#93b4ff" }}>
            {details.object}
          </p>
          <h3 id="desk-title" className="mt-2 font-bold tracking-tight" style={{ fontSize: 28, lineHeight: 1.2, color: "#f3f5f8" }}>
            {details.title}
          </h3>
          <p className="mt-4 text-lg" style={{ lineHeight: 1.65, color: "#d4d9e1" }}>
            {details.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeskModal;
