/**
 * useImageSearch Hook
 * Application Layer - Custom Hook for Image Search with React Query
 * Phase 3.8: Prefetching 추가
 */

import { useState, useEffect } from 'react';
import { useImagesByPageQuery } from '@application/queries/useImagesByPageQuery';
import { usePrefetch } from '@application/hooks/usePrefetch';
import type { GetImagesByPageUseCase } from '@domain/usecases/GetImagesByPageUseCase';
import type { Image } from '@domain/entities/Image';

/**
 * useImageSearch 반환 타입
 */
export interface UseImageSearchReturn {
  images: Image[];
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  search: (query: string) => void;
  goToPage: (page: number) => void;
}

/**
 * 이미지 검색 커스텀 훅
 *
 * React Query를 사용한 이미지 검색 로직을 캡슐화합니다.
 * - query, page 상태 관리
 * - useImagesByPageQuery 훅 사용
 * - search, goToPage 함수 제공
 * - 자동 prefetch로 다음 페이지 미리 로드
 *
 * @param getImagesByPageUseCase - 페이지별 이미지 검색 UseCase
 * @returns UseImageSearchReturn 객체
 */
export const useImageSearch = (
  getImagesByPageUseCase: GetImagesByPageUseCase
): UseImageSearchReturn => {
  // 검색어 및 페이지 상태
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  // React Query 훅 사용
  const { data: images = [], isLoading, error } = useImagesByPageQuery(
    query,
    page,
    getImagesByPageUseCase
  );

  // Prefetch 훅 사용
  const { prefetchNextPage } = usePrefetch(getImagesByPageUseCase);

  // 페이지나 검색어가 변경되면 다음 페이지 prefetch
  useEffect(() => {
    if (query && images.length > 0 && !isLoading) {
      // 다음 페이지 prefetch (totalPages는 5로 고정)
      prefetchNextPage(query, page, 5);
    }
  }, [query, page, images.length, isLoading, prefetchNextPage]);

  /**
   * 검색 함수
   * 새 검색 시 페이지를 1로 리셋
   */
  const search = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  /**
   * 페이지 변경 함수
   */
  const goToPage = (newPage: number) => {
    setPage(newPage);
  };

  return {
    images,
    isLoading,
    error,
    currentPage: page,
    search,
    goToPage,
  };
};
