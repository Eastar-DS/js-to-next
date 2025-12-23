/**
 * useImageSearch 훅 테스트
 * Application Layer - Custom Hook with React Query
 */

import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useImageSearch } from '@application/hooks/useImageSearch';
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

describe('useImageSearch (Phase 3.6)', () => {
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
    it('초기 상태가 올바르게 설정되어야 함', () => {
      const mockUseCase = createMockGetByPageUseCase({
        success: true,
        data: mockImages,
      });

      const { result } = renderHook(() => useImageSearch(mockUseCase), {
        wrapper: createWrapper(),
      });

      // 초기 상태 확인
      expect(result.current.images).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.currentPage).toBe(1);
    });

    it('search 함수로 검색을 수행해야 함', async () => {
      const mockUseCase = createMockGetByPageUseCase({
        success: true,
        data: mockImages,
      });

      const { result } = renderHook(() => useImageSearch(mockUseCase), {
        wrapper: createWrapper(),
      });

      // 검색 실행
      act(() => {
        result.current.search('cats');
      });

      // 데이터 로드 완료 대기
      await waitFor(() => {
        expect(result.current.images).toEqual(mockImages);
      });

      expect(mockUseCase.execute).toHaveBeenCalledWith('cats', 1);
    });

    it('search 호출 시 페이지를 1로 리셋해야 함', async () => {
      const mockUseCase = createMockGetByPageUseCase({
        success: true,
        data: mockImages,
      });

      const { result } = renderHook(() => useImageSearch(mockUseCase), {
        wrapper: createWrapper(),
      });

      // 첫 번째 검색
      act(() => {
        result.current.search('cats');
      });

      await waitFor(() => {
        expect(result.current.images).toEqual(mockImages);
      });

      // 페이지 변경
      act(() => {
        result.current.goToPage(3);
      });

      expect(result.current.currentPage).toBe(3);

      // 새로운 검색 (페이지가 1로 리셋되어야 함)
      act(() => {
        result.current.search('dogs');
      });

      await waitFor(() => {
        expect(result.current.currentPage).toBe(1);
      });
    });
  });

  describe('페이지네이션', () => {
    it('goToPage 함수로 페이지를 변경해야 함', async () => {
      const mockUseCase = createMockGetByPageUseCase({
        success: true,
        data: mockImages,
      });

      const { result } = renderHook(() => useImageSearch(mockUseCase), {
        wrapper: createWrapper(),
      });

      // 검색 실행
      act(() => {
        result.current.search('cats');
      });

      await waitFor(() => {
        expect(result.current.images).toEqual(mockImages);
      });

      // 페이지 변경
      act(() => {
        result.current.goToPage(2);
      });

      expect(result.current.currentPage).toBe(2);

      await waitFor(() => {
        expect(mockUseCase.execute).toHaveBeenCalledWith('cats', 2);
      });
    });
  });

  describe('타입 안전성', () => {
    it('반환 타입이 올바르게 정의되어야 함', () => {
      const mockUseCase = createMockGetByPageUseCase({
        success: true,
        data: mockImages,
      });

      const { result } = renderHook(() => useImageSearch(mockUseCase), {
        wrapper: createWrapper(),
      });

      // TypeScript 타입 체크
      const {
        images,
        isLoading,
        error,
        currentPage,
        search,
        goToPage,
      } = result.current;

      expect(typeof images).toBe('object'); // Image[]
      expect(typeof isLoading).toBe('boolean');
      expect(error === null || error instanceof Error).toBe(true);
      expect(typeof currentPage).toBe('number');
      expect(typeof search).toBe('function');
      expect(typeof goToPage).toBe('function');
    });
  });
});
