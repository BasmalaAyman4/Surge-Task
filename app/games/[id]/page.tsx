'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState, useCallback, useMemo, use } from 'react';
import { ArrowLeft, Play, Heart, Maximize, Minimize } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { GAMES } from '@/lib/games';
import { getRelatedGames } from '@/lib/utils';
import { GameCard } from '@/components/GameCard';
import { useGameStore } from '@/stores/gameStore';

interface GamePageProps {
    params: Promise<{
        id: string;
    }>;
}
export default function GamePage({ params }: GamePageProps) {
    const { id } = use(params);

    const { addToRecentlyPlayed, favorites, toggleFavorite } = useGameStore();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const game = useMemo(() => GAMES.find((g) => g.id === id), [id]);

    const relatedGames = useMemo(
        () => (game ? getRelatedGames(GAMES, game, 6) : []),
        [game]
    );
    const isFavorite = game ? favorites.includes(game.id) : false;

    useEffect(() => {
        if (game) {
            addToRecentlyPlayed(game.id);
        }
    }, [game, addToRecentlyPlayed]);

    const toggleFullscreen = useCallback(() => {
        const container = document.getElementById('game-container');
        if (!container) return;

        if (!document.fullscreenElement) {
            container.requestFullscreen().catch((err) => {
                console.error('Error enabling fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    if (!game) {
        notFound();
    }

    return (
        <div className="flex flex-1 justify-center py-5">
            <div className="flex flex-col max-w-7xl flex-1 px-4 sm:px-10 lg:px-20">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6 group w-fit"
                >
                    <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                    <span className="font-medium">Back to Games</span>
                </Link>

                <section className="mb-12 rounded-xl overflow-hidden">
                    <div className="relative" id="game-container">
                        <div className="relative flex items-center justify-center aspect-video bg-black">
                            {!isPlaying ? (
                                <>
                                    <Image
                                        src={game.thumbnail}
                                        alt={game.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1022]/80 to-transparent" />
                                    <button
                                        onClick={() => setIsPlaying(true)}
                                        className="relative flex shrink-0 items-center justify-center rounded-full size-20 bg-black/50 text-white backdrop-blur-sm border-2 border-white/50 hover:bg-[#9d25f4]/80 hover:border-[#9d25f4] transition-all z-10"
                                    >
                                        <Play className="h-12 w-12 ml-1" fill="currentColor" />
                                    </button>
                                </>
                            ) : (
                                <div className="absolute inset-0 w-full h-full">
                                    <iframe
                                        id="game-iframe"
                                        src={game.iframeUrl}
                                        className="w-full h-full border-0"
                                        allowFullScreen
                                        title={game.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    />
                                    <button
                                        onClick={toggleFullscreen}
                                        className="absolute top-4 right-4 z-10 flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors backdrop-blur-sm"
                                    >
                                        {isFullscreen ? (
                                            <>
                                                <Minimize className="h-5 w-5" />
                                                <span className="hidden sm:inline">Exit</span>
                                            </>
                                        ) : (
                                            <>
                                                <Maximize className="h-5 w-5" />
                                                <span className="hidden sm:inline">Fullscreen</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        {!isPlaying && (
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <div className="flex flex-wrap justify-between items-end gap-4">
                                    <div>
                                        <h1 className="text-white text-5xl md:text-6xl font-black leading-tight tracking-tight mb-3">
                                            {game.title}
                                        </h1>
                                        <div className="flex gap-2 flex-wrap">
                                            {game.tags?.map((tag) => (
                                                <div
                                                    key={tag}
                                                    className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white/10 backdrop-blur-sm px-4"
                                                >
                                                    <p className="text-white text-sm font-medium">{tag}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-3 flex-wrap justify-start">
                                        <button
                                            onClick={() => setIsPlaying(true)}
                                            className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl h-14 px-8 bg-[#9d25f4] text-white text-lg font-bold hover:bg-[#9d25f4]/90 transition-colors"
                                        >
                                            <Play className="h-5 w-5" fill="currentColor" />
                                            <span>Play Now</span>
                                        </button>
                                        <button
                                            onClick={() => toggleFavorite(game.id)}
                                            className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl h-14 px-5 bg-white/10 backdrop-blur-sm text-white text-base font-bold hover:bg-white/20 transition-colors"
                                        >
                                            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                                            <span>{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                                About The Game
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {game.description}
                            </p>
                        </div>

                      
                    </div>

                    <aside className="space-y-6">
                        <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-xl">
                            <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-200 mb-4">
                                Game Info
                            </h4>
                            <ul className="space-y-3 text-sm">
                                <li className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">Category:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{game.category}</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">Developer:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">GameVerse Studios</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">Platform:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">Web Browser</span>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </section>

                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            User Reviews
                        </h3>
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        className="w-5 h-5 text-yellow-400 fill-current"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                4.8 out of 5
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-xl">
                            <div className="flex items-start gap-4 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                                    G
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        GlitchGoddess
                                    </h4>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg
                                                key={star}
                                                className="w-4 h-4 text-yellow-400 fill-current"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                An absolute masterpiece of cyberpunk storytelling. Neo-Kyoto is breathtakingly beautiful and dangerously immersive. A must-play!
                            </p>
                        </div>

                        <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-xl">
                            <div className="flex items-start gap-4 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold">
                                    P
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        PixelProwler
                                    </h4>
                                    <div className="flex">
                                        {[1, 2, 3, 4].map((star) => (
                                            <svg
                                                key={star}
                                                className="w-4 h-4 text-yellow-400 fill-current"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        ))}
                                        <svg className="w-4 h-4 text-gray-300 dark:text-gray-600 fill-current" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                The combat is fluid and satisfying, and the customization options are deep. Had a few minor bugs, but nothing game-breaking.
                            </p>
                        </div>

                        <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-xl">
                            <div className="flex items-start gap-4 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center text-white font-bold">
                                    Q
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        QuestSeeker
                                    </h4>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg
                                                key={star}
                                                className="w-4 h-4 text-yellow-400 fill-current"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Lost 100 hours in this world and I regret nothing. The story, characters, and world-building are second to none.
                            </p>
                        </div>
                    </div>
                </div>

                {relatedGames.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Related Games
                        </h2>
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                            {relatedGames.map((relatedGame) => (
                                <GameCard key={relatedGame.id} game={relatedGame} variant="grid" />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}