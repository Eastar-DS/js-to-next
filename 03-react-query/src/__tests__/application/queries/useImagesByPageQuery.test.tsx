/**
 * useImagesByPageQuery 훅 테스트 (Pagination 지원)
 * Application Layer - React Query Hook with Pagination
 */

import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useImagesByPageQuery } from '@application/queries/useImagesByPageQuery';
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

describe('useImagesByPageQuery (Phase 3.5)', () => {
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
    {
      id: 2,
      previewURL: 'https://preview2.jpg',
      largeImageURL: 'https://large2.jpg',
      tags: 'cat, funny',
      user: 'user2',
      likes: 200,
      views: 2000,
      downloads: 100,
    },
  ];

  describe('페이지네이션 기본 동작', () => {
    it('query와 page로 이미지를 가져와야 함', async () => {
      const mockUseCase = createMockGetByPageUseCase({
        success: true,
        data: mockImages,
      });

      const { result } = renderHook(
        () => useImagesByPageQuery('cats', 1, mockUseCase),
        {
          wrapper: createWrapper(),
        }
      );

      // 로딩 상태
      expect(result.current.isLoading).toBe(true);

      // 데이터 로드 완료 대기
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // 결과 확인
      expect(result.current.data).toEqual(mockImages);
      expect(mockUseCase.execute).toHaveBeenCalledWith('cats', 1);
    });

    it('page가 변경되면 새로운 쿼리를 실행해야 함', async () => {
      const mockUseCase = createMockGetByPageUseCase({
        success: true,
        data: mockImages,
      });

      const { result, rerender } = renderHook(
        ({ page }) => useImagesByPageQuery('cats', page, mockUseCase),
        {
          wrapper: createWrapper(),
          initialProps: { page: 1 },
        }
      );

      // 첫 번째 페이지 로드 완료 대기
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockUseCase.execute).toHaveBeenCalledWith('cats', 1);
      expect(mockUseCase.execute).toHaveBeenCalledTimes(1);

      // 페이지 변경
      rerender({ page: 2 });

      await waitFor(() => {
        expect(mockUseCase.execute).toHaveBeenCalledWith('cats', 2);
      });

      expect(mockUseCase.execute).toHaveBeenCalledTimes(2);
    });

    it('빈 검색어면 쿼리를 실행하지 않아야 함', async () => {
      const mockUseCase = createMockGetByPageUseCase({
        success: true,
        data: mockImages,
      });

      const { result } = renderHook(
        () => useImagesByPageQuery('', 1, mockUseCase),
        {
          wrapper: createWrapper(),
        }
      );

      // 쿼리가 실행되지 않음
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(mockUseCase.execute).not.toHaveBeenCalled();
    });
  });

  describe('Query Key 구조', () => {
    it('Query Key에 query와 page가 포함되어야 함', async () => {
      const mockUseCase = createMockGetByPageUseCase({
        success: true,
        data: mockImages,
      });

      const wrapper = createWrapper();

      // 페이지 1
      const { result: result1 } = renderHook(
        () => useImagesByPageQuery('cats', 1, mockUseCase),
        { wrapper }
      );

      await waitFor(() => {
        expect(result1.current.isSuccess).toBe(true);
      });

      // 페이지 2
      const { result: result2 } = renderHook(
        () => useImagesByPageQuery('cats', 2, mockUseCase),
        { wrapper }
      );

      await waitFor(() => {
        expect(result2.current.isSuccess).toBe(true);
      });

      // 페이지별로 다른 쿼리로 인식되어 각각 호출됨
      expect(mockUseCase.execute).toHaveBeenCalledTimes(2);
      expect(mockUseCase.execute).toHaveBeenCalledWith('cats', 1);
      expect(mockUseCase.execute).toHaveBeenCalledWith('cats', 2);
    });
  });

  describe('placeholderData 동작', () => {
    it('페이지 변경 시 이전 데이터를 유지하면서 새 데이터를 로드해야 함', async () => {
      const page1Images: Image[] = [
        {
          id: 1,
          previewURL: 'https://preview1.jpg',
          largeImageURL: 'https://large1.jpg',
          tags: 'page1',
          user: 'user1',
          likes: 100,
          views: 1000,
          downloads: 50,
        },
      ];

      const page2Images: Image[] = [
        {
          id: 2,
          previewURL: 'https://preview2.jpg',
          largeImageURL: 'https://large2.jpg',
          tags: 'page2',
          user: 'user2',
          likes: 200,
          views: 2000,
          downloads: 100,
        },
      ];

      const mockUseCase = {
        execute: jest.fn()
          .mockResolvedValueOnce({ success: true, data: page1Images })
          .mockResolvedValueOnce({ success: true, data: page2Images }),
      } as unknown as GetImagesByPageUseCase;

      const { result, rerender } = renderHook(
        ({ page }) => useImagesByPageQuery('cats', page, mockUseCase),
        {
          wrapper: createWrapper(),
          initialProps: { page: 1 },
        }
      );

      // 페이지 1 로드 완료
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(page1Images);

      // 페이지 2로 변경
      rerender({ page: 2 });

      // placeholderData로 인해 즉시 이전 데이터 표시
      // (isLoading은 false, isPlaceholderData는 true)
      expect(result.current.data).toBeDefined();

      // 새 데이터 로드 완료 대기
      await waitFor(() => {
        expect(result.current.data).toEqual(page2Images);
      });
    });
  });

  describe('에러 처리', () => {
    it('UseCase에서 에러를 반환하면 에러 상태가 되어야 함', async () => {
      const mockError = new Error('Pagination API 호출 실패');
      const mockUseCase = createMockGetByPageUseCase({
        success: false,
        error: mockError,
      });

      const { result } = renderHook(
        () => useImagesByPageQuery('cats', 1, mockUseCase),
        {
          wrapper: createWrapper(),
        }
      );

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
      expect(result.current.data).toBeUndefined();
    });
  });
});
