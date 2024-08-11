<script setup lang="ts">
import { routeConfig } from '@/router/routeConfig';
</script>
<template>
  <div class="text-3xl font-semibold text-gray-800">
    <router-link :to="routeConfig.works.path" class="hover:text-gray-600">
      Open<span class="text-teal-500">Alex</span>
    </router-link>
  </div>
</template>
