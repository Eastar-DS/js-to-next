/**
 * useImagesQuery 훅 테스트
 * Application Layer - React Query Hook
 */

import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useImagesQuery } from '@application/queries/useImagesQuery';
import type { SearchImagesUseCase } from '@domain/usecases/SearchImagesUseCase';
import type { Image } from '@domain/entities/Image';

// Mock UseCase
const createMockSearchUseCase = (
  result: { success: boolean; data?: Image[]; error?: Error }
): SearchImagesUseCase =>
  ({
    execute: jest.fn().mockResolvedValue(result),
  }) as unknown as SearchImagesUseCase;

// Test Wrapper
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // 테스트에서는 재시도 비활성화
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 10 * 60 * 1000, // 10분
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useImagesQuery', () => {
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

  describe('성공 케이스', () => {
    it('검색어로 이미지를 성공적으로 가져와야 함', async () => {
      const mockUseCase = createMockSearchUseCase({
        success: true,
        data: mockImages,
      });

      const { result } = renderHook(() => useImagesQuery('cats', mockUseCase), {
        wrapper: createWrapper(),
      });

      // 초기 로딩 상태
      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();

      // 데이터 로드 완료 대기
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // 결과 확인
      expect(result.current.data).toEqual(mockImages);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(mockUseCase.execute).toHaveBeenCalledWith('cats');
    });

    it('빈 검색어면 쿼리를 실행하지 않아야 함 (enabled: false)', async () => {
      const mockUseCase = createMockSearchUseCase({
        success: true,
        data: mockImages,
      });

      const { result } = renderHook(() => useImagesQuery('', mockUseCase), {
        wrapper: createWrapper(),
      });

      // 쿼리가 실행되지 않음
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(mockUseCase.execute).not.toHaveBeenCalled();
    });

    it('검색어가 변경되면 새로운 쿼리를 실행해야 함', async () => {
      const mockUseCase = createMockSearchUseCase({
        success: true,
        data: mockImages,
      });

      const { result, rerender } = renderHook(
        ({ query }) => useImagesQuery(query, mockUseCase),
        {
          wrapper: createWrapper(),
          initialProps: { query: 'cats' },
        }
      );

      // 첫 번째 검색 완료 대기
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockUseCase.execute).toHaveBeenCalledWith('cats');
      expect(mockUseCase.execute).toHaveBeenCalledTimes(1);

      // 검색어 변경
      rerender({ query: 'dogs' });

      await waitFor(() => {
        expect(mockUseCase.execute).toHaveBeenCalledWith('dogs');
      });

      expect(mockUseCase.execute).toHaveBeenCalledTimes(2);
    });
  });

  describe('실패 케이스', () => {
    it('UseCase에서 에러를 반환하면 에러 상태가 되어야 함', async () => {
      const mockError = new Error('API 호출 실패');
      const mockUseCase = createMockSearchUseCase({
        success: false,
        error: mockError,
      });

      const { result } = renderHook(() => useImagesQuery('cats', mockUseCase), {
        wrapper: createWrapper(),
      });

      // 에러 상태 대기
      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      // 결과 확인
      expect(result.current.error).toEqual(mockError);
      expect(result.current.data).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
    });

    it('네트워크 에러 처리가 되어야 함', async () => {
      const networkError = new Error('Network Error');
      const mockUseCase = createMockSearchUseCase({
        success: false,
        error: networkError,
      });

      const { result } = renderHook(() => useImagesQuery('cats', mockUseCase), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error?.message).toBe('Network Error');
    });
  });

  describe('타입 안전성', () => {
    it('반환 데이터 타입이 Image[] 이어야 함', async () => {
      const mockUseCase = createMockSearchUseCase({
        success: true,
        data: mockImages,
      });

      const { result } = renderHook(() => useImagesQuery('cats', mockUseCase), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // TypeScript 타입 체크 (컴파일 타임)
      const data: Image[] | undefined = result.current.data;
      expect(data).toEqual(mockImages);
    });

    it('에러 타입이 Error 이어야 함', async () => {
      const mockError = new Error('Test Error');
      const mockUseCase = createMockSearchUseCase({
        success: false,
        error: mockError,
      });

      const { result } = renderHook(() => useImagesQuery('cats', mockUseCase), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      // TypeScript 타입 체크
      const error: Error | null = result.current.error;
      expect(error).toEqual(mockError);
    });
  });

  describe('캐싱 동작', () => {
    it('같은 검색어로 두 번 호출하면 캐시를 사용해야 함', async () => {
      const mockUseCase = createMockSearchUseCase({
        success: true,
        data: mockImages,
      });

      const wrapper = createWrapper();

      // 첫 번째 훅
      const { result: result1 } = renderHook(
        () => useImagesQuery('cats', mockUseCase),
        { wrapper }
      );

      await waitFor(() => {
        expect(result1.current.isSuccess).toBe(true);
      });

      expect(mockUseCase.execute).toHaveBeenCalledTimes(1);

      // 두 번째 훅 (같은 QueryClient)
      const { result: result2 } = renderHook(
        () => useImagesQuery('cats', mockUseCase),
        { wrapper }
      );

      // 즉시 데이터 사용 가능 (캐시에서)
      expect(result2.current.data).toEqual(mockImages);

      // UseCase는 한 번만 호출됨
      expect(mockUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });
});
