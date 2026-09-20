"use server";

import { revalidatePath } from "next/cache";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServiceRoleClient } from "@/lib/supabase/service";

type NoticeCategory = "Academic" | "General" | "Holiday" | "Admissions";

interface NoticePayload {
  title: string;
  date: string;
  category: NoticeCategory;
  content: string;
  is_published: boolean;
}

async function requireAuth() {
  const supabase = await createAdminSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
}

export async function createNotice(
  payload: NoticePayload
): Promise<{ error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { error: "Unauthorized" };
  }

  const { error } = await createServiceRoleClient()
    .from("notices")
    .insert(payload);

  if (error) return { error: error.message };

  revalidatePath("/admin/news");
  revalidatePath("/news");
  return {};
}

export async function updateNotice(
  id: string,
  payload: NoticePayload
): Promise<{ error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { error: "Unauthorized" };
  }

  const { error } = await createServiceRoleClient()
    .from("notices")
    .update(payload)
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/news");
  revalidatePath("/news");
  return {};
}

export async function deleteNotice(id: string): Promise<{ error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { error: "Unauthorized" };
  }

  const { error } = await createServiceRoleClient()
    .from("notices")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/news");
  revalidatePath("/news");
  return {};
}
