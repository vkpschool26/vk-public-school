import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { SCHOOL_NAME } from "@/lib/data/school";

export const metadata: Metadata = {
  title: "News & Notices",
  description: `Latest news, notices, and announcements from ${SCHOOL_NAME}.`,
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsPage() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .eq("is_published", true)
    .order("date", { ascending: false });

  const notices = data ?? [];

  return (
    <div>
      <div className="bg-gradient-to-br from-blue-900 to-indigo-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Updates
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            News &amp; Notices
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Important announcements, notices, and updates from VK Public School
          </p>
        </div>
      </div>

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Announcements"
            heading="Latest Notices"
            className="mb-12"
          />

          {error ? (
            <div className="text-center py-16 text-slate-500">
              Unable to load notices at this time. Please try again later.
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              No notices have been published yet. Check back soon.
            </div>
          ) : (
            <div className="space-y-5">
              {notices.map((notice, index) => (
                <article
                  key={notice.id}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Date sidebar */}
                    <div className="sm:w-24 bg-blue-800 text-white flex sm:flex-col items-center justify-center p-4 text-center flex-shrink-0">
                      <div className="font-bold text-2xl sm:text-3xl leading-none">
                        {new Date(notice.date).getDate()}
                      </div>
                      <div className="text-blue-200 text-xs ml-2 sm:ml-0 sm:mt-1">
                        {new Date(notice.date).toLocaleDateString("en-IN", {
                          month: "short",
                        })}
                      </div>
                      <div className="text-blue-300 text-xs">
                        {new Date(notice.date).getFullYear()}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge label={notice.category} />
                        <span className="text-slate-400 text-xs">
                          Posted: {formatDate(notice.date)}
                        </span>
                        {index === 0 && (
                          <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">
                            NEW
                          </span>
                        )}
                      </div>
                      <h2 className="font-serif font-bold text-slate-900 text-lg mb-2">
                        {notice.title}
                      </h2>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {notice.content}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Archive note */}
          <div className="mt-10 bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
            <p className="text-slate-600 text-sm">
              For older notices and announcements, please visit the school
              office or contact us at{" "}
              <a
                href="mailto:info@vkpublicschool.org"
                className="text-blue-800 font-semibold hover:underline"
              >
                info@vkpublicschool.org
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
