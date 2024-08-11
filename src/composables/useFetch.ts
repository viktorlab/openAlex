import { ref, reactive, toRefs } from 'vue';
import axios, { type AxiosRequestConfig } from 'axios';

type UseFetchOptions<T> = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  queryParams?: Record<string, any>;
  body?: T;
  headers?: Record<string, string>;
};

export function useFetch<T>(url: string, initial: T, options: UseFetchOptions<T> = {}) {
  const result = ref<T>(initial);
  const state = reactive({
    isLoading: false,
    error: null as any
  });

  const fetchData = async () => {
    state.isLoading = true;
    try {
      const axiosConfig: AxiosRequestConfig = {
        method: options.method || 'GET',
        url,
        params: options.queryParams,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        data: options.body
      };

      const response = await axios(axiosConfig);
      result.value = response.data;
    } catch (error) {
      console.error(error);
      state.error = error;
    } finally {
      state.isLoading = false;
    }
  };

  return {
    ...toRefs(state),
    result,
    reload: fetchData
  };
}
