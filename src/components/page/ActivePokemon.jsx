import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

export const ActivePokemon = ({ pokemons, hp, hit }) => {
  const pokemon = pokemons[0]?.pokemon;

  if (!pokemon) return null;

  const imgUrl = pokemon.sprites?.other?.["official-artwork"]?.front_default;

  return (
    <div className="relative grid grid-cols-1 grid-rows-1 bg-white/50 rounded-xl max-w-4xl">
      <AnimatePresence>
        {hit > 0 && (
          <motion.span
            key={hit}
            initial={{ y: -10, opacity: 1, scale: 1 }}
            animate={{ y: -40, opacity: 0, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute left-1/2 -translate-x-1/2 -top-4
                       text-red-500 text-6xl font-extrabold drop-shadow"
          >
            -{hit}
          </motion.span>
        )}
      </AnimatePresence>
      <Link to={`/pokemon/${pokemon.name}`}>
        <div className="flex flex-col justify-between rounded-xl shadow transform transition-all duration-300 group hover:shadow-xl">
          <div className="cursor-pointer rounded-t-xl p-4 flex flex-col items-center transform transition-all ">
            <img
              src={imgUrl}
              alt={pokemon.name}
              className="w-48 h-48 mb-2 transform transition-all hover:scale-105"
            />
            <p className="capitalize font-semibold text-black">
              {pokemon.name}
            </p>
            <div className="bg-gray-300/50 w-full rounded-2xl text-center mt-2">
              <p className="font-mono text-gray-700">Health: {hp}</p>
              <p className="font-mono text-gray-700">
                Damage:
                {pokemon.stats[1].base_stat}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
