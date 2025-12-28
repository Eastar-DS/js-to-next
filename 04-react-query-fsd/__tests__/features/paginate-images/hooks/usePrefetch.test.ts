import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { usePrefetch } from '@/features/paginate-images/hooks/usePrefetch';
import * as imageApi from '@/entities/image/api/imageApi';

// Mock imageApi
jest.mock('@/entities/image/api/imageApi');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };

  return Wrapper;
};

describe('usePrefetch 훅', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('다음 페이지를 prefetch 해야 한다', async () => {
    const mockImages = [
      {
        id: 1,
        tags: ['test'],
        webformatURL: 'test.jpg',
        largeImageURL: 'large.jpg',
        user: 'user',
        likes: 100,
        views: 500,
      },
    ];

    (imageApi.getImagesByPage as jest.Mock).mockResolvedValueOnce(mockImages);

    const wrapper = createWrapper();
    const { result } = renderHook(() => usePrefetch('cats', 1, 10), {
      wrapper,
    });

    // prefetch 함수 호출
    await waitFor(() => {
      result.current.prefetchNextPage();
    });

    // 다음 페이지(2)가 prefetch 되었는지 확인
    await waitFor(() => {
      expect(imageApi.getImagesByPage).toHaveBeenCalledWith('cats', 2);
    });
  });

  it('마지막 페이지에서는 prefetch 하지 않아야 한다', () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => usePrefetch('cats', 10, 10), {
      wrapper,
    });

    result.current.prefetchNextPage();

    // 마지막 페이지이므로 API 호출 안 됨
    expect(imageApi.getImagesByPage).not.toHaveBeenCalled();
  });

  it('빈 query에서는 prefetch 하지 않아야 한다', () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => usePrefetch('', 1, 10), {
      wrapper,
    });

    result.current.prefetchNextPage();

    // 빈 query이므로 API 호출 안 됨
    expect(imageApi.getImagesByPage).not.toHaveBeenCalled();
  });

  it('totalPages가 0이면 prefetch 하지 않아야 한다', () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => usePrefetch('cats', 1, 0), {
      wrapper,
    });

    result.current.prefetchNextPage();

    // totalPages가 0이므로 API 호출 안 됨
    expect(imageApi.getImagesByPage).not.toHaveBeenCalled();
  });
});
