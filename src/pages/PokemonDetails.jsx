import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.error("Failed to fetch Pokémon details:", err));
  }, [name]);

  if (!pokemon) return <div>Loading...</div>;

  const handleAddPokemonToRoster = () => {
    const savedRoster = JSON.parse(localStorage.getItem("pokemonRoster")) || [];

    const exists = savedRoster.find((p) => p.name === pokemon.name);
    if(!exists){
      savedRoster.push(pokemon);
      localStorage.setItem("pokemonRoster", JSON.stringify(savedRoster));
    }
    navigate("/myroster");
  };

  return(
     <main className="min-h-screen content-center bg-[url('/bg_image.webp')] bg-cover bg-center p-8">
     
      <div className="max-w-4xl mx-auto p-6 mt-8 bg-blue-100  border-gray-300 rounded-xl shadow-lg">
        <h1 className="capitalize font-semibold text-gray-800 text-center text-2xl mb-6">
          {pokemon.name.toUpperCase()}
        </h1>

        <div className="flex flex-col items-center">
          <div className="bg-white border border-gray-300 p-3 rounded-lg mb-5">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-45 h-45 object-contain float-animation"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left  px-2 mb-5">
    
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <h2 className="text-lg font-semibold capitalize text-gray-800">Types</h2>
              <p className="text-gray-700 capitalize">
                {pokemon.types.map((t) => t.type.name).join(", ")}
              </p>
            </div>

            <div className="bg-white p-2 rounded-lg shadow text-center">
              <h2 className="text-lg font-semibold text-gray-800 capitalize">Abilities</h2>
              <ul className="text-gray-700  capitalize list-none">
                {pokemon.abilities.map((a) => (
                  <li key={a.ability.name}>{a.ability.name}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow text-center">
              <h2 className="text-lg font-semibold text-gray-800 capitalize">Height</h2>
              <p className="text-gray-700 capitalize">{pokemon.height}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow text-center">
              <h2 className="text-lg font-semibold text-gray-800 capitalize">Weight</h2>
              <p className="text-gray-700 capitalize">{pokemon.weight}</p>
            </div>
    
            <div className="w-full px-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 capitalize">Stats:</h2>
              <div className="space-y-4">
                {pokemon.stats.map((s) => (
                  <div key={s.stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 capitalize">{s.stat.name}</span>
                      <span className="text-gray-700">{s.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full"
                        style={{ width: `${(s.base_stat / 200) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div> 
            </div>  

          </div>
          <button 
            onClick={handleAddPokemonToRoster}
            className="p-3 mt-1 w-full rounded-lg shadow bg-white capitalize text-gray-700 font-semibold text-lg "
          >
            Add Pokemon to Roster
          </button>
        </div>
      </div>
    
    </main>
  );
};