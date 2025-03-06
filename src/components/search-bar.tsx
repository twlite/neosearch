import type React from 'react';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleSearch } from '@/lib/search-utils';

export function SearchBar() {
  const [query, setQuery] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      handleSearch(query);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('q');

    if (query?.trim()) {
      handleSearch(query);
    }
  }, []);

  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl relative group">
      <div className="relative w-full overflow-hidden rounded-full border border-input bg-background/30 backdrop-blur-xl shadow-lg transition-all duration-300 group-focus-within:shadow-xl group-focus-within:border-primary/50">
        <div className="flex items-center">
          <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search or type a command (e.g. !gh react)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 bg-transparent pl-10 pr-20 py-6 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:opacity-90 text-white animated-gradient-text rounded-full"
          >
            Search
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 blur-xl" />
      </div>
    </form>
  );
}
