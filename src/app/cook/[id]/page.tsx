import { CookPageClient } from "@/components/CookPageClient";

export default async function CookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CookPageClient id={id} />;
}
