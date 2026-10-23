"use client";

import { useEffect, useRef } from "react";

const values = [
  {
    en: "Excellence",
    tone: "blue",
    motto: "Always do your best",
    icon: "M11.48 3.5a.56.56 0 011.04 0l2.12 5.1 5.5.44c.5.04.7.66.32.98l-4.19 3.59 1.28 5.37a.56.56 0 01-.84.61L12 16.73l-4.71 2.86a.56.56 0 01-.84-.61l1.28-5.37-4.19-3.59a.56.56 0 01.32-.98l5.5-.44 2.12-5.1z",
  },
  {
    en: "Discipline",
    tone: "violet",
    motto: "Small habits, big results",
    icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    en: "Honesty",
    tone: "emerald",
    motto: "Truth, always",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.04A11.96 11.96 0 013.6 6 12 12 0 003 9.75c0 5.6 3.82 10.3 9 11.62 5.18-1.33 9-6.03 9-11.62 0-1.31-.21-2.57-.6-3.75h-.15c-3.2 0-6.1-1.25-8.25-3.29z",
  },
  {
    en: "Creativity",
    tone: "orange",
    motto: "Imagine more",
    icon: "M12 18v-5.25m0 0a6 6 0 001.5-.19m-1.5.19a6 6 0 01-1.5-.19m3.75 7.48a12 12 0 01-4.5 0m3.75 2.38a14.4 14.4 0 01-3 0M14.25 18v-.19c0-.98.66-1.82 1.51-2.32a7.5 7.5 0 10-7.52 0c.85.5 1.51 1.34 1.51 2.32V18",
  },
  {
    en: "Respect",
    tone: "rose",
    motto: "Kind to everyone",
    icon: "M21 8.25c0-2.49-2.1-4.5-4.69-4.5-1.93 0-3.6 1.13-4.31 2.73-.72-1.6-2.38-2.73-4.31-2.73C5.1 3.75 3 5.76 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
  },
  {
    en: "Responsibility",
    tone: "cyan",
    motto: "Own your actions",
    icon: "M12 21c-4.5-2-7-5.5-7-10 0 0 4-1 7 2 3-3 7-2 7-2 0 4.5-2.5 8-7 10zm0 0v-8",
  },
];

type CoinLayout = {
  x: number;
  y: number;
  size: number;
  depth: number;
  dir: 1 | -1;
  phase: number;
};

// Desktop scatter positions (percent of the stage) and per-coin character.
// `dir` alternates spin direction; `phase` keeps the coins out of sync.
const layout: CoinLayout[] = [
  { x: 7, y: 9, size: 200, depth: 0.7, dir: 1, phase: 0.04 },
  { x: 76, y: 5, size: 230, depth: 1, dir: -1, phase: -0.03 },
  { x: 0, y: 50, size: 170, depth: 1.2, dir: -1, phase: 0.06 },
  { x: 84, y: 48, size: 185, depth: 0.8, dir: 1, phase: -0.05 },
  { x: 19, y: 75, size: 160, depth: 1, dir: 1, phase: -0.02 },
  { x: 63, y: 73, size: 175, depth: 1.3, dir: -1, phase: 0.03 },
];

// Small out-of-focus coins drifting behind, for depth.
const bokeh: CoinLayout[] = [
  { x: 35, y: 6, size: 56, depth: 1.8, dir: 1, phase: 0.1 },
  { x: 58, y: 13, size: 42, depth: 2.2, dir: -1, phase: 0.2 },
  { x: 45, y: 86, size: 62, depth: 1.6, dir: 1, phase: 0.3 },
  { x: 94, y: 88, size: 44, depth: 2, dir: -1, phase: 0.15 },
  { x: 6, y: 36, size: 38, depth: 2.4, dir: 1, phase: 0.25 },
];

// Enamel colours for each medallion: light, mid, deep.
const tones: Record<string, [string, string, string]> = {
  blue: ["#60a5fa", "#2563eb", "#1e3a8a"],
  violet: ["#a78bfa", "#7c3aed", "#4c1d95"],
  emerald: ["#34d399", "#059669", "#064e3b"],
  orange: ["#fdba74", "#f97316", "#9a3412"],
  rose: ["#fb7185", "#e11d48", "#881337"],
  cyan: ["#67e8f9", "#0891b2", "#164e63"],
};
const bokehTones = ["orange", "blue", "rose", "emerald", "violet"];

const EDGE_SLICES = 14;

type CoinProps = {
  c: CoinLayout;
  tone: string;
  delay: number;
  className?: string;
  children?: React.ReactNode;
  back?: React.ReactNode;
};

function Coin({ c, tone, delay, className = "", children, back }: CoinProps) {
  const [c1, c2, c3] = tones[tone] ?? tones.blue;
  return (
    <li
      className={`coin-wrap ${className}`}
      aria-hidden={children ? undefined : true}
      style={
        {
          "--x": `${c.x}%`,
          "--y": `${c.y}%`,
          "--size": `${c.size}px`,
          "--depth": c.depth,
          "--dir": c.dir,
          "--phase": c.phase,
          "--delay": `${delay}s`,
          "--c1": c1,
          "--c2": c2,
          "--c3": c3,
        } as React.CSSProperties
      }
    >
      <div className="coin-glow" aria-hidden="true" />
      <div className="coin-shadow" aria-hidden="true" />
      <div className="coin-tilt">
        <div className="coin">
          {Array.from({ length: EDGE_SLICES }, (_, s) => (
            <span
              key={s}
              className="coin-edge"
              style={{ "--i": s / (EDGE_SLICES - 1) } as React.CSSProperties}
              aria-hidden="true"
            />
          ))}
          <div className="coin-face coin-front">{children}</div>
          <div className="coin-face coin-back">{back}</div>
        </div>
      </div>
    </li>
  );
}

export function ValuesCoins() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    function update() {
      frame = 0;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      // -1 when the section enters from below, 0 when centred, +1 when it leaves at the top.
      const v = 1 - (rect.top + rect.height) / ((window.innerHeight + rect.height) / 2);
      section.style.setProperty("--vp", Math.max(-1, Math.min(1, v)).toFixed(4));
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="values-coins relative overflow-hidden bg-[#f6f8ff] py-20 lg:py-0"
      aria-labelledby="values-heading"
    >
      <div className="values-coins-bg absolute inset-0" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:h-[110vh] lg:min-h-[780px]">
        {/* Centre copy */}
        <div className="relative z-10 text-center max-w-2xl mx-auto lg:absolute lg:inset-0 lg:flex lg:flex-col lg:items-center lg:justify-center">
          <span className="inline-block text-amber-500 font-semibold text-sm uppercase tracking-[0.3em] mb-4">
            Our Values
          </span>
          <h2
            id="values-heading"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
          >
            Six values{" "}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-rose-500 bg-clip-text text-transparent">
              we live by
            </span>
          </h2>
          <p className="mt-5 text-slate-600 text-lg leading-relaxed">
            Every VK child carries these with them — in the classroom, on the
            playground, and long after they leave our gates.
          </p>
        </div>

        <ul className="relative mt-14 grid grid-cols-2 sm:grid-cols-3 gap-y-14 lg:mt-0 lg:static lg:block">
          {bokeh.map((c, i) => (
            <Coin key={`b${i}`} c={c} tone={bokehTones[i % bokehTones.length]} delay={-i * 0.9} className="coin-bokeh" />
          ))}
          {values.map((value, i) => (
            <Coin
              key={value.en}
              c={layout[i]}
              tone={value.tone}
              delay={-i * 1.1}
              back={
                <span className="coin-motto" aria-hidden="true">
                  {value.motto}
                </span>
              }
            >
              <svg
                className="coin-icon"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={value.icon} />
              </svg>
              <span
                className="coin-label"
                style={{ fontSize: `calc(var(--cs) * ${value.en.length > 10 ? 0.072 : 0.09})` }}
              >
                {value.en}
              </span>
              <span className="sr-only">— {value.motto}</span>
            </Coin>
          ))}
        </ul>
      </div>
    </section>
  );
}
