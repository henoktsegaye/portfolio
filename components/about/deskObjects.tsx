import { useId } from "react";
import { DeskKey } from "../../lib/about";

export type DeskObject = {
  key: DeskKey;
  label: string;
  left: number;
  top: number;
  width: number;
  height: number;
  // degrees the object sits rotated on the desk
  rotate: number;
  // The illustration, drawn at its natural size. `id` keeps gradient ids
  // unique when the same object is on the desk and in the modal at once.
  art: (id: string) => React.ReactNode;
};

/* ---------- lily: a peace lily in a terracotta pot, seen from the side ---------- */
const LILY_LEAF = "M0 0 C12 -18 24 -46 9 -78 C-6 -50 -10 -20 0 0Z";
const SPATHE = "M0 0 C13 -9 18 -32 2 -52 C-14 -34 -13 -10 0 0Z";

const Lily = (id: string) => {
  // [angle from vertical, length scale, mirrored, shade]
  const back: [number, number, boolean][] = [
    [-18, 1.05, true],
    [14, 1.1, false],
    [-40, 0.95, true],
    [38, 0.98, false],
  ];
  const front: [number, number, boolean][] = [
    [-68, 0.9, true],
    [66, 0.92, false],
    [-52, 0.8, true],
    [50, 0.82, false],
    [-6, 0.78, true],
    [8, 0.74, false],
  ];
  const leaf = ([angle, scale, mirror]: [number, number, boolean], key: string, dark: boolean) => (
    <g key={key} transform={`translate(75 142) rotate(${angle}) scale(${mirror ? -scale : scale} ${scale})`}>
      <path d={LILY_LEAF} fill={`url(#${id}${dark ? "leafd" : "leaf"})`} stroke="rgba(8,40,22,0.4)" strokeWidth="0.9" />
      <path d="M0 -4 C6 -26 12 -50 8 -72" fill="none" stroke="rgba(200,245,210,0.45)" strokeWidth="1.1" />
      <path d="M3 -16 C8 -34 12 -50 9 -64" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  );
  const flower = (x: number, top: number, tilt: number, key: string) => (
    <g key={key}>
      <path d={`M75 142 C${75 + (x - 75) * 0.2} ${142 - (142 - top) * 0.6} ${x} ${top + 30} ${x} ${top}`} fill="none" stroke="#3b7a4a" strokeWidth="2.2" strokeLinecap="round" />
      <g transform={`translate(${x} ${top}) rotate(${tilt})`}>
        <path d={SPATHE} fill={`url(#${id}petal)`} stroke="rgba(0,0,0,0.14)" strokeWidth="0.8" />
        <path d="M0 -3 C3 -18 3 -32 1 -44" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
        <rect x="-2.4" y="-30" width="4.8" height="22" rx="2.4" fill="#e9db82" stroke="rgba(120,100,20,0.35)" strokeWidth="0.6" transform="rotate(4)" />
      </g>
    </g>
  );
  return (
    <>
      <defs>
        <linearGradient id={`${id}pot`} x1="0" x2="1">
          <stop offset="0" stopColor="#c8693c" />
          <stop offset="0.45" stopColor="#e39a6c" />
          <stop offset="1" stopColor="#9c4d2a" />
        </linearGradient>
        <linearGradient id={`${id}leaf`} x1="0" x2="1">
          <stop offset="0" stopColor="#58a468" />
          <stop offset="0.55" stopColor="#2f7347" />
          <stop offset="1" stopColor="#1d5236" />
        </linearGradient>
        <linearGradient id={`${id}leafd`} x1="0" x2="1">
          <stop offset="0" stopColor="#3c8352" />
          <stop offset="1" stopColor="#164a2d" />
        </linearGradient>
        <linearGradient id={`${id}petal`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dce6da" />
        </linearGradient>
      </defs>
      <ellipse cx="75" cy="186" rx="62" ry="6" fill="rgba(0,0,0,0.2)" />
      {back.map((l, i) => leaf(l, `b${i}`, true))}
      {flower(40, 74, -14, "f1")}
      {flower(112, 66, 12, "f2")}
      {flower(78, 56, -3, "f3")}
      {front.map((l, i) => leaf(l, `f${i}`, false))}
      {/* saucer and pot */}
      <ellipse cx="75" cy="182" rx="48" ry="7" fill="#b9582f" />
      <ellipse cx="75" cy="180" rx="48" ry="6.5" fill="#d9825a" />
      <path d="M32 146 H118 L108 182 Q107 186 102 186 H48 Q43 186 42 182 Z" fill={`url(#${id}pot)`} />
      <path d="M28 138 H122 Q125 138 125 142 V150 Q125 153 122 153 H28 Q25 153 25 150 V142 Q25 138 28 138Z" fill={`url(#${id}pot)`} />
      <rect x="25" y="138" width="100" height="4" rx="2" fill="rgba(255,255,255,0.25)" />
      <path d="M52 156 L58 182" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
    </>
  );
};

/* ---------- books: a stack seen from the side ---------- */
const Book: React.FC<{
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
  cover: string;
  spine: string;
  band: string;
}> = ({ id, x, y, w, h, rotate, cover, spine, band }) => (
  <g transform={`rotate(${rotate} ${x + w / 2} ${y + h / 2})`}>
    <rect x={x} y={y} width={w} height={h} rx="4" fill={cover} />
    <rect x={x + 10} y={y + 6} width={w - 13} height={h - 12} rx="2" fill={`url(#${id}pages)`} />
    <rect x={x} y={y} width={w} height="6" rx="3" fill={cover} />
    <rect x={x} y={y + h - 6} width={w} height="6" rx="3" fill={cover} />
    <rect x={x} y={y} width="14" height={h} rx="4" fill={spine} />
    <rect x={x + 3} y={y + 10} width="8" height="2.5" rx="1" fill={band} />
    <rect x={x + 3} y={y + h - 13} width="8" height="2.5" rx="1" fill={band} />
    <rect x={x} y={y} width={w} height={h} rx="4" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8" />
  </g>
);

const Books = (id: string) => (
  <>
    <defs>
      <pattern id={`${id}pages`} width="3" height="3" patternUnits="userSpaceOnUse">
        <rect width="3" height="3" fill="#f6f0e2" />
        <rect width="3" height="0.8" fill="rgba(120,100,70,0.35)" />
      </pattern>
    </defs>
    <ellipse cx="95" cy="158" rx="92" ry="9" fill="rgba(0,0,0,0.18)" />
    <Book id={id} x={8} y={104} w={172} h={50} rotate={-2} cover="#e3d6bf" spine="#c9b793" band="#8a6d3b" />
    <Book id={id} x={20} y={62} w={150} h={44} rotate={2.5} cover="#2c4a8c" spine="#1f356b" band="#e0c16a" />
    <Book id={id} x={30} y={22} w={132} h={42} rotate={-1.5} cover="#7a4f36" spine="#5a3524" band="#e0c16a" />
  </>
);

/* ---------- laptop: a MacBook Pro, open, with the notch and a desktop ---------- */
const Laptop = (id: string) => {
  const rows = 5;
  const keyRows = [];
  for (let r = 0; r < rows; r++) {
    const y = 150 + r * 6.4;
    const left = 36 - r * 2.2;
    const width = 208 + r * 4.4;
    const count = r === 0 ? 15 : 14;
    const kw = width / count;
    const h = r === 0 ? 4.4 : 5.2;
    for (let k = 0; k < count; k++) {
      keyRows.push(<rect key={`${r}-${k}`} x={left + k * kw + 0.5} y={y} width={kw - 1.2} height={h} rx="1.1" fill="#0c0d10" />);
    }
  }
  const dock = ["#ff5f57", "#28c840", "#0a84ff", "#febc2e", "#bf5af2", "#ff9f0a", "#64d2ff"];
  return (
    <>
      <defs>
        <linearGradient id={`${id}lid`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a8e98" />
          <stop offset="1" stopColor="#5b5e66" />
        </linearGradient>
        <linearGradient id={`${id}wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1c2a6b" />
          <stop offset="0.5" stopColor="#7a3fb0" />
          <stop offset="1" stopColor="#ff8a5c" />
        </linearGradient>
        <radialGradient id={`${id}glow`} cx="75%" cy="85%" r="60%">
          <stop offset="0" stopColor="rgba(255,200,120,0.75)" />
          <stop offset="1" stopColor="rgba(255,200,120,0)" />
        </radialGradient>
        <linearGradient id={`${id}deck`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#9a9ea8" />
          <stop offset="1" stopColor="#72757e" />
        </linearGradient>
        <linearGradient id={`${id}glare`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.16)" />
          <stop offset="0.4" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <ellipse cx="140" cy="198" rx="134" ry="6" fill="rgba(0,0,0,0.25)" />
      {/* lid */}
      <rect x="14" y="0" width="252" height="144" rx="11" fill={`url(#${id}lid)`} />
      <rect x="18" y="3" width="244" height="138" rx="8" fill="#050506" />
      {/* display */}
      <rect x="20" y="5" width="240" height="134" rx="6" fill={`url(#${id}wall)`} />
      <rect x="20" y="5" width="240" height="134" rx="6" fill={`url(#${id}glow)`} />
      <path d="M20 112 C70 90 110 130 170 108 S240 96 260 106 V133 Q260 139 254 139 H26 Q20 139 20 133Z" fill="rgba(20,10,60,0.35)" />
      {/* menu bar with notch */}
      <path d="M26 5 H254 Q260 5 260 11 V12 H20 V11 Q20 5 26 5Z" fill="rgba(0,0,0,0.38)" />
      <path d="M125 5 H155 V9 Q155 13 151 13 H129 Q125 13 125 9Z" fill="#050506" />
      <circle cx="30" cy="9" r="2.1" fill="rgba(255,255,255,0.9)" />
      {[38, 52, 64, 76].map((x) => (
        <rect key={x} x={x} y="7.6" width="9" height="2.6" rx="1.3" fill="rgba(255,255,255,0.7)" />
      ))}
      <rect x="226" y="7.6" width="9" height="2.6" rx="1.3" fill="rgba(255,255,255,0.7)" />
      <rect x="238" y="7.6" width="16" height="2.6" rx="1.3" fill="rgba(255,255,255,0.7)" />
      {/* an editor window */}
      <rect x="62" y="30" width="156" height="78" rx="5" fill="rgba(14,18,34,0.94)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
      <rect x="62" y="30" width="156" height="10" rx="5" fill="rgba(255,255,255,0.08)" />
      {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
        <circle key={c} cx={69 + i * 7} cy="35" r="2" fill={c} />
      ))}
      {[
        [70, 49, [18, "#c792ea"], [32, "#82aaff"], [22, "#d6deeb"]],
        [78, 58, [26, "#82aaff"], [40, "#ecc48d"]],
        [78, 67, [16, "#c792ea"], [34, "#d6deeb"], [20, "#7fdbca"]],
        [86, 76, [34, "#d6deeb"], [24, "#ecc48d"]],
        [78, 85, [14, "#c792ea"], [48, "#82aaff"]],
        [70, 94, [22, "#7fdbca"], [14, "#d6deeb"]],
      ].map(([x0, y, ...parts], i) => {
        let x = x0 as number;
        return (
          <g key={i}>
            {(parts as [number, string][]).map(([w, c], k) => {
              const bar = <rect key={k} x={x} y={y as number} width={w} height="3.4" rx="1.7" fill={c} opacity="0.92" />;
              x += w + 4;
              return bar;
            })}
          </g>
        );
      })}
      {/* dock */}
      <rect x="78" y="116" width="124" height="18" rx="7" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />
      {dock.map((c, i) => (
        <rect key={c} x={85 + i * 16.5} y="119.5" width="12" height="12" rx="3.2" fill={c} />
      ))}
      <rect x="18" y="3" width="244" height="138" rx="8" fill={`url(#${id}glare)`} />
      {/* hinge and keyboard deck */}
      <rect x="6" y="143" width="268" height="5" rx="2.5" fill="#4b4e56" />
      <path d="M6 148 H274 L280 186 Q281 193 273 193 H7 Q-1 193 0 186 Z" fill={`url(#${id}deck)`} />
      <path d="M26 149 H254 L262 176 H18 Z" fill="#17181c" />
      {keyRows}
      <rect x="104" y="180" width="72" height="11" rx="2.5" fill="rgba(0,0,0,0.12)" stroke="rgba(0,0,0,0.3)" strokeWidth="0.7" />
      {/* speaker grilles */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={8 + i * 3.2} y="152" width="1.6" height="22" rx="0.8" fill="rgba(0,0,0,0.35)" />
          <rect x={262 - i * 3.2} y="152" width="1.6" height="22" rx="0.8" fill="rgba(0,0,0,0.35)" />
        </g>
      ))}
      <path d="M6 148 H274" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
      <path d="M118 193 Q140 187 162 193" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
    </>
  );
};

/* ---------- journal: an open journal, handwritten pages, ribbon and pen ---------- */
const Journal = (id: string) => {
  const ruled = (x: number) =>
    [30, 41, 52, 63, 74, 85, 96, 107, 118, 129].map((y) => (
      <line key={`${x}-${y}`} x1={x} y1={y} x2={x + 90} y2={y} stroke="rgba(110,130,160,0.35)" strokeWidth="0.7" />
    ));
  const ink = "#243a73";
  const scribble = (x: number, y: number, w: number, seed: number) => {
    let d = `M${x} ${y}`;
    for (let i = 0; i < w; i += 5) d += ` q2 ${i % 2 ? -3 : 3} 5 ${seed % 2 === 0 ? -0.6 : 0.6}`;
    return <path key={`${x}-${y}`} d={d} fill="none" stroke={ink} strokeWidth="1.1" strokeLinecap="round" opacity="0.85" />;
  };
  return (
    <>
      <defs>
        <linearGradient id={`${id}hide`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#97603a" />
          <stop offset="1" stopColor="#64381f" />
        </linearGradient>
        <linearGradient id={`${id}pageL`} x1="0" x2="1">
          <stop offset="0" stopColor="#f7f1e3" />
          <stop offset="0.8" stopColor="#efe6d2" />
          <stop offset="1" stopColor="#cfc2a6" />
        </linearGradient>
        <linearGradient id={`${id}pageR`} x1="0" x2="1">
          <stop offset="0" stopColor="#cfc2a6" />
          <stop offset="0.2" stopColor="#efe6d2" />
          <stop offset="1" stopColor="#f7f1e3" />
        </linearGradient>
        <pattern id={`${id}grain`} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.9" fill="rgba(0,0,0,0.16)" />
          <circle cx="4.5" cy="4.2" r="0.7" fill="rgba(255,255,255,0.08)" />
        </pattern>
        <linearGradient id={`${id}pen`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3a4a78" />
          <stop offset="1" stopColor="#141c36" />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="146" rx="116" ry="6" fill="rgba(0,0,0,0.2)" />
      {/* leather covers */}
      <rect x="0" y="0" width="240" height="144" rx="10" fill={`url(#${id}hide)`} />
      <rect x="0" y="0" width="240" height="144" rx="10" fill={`url(#${id}grain)`} />
      {/* page blocks, with stacked page edges */}
      <path d="M8 10 H120 V136 H8 Z" fill="#e4dac4" />
      <path d="M232 10 H120 V136 H232 Z" fill="#e4dac4" />
      {[0, 1, 2].map((i) => (
        <g key={i} stroke="rgba(120,100,70,0.35)" strokeWidth="0.6">
          <line x1={8 + i * 1.4} y1="10" x2={8 + i * 1.4} y2="136" />
          <line x1={232 - i * 1.4} y1="10" x2={232 - i * 1.4} y2="136" />
        </g>
      ))}
      <path d="M12 8 H120 V134 H12 Q10 134 10 132 V10 Q10 8 12 8Z" fill={`url(#${id}pageL)`} />
      <path d="M228 8 H120 V134 H228 Q230 134 230 132 V10 Q230 8 228 8Z" fill={`url(#${id}pageR)`} />
      <rect x="116" y="8" width="8" height="126" fill="rgba(60,40,20,0.22)" />
      {/* left page: ruled, handwritten */}
      {ruled(20)}
      <text x="24" y="24" fontFamily="'Caveat', 'Segoe Script', cursive" fontSize="11" fill={ink} opacity="0.9">
        Oct 3 —
      </text>
      {[41, 52, 63, 74, 85, 96].map((y, i) => scribble(22, y - 2, [84, 76, 82, 60, 78, 40][i], i))}
      {/* right page */}
      {ruled(132)}
      {[30, 41, 52, 63, 74].map((y, i) => scribble(134, y - 2, [78, 84, 70, 82, 46][i], i + 1))}
      <path d="M150 96 q8 -14 16 0 t16 0 t16 0" fill="none" stroke={ink} strokeWidth="1.2" opacity="0.7" strokeLinecap="round" />
      {/* ribbon */}
      <path d="M121 134 V152 L125 147 L129 152 V134 Z" fill="#a8312f" />
      {/* pen resting on the right page */}
      <g transform="translate(150 118) rotate(-28)">
        <rect x="0" y="-3.4" width="84" height="6.8" rx="3.4" fill={`url(#${id}pen)`} />
        <rect x="56" y="-3.6" width="3" height="7.2" fill="#d9b86a" />
        <rect x="12" y="-1.5" width="36" height="1.5" rx="0.8" fill="#d9b86a" />
        <path d="M0 -3.4 L-12 0 L0 3.4Z" fill="#cfd3da" />
        <rect x="2" y="-2.5" width="76" height="1.1" rx="0.5" fill="rgba(255,255,255,0.3)" />
      </g>
    </>
  );
};

/* ---------- coffee: cup on a saucer with latte art ---------- */
const Coffee = (id: string) => (
  <>
    <defs>
      <radialGradient id={`${id}saucer`} cx="45%" cy="40%" r="70%">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#dcd5c6" />
      </radialGradient>
      <radialGradient id={`${id}cup`} cx="40%" cy="35%" r="75%">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#e4ded1" />
      </radialGradient>
      <radialGradient id={`${id}coffee`} cx="45%" cy="40%" r="65%">
        <stop offset="0" stopColor="#8a5a38" />
        <stop offset="0.7" stopColor="#5a3820" />
        <stop offset="1" stopColor="#35200f" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="49" fill={`url(#${id}saucer)`} stroke="#cfc8b8" strokeWidth="1" />
    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />
    <path d="M80 36 C98 33 99 63 79 62" fill="none" stroke="#d6cfc0" strokeWidth="8" strokeLinecap="round" />
    <path d="M80 36 C98 33 99 63 79 62" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
    <circle cx="46" cy="50" r="34" fill={`url(#${id}cup)`} stroke="#cfc8b8" strokeWidth="1" />
    <circle cx="46" cy="50" r="28" fill={`url(#${id}coffee)`} />
    <circle cx="46" cy="50" r="26" fill="none" stroke="rgba(214,170,120,0.45)" strokeWidth="2" />
    {/* latte art: a leaf in the crema */}
    <g fill="#f0dcc0" opacity="0.92">
      <path d="M46 70 C30 56 34 42 46 36 C58 42 62 56 46 70Z" />
    </g>
    <g fill="#8a5a38" opacity="0.9">
      <path d="M46 66 L46 41" stroke="#8a5a38" strokeWidth="1.2" />
      <path d="M46 58 L38 52 M46 58 L54 52 M46 50 L40 45 M46 50 L52 45" stroke="#8a5a38" strokeWidth="1" fill="none" />
    </g>
    <path d="M20 40 A28 28 0 0 1 36 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" />
  </>
);

/* ---------- mixer: a four-channel DJ mixer, seen from above ---------- */
const Mixer = (id: string) => {
  const channels = [28, 68, 108, 148];
  const eq: [number, string][] = [
    [22, "#ff6b5e"],
    [42, "#f2c14e"],
    [62, "#5aa9ff"],
  ];
  const faderY = [128, 118, 134, 122];
  const knobAngles = [[-40, 20, -90], [30, -60, 50], [-120, 10, 70], [60, -20, -50]];
  const leds = ["#3ddc84", "#3ddc84", "#3ddc84", "#f2c14e", "#ff5a4d"];
  return (
    <>
      <defs>
        <linearGradient id={`${id}body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a3d46" />
          <stop offset="1" stopColor="#17181d" />
        </linearGradient>
        <radialGradient id={`${id}knob`} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#6a6f7a" />
          <stop offset="1" stopColor="#1f2127" />
        </radialGradient>
        <linearGradient id={`${id}cap`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f0f2f5" />
          <stop offset="1" stopColor="#9aa1ad" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="180" height="180" rx="12" fill={`url(#${id}body)`} />
      <rect x="1" y="1" width="178" height="178" rx="11" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
      <rect x="8" y="8" width="164" height="164" rx="8" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
      {channels.map((cx, c) => (
        <g key={cx}>
          {/* level meter */}
          {leds.map((color, i) => (
            <rect key={`l${i}`} x={cx - 8 + i * 3.6} y="14" width="2.6" height="4" rx="1" fill={color} opacity={i < 3 + (c % 2) ? 1 : 0.25} />
          ))}
          {/* EQ knobs: hi, mid, low */}
          {eq.map(([y, ring], k) => (
            <g key={y} transform={`translate(${cx} ${y + 6})`}>
              <circle r="9" fill="none" stroke={ring} strokeWidth="1.4" opacity="0.8" />
              <circle r="7" fill={`url(#${id}knob)`} stroke="rgba(0,0,0,0.5)" strokeWidth="0.8" />
              <path d="M0 -1 L0 -6" stroke="#f4f5f7" strokeWidth="1.6" strokeLinecap="round" transform={`rotate(${knobAngles[c][k]})`} />
            </g>
          ))}
          {/* channel fader */}
          <rect x={cx - 2} y="96" width="4" height="52" rx="2" fill="#07080a" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
          {[0, 1, 2, 3, 4, 5].map((t) => (
            <rect key={t} x={cx - 9} y={98 + t * 9.6} width="4" height="1" fill="rgba(255,255,255,0.35)" />
          ))}
          <rect x={cx - 8} y={faderY[c]} width="16" height="9" rx="2" fill={`url(#${id}cap)`} stroke="rgba(0,0,0,0.5)" strokeWidth="0.8" />
          <rect x={cx - 6} y={faderY[c] + 4} width="12" height="1.2" fill="rgba(0,0,0,0.55)" />
        </g>
      ))}
      {/* crossfader */}
      <rect x="40" y="158" width="100" height="5" rx="2.5" fill="#07080a" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
      <rect x="82" y="154" width="16" height="13" rx="2" fill={`url(#${id}cap)`} stroke="rgba(0,0,0,0.5)" strokeWidth="0.8" />
      <rect x="88" y="158" width="4" height="5" fill="rgba(0,0,0,0.6)" />
    </>
  );
};

export const deskObjects: DeskObject[] = [
  { key: "lily", label: "Lily — growing things", left: 56, top: 30, width: 150, height: 192, rotate: 0, art: Lily },
  { key: "books", label: "Book stack — what I read", left: 64, top: 260, width: 190, height: 170, rotate: 0, art: Books },
  { key: "laptop", label: "MacBook Pro — my work", left: 300, top: 96, width: 280, height: 202, rotate: 0, art: Laptop },
  { key: "journal", label: "Open journal — this blog", left: 310, top: 330, width: 240, height: 152, rotate: -4, art: Journal },
  { key: "coffee", label: "Coffee cup", left: 630, top: 70, width: 100, height: 100, rotate: 0, art: Coffee },
  { key: "mixer", label: "Mixer — music", left: 640, top: 220, width: 180, height: 180, rotate: 0, art: Mixer },
];

// The object's illustration on its own, used on the desk and again in the modal.
export const DeskArt: React.FC<{ object: DeskObject }> = ({ object }) => {
  const id = `${useId().replace(/[^a-zA-Z0-9]/g, "")}${object.key}`;
  return (
    <svg
      width={object.width}
      height={object.height}
      viewBox={`0 0 ${object.width} ${object.height}`}
      style={{ display: "block", overflow: "visible" }}
      role="presentation"
    >
      {object.art(id)}
    </svg>
  );
};
