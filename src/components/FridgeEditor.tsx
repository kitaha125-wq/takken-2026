"use client";

import { useState, type FormEvent } from "react";

const SUGGESTIONS = [
  "卵",
  "キャベツ",
  "玉ねぎ",
  "豆腐",
  "豚肉",
  "ごはん",
  "納豆",
  "きのこ",
  "にんじん",
  "ネギ",
];

export function FridgeEditor({
  items,
  onChange,
}: {
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  function add(name: string) {
    const cleaned = name.trim();
    if (!cleaned) return;
    if (items.some((x) => x === cleaned)) {
      setDraft("");
      return;
    }
    onChange([...items, cleaned]);
    setDraft("");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    add(draft);
  }

  return (
    <div className="space-y-3">
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          className="field"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="冷蔵庫にあるもの（例: 卵、キャベツ）"
          aria-label="食材を追加"
        />
        <button type="submit" className="ghost-btn shrink-0">
          追加
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.filter((s) => !items.includes(s)).map((s) => (
          <button
            key={s}
            type="button"
            className="chip hover:border-moss/40"
            onClick={() => add(s)}
          >
            + {s}
          </button>
        ))}
      </div>
      {items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span key={item} className="chip bg-white/80">
              {item}
              <button
                type="button"
                aria-label={`${item}を削除`}
                onClick={() => onChange(items.filter((x) => x !== item))}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-ink-soft">
          まだ空です。入れるほど、今日の提案がシャープになります。
        </p>
      )}
    </div>
  );
}
