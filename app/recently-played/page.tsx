'use client';

import { GameCard } from '@/components/GameCard';
import { GAMES } from '@/lib/games';
import { useGameStore } from '@/stores/gameStore';
import Link from 'next/link';
import { Clock, ArrowLeft } from 'lucide-react';
import { useMemo } from 'react';

export default function RecentlyPlayedPage() {
    const { recentlyPlayed } = useGameStore();

    const recentGames = useMemo(
        () => GAMES.filter((game) => recentlyPlayed.includes(game.id))
            .sort((a, b) => recentlyPlayed.indexOf(a.id) - recentlyPlayed.indexOf(b.id)),
        [recentlyPlayed]
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
                    <Clock className="h-8 w-8 text-[#9d25f4]" />
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Recently Played
                    </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    {recentGames.length} {recentGames.length === 1 ? 'game' : 'games'} played recently
                </p>
            </div>

            {/* Games Grid */}
            {recentGames.length === 0 ? (
                <div className="text-center py-16">
                    <Clock className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        No Games Played Yet
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Start playing games to see your history here!
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
                    {recentGames.map((game) => (
                        <GameCard key={game.id} game={game} variant="grid" />
                    ))}
                </div>
            )}
        </div>
    );
}