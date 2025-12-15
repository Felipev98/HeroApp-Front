import type { Hero } from '@/types';

export function filterHeroesByName(heroes: Hero[], searchText: string): Hero[] {
  if (!searchText.trim()) {
    return heroes;
  }

  const normalizedSearch = searchText.toLowerCase().trim();

  return heroes.filter((hero) =>
    hero.name.toLowerCase().includes(normalizedSearch)
  );
}

export function filterHeroes(
  heroes: Hero[],
  filters: {
    name?: string;
    isDone?: boolean;
    power?: string;
  }
): Hero[] {
  let filtered = heroes;

  if (filters.name) {
    filtered = filterHeroesByName(filtered, filters.name);
  }
  return filtered;
}

