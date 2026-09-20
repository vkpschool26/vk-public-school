"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteEvent } from "@/app/admin/(protected)/events/actions";

interface Props {
  id: string;
  title: string;
}

export function EventDeleteButton({ id, title }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm(`Delete "${title}"?\n\nThis cannot be undone.`)) return;

    startTransition(async () => {
      const result = await deleteEvent(id);
      if (result.error) {
        alert(`Failed to delete: ${result.error}`);
      } else {
        router.refresh();
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors disabled:opacity-40"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
