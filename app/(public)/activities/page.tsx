import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { SCHOOL_NAME } from "@/lib/data/school";

export const metadata: Metadata = {
  title: "Activities",
  description: `Discover the vibrant co-curricular activities at ${SCHOOL_NAME} — Sports, Arts, Dance, Music, Yoga, and Environmental Education.`,
};

const iconSvg: Record<string, React.ReactNode> = {
  sports: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  arts: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  yoga: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  nature: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const colorConfig: Record<string, { header: string; text: string; light: string }> = {
  emerald: { header: "from-emerald-600 to-emerald-800", text: "text-emerald-700", light: "bg-emerald-50" },
  amber:   { header: "from-amber-500 to-amber-700",     text: "text-amber-700",   light: "bg-amber-50"   },
  blue:    { header: "from-blue-700 to-blue-900",       text: "text-blue-700",    light: "bg-blue-50"    },
  purple:  { header: "from-purple-600 to-purple-800",   text: "text-purple-700",  light: "bg-purple-50"  },
};

export default async function ActivitiesPage() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  const activities = data ?? [];

  return (
    <div>
      <div className="bg-gradient-to-br from-blue-900 to-indigo-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Co-Curricular
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Activities &amp; Programmes
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Nurturing talent, building character, and celebrating creativity
            beyond the classroom
          </p>
        </div>
      </div>

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Our Programmes"
            heading="Beyond the Classroom"
            description="At VK Public School, we firmly believe that a child's education extends far beyond textbooks. Our co-curricular programmes are carefully designed to develop every dimension of a young learner."
            className="mb-14"
          />

          {error ? (
            <div className="text-center py-16 text-slate-500">
              Unable to load activities at this time. Please try again later.
            </div>
          ) : activities.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              No activities have been published yet. Check back soon.
            </div>
          ) : (
            <div className="space-y-10">
              {activities.map((activity, index) => {
                const colors = colorConfig[activity.color] ?? colorConfig.blue;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={activity.id}
                    className={`grid lg:grid-cols-2 gap-8 items-center ${isEven ? "" : "lg:grid-flow-dense"}`}
                  >
                    {/* Card header */}
                    <div className={`rounded-2xl overflow-hidden ${isEven ? "" : "lg:col-start-2"}`}>
                      <div className={`bg-gradient-to-br ${colors.header} p-10 text-white flex flex-col items-start gap-5 relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/4 translate-x-1/4" aria-hidden="true" />
                        <div className="relative">
                          {iconSvg[activity.icon] ?? iconSvg.sports}
                        </div>
                        <div className="relative">
                          <h2 className="font-serif font-bold text-3xl">{activity.title}</h2>
                          <p className="text-white/80 mt-2 leading-relaxed">{activity.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Activities list */}
                    <div className={isEven ? "" : "lg:col-start-1 lg:row-start-1"}>
                      <h3 className="font-semibold text-slate-900 text-xl mb-5">
                        What&apos;s Included
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {activity.items.map((item) => (
                          <div key={item} className={`flex items-center gap-3 ${colors.light} rounded-xl p-3`}>
                            <svg className={`w-5 h-5 ${colors.text} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-slate-700 text-sm font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
