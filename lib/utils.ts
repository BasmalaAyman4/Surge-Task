import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Game, GameCategory } from '@/types/game';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function filterGames(
    games: Game[],
    searchQuery: string,
    selectedCategories: GameCategory[]
): Game[] {
    return games.filter((game) => {
        const matchesSearch =
            searchQuery === '' ||
            game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            game.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(game.category);

        return matchesSearch && matchesCategory;
    });
}

export function getRelatedGames(
    games: Game[],
    currentGame: Game,
    limit: number = 4
): Game[] {
    return games
        .filter(
            (game) =>
                game.id !== currentGame.id &&
                (game.category === currentGame.category ||
                    game.tags?.some((tag) => currentGame.tags?.includes(tag)))
        )
        .slice(0, limit);
}