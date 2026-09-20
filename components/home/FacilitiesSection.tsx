import { SectionHeading } from "@/components/ui/SectionHeading";

const facilities = [
  {
    title: "Well-Equipped Classrooms",
    description:
      "Bright, spacious classrooms with proper ventilation, good lighting, and age-appropriate furniture create an ideal learning environment.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "School Library",
    description:
      "A well-stocked library with age-appropriate books in English, Kannada, and Hindi, including storybooks, reference materials, and encyclopaedias.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "Outdoor Sports Ground",
    description:
      "A large open ground for cricket, football, kabaddi, kho-kho, and athletics. Children get ample space to play and develop physical fitness.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Activity Room",
    description:
      "A dedicated multi-purpose activity room for arts, crafts, music, yoga sessions, and special educational projects throughout the year.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Clean Drinking Water",
    description:
      "Filtered and safe drinking water facilities are available throughout the campus to keep students healthy and hydrated at all times.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    color: "bg-sky-100 text-sky-700",
  },
  {
    title: "Separate Sanitation",
    description:
      "Clean, separate toilet facilities for boys and girls, maintained to the highest standards of hygiene and safety.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "bg-teal-100 text-teal-700",
  },
  {
    title: "School Garden",
    description:
      "A beautiful school garden where children learn about plants, cultivation, and environmental responsibility through hands-on gardening activities.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064" />
      </svg>
    ),
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Assembly Ground",
    description:
      "A central assembly area where students gather each morning for the daily assembly, flag hoisting, prayers, and announcements.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "bg-indigo-100 text-indigo-700",
  },
];

export function FacilitiesSection() {
  return (
    <section
      className="py-16 lg:py-24 bg-white"
      aria-labelledby="facilities-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our Campus"
          heading="World-Class Facilities"
          description="We provide a safe, stimulating, and well-equipped campus designed to support every aspect of a child's development."
          className="mb-14"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {facilities.map((facility) => (
            <div
              key={facility.title}
              className="p-5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300 group"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 ${facility.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-200`}
              >
                {facility.icon}
              </div>
              <h3 className="font-semibold text-slate-900 text-base mb-2">
                {facility.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
