<script setup lang="ts">
import Spinner from '@/components/common/Spinner.vue';

defineProps({
  loading: {
    type: Boolean,
    required: true
  }
});
</script>

<template>
  <div>
    <Spinner v-if="loading" />
    <slot v-else />
  </div>
</template>
