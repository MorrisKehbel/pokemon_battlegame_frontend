import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PulseLoader } from "react-spinners";

import { usePlayer } from "../context/index";
import { BattlePokemon } from "../components/page/BattlePokemon";
import { getPokemon, getTeam } from "../data/getPokemon";
import { updateLeaderboard } from "../data/leaderboard";

export const Battle = () => {
  const { isAuthenticated, checkSession, setCheckSession, restart, user } =
    usePlayer();
  const [currentTeam, setCurrentTeam] = useState(null);
  const [currentEnemys, setCurrentEnemys] = useState(null);
  const [newRound, setNewRound] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!user?.team?.length) return;

    const controller = new AbortController();

    (async () => {
      try {
        const team = await getTeam(user.team, controller.signal);
        setCurrentTeam(team);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user]);

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

  useEffect(() => {
    if (!isAuthenticated) {
      setCheckSession(true);
    }

    if (!checkSession && !isAuthenticated) {
      window.location.replace("/");
    }
  }, [checkSession, isAuthenticated, navigate]);

  // if (checkSession) {
  //   return (
  //     <main className="min-h-screen flex items-center justify-center">
  //       <PulseLoader />
  //     </main>
  //   );
  // }

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
    <div className="min-h-screen flex flex-col justify-center bg-[url('/battle_img.webp')] bg-cover bg-center mx-auto items-center p-8">
      <div className=" max-w-4xl w-full flex justify-between items-center bg-white/80 backdrop-blur-md border border-white rounded-xl px-8 py-4 md:rounded-4xl shadow-lg mt-auto">
        <div>
          <p>
            Player Name:
            {user ? (
              <span className="font-bold"> {user.username}</span>
            ) : (
              <PulseLoader size={3} />
            )}
          </p>
          <p>
            Your Score:
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
          className="px-8 py-4 bg-emerald-600 text-white rounded-full text-xl font-semibold shadow-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-default cursor-pointer"
        >
          {user ? (
            <span> Start Round {Math.floor(user.score / 100 + 1)} </span>
          ) : (
            "Start Round"
          )}
        </button>
        {/* <button
          className="bg-gray-700 mx-auto cursor-pointer"
          onClick={() => restart()}
        >
          Placeholder Restart
        </button> */}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 max-w-7xl w-full my-auto items-center">
        {currentTeam && currentEnemys ? (
          <>
            <BattlePokemon pokemons={currentTeam} />
            <p className="text-lg lg:text-7xl font-extrabold text-white text-center">
              VS
            </p>
            <BattlePokemon pokemons={currentEnemys} />
          </>
        ) : (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <PulseLoader color="#ffffff" />
          </div>
        )}
      </div>
    </div>
  );
};
