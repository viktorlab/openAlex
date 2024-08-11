import type { Work } from '@/entities/works';
import { ref, type Ref } from 'vue';

export function useFavorites() {
  const favorites: Ref<Work[]> = ref(JSON.parse(localStorage.getItem('favorites') || '[]'));

  const addToFavorites = (work: Work) => {
    const existing = favorites.value.find((favorite: Work) => favorite.id === work.id);
    if (!existing) {
      favorites.value.push(work);
      localStorage.setItem('favorites', JSON.stringify(favorites.value));
    } else {
      return;
    }
  };

  const removeFromFavorites = (work: Work) => {
    const index = favorites.value.findIndex((favorite: Work) => favorite.id === work.id);
    if (index !== -1) {
      favorites.value.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites.value));
    }
  };

  return { favorites, addToFavorites, removeFromFavorites };
}
