import { ref } from 'vue';
import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { useWorks } from '../useWorks';
import { useFetch } from '../useFetch';
import { useSearchStore } from '@/stores/search';
import { initialHttpResponse } from '@/constants/initialHttpResponse';
import { type HttpResponse } from '@/entities/http';
import { type Work } from '@/entities/works';
import { BASE_URL } from '@/constants/http';

vi.mock('../useFetch');
vi.mock('@/stores/search');

describe('useWorks composable', () => {
  const mockFetchResult = ref<HttpResponse<Work>>(initialHttpResponse);
  const mockIsLoading = ref(false);
  const mockReload = vi.fn();
  let mockSearchTerm: ReturnType<typeof ref<string>>;

  beforeEach(() => {
    vi.clearAllMocks();

    (useFetch as Mock).mockReturnValue({
      result: mockFetchResult,
      isLoading: mockIsLoading,
      reload: mockReload
    });

    mockSearchTerm = ref('initial search');
    const mockSetSearchTerm = vi.fn((term: string) => {
      mockSearchTerm.value = term;
    });

    (useSearchStore as unknown as Mock).mockReturnValue({
      searchTerm: mockSearchTerm,
      setSearchTerm: mockSetSearchTerm
    });
  });

  it('should initialize with the correct query params and call useFetch with correct arguments', () => {
    const { works, isLoading } = useWorks();

    expect(useFetch).toHaveBeenCalledWith(
      `${BASE_URL}/works`,
      initialHttpResponse,
      expect.objectContaining({
        method: 'GET',
        queryParams: expect.objectContaining({
          search: 'initial search'
        })
      })
    );

    expect(works.value).toEqual(initialHttpResponse);
    expect(isLoading.value).toBe(false);
  });

  it('should call reload when searchTerm changes', async () => {
    const { works } = useWorks();
    const searchStore = useSearchStore();

    searchStore.setSearchTerm('test search term');
    await works.value;

    expect(mockReload).toHaveBeenCalled();

    expect(useFetch).toHaveBeenCalledWith(
      `${BASE_URL}/works`,
      initialHttpResponse,
      expect.objectContaining({
        queryParams: expect.objectContaining({
          search: 'test search term'
        })
      })
    );
  });

  it('should throttle the reload function', async () => {
    const { works } = useWorks();
    const searchStore = useSearchStore();

    searchStore.setSearchTerm('first search term');
    searchStore.setSearchTerm('second search term');
    searchStore.setSearchTerm('third search term');

    expect(mockReload).toHaveBeenCalledTimes(1);

    await works.value;

    expect(useFetch).toHaveBeenCalledWith(
      `${BASE_URL}/works`,
      initialHttpResponse,
      expect.objectContaining({
        queryParams: expect.objectContaining({
          search: 'third search term'
        })
      })
    );
  });
});
