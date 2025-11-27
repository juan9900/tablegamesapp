"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Game = {
  id: number;
  game_name: string;
  genre: string;
  quantity: number;
  min_players: number;
  max_players: number;
  status: string;
};

export const columns: ColumnDef<Game>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "game_name",
    header: "Nombre",
  },
  {
    accessorKey: "genre",
    header: "Género",
  },
  {
    accessorKey: "min_players",
    header: "Mín Jugadores",
  },
  {
    accessorKey: "max_players",
    header: "Máx Jugadores",
  },
  {
    accessorKey: "quantity",
    header: "Cantidad",
  },
];
