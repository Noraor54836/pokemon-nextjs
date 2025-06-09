import { useRouter } from "next/navigation";
import { Pokemon } from "../graphql/types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemon/${pokemon.name}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-center mb-4">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-32 h-32 object-contain"
        />
      </div>

      <h3 className="text-xl font-bold text-center text-black mb-2">
        {pokemon.name}
      </h3>

      <p className="text-gray-600 text-center mb-2">#{pokemon.number}</p>

      <div className="flex flex-wrap gap-2 justify-center mb-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm"
          >
            {type}
          </span>
        ))}
      </div>

      <p className="text-gray-600 text-center">Max CP: {pokemon.maxCP}</p>
    </div>
  );
}
