<script setup lang="ts">
import LoadingWrapper from '@/components/common/LoadingWrapper.vue';
import PageLayout from '@/components/common/PageLayout.vue';
import WorkItem from '@/components/WorkItem.vue';
import { useWorkDetail } from '@/composables/useWorkDetail';
import { useFavorites } from '@/composables/useFavorites';
import NoDataFound from '@/components/common/NoDataFound.vue';

const { isLoading, work } = useWorkDetail();
const { addToFavorites } = useFavorites();
</script>

<template>
  <PageLayout>
    <LoadingWrapper :loading="isLoading">
      <div v-if="work">
        <WorkItem :work="work" :showAddToFavorites="true" @addToFavorites="addToFavorites" />
      </div>
      <div v-else>
        <NoDataFound />
      </div>
    </LoadingWrapper>
  </PageLayout>
</template>
