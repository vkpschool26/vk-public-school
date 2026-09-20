import Link from "next/link";
import {
  SCHOOL_NAME,
  SCHOOL_TAGLINE,
  SCHOOL_GRADE_RANGE,
} from "@/lib/data/school";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"
      aria-label="Hero section"
    >
      {/* Decorative background elements */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-700 rounded-full blur-3xl opacity-30 translate-y-1/3 -translate-x-1/4"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 right-1/3 w-3 h-3 bg-white/30 rounded-full animate-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-amber-300 rounded-full animate-pulse"
        aria-hidden="true"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 lg:py-32 w-full">
        <div className="max-w-3xl">
          {/* Grade range badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" aria-hidden="true" />
            <span className="text-white/90 text-sm font-medium">
              {SCHOOL_GRADE_RANGE}
            </span>
          </div>

          {/* School name */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
            {SCHOOL_NAME}
          </h1>

          {/* Tagline */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-0.5 w-12 bg-amber-400" aria-hidden="true" />
            <span className="text-amber-400 font-semibold text-xl tracking-wide">
              {SCHOOL_TAGLINE}
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-blue-100 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
            A nurturing learning environment in the heart of Karnataka where
            every child is encouraged to discover their potential, build strong
            values, and grow into confident young leaders.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-14">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-white text-blue-800 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              Explore School
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3.5 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            >
              Apply for Admission
            </Link>
          </div>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Students", value: "300+" },
              { label: "Est.", value: "2026" },
              { label: "Qualified Teachers", value: "20+" },
              { label: "Grades", value: "Nursery – 5" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center min-w-[90px]"
              >
                <div className="text-white font-bold text-xl">{stat.value}</div>
                <div className="text-blue-200 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
