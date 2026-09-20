import type { Metadata } from "next";
import Link from "next/link";
import { ActivityForm } from "@/components/admin/ActivityForm";

export const metadata: Metadata = {
  title: "New Activity — Admin",
  robots: { index: false, follow: false },
};

export default function NewActivityPage() {
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
          <span className="text-slate-900">New</span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-slate-900">
          New Activity
        </h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <ActivityForm mode="create" />
      </div>
    </div>
  );
}
