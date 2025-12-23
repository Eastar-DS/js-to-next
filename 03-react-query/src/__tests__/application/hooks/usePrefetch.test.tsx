/**
 * usePrefetch 훅 테스트
 * Phase 3.8: Prefetching 기능
 */

import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { usePrefetch } from '@application/hooks/usePrefetch';
import type { GetImagesByPageUseCase } from '@domain/usecases/GetImagesByPageUseCase';
import type { Image } from '@domain/entities/Image';

// Mock UseCase
const createMockGetByPageUseCase = (
  result: { success: boolean; data?: Image[]; error?: Error }
): GetImagesByPageUseCase =>
  ({
    execute: jest.fn().mockResolvedValue(result),
  }) as unknown as GetImagesByPageUseCase;

// Test Wrapper
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('usePrefetch (Phase 3.8)', () => {
  const mockImages: Image[] = [
    {
      id: 1,
      previewURL: 'https://preview1.jpg',
      largeImageURL: 'https://large1.jpg',
      tags: 'cat, cute',
      user: 'user1',
      likes: 100,
      views: 1000,
      downloads: 50,
    },
  ];

  describe('기본 동작', () => {
    it('prefetchNextPage 함수를 제공해야 함', () => {
      const mockUseCase = createMockGetByPageUseCase({
        success: true,
        data: mockImages,
      });

      const { result } = renderHook(() => usePrefetch(mockUseCase), {
        wrapper: createWrapper(),
      });

      // prefetchNextPage 함수가 제공되는지 확인
      expect(result.current.prefetchNextPage).toBeDefined();
      expect(typeof result.current.prefetchNextPage).toBe('function');
    });

    it('현재 페이지가 제공되면 다음 페이지를 prefetch해야 함', async () => {
      const mockUseCase = createMockGetByPageUseCase({
        success: true,
        data: mockImages,
      });

      const { result } = renderHook(() => usePrefetch(mockUseCase), {
        wrapper: createWrapper(),
      });

      // 다음 페이지 prefetch 실행
      await result.current.prefetchNextPage('cats', 1);

      // UseCase가 다음 페이지(2)로 호출되었는지 확인
      await waitFor(() => {
        expect(mockUseCase.execute).toHaveBeenCalledWith('cats', 2);
      });
    });

    it('빈 검색어면 prefetch하지 않아야 함', async () => {
      const mockUseCase = createMockGetByPageUseCase({
        success: true,
        data: mockImages,
      });

      const { result } = renderHook(() => usePrefetch(mockUseCase), {
        wrapper: createWrapper(),
      });

      // 빈 검색어로 prefetch 시도
      await result.current.prefetchNextPage('', 1);

      // UseCase가 호출되지 않아야 함
      expect(mockUseCase.execute).not.toHaveBeenCalled();
    });

    it('totalPages를 초과하면 prefetch하지 않아야 함', async () => {
      const mockUseCase = createMockGetByPageUseCase({
        success: true,
        data: mockImages,
      });

      const { result } = renderHook(() => usePrefetch(mockUseCase), {
        wrapper: createWrapper(),
      });

      // 마지막 페이지(5)에서 prefetch 시도
      await result.current.prefetchNextPage('cats', 5, 5);

      // UseCase가 호출되지 않아야 함
      expect(mockUseCase.execute).not.toHaveBeenCalled();
    });
  });
});
