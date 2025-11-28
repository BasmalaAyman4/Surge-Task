export function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-black/20 border-t border-gray-300 dark:border-white/10 mt-16">
            <div className="container mx-auto px-4 py-8 lg:px-8">
                <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-[#9d25f4] flex items-center justify-center">
                                <span className="text-xl">🎮</span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">GameVerse</h2>
                        </div>
                        <p className="mt-4 max-w-xs text-sm text-gray-600 dark:text-gray-400">
                            The ultimate hub for discovering and playing thousands of indie and classic games instantly on your browser.
                        </p>
                    </div>

                </div>

                <div className="mt-8 border-t border-gray-300 dark:border-white/10 pt-6 text-center text-sm text-gray-500">
                    <p>© 2024 GameVerse. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}