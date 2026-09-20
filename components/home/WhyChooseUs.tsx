import { SectionHeading } from "@/components/ui/SectionHeading";

const features = [
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    title: "Quality Education",
    description:
      "A structured, NCERT-aligned curriculum delivered through activity-based methods that make learning engaging, meaningful, and effective.",
    color: "blue",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Experienced Faculty",
    description:
      "Dedicated, qualified teachers who are passionate about education and committed to the overall development of every student in their care.",
    color: "indigo",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    title: "Activity-Based Learning",
    description:
      "Hands-on projects, experiments, storytelling, and play-based learning make concepts tangible and help children retain knowledge with joy.",
    color: "amber",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Safe Environment",
    description:
      "A secure, welcoming campus where every child feels protected, respected, and supported. We maintain strict safety standards and a bully-free culture.",
    color: "emerald",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    title: "Individual Attention",
    description:
      "Small class sizes ensure that every student receives personalised guidance and attention from their teacher throughout their learning journey.",
    color: "blue",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    title: "Holistic Development",
    description:
      "Beyond academics, we nurture creativity, physical fitness, values, and emotional intelligence to develop well-rounded, confident young individuals.",
    color: "purple",
  },
];

const colorMap: Record<
  string,
  { bg: string; icon: string; border: string }
> = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-700",
    border: "hover:border-blue-200",
  },
  indigo: {
    bg: "bg-indigo-50",
    icon: "text-indigo-700",
    border: "hover:border-indigo-200",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
    border: "hover:border-amber-200",
  },
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-700",
    border: "hover:border-emerald-200",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-700",
    border: "hover:border-purple-200",
  },
};

export function WhyChooseUs() {
  return (
    <section
      className="py-16 lg:py-24 bg-slate-50"
      aria-labelledby="why-choose-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why Choose Us"
          heading="The VK Difference"
          description="We go beyond textbooks to provide a complete educational experience that prepares children for life — academically, socially, and emotionally."
          className="mb-14"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const colors = colorMap[feature.color] ?? colorMap.blue;
            return (
              <div
                key={feature.title}
                className={`bg-white rounded-2xl p-6 border border-slate-100 ${colors.border} shadow-sm hover:shadow-md transition-all duration-300 group`}
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 ${colors.bg} ${colors.icon} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-slate-900 text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
