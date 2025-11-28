import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
                        404
                    </h1>
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Game Not Found
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md">
                        Sorry, we couldn&apos;t find the game you&apos;re looking for. It may have been removed or the link might be incorrect.                    </p>
                </div>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#9d25f4] text-white rounded-lg font-semibold transition-colors hover:bg-[#9d25f4]/80"
                >
                    <Home className="h-5 w-5" />
                    <span>Back to Home</span>
                </Link>
            </div>
        </div>
    );
}