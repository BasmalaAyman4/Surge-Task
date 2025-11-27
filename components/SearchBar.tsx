'use client';

import { Search } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';

interface SearchBarProps {
    variant?: 'header' | 'hero';
    placeholder?: string;
}

export function SearchBar({ variant = 'hero', placeholder = 'Search for games...' }: SearchBarProps) {
    const { searchQuery, setSearchQuery } = useGameStore();

    if (variant === 'header') {
        return (
            <label className="hidden lg:flex min-w-40 h-10 w-full max-w-xs">
                <div className="relative flex w-full items-stretch rounded-lg h-full">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#9d25f4]/50 border-white/10 bg-white/5 focus:border-[#9d25f4]/50 h-full placeholder:text-gray-500 px-4 text-sm font-normal"
                        placeholder={placeholder}
                    />
                    <div className="text-gray-400 absolute inset-y-0 right-0 flex items-center justify-center pr-4">
                        <Search className="h-5 w-5" />
                    </div>
                </div>
            </label>
        );
    }

    return (
        <label className="mt-4 flex min-w-40 h-14 w-full max-w-lg">
            <div className="flex w-full items-stretch rounded-xl h-full shadow-lg">
                <div className="text-gray-400 flex border border-white/10 bg-[#1a1022]/70 items-center justify-center pl-5 rounded-l-xl border-r-0">
                    <Search className="h-6 w-6" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex w-full min-w-0 resize-none overflow-hidden rounded-r-xl text-white focus:outline-none focus:ring-2 focus:ring-[#9d25f4]/50 border border-white/10 bg-[#1a1022]/70 focus:border-[#9d25f4]/50 h-full placeholder:text-gray-400 pl-2 pr-4 text-base font-normal"
                    placeholder={placeholder}
                />
            </div>
        </label>
    );
}