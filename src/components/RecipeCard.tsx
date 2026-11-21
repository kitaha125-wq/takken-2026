"use client";

import type { RecipeDraft } from "@/lib/types";

const MOOD_LABEL: Record<string, string> = {
  quick: "時短",
  everyday: "いつもの",
  comfort: "こってり",
  fresh: "さっぱり",
};

export function RecipeCard({
  recipe,
  saving,
  onSave,
  onCookPreview,
}: {
  recipe: RecipeDraft;
  saving?: boolean;
  onSave: () => void;
  onCookPreview: () => void;
}) {
  return (
    <article className="grain-panel flex h-full flex-col gap-4 rounded-[1.5rem] border border-[var(--line)] bg-white/55 p-5 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs tracking-wide text-moss">
            {MOOD_LABEL[recipe.mood] ?? recipe.mood} · {recipe.minutes}分 ·{" "}
            {recipe.servings}人分
          </p>
          <h3 className="display mt-1 text-2xl leading-snug">{recipe.title}</h3>
        </div>
        {recipe.source === "buzz" ? (
          <span className="shrink-0 rounded-full bg-sun/20 px-2.5 py-1 text-xs text-ink">
            話題寄り
          </span>
        ) : null}
      </div>
      <p className="text-sm leading-relaxed text-ink-soft">{recipe.summary}</p>
      <p className="text-sm text-moss-deep">{recipe.why}</p>
      <div className="flex flex-wrap gap-2 text-xs">
        {recipe.matchedIngredients.slice(0, 5).map((x) => (
          <span key={x} className="chip bg-mist/80">
            あり · {x}
          </span>
        ))}
        {recipe.missingIngredients.slice(0, 3).map((x) => (
          <span key={x} className="chip bg-stone/80">
            足りない · {x}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        <button type="button" className="primary-btn" onClick={onSave} disabled={saving}>
          {saving ? "保存中…" : "保存する"}
        </button>
        <button type="button" className="ghost-btn" onClick={onCookPreview}>
          手順を見る
        </button>
      </div>
    </article>
  );
}
