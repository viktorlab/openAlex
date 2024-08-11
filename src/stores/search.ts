import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchStore = defineStore('search', () => {
  const searchTerm = ref('');

  const setSearchTerm = (term: string) => {
    searchTerm.value = term;
  };

  return { searchTerm, setSearchTerm };
});
