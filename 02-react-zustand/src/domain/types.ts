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
