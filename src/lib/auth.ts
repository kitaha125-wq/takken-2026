import { requireIdentity } from "../../cursor/identity";

export async function requireOwner(request: Request): Promise<
  | { owner: string; name: string; simulated: boolean }
  | Response
> {
  const identity = await requireIdentity(request);
  if (identity instanceof Response) return identity;
  return {
    owner: identity.sub,
    name: identity.name || "ゲスト",
    simulated: identity.simulated === true,
  };
}

export const noStore = {
  "cache-control": "private, no-store",
};
