import { sql } from "@/lib/db";
import { noStore, requireOwner } from "@/lib/auth";
import { rowToSaved } from "@/lib/recipe-map";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: Request, ctx: Ctx) {
  const owner = await requireOwner(request);
  if (owner instanceof Response) return owner;
  const { id } = await ctx.params;
  if (!/^\d+$/.test(id)) {
    return Response.json({ error: "not found" }, { status: 404, headers: noStore });
  }

  const rows = await sql(
    `select id, title, summary, minutes, servings, mood, source, buzz_note,
            ingredients, steps, tips, matched_ingredients, missing_ingredients, created_at
     from recipes where id = $1 and owner = $2 limit 1`,
    [id, owner.owner],
  );
  if (!rows[0]) {
    return Response.json({ error: "not found" }, { status: 404, headers: noStore });
  }
  return Response.json(
    { recipe: rowToSaved(rows[0] as never) },
    { headers: noStore },
  );
}

export async function DELETE(request: Request, ctx: Ctx) {
  const owner = await requireOwner(request);
  if (owner instanceof Response) return owner;
  const { id } = await ctx.params;
  if (!/^\d+$/.test(id)) {
    return Response.json({ error: "not found" }, { status: 404, headers: noStore });
  }

  const rows = await sql(
    "delete from recipes where id = $1 and owner = $2 returning id",
    [id, owner.owner],
  );
  if (!rows[0]) {
    return Response.json({ error: "not found" }, { status: 404, headers: noStore });
  }
  return new Response(null, { status: 204, headers: noStore });
}
