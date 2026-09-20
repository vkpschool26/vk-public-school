import type { Metadata } from "next";
import Link from "next/link";
import { GalleryForm } from "@/components/admin/GalleryForm";

export const metadata: Metadata = {
  title: "Upload Photo — Admin",
  robots: { index: false, follow: false },
};

export default function NewGalleryImagePage() {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <Link
            href="/admin/gallery"
            className="hover:text-blue-800 transition-colors"
          >
            Gallery
          </Link>
          <span>/</span>
          <span className="text-slate-900">Upload</span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-slate-900">
          Upload Photo
        </h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <GalleryForm mode="create" />
      </div>
    </div>
  );
}
