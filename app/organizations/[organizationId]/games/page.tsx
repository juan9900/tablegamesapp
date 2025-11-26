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

  console.log("Games data:", games);

  const newGames = [
    {
      copy_id: 1,
      game_id: 1,
      available: true,
      gameData: {
        game_name: "Catan",
        min_players: 2,
        max_players: 4,
        game_genre: "Estrategia",
      },
    },
    {
      copy_id: 2,
      game_id: 2,
      available: false,
      gameData: {
        game_name: "Monopoly",
        min_players: 2,
        max_players: 6,
        game_genre: "Estrategia",
      },
    },
    {
      copy_id: 3,
      game_id: 3,
      available: true,
      gameData: {
        game_name: "Dixit",
        min_players: 3,
        max_players: 6,
        game_genre: "Creatividad",
      },
    },
    {
      copy_id: 4,
      game_id: 4,
      available: true,
      gameData: {
        game_name: "Carcassonne",
        min_players: 2,
        max_players: 5,
        game_genre: "Estrategia",
      },
    },
    {
      copy_id: 5,
      game_id: 5,
      available: false,
      gameData: {
        game_name: "Pandemic",
        min_players: 2,
        max_players: 4,
        game_genre: "Cooperativo",
      },
    },
    {
      copy_id: 6,
      game_id: 6,
      available: true,
      gameData: {
        game_name: "7 Wonders",
        min_players: 2,
        max_players: 7,
        game_genre: "Estrategia",
      },
    },
    {
      copy_id: 7,
      game_id: 7,
      available: false,
      gameData: {
        game_name: "Azul",
        min_players: 2,
        max_players: 4,
        game_genre: "Estrategia",
      },
    },
    {
      copy_id: 8,
      game_id: 8,
      available: true,
      gameData: {
        game_name: "Codenames",
        min_players: 2,
        max_players: 8,
        game_genre: "Palabras",
      },
    },
    {
      copy_id: 9,
      game_id: 9,
      available: true,
      gameData: {
        game_name: "Splendor",
        min_players: 2,
        max_players: 4,
        game_genre: "Estrategia",
      },
    },
    {
      copy_id: 10,
      game_id: 10,
      available: false,
      gameData: {
        game_name: "Ticket to Ride",
        min_players: 2,
        max_players: 5,
        game_genre: "Estrategia",
      },
    },
    {
      copy_id: 11,
      game_id: 11,
      available: true,
      gameData: {
        game_name: "Terraforming Mars",
        min_players: 1,
        max_players: 5,
        game_genre: "Estrategia",
      },
    },
    {
      copy_id: 12,
      game_id: 12,
      available: true,
      gameData: {
        game_name: "Gloomhaven",
        min_players: 1,
        max_players: 4,
        game_genre: "Aventura",
      },
    },
    {
      copy_id: 13,
      game_id: 13,
      available: false,
      gameData: {
        game_name: "Wingspan",
        min_players: 1,
        max_players: 5,
        game_genre: "Estrategia",
      },
    },
    {
      copy_id: 14,
      game_id: 14,
      available: true,
      gameData: {
        game_name: "Root",
        min_players: 2,
        max_players: 4,
        game_genre: "Estrategia",
      },
    },
  ];

  return (
    <div className="p-4">
      <Link href={"./"}>Volver</Link>
      <h1 className="font-bold text-xl">Juegos</h1>
      {/* Render games list here */}
      {games && <GamesList games={newGames} />}
    </div>
  );
}
