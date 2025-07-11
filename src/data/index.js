import { getPokemon } from "./getPokemon";

export const pokemonsQuery = (signal) => ({
  queryKey: ["pokemons"],
  queryFn: () => getPokemon(signal),
});

export const loadPokemons =
  (queryClient) =>
  async ({ request }) => {
    const signal = request.signal;

    const pokemons = await queryClient.fetchQuery(pokemonsQuery(signal));

    return { data: pokemons };
  };
