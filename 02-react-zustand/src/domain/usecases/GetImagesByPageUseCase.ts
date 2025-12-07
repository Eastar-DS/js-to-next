/**
 * GetImagesByPageUseCase
 * 페이지별 이미지 조회 비즈니스 로직을 담당하는 UseCase
 */

import type { ImageRepository } from '@domain/repositories/ImageRepository';
import type { Result } from '@domain/types';
import type { Image } from '@domain/entities/Image';

/**
 * 페이지별 이미지 조회 UseCase
 * Repository를 통해 특정 페이지의 이미지를 조회하는 비즈니스 로직을 담당합니다.
 */
export class GetImagesByPageUseCase {
  private readonly repository: ImageRepository;

  constructor(repository: ImageRepository) {
    this.repository = repository;
  }

  /**
   * 페이지별 이미지 조회 실행
   * @param query - 검색 쿼리 문자열
   * @param page - 페이지 번호 (1부터 시작)
   * @returns Promise<Result<Image[]>> - 조회 결과
   */
  async execute(query: string, page: number): Promise<Result<Image[]>> {
    return this.repository.getByPage(query, page);
  }
}
