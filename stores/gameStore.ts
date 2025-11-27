import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Game, GameCategory } from '@/types/game';

interface GameState {
    searchQuery: string;
    selectedCategories: GameCategory[];
    favorites: string[];
    recentlyPlayed: string[];
    isDarkMode: boolean;

    // Actions
    setSearchQuery: (query: string) => void;
    toggleCategory: (category: GameCategory) => void;
    clearFilters: () => void;
    toggleFavorite: (gameId: string) => void;
    addToRecentlyPlayed: (gameId: string) => void;
    toggleDarkMode: () => void;
}

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            searchQuery: '',
            selectedCategories: [],
            favorites: [],
            recentlyPlayed: [],
            isDarkMode: true,

            setSearchQuery: (query) => set({ searchQuery: query }),

            toggleCategory: (category) =>
                set((state) => ({
                    selectedCategories: state.selectedCategories.includes(category)
                        ? state.selectedCategories.filter((c) => c !== category)
                        : [...state.selectedCategories, category],
                })),

            clearFilters: () =>
                set({ searchQuery: '', selectedCategories: [] }),

            toggleFavorite: (gameId) =>
                set((state) => ({
                    favorites: state.favorites.includes(gameId)
                        ? state.favorites.filter((id) => id !== gameId)
                        : [...state.favorites, gameId],
                })),

            addToRecentlyPlayed: (gameId) =>
                set((state) => ({
                    recentlyPlayed: [
                        gameId,
                        ...state.recentlyPlayed.filter((id) => id !== gameId),
                    ].slice(0, 10),
                })),

            toggleDarkMode: () =>
                set((state) => ({ isDarkMode: !state.isDarkMode })),
        }),
        {
            name: 'game-storage',
            partialize: (state) => ({
                favorites: state.favorites,
                recentlyPlayed: state.recentlyPlayed,
                isDarkMode: state.isDarkMode,
            }),
        }
    )
);