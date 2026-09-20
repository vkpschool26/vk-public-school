"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import type { EventRow } from "@/types/database";

const CATEGORIES: Array<EventRow["category"] | "All"> = [
  "All",
  "Academic",
  "Cultural",
  "Sports",
  "Holiday",
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface EventsClientProps {
  events: EventRow[];
}

export function EventsClient({ events }: EventsClientProps) {
  const [activeCategory, setActiveCategory] = useState<
    EventRow["category"] | "All"
  >("All");

  const filtered =
    activeCategory === "All"
      ? events
      : events.filter((e) => e.category === activeCategory);

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Category filter */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-10"
          role="tablist"
          aria-label="Event categories"
        >
          {CATEGORIES.map((cat) => (
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
            </button>
          ))}
        </div>

        {/* Events grid */}
        {events.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            No events have been published yet. Check back soon.
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event) => (
                <article
                  key={event.id}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300 group"
                >
                  {event.image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.image_url}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Badge label={event.category} />
                      <time
                        dateTime={event.date}
                        className="text-slate-400 text-xs"
                      >
                        {formatDate(event.date)}
                      </time>
                    </div>
                    <h2 className="font-serif font-bold text-slate-900 text-lg mb-2">
                      {event.title}
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-slate-400">
                No events in this category.
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
