import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from './useFetch';
import type { Work } from '@/entities/works';
import { BASE_URL } from '@/constants/http';

export function useWorkDetail() {
  const route = useRoute();
  const workId = ref(route.params.id);

  const {
    result: work,
    isLoading,
    reload
  } = useFetch<Work | null>(`${BASE_URL}/works/${workId.value}`, null);

  onMounted(() => {
    reload();
  });

  return { work, isLoading };
}
