/**
 * PixabayImageMapper 테스트
 * Infrastructure Layer - DTO ↔ Entity 변환 로직
 */

import { PixabayImageMapper } from '@infrastructure/mappers/PixabayImageMapper';
import type { PixabayImageDto } from '@infrastructure/datasources/dto/PixabayDto';
import type { Image } from '@domain/entities/Image';

describe('PixabayImageMapper', () => {
  describe('toEntity', () => {
    it('should convert DTO to Domain Entity correctly', () => {
      // Given: PixabayImageDto
      const dto: PixabayImageDto = {
        id: 12345,
        tags: 'sunset, beach, ocean',
        previewURL: 'https://pixabay.com/preview/12345.jpg',
        largeImageURL: 'https://pixabay.com/large/12345.jpg',
        user: 'photographer_pro',
        likes: 999,
        views: 10000,
        downloads: 500,
      };

      // When: DTO를 Entity로 변환
      const entity: Image = PixabayImageMapper.toEntity(dto);

      // Then: 모든 필드가 정확히 매핑되어야 함
      expect(entity.id).toBe(12345);
      expect(entity.tags).toBe('sunset, beach, ocean');
      expect(entity.previewURL).toBe('https://pixabay.com/preview/12345.jpg');
      expect(entity.largeImageURL).toBe('https://pixabay.com/large/12345.jpg');
      expect(entity.user).toBe('photographer_pro');
      expect(entity.likes).toBe(999);
      expect(entity.views).toBe(10000);
      expect(entity.downloads).toBe(500);
    });

    it('should handle minimal DTO data', () => {
      // Given: 최소 데이터를 가진 DTO
      const dto: PixabayImageDto = {
        id: 1,
        tags: '',
        previewURL: 'https://preview.jpg',
        largeImageURL: 'https://large.jpg',
        user: 'user',
        likes: 0,
        views: 0,
        downloads: 0,
      };

      // When: 변환
      const entity = PixabayImageMapper.toEntity(dto);

      // Then: 변환이 성공해야 함
      expect(entity.id).toBe(1);
      expect(entity.tags).toBe('');
      expect(entity.likes).toBe(0);
    });

    it('should preserve all numeric values including zero', () => {
      // Given: 0 값을 가진 DTO
      const dto: PixabayImageDto = {
        id: 0,
        tags: 'test',
        previewURL: 'https://preview.jpg',
        largeImageURL: 'https://large.jpg',
        user: 'user',
        likes: 0,
        views: 0,
        downloads: 0,
      };

      // When: 변환
      const entity = PixabayImageMapper.toEntity(dto);

      // Then: 0 값이 보존되어야 함
      expect(entity.id).toBe(0);
      expect(entity.likes).toBe(0);
      expect(entity.views).toBe(0);
      expect(entity.downloads).toBe(0);
    });
  });

  describe('toEntities', () => {
    it('should convert multiple DTOs to Entities', () => {
      // Given: DTO 배열
      const dtos: PixabayImageDto[] = [
        {
          id: 1,
          tags: 'cat',
          previewURL: 'https://preview1.jpg',
          largeImageURL: 'https://large1.jpg',
          user: 'user1',
          likes: 10,
          views: 100,
          downloads: 5,
        },
        {
          id: 2,
          tags: 'dog',
          previewURL: 'https://preview2.jpg',
          largeImageURL: 'https://large2.jpg',
          user: 'user2',
          likes: 20,
          views: 200,
          downloads: 10,
        },
        {
          id: 3,
          tags: 'bird',
          previewURL: 'https://preview3.jpg',
          largeImageURL: 'https://large3.jpg',
          user: 'user3',
          likes: 30,
          views: 300,
          downloads: 15,
        },
      ];

      // When: 배열 변환
      const entities = PixabayImageMapper.toEntities(dtos);

      // Then: 모든 DTO가 Entity로 변환되어야 함
      expect(entities).toHaveLength(3);
      expect(entities[0].id).toBe(1);
      expect(entities[1].id).toBe(2);
      expect(entities[2].id).toBe(3);
    });

    it('should handle empty array', () => {
      // Given: 빈 배열
      const dtos: PixabayImageDto[] = [];

      // When: 변환
      const entities = PixabayImageMapper.toEntities(dtos);

      // Then: 빈 배열을 반환해야 함
      expect(entities).toEqual([]);
      expect(entities).toHaveLength(0);
    });

    it('should handle single item array', () => {
      // Given: 단일 아이템 배열
      const dtos: PixabayImageDto[] = [
        {
          id: 1,
          tags: 'test',
          previewURL: 'https://preview.jpg',
          largeImageURL: 'https://large.jpg',
          user: 'user',
          likes: 10,
          views: 100,
          downloads: 5,
        },
      ];

      // When: 변환
      const entities = PixabayImageMapper.toEntities(dtos);

      // Then: 단일 Entity 배열을 반환해야 함
      expect(entities).toHaveLength(1);
      expect(entities[0].id).toBe(1);
    });
  });

  describe('toDto (양방향 변환)', () => {
    it('should convert Entity to DTO correctly', () => {
      // Given: Domain Entity
      const entity: Image = {
        id: 12345,
        tags: 'sunset, beach',
        previewURL: 'https://preview.jpg',
        largeImageURL: 'https://large.jpg',
        user: 'photographer',
        likes: 999,
        views: 10000,
        downloads: 500,
      };

      // When: Entity를 DTO로 변환
      const dto = PixabayImageMapper.toDto(entity);

      // Then: 모든 필드가 정확히 매핑되어야 함
      expect(dto.id).toBe(12345);
      expect(dto.tags).toBe('sunset, beach');
      expect(dto.previewURL).toBe('https://preview.jpg');
      expect(dto.largeImageURL).toBe('https://large.jpg');
      expect(dto.user).toBe('photographer');
      expect(dto.likes).toBe(999);
      expect(dto.views).toBe(10000);
      expect(dto.downloads).toBe(500);
    });
  });

  describe('양방향 변환 일관성', () => {
    it('should maintain data consistency in round-trip conversion', () => {
      // Given: 원본 DTO
      const originalDto: PixabayImageDto = {
        id: 999,
        tags: 'test, data',
        previewURL: 'https://preview.jpg',
        largeImageURL: 'https://large.jpg',
        user: 'testuser',
        likes: 100,
        views: 1000,
        downloads: 50,
      };

      // When: DTO → Entity → DTO 변환
      const entity = PixabayImageMapper.toEntity(originalDto);
      const convertedDto = PixabayImageMapper.toDto(entity);

      // Then: 원본과 변환된 DTO가 동일해야 함
      expect(convertedDto).toEqual(originalDto);
    });
  });
});
