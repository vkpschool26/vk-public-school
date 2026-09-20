"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { EventRow } from "@/types/database";
import {
  createEvent,
  updateEvent,
  uploadEventImage,
} from "@/app/admin/(protected)/events/actions";

type EventCategory = EventRow["category"];

interface EventFormProps {
  mode: "create" | "edit";
  initialData?: EventRow;
}

const CATEGORIES: EventCategory[] = ["Academic", "Cultural", "Sports", "Holiday"];
const CLIENT_MAX_BYTES = 5 * 1024 * 1024; // 5 MB — stricter than server for fast feedback
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

const fieldClass =
  "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition bg-white";
const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

export function EventForm({ mode, initialData }: EventFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [date, setDate] = useState(initialData?.date ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [category, setCategory] = useState<EventCategory>(
    initialData?.category ?? "Academic"
  );
  const [isPublished, setIsPublished] = useState(
    initialData?.is_published ?? true
  );

  // Image state: track the existing saved URL separately from a newly-picked file
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(
    initialData?.image_url ?? null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  // What the <img> preview tag shows: a blob URL if a new file is picked, else the saved URL
  const previewSrc = localPreview ?? existingImageUrl;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
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

  function handleRemoveImage() {
    if (localPreview) URL.revokeObjectURL(localPreview);
    setImageFile(null);
    setLocalPreview(null);
    setExistingImageUrl(null);
    setImageError(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      // If a new file was picked, upload it first and get back the public URL
      let resolvedImageUrl: string | null = existingImageUrl;
      if (imageFile) {
        const fd = new FormData();
        fd.append("image", imageFile);
        const uploadResult = await uploadEventImage(fd);
        if (uploadResult.error) {
          setImageError(uploadResult.error);
          return;
        }
        resolvedImageUrl = uploadResult.url ?? null;
      }

      const payload = {
        title: title.trim(),
        date,
        description: description.trim(),
        category,
        image_url: resolvedImageUrl,
        is_published: isPublished,
      };

      const result =
        mode === "create"
          ? await createEvent(payload)
          : await updateEvent(initialData!.id, payload);

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/admin/events");
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
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
          placeholder="Event title"
        />
      </div>

      <div>
        <label htmlFor="date" className={labelClass}>
          Date <span className="text-red-500">*</span>
        </label>
        <input
          id="date"
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${fieldClass} resize-none`}
          placeholder="Brief description of the event"
        />
      </div>

      <div>
        <label htmlFor="category" className={labelClass}>
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as EventCategory)}
          className={fieldClass}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Image upload */}
      <div>
        <span className={labelClass}>
          Event Image{" "}
          <span className="font-normal text-slate-400">(optional)</span>
        </span>

        {/* Hidden file input — triggered by the buttons below */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={handleFileChange}
        />

        {previewSrc ? (
          <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewSrc}
              alt="Event image preview"
              className="w-full h-48 object-cover"
            />
            {/* Overlay controls shown on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
            {/* Show filename badge when a new file is staged */}
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
                Click to upload image
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
            (visible on the public website)
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
              ? "Creating…"
              : "Saving…"
            : mode === "create"
              ? "Create Event"
              : "Save Changes"}
        </Button>
        <Button variant="ghost" href="/admin/events">
          Cancel
        </Button>
      </div>
    </form>
  );
}
