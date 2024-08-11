<script setup lang="ts">
import type { Work } from '@/entities/works';

const props = defineProps<{
  work: Work;
  showAddToFavorites?: boolean;
  showRemoveFromFavorites?: boolean;
}>();

const emits = defineEmits<{
  (e: 'addToFavorites', work: Work): void;
  (e: 'removeFromFavorites', work: Work): void;
  (e: 'navigate', workId: string): void;
}>();

const handleNavigate = () => emits('navigate', props.work.id);
const handleAddToFavorites = () => emits('addToFavorites', props.work);
const handleRemoveFromFavorites = () => emits('removeFromFavorites', props.work);
</script>

<template>
  <div class="border-b pb-4 mb-4">
    <h2
      @click="handleNavigate"
      class="text-xl font-bold text-gray-900 pb-8 cursor-pointer hover:underline decoration-teal-500"
    >
      {{ work.display_name }}
    </h2>
    <p class="text-sm text-gray-600 pb-4">
      Published on: {{ new Date(work.publication_date).toLocaleDateString() }}
    </p>
    <div class="flex justify-between items-center">
      <a v-if="work.doi" :href="work.doi" target="_blank" class="text-teal-500 hover:underline"
        >Find out more</a
      >
      <a
        v-if="showAddToFavorites"
        @click="handleAddToFavorites"
        class="text-teal-500 cursor-pointer hover:underline"
        >Add to favorites</a
      >
      <a
        v-if="showRemoveFromFavorites"
        @click="handleRemoveFromFavorites"
        class="text-teal-500 cursor-pointer hover:underline"
        >Remove from favorites</a
      >
    </div>
  </div>
</template>
