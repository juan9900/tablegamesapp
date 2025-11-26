export interface Game {
  available: boolean;
  copy_id: number;
  gameData: {
    game_genre: string;
    game_name: string;
    max_players: number;
    min_players: number;
  };
  game_id: number;
}
