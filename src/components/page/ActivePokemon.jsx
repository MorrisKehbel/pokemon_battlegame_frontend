export const ActivePokemon = ({ pokemons }) => {
  return (
    <div className="grid grid-cols-1 grid-rows-1 bg-white/50 rounded-xl max-w-4xl">
      {pokemons.map(({ pokemon }) => {
        const name = pokemon.name;
        const imgUrl = pokemon.sprites.other["official-artwork"].front_default;

        return (
          <div
            key={pokemon.id}
            className="flex flex-col justify-between rounded-xl shadow transform transition-all duration-300 group hover:shadow-xl"
          >
            <div
              onClick={() => toggleSelect(name)}
              className="cursor-pointer rounded-t-xl p-4 flex flex-col items-center transform transition-all group-hover:scale-105"
            >
              <img
                src={imgUrl}
                alt={name}
                className="w-48 h-48 mb-2 transform transition-all group-hover:scale-105"
              />
              <p className="capitalize font-semibold text-black">{name}</p>
              <div className="bg-gray-800/20 w-full rounded-2xl text-center mt-2">
                <p className="font-mono text-gray-700">
                  Health:
                  {pokemon.stats[0].base_stat}
                </p>
                <p className="font-mono text-gray-700">
                  Damage:
                  {pokemon.stats[1].base_stat}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
