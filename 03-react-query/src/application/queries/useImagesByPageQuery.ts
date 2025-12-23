/**
 * useImagesByPageQuery Hook
 * Application Layer - React Query Hook for Paginated Image Search
 */

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { GetImagesByPageUseCase } from '@domain/usecases/GetImagesByPageUseCase';
import type { Image } from '@domain/entities/Image';
import { imageKeys } from './queryKeys';

/**
 * 페이지네이션 이미지 검색 Query Hook
 *
 * React Query의 useQuery를 사용하여 페이지별 이미지 검색 기능을 제공합니다.
 * - Query Key에 page 포함 (페이지별 캐싱)
 * - placeholderData로 페이지 전환 시 부드러운 UX
 * - 자동 캐싱 및 동기화
 *
 * @param query - 검색어
 * @param page - 페이지 번호
 * @param getImagesByPageUseCase - 페이지별 이미지 검색 UseCase
 * @returns React Query 결과 (data, isLoading, error 등)
 */
export const useImagesByPageQuery = (
  query: string,
  page: number,
  getImagesByPageUseCase: GetImagesByPageUseCase
): UseQueryResult<Image[], Error> =>
  useQuery<Image[], Error>({
    // Query Key: 검색어와 페이지가 바뀌면 새로운 쿼리로 인식
    queryKey: imageKeys.page(query, page),

    // Query Function: UseCase를 호출하여 데이터 가져오기
    queryFn: async () => {
      // UseCase 실행
      const result = await getImagesByPageUseCase.execute(query, page);

      // Result 타입 처리: success 분기
      if (result.success) {
        return result.data; // Image[] 반환
      }

      // 에러인 경우 throw
      throw result.error;
    },

    // 옵션: 빈 검색어면 쿼리 실행 안 함
    enabled: query.trim().length > 0,

    // placeholderData: 페이지 전환 시 이전 데이터 유지하며 새 데이터 로드
    // React Query v5에서는 keepPreviousData 함수 사용
    placeholderData: keepPreviousData,

    // 기타 옵션 (QueryClient 기본값 사용)
    // staleTime: 5분 (QueryClient 설정)
    // gcTime: 10분 (QueryClient 설정)
    // retry: 1 (QueryClient 설정)
  });
