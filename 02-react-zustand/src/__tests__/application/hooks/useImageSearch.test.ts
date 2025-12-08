/**
 * useImageSearch Hook 테스트
 * Application Layer - Custom Hook
 *
 * Test 10: useImageSearch 훅 테스트
 */

import { renderHook, act } from '@testing-library/react';
import type { SearchImagesUseCase } from '@domain/usecases/SearchImagesUseCase';
import type { GetImagesByPageUseCase } from '@domain/usecases/GetImagesByPageUseCase';
import type { Image } from '@domain/entities/Image';
import type { Result } from '@domain/types';
import { createImageStore } from '@application/store/useImageStore';

// 테스트할 훅을 import
import { useImageSearch } from '@application/hooks/useImageSearch';

describe('useImageSearch - Custom Hook', () => {
  let mockSearchImagesUseCase: jest.Mocked<SearchImagesUseCase>;
  let mockGetImagesByPageUseCase: jest.Mocked<GetImagesByPageUseCase>;
  let useImageStore: ReturnType<typeof createImageStore>;

  const mockImages: Image[] = [
    {
      id: 1,
      tags: 'nature',
      previewURL: 'https://example.com/preview1.jpg',
      largeImageURL: 'https://example.com/large1.jpg',
      user: 'user1',
      likes: 100,
      views: 1000,
      downloads: 50,
    },
  ];

  beforeEach(() => {
    mockSearchImagesUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<SearchImagesUseCase>;

    mockGetImagesByPageUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetImagesByPageUseCase>;

    useImageStore = createImageStore(
      mockSearchImagesUseCase,
      mockGetImagesByPageUseCase,
    );

    // 타이머 모의
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('반환 타입 정의', () => {
    it('should return correct interface from hook', () => {
      // When: 훅을 렌더링
      const { result } = renderHook(() => useImageSearch(useImageStore));

      // Then: 올바른 인터페이스를 반환해야 함
      expect(result.current).toHaveProperty('images');
      expect(result.current).toHaveProperty('isLoading');
      expect(result.current).toHaveProperty('error');
      expect(result.current).toHaveProperty('search');
      expect(result.current).toHaveProperty('goToPage');
      expect(result.current).toHaveProperty('currentPage');
      expect(result.current).toHaveProperty('totalPages');
    });
  });

  describe('스토어와 연동', () => {
    it('should read state from store', () => {
      // When: 훅을 렌더링
      const { result } = renderHook(() => useImageSearch(useImageStore));

      // Then: 스토어의 초기 상태를 반환해야 함
      expect(result.current.images).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.currentPage).toBe(1);
    });

    it('should call store action when search is called', async () => {
      // Given: 성공 응답
      const successResult: Result<Image[]> = {
        success: true,
        data: mockImages,
      };
      mockSearchImagesUseCase.execute.mockResolvedValue(successResult);

      // When: 훅을 렌더링하고 search 호출
      const { result } = renderHook(() => useImageSearch(useImageStore));

      await act(async () => {
        result.current.search('nature');
        jest.runAllTimers(); // 디바운스 타이머 실행
      });

      // Then: 스토어 액션이 호출되어야 함
      expect(mockSearchImagesUseCase.execute).toHaveBeenCalledWith('nature');
      expect(result.current.images).toEqual(mockImages);
    });
  });

  describe('디바운스 구현', () => {
    it('should debounce search calls', async () => {
      // Given: 성공 응답
      const successResult: Result<Image[]> = {
        success: true,
        data: mockImages,
      };
      mockSearchImagesUseCase.execute.mockResolvedValue(successResult);

      const { result } = renderHook(() => useImageSearch(useImageStore));

      // When: 연속으로 search 호출
      act(() => {
        result.current.search('n');
      });
      act(() => {
        result.current.search('na');
      });
      act(() => {
        result.current.search('nat');
      });
      act(() => {
        result.current.search('nature');
      });

      // Then: 마지막 호출만 실행되어야 함 (디바운스)
      expect(mockSearchImagesUseCase.execute).not.toHaveBeenCalled();

      // 디바운스 타이머 완료
      await act(async () => {
        jest.runAllTimers();
      });

      // 마지막 검색어로만 한 번 호출되어야 함
      expect(mockSearchImagesUseCase.execute).toHaveBeenCalledTimes(1);
      expect(mockSearchImagesUseCase.execute).toHaveBeenCalledWith('nature');
    });

    it('should use configurable debounce delay', async () => {
      // Given: 커스텀 디바운스 delay (1000ms)
      const successResult: Result<Image[]> = {
        success: true,
        data: mockImages,
      };
      mockSearchImagesUseCase.execute.mockResolvedValue(successResult);

      const { result } = renderHook(() =>
        useImageSearch(useImageStore, 1000),
      );

      // When: search 호출
      act(() => {
        result.current.search('nature');
      });

      // 500ms 진행
      act(() => {
        jest.advanceTimersByTime(500);
      });

      // Then: 아직 호출되지 않아야 함
      expect(mockSearchImagesUseCase.execute).not.toHaveBeenCalled();

      // 추가 500ms 진행 (총 1000ms)
      await act(async () => {
        jest.advanceTimersByTime(500);
      });

      // 이제 호출되어야 함
      expect(mockSearchImagesUseCase.execute).toHaveBeenCalledWith('nature');
    });
  });

  describe('페이지 이동', () => {
    it('should call goToPage action', async () => {
      // Given: 성공 응답
      const successResult: Result<Image[]> = {
        success: true,
        data: mockImages,
      };
      mockGetImagesByPageUseCase.execute.mockResolvedValue(successResult);
      mockSearchImagesUseCase.execute.mockResolvedValue(successResult);

      const { result } = renderHook(() => useImageSearch(useImageStore));

      // 먼저 검색 실행
      await act(async () => {
        result.current.search('nature');
        jest.runAllTimers();
      });

      // When: goToPage 호출
      await act(async () => {
        await result.current.goToPage(2);
      });

      // Then: 스토어 액션이 호출되어야 함
      expect(mockGetImagesByPageUseCase.execute).toHaveBeenCalledWith(
        'nature',
        2,
      );
      expect(result.current.currentPage).toBe(2);
    });
  });
});
