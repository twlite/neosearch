import { searchEngines } from './bangs';

export function handleSearch(query: string): void {
  let searchUrl = 'https://www.google.com/search?q=';
  let searchQuery = query.trim();

  for (const engine of searchEngines) {
    for (const prefix of engine.prefixes) {
      if (searchQuery.toLowerCase().startsWith(`!${prefix} `)) {
        searchQuery = searchQuery.substring(prefix.length + 1).trim();
        searchUrl = engine.url;
        break;
      } else if (searchQuery.toLowerCase().endsWith(` !${prefix}`)) {
        searchQuery = searchQuery
          .substring(0, searchQuery.length - prefix.length - 1)
          .trim();
        searchUrl = engine.url;
        break;
      }
    }
  }

  const encodedQuery = encodeURIComponent(searchQuery);

  window.location.replace(`${searchUrl}${encodedQuery}`);
}
