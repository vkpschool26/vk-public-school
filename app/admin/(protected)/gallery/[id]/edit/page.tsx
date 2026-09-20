import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { createServiceRoleClient } from "@/lib/supabase/service";
import { GalleryForm } from "@/components/admin/GalleryForm";

export const metadata: Metadata = {
  title: "Edit Photo — Admin",
  robots: { index: false, follow: false },
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditGalleryImagePage({ params }: Props) {
  const { id } = await params;

  const db = createServiceRoleClient();
  const { data: image, error } = await db
    .from("gallery_images")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !image) notFound();

  const existingPublicUrl = db.storage
    .from("gallery")
    .getPublicUrl(image.storage_path).data.publicUrl;

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
          <span className="text-slate-900 line-clamp-1">{image.title}</span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-slate-900">
          Edit Photo
        </h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <GalleryForm
          mode="edit"
          initialData={image}
          existingPublicUrl={existingPublicUrl}
        />
      </div>
    </div>
  );
}
