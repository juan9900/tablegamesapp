import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { gameSchema } from "@/lib/schemas/game";
interface Copy {
  internal_code?: string;
}

// POST /api/games - Used to CREATE a new game
export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const submittedData = await request.json(); // Data from the form submission
    const { game_name, game_genre, min_players, max_players, copies } =
      submittedData;

    const copies_internal_codes = copies.map(
      (copy: Copy) => copy.internal_code
    );
    // 1. Basic Validation

    gameSchema.parse({
      game_name,
      game_genre,
      min_players,
      max_players,
      copies,
    });

    console.log({ game_name });
    console.log(copies);

    //Check that the game doesn't exists already in the database
    const { data: checkGameData, error: checkGameError } = await supabase
      .from("games")
      .select("id")
      .eq("game_name", game_name.toLowerCase())
      .limit(1)
      .single();

    //If a Game is found, then throw an error
    if (checkGameData) {
      throw new Error("A game with that name already exists.");
    }
   
    //Check if any of the sent internal_codes are duplicated among themselves
    if (Array.isArray(copies)) {
      const internalCodesSet = new Set();
      for (const copy of copies) {
        internalCodesSet.add(copy.internal_code);
      }
      if (internalCodesSet.size !== copies.length) {
        console.log("Duplicate internal codes found among submitted copies");
        throw new Error(
          "Hay códigos internos duplicados entre las copias enviadas. Por favor, asegúrate de que cada copia tenga un código interno único."
        );
      }
    }

    //Check if any of the given internal codes are duplicated in the database
    if (Array.isArray(copies)) {
      for (const [index, copy] of copies.entries()) {
        if (!copy?.internal_code) continue;

        const { data: existing, error } = await supabase
          .from("games_copies")
          .select("copy_id")
          .eq("internal_code", copy.internal_code)
          .limit(1);

        if (error) {
          console.error("Error checking internal code:", error);
          return NextResponse.json({ error: "DB error" }, { status: 500 });
        }

        if (existing && existing.length > 0) {
          console.log("Duplicate internal code found:", copy.internal_code);
          return NextResponse.json(
            {
              error: `El código interno %${copy.internal_code}% de la copia #${
                index + 1
              } ya está en uso. Por favor, usa un código diferente.`,
            },
            { status: 409 }
          );
        }
      }
    }

    // Create a new game
    const { data: newGameData, error: newGameError } = await supabase.rpc(
      "create_game_and_copies",
      {
        game_name_input: game_name,
        game_genre_input: game_genre,
        max_players_input: max_players,
        min_players_input: min_players,
        organization_id_input: 8,
        copies_internal_codes: copies_internal_codes,
      }
    );

    //TODO: Edit the rpc function to include the copies internal codes, it is not necessary to use a transaction for just create the game without the copies

    if (newGameError) {
      console.error("Error creating new game: ", newGameError);
      throw new Error("Error creating new game" + newGameError.message);
    }
    console.log("New game created with ID:", newGameData);
    // 3. Return a success response
    // Status 201 (Created) is the standard HTTP response for a successful creation
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues[0].message);
      return NextResponse.json(
        {
          error: {
            message: error.issues[0].message,
          },
        },
        { status: 400 }
      );
    }
    console.error("Error creating game:", error);
    return NextResponse.json(
      { error: { message: (error as Error).message } },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

// You can also include a GET request here for /api/games to fetch all games
/*
export async function GET() {
    // ... logic to fetch all games
}
*/
