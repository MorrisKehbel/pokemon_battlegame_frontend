import { useSuspenseQuery } from "@tanstack/react-query";
import { teamQuery } from "../data";
import { usePlayer } from "../context";

export const Roster = () => {
  const { user } = usePlayer();

  const { data: team } = useSuspenseQuery({
    ...teamQuery(user?.team),
    enabled: !!user?.team?.length,
  });

  if (!user || !team) {
    return (
      <div className="text-center w-full mt-20 text-xl text-gray-600">
        No Pokémon in your roster yet.
      </div>
    );
  }

  return (
    <main className="w-full flex items-center justify-center bg-[url('/bg_image.webp')] bg-cover bg-center p-8">
      <div className="max-w-7xl w-full flex flex-col mx-auto bg-white/60 backdrop-blur-md border border-white p-8 rounded-4xl space-y-12">
        <div className="max-w-6xl mx-auto p-6 mt-8">
          <h1 className="text-4xl font-extrabold text-gray-500 text-center mb-9 drop-shadow-lg">
            My Pokémon Roster
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {team.map(({ pokemon }) => (
              <div
                key={pokemon.name}
                className="bg-white shadow rounded-xl p-4  flex flex-col items-center "
              >
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-24 h-24 mb-3"
                />
                <h2 className="text-lg text-gray-800 font-semibold capitalize mb-1">
                  {pokemon.name}
                </h2>
                <p className="text-sm text-gray-600 capitalize mb-2">
                  Types: {pokemon.types.map((t) => t.type.name).join(", ")}
                </p>
                <div className="text-center">
                  <button
                    onClick={() => removePokemon(pokemon.name)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:text-black hover:bg-blue-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
