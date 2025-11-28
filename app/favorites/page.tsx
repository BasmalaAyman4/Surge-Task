'use client';

import { GameCard } from '@/components/GameCard';
import { GAMES } from '@/lib/games';
import { useGameStore } from '@/stores/gameStore';
import Link from 'next/link';
import { Heart, ArrowLeft } from 'lucide-react';
import { useMemo } from 'react';

export default function FavoritesPage() {
    const { favorites } = useGameStore();

    const favoriteGames = useMemo(
        () => GAMES.filter((game) => favorites.includes(game.id)),
        [favorites]
    );

    return (
        <div className="container mx-auto px-4 py-8 sm:py-12">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Home</span>
                </Link>

                <div className="flex items-center gap-3 mb-2">
                    <Heart className="h-8 w-8 text-[#9d25f4] fill-current" />
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        My Favorites
                    </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    {favoriteGames.length} {favoriteGames.length === 1 ? 'game' : 'games'} in your favorites
                </p>
            </div>

            {/* Games Grid */}
            {favoriteGames.length === 0 ? (
                <div className="text-center py-16">
                    <Heart className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        No Favorites Yet
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Start adding games to your favorites by clicking the heart icon!
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 bg-[#9d25f4] text-white rounded-lg font-semibold hover:bg-[#9d25f4]/80 transition-colors"
                    >
                        Browse Games
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {favoriteGames.map((game) => (
                        <GameCard key={game.id} game={game} variant="grid" />
                    ))}
                </div>
            )}
        </div>
    );
}