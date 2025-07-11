export const getPokemon = async (abortSignal) => {
  try {
    const maxPoke = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species?limit=0`,
      { signal: abortSignal }
    );
    if (!maxPoke.ok) {
      throw new Error(
        `Error while loading for max amount of Pokemon: ${maxPoke.status}`
      );
    }
    const { count } = await maxPoke.json();

    const ids = new Set();
    while (ids.size < 15) {
      const id = Math.floor(Math.random() * count) + 1;
      ids.add(id);
    }
    const idArray = Array.from(ids);

    const pokemons = await Promise.all(
      idArray.map(async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
          signal: abortSignal,
        });
        if (!res.ok) {
          throw new Error(
            `Error while loading for Pokemon ID: ${id}, ${res.status}`
          );
        }
        const data = await res.json();

        return { pokemon: data };
      })
    );
    // console.log(pokemons);
    return pokemons;
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    throw new Error(`Error fetching Pokemon: ${error.message}`);
  }
};
