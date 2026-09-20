"use server";

import { revalidatePath } from "next/cache";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServiceRoleClient } from "@/lib/supabase/service";

interface AchievementPayload {
  title: string;
  description: string;
  icon: string;
  year: string;
  sort_order: number;
  is_published: boolean;
}

async function requireAuth() {
  const supabase = await createAdminSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
}

export async function createAchievement(
  payload: AchievementPayload
): Promise<{ error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { error: "Unauthorized" };
  }

  const { error } = await createServiceRoleClient()
    .from("achievements")
    .insert(payload);

  if (error) return { error: error.message };

  revalidatePath("/admin/achievements");
  revalidatePath("/achievements");
  return {};
}

export async function updateAchievement(
  id: string,
  payload: AchievementPayload
): Promise<{ error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { error: "Unauthorized" };
  }

  const { error } = await createServiceRoleClient()
    .from("achievements")
    .update(payload)
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/achievements");
  revalidatePath("/achievements");
  return {};
}

export async function deleteAchievement(
  id: string
): Promise<{ error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { error: "Unauthorized" };
  }

  const { error } = await createServiceRoleClient()
    .from("achievements")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/achievements");
  revalidatePath("/achievements");
  return {};
}
