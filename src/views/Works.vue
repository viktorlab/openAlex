<script setup lang="ts">
import LoadingWrapper from '@/components/common/LoadingWrapper.vue';
import PageLayout from '@/components/common/PageLayout.vue';
import WorkItem from '@/components/WorkItem.vue';
import NoDataFound from '@/components/common/NoDataFound.vue';
import { useWorks } from '@/composables/useWorks';
import { useFavorites } from '@/composables/useFavorites';
import { useRouter } from 'vue-router';
import { routeConfig } from '@/router/routeConfig';

const router = useRouter();
const { isLoading, works } = useWorks();
const { addToFavorites } = useFavorites();

const navigateToWorkDetail = (id: string) => {
  router.push({ name: routeConfig.workDetail.name, params: { id } });
};
</script>

<template>
  <PageLayout>
    <LoadingWrapper :loading="isLoading">
      <div v-if="works.results.length">
        <WorkItem
          v-for="work in works.results"
          :key="work.id"
          :work="work"
          :showAddToFavorites="true"
          @addToFavorites="addToFavorites"
          @navigate="navigateToWorkDetail"
        />
      </div>
      <div v-else>
        <NoDataFound />
      </div>
    </LoadingWrapper>
  </PageLayout>
</template>
