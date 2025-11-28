'use client';

import { X } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';
import { CATEGORIES } from '@/lib/games';

interface CategoryFilterProps {
    variant?: 'pills' | 'buttons';
}

export function CategoryFilter({ variant = 'buttons' }: CategoryFilterProps) {
    const { selectedCategories, toggleCategory, clearFilters } = useGameStore();

    if (variant === 'pills') {
        return (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                {CATEGORIES.slice(0, 3).map((category) => (
                    <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className="flex h-8 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full bg-gray-200 dark:bg-white/10 px-4 transition-colors hover:bg-gray-300 dark:hover:bg-white/20"
                    >
                        <p className="text-gray-900 dark:text-white text-sm font-medium">{category}</p>
                    </button>
                ))}
            </div>
        );
    }

    return (
        <section className="mb-12">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={clearFilters}
                        className={`flex h-9 cursor-pointer shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 transition-colors ${selectedCategories.length === 0
                                ? 'bg-[#9d25f4] text-white font-bold'
                                : 'bg-gray-200 dark:bg-white/5 text-gray-900 dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-white/10'
                            }`}
                    >
                        All
                    </button>

                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => toggleCategory(category)}
                            className={`flex h-9 cursor-pointer shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 transition-colors ${selectedCategories.includes(category)
                                    ? 'bg-[#9d25f4] text-white font-bold'
                                    : 'bg-gray-200 dark:bg-white/5 text-gray-900 dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-white/10'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {(selectedCategories.length > 0) && (
                    <button
                        onClick={clearFilters}
                        className="flex h-9 min-w-[84px] cursor-pointer items-center justify-center gap-2 rounded-lg px-4 bg-transparent text-gray-600 dark:text-gray-400 text-sm font-bold transition-colors hover:text-gray-900 dark:hover:text-white"
                    >
                        <X className="h-5 w-5" />
                        <span>Clear filters</span>
                    </button>
                )}
            </div>
        </section>
    );
}