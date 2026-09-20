"use server";

import { revalidatePath } from "next/cache";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServiceRoleClient } from "@/lib/supabase/service";

interface ActivityPayload {
  title: string;
  description: string;
  icon: string;
  color: string;
  items: string[];
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

export async function createActivity(
  payload: ActivityPayload
): Promise<{ error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { error: "Unauthorized" };
  }

  const { error } = await createServiceRoleClient()
    .from("activities")
    .insert(payload);

  if (error) return { error: error.message };

  revalidatePath("/admin/activities");
  revalidatePath("/activities");
  revalidatePath("/");
  return {};
}

export async function updateActivity(
  id: string,
  payload: ActivityPayload
): Promise<{ error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { error: "Unauthorized" };
  }

  const { error } = await createServiceRoleClient()
    .from("activities")
    .update(payload)
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/activities");
  revalidatePath("/activities");
  revalidatePath("/");
  return {};
}

export async function deleteActivity(id: string): Promise<{ error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { error: "Unauthorized" };
  }

  const { error } = await createServiceRoleClient()
    .from("activities")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/activities");
  revalidatePath("/activities");
  revalidatePath("/");
  return {};
}
