"use server";

import { revalidatePath } from "next/cache";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServiceRoleClient } from "@/lib/supabase/service";

type EventCategory = "Academic" | "Cultural" | "Sports" | "Holiday";

interface EventPayload {
  title: string;
  date: string;
  description: string;
  category: EventCategory;
  image_url: string | null;
  is_published: boolean;
}

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const EXT_MAP: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

async function requireAuth() {
  const supabase = await createAdminSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
}

export async function uploadEventImage(
  formData: FormData
): Promise<{ url?: string; error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { error: "Unauthorized" };
  }

  const file = formData.get("image") as File | null;
  if (!file || !file.size) return { error: "No file provided." };

  if (!ALLOWED_TYPES.has(file.type)) {
    return { error: "Unsupported file type. Use JPG, PNG, WebP, or AVIF." };
  }
  if (file.size > 10 * 1024 * 1024) {
    return { error: "File must be smaller than 10 MB." };
  }

  const ext = EXT_MAP[file.type] ?? "jpg";
  const path = `events/${crypto.randomUUID()}.${ext}`;
  const db = createServiceRoleClient();

  const { error: uploadError } = await db.storage
    .from("gallery")
    .upload(path, await file.arrayBuffer(), {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) return { error: uploadError.message };

  return { url: db.storage.from("gallery").getPublicUrl(path).data.publicUrl };
}

export async function createEvent(
  payload: EventPayload
): Promise<{ error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { error: "Unauthorized" };
  }

  const { error } = await createServiceRoleClient()
    .from("events")
    .insert(payload);

  if (error) return { error: error.message };

  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
  return {};
}

export async function updateEvent(
  id: string,
  payload: EventPayload
): Promise<{ error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { error: "Unauthorized" };
  }

  const { error } = await createServiceRoleClient()
    .from("events")
    .update(payload)
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
  return {};
}

export async function deleteEvent(id: string): Promise<{ error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { error: "Unauthorized" };
  }

  const { error } = await createServiceRoleClient()
    .from("events")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
  return {};
}
