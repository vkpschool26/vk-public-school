import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { createServiceRoleClient } from "@/lib/supabase/service";
import { ActivityForm } from "@/components/admin/ActivityForm";

export const metadata: Metadata = {
  title: "Edit Activity — Admin",
  robots: { index: false, follow: false },
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditActivityPage({ params }: Props) {
  const { id } = await params;

  const { data: activity, error } = await createServiceRoleClient()
    .from("activities")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !activity) notFound();

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <Link
            href="/admin/activities"
            className="hover:text-blue-800 transition-colors"
          >
            Activities
          </Link>
          <span>/</span>
          <span className="text-slate-900 line-clamp-1">{activity.title}</span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-slate-900">
          Edit Activity
        </h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <ActivityForm mode="edit" initialData={activity} />
      </div>
    </div>
  );
}
