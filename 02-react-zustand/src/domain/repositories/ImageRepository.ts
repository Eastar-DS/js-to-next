/**
 * ImageRepository 인터페이스
 * Domain Layer - 이미지 데이터 접근을 위한 Repository 계약
 */

import type { Image } from '@domain/entities/Image';
import type { Result } from '@domain/types';

/**
 * ImageRepository 인터페이스
 *
 * 이미지 검색과 페이지네이션을 위한 Repository 계약을 정의합니다.
 * Infrastructure Layer에서 이 인터페이스를 구현하여 실제 API 호출을 처리합니다.
 */
export interface ImageRepository {
  /**
   * 이미지 검색
   * @param query - 검색 쿼리 문자열
   * @returns Promise<Result<Image[]>> - 성공 시 이미지 배열, 실패 시 에러
   */
  search(query: string): Promise<Result<Image[]>>;

  /**
   * 페이지별 이미지 검색
   * @param query - 검색 쿼리 문자열
   * @param page - 페이지 번호 (1부터 시작)
   * @returns Promise<Result<Image[]>> - 성공 시 이미지 배열, 실패 시 에러
   */
  getByPage(query: string, page: number): Promise<Result<Image[]>>;
}
