/**
 * GetImagesByPageUseCase 테스트
 * Domain Layer - 페이지별 이미지 조회 비즈니스 로직
 */

import { GetImagesByPageUseCase } from '@domain/usecases/GetImagesByPageUseCase';
import type { ImageRepository } from '@domain/repositories/ImageRepository';
import type { Result } from '@domain/types';
import type { Image } from '@domain/entities/Image';

describe('GetImagesByPageUseCase', () => {
  describe('클래스 정의', () => {
    it('should be instantiable with ImageRepository', () => {
      // Given: Mock Repository
      const mockRepository: ImageRepository = {
        search: async () => ({ success: true, data: [] }),
        getByPage: async (_query: string, _page: number) => ({
          success: true,
          data: [],
        }),
      };

      // When: UseCase 인스턴스 생성
      const useCase = new GetImagesByPageUseCase(mockRepository);

      // Then: 인스턴스가 생성되어야 함
      expect(useCase).toBeInstanceOf(GetImagesByPageUseCase);
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
          tags: 'dog',
          previewURL: 'https://preview.jpg',
          largeImageURL: 'https://large.jpg',
          user: 'user1',
          likes: 20,
          views: 200,
          downloads: 10,
        },
      ];

      const mockRepository: ImageRepository = {
        search: async () => ({ success: true, data: [] }),
        getByPage: async (_query: string, _page: number) => ({
          success: true,
          data: mockImages,
        }),
      };

      const useCase = new GetImagesByPageUseCase(mockRepository);

      // When: UseCase 실행
      const result = await useCase.execute('dogs', 2);

      // Then: 성공 결과 반환
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(mockImages);
        expect(result.data).toHaveLength(1);
      }
    });

    it('should return failure result when repository fails', async () => {
      // Given: 실패하는 Mock Repository
      const mockError = new Error('Page not found');
      const mockRepository: ImageRepository = {
        search: async () => ({ success: true, data: [] }),
        getByPage: async (_query: string, _page: number) => ({
          success: false,
          error: mockError,
        }),
      };

      const useCase = new GetImagesByPageUseCase(mockRepository);

      // When: UseCase 실행
      const result = await useCase.execute('dogs', 2);

      // Then: 실패 결과 반환
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe(mockError);
        expect(result.error.message).toBe('Page not found');
      }
    });

    it('should pass query and page parameters to repository', async () => {
      // Given: Repository spy
      const getByPageSpy = jest.fn(
        async (_query: string, _page: number): Promise<Result<Image[]>> => ({
          success: true,
          data: [],
        })
      );

      const mockRepository: ImageRepository = {
        search: async () => ({ success: true, data: [] }),
        getByPage: getByPageSpy,
      };

      const useCase = new GetImagesByPageUseCase(mockRepository);

      // When: 특정 쿼리와 페이지로 UseCase 실행
      await useCase.execute('cats', 3);

      // Then: Repository의 getByPage가 같은 파라미터로 호출되어야 함
      expect(getByPageSpy).toHaveBeenCalledWith('cats', 3);
      expect(getByPageSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle page 1 correctly', async () => {
      // Given: Repository spy
      const getByPageSpy = jest.fn(
        async (_query: string, _page: number): Promise<Result<Image[]>> => ({
          success: true,
          data: [],
        })
      );

      const mockRepository: ImageRepository = {
        search: async () => ({ success: true, data: [] }),
        getByPage: getByPageSpy,
      };

      const useCase = new GetImagesByPageUseCase(mockRepository);

      // When: 첫 페이지로 검색
      await useCase.execute('birds', 1);

      // Then: Repository가 page=1로 호출되어야 함
      expect(getByPageSpy).toHaveBeenCalledWith('birds', 1);
    });
  });

  describe('타입 안전성', () => {
    it('should enforce Result<Image[]> return type', async () => {
      // Given: Mock Repository
      const mockRepository: ImageRepository = {
        search: async () => ({ success: true, data: [] }),
        getByPage: async (_query: string, _page: number) => ({
          success: true,
          data: [],
        }),
      };

      const useCase = new GetImagesByPageUseCase(mockRepository);

      // When: UseCase 실행
      const result: Result<Image[]> = await useCase.execute('cats', 1);

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
