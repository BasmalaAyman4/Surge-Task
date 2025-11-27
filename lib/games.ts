import type { Game } from '@/types/game';

export const GAMES: Game[] = [
    {
        id: 'cyber-odyssey',
        title: 'Cyber Odyssey',
        description: 'Explore a neon-drenched metropolis in this thrilling action RPG.',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRRg_UJHEt03hMQDBgcxmtsMVpnyYXyzvUo3vuLAKLUEZeWTDja5g8o2IGYYN-J8tUY4KxwphZsCVL9UV5jGVgcMTo8fdIIDEJ-pWahlBl_pL89wTxSTKWUacjHEIvBMFo8XLxTwBs7HjcV95aXB9lZlSCLxPpkGgWAEVNZJLjLnkObhmFou5dn9wCBVQ8PlaFhh_kNxieMnU2lQFNSFxgqBNcPkddfkxFISceWvYmd5gLS-eJEfxDVHD1TGehi7VKd4cBgrPC5QuU',
        iframeUrl: 'https://html5.gamedistribution.com/rvvASMiM/example-game-1/',
        category: 'Action',
        tags: ['Action', 'RPG'],
        isFeatured: true,
        isHot: true,
    },
    {
        id: 'pixel-puzzler',
        title: 'Pixel Puzzler',
        description: 'A mind-bending puzzle game with a retro arcade aesthetic.',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD23sxwfgqhDThK50NOXAfBACjI2ZH1Pr_wCyIqNoQVjk-n5KHo0FVW80F9MJucJwuvaJulKQTPLsZ3dgdbS_03ctrZ_4Q-E3cSvRrSZsjhgUB_f2_Y2DXcxhf74Trjo6FDP11X6xnDvqyWTjLNA6XQr_YIXyCRNzjss283LuEL6dZfr-YwZlnlHKDC_B1u6osm2KijZlowDELF6_yBUs3Jdooctffcq4FSPUes3RZJjT6dBdcHOIy8QEivWjXvIqUmdGitH_FhExYG',
        iframeUrl: 'https://html5.gamedistribution.com/rvvASMiM/example-game-2/',
        category: 'Puzzle',
        tags: ['Puzzle'],
        isFeatured: true,
        isNew: true,
    },
    // Add 20-30 more games here...
];

export const CATEGORIES: Game['category'][] = [
    'Action',
    'Puzzle',
    'Arcade',
    'Sports',
    'Strategy',
    'Adventure',
    'Racing',
    'Simulation',
    'RPG',
];