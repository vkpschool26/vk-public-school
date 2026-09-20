"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { NoticeRow } from "@/types/database";
import {
  createNotice,
  updateNotice,
} from "@/app/admin/(protected)/news/actions";

type NoticeCategory = NoticeRow["category"];

interface NoticeFormProps {
  mode: "create" | "edit";
  initialData?: NoticeRow;
}

const CATEGORIES: NoticeCategory[] = [
  "Academic",
  "General",
  "Holiday",
  "Admissions",
];

const fieldClass =
  "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition bg-white";
const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

export function NoticeForm({ mode, initialData }: NoticeFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [date, setDate] = useState(initialData?.date ?? "");
  const [category, setCategory] = useState<NoticeCategory>(
    initialData?.category ?? "General"
  );
  const [content, setContent] = useState(initialData?.content ?? "");
  const [isPublished, setIsPublished] = useState(
    initialData?.is_published ?? true
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload = {
      title: title.trim(),
      date,
      category,
      content: content.trim(),
      is_published: isPublished,
    };

    startTransition(async () => {
      const result =
        mode === "create"
          ? await createNotice(payload)
          : await updateNotice(initialData!.id, payload);

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/admin/news");
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
          placeholder="Notice title"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
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
          <label htmlFor="category" className={labelClass}>
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as NoticeCategory)}
            className={fieldClass}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="content" className={labelClass}>
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          required
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`${fieldClass} resize-none`}
          placeholder="Full notice text…"
        />
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
              ? "Create Notice"
              : "Save Changes"}
        </Button>
        <Button variant="ghost" href="/admin/news">
          Cancel
        </Button>
      </div>
    </form>
  );
}
