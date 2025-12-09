/**
 * PixabayImageRepository 테스트
 * Infrastructure Layer - Repository 구현체 (DTO → Entity 변환)
 */

import { PixabayImageRepository } from '@infrastructure/repositories/PixabayImageRepository';
import type { PixabayDataSource } from '@infrastructure/datasources/PixabayDataSource';
import type { PixabayApiResponseDto } from '@infrastructure/datasources/dto/PixabayDto';
import type { ImageRepository } from '@domain/repositories/ImageRepository';
import type { Image } from '@domain/entities/Image';

describe('PixabayImageRepository', () => {
  describe('클래스 정의', () => {
    it('should implement ImageRepository interface', () => {
      // Given: Mock DataSource
      const mockDataSource: PixabayDataSource = {
        search: jest.fn(),
        getByPage: jest.fn(),
      } as unknown as PixabayDataSource;

      // When: Repository 인스턴스 생성
      const repository: ImageRepository = new PixabayImageRepository(
        mockDataSource
      );

      // Then: ImageRepository 인터페이스를 구현해야 함
      expect(repository).toBeDefined();
      expect(repository.search).toBeDefined();
      expect(typeof repository.search).toBe('function');
      expect(repository.getByPage).toBeDefined();
      expect(typeof repository.getByPage).toBe('function');
    });
  });

  describe('search 메서드', () => {
    it('should return success result with converted entities', async () => {
      // Given: DTO를 반환하는 Mock DataSource
      const mockDto: PixabayApiResponseDto = {
        total: 100,
        totalHits: 100,
        hits: [
          {
            id: 1,
            tags: 'cat, animal, pet',
            previewURL: 'https://preview1.jpg',
            largeImageURL: 'https://large1.jpg',
            user: 'user1',
            likes: 10,
            views: 100,
            downloads: 5,
          },
          {
            id: 2,
            tags: 'dog, animal',
            previewURL: 'https://preview2.jpg',
            largeImageURL: 'https://large2.jpg',
            user: 'user2',
            likes: 20,
            views: 200,
            downloads: 10,
          },
        ],
      };

      const mockDataSource: PixabayDataSource = {
        search: jest.fn().mockResolvedValue(mockDto),
        getByPage: jest.fn(),
      } as unknown as PixabayDataSource;

      const repository = new PixabayImageRepository(mockDataSource);

      // When: search 메서드 호출
      const result = await repository.search('cats');

      // Then: DataSource의 search가 호출되어야 함
      expect(mockDataSource.search).toHaveBeenCalledWith('cats');
      expect(mockDataSource.search).toHaveBeenCalledTimes(1);

      // Then: Success Result를 반환해야 함
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toHaveLength(2);

        // Then: DTO가 Domain Entity로 변환되어야 함
        const firstImage: Image = result.data[0];
        expect(firstImage.id).toBe(1);
        expect(firstImage.tags).toBe('cat, animal, pet');
        expect(firstImage.previewURL).toBe('https://preview1.jpg');
        expect(firstImage.largeImageURL).toBe('https://large1.jpg');
        expect(firstImage.user).toBe('user1');
        expect(firstImage.likes).toBe(10);
        expect(firstImage.views).toBe(100);
        expect(firstImage.downloads).toBe(5);
      }
    });

    it('should return success result with empty array when no hits', async () => {
      // Given: 빈 결과를 반환하는 Mock DataSource
      const mockDto: PixabayApiResponseDto = {
        total: 0,
        totalHits: 0,
        hits: [],
      };

      const mockDataSource: PixabayDataSource = {
        search: jest.fn().mockResolvedValue(mockDto),
        getByPage: jest.fn(),
      } as unknown as PixabayDataSource;

      const repository = new PixabayImageRepository(mockDataSource);

      // When: search 메서드 호출
      const result = await repository.search('nonexistent');

      // Then: 빈 배열을 반환해야 함
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual([]);
        expect(result.data).toHaveLength(0);
      }
    });

    it('should return failure result when DataSource throws error', async () => {
      // Given: 에러를 throw하는 Mock DataSource
      const mockError = new Error('Network error');
      const mockDataSource: PixabayDataSource = {
        search: jest.fn().mockRejectedValue(mockError),
        getByPage: jest.fn(),
      } as unknown as PixabayDataSource;

      const repository = new PixabayImageRepository(mockDataSource);

      // When: search 메서드 호출
      const result = await repository.search('cats');

      // Then: Failure Result를 반환해야 함
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe(mockError);
        expect(result.error.message).toBe('Network error');
      }
    });

    it('should handle DTO with invalid entity data gracefully', async () => {
      // Given: 잘못된 데이터를 포함한 DTO
      const mockDto: PixabayApiResponseDto = {
        total: 1,
        totalHits: 1,
        hits: [
          {
            id: 1,
            tags: 'cat',
            previewURL: 'https://preview.jpg',
            largeImageURL: 'https://large.jpg',
            user: 'user1',
            likes: 10,
            views: 100,
            downloads: 5,
          },
        ],
      };

      const mockDataSource: PixabayDataSource = {
        search: jest.fn().mockResolvedValue(mockDto),
        getByPage: jest.fn(),
      } as unknown as PixabayDataSource;

      const repository = new PixabayImageRepository(mockDataSource);

      // When: search 메서드 호출
      const result = await repository.search('cats');

      // Then: 변환이 성공해야 함
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toHaveLength(1);
      }
    });
  });

  describe('getByPage 메서드', () => {
    it('should call DataSource.getByPage with correct parameters', async () => {
      // Given: Mock DataSource
      const mockDto: PixabayApiResponseDto = {
        total: 500,
        totalHits: 500,
        hits: [
          {
            id: 3,
            tags: 'nature',
            previewURL: 'https://preview3.jpg',
            largeImageURL: 'https://large3.jpg',
            user: 'user3',
            likes: 30,
            views: 300,
            downloads: 15,
          },
        ],
      };

      const mockDataSource: PixabayDataSource = {
        search: jest.fn(),
        getByPage: jest.fn().mockResolvedValue(mockDto),
      } as unknown as PixabayDataSource;

      const repository = new PixabayImageRepository(mockDataSource);

      // When: getByPage 메서드 호출
      const result = await repository.getByPage('nature', 2);

      // Then: DataSource의 getByPage가 올바른 파라미터로 호출되어야 함
      expect(mockDataSource.getByPage).toHaveBeenCalledWith('nature', 2);
      expect(mockDataSource.getByPage).toHaveBeenCalledTimes(1);

      // Then: Success Result를 반환해야 함
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toHaveLength(1);
        expect(result.data[0].id).toBe(3);
      }
    });

    it('should return failure result when DataSource fails', async () => {
      // Given: 에러를 throw하는 Mock DataSource
      const mockError = new Error('Page not found');
      const mockDataSource: PixabayDataSource = {
        search: jest.fn(),
        getByPage: jest.fn().mockRejectedValue(mockError),
      } as unknown as PixabayDataSource;

      const repository = new PixabayImageRepository(mockDataSource);

      // When: getByPage 메서드 호출
      const result = await repository.getByPage('test', 999);

      // Then: Failure Result를 반환해야 함
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe(mockError);
        expect(result.error.message).toBe('Page not found');
      }
    });
  });

  describe('DTO to Entity 변환', () => {
    it('should correctly map all DTO fields to Entity fields', async () => {
      // Given: 모든 필드를 가진 DTO
      const mockDto: PixabayApiResponseDto = {
        total: 1,
        totalHits: 1,
        hits: [
          {
            id: 12345,
            tags: 'sunset, beach, ocean',
            previewURL: 'https://pixabay.com/preview/12345.jpg',
            largeImageURL: 'https://pixabay.com/large/12345.jpg',
            user: 'photographer_pro',
            likes: 999,
            views: 10000,
            downloads: 500,
          },
        ],
      };

      const mockDataSource: PixabayDataSource = {
        search: jest.fn().mockResolvedValue(mockDto),
        getByPage: jest.fn(),
      } as unknown as PixabayDataSource;

      const repository = new PixabayImageRepository(mockDataSource);

      // When: search 호출하여 변환 수행
      const result = await repository.search('sunset');

      // Then: 모든 필드가 정확히 매핑되어야 함
      expect(result.success).toBe(true);
      if (result.success) {
        const entity = result.data[0];
        expect(entity.id).toBe(12345);
        expect(entity.tags).toBe('sunset, beach, ocean');
        expect(entity.previewURL).toBe('https://pixabay.com/preview/12345.jpg');
        expect(entity.largeImageURL).toBe(
          'https://pixabay.com/large/12345.jpg'
        );
        expect(entity.user).toBe('photographer_pro');
        expect(entity.likes).toBe(999);
        expect(entity.views).toBe(10000);
        expect(entity.downloads).toBe(500);
      }
    });

    it('should convert multiple DTOs to multiple Entities', async () => {
      // Given: 여러 개의 DTO
      const mockDto: PixabayApiResponseDto = {
        total: 3,
        totalHits: 3,
        hits: [
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
        ],
      };

      const mockDataSource: PixabayDataSource = {
        search: jest.fn().mockResolvedValue(mockDto),
        getByPage: jest.fn(),
      } as unknown as PixabayDataSource;

      const repository = new PixabayImageRepository(mockDataSource);

      // When: search 호출
      const result = await repository.search('animals');

      // Then: 모든 DTO가 Entity로 변환되어야 함
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toHaveLength(3);
        expect(result.data[0].id).toBe(1);
        expect(result.data[1].id).toBe(2);
        expect(result.data[2].id).toBe(3);
      }
    });
  });
});
