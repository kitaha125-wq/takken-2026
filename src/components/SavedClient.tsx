"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import type { SavedRecipe } from "@/lib/types";

export function SavedClient() {
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [viewerName, setViewerName] = useState("ゲスト");
  const [simulated, setSimulated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [meRes, listRes] = await Promise.all([
        fetch("/api/me"),
        fetch("/api/recipes"),
      ]);
      if (meRes.ok) {
        const me = await meRes.json();
        if (me.verified) {
          setViewerName(me.name);
          setSimulated(!!me.simulated);
        }
      }
      if (!listRes.ok) throw new Error("読み込みに失敗しました");
      const data = await listRes.json();
      setRecipes(data.recipes ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "読み込みに失敗しました");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id: number) {
    const res = await fetch(`/api/recipes/${id}`, { method: "DELETE" });
    if (res.ok || res.status === 204) {
      setRecipes((prev) => prev.filter((r) => r.id !== id));
    }
  }

  return (
    <div className="min-h-dvh pb-16">
      <SiteHeader viewerName={viewerName} simulated={simulated} />
      <main className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="mt-4 max-w-2xl">
          <h1 className="display text-4xl md:text-5xl">保存したレシピ</h1>
          <p className="mt-3 text-ink-soft">
            料理モードは画面いっぱいに今やる一手だけを出します。戻らなくても次の一手が見えます。
          </p>
        </div>

        {loading ? (
          <p className="mt-10 text-ink-soft">読み込み中…</p>
        ) : error ? (
          <p className="mt-10 text-red-700">{error}</p>
        ) : recipes.length === 0 ? (
          <div className="mt-10 rounded-[1.75rem] border border-dashed border-[var(--line)] px-6 py-12 text-center">
            <p className="text-ink-soft">まだ保存がありません。</p>
            <Link href="/" className="primary-btn mt-5 inline-flex">
              今日の提案へ
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {recipes.map((recipe) => (
              <li
                key={recipe.id}
                className="flex flex-col gap-4 rounded-[1.5rem] border border-[var(--line)] bg-white/55 p-5 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-xs text-moss">
                    {recipe.minutes}分 · {recipe.steps.length}ステップ
                    {recipe.buzzNote ? ` · ${recipe.buzzNote}` : ""}
                  </p>
                  <h2 className="display mt-1 text-2xl">{recipe.title}</h2>
                  <p className="mt-1 text-sm text-ink-soft">{recipe.summary}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/cook/${recipe.id}`} className="primary-btn">
                    料理モード
                  </Link>
                  <button
                    type="button"
                    className="ghost-btn"
                    onClick={() => remove(recipe.id)}
                  >
                    削除
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
