"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteGalleryImage } from "@/app/admin/(protected)/gallery/actions";

interface Props {
  id: string;
  title: string;
  storagePath: string;
}

export function GalleryDeleteButton({ id, title, storagePath }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm(`Delete "${title}"?\n\nThis will permanently remove the photo and cannot be undone.`))
      return;

    startTransition(async () => {
      const result = await deleteGalleryImage(id, storagePath);
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
      className="text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors disabled:opacity-40 text-sm"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
