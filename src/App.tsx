import { SearchBar } from './components/search-bar';
import { SearchEngines } from './components/search-engines';
import { ThemeToggle } from './components/theme-toggle';

export default function App() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 bg-gradient-to-br from-background/80 via-background to-background/90 dark:from-background/90 dark:via-background/80 dark:to-background/95 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/5 z-0" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-start gap-8 md:gap-12 pt-12 md:pt-24">
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animated-gradient-text">
            NeoSearch
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Search across multiple platforms with bangs
          </p>
        </div>

        <SearchBar />

        <SearchEngines />
      </div>

      <ThemeToggle />
    </main>
  );
}
