export const BattlePokemon = ({ pokemons }) => {
  return (
    <div className="grid md:grid-cols-2 2xl:grid-cols-5 grid-rows-1 bg-black/50 rounded-xl">
      {pokemons.map(({ pokemon }) => {
        const name = pokemon.name;
        const imgUrl = pokemon.sprites.other["official-artwork"].front_default;

        return (
          <div
            key={pokemon.id}
            className="flex flex-col justify-between rounded-xl shadow transform transition-all duration-300 group  hover:shadow-xl"
          >
            <div
              onClick={() => toggleSelect(name)}
              className="cursor-pointer rounded-t-xl p-4 flex flex-col items-center transform transition-all group-hover:scale-105"
            >
              <img
                src={imgUrl}
                alt={name}
                className="w-24 h-24 mb-2 transform transition-all group-hover:scale-105"
              />
              <p className="capitalize font-semibold text-white">{name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
