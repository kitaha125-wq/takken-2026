"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "./SiteHeader";
import { FridgeEditor } from "./FridgeEditor";
import { RecipeCard } from "./RecipeCard";
import { CookMode } from "./CookMode";
import type { BuzzTrend, RecipeDraft, RecipeMood } from "@/lib/types";

const MOODS: { id: RecipeMood | "any"; label: string }[] = [
  { id: "any", label: "おまかせ" },
  { id: "quick", label: "早く" },
  { id: "everyday", label: "いつもの" },
  { id: "comfort", label: "こってり" },
  { id: "fresh", label: "さっぱり" },
];

export function HomeClient() {
  const router = useRouter();
  const [viewerName, setViewerName] = useState("ゲスト");
  const [simulated, setSimulated] = useState(false);
  const [fridge, setFridge] = useState<string[]>([]);
  const [mood, setMood] = useState<RecipeMood | "any">("any");
  const [trends, setTrends] = useState<BuzzTrend[]>([]);
  const [buzzId, setBuzzId] = useState<string | null>(null);
  const [buzzText, setBuzzText] = useState("");
  const [recipes, setRecipes] = useState<RecipeDraft[]>([]);
  const [sampleNote, setSampleNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<RecipeDraft | null>(null);
  const [fridgeReady, setFridgeReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [meRes, fridgeRes, trendRes] = await Promise.all([
        fetch("/api/me"),
        fetch("/api/fridge"),
        fetch("/api/suggest"),
      ]);
      if (cancelled) return;
      if (meRes.ok) {
        const me = await meRes.json();
        if (me.verified) {
          setViewerName(me.name);
          setSimulated(!!me.simulated);
        }
      }
      if (fridgeRes.ok) {
        const data = await fridgeRes.json();
        setFridge(data.items ?? []);
      }
      if (trendRes.ok) {
        const data = await trendRes.json();
        setTrends(data.trends ?? []);
      }
      setFridgeReady(true);
    })().catch(() => setFridgeReady(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const persistFridge = useCallback(async (items: string[]) => {
    setFridge(items);
    await fetch("/api/fridge", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ items }),
    });
  }, []);

  async function suggest() {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ fridge, mood, buzzId, buzzText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "提案に失敗しました");
      setRecipes(data.recipes ?? []);
      setSampleNote(data.sampleNote ?? "");
      if (data.trends) setTrends(data.trends);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "提案に失敗しました");
    } finally {
      setLoading(false);
    }
  }

  async function saveRecipe(recipe: RecipeDraft) {
    setSavingKey(recipe.title);
    setMessage("");
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(recipe),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "保存に失敗しました");
      setMessage(`「${data.recipe.title}」を保存しました`);
      router.prefetch(`/cook/${data.recipe.id}`);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "保存に失敗しました");
    } finally {
      setSavingKey(null);
    }
  }

  if (preview) {
    return (
      <CookMode
        title={preview.title}
        steps={preview.steps}
        ingredients={preview.ingredients}
        tips={preview.tips}
        onClose={() => setPreview(null)}
      />
    );
  }

  return (
    <div className="min-h-dvh pb-16">
      <SiteHeader viewerName={viewerName} simulated={simulated} />

      <section className="relative mx-auto grid min-h-[78vh] w-full max-w-6xl items-end overflow-hidden px-5 pb-10 pt-4 md:px-8 md:pb-14">
        <div
          className="absolute inset-0 -z-10 rounded-[2rem] bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(24,33,29,0.72), rgba(24,33,29,0.28) 48%, rgba(47,107,82,0.18)), url('https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="max-w-2xl text-white">
          <p className="anim-rise display text-5xl leading-none md:text-7xl">
            きょうめし
          </p>
          <h1 className="anim-rise-delay mt-5 text-2xl font-medium leading-snug md:text-4xl">
            冷蔵庫と、いまの話題から
            <br />
            今日のごはんを決める
          </h1>
          <p className="anim-rise-delay-2 mt-4 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
            食材を入れて提案を受け取る。保存したレシピは、料理中に何度もスクロールしなくても追える大きなステップ表示で使えます。
          </p>
          <div className="anim-rise-delay-2 mt-7 flex flex-wrap gap-3">
            <a href="#planner" className="primary-btn anim-pulse">
              今日の提案を作る
            </a>
            <a
              href="/saved"
              className="ghost-btn border-white/25 bg-white/10 text-white"
            >
              保存したレシピ
            </a>
          </div>
        </div>
      </section>

      <main id="planner" className="mx-auto mt-10 w-full max-w-6xl space-y-10 px-5 md:px-8">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.75rem] border border-[var(--line)] bg-white/50 p-5 backdrop-blur-sm md:p-7">
            <h2 className="display text-3xl">冷蔵庫</h2>
            <p className="mt-2 text-sm text-ink-soft">
              あるものを入れるだけで、足りないものも見えた提案になります。
            </p>
            <div className="mt-5">
              {fridgeReady ? (
                <FridgeEditor items={fridge} onChange={persistFridge} />
              ) : (
                <p className="text-sm text-ink-soft">読み込み中…</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-[var(--line)] bg-white/50 p-5 backdrop-blur-sm md:p-7">
              <h2 className="display text-3xl">いまの気分</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={`chip ${
                      mood === m.id ? "border-moss bg-mist" : ""
                    }`}
                    onClick={() => setMood(m.id)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[var(--line)] bg-white/50 p-5 backdrop-blur-sm md:p-7">
              <h2 className="display text-3xl">話題のヒント</h2>
              <p className="mt-2 text-sm text-ink-soft">
                サンプルの話題傾向です。気になった料理名をそのまま書いてもOK。
              </p>
              <div className="mt-4 space-y-3">
                {trends.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() =>
                      setBuzzId((prev) => (prev === t.id ? null : t.id))
                    }
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      buzzId === t.id
                        ? "border-moss bg-mist"
                        : "border-[var(--line)] bg-white/40 hover:bg-white/70"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium">{t.title}</span>
                      <span className="text-xs text-ink-soft">{t.vibe}</span>
                    </div>
                    <p className="mt-1 text-sm text-ink-soft">{t.hook}</p>
                  </button>
                ))}
              </div>
              <input
                className="field mt-4"
                value={buzzText}
                onChange={(e) => setBuzzText(e.target.value)}
                placeholder="例: レモンパスタ、味噌バター炒め"
                aria-label="気になった料理"
              />
            </div>
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="primary-btn text-base"
            onClick={suggest}
            disabled={loading}
          >
            {loading ? "考えています…" : "今日のレシピを提案"}
          </button>
          {message ? <p className="text-sm text-moss-deep">{message}</p> : null}
        </div>

        {sampleNote && recipes.length > 0 ? (
          <p className="text-xs text-ink-soft">{sampleNote}</p>
        ) : null}

        {recipes.length > 0 ? (
          <section className="grid gap-5 md:grid-cols-2">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.title}
                recipe={recipe}
                saving={savingKey === recipe.title}
                onSave={() => saveRecipe(recipe)}
                onCookPreview={() => setPreview(recipe)}
              />
            ))}
          </section>
        ) : (
          <section className="rounded-[1.75rem] border border-dashed border-[var(--line)] px-6 py-12 text-center text-ink-soft">
            冷蔵庫か話題ヒントを入れたら、「今日のレシピを提案」を押してください。
          </section>
        )}
      </main>
    </div>
  );
}
