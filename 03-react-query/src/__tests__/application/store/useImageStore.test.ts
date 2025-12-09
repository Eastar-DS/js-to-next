/**
 * useImageStore 테스트
 * Application Layer - Zustand Store Implementation
 *
 * Test 9: Zustand 스토어 구현 테스트
 */

import { renderHook, act } from '@testing-library/react';
import type { SearchImagesUseCase } from '@domain/usecases/SearchImagesUseCase';
import type { GetImagesByPageUseCase } from '@domain/usecases/GetImagesByPageUseCase';
import type { Image } from '@domain/entities/Image';
import type { Result } from '@domain/types';

// 스토어를 임포트
import { createImageStore } from '@application/store/useImageStore';

describe('useImageStore - Zustand 스토어 구현', () => {
  // 모의 UseCases
  let mockSearchImagesUseCase: jest.Mocked<SearchImagesUseCase>;
  let mockGetImagesByPageUseCase: jest.Mocked<GetImagesByPageUseCase>;
  let useImageStore: ReturnType<typeof createImageStore>;

  // 테스트용 이미지 데이터
  const mockImages: Image[] = [
    {
      id: 1,
      tags: 'nature, landscape',
      previewURL: 'https://example.com/preview1.jpg',
      largeImageURL: 'https://example.com/large1.jpg',
      user: 'user1',
      likes: 100,
      views: 1000,
      downloads: 50,
    },
    {
      id: 2,
      tags: 'technology, computer',
      previewURL: 'https://example.com/preview2.jpg',
      largeImageURL: 'https://example.com/large2.jpg',
      user: 'user2',
      likes: 200,
      views: 2000,
      downloads: 100,
    },
  ];

  beforeEach(() => {
    // SearchImagesUseCase 모의 객체 생성
    mockSearchImagesUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<SearchImagesUseCase>;

    // GetImagesByPageUseCase 모의 객체 생성
    mockGetImagesByPageUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetImagesByPageUseCase>;

    // UseCase를 주입하여 스토어 생성
    useImageStore = createImageStore(
      mockSearchImagesUseCase,
      mockGetImagesByPageUseCase
    );
  });

  describe('초기 상태', () => {
    it('should have correct initial state', () => {
      // When: 스토어를 렌더링
      const { result } = renderHook(() => useImageStore());

      // Then: 초기 상태가 올바르게 설정되어야 함
      expect(result.current.images).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.currentPage).toBe(1);
      expect(result.current.totalPages).toBe(0);
      expect(result.current.query).toBe('');
    });
  });

  describe('searchImages 액션', () => {
    it('should update images on successful search', async () => {
      // Given: 성공 응답을 반환하는 UseCase
      const successResult: Result<Image[]> = {
        success: true,
        data: mockImages,
      };
      mockSearchImagesUseCase.execute.mockResolvedValue(successResult);

      // When: 스토어를 렌더링하고 searchImages 호출
      const { result } = renderHook(() => useImageStore());

      await act(async () => {
        await result.current.searchImages('nature');
      });

      // Then: 상태가 업데이트되어야 함
      expect(result.current.images).toEqual(mockImages);
      expect(result.current.query).toBe('nature');
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(mockSearchImagesUseCase.execute).toHaveBeenCalledWith('nature');
    });

    it('should set error on failed search', async () => {
      // Given: 실패 응답
      const errorResult: Result<Image[]> = {
        success: false,
        error: new Error('Search failed'),
      };
      mockSearchImagesUseCase.execute.mockResolvedValue(errorResult);

      // When: 스토어를 렌더링하고 searchImages 호출
      const { result } = renderHook(() => useImageStore());

      await act(async () => {
        await result.current.searchImages('test');
      });

      // Then: 에러가 설정되어야 함
      expect(result.current.error?.message).toBe('Search failed');
      expect(result.current.images).toEqual([]);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('getImagesByPage 액션', () => {
    it('should update current page and images', async () => {
      // Given: 성공 응답
      const successResult: Result<Image[]> = {
        success: true,
        data: mockImages,
      };
      mockGetImagesByPageUseCase.execute.mockResolvedValue(successResult);

      // When: 스토어를 렌더링하고 getImagesByPage 호출
      const { result } = renderHook(() => useImageStore());

      await act(async () => {
        await result.current.getImagesByPage('nature', 2);
      });

      // Then: 상태가 업데이트되어야 함
      expect(result.current.images).toEqual(mockImages);
      expect(result.current.currentPage).toBe(2);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(mockGetImagesByPageUseCase.execute).toHaveBeenCalledWith(
        'nature',
        2
      );
    });

    it('should handle page change errors', async () => {
      // Given: 실패 응답
      const errorResult: Result<Image[]> = {
        success: false,
        error: new Error('Page fetch failed'),
      };
      mockGetImagesByPageUseCase.execute.mockResolvedValue(errorResult);

      // When: 스토어를 렌더링하고 getImagesByPage 호출
      const { result } = renderHook(() => useImageStore());

      await act(async () => {
        await result.current.getImagesByPage('test', 2);
      });

      // Then: 에러가 설정되어야 함
      expect(result.current.error?.message).toBe('Page fetch failed');
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('resetStore 액션', () => {
    it('should reset store to initial state', async () => {
      // Given: 스토어에 데이터가 있는 상태
      const successResult: Result<Image[]> = {
        success: true,
        data: mockImages,
      };
      mockSearchImagesUseCase.execute.mockResolvedValue(successResult);

      const { result } = renderHook(() => useImageStore());

      await act(async () => {
        await result.current.searchImages('nature');
      });

      // When: resetStore 호출
      act(() => {
        result.current.resetStore();
      });

      // Then: 초기 상태로 리셋되어야 함
      expect(result.current.images).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.currentPage).toBe(1);
      expect(result.current.totalPages).toBe(0);
      expect(result.current.query).toBe('');
    });
  });
});
