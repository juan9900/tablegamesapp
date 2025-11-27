import GamesList from "@/components/games/games-list";
import { createClient } from "@/lib/supabase/server";
import { Estonia } from "next/font/google";
import Link from "next/link";
import { Game } from "@/types/game";

export default async function Page({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const { organizationId } = await params;
  const supabase = await createClient();
  const { data, error: gamesError } = await supabase
    .from("games_copies")
    .select(
      "copy_id, game_id, available, gameData:games (game_name, min_players, max_players, game_genre)"
    )
    .eq("organization_id", organizationId);
  if (gamesError) {
    console.error("Error fetching games:", gamesError);
  }

  //How to solve the supabase any type issue ->
  const games = data as Game[] | null;

  return (
    <div className="p-4">
      <Link href={"./"}>Volver</Link>
      <h1 className="">Juegos</h1>
      <Link
        className="bg-purple-700 hover:bg-purple-800 text-primary-foreground py-1 px-2 rounded-md"
        href={"./games/new"}
      >
        Agregar juego
      </Link>
      {/* Render games list here */}
      {games && <GamesList games={games} />}
    </div>
  );
}
