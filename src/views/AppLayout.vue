<script setup lang="ts">
import Brand from '@/components/common/Brand.vue';
import Search from '@/components/Search.vue';
import { routeConfig } from '@/router/routeConfig';
</script>

<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-50">
    <header class="w-full max-w-4xl mx-auto flex justify-between items-center py-6">
      <Brand />
      <div class="flex-grow max-w-lg mx-8">
        <Search />
      </div>
      <nav class="text-gray-800">
        <router-link
          :to="routeConfig.favorites.path"
          class="hover:text-gray-600 underline decoration-teal-500"
        >
          Favorites
        </router-link>
      </nav>
    </header>
    <main class="w-full max-w-4xl mx-auto p-4">
      <router-view />
    </main>
  </div>
</template>
