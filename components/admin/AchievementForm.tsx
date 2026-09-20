"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { AchievementRow } from "@/types/database";
import {
  createAchievement,
  updateAchievement,
} from "@/app/admin/(protected)/achievements/actions";

interface AchievementFormProps {
  mode: "create" | "edit";
  initialData?: AchievementRow;
}

const ICONS = ["award", "academic", "sports", "culture", "nature"] as const;

const fieldClass =
  "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition bg-white";
const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

export function AchievementForm({ mode, initialData }: AchievementFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );
  const [icon, setIcon] = useState(initialData?.icon ?? "award");
  const [year, setYear] = useState(
    initialData?.year ?? new Date().getFullYear().toString()
  );
  const [sortOrder, setSortOrder] = useState(
    initialData?.sort_order?.toString() ?? "0"
  );
  const [isPublished, setIsPublished] = useState(
    initialData?.is_published ?? true
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload = {
      title: title.trim(),
      description: description.trim(),
      icon,
      year: year.trim(),
      sort_order: parseInt(sortOrder, 10) || 0,
      is_published: isPublished,
    };

    startTransition(async () => {
      const result =
        mode === "create"
          ? await createAchievement(payload)
          : await updateAchievement(initialData!.id, payload);

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/admin/achievements");
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
          placeholder="e.g. Best School Award"
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
          placeholder="Brief description of the achievement"
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <div>
          <label htmlFor="icon" className={labelClass}>
            Icon <span className="text-red-500">*</span>
          </label>
          <select
            id="icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className={fieldClass}
          >
            {ICONS.map((ic) => (
              <option key={ic} value={ic}>
                {ic.charAt(0).toUpperCase() + ic.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="year" className={labelClass}>
            Year <span className="text-red-500">*</span>
          </label>
          <input
            id="year"
            type="text"
            required
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={fieldClass}
            placeholder="2026"
            maxLength={4}
          />
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
              ? "Create Achievement"
              : "Save Changes"}
        </Button>
        <Button variant="ghost" href="/admin/achievements">
          Cancel
        </Button>
      </div>
    </form>
  );
}
