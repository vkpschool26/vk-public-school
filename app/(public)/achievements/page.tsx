import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { SCHOOL_NAME } from "@/lib/data/school";

export const metadata: Metadata = {
  title: "Achievements",
  description: `Discover the achievements and awards earned by ${SCHOOL_NAME} students and staff over the years.`,
};

const iconSvg: Record<string, React.ReactNode> = {
  award: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  academic: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  sports: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  culture: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  ),
  nature: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064" />
    </svg>
  ),
};

const colors = [
  { bg: "bg-blue-800",   light: "bg-blue-50",   text: "text-blue-800"   },
  { bg: "bg-emerald-700", light: "bg-emerald-50", text: "text-emerald-700" },
  { bg: "bg-amber-600",  light: "bg-amber-50",  text: "text-amber-700"  },
  { bg: "bg-purple-700", light: "bg-purple-50", text: "text-purple-700" },
  { bg: "bg-indigo-700", light: "bg-indigo-50", text: "text-indigo-700" },
];

export default async function AchievementsPage() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("year", { ascending: false });

  const achievements = data ?? [];

  return (
    <div>
      <div className="bg-gradient-to-br from-blue-900 to-indigo-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Honours &amp; Awards
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Our Achievements
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Celebrating the milestones and recognition that reflect our
            commitment to excellence
          </p>
        </div>
      </div>

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Recognition"
            heading="Awards & Milestones"
            description="Over the years, VK Public School has earned recognition for academic excellence, sports achievements, cultural contributions, and environmental initiatives."
            className="mb-14"
          />

          {error ? (
            <div className="text-center py-16 text-slate-500">
              Unable to load achievements at this time. Please try again later.
            </div>
          ) : achievements.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              No achievements have been published yet. Check back soon.
            </div>
          ) : (
            <div className="space-y-6">
              {achievements.map((achievement, index) => {
                const color = colors[index % colors.length];
                return (
                  <article
                    key={achievement.id}
                    className="bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-shadow duration-300 p-6 sm:p-7"
                  >
                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                      <div
                        className={`w-16 h-16 ${color.bg} rounded-2xl flex items-center justify-center text-white flex-shrink-0`}
                      >
                        {iconSvg[achievement.icon] ?? iconSvg.award}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h2 className="font-serif font-bold text-slate-900 text-xl">
                            {achievement.title}
                          </h2>
                          <span
                            className={`${color.light} ${color.text} text-xs font-bold px-3 py-1 rounded-full`}
                          >
                            {achievement.year}
                          </span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Summary stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "15+", label: "Years of Excellence" },
              { value: "10+", label: "Awards & Recognition" },
              { value: "100%", label: "Pass Rate (Grade 5)" },
              { value: "300+", label: "Happy Students" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center"
              >
                <div className="font-serif font-bold text-3xl text-blue-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
