/**
 * Query Key 팩토리
 * Application Layer - React Query Query Keys
 *
 * React Query의 Query Key를 타입 안전하게 생성하는 팩토리 함수들입니다.
 * Query Key는 캐시 식별자로 사용되며, 배열의 각 요소가 변경되면 새로운 쿼리로 간주됩니다.
 */

/**
 * 이미지 Query Key 팩토리
 *
 * Query Key 계층 구조:
 * - ['images'] - 모든 이미지 쿼리의 베이스
 * - ['images', 'list', { query }] - 특정 검색어의 이미지 목록
 * - ['images', 'page', { query, page }] - 특정 검색어와 페이지
 */
export const imageKeys = {
  /**
   * 모든 이미지 쿼리의 베이스 키
   */
  all: ['images'] as const,

  /**
   * 특정 검색어의 이미지 목록 키
   * @param query - 검색어
   */
  list: (query: string) => ['images', 'list', { query }] as const,

  /**
   * 특정 검색어와 페이지의 키
   * @param query - 검색어
   * @param page - 페이지 번호
   */
  page: (query: string, page: number) =>
    ['images', 'page', { query, page }] as const,
};
