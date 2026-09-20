import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function LatestEvents() {
  const supabase = createServerSupabaseClient();

  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("date", { ascending: false })
    .limit(3);

  const latestEvents = data ?? [];

  return (
    <section
      className="py-16 lg:py-24 bg-slate-50"
      aria-labelledby="events-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <SectionHeading
            eyebrow="School Life"
            heading="Latest Events"
            description="Stay up to date with what is happening at VK Public School."
            align="left"
          />
          <Link
            href="/events"
            className="flex-shrink-0 inline-flex items-center gap-2 text-blue-800 hover:text-blue-900 font-semibold text-sm border border-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            View All Events
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
        </div>

        {latestEvents.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            No events published yet.{" "}
            <Link href="/events" className="text-blue-800 hover:underline">
              Check back soon.
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestEvents.map((event) => (
              <article
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md transition-shadow duration-300 group"
              >
                {event.image_url && (
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={event.image_url}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <Badge label={event.category} />
                    <time
                      dateTime={event.date}
                      className="text-slate-400 text-xs"
                    >
                      {formatDate(event.date)}
                    </time>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-2 group-hover:text-blue-800 transition-colors duration-200">
                    {event.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
