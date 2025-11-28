export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="h-6 w-32 bg-gray-200 dark:bg-white/10 rounded mb-6 animate-pulse" />

            <div className="mb-6">
                <div className="h-10 w-3/4 bg-gray-200 dark:bg-white/10 rounded mb-2 animate-pulse" />
                <div className="h-6 w-full bg-gray-200 dark:bg-white/10 rounded mb-4 animate-pulse" />
                <div className="flex gap-2">
                    <div className="h-8 w-20 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                    <div className="h-8 w-20 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                </div>
            </div>

            <div className="relative bg-gray-200 dark:bg-white/10 rounded-xl overflow-hidden mb-8 animate-pulse">
                <div className="w-full" style={{ paddingBottom: '56.25%' }} />
            </div>

            <div className="mb-6">
                <div className="h-8 w-48 bg-gray-200 dark:bg-white/10 rounded mb-6 animate-pulse" />
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-64 bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}