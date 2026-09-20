"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { ActivityRow } from "@/types/database";
import {
  createActivity,
  updateActivity,
} from "@/app/admin/(protected)/activities/actions";

interface ActivityFormProps {
  mode: "create" | "edit";
  initialData?: ActivityRow;
}

const ICONS = ["sports", "arts", "yoga", "nature"] as const;
const COLORS = ["emerald", "amber", "blue", "purple"] as const;

const COLOR_PREVIEW: Record<string, string> = {
  emerald: "bg-emerald-600",
  amber: "bg-amber-500",
  blue: "bg-blue-700",
  purple: "bg-purple-600",
};

const fieldClass =
  "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition bg-white";
const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

export function ActivityForm({ mode, initialData }: ActivityFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const newItemRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );
  const [icon, setIcon] = useState(initialData?.icon ?? "sports");
  const [color, setColor] = useState(initialData?.color ?? "blue");
  const [sortOrder, setSortOrder] = useState(
    initialData?.sort_order?.toString() ?? "0"
  );
  const [isPublished, setIsPublished] = useState(
    initialData?.is_published ?? true
  );
  const [items, setItems] = useState<string[]>(initialData?.items ?? []);
  const [newItem, setNewItem] = useState("");

  function addItem() {
    const trimmed = newItem.trim();
    if (!trimmed || items.includes(trimmed)) return;
    setItems((prev) => [...prev, trimmed]);
    setNewItem("");
    newItemRef.current?.focus();
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function handleItemKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload = {
      title: title.trim(),
      description: description.trim(),
      icon,
      color,
      items,
      sort_order: parseInt(sortOrder, 10) || 0,
      is_published: isPublished,
    };

    startTransition(async () => {
      const result =
        mode === "create"
          ? await createActivity(payload)
          : await updateActivity(initialData!.id, payload);

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/admin/activities");
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
          placeholder="e.g. Sports & Physical Education"
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${fieldClass} resize-none`}
          placeholder="Short description shown in the card header"
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
          <label htmlFor="color" className={labelClass}>
            Color <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <select
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className={fieldClass}
            >
              {COLORS.map((c) => (
                <option key={c} value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
            <span
              className={`w-6 h-6 rounded-full shrink-0 ${COLOR_PREVIEW[color] ?? "bg-slate-300"}`}
              aria-hidden="true"
            />
          </div>
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

      {/* Items list */}
      <div>
        <span className={labelClass}>
          Items{" "}
          <span className="font-normal text-slate-400">
            (press Enter or click Add)
          </span>
        </span>

        {/* Existing items */}
        {items.length > 0 && (
          <ul className="flex flex-wrap gap-2 mb-3">
            {items.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-3 py-1.5 text-sm text-slate-700"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="text-slate-400 hover:text-red-600 transition-colors leading-none"
                  aria-label={`Remove "${item}"`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Add new item */}
        <div className="flex gap-2">
          <input
            ref={newItemRef}
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={handleItemKeyDown}
            className={`${fieldClass} flex-1`}
            placeholder="e.g. Cricket, Football, Athletics…"
            maxLength={80}
          />
          <button
            type="button"
            onClick={addItem}
            disabled={!newItem.trim()}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors"
          >
            Add
          </button>
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
              ? "Create Activity"
              : "Save Changes"}
        </Button>
        <Button variant="ghost" href="/admin/activities">
          Cancel
        </Button>
      </div>
    </form>
  );
}
