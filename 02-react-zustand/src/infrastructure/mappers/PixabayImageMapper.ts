/**
 * PixabayImageMapper
 * DTO와 Domain Entity 간의 변환을 담당하는 Mapper
 */

import type { Image } from '@domain/entities/Image';
import type { PixabayImageDto } from '@infrastructure/datasources/dto/PixabayDto';

/**
 * Pixabay API DTO를 Domain Entity로 변환하는 Mapper 클래스
 */
export class PixabayImageMapper {
  /**
   * DTO를 Domain Entity로 변환
   * @param dto - PixabayImageDto
   * @returns Image - Domain Entity
   */
  static toEntity(dto: PixabayImageDto): Image {
    return {
      id: dto.id,
      tags: dto.tags,
      previewURL: dto.previewURL,
      largeImageURL: dto.largeImageURL,
      user: dto.user,
      likes: dto.likes,
      views: dto.views,
      downloads: dto.downloads,
    };
  }

  /**
   * DTO 배열을 Domain Entity 배열로 변환
   * @param dtos - PixabayImageDto[]
   * @returns Image[] - Domain Entity 배열
   */
  static toEntities(dtos: PixabayImageDto[]): Image[] {
    return dtos.map((dto) => this.toEntity(dto));
  }

  /**
   * Domain Entity를 DTO로 변환 (필요시 사용)
   * 현재 프로젝트에서는 사용하지 않지만, 양방향 변환이 필요한 경우를 대비
   * @param entity - Image
   * @returns PixabayImageDto
   */
  static toDto(entity: Image): PixabayImageDto {
    return {
      id: entity.id,
      tags: entity.tags,
      previewURL: entity.previewURL,
      largeImageURL: entity.largeImageURL,
      user: entity.user,
      likes: entity.likes,
      views: entity.views,
      downloads: entity.downloads,
    };
  }
}
