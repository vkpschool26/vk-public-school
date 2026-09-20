import { redirect } from "next/navigation";
import Image from "next/image";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { signOut } from "@/app/admin/actions";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SCHOOL_NAME } from "@/lib/data/school";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createAdminSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Sticky topbar */}
      <header className="bg-blue-900 text-white shadow-md shrink-0 sticky top-0 z-20">
        <div className="h-14 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Image
              src="https://vkpublicschool.org/wp-content/uploads/2026/05/cropped-vkp-126x110.jpeg"
              alt={`${SCHOOL_NAME} logo`}
              width={32}
              height={28}
              className="rounded object-contain"
            />
            <span className="font-semibold text-sm">{SCHOOL_NAME} — Admin</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-blue-300 text-xs hidden sm:block">
              {user.email}
            </span>
            <form action={signOut}>
              <button
                type="submit"
                className="text-sm bg-blue-800 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors duration-200"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Sidebar + content — flex-col on mobile (sidebar becomes top strip), flex-row on md+ */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        <AdminSidebar />
        <main className="flex-1 min-w-0 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
