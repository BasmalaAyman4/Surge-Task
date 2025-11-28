'use client';

import Link from 'next/link';
import { Home, Heart, Clock } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        {
            href: '/',
            label: 'Home',
            icon: Home,
            fillable: false, 
        },
        {
            href: '/favorites',
            label: 'Favorites',
            icon: Heart,
            fillable: true,
        },
        {
            href: '/recently-played',
            label: 'Recent',
            icon: Clock,
            fillable: false, 
        },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#1a1022] border-t border-gray-300 dark:border-white/10 md:hidden">
            <div className="flex items-center justify-around px-4 py-2 safe-pb">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-lg transition-all ${isActive
                                    ? 'text-[#9d25f4]'
                                    : 'text-gray-600 dark:text-gray-400'
                                }`}
                        >
                            <Icon
                                className={`h-6 w-6 ${isActive && item.fillable ? 'fill-current' : ''}`}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}