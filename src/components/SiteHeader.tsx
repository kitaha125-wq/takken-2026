"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader({
  viewerName,
  simulated,
}: {
  viewerName?: string;
  simulated?: boolean;
}) {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "今日の提案" },
    { href: "/saved", label: "保存したレシピ" },
  ];

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-5 md:px-8">
      <Link href="/" className="group flex items-baseline gap-2">
        <span className="display text-2xl font-semibold tracking-wide md:text-3xl">
          きょうめし
        </span>
        <span className="hidden text-sm text-ink-soft sm:inline">
          今日のごはんを決める
        </span>
      </Link>
      <nav className="flex items-center gap-2 text-sm md:gap-3">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-1.5 transition ${
                active
                  ? "bg-moss text-white"
                  : "bg-white/40 text-ink-soft hover:bg-white/70"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        {viewerName ? (
          <span className="hidden text-xs text-ink-soft md:inline">
            {viewerName}
            {simulated ? " · ローカル模擬" : ""}
          </span>
        ) : null}
      </nav>
    </header>
  );
}
