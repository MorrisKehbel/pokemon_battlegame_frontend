import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { useSuspenseQuery } from "@tanstack/react-query";

import { teamQuery } from "../data";

import { usePlayer } from "../context/index";
import { BattlePokemon } from "../components/page/BattlePokemon";
import { getPokemon, getTeam } from "../data/getPokemon";
import { updateLeaderboard } from "../data/leaderboard";

export const Battle = () => {
  const { isAuthenticated, checkSession, setCheckSession, restart, user } =
    usePlayer();
  const [currentTeam, setCurrentTeam] = useState([]);
  const [currentEnemys, setCurrentEnemys] = useState([]);
  const [newRound, setNewRound] = useState(false);

  const { data: team } = useSuspenseQuery({
    ...teamQuery(user?.team),
    enabled: !!user?.team?.length,
  });

  // useEffect(() => {
  //   const controller = new AbortController();

  //   if (user) {
  //     (async () => {
  //       try {
  //         const [enemy, team] = await Promise.all([
  //           getPokemon(6),
  //           getTeam(user.team, controller.signal),
  //         ]);
  //         setCurrentEnemys(enemy);
  //         setCurrentTeam(team);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     })();
  //   }

  //   return () => controller.abort();
  // }, [user, newRound]);

  // useEffect(() => {
  //   if (!user?.team?.length) return;

  //   const controller = new AbortController();

  //   (async () => {
  //     try {
  //       const team = await getTeam(user.team, controller.signal);
  //       setCurrentTeam(team);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, [user]);

  useEffect(() => {
    (async () => {
      try {
        const enemy = await getPokemon(6);
        setCurrentEnemys(enemy);
      } catch (error) {
        console.error(error);
      } finally {
        setNewRound(false);
      }
    })();
  }, [newRound]);

  const activeTeam = [team[0]];
  const activeEnemy = [team[0]];

  const startRound = async (e) => {
    e.preventDefault();

    await updateLeaderboard(user._id, {
      username: user.username,
      team: user.team,
      score: user.score + 100,
    });
    setNewRound(true);
    setCheckSession(true);
  };

  return (
    <div className="w-full flex flex-col justify-center bg-[url('/battle_img.webp')] bg-cover bg-center mx-auto items-center p-8 space-y-12">
      <div className=" max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 space-y-8 md:space-y-0 justify-between items-center bg-white/80 backdrop-blur-md border border-white rounded-xl px-8 py-4 md:rounded-4xl shadow-lg">
        <button
          className="px-8 py-4 bg-rose-600 text-white rounded-full text-xl font-semibold shadow-lg hover:bg-rose-700 cursor-pointer mx-auto"
          onClick={() => restart()}
        >
          New Game
        </button>
        <div className="text-center mx-auto">
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
        <button
          onClick={startRound}
          disabled={newRound}
          className="px-8 py-4 bg-emerald-600 text-white rounded-full text-xl font-semibold shadow-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-default cursor-pointer mx-auto"
        >
          {user ? (
            <span> Start Round {Math.floor(user.score / 100 + 1)} </span>
          ) : (
            "Start Round"
          )}
        </button>
      </div>
      {currentTeam && currentEnemys ? (
        <>
          <div className="grid grid-cols-3 max-w-7xl w-full my-auto items-center">
            <BattlePokemon pokemons={activeTeam} />
            <p className="text-lg lg:text-7xl font-extrabold text-white text-center">
              VS
            </p>
            <BattlePokemon pokemons={activeEnemy} />
          </div>

          <div className="grid grid-cols-3 w-full my-auto items-center">
            <div>
              <BattlePokemon pokemons={team.slice(1)} />
            </div>
            <div className="col-start-3">
              <BattlePokemon pokemons={currentEnemys.slice(1)} />
            </div>
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
