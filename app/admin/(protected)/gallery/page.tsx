import type { Metadata } from "next";
import Link from "next/link";
import { createServiceRoleClient } from "@/lib/supabase/service";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GalleryDeleteButton } from "@/components/admin/GalleryDeleteButton";

export const metadata: Metadata = {
  title: "Gallery — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminGalleryPage() {
  const db = createServiceRoleClient();

  const { data: images, error } = await db
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  // Resolve public URLs server-side so the grid can render <img> tags
  const rows = (images ?? []).map((img) => ({
    ...img,
    publicUrl: db.storage.from("gallery").getPublicUrl(img.storage_path).data
      .publicUrl,
  }));

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Gallery
          </h1>
          {!error && (
            <p className="text-slate-500 text-sm mt-0.5">
              {rows.length} photo{rows.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <Button href="/admin/gallery/new" size="sm">
          + Upload Photo
        </Button>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          Failed to load gallery: {error.message}
        </div>
      ) : rows.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="text-slate-400 mb-4">No photos yet.</p>
          <Button href="/admin/gallery/new" size="sm">
            Upload your first photo
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {rows.map((img) => (
            <div
              key={img.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative aspect-square bg-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.publicUrl}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
                {/* Draft overlay badge */}
                {!img.is_published && (
                  <span className="absolute top-2 left-2 bg-slate-900/70 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    Draft
                  </span>
                )}
              </div>

              {/* Metadata + actions */}
              <div className="p-3 flex flex-col gap-2 flex-1">
                <p
                  className="text-sm font-medium text-slate-900 line-clamp-1"
                  title={img.title}
                >
                  {img.title}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge label={img.category} color="slate" />
                  <span className="text-xs text-slate-400">
                    #{img.sort_order}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-auto pt-1 border-t border-slate-100">
                  <Link
                    href={`/admin/gallery/${img.id}/edit`}
                    className="text-blue-700 hover:text-blue-900 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors text-sm"
                  >
                    Edit
                  </Link>
                  <GalleryDeleteButton
                    id={img.id}
                    title={img.title}
                    storagePath={img.storage_path}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
