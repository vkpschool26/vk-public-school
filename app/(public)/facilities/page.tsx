import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SCHOOL_NAME } from "@/lib/data/school";

export const metadata: Metadata = {
  title: "Facilities",
  description: `Explore the facilities at ${SCHOOL_NAME} — modern classrooms, library, sports ground, activity room, and more in Balapura, Karnataka.`,
};

const facilities = [
  {
    title: "Bright, Ventilated Classrooms",
    description:
      "Our classrooms are designed with children in mind — spacious, well-lit with natural light, properly ventilated, and furnished with age-appropriate tables and chairs. Each classroom is decorated with educational posters, charts, and student artwork to create a stimulating learning environment.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    color: "bg-blue-800",
    highlights: ["Natural light & ventilation", "Age-appropriate furniture", "Educational displays", "Dedicated storage"],
  },
  {
    title: "School Library",
    description:
      "Our well-stocked library is a haven for young readers. It houses hundreds of books across genres — storybooks, reference books, encyclopaedias, and educational materials in English, Kannada, and Hindi. Students are encouraged to borrow books and develop a love for reading from an early age.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    color: "bg-amber-600",
    highlights: ["500+ books", "English, Kannada & Hindi", "Reading tables & chairs", "Weekly library periods"],
  },
  {
    title: "Outdoor Sports Ground",
    description:
      "A large, open ground gives our students ample space for cricket, football, kabaddi, kho-kho, and athletics. The ground is also used for our Annual Sports Day, morning assembly, and yoga sessions. Physical activity is scheduled every day for all students.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "bg-emerald-700",
    highlights: ["Cricket & football", "Kabaddi & kho-kho", "Athletics track area", "Morning yoga space"],
  },
  {
    title: "Multi-Purpose Activity Room",
    description:
      "Our dedicated activity room is the heart of co-curricular learning. It is used for arts and crafts, music sessions, dance practice, special science projects, and group activities. The room is equipped with materials for creative exploration across all grade levels.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    color: "bg-purple-700",
    highlights: ["Arts & crafts materials", "Music instruments", "Dance space", "Group project tables"],
  },
  {
    title: "Safe Drinking Water",
    description:
      "The health of our students is our top priority. We provide filtered, safe drinking water at multiple points throughout the school. Water purifiers are maintained regularly and tested to ensure the highest quality standards.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    color: "bg-sky-600",
    highlights: ["Water purifiers installed", "Multiple access points", "Regular maintenance", "Quality testing"],
  },
  {
    title: "Separate Sanitation Facilities",
    description:
      "Clean, separate toilet facilities are provided for boys and girls at multiple locations on campus. These are cleaned multiple times daily and maintained to the highest standards of hygiene and safety, ensuring a healthy and comfortable environment for all students.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "bg-teal-700",
    highlights: ["Separate for boys & girls", "Daily cleaning", "Hand-washing stations", "Well-maintained"],
  },
  {
    title: "School Garden",
    description:
      "Our beautiful school garden is both an aesthetic feature and an educational resource. Students learn about plants, cultivation, seasons, and environmental responsibility through hands-on gardening activities. The garden also produces fresh vegetables occasionally used in school celebrations.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064" />
      </svg>
    ),
    color: "bg-green-700",
    highlights: ["Seasonal vegetables", "Flowering plants", "Tree plantation area", "Gardening club"],
  },
  {
    title: "Assembly Ground",
    description:
      "A central, shaded assembly area is the gathering place for our daily morning assembly. Here, students participate in prayers, national anthem, pledge, thought for the day, and announcements. The space is also used for special events, competitions, and award ceremonies.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "bg-indigo-700",
    highlights: ["Daily morning assembly", "Flag hoisting area", "Shaded seating", "Event stage"],
  },
];

export default function FacilitiesPage() {
  return (
    <div>
      <div className="bg-gradient-to-br from-blue-900 to-indigo-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Our Campus
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            School Facilities
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            A safe, stimulating campus designed to support every aspect of a
            child&apos;s development
          </p>
        </div>
      </div>

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Infrastructure"
            heading="Everything Your Child Needs"
            description="We have invested in creating a campus that is not just well-equipped, but genuinely designed for children — safe, nurturing, and inspiring."
            className="mb-14"
          />

          <div className="space-y-6">
            {facilities.map((facility) => (
              <div key={facility.title} className="bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="grid md:grid-cols-[auto_1fr] gap-0">
                  <div className={`${facility.color} w-full md:w-2 h-2 md:h-auto`} aria-hidden="true" />
                  <div className="p-6 sm:p-7">
                    <div className="flex items-start gap-5">
                      <div className={`w-14 h-14 ${facility.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                        {facility.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif font-bold text-slate-900 text-xl mb-2">{facility.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">{facility.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {facility.highlights.map((h) => (
                            <span key={h} className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-medium">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
