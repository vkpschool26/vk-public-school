import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { createServiceRoleClient } from "@/lib/supabase/service";
import { NoticeForm } from "@/components/admin/NoticeForm";

export const metadata: Metadata = {
  title: "Edit Notice — Admin",
  robots: { index: false, follow: false },
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditNoticePage({ params }: Props) {
  const { id } = await params;

  const { data: notice, error } = await createServiceRoleClient()
    .from("notices")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !notice) notFound();

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <Link
            href="/admin/news"
            className="hover:text-blue-800 transition-colors"
          >
            News &amp; Notices
          </Link>
          <span>/</span>
          <span className="text-slate-900 line-clamp-1">{notice.title}</span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-slate-900">
          Edit Notice
        </h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <NoticeForm mode="edit" initialData={notice} />
      </div>
    </div>
  );
}
