import { useQuery } from "@apollo/client";
import { GET_POKEMON, GET_POKEMONS } from "../queries";

export const usePokemon = (name: string) => {
  return useQuery(GET_POKEMON, {
    variables: { name },
  });
};

export const usePokemons = (first: number) => {
  return useQuery(GET_POKEMONS, {
    variables: { first },
  });
};
