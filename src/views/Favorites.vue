<script setup lang="ts">
import PageLayout from '@/components/common/PageLayout.vue';
import WorkItem from '@/components/WorkItem.vue';
import NoDataFound from '@/components/common/NoDataFound.vue';
import { useFavorites } from '@/composables/useFavorites';
import { routeConfig } from '@/router/routeConfig';
import { useRouter } from 'vue-router';

const router = useRouter();
const { favorites, removeFromFavorites } = useFavorites();

const navigateToWorkDetail = (id: string) => {
  router.push({ name: routeConfig.workDetail.name, params: { id } });
};
</script>

<template>
  <PageLayout>
    <div v-if="favorites.length">
      <WorkItem
        v-for="work in favorites"
        :key="work.id"
        :work="work"
        @navigate="navigateToWorkDetail"
        :showRemoveFromFavorites="true"
        @removeFromFavorites="removeFromFavorites"
      />
    </div>
    <div v-else>
      <NoDataFound />
    </div>
  </PageLayout>
</template>
