import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { useSuspenseQuery } from "@tanstack/react-query";

import { teamQuery } from "../data";

import { usePlayer } from "../context/index";
import { BattlePokemon } from "../components/page/BattlePokemon";
import { ActivePokemon } from "../components/page/ActivePokemon";
import { useBattleLogic } from "../hooks/useBattleLogic";

import { getPokemon, getTeam } from "../data/getPokemon";
import { updateLeaderboard } from "../data/leaderboard";

export const Battle = () => {
  const { user, setUser } = usePlayer();
  const [currentEnemys, setCurrentEnemys] = useState([]);

  const { data: team } = useSuspenseQuery({
    ...teamQuery(user?.team),
    enabled: !!user?.team?.length,
  });

  const teamsReady = team.length === 6 && currentEnemys.length > 0;

  const {
    playerIdx,
    enemyIdx,
    playerHP,
    enemyHP,
    playerHit,
    enemyHit,
    isRunning,
    roundOver,
    allDefeated,
    kills,
    startRound,
    resetFight,
    winner,
    newBattle,
  } = useBattleLogic(
    teamsReady ? team : [],
    teamsReady ? currentEnemys : [],
    1000
  );

  const handleNewOpponent = async () => {
    try {
      const newEnemys = await getPokemon(6);
      setCurrentEnemys(newEnemys);

      const enemyNames = newEnemys.map(({ pokemon }) => pokemon.name);

      setUser((u) => ({ ...u, enemy: enemyNames }));

      await updateLeaderboard(user._id, {
        username: user.username,
        team: user.team,
        enemy: enemyNames,
        score: user.score,
      });

      newBattle();
    } catch (err) {
      console.error("Could not fetch new opponent:", err);
    }
  };

  useEffect(() => {
    if (user.enemy?.length > 0) {
      (async () => {
        try {
          const newEnemy = await getTeam(user.enemy);
          setCurrentEnemys(newEnemy);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [user]);

  return (
    <div className="w-full flex flex-col justify-between bg-[url('/battle_img.webp')] bg-cover bg-center mx-auto items-center p-8 space-y-12">
      <div className=" max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 space-y-8 md:space-y-0 justify-between items-center bg-white/80 backdrop-blur-md border border-white rounded-xl px-8 py-4 md:rounded-4xl shadow-lg">
        <button
          className="px-8 py-4 bg-rose-600 text-white rounded-full text-xl font-semibold shadow-lg hover:bg-rose-700 cursor-pointer mx-auto"
          onClick={() => resetFight()}
        >
          New Game
        </button>
        <div className="flex flex-col text-center mx-auto">
          <div>
            <h2>Player Name:</h2>
            <p>
              {user ? (
                <span className="font-bold"> {user.username}</span>
              ) : (
                <PulseLoader size={3} />
              )}
            </p>
            <h2>Your Score:</h2>
            <p>
              {user ? (
                <span className="font-bold"> {user.score}</span>
              ) : (
                <PulseLoader size={3} />
              )}
            </p>
          </div>
          {winner && (
            <div className="text-xl text-black font-bold text-center">
              {winner === "player"
                ? "You won the match!"
                : "You lost the match!"}
            </div>
          )}
        </div>

        {winner !== "enemy" && (
          <button
            className="px-8 py-4 bg-emerald-600 text-white rounded-full
               text-xl font-semibold shadow-lg hover:bg-emerald-700
               disabled:opacity-50 disabled:cursor-default mx-auto"
            onClick={winner ? handleNewOpponent : startRound}
            disabled={
              !teamsReady || isRunning || (!winner && roundOver === false)
            }
          >
            {winner ? "New Opponent" : isRunning ? "Fighting…" : "Start Round"}
          </button>
        )}
      </div>

      {teamsReady ? (
        <>
          <div className="flex flex-col md:flex-row md:space-x-25 w-full justify-center items-center">
            <ActivePokemon
              pokemons={[team[playerIdx]]}
              hp={playerHP[playerIdx]}
              hit={playerHit}
            />
            {winner ? null : (
              <p className="text-2xl lg:text-7xl font-extrabold text-white text-center animate-pulse">
                VS
              </p>
            )}
            <ActivePokemon
              pokemons={[currentEnemys[enemyIdx]]}
              hp={enemyHP[enemyIdx]}
              hit={enemyHit}
            />
          </div>

          <div className="grid grid-cols-2 gap-16 w-full place-items-center">
            <BattlePokemon pokemons={team.slice(playerIdx + 1)} />

            <BattlePokemon pokemons={currentEnemys.slice(enemyIdx + 1)} />
          </div>
        </>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <PulseLoader color="#ffffff" />
        </div>
      )}
    </div>
  );
};
