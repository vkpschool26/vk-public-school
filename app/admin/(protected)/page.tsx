import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

const sections = [
  {
    name: "Events",
    description: "Manage school calendar events",
    href: "/admin/events",
    ready: true,
  },
  {
    name: "Gallery",
    description: "Upload and organise photos",
    href: "/admin/gallery",
    ready: true,
  },
  {
    name: "Notices",
    description: "Publish announcements",
    href: "/admin/news",
    ready: true,
  },
  {
    name: "Achievements",
    description: "Record awards and milestones",
    href: "/admin/achievements",
    ready: true,
  },
  {
    name: "Activities",
    description: "Update co-curricular programmes",
    href: "/admin/activities",
    ready: true,
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-slate-900">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Welcome to the VK Public School admin area.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) =>
          section.ready ? (
            <Link
              key={section.name}
              href={section.href}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-sm hover:border-blue-200 transition-all duration-200 group"
            >
              <h2 className="font-semibold text-slate-900 mb-1 group-hover:text-blue-800 transition-colors">
                {section.name}
              </h2>
              <p className="text-slate-500 text-sm">{section.description}</p>
              <span className="inline-block mt-3 text-xs text-blue-700 font-medium">
                Manage →
              </span>
            </Link>
          ) : (
            <div
              key={section.name}
              className="bg-white rounded-2xl border border-slate-200 p-6 opacity-60 cursor-not-allowed"
            >
              <h2 className="font-semibold text-slate-900 mb-1">
                {section.name}
              </h2>
              <p className="text-slate-500 text-sm">{section.description}</p>
              <span className="inline-block mt-3 text-xs text-slate-400">
                Coming soon
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
