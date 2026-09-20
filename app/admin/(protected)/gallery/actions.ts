"use server";

import { revalidatePath } from "next/cache";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServiceRoleClient } from "@/lib/supabase/service";

type GalleryCategory =
  | "Classrooms"
  | "Events"
  | "Sports"
  | "Activities"
  | "Facilities";

interface GalleryPayload {
  title: string;
  alt: string;
  category: GalleryCategory;
  storage_path: string;
  sort_order: number;
  is_published: boolean;
}

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);
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

export async function uploadGalleryImage(
  formData: FormData
): Promise<{ storagePath?: string; error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { error: "Unauthorized" };
  }

  const file = formData.get("image") as File | null;
  if (!file || !file.size) return { error: "No file provided." };
  if (!ALLOWED_TYPES.has(file.type))
    return { error: "Unsupported type. Use JPG, PNG, WebP, or AVIF." };
  if (file.size > 10 * 1024 * 1024)
    return { error: "File must be smaller than 10 MB." };

  const ext = EXT_MAP[file.type] ?? "jpg";
  const storagePath = `gallery/${crypto.randomUUID()}.${ext}`;
  const db = createServiceRoleClient();

  const { error: uploadError } = await db.storage
    .from("gallery")
    .upload(storagePath, await file.arrayBuffer(), {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) return { error: uploadError.message };
  return { storagePath };
}

export async function createGalleryImage(
  payload: GalleryPayload
): Promise<{ error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { error: "Unauthorized" };
  }

  const { error } = await createServiceRoleClient()
    .from("gallery_images")
    .insert(payload);

  if (error) return { error: error.message };

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  return {};
}

export async function updateGalleryImage(
  id: string,
  payload: GalleryPayload,
  replacedStoragePath?: string
): Promise<{ error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { error: "Unauthorized" };
  }

  const db = createServiceRoleClient();
  const { error } = await db.from("gallery_images").update(payload).eq("id", id);
  if (error) return { error: error.message };

  // Remove the old storage file after a successful DB update
  if (replacedStoragePath) {
    await db.storage.from("gallery").remove([replacedStoragePath]);
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  return {};
}

export async function deleteGalleryImage(
  id: string,
  storagePath: string
): Promise<{ error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { error: "Unauthorized" };
  }

  const db = createServiceRoleClient();
  const { error } = await db.from("gallery_images").delete().eq("id", id);
  if (error) return { error: error.message };

  // Remove the storage file after a successful DB delete
  await db.storage.from("gallery").remove([storagePath]);

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  return {};
}
