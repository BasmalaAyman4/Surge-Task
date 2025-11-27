export interface Game {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    iframeUrl: string;
    category: GameCategory;
    tags?: string[];
    isFeatured?: boolean;
    isNew?: boolean;
    isHot?: boolean;
}

export type GameCategory =
    | 'Action'
    | 'Puzzle'
    | 'Arcade'
    | 'Sports'
    | 'Strategy'
    | 'Adventure'
    | 'Racing'
    | 'Simulation'
    | 'RPG';

export interface GameFilters {
    searchQuery: string;
    selectedCategories: GameCategory[];
}