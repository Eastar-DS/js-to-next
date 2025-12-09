/**
 * SearchImagesUseCase
 * 이미지 검색 비즈니스 로직을 담당하는 UseCase
 */

import type { ImageRepository } from '@domain/repositories/ImageRepository';
import type { Result } from '@domain/types';
import type { Image } from '@domain/entities/Image';

/**
 * 이미지 검색 UseCase
 * Repository를 통해 이미지를 검색하는 비즈니스 로직을 담당합니다.
 */
export class SearchImagesUseCase {
  private readonly repository: ImageRepository;

  constructor(repository: ImageRepository) {
    this.repository = repository;
  }

  /**
   * 이미지 검색 실행
   * @param query - 검색 쿼리 문자열
   * @returns Promise<Result<Image[]>> - 검색 결과
   */
  async execute(query: string): Promise<Result<Image[]>> {
    return this.repository.search(query);
  }
}
