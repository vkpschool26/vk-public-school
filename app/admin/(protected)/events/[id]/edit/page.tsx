import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { createServiceRoleClient } from "@/lib/supabase/service";
import { EventForm } from "@/components/admin/EventForm";

export const metadata: Metadata = {
  title: "Edit Event — Admin",
  robots: { index: false, follow: false },
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: Props) {
  const { id } = await params;

  const { data: event, error } = await createServiceRoleClient()
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !event) notFound();

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <Link
            href="/admin/events"
            className="hover:text-blue-800 transition-colors"
          >
            Events
          </Link>
          <span>/</span>
          <span className="text-slate-900 line-clamp-1">{event.title}</span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-slate-900">
          Edit Event
        </h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <EventForm mode="edit" initialData={event} />
      </div>
    </div>
  );
}
