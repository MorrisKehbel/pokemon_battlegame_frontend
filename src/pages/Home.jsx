import { Suspense } from "react";

import { ShowPokemon } from "../components/page/ShowPokemon";
import { Loading } from "../components/shared";
import { createLeaderboardEntry } from "../data/leaderboard";
import { usePlayer } from "../context/index";

export const Home = () => {
  const { playerName, setPlayerName, selected } = usePlayer();

  const startBattle = async (e) => {
    try {
      e.preventDefault();
      if (playerName.trim().length === 0) {
        alert("Please insert a player name!");
        return;
      }
      if (selected.length < 6) {
        alert("Please choose 6 Pokemon!");
        return;
      }
      if (selected.length === 6 && playerName.trim().length > 0) {
        await createLeaderboardEntry({
          username: playerName,
          score: 0,
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log("Trainer", playerName, "with Team:", selected);
    }
  };

  return (
    <main className="min-h-screen content-center bg-[url('/bg_image.webp')] bg-cover bg-center p-8">
      <div className="max-w-7xl flex flex-col mx-auto bg-white/80 backdrop-blur-md border border-white p-8 rounded-4xl space-y-12 shadow-lg">
        <div className="w-full max-w-xl flex flex-col justify-center mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-500 text-center mb-8 drop-shadow-lg">
            Welcome Trainer!
          </h2>

          <input
            type="text"
            id="player-name"
            aria-label="Player Name"
            className="w-full text-center placeholder:text-center border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
            placeholder="Choose your name."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-4xl font-extrabold text-gray-500 text-center mb-8 drop-shadow-lg">
            Select your team
          </h2>
          <Suspense fallback={<Loading />}>
            <ShowPokemon />
          </Suspense>
        </div>

        <div className="mx-auto">
          <button
            onClick={startBattle}
            disabled={selected.length < 6}
            className="px-8 py-4 bg-red-600 text-white rounded-full text-xl font-semibold shadow-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-default cursor-pointer"
          >
            Start Battle ({selected.length}/6)
          </button>
        </div>
      </div>
    </main>
  );
};
