import type { Metadata } from "next";
import Link from "next/link";
import { createServiceRoleClient } from "@/lib/supabase/service";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EventDeleteButton } from "@/components/admin/EventDeleteButton";

export const metadata: Metadata = {
  title: "Events — Admin",
  robots: { index: false, follow: false },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminEventsPage() {
  const { data: events, error } = await createServiceRoleClient()
    .from("events")
    .select("*")
    .order("date", { ascending: false });

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Events
          </h1>
          {!error && (
            <p className="text-slate-500 text-sm mt-0.5">
              {events?.length ?? 0} total
            </p>
          )}
        </div>
        <Button href="/admin/events/new" size="sm">
          + Add Event
        </Button>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          Failed to load events: {error.message}
        </div>
      ) : events?.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="text-slate-400 mb-4">No events yet.</p>
          <Button href="/admin/events/new" size="sm">
            Add your first event
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left">
                  <th className="px-5 py-3 font-semibold text-slate-600">
                    Title
                  </th>
                  <th className="px-5 py-3 font-semibold text-slate-600 hidden sm:table-cell">
                    Date
                  </th>
                  <th className="px-5 py-3 font-semibold text-slate-600 hidden md:table-cell">
                    Category
                  </th>
                  <th className="px-5 py-3 font-semibold text-slate-600">
                    Status
                  </th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {events?.map((event) => (
                  <tr
                    key={event.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <span className="font-medium text-slate-900 line-clamp-1">
                        {event.title}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 hidden sm:table-cell whitespace-nowrap">
                      {formatDate(event.date)}
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <Badge label={event.category} />
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          event.is_published
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {event.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/events/${event.id}/edit`}
                          className="text-blue-700 hover:text-blue-900 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-sm"
                        >
                          Edit
                        </Link>
                        <EventDeleteButton
                          id={event.id}
                          title={event.title}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
