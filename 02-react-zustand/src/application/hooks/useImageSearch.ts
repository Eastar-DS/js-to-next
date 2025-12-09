/**
 * useImageSearch Hook
 * Application Layer - Custom Hook for Image Search
 */

import { useCallback, useRef, useEffect } from 'react';
import type { Image } from '@domain/entities/Image';
import type { createImageStore } from '@application/store/useImageStore';

/**
 * useImageSearch 훅의 반환 타입
 */
export interface UseImageSearchReturn {
  images: Image[];
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  search: (query: string) => void;
  goToPage: (page: number) => Promise<void>;
}

/**
 * useImageSearch Custom Hook
 * 이미지 검색 기능을 제공하는 커스텀 훅
 *
 * @param useStore - Zustand 스토어 훅
 * @param debounceDelay - 디바운스 딜레이 (기본 300ms)
 * @returns 이미지 검색 인터페이스
 */
export function useImageSearch(
  useStore: ReturnType<typeof createImageStore>,
  debounceDelay: number = 300
): UseImageSearchReturn {
  // 스토어에서 상태 가져오기
  const images = useStore((state) => state.images);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);
  const currentPage = useStore((state) => state.currentPage);
  const totalPages = useStore((state) => state.totalPages);
  const query = useStore((state) => state.query);

  // 스토어 액션 가져오기
  const searchImages = useStore((state) => state.searchImages);
  const getImagesByPage = useStore((state) => state.getImagesByPage);

  // 디바운스 타이머 ref
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * 디바운스된 검색 함수
   */
  const search = useCallback(
    (searchQuery: string) => {
      // 기존 타이머 취소
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      // 새 타이머 설정
      debounceTimer.current = setTimeout(() => {
        searchImages(searchQuery);
      }, debounceDelay);
    },
    [searchImages, debounceDelay]
  );

  /**
   * 페이지 이동 함수
   */
  const goToPage = useCallback(
    async (page: number) => {
      await getImagesByPage(query, page);
    },
    [getImagesByPage, query]
  );

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(
    () => () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    },
    []
  );

  return {
    images,
    isLoading,
    error,
    currentPage,
    totalPages,
    search,
    goToPage,
  };
}
