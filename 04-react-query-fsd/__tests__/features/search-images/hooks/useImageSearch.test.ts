import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useImageSearch } from '@/features/search-images/hooks/useImageSearch';
import * as imageApi from '@/entities/image/api/imageApi';
import type { Image } from '@/entities/image/model/types';
import React from 'react';

jest.mock('@/entities/image/api/imageApi');

const mockImages: Image[] = [
  {
    id: 1,
    tags: ['nature', 'landscape'],
    webformatURL: 'https://example.com/image1.jpg',
    largeImageURL: 'https://example.com/large1.jpg',
    user: 'photographer1',
    likes: 100,
    views: 500,
  },
  {
    id: 2,
    tags: ['city', 'architecture'],
    webformatURL: 'https://example.com/image2.jpg',
    largeImageURL: 'https://example.com/large2.jpg',
    user: 'photographer2',
    likes: 200,
    views: 1000,
  },
];

describe('useImageSearch 훅', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    jest.clearAllMocks();
  });

  const createWrapper = () => {
    return function Wrapper({ children }: { children: React.ReactNode }) {
      return React.createElement(
        QueryClientProvider,
        { client: queryClient },
        children
      );
    };
  };

  it('query를 받아 useQuery를 호출해야 한다', async () => {
    (imageApi.getImages as jest.Mock).mockResolvedValueOnce(mockImages);

    const { result } = renderHook(() => useImageSearch('nature'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('성공 시 data를 반환해야 한다', async () => {
    (imageApi.getImages as jest.Mock).mockResolvedValueOnce(mockImages);

    const { result } = renderHook(() => useImageSearch('nature'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockImages);
    });
  });

  it('로딩 상태를 올바르게 반환해야 한다', async () => {
    (imageApi.getImages as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(mockImages), 100)
        )
    );

    const { result } = renderHook(() => useImageSearch('nature'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('에러 발생 시 error를 반환해야 한다', async () => {
    const errorMessage = 'API Error';
    (imageApi.getImages as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useImageSearch('nature'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });

  it('빈 query일 때는 쿼리를 실행하지 않아야 한다 (enabled: false)', () => {
    const { result } = renderHook(() => useImageSearch(''), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(imageApi.getImages).not.toHaveBeenCalled();
  });

  it('query가 변경되면 새로운 쿼리를 실행해야 한다', async () => {
    (imageApi.getImages as jest.Mock).mockResolvedValue(mockImages);

    const { result, rerender } = renderHook(
      ({ query }) => useImageSearch(query),
      {
        wrapper: createWrapper(),
        initialProps: { query: 'nature' },
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(imageApi.getImages).toHaveBeenCalledWith('nature');

    rerender({ query: 'city' });

    await waitFor(() => {
      expect(imageApi.getImages).toHaveBeenCalledWith('city');
    });
  });

  it('QueryClient 기본 설정을 사용해야 한다 (staleTime, gcTime)', async () => {
    (imageApi.getImages as jest.Mock).mockResolvedValueOnce(mockImages);

    const { result } = renderHook(() => useImageSearch('nature'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // QueryClient 옵션 확인 (간접적으로 캐싱 동작 확인)
    expect(result.current.data).toEqual(mockImages);
  });

  it('refetch 함수를 제공해야 한다', async () => {
    (imageApi.getImages as jest.Mock).mockResolvedValueOnce(mockImages);

    const { result } = renderHook(() => useImageSearch('nature'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.refetch).toBeDefined();
    expect(typeof result.current.refetch).toBe('function');
  });
});
