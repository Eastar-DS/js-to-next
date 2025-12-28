import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useImagesByPage } from '@/features/paginate-images/hooks/useImagesByPage';
import * as imageApi from '@/entities/image/api/imageApi';
import type { Image } from '@/entities/image/model/types';
import React from 'react';

jest.mock('@/entities/image/api/imageApi');

const mockImages: Image[] = [
  {
    id: 1,
    tags: ['nature', 'landscape'],
    previewURL: "https://example.com/preview.jpg",
    webformatURL: 'https://example.com/image1.jpg',
    largeImageURL: 'https://example.com/image1_large.jpg',
    user: 'photographer1',
    likes: 100,
    views: 1000,
  downloads: 25,
  },
  {
    id: 2,
    tags: ['city', 'urban'],
    previewURL: "https://example.com/preview.jpg",
    webformatURL: 'https://example.com/image2.jpg',
    largeImageURL: 'https://example.com/image2_large.jpg',
    user: 'photographer2',
    likes: 200,
    views: 2000,
  downloads: 25,
  },
];

describe('useImagesByPage 훅', () => {
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

  it('query와 page를 받아 useQuery를 호출해야 한다', async () => {
    (imageApi.getImagesByPage as jest.Mock).mockResolvedValueOnce(mockImages);

    const { result } = renderHook(() => useImagesByPage('nature', 1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('성공 시 data를 반환해야 한다', async () => {
    (imageApi.getImagesByPage as jest.Mock).mockResolvedValueOnce(mockImages);

    const { result } = renderHook(() => useImagesByPage('nature', 1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockImages);
    });
  });

  it('로딩 상태를 올바르게 반환해야 한다', async () => {
    (imageApi.getImagesByPage as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve(mockImages), 100))
    );

    const { result } = renderHook(() => useImagesByPage('nature', 1), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('에러 발생 시 error를 반환해야 한다', async () => {
    const errorMessage = 'API Error';
    (imageApi.getImagesByPage as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useImagesByPage('nature', 1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });

  it('빈 query일 때는 쿼리를 실행하지 않아야 한다 (enabled: false)', () => {
    const { result } = renderHook(() => useImagesByPage('', 1), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(imageApi.getImagesByPage).not.toHaveBeenCalled();
  });

  it('query 또는 page가 변경되면 새로운 쿼리를 실행해야 한다', async () => {
    (imageApi.getImagesByPage as jest.Mock).mockResolvedValue(mockImages);

    const { result, rerender } = renderHook(
      ({ query, page }) => useImagesByPage(query, page),
      {
        wrapper: createWrapper(),
        initialProps: { query: 'nature', page: 1 },
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(imageApi.getImagesByPage).toHaveBeenCalledWith('nature', 1);

    rerender({ query: 'nature', page: 2 });

    await waitFor(() => {
      expect(imageApi.getImagesByPage).toHaveBeenCalledWith('nature', 2);
    });
  });

  it('placeholderData를 사용하여 이전 데이터를 유지해야 한다', async () => {
    (imageApi.getImagesByPage as jest.Mock).mockResolvedValue(mockImages);

    const { result, rerender } = renderHook(
      ({ query, page }) => useImagesByPage(query, page),
      {
        wrapper: createWrapper(),
        initialProps: { query: 'nature', page: 1 },
      }
    );

    await waitFor(() => expect(result.current.data).toEqual(mockImages));

    const newMockImages: Image[] = [
      {
        id: 3,
        tags: ['mountains'],
        previewURL: "https://example.com/preview.jpg",
        webformatURL: 'https://example.com/image3.jpg',
        largeImageURL: 'https://example.com/image3_large.jpg',
        user: 'photographer3',
        likes: 300,
        views: 3000,
      downloads: 25,
      },
    ];

    (imageApi.getImagesByPage as jest.Mock).mockResolvedValue(newMockImages);

    rerender({ query: 'nature', page: 2 });

    // 페이지 전환 중에도 이전 데이터 유지
    expect(result.current.data).toEqual(mockImages);

    await waitFor(() => expect(result.current.data).toEqual(newMockImages));
  });

  it('refetch 함수를 제공해야 한다', async () => {
    (imageApi.getImagesByPage as jest.Mock).mockResolvedValueOnce(mockImages);

    const { result } = renderHook(() => useImagesByPage('nature', 1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.refetch).toBeDefined();
    expect(typeof result.current.refetch).toBe('function');
  });
});
