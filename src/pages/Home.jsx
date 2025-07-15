import { Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

import { ShowPokemon } from "../components/page/ShowPokemon";
import { createUser } from "../data/auth";
import { usePlayer } from "../context/index";
import { getPokemon } from "../data/getPokemon";

export const Home = () => {
  const {
    playerName,
    setPlayerName,
    selected,
    setSelected,
    isAuthenticated,
    checkSession,
    setCheckSession,
  } = usePlayer();

  const startBattle = async (e) => {
    try {
      e.preventDefault();
      if (playerName.trim().length === 0) {
        toast.error("Please insert a player name!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          pauseOnHover: false,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      if (selected.length < 6) {
        toast.error("Please choose 6 Pokemon!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          pauseOnHover: false,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      if (selected.length === 6 && playerName.trim().length > 0) {
        const firstEnemys = await getPokemon(6);
        const enemyNames = firstEnemys.map(({ pokemon }) => pokemon.name);

        await createUser({
          username: playerName,
          team: selected,
          enemy: enemyNames,
          score: 0,
        });

        setPlayerName("");
        setSelected([]);
        setCheckSession(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="w-full flex items-center justify-center bg-[url('/bg_image.webp')] bg-cover bg-center p-8">
      <ToastContainer />
      <div className="max-w-7xl w-full flex flex-col mx-auto bg-white/80 backdrop-blur-md border border-white p-8 rounded-4xl space-y-12 shadow-lg">
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
          {checkSession ? (
            <div className="flex items-center justify-center mx-auto">
              <PulseLoader />
            </div>
          ) : isAuthenticated ? (
            {
              /* blocking 15er fetch*/
            }
          ) : (
            <Suspense
              fallback={
                <div className="flex items-center justify-center">
                  <PulseLoader />
                </div>
              }
            >
              <ShowPokemon />
            </Suspense>
          )}
        </div>

        <div className="mx-auto">
          <button
            onClick={startBattle}
            disabled={
              selected.length < 6 || checkSession || isAuthenticated === null
            }
            className="px-8 py-4 bg-red-600 text-white rounded-full text-xl font-semibold shadow-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-default cursor-pointer"
          >
            {(checkSession && <PulseLoader size={8} />) ||
              (isAuthenticated === null && "no server connection") ||
              (!checkSession && `Start Battle (${selected.length}/6)`)}
          </button>
        </div>
      </div>
    </main>
  );
};
