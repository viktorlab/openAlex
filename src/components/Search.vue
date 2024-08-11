<script setup lang="ts">
import { useSearchStore } from '@/stores/search';
import { useRouter } from 'vue-router';
import { routeConfig } from '@/router/routeConfig';

const searchStore = useSearchStore();
const router = useRouter();

const updateSearchTerm = (event: Event) => {
  const target = event.target as HTMLInputElement;
  searchStore.setSearchTerm(target.value);

  router.push({ path: routeConfig.works.path });
};
</script>

<template>
  <input
    :value="searchStore.searchTerm"
    @input="updateSearchTerm"
    type="text"
    placeholder="Search..."
    class="w-full bg-white border border-gray-300 rounded-lg py-2 px-4 shadow-sm focus:outline-none focus:ring-1 ring-teal-500 focus:border-teal-500"
  />
</template>
