"use client";

import { useParams } from "next/navigation";
import { usePokemon } from "../../../graphql/hooks/usePokemon";
import PokemonDetail from "../../../components/PokemonDetail";

export default function PokemonPage() {
  const params = useParams();
  const name = params.name as string;
  const { loading, error, data } = usePokemon(name);

  if (loading)
    return (
      <div className=" min-h-screen bg-black flex items-center justify-center text-center p-4 text-white">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className=" min-h-screen bg-black flex items-center justify-center text-center p-4 text-red-500">
        Error: {error.message}
      </div>
    );
  if (!data?.pokemon)
    return (
      <div className=" min-h-screen bg-black flex items-center justify-center text-center p-10 text-white-500">
        Pokemon not found.
      </div>
    );

  return <PokemonDetail pokemon={data.pokemon} />;
}
