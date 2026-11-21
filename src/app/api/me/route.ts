import { getIdentity } from "../../../../cursor/identity";
import { noStore } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const identity = await getIdentity(request);
  if (!identity.verified) {
    return Response.json(
      { verified: false, reason: identity.reason },
      { status: 200, headers: noStore },
    );
  }
  return Response.json(
    {
      verified: true,
      name: identity.name || "ゲスト",
      simulated: identity.simulated === true,
    },
    { headers: noStore },
  );
}
