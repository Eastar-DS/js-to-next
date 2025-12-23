/**
 * usePrefetch Hook
 * Application Layer - Prefetching Hook for Next Page
 */

import { useQueryClient } from '@tanstack/react-query';
import { imageKeys } from '@application/queries/queryKeys';
import type { GetImagesByPageUseCase } from '@domain/usecases/GetImagesByPageUseCase';

/**
 * usePrefetch 반환 타입
 */
export interface UsePrefetchReturn {
  prefetchNextPage: (query: string, currentPage: number, totalPages?: number) => void;
}

/**
 * Prefetch 커스텀 훅
 *
 * 다음 페이지를 미리 로드하여 사용자 경험을 개선합니다.
 * - queryClient.prefetchQuery 사용
 * - 현재 페이지 + 1 미리 로드
 * - 빈 검색어나 마지막 페이지는 prefetch 안 함
 *
 * @param getImagesByPageUseCase - 페이지별 이미지 검색 UseCase
 * @returns UsePrefetchReturn 객체
 */
export const usePrefetch = (
  getImagesByPageUseCase: GetImagesByPageUseCase
): UsePrefetchReturn => {
  const queryClient = useQueryClient();

  /**
   * 다음 페이지 prefetch 함수
   *
   * 백그라운드에서 비동기로 실행됩니다 (await 사용 안 함).
   * 메인 스레드를 블로킹하지 않고 즉시 반환합니다.
   *
   * @param query - 검색어
   * @param currentPage - 현재 페이지
   * @param totalPages - 전체 페이지 수 (선택적, 기본값 5)
   */
  const prefetchNextPage = (
    query: string,
    currentPage: number,
    totalPages: number = 5
  ): void => {
    // 빈 검색어면 prefetch 안 함
    if (query.trim().length === 0) {
      return;
    }

    const nextPage = currentPage + 1;

    // 다음 페이지가 totalPages를 초과하면 prefetch 안 함
    if (nextPage > totalPages) {
      return;
    }

    // 다음 페이지 prefetch (백그라운드 실행, await 사용 안 함)
    queryClient.prefetchQuery({
      queryKey: imageKeys.page(query, nextPage),
      queryFn: async () => {
        const result = await getImagesByPageUseCase.execute(query, nextPage);

        if (result.success) {
          return result.data;
        }

        throw result.error;
      },
      staleTime: 5 * 60 * 1000, // 5분
    });
    // 즉시 반환, prefetch는 백그라운드에서 계속 실행됨
  };

  return {
    prefetchNextPage,
  };
};
