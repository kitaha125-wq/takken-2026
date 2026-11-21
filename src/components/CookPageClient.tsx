"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CookMode } from "./CookMode";
import type { SavedRecipe } from "@/lib/types";

export function CookPageClient({ id }: { id: string }) {
  const [recipe, setRecipe] = useState<SavedRecipe | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch(`/api/recipes/${id}`);
      const data = await res.json().catch(() => ({}));
      if (cancelled) return;
      if (!res.ok) {
        setError(data.error || "レシピが見つかりません");
        return;
      }
      setRecipe(data.recipe);
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6">
        <p>{error}</p>
        <Link href="/saved" className="primary-btn">
          保存一覧へ
        </Link>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="cook-shell flex min-h-dvh items-center justify-center">
        <p className="text-white/70">料理モードを準備中…</p>
      </div>
    );
  }

  return (
    <CookMode
      title={recipe.title}
      steps={recipe.steps}
      ingredients={recipe.ingredients}
      tips={recipe.tips}
      onClose={() => {
        window.location.href = "/saved";
      }}
    />
  );
}
