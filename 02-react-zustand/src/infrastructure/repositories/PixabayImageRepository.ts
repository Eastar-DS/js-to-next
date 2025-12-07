/**
 * PixabayImageRepository
 * ImageRepository 인터페이스 구현체
 * DataSource로부터 DTO를 받아 Mapper를 통해 Domain Entity로 변환합니다.
 */

import type { ImageRepository } from '@domain/repositories/ImageRepository';
import type { Result } from '@domain/types';
import type { Image } from '@domain/entities/Image';
import type { PixabayDataSource } from '@infrastructure/datasources/PixabayDataSource';
import { PixabayImageMapper } from '@infrastructure/mappers/PixabayImageMapper';

/**
 * Pixabay API를 사용하는 ImageRepository 구현체
 */
export class PixabayImageRepository implements ImageRepository {
  private readonly dataSource: PixabayDataSource;

  constructor(dataSource: PixabayDataSource) {
    this.dataSource = dataSource;
  }

  /**
   * 이미지 검색 (첫 페이지)
   * @param query - 검색 쿼리
   * @returns Promise<Result<Image[]>> - 검색 결과
   */
  async search(query: string): Promise<Result<Image[]>> {
    try {
      const dto = await this.dataSource.search(query);
      const entities = PixabayImageMapper.toEntities(dto.hits);

      return {
        success: true,
        data: entities,
      };
    } catch (error) {
      return {
        success: false,
        error: error as Error,
      };
    }
  }

  /**
   * 페이지별 이미지 조회
   * @param query - 검색 쿼리
   * @param page - 페이지 번호 (1부터 시작)
   * @returns Promise<Result<Image[]>> - 조회 결과
   */
  async getByPage(query: string, page: number): Promise<Result<Image[]>> {
    try {
      const dto = await this.dataSource.getByPage(query, page);
      const entities = PixabayImageMapper.toEntities(dto.hits);

      return {
        success: true,
        data: entities,
      };
    } catch (error) {
      return {
        success: false,
        error: error as Error,
      };
    }
  }
}
