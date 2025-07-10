import { use } from "react";
import {Link} from "react-router-dom";

export const ShowPokemon = ({ promise, selected, setSelected }) => {
  const pokemons = use(promise);

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
      {pokemons.map(({ pokemon }) => {
        const name = pokemon.name;
        const imgUrl = pokemon.sprites.other["official-artwork"].front_default;
        const isSelected = selected.includes(name);

        return (
          <section
            key={name}
            className={` bg-white rounded-xl shadow transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              isSelected ? "ring-4 ring-indigo-400" : "ring-0"
            }`}
          >
            <div
              onClick={() => toggleSelect(name)}
              className={`cursor-pointer border-b border-gray-200 rounded-xl p-4 flex flex-col items-center5
                `}
            >
              <img src={imgUrl} alt={name} className="w-24 h-24 mb-2" />
              <p className="capitalize font-semibold text-gray-800">{name}</p>
              {isSelected && (
                <span className="mt-1 text-sm text-indigo-600">Selected</span>
              )}
            </div>

            <div className="text-center">
              <Link to={`/pokemon/${name}`}>
              <button className="text-black px-2 py-1 hover:text-indigo-600 cursor-pointer">
                More Information
              </button>
              </Link>
            </div>
          </section>
        );
      })}
    </div>
  );
};
