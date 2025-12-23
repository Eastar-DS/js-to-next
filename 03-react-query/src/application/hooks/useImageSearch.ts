/**
 * useImageSearch Hook
 * Application Layer - Custom Hook for Image Search with React Query
 */

import { useState } from 'react';
import { useImagesByPageQuery } from '@application/queries/useImagesByPageQuery';
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
