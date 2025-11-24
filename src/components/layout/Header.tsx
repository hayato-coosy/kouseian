import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 dark:border-gray-800 dark:bg-gray-950/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:opacity-80 transition-opacity dark:text-gray-50">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-1.5 rounded-lg">
            <Sparkles size={20} />
          </div>
          <span>BriefGen</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:text-gray-50">
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
