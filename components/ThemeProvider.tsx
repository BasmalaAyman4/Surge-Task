'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const isDarkMode = useGameStore((state) => state.isDarkMode);

    useEffect(() => {
        const root = document.documentElement;

        if (isDarkMode) {
            root.classList.add('dark');
            root.classList.remove('light');
        } else {
            root.classList.remove('dark');
            root.classList.add('light');
        }
    }, [isDarkMode]);

    return <>{children}</>;
}