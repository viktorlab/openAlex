import { useFavorites } from '@/composables/useFavorites';
import type { Work } from '@/entities/works';
import { beforeEach, describe, expect, test } from 'vitest';

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('useFavorites', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('should initialize with an empty favorites list if localStorage is empty', () => {
    const { favorites } = useFavorites();
    expect(favorites.value).toEqual([]);
  });

  test('should initialize with favorites from localStorage', () => {
    const mockFavorites: Work[] = [
      {
        id: '1',
        display_name: 'Test Work 1',
        doi: '10.1234/abc',
        publication_date: '2021-01-01',
        publication_year: 2021
      },
      {
        id: '2',
        display_name: 'Test Work 2',
        doi: '10.123456/abc',
        publication_date: '2022-01-01',
        publication_year: 2022
      }
    ];
    window.localStorage.setItem('favorites', JSON.stringify(mockFavorites));

    const { favorites } = useFavorites();
    expect(favorites.value).toEqual(mockFavorites);
  });

  test('should add a work to favorites and update localStorage', () => {
    const { favorites, addToFavorites } = useFavorites();
    const work: Work = {
      id: '1',
      display_name: 'Test Work 1',
      doi: '10.1234/abc',
      publication_date: '2021-01-01',
      publication_year: 2021
    };

    addToFavorites(work);
    expect(favorites.value).toContainEqual(work);
    expect(JSON.parse(window.localStorage.getItem('favorites')!)).toContainEqual(work);
  });

  test('should not add the same work twice', () => {
    const { favorites, addToFavorites } = useFavorites();
    const work: Work = {
      id: '1',
      display_name: 'Test Work 1',
      doi: '10.1234/abc',
      publication_date: '2021-01-01',
      publication_year: 2021
    };

    addToFavorites(work);
    addToFavorites(work);

    expect(favorites.value.length).toBe(1);
  });

  test('should remove a work from favorites and update localStorage', () => {
    const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
    const work: Work = {
      id: '1',
      display_name: 'Test Work 1',
      doi: '10.1234/abc',
      publication_date: '2021-01-01',
      publication_year: 2021
    };

    addToFavorites(work);
    removeFromFavorites(work);

    expect(favorites.value).not.toContainEqual(work);
    expect(JSON.parse(window.localStorage.getItem('favorites')!)).not.toContainEqual(work);
  });

  test('should not throw an error if removing a work that is not in favorites', () => {
    const { removeFromFavorites } = useFavorites();
    const work: Work = {
      id: '1',
      display_name: 'Test Work 1',
      doi: '10.1234/abc',
      publication_date: '2021-01-01',
      publication_year: 2021
    };

    expect(() => removeFromFavorites(work)).not.toThrow();
  });
});
