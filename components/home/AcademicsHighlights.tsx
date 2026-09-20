import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

const subjects = [
  {
    title: "Foundational Skills",
    description:
      "Phonics, early reading, writing, number sense, and communication skills form the bedrock of our Nursery and KG programme.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: "bg-blue-800",
    grades: "Nursery – KG",
  },
  {
    title: "Mathematics",
    description:
      "Conceptual understanding through hands-on tools, puzzles, and real-world problem solving to make maths intuitive and enjoyable.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: "bg-indigo-700",
    grades: "Grade 1 – 5",
  },
  {
    title: "Languages",
    description:
      "English, Kannada, and Hindi are taught with a focus on speaking, reading, and writing — building confident and articulate communicators.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    color: "bg-emerald-700",
    grades: "Grade 1 – 5",
  },
  {
    title: "Environmental Studies",
    description:
      "EVS sparks curiosity about the natural world — from plants and animals to weather, water, and our community — through observation and exploration.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "bg-green-700",
    grades: "Grade 1 – 5",
  },
  {
    title: "Creative Arts",
    description:
      "Drawing, painting, music, dance, and drama are integral parts of our curriculum, fostering imagination, self-expression, and cultural appreciation.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    color: "bg-amber-600",
    grades: "All Grades",
  },
  {
    title: "Physical Education",
    description:
      "Structured PE classes combined with yoga and outdoor sports ensure students stay active, fit, and develop teamwork and sportsmanship.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "bg-red-700",
    grades: "All Grades",
  },
];

export function AcademicsHighlights() {
  return (
    <section
      className="py-16 lg:py-24 bg-white"
      aria-labelledby="academics-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <SectionHeading
            eyebrow="Curriculum"
            heading="Academic Excellence"
            description="Our NCERT-aligned curriculum is thoughtfully designed for young learners, balancing rigorous academics with joyful exploration."
            align="left"
          />
          <Link
            href="/academics"
            className="flex-shrink-0 inline-flex items-center gap-2 text-blue-800 hover:text-blue-900 font-semibold text-sm border border-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Full Curriculum
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((subject) => (
            <div
              key={subject.title}
              className="flex gap-4 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-200 group"
            >
              <div
                className={`flex-shrink-0 w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200`}
              >
                {subject.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900">
                    {subject.title}
                  </h3>
                </div>
                <p className="text-xs text-amber-600 font-medium mb-2">
                  {subject.grades}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {subject.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
