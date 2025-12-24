/**
 * Query Utils
 * Application Layer - React Query 유틸리티 함수
 */

import type { Result } from '@domain/types';
import type { Image } from '@domain/entities/Image';

/**
 * Result 타입을 React Query용으로 변환하는 유틸리티
 *
 * UseCase의 Result<T>를 React Query의 Promise<T>로 변환합니다.
 * - success: 데이터 반환
 * - failure: 에러 throw
 *
 * @param result - UseCase 실행 결과
 * @returns 성공 시 데이터, 실패 시 에러 throw
 *
 * @example
 * ```typescript
 * queryFn: async () => {
 *   const result = await useCase.execute();
 *   return handleQueryResult(result);
 * }
 * ```
 */
export const handleQueryResult = <T>(result: Result<T>): T => {
  if (result.success) {
    return result.data;
  }

  throw result.error;
};

/**
 * 이미지 검색 Result를 React Query용으로 변환
 *
 * handleQueryResult의 타입 특화 버전
 */
export const handleImageQueryResult = (result: Result<Image[]>): Image[] => {
  return handleQueryResult(result);
};
