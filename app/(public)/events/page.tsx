import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { EventsClient } from "./EventsClient";

export const metadata: Metadata = {
  title: "Events & Activities",
  description:
    "Stay informed about all upcoming and recent events at VK Public School.",
};

export default async function EventsPage() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("date", { ascending: false });

  return (
    <div>
      {/* Page hero */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">
            School Calendar
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Events &amp; Activities
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Stay informed about all upcoming and recent events at VK Public
            School
          </p>
        </div>
      </div>

      {error ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
          <p className="text-slate-500 text-lg">
            Unable to load events at this time. Please try again later.
          </p>
        </div>
      ) : (
        <EventsClient events={data ?? []} />
      )}
    </div>
  );
}
