import { useState } from "react";
import PokemonCard from "./PokemonCard";
import { usePokemon } from "../graphql/hooks/usePokemon";

export default function PokemonList() {
  const [pokemonName, setPokemonName] = useState("Pikachu");
  const { loading, error, data } = usePokemon(pokemonName);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-4 text-red-500">Error: {error.message}</div>
    );
  if (!data?.pokemon)
    return <div className="text-center p-4">No Pokemon found</div>;

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Enter Pokemon name"
          className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <PokemonCard pokemon={data.pokemon} />
    </div>
  );
}
