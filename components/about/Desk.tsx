import { useRef, useState } from "react";
import { deskObjects, DeskArt, DeskObject } from "./deskObjects";
import DeskModal from "./DeskModal";

const Desk: React.FC = () => {
  const [open, setOpen] = useState<{ object: DeskObject; origin: DOMRect } | null>(null);
  const lastButton = useRef<HTMLButtonElement | null>(null);

  const close = () => {
    setOpen(null);
    // wait for the modal to unmount: the item is still hidden until then
    setTimeout(() => lastButton.current?.focus(), 60);
  };

  return (
    <section aria-labelledby="desk-h" className="mt-24">
      <h2 id="desk-h" className="text-3xl font-bold tracking-tight text-ink" style={{ lineHeight: 1.2 }}>
        My desk
      </h2>
      <p className="mt-2 text-lg text-sub">Everything on it says something about me. Tap anything.</p>

      <div className="mt-7 overflow-x-auto rounded-3xl">
        <div className="relative rounded-3xl" style={{ width: 952, height: 500, background: "var(--desk)" }}>
          {deskObjects.map((object) => (
            <button
              key={object.key}
              type="button"
              aria-label={object.label}
              aria-haspopup="dialog"
              onClick={(e) => {
                lastButton.current = e.currentTarget;
                setOpen({ object, origin: e.currentTarget.getBoundingClientRect() });
              }}
              className="desk-item"
              style={{
                position: "absolute",
                left: object.left,
                top: object.top,
                width: object.width,
                height: object.height,
                padding: 0,
                border: 0,
                background: "transparent",
                cursor: "pointer",
                // the object is "in hand" while its modal is open
                visibility: open?.object.key === object.key ? "hidden" : undefined,
                ["--rot" as string]: `${object.rotate}deg`,
              }}
            >
              <span className="desk-item-art" style={{ display: "block", transform: `rotate(${object.rotate}deg)` }}>
                <DeskArt object={object} />
              </span>
            </button>
          ))}
        </div>
      </div>

      {open && <DeskModal object={open.object} origin={open.origin} onClose={close} />}
    </section>
  );
};

export default Desk;
