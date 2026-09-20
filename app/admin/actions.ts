"use server";

import { redirect } from "next/navigation";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function signOut() {
  const supabase = await createAdminSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
