import type { Metadata } from "next";
import Link from "next/link";
import { createServiceRoleClient } from "@/lib/supabase/service";
import { Button } from "@/components/ui/Button";
import { ActivityDeleteButton } from "@/components/admin/ActivityDeleteButton";

export const metadata: Metadata = {
  title: "Activities — Admin",
  robots: { index: false, follow: false },
};

const COLOR_DOT: Record<string, string> = {
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  blue: "bg-blue-600",
  purple: "bg-purple-600",
};

export default async function AdminActivitiesPage() {
  const { data: activities, error } = await createServiceRoleClient()
    .from("activities")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Activities
          </h1>
          {!error && (
            <p className="text-slate-500 text-sm mt-0.5">
              {activities?.length ?? 0} total
            </p>
          )}
        </div>
        <Button href="/admin/activities/new" size="sm">
          + Add Activity
        </Button>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          Failed to load activities: {error.message}
        </div>
      ) : activities?.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="text-slate-400 mb-4">No activities yet.</p>
          <Button href="/admin/activities/new" size="sm">
            Add your first activity
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
                    Items
                  </th>
                  <th className="px-5 py-3 font-semibold text-slate-600 hidden md:table-cell">
                    Color
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
                {activities?.map((activity) => (
                  <tr
                    key={activity.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <span className="font-medium text-slate-900 line-clamp-1">
                        {activity.title}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 hidden sm:table-cell">
                      {activity.items.length} item
                      {activity.items.length !== 1 ? "s" : ""}
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full ${COLOR_DOT[activity.color] ?? "bg-slate-400"}`}
                          aria-hidden="true"
                        />
                        <span className="text-slate-600 capitalize">
                          {activity.color}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          activity.is_published
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {activity.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/activities/${activity.id}/edit`}
                          className="text-blue-700 hover:text-blue-900 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-sm"
                        >
                          Edit
                        </Link>
                        <ActivityDeleteButton
                          id={activity.id}
                          title={activity.title}
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
