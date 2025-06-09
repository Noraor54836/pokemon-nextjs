"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../graphql/queries";
import PokemonCard from "../components/PokemonCard";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { first: 3 },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/pokemon/${searchQuery.toLowerCase()}`);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-black">
          Pokemon Explorer
        </h1>

        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Pokemon name..."
              className="flex-1 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-gray-700 mb-12">
          <p>Search for any Pokemon by name</p>
          <p className="mt-2">Example: Pikachu, Charizard, Bulbasaur</p>
        </div>

        {/* Featured Pokemon Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">
            Featured Pokemon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              // Loading state
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-4 animate-pulse"
                  >
                    <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4" />
                    <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                  </div>
                ))
            ) : error ? (
              <p className="text-red-500 text-center col-span-3">
                Error loading Pokemon
              </p>
            ) : (
              data?.pokemons.map((pokemon: any) => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
