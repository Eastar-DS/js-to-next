/**
 * 도메인 공통 타입 정의
 */

/**
 * Result 타입: 성공/실패를 나타내는 Discriminated Union
 *
 * @template T - 성공 시 반환할 데이터 타입
 *
 * @example
 * // 성공 케이스
 * const success: Result<string> = {
 *   success: true,
 *   data: "Hello"
 * };
 *
 * // 실패 케이스
 * const failure: Result<string> = {
 *   success: false,
 *   error: new Error("Failed")
 * };
 */
export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: Error };

/**
 * 비동기 상태를 표현하는 공통 타입
 * 로딩, 에러, 데이터를 함께 관리
 *
 * @template T - 데이터 타입
 *
 * @example
 * const imageState: AsyncState<Image[]> = {
 *   data: [],
 *   isLoading: false,
 *   error: null
 * };
 */
export interface AsyncState<T> {
  /** 데이터 */
  data: T;
  /** 로딩 중 여부 */
  isLoading: boolean;
  /** 에러 (없으면 null) */
  error: Error | null;
}

/**
 * 페이지네이션 상태를 표현하는 공통 타입
 *
 * @example
 * const pagination: PaginationState = {
 *   currentPage: 1,
 *   totalPages: 10
 * };
 */
export interface PaginationState {
  /** 현재 페이지 번호 (1부터 시작) */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
}

/**
 * Nullable 타입 유틸리티
 * null이 될 수 있는 타입
 *
 * @template T - 원본 타입
 */
export type Nullable<T> = T | null;

/**
 * Optional 타입 유틸리티
 * undefined가 될 수 있는 타입
 *
 * @template T - 원본 타입
 */
export type Optional<T> = T | undefined;

/**
 * ID 타입 (숫자 또는 문자열)
 * 엔티티 식별자로 사용
 */
export type ID = number | string;

/**
 * 타임스탬프 타입 (Unix timestamp in milliseconds)
 */
export type Timestamp = number;
