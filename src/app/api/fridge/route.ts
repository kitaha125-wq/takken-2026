import { sql } from "@/lib/db";
import { noStore, requireOwner } from "@/lib/auth";
import { normalizeIngredient } from "@/lib/cookbook";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const owner = await requireOwner(request);
  if (owner instanceof Response) return owner;

  const rows = await sql<{ name: string }>(
    "select name from fridge_items where owner = $1 order by name asc",
    [owner.owner],
  );
  return Response.json(
    { items: rows.map((r) => r.name), viewer: owner.name, simulated: owner.simulated },
    { headers: noStore },
  );
}

export async function PUT(request: Request) {
  const owner = await requireOwner(request);
  if (owner instanceof Response) return owner;

  const body = (await request.json().catch(() => null)) as {
    items?: unknown;
  } | null;
  if (!body || !Array.isArray(body.items)) {
    return Response.json({ error: "items required" }, { status: 400, headers: noStore });
  }

  const items = [
    ...new Set(
      body.items
        .map((x) => normalizeIngredient(String(x)))
        .filter((x) => x.length > 0 && x.length <= 40),
    ),
  ].slice(0, 60);

  await sql("delete from fridge_items where owner = $1", [owner.owner]);
  for (const name of items) {
    await sql(
      "insert into fridge_items (owner, name) values ($1, $2) on conflict (owner, name) do nothing",
      [owner.owner, name],
    );
  }

  return Response.json({ items }, { headers: noStore });
}
