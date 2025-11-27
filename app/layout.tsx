import type { Metadata } from 'next';
import './global.css';
import { Space_Grotesk } from 'next/font/google';
import { Header } from '@/components/Header';
import { Toaster } from 'sonner';

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

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className={`${spaceGrotesk.className} bg-[#1a1022] text-gray-200 antialiased`}>
        <div className="relative flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="bg-black/20 border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 text-white">
              <div className="h-8 w-8 rounded-lg bg-[#9d25f4] flex items-center justify-center">
                <span className="text-xl">🎮</span>
              </div>
              <h2 className="text-xl font-bold">GameVerse</h2>
            </div>
            <p className="mt-4 max-w-xs text-sm text-gray-400">
              The ultimate hub for discovering and playing thousands of indie and classic games instantly on your browser.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-white">Links</h4>
            <nav className="mt-4 flex flex-col gap-2">
              <a className="text-sm text-gray-400 transition-colors hover:text-[#9d25f4]" href="#">
                About
              </a>
              <a className="text-sm text-gray-400 transition-colors hover:text-[#9d25f4]" href="#">
                Contact
              </a>
              <a className="text-sm text-gray-400 transition-colors hover:text-[#9d25f4]" href="#">
                Privacy Policy
              </a>
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-white">Community</h4>
            <nav className="mt-4 flex flex-col gap-2">
              <a className="text-sm text-gray-400 transition-colors hover:text-[#9d25f4]" href="#">
                Discord
              </a>
              <a className="text-sm text-gray-400 transition-colors hover:text-[#9d25f4]" href="#">
                Twitter
              </a>
              <a className="text-sm text-gray-400 transition-colors hover:text-[#9d25f4]" href="#">
                Forums
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          <p>© 2024 GameVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}