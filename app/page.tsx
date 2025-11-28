'use client';

import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { GameCard } from '@/components/GameCard';
import { GAMES } from '@/lib/games';
import { filterGames } from '@/lib/utils';
import { useGameStore } from '@/stores/gameStore';
import { useMemo } from 'react';

export default function HomePage() {
  const { searchQuery, selectedCategories } = useGameStore();

  const filteredGames = useMemo(
    () => filterGames(GAMES, searchQuery, selectedCategories),
    [searchQuery, selectedCategories]
  );

  const featuredGames = useMemo(
    () => GAMES.filter((game) => game.isFeatured),
    []
  );

  return (
    <>
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-[#1a1022] dark:to-[#1a1022]">
        <div
          className="absolute inset-0 z-0 opacity-10 dark:opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&h=1080&fit=crop')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-white dark:from-[#1a1022] to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Play Hundreds of Games Instantly
            </h1>
            <h2 className="max-w-2xl text-base font-normal leading-normal text-gray-700 dark:text-gray-300 sm:text-lg">
              Discover and play a vast collection of indie and classic games right from your browser.
            </h2>

            <SearchBar />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <CategoryFilter variant="buttons" />

        {featuredGames.length > 0 && selectedCategories.length === 0 && !searchQuery && (
          <section className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Trending Now</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredGames.map((game) => (
                <GameCard key={game.id} game={game} variant="featured" />
              ))}
            </div>
          </section>
        )}

        <section>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {searchQuery || selectedCategories.length > 0 ? 'Search Results' : 'All Games'}
          </h3>

          {filteredGames.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No games found matching your criteria.</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} variant="grid" />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}