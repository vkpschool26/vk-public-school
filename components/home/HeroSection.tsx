"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SCHOOL_GRADE_RANGE } from "@/lib/data/school";

// Stock photos of Indian schoolchildren (Unsplash) — swap for real VK photos when available.
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1698993082050-19ca94c62fb8?w=1600&q=75";

const sideCards = [
  {
    src: "https://images.unsplash.com/photo-1767783703531-536ea0c32478?w=900&q=80",
    alt: "Young girl with an Indian flag cap and tricolour face paint",
    label: "Independence Day",
    focus: "60% 15%",
    side: "left",
    slot: "far",
  },
  {
    src: "https://images.unsplash.com/photo-1692269725911-87697c558be1?w=900&q=80",
    alt: "Two schoolgirls in uniform writing in their notebooks at a classroom desk",
    label: "Curious minds",
    focus: "40% 75%",
    side: "left",
    slot: "near",
  },
  {
    src: "https://images.unsplash.com/photo-1761365361648-3968a6b588a6?w=900&q=80",
    alt: "Little girl smiling brightly with her hands on her ears",
    label: "Happy learners",
    focus: "50% 35%",
    side: "right",
    slot: "near",
  },
  {
    src: "https://images.unsplash.com/photo-1585735197098-b96a813183c6?w=900&q=80",
    alt: "Two young boys smiling with their chins in their hands",
    label: "Little friends",
    focus: "30% 40%",
    side: "right",
    slot: "far",
  },
] as const;

const chips = [
  {
    title: "Activity-based learning",
    text: "Hands-on, every single day",
    color: "bg-blue-600",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    pos: { top: "12%", right: "5%" },
  },
  {
    title: "300+ happy students",
    text: "And growing every year",
    color: "bg-amber-500",
    icon: "M11.48 3.5a.56.56 0 011.04 0l2.12 5.1 5.5.44c.5.04.7.66.32.98l-4.19 3.59 1.28 5.37a.56.56 0 01-.84.61L12 16.73l-4.71 2.86a.56.56 0 01-.84-.61l1.28-5.37-4.19-3.59a.56.56 0 01.32-.98l5.5-.44 2.12-5.1z",
    pos: { top: "30%", right: "3%" },
  },
  {
    title: "Safe, caring campus",
    text: "Small classes, big attention",
    color: "bg-emerald-600",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    pos: { top: "70%", right: "4%" },
  },
];

const stats = [
  { label: "Students", value: "300+" },
  { label: "Teachers", value: "20+" },
  { label: "Grades", value: "Nursery – 5" },
];

/**
 * Revolut-style hero: a full-bleed photo that "zooms out" into a rounded card
 * as the visitor scrolls, while sibling cards slide in on either side.
 * Scroll progress (0 → 1) is written to the `--p` CSS variable; all motion is
 * derived from it in CSS so React never re-renders during scroll.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reduced motion: CSS renders a static full-bleed hero instead.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    function update() {
      frame = 0;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const travel = section.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / travel));
      section.style.setProperty("--p", p.toFixed(4));
      // Once the intro copy has faded out, take its links out of reach.
      section.toggleAttribute("data-zoomed", p > 0.18);
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
      className="hero-zoom relative h-[260vh] bg-slate-950"
      aria-label="Hero section"
    >
      <div className="sticky overflow-hidden">
        {/* Background glow revealed as the photo shrinks */}
        <div className="hero-bg absolute inset-0" aria-hidden="true" />

        {/* Heading revealed above the shrunk card */}
        <div className="hero-after absolute inset-x-0 px-4 text-center">
          <p className="text-amber-400 font-semibold text-xs sm:text-sm uppercase tracking-[0.3em] mb-3">
            {SCHOOL_GRADE_RANGE} · Balapura
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance">
            Where little minds{" "}
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              grow big
            </span>
          </h2>
        </div>

        {/* Side cards */}
        {sideCards.map((card) => (
          <figure
            key={card.src}
            className={`hero-side hero-side-${card.side} hero-side-${card.slot} absolute hidden md:block overflow-hidden rounded-[28px] shadow-2xl shadow-black/40`}
          >
            <Image
              src={card.src}
              alt={card.alt}
              fill
              sizes="22vw"
              className="object-cover"
              style={{ objectPosition: card.focus }}
            />
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-slate-900">
              {card.label}
            </figcaption>
          </figure>
        ))}

        {/* Main photo — clipped from full screen down to a rounded card */}
        <div className="hero-main absolute inset-0 overflow-hidden">
          <div className="hero-main-img absolute inset-0">
            <div className="hero-kb absolute inset-0">
              <Image
                src={HERO_IMAGE}
                alt="Smiling schoolboy in a white shirt and tie reading with classmates in uniform"
                fill
                preload
                sizes="100vw"
                className="object-cover -scale-x-100 saturate-[1.15] contrast-[1.05]"
              />
            </div>
          </div>
          {/* Keep the photo bright; darken only behind the text */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 via-45% to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-slate-950/10 via-50% to-transparent"
            aria-hidden="true"
          />

          {/* Floating highlight cards */}
          <div className="hero-chips absolute inset-0 hidden lg:block" aria-hidden="true">
            {chips.map((chip, i) => (
              <div
                key={chip.title}
                className="hero-chip absolute"
                style={{ ...chip.pos, "--i": i } as React.CSSProperties}
              >
                <div className="hero-chip-bob flex items-center gap-3 rounded-2xl bg-white/85 backdrop-blur-md shadow-xl shadow-slate-950/20 ring-1 ring-white/60 pl-2 pr-4 py-2">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${chip.color}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={chip.icon} />
                    </svg>
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-bold text-slate-900">{chip.title}</span>
                    <span className="block text-xs text-slate-500">{chip.text}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Intro copy — fades away as the zoom begins */}
          <div className="hero-intro absolute inset-x-0 bottom-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
              <div
                className="hero-rise inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-4 py-1.5 mb-6"
                style={{ "--i": 0 } as React.CSSProperties}
              >
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                </span>
                <span className="text-white text-sm font-medium">
                  Admissions open · {SCHOOL_GRADE_RANGE}
                </span>
              </div>
              <h1 className="font-serif font-bold text-white leading-[0.95] tracking-tight text-[clamp(3rem,10vw,9rem)] drop-shadow-[0_4px_24px_rgb(2_6_23/0.35)]">
                <span className="hero-word">
                  <span style={{ "--i": 0 } as React.CSSProperties}>Learn.</span>
                </span>
                <br />
                <span className="hero-word">
                  <span style={{ "--i": 1 } as React.CSSProperties}>Lead.</span>
                </span>{" "}
                <span className="hero-word">
                  <span className="relative text-amber-400" style={{ "--i": 2 } as React.CSSProperties}>
                    Succeed.
                    <svg
                      className="hero-underline absolute left-0 -bottom-[0.08em] w-full h-[0.18em]"
                      viewBox="0 0 300 20"
                      preserveAspectRatio="none"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 14 C 80 4, 200 2, 296 10"
                        stroke="currentColor"
                        strokeWidth={6}
                        strokeLinecap="round"
                        pathLength={1}
                      />
                    </svg>
                  </span>
                </span>
              </h1>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
                <p
                  className="hero-rise text-white/90 text-lg sm:text-xl leading-relaxed max-w-xl"
                  style={{ "--i": 4 } as React.CSSProperties}
                >
                  VK Public School — a nurturing place in the heart of
                  Karnataka where every child discovers their potential.
                </p>
                <div
                  className="hero-rise flex flex-wrap gap-3"
                  style={{ "--i": 5 } as React.CSSProperties}
                >
                  <Link
                    href="/admissions"
                    className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 py-3.5 rounded-full shadow-lg shadow-amber-500/30 transition-colors"
                  >
                    Apply for Admission
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
                  >
                    Explore School
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Caption shown once the photo has become a card */}
          <div className="hero-caption absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-wrap justify-center gap-2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 px-4 py-2 text-center"
              >
                <div className="text-white font-bold text-lg leading-tight">{s.value}</div>
                <div className="text-white/70 text-[11px] uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="hero-hint absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div className="w-5 h-8 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white/70 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
