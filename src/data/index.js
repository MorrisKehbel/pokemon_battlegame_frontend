import { getPokemon } from "./getPokemon";

export const loadPokemon = ({ request }) => {
  return { pokemons: getPokemon(request.signal) };
};
