import { ref, watch } from 'vue';
import { throttle } from 'lodash';
import { useSearchStore } from '@/stores/search';
import { baseQueryParams, BASE_URL } from '@/constants/http';
import { type HttpResponse } from '@/entities/http';
import { type Work } from '@/entities/works';
import { initialHttpResponse } from '@/constants/initialHttpResponse';
import { useFetch } from './useFetch';

export function useWorks() {
  const searchStore = useSearchStore();

  const queryParams = ref({
    ...baseQueryParams,
    search: searchStore.searchTerm
  });

  const {
    result: works,
    isLoading,
    reload
  } = useFetch<HttpResponse<Work>>(`${BASE_URL}/works`, initialHttpResponse, {
    method: 'GET',
    queryParams: queryParams.value
  });

  const throttledReload = throttle(() => {
    queryParams.value.search = searchStore.searchTerm;
    reload();
  }, 500);

  watch(
    () => searchStore.searchTerm,
    () => {
      throttledReload();
    },
    { immediate: true }
  );

  return { works, isLoading };
}
