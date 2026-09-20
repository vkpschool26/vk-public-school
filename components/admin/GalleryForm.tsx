"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { GalleryImageRow } from "@/types/database";
import {
  createGalleryImage,
  updateGalleryImage,
  uploadGalleryImage,
} from "@/app/admin/(protected)/gallery/actions";

type GalleryCategory = GalleryImageRow["category"];

interface GalleryFormProps {
  mode: "create" | "edit";
  initialData?: GalleryImageRow;
  existingPublicUrl?: string;
}

const CATEGORIES: GalleryCategory[] = [
  "Classrooms",
  "Events",
  "Sports",
  "Activities",
  "Facilities",
];
const CLIENT_MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

const fieldClass =
  "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition bg-white";
const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

export function GalleryForm({
  mode,
  initialData,
  existingPublicUrl,
}: GalleryFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [alt, setAlt] = useState(initialData?.alt ?? "");
  const [category, setCategory] = useState<GalleryCategory>(
    initialData?.category ?? "Classrooms"
  );
  const [sortOrder, setSortOrder] = useState(
    initialData?.sort_order?.toString() ?? "0"
  );
  const [isPublished, setIsPublished] = useState(
    initialData?.is_published ?? true
  );

  // Image state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  // What the preview shows — new blob URL takes priority over existing saved image
  const previewSrc = localPreview ?? existingPublicUrl ?? null;
  const hasImage = previewSrc !== null;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setImageError("Unsupported type. Use JPG, PNG, WebP, or AVIF.");
      return;
    }
    if (file.size > CLIENT_MAX_BYTES) {
      setImageError("Image must be smaller than 5 MB.");
      return;
    }

    setImageError(null);
    if (localPreview) URL.revokeObjectURL(localPreview);
    setImageFile(file);
    setLocalPreview(URL.createObjectURL(file));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (mode === "create" && !imageFile) {
      setImageError("Please select an image to upload.");
      return;
    }

    startTransition(async () => {
      let resolvedStoragePath = initialData?.storage_path ?? "";

      if (imageFile) {
        const fd = new FormData();
        fd.append("image", imageFile);
        const uploadResult = await uploadGalleryImage(fd);
        if (uploadResult.error) {
          setImageError(uploadResult.error);
          return;
        }
        resolvedStoragePath = uploadResult.storagePath!;
      }

      const payload = {
        title: title.trim(),
        alt: alt.trim(),
        category,
        storage_path: resolvedStoragePath,
        sort_order: parseInt(sortOrder, 10) || 0,
        is_published: isPublished,
      };

      const result =
        mode === "create"
          ? await createGalleryImage(payload)
          : await updateGalleryImage(
              initialData!.id,
              payload,
              imageFile ? initialData!.storage_path : undefined
            );

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/admin/gallery");
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      {/* Image upload — required for create, replace-only for edit */}
      <div>
        <span className={labelClass}>
          Photo{" "}
          {mode === "create" ? (
            <span className="text-red-500">*</span>
          ) : (
            <span className="font-normal text-slate-400">(click to replace)</span>
          )}
        </span>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={handleFileChange}
        />

        {hasImage ? (
          <div
            className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" && fileInputRef.current?.click()
            }
            aria-label="Replace image"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewSrc!}
              alt="Preview"
              className="w-full h-52 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-white text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-lg">
                Click to replace
              </span>
            </div>
            {imageFile && (
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md max-w-[80%] truncate">
                {imageFile.name}
              </span>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/40 transition-colors group"
          >
            <div className="flex flex-col items-center gap-2 pointer-events-none">
              <svg
                className="w-8 h-8 text-slate-300 group-hover:text-blue-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm text-slate-500 group-hover:text-blue-700 transition-colors">
                Click to upload photo
              </span>
              <span className="text-xs text-slate-400">
                JPG, PNG, WebP, AVIF · Max 5 MB
              </span>
            </div>
          </button>
        )}

        {imageError && (
          <p className="text-red-600 text-xs mt-1.5">{imageError}</p>
        )}
      </div>

      <div>
        <label htmlFor="title" className={labelClass}>
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={fieldClass}
          placeholder="e.g. Annual Sports Day 2026"
        />
      </div>

      <div>
        <label htmlFor="alt" className={labelClass}>
          Alt text <span className="text-red-500">*</span>
        </label>
        <input
          id="alt"
          type="text"
          required
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          className={fieldClass}
          placeholder="Describe the photo for screen readers"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="category" className={labelClass}>
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as GalleryCategory)}
            className={fieldClass}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sort_order" className={labelClass}>
            Sort order
          </label>
          <input
            id="sort_order"
            type="number"
            min={0}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={fieldClass}
            placeholder="0"
          />
          <p className="text-xs text-slate-400 mt-1">
            Lower numbers appear first.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="is_published"
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 text-blue-800 focus:ring-blue-800 cursor-pointer"
        />
        <label
          htmlFor="is_published"
          className="text-sm font-medium text-slate-700 cursor-pointer"
        >
          Published{" "}
          <span className="font-normal text-slate-500">
            (visible in the public gallery)
          </span>
        </label>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending
            ? mode === "create"
              ? "Uploading…"
              : "Saving…"
            : mode === "create"
              ? "Upload Photo"
              : "Save Changes"}
        </Button>
        <Button variant="ghost" href="/admin/gallery">
          Cancel
        </Button>
      </div>
    </form>
  );
}
