/**
 * Query Options
 * Application Layer - React Query 공통 옵션 및 상수
 */

import type { UseQueryOptions } from '@tanstack/react-query';
import type { Image } from '@domain/entities/Image';

/**
 * 이미지 쿼리 기본 옵션
 *
 * 모든 이미지 관련 쿼리에서 공통으로 사용하는 옵션
 */
export const IMAGE_QUERY_OPTIONS = {
  /**
   * staleTime: 데이터가 "신선한" 상태로 유지되는 시간
   * 5분 동안은 캐시에서 바로 반환, 백그라운드 refetch 없음
   */
  staleTime: 5 * 60 * 1000, // 5분

  /**
   * gcTime (Garbage Collection Time): 캐시 유지 시간
   * 10분 동안 사용하지 않으면 메모리에서 제거
   */
  gcTime: 10 * 60 * 1000, // 10분

  /**
   * retry: 실패 시 재시도 횟수
   * 네트워크 오류 시 1회 재시도
   */
  retry: 1,
} as const;

/**
 * 기본 이미지 Query 옵션 타입
 */
export type BaseImageQueryOptions = Pick<
  UseQueryOptions<Image[], Error>,
  'staleTime' | 'gcTime' | 'retry'
>;
