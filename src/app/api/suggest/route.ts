import { BUZZ_TRENDS, suggestRecipes } from "@/lib/cookbook";
import { noStore, requireOwner } from "@/lib/auth";
import type { RecipeMood } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    { trends: BUZZ_TRENDS, sample: true },
    { headers: { "cache-control": "public, max-age=300" } },
  );
}

export async function POST(request: Request) {
  const owner = await requireOwner(request);
  if (owner instanceof Response) return owner;

  const body = (await request.json().catch(() => null)) as {
    fridge?: unknown;
    mood?: unknown;
    buzzId?: unknown;
    buzzText?: unknown;
  } | null;

  const fridge = Array.isArray(body?.fridge)
    ? body!.fridge.map((x) => String(x)).slice(0, 60)
    : [];
  const mood = (
    ["quick", "everyday", "comfort", "fresh", "any"].includes(String(body?.mood))
      ? String(body?.mood)
      : "any"
  ) as RecipeMood | "any";

  const recipes = suggestRecipes({
    fridge,
    mood,
    buzzId: body?.buzzId ? String(body.buzzId) : null,
    buzzText: body?.buzzText ? String(body.buzzText).slice(0, 80) : "",
    limit: 4,
  });

  return Response.json(
    {
      recipes,
      trends: BUZZ_TRENDS,
      sampleNote:
        "話題レシピは家庭向けに編集したサンプル傾向です。実サービス連携ではありません。",
    },
    { headers: noStore },
  );
}
