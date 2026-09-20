import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GalleryPreview() {
  const supabase = createServerSupabaseClient();

  const { data } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(6);

  const previewImages = (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    category: row.category,
    alt: row.alt,
    publicUrl: supabase.storage
      .from("gallery")
      .getPublicUrl(row.storage_path).data.publicUrl,
  }));

  return (
    <section
      className="py-16 lg:py-24 bg-white"
      aria-labelledby="gallery-preview-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <SectionHeading
            eyebrow="Photo Gallery"
            heading="Glimpses of School Life"
            description="A window into the vibrant, joyful, and enriching world of VK Public School."
            align="left"
          />
          <Link
            href="/gallery"
            className="flex-shrink-0 inline-flex items-center gap-2 text-blue-800 hover:text-blue-900 font-semibold text-sm border border-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Full Gallery
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {previewImages.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            No photos published yet.{" "}
            <Link href="/gallery" className="text-blue-800 hover:underline">
              Check back soon.
            </Link>
          </div>
        ) : (
          <>
            {/* Gallery grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {previewImages.map((image, index) => (
                <Link
                  key={image.id}
                  href="/gallery"
                  className={`group relative overflow-hidden rounded-2xl ${
                    index === 0 ? "md:col-span-2 md:row-span-2" : ""
                  } aspect-square block`}
                  aria-label={`View gallery — ${image.title}`}
                >
                  <Image
                    src={image.publicUrl}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes={
                      index === 0
                        ? "(max-width: 768px) 50vw, 66vw"
                        : "(max-width: 768px) 50vw, 33vw"
                    }
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <span className="text-white font-semibold text-sm block">
                        {image.title}
                      </span>
                      <span className="text-white/70 text-xs">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2"
              >
                View All Photos
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
