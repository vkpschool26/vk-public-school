"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryImageRow } from "@/types/database";

const CATEGORIES: Array<GalleryImageRow["category"] | "All"> = [
  "All",
  "Classrooms",
  "Events",
  "Sports",
  "Activities",
  "Facilities",
];

// Resolved shape passed from the server — storage_path already converted to publicUrl
export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryImageRow["category"];
  publicUrl: string;
  alt: string;
}

interface GalleryClientProps {
  images: GalleryItem[];
}

export function GalleryClient({ images }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState<
    GalleryImageRow["category"] | "All"
  >("All");

  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Category filter tabs */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-10"
          role="tablist"
          aria-label="Gallery categories"
        >
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? images.length
                : images.filter((i) => i.category === cat).length;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 ${
                  activeCategory === cat
                    ? "bg-blue-800 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
                <span className="ml-1.5 text-xs opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Gallery grid */}
        {images.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            No photos have been published yet. Check back soon.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-square overflow-hidden rounded-2xl group bg-slate-100"
                >
                  <Image
                    src={image.publicUrl}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {image.title}
                      </p>
                      <p className="text-white/70 text-xs">{image.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                No photos in this category yet.
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
