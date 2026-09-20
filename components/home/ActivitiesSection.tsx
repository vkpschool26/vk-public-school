import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const colorConfig: Record<string, { bg: string; badge: string; border: string }> = {
  emerald: {
    bg: "from-emerald-600 to-emerald-800",
    badge: "bg-emerald-500/20 text-emerald-100",
    border: "hover:border-emerald-200",
  },
  amber: {
    bg: "from-amber-500 to-amber-700",
    badge: "bg-amber-500/20 text-amber-100",
    border: "hover:border-amber-200",
  },
  blue: {
    bg: "from-blue-700 to-blue-900",
    badge: "bg-blue-500/20 text-blue-100",
    border: "hover:border-blue-200",
  },
  purple: {
    bg: "from-purple-600 to-purple-800",
    badge: "bg-purple-500/20 text-purple-100",
    border: "hover:border-purple-200",
  },
};

const iconSvg: Record<string, React.ReactNode> = {
  sports: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  arts: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  yoga: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  nature: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export async function ActivitiesSection() {
  const supabase = createServerSupabaseClient();

  const { data } = await supabase
    .from("activities")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .limit(3);

  const displayActivities = data ?? [];

  return (
    <section
      className="py-16 lg:py-24 bg-slate-50"
      aria-labelledby="activities-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <SectionHeading
            eyebrow="Co-Curricular"
            heading="Beyond the Classroom"
            description="Our vibrant co-curricular programme ensures that every child discovers their passion and develops skills that go beyond academics."
            align="left"
          />
          <Link
            href="/activities"
            className="flex-shrink-0 inline-flex items-center gap-2 text-blue-800 hover:text-blue-900 font-semibold text-sm border border-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            All Activities
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {displayActivities.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            No activities published yet.{" "}
            <Link href="/activities" className="text-blue-800 hover:underline">
              Check back soon.
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {displayActivities.map((activity) => {
              const colors = colorConfig[activity.color] ?? colorConfig.blue;
              return (
                <div
                  key={activity.id}
                  className={`rounded-2xl overflow-hidden border border-slate-100 ${colors.border} hover:shadow-lg transition-all duration-300 bg-white group`}
                >
                  {/* Colored header */}
                  <div className={`bg-gradient-to-br ${colors.bg} p-7 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
                    <div className="relative">
                      <div className="mb-3 opacity-90 group-hover:scale-110 transition-transform duration-200">
                        {iconSvg[activity.icon] ?? iconSvg.sports}
                      </div>
                      <h3 className="font-serif font-bold text-xl mb-1">{activity.title}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {activity.description}
                    </p>
                    <ul className="space-y-1.5">
                      {activity.items.slice(0, 4).map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                          <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                      {activity.items.length > 4 && (
                        <li className="text-xs text-slate-400 pl-6">
                          +{activity.items.length - 4} more
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
