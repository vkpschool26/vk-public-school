import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { createServiceRoleClient } from "@/lib/supabase/service";
import { AchievementForm } from "@/components/admin/AchievementForm";

export const metadata: Metadata = {
  title: "Edit Achievement — Admin",
  robots: { index: false, follow: false },
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditAchievementPage({ params }: Props) {
  const { id } = await params;

  const { data: achievement, error } = await createServiceRoleClient()
    .from("achievements")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !achievement) notFound();

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <Link
            href="/admin/achievements"
            className="hover:text-blue-800 transition-colors"
          >
            Achievements
          </Link>
          <span>/</span>
          <span className="text-slate-900 line-clamp-1">
            {achievement.title}
          </span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-slate-900">
          Edit Achievement
        </h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <AchievementForm mode="edit" initialData={achievement} />
      </div>
    </div>
  );
}
