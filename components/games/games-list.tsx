"use client";

import { Game } from "@/types/game";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { DataTablePagination } from "../ui/data-table-pagination";

export default function GamesList({ games }: { games: Game[] }) {
  const GameActionButton = ({ available }: { available: boolean }) => {
    const classes = available
      ? "bg-green-600 hover:bg-green-700"
      : "bg-red-500 hover:bg-red-600";
    const actionText = available ? "Tomar" : "Devolver";
    return <Button className={classes}>{actionText}</Button>;
  };
  const columns: ColumnDef<Game>[] = [
    {
      accessorKey: "copy_id",
      header: "ID",
    },
    {
      accessorKey: "game_name",
      accessorFn: (row) => row.gameData.game_name,
      header: ({ column }) => {
        return (
          <Button
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");

              console.log(column.getIsSorted());
            }}
            variant="ghost"
          >
            Nombre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "available",
      header: ({ column }) => {
        return (
          <Button
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
            variant="ghost"
          >
            Disponible
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (row.original.available ? "Sí" : "No"),
    },
    {
      accessorKey: "game_genre",
      accessorFn: (row) => row.gameData.game_genre,
      header: ({ column }) => {
        return (
          <Button
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");

              console.log(column.getIsSorted());
            }}
            variant="ghost"
          >
            Género
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "max_players",
      accessorFn: (row) => row.gameData.max_players,
      header: ({ column }) => {
        return (
          <Button
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");

              console.log(column.getIsSorted());
            }}
            variant="ghost"
          >
            Máx. Jugadores
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "min_players",
      accessorFn: (row) => row.gameData.min_players,
      header: ({ column }) => {
        return (
          <Button
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");

              console.log(column.getIsSorted());
            }}
            variant="ghost"
          >
            Mín. Jugadores
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },

    {
      header: "Acción",
      cell: ({ row }) => (
        <GameActionButton available={row.original.available} />
      ),
    },
  ];
  return (
    <>
      {games.length > 0 && (
        <>
          <DataTable columns={columns} data={games} />
        </>
      )}
    </>
  );
}
