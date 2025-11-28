'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';
import type { Game } from '@/types/game';

interface GameCardProps {
    game: Game;
    variant?: 'featured' | 'grid';
}

export function GameCard({ game, variant = 'grid' }: GameCardProps) {
    const { favorites, toggleFavorite } = useGameStore();
    const isFavorite = favorites.includes(game.id);

    if (variant === 'featured') {
        return (
            <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white dark:bg-white/5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-[#9d25f4]/20">
                <div className="relative h-48 w-full">
                    <Image
                        src={game.thumbnail}
                        alt={game.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover"
                        priority={game.isFeatured}
                    />
                    {game.isHot && (
                        <div className="absolute top-2 left-2 rounded-md bg-red-500/80 px-2 py-0.5 text-xs font-bold text-white">
                            HOT
                        </div>
                    )}
                    {game.isNew && (
                        <div className="absolute top-2 left-2 rounded-md bg-blue-500/80 px-2 py-0.5 text-xs font-bold text-white">
                            NEW
                        </div>
                    )}
                </div>

                <div className="flex flex-1 flex-col p-4">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{game.title}</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 flex-grow line-clamp-2">
                        {game.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {game.tags?.map((tag) => (
                            <div
                                key={tag}
                                className="flex h-6 shrink-0 items-center justify-center gap-x-2 rounded-md bg-gray-200 dark:bg-white/10 px-2"
                            >
                                <p className="text-gray-900 dark:text-white text-xs font-medium">{tag}</p>
                            </div>
                        ))}
                    </div>

                    <Link
                        href={`/games/${game.id}`}
                        className="mt-4 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#9d25f4] text-white text-sm font-bold transition-colors hover:bg-[#9d25f4]/80"
                    >
                        Play Now
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-white/5 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl dark:hover:shadow-[#9d25f4]/20">
            <div className="relative h-64 w-full">
                <Image
                    src={game.thumbnail}
                    alt={game.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover"
                />
            </div>

            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="absolute inset-x-0 bottom-0 p-4">
                <h4 className="font-bold text-white">{game.title}</h4>
                <div className="flex h-5 shrink-0 items-center justify-center gap-x-2 rounded-md bg-white/20 px-2 mt-1 w-fit">
                    <p className="text-white text-xs font-medium">{game.category}</p>
                </div>
            </div>

            <button
                onClick={() => toggleFavorite(game.id)}
                className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/30 text-white/70 transition-colors hover:bg-[#9d25f4] hover:text-white z-10"
            >
                <Heart
                    className={`h-4 w-4 mx-auto ${isFavorite ? 'fill-current' : ''}`}
                />
            </button>

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              
                <Link
                    href={`/games/${game.id}`}
                    className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-white/20 text-white text-sm font-bold hover:bg-white/30"
                >
                    Details
                </Link>
            </div>
        </div>
    );
}