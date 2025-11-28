'use client';

import { Search } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';

interface SearchBarProps {
    placeholder?: string;
}

export function SearchBar({ placeholder = 'Search for games...' }: SearchBarProps) {
    const { searchQuery, setSearchQuery } = useGameStore();


    return (
        <label className="mt-4 flex min-w-40 h-14 w-full max-w-lg">
            <div className="flex w-full items-stretch rounded-xl h-full shadow-lg">
                <div className="text-gray-600 dark:text-gray-400 flex border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1a1022]/70 items-center justify-center pl-2 pr-2 rounded-l-xl border-r-0">
                    <Search className="h-6 w-6" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex w-full min-w-0 resize-none overflow-hidden rounded-r-xl text-gray-900 dark:text-white focus:outline-none border border-gray-300 dark:border-white/10 bg-white dark:bg-[#1a1022]/70 h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 pl-2 pr-4 text-base font-normal"
                    placeholder={placeholder}
                />
            </div>
        </label>
    );
}