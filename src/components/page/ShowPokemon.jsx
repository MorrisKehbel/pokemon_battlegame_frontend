import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "react-router";

import { usePlayer } from "../../context/index";
import { pokemonsQuery } from "../../data";

export const ShowPokemon = () => {
  const { selected, setSelected } = usePlayer();
  const { data: pokemons } = useSuspenseQuery(pokemonsQuery());

  const toggleSelect = (name) => {
    setSelected((prev) => {
      if (prev.includes(name)) {
        return prev.filter((n) => n !== name);
      } else if (prev.length < 6) {
        return [...prev, name];
      }
      return prev;
    });
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
      {pokemons.map(({ pokemon }) => {
        const name = pokemon.name;
        const imgUrl = pokemon.sprites.other["official-artwork"].front_default;
        const isSelected = selected.includes(name);
        return (
          <div
            key={pokemon.id}
            className={`relative bg-white rounded-xl shadow transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              isSelected ? "outline-4 outline-indigo-400" : "outline-0"
            }`}
          >
            <div
              onClick={() => toggleSelect(name)}
              className={`cursor-pointer border-b border-gray-200 rounded-xl p-4 flex flex-col items-center
                `}
            >
              {isSelected && (
                <span className="flex justify-center inset-0 text-center text-sm text-indigo-600 absolute">
                  Selected
                </span>
              )}
              <img src={imgUrl} alt={name} className="w-24 h-24 mb-2" />
              <p className="capitalize font-semibold text-gray-800">{name}</p>
            </div>
            <div className="text-center">
              <Link to={`/pokemon/${name}`}>
                <button className="text-black px-2 py-1 hover:text-indigo-600 cursor-pointer">
                  More Information
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </section>
  );
};
