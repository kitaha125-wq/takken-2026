import { sql } from "@/lib/db";
import { noStore, requireOwner } from "@/lib/auth";
import { draftPayload, rowToSaved } from "@/lib/recipe-map";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const owner = await requireOwner(request);
  if (owner instanceof Response) return owner;

  const rows = await sql(
    `select id, title, summary, minutes, servings, mood, source, buzz_note,
            ingredients, steps, tips, matched_ingredients, missing_ingredients, created_at
     from recipes where owner = $1 order by created_at desc limit 50`,
    [owner.owner],
  );

  return Response.json(
    { recipes: rows.map((r) => rowToSaved(r as never)) },
    { headers: noStore },
  );
}

export async function POST(request: Request) {
  const owner = await requireOwner(request);
  if (owner instanceof Response) return owner;

  const body = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  if (!body) {
    return Response.json({ error: "invalid body" }, { status: 400, headers: noStore });
  }

  const draft = draftPayload(body);
  if (!draft.title || draft.steps.length === 0) {
    return Response.json(
      { error: "title and steps required" },
      { status: 400, headers: noStore },
    );
  }

  const rows = await sql(
    `insert into recipes (
      owner, title, summary, minutes, servings, mood, source, buzz_note,
      ingredients, steps, tips, matched_ingredients, missing_ingredients
    ) values (
      $1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10::jsonb,$11::jsonb,$12::jsonb,$13::jsonb
    ) returning id, title, summary, minutes, servings, mood, source, buzz_note,
      ingredients, steps, tips, matched_ingredients, missing_ingredients, created_at`,
    [
      owner.owner,
      draft.title.slice(0, 120),
      draft.summary.slice(0, 400),
      Math.min(Math.max(draft.minutes, 1), 240),
      Math.min(Math.max(draft.servings, 1), 12),
      draft.mood,
      draft.source,
      draft.buzzNote.slice(0, 120),
      JSON.stringify(draft.ingredients),
      JSON.stringify(draft.steps),
      JSON.stringify(draft.tips),
      JSON.stringify(draft.matchedIngredients),
      JSON.stringify(draft.missingIngredients),
    ],
  );

  return Response.json(
    { recipe: rowToSaved(rows[0] as never) },
    { status: 201, headers: noStore },
  );
}
