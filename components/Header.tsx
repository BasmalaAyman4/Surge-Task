'use client';

import Link from 'next/link';
import { Moon, Sun, Gamepad2 } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export function Header() {
    const { isDarkMode, toggleDarkMode } = useGameStore();
    const pathname = usePathname();

    const navLinks = useMemo(
        () => [
            { href: '/', label: 'Home' },
            { href: '/favorites', label: 'Favorites' },
            { href: '/recently-played', label: 'Recently Played' },
        ],
        []
    );

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-300 dark:border-white/10 bg-white/80 dark:bg-[#1a1022]/80 backdrop-blur-sm transition-colors duration-300">
            <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-3">
                        <Gamepad2 className="h-8 w-8 text-[#9d25f4]" />
                        <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                            GameVerse
                        </h2>
                    </Link>

                    <nav className="hidden items-center gap-9 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-[#9d25f4] ${pathname === link.href
                                        ? 'text-gray-900 dark:text-white'
                                        : 'text-gray-600 dark:text-gray-400'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleDarkMode}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 dark:bg-white/5 text-gray-900 dark:text-white transition-colors hover:bg-gray-300 dark:hover:bg-white/10"
                        aria-label="Toggle dark mode"
                    >
                        {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </button>
                </div>
            </div>
        </header>
    );
}