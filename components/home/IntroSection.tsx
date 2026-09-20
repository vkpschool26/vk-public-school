import { SCHOOL_MISSION, SCHOOL_FOUNDED } from "@/lib/data/school";

const stats = [
  {
    value: `Est. ${SCHOOL_FOUNDED}`,
    label: "Year Founded",
    description: "Quality education from day one",
  },
  {
    value: "300+",
    label: "Students Enrolled",
    description: "Happy learners across all grades",
  },
  {
    value: "20+",
    label: "Qualified Teachers",
    description: "Dedicated and experienced faculty",
  },
];

export function IntroSection() {
  return (
    <section
      className="py-16 lg:py-24 bg-white"
      aria-labelledby="intro-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <span className="inline-block text-amber-500 font-semibold text-sm uppercase tracking-widest mb-2">
              Welcome to VK Public School
            </span>
            <h2
              id="intro-heading"
              className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-6"
            >
              Where Every Child&apos;s Journey{" "}
              <span className="text-blue-800">Begins with Care</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-4">
              {SCHOOL_MISSION}
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              Located in Balapura, Tumakuru District, our school serves the
              local community with quality English-medium education from Nursery
              to Grade 5. We blend a strong academic curriculum with
              co-curricular activities to develop well-rounded, confident young
              individuals.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "Activity-Based Learning",
                "Child-Friendly Environment",
                "Experienced Teachers",
                "Holistic Development",
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center hover:border-blue-200 hover:bg-blue-50/50 transition-colors duration-200"
              >
                <div className="font-serif font-bold text-3xl text-blue-800 mb-1">
                  {stat.value}
                </div>
                <div className="font-semibold text-slate-800 text-sm mb-1">
                  {stat.label}
                </div>
                <div className="text-slate-500 text-xs leading-relaxed">
                  {stat.description}
                </div>
              </div>
            ))}

            {/* Mission highlight card */}
            <div className="sm:col-span-3 lg:col-span-1 xl:col-span-3 bg-gradient-to-br from-blue-800 to-indigo-800 rounded-2xl p-6 text-white">
              <svg
                className="w-8 h-8 text-amber-400 mb-3"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-blue-100 text-sm leading-relaxed italic">
                &ldquo;Every child is unique and capable of achieving great
                things when guided with care, encouragement, and the right
                learning environment.&rdquo;
              </p>
              <div className="mt-3 text-amber-400 text-xs font-semibold">
                — Our Philosophy
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
