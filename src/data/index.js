import { getPokemon, getTeam } from "./getPokemon";

export const pokemonsQuery = (amount) => ({
  queryKey: ["pokemons", amount],
  queryFn: ({ signal }) => getPokemon(amount, signal),
});

export const teamQuery = (ids) => ({
  queryKey: ["team", ids],
  queryFn: ({ signal }) => getTeam(ids, signal),
});

export const loadPokemons =
  (queryClient) =>
  async ({ request }) => {
    const signal = request.signal;
    const amount = request.amount;

    const pokemons = await queryClient.fetchQuery(
      pokemonsQuery(amount, signal)
    );

    return { data: pokemons };
  };
