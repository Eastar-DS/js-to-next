/**
 * SearchImagesUseCase 테스트
 * Domain Layer - 이미지 검색 비즈니스 로직
 */

import { SearchImagesUseCase } from '@domain/usecases/SearchImagesUseCase';
import type { ImageRepository } from '@domain/repositories/ImageRepository';
import type { Result } from '@domain/types';
import type { Image } from '@domain/entities/Image';

describe('SearchImagesUseCase', () => {
  describe('클래스 정의', () => {
    it('should be instantiable with ImageRepository', () => {
      // Given: Mock Repository
      const mockRepository: ImageRepository = {
        search: async (_query: string) => ({
          success: true,
          data: [],
        }),
        getByPage: async () => ({ success: true, data: [] }),
      };

      // When: UseCase 인스턴스 생성
      const useCase = new SearchImagesUseCase(mockRepository);

      // Then: 인스턴스가 생성되어야 함
      expect(useCase).toBeInstanceOf(SearchImagesUseCase);
      expect(useCase.execute).toBeDefined();
      expect(typeof useCase.execute).toBe('function');
    });
  });

  describe('execute 메서드', () => {
    it('should return success result when repository returns data', async () => {
      // Given: 성공하는 Mock Repository
      const mockImages: Image[] = [
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
      ];

      const mockRepository: ImageRepository = {
        search: async (_query: string) => ({
          success: true,
          data: mockImages,
        }),
        getByPage: async () => ({ success: true, data: [] }),
      };

      const useCase = new SearchImagesUseCase(mockRepository);

      // When: UseCase 실행
      const result = await useCase.execute('cats');

      // Then: 성공 결과 반환
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(mockImages);
        expect(result.data).toHaveLength(1);
      }
    });

    it('should return failure result when repository fails', async () => {
      // Given: 실패하는 Mock Repository
      const mockError = new Error('Network error');
      const mockRepository: ImageRepository = {
        search: async (_query: string) => ({
          success: false,
          error: mockError,
        }),
        getByPage: async () => ({ success: true, data: [] }),
      };

      const useCase = new SearchImagesUseCase(mockRepository);

      // When: UseCase 실행
      const result = await useCase.execute('cats');

      // Then: 실패 결과 반환
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe(mockError);
        expect(result.error.message).toBe('Network error');
      }
    });

    it('should pass query parameter to repository', async () => {
      // Given: Repository spy
      const searchSpy = jest.fn(
        async (_query: string): Promise<Result<Image[]>> => ({
          success: true,
          data: [],
        })
      );

      const mockRepository: ImageRepository = {
        search: searchSpy,
        getByPage: async () => ({ success: true, data: [] }),
      };

      const useCase = new SearchImagesUseCase(mockRepository);

      // When: 특정 쿼리로 UseCase 실행
      await useCase.execute('dogs');

      // Then: Repository의 search가 같은 쿼리로 호출되어야 함
      expect(searchSpy).toHaveBeenCalledWith('dogs');
      expect(searchSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle empty query string', async () => {
      // Given: Mock Repository
      const mockRepository: ImageRepository = {
        search: jest.fn(
          async (_query: string): Promise<Result<Image[]>> => ({
            success: true,
            data: [],
          })
        ),
        getByPage: async () => ({ success: true, data: [] }),
      };

      const useCase = new SearchImagesUseCase(mockRepository);

      // When: 빈 문자열로 검색
      await useCase.execute('');

      // Then: Repository가 빈 문자열로 호출되어야 함
      expect(mockRepository.search).toHaveBeenCalledWith('');
    });
  });

  describe('타입 안전성', () => {
    it('should enforce Result<Image[]> return type', async () => {
      // Given: Mock Repository
      const mockRepository: ImageRepository = {
        search: async (_query: string) => ({
          success: true,
          data: [],
        }),
        getByPage: async () => ({ success: true, data: [] }),
      };

      const useCase = new SearchImagesUseCase(mockRepository);

      // When: UseCase 실행
      const result: Result<Image[]> = await useCase.execute('cats');

      // Then: Result 타입이어야 함
      expect(result).toHaveProperty('success');
      if (result.success) {
        expect(Array.isArray(result.data)).toBe(true);
      } else {
        expect(result.error).toBeInstanceOf(Error);
      }
    });
  });
});
