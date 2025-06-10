import { useRouter } from "next/navigation";
import { Pokemon, Attack, Evolution } from "../graphql/types/pokemon";

// Props for the component
interface PokemonDetailProps {
  pokemon: Pokemon;
}

// Component to show attacks
function AttackList({ attacks, title }: { attacks: Attack[]; title: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2 text-black">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {attacks.map((attack, index) => (
          <div key={index} className="bg-gray-50 p-2 rounded">
            <p className="font-medium text-black">{attack.name}</p>
            <p className="text-sm text-gray-700">Type: {attack.type}</p>
            <p className="text-sm text-gray-700">Damage: {attack.damage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Component to show evolutions
function EvolutionList({
  evolutions,
  onEvolutionClick,
}: {
  evolutions: Evolution[];
  onEvolutionClick: (name: string) => void;
}) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2 text-black">Evolutions</h3>
      <div className="flex flex-wrap gap-2">
        {evolutions.map((evolution) => (
          <button
            key={evolution.name}
            onClick={() => onEvolutionClick(evolution.name)}
            className="cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full transition-colors"
          >
            {evolution.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// Main Pokemon detail component
export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const router = useRouter();

  // Function to handle evolution clicks
  const handleEvolutionClick = (name: string) => {
    router.push(`/pokemon/${name}`);
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Pokemon name and number */}
          <h1 className="text-3xl font-bold mb-4 text-black">{pokemon.name}</h1>
          <p className="text-gray-700 mb-4">#{pokemon.number}</p>

          {/* Pokemon Image */}
          <div className="mb-6 flex justify-center">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-48 h-48 object-contain"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Basic info */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-black">
                Basic Information
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium text-black">
                    Classification:
                  </span>{" "}
                  {pokemon.classification}
                </p>
                <p>
                  <span className="font-medium text-black">Height:</span>{" "}
                  {pokemon.height.minimum} - {pokemon.height.maximum}
                </p>
                <p>
                  <span className="font-medium text-black">Weight:</span>{" "}
                  {pokemon.weight.minimum} - {pokemon.weight.maximum}
                </p>
                <p>
                  <span className="font-medium text-black">Max CP:</span>{" "}
                  {pokemon.maxCP}
                </p>
                <p>
                  <span className="font-medium text-black">Flee Rate:</span>{" "}
                  {pokemon.fleeRate}
                </p>
              </div>

              {/* Types */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Types</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Resistant to */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-black">
                  Resistant to
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.resistant.map((type) => (
                    <span
                      key={type}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Weaknesses */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-black">
                  Weak against
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.weaknesses.map((type) => (
                    <span
                      key={type}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded-full"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column - Attacks */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-black">Attacks</h2>
              <AttackList attacks={pokemon.attacks.fast} title="Fast Attacks" />
              <AttackList
                attacks={pokemon.attacks.special}
                title="Special Attacks"
              />
            </div>
          </div>

          {/* Evolutions */}
          {pokemon.evolutions && pokemon.evolutions.length > 0 && (
            <div className="mt-6">
              <EvolutionList
                evolutions={pokemon.evolutions}
                onEvolutionClick={handleEvolutionClick}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
