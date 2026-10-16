import Detail from "@/themes/components/detail";
import { Suspense } from "react";

async function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <Detail id={id} />;
}

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p className="p-6 text-white">Loading Pokémon...</p>}>
      <PokemonPage params={params} />
    </Suspense>
  );
}