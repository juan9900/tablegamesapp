import { NewGameForm } from "@/components/games/new-game-form";
import Link from "next/link";

export default function NewGamePage({}) {
  return (
    <div className="p-4">
      <Link href={"./"}>Volver</Link>
      <h1 className="">Agregar juego</h1>

      <NewGameForm />
    </div>
  );
}
