import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { GalleryClient } from "./GalleryClient";
import type { GalleryItem } from "./GalleryClient";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "A visual journey through classrooms, events, sports, and activities at VK Public School.",
};

export default async function GalleryPage() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const images: GalleryItem[] = (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    category: row.category,
    publicUrl: supabase.storage
      .from("gallery")
      .getPublicUrl(row.storage_path).data.publicUrl,
    alt: row.alt,
  }));

  return (
    <div>
      {/* Page hero */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Photo Gallery
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Life at VK Public School
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            A visual journey through our classrooms, events, sports, and
            activities
          </p>
        </div>
      </div>

      {error ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
          <p className="text-slate-500 text-lg">
            Unable to load gallery at this time. Please try again later.
          </p>
        </div>
      ) : (
        <GalleryClient images={images} />
      )}
    </div>
  );
}
