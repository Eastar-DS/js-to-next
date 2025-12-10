/**
 * QueryClient 설정
 * Application Layer - React Query 설정
 */

import { QueryClient } from '@tanstack/react-query';

/**
 * QueryClient 생성 팩토리 함수
 * React Query의 기본 동작을 설정합니다.
 *
 * @returns QueryClient 인스턴스
 */
export const createQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5분 - 데이터가 stale로 간주되기까지의 시간
        gcTime: 10 * 60 * 1000, // 10분 - 캐시에서 데이터가 제거되기까지의 시간
        retry: 1, // 실패 시 재시도 횟수
        refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 리페칭 비활성화
      },
    },
  });
