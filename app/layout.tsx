import type { Metadata } from 'next';
import './global.css';
import { Space_Grotesk } from 'next/font/google';
import { Header } from '@/components/Header';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'GameVerse - Play Hundreds of Games Instantly',
  description: 'Discover and play a vast collection of indie and classic games right from your browser.',
  openGraph: {
    title: 'GameVerse - Play Hundreds of Games Instantly',
    description: 'Discover and play a vast collection of indie and classic games right from your browser.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} antialiased transition-colors duration-300`} suppressHydrationWarning>
        <ThemeProvider>
          <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-[#1a1022] text-gray-900 dark:text-gray-200">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <BottomNav/>
          </div>
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}

