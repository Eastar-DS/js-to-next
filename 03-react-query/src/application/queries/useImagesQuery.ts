/**
 * useImagesQuery Hook
 * Application Layer - React Query Hook for Image Search
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { SearchImagesUseCase } from '@domain/usecases/SearchImagesUseCase';
import type { Image } from '@domain/entities/Image';
import { imageKeys } from './queryKeys';

/**
 * 이미지 검색 Query Hook
 *
 * React Query의 useQuery를 사용하여 이미지 검색 기능을 제공합니다.
 * - 자동 캐싱
 * - 중복 요청 방지
 * - 로딩/에러 상태 관리
 * - 검색어 변경 시 자동 리페칭
 *
 * @param query - 검색어
 * @param searchImagesUseCase - 이미지 검색 UseCase
 * @returns React Query 결과 (data, isLoading, error 등)
 */
export const useImagesQuery = (
  query: string,
  searchImagesUseCase: SearchImagesUseCase
): UseQueryResult<Image[], Error> =>
  useQuery<Image[], Error>({
    // Query Key: 검색어가 바뀌면 새로운 쿼리로 인식
    queryKey: imageKeys.list(query),

    // Query Function: UseCase를 호출하여 데이터 가져오기
    queryFn: async () => {
      // UseCase 실행
      const result = await searchImagesUseCase.execute(query);

      // Result 타입 처리: success 분기
      if (result.success) {
        return result.data; // Image[] 반환
      }

      // 에러인 경우 throw
      throw result.error;
    },

    // 옵션: 빈 검색어면 쿼리 실행 안 함
    enabled: query.trim().length > 0,

    // 기타 옵션 (QueryClient 기본값 사용)
    // staleTime: 5분 (QueryClient 설정)
    // gcTime: 10분 (QueryClient 설정)
    // retry: 1 (QueryClient 설정)
  });
