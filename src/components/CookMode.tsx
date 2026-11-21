"use client";

import { useEffect, useMemo, useState } from "react";
import type { RecipeIngredient, RecipeStep } from "@/lib/types";

export function CookMode({
  title,
  steps,
  ingredients,
  tips,
  onClose,
}: {
  title: string;
  steps: RecipeStep[];
  ingredients: RecipeIngredient[];
  tips?: string[];
  onClose?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const step = steps[index];
  const progress = ((index + 1) / Math.max(steps.length, 1)) * 100;
  const next = steps[index + 1];

  const stepIngredients = useMemo(() => {
    const names = step?.ingredients ?? [];
    if (!names.length) return [] as RecipeIngredient[];
    return ingredients.filter((ing) =>
      names.some((n) => ing.name.includes(n) || n.includes(ing.name)),
    );
  }, [ingredients, step]);

  useEffect(() => {
    setSecondsLeft(step?.minutes ? step.minutes * 60 : null);
  }, [index, step?.minutes]);

  useEffect(() => {
    if (secondsLeft === null || secondsLeft <= 0) return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s === null ? s : Math.max(0, s - 1)));
    }, 1000);
    return () => window.clearInterval(id);
  }, [secondsLeft]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setIndex((i) => Math.min(steps.length - 1, i + 1));
      }
      if (e.key === "ArrowLeft") {
        setIndex((i) => Math.max(0, i - 1));
      }
      if (e.key === "Escape" && onClose) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, steps.length]);

  if (!step) {
    return (
      <div className="cook-shell flex items-center justify-center p-8">
        <p>手順がありません</p>
      </div>
    );
  }

  const mm = secondsLeft !== null ? Math.floor(secondsLeft / 60) : null;
  const ss =
    secondsLeft !== null
      ? String(secondsLeft % 60).padStart(2, "0")
      : null;

  return (
    <div className="cook-shell flex flex-col">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-5 py-6 md:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-white/60">料理モード</p>
            <h1 className="display text-2xl md:text-3xl">{title}</h1>
          </div>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80"
            >
              閉じる
            </button>
          ) : null}
        </div>

        <div className="progress" aria-hidden>
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="text-sm text-white/55">
          ステップ {index + 1} / {steps.length}
        </p>

        <section key={index} className="anim-step flex-1 space-y-5">
          <h2 className="display text-4xl leading-tight md:text-6xl">
            {step.title}
          </h2>
          <p className="max-w-3xl text-xl leading-relaxed text-white/90 md:text-3xl md:leading-snug">
            {step.body}
          </p>

          {secondsLeft !== null ? (
            <div className="inline-flex items-baseline gap-3 rounded-2xl bg-white/8 px-4 py-3">
              <span className="text-sm text-white/55">目安タイマー</span>
              <span className="display text-3xl tabular-nums">
                {mm}:{ss}
              </span>
              {secondsLeft === 0 ? (
                <span className="text-sun">時間です</span>
              ) : null}
            </div>
          ) : null}

          {stepIngredients.length > 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="mb-2 text-sm text-white/55">このステップの材料</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {stepIngredients.map((ing) => {
                  const key = `${ing.name}-${ing.amount}`;
                  return (
                    <li key={key}>
                      <label className="flex cursor-pointer items-center gap-3 text-lg">
                        <input
                          type="checkbox"
                          checked={!!checked[key]}
                          onChange={() =>
                            setChecked((c) => ({ ...c, [key]: !c[key] }))
                          }
                          className="size-5 accent-[#9caf88]"
                        />
                        <span
                          className={
                            checked[key] ? "text-white/40 line-through" : ""
                          }
                        >
                          {ing.name}
                          <span className="ml-2 text-white/55">{ing.amount}</span>
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </section>

        {next ? (
          <div className="rounded-2xl border border-dashed border-white/15 px-4 py-3 text-white/55">
            <span className="text-xs tracking-wide">つぎ</span>
            <p className="mt-1 text-base text-white/75 md:text-lg">
              {next.title} — {next.body.slice(0, 48)}
              {next.body.length > 48 ? "…" : ""}
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-sun/30 bg-sun/10 px-4 py-3">
            <p className="display text-xl">完成です</p>
            {tips?.[0] ? (
              <p className="mt-1 text-sm text-white/70">ひとこと: {tips[0]}</p>
            ) : null}
          </div>
        )}

        <div className="sticky bottom-4 grid grid-cols-2 gap-3 pb-2">
          <button
            type="button"
            className="rounded-2xl border border-white/20 bg-white/5 py-4 text-lg disabled:opacity-40"
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
          >
            戻る
          </button>
          <button
            type="button"
            className="rounded-2xl bg-[#9caf88] py-4 text-lg font-medium text-[#15231c] disabled:opacity-40"
            disabled={index >= steps.length - 1}
            onClick={() => setIndex((i) => Math.min(steps.length - 1, i + 1))}
          >
            できた・次へ
          </button>
        </div>
      </div>
    </div>
  );
}
