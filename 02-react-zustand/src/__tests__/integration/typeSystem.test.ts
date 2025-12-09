/**
 * 타입 시스템 통합 검증 테스트
 * Test 19: 레이어 간 타입 일관성 및 타입 안전성 검증
 */

import type { Image } from '@domain/entities/Image';
import type { Result } from '@domain/types';
import type { ImageRepository } from '@domain/repositories/ImageRepository';
import { SearchImagesUseCase } from '@domain/usecases/SearchImagesUseCase';
import { GetImagesByPageUseCase } from '@domain/usecases/GetImagesByPageUseCase';
import type { ImageGridProps } from '@presentation/components/types';

describe('타입 시스템 통합 검증', () => {
  describe('레이어 간 타입 일관성', () => {
    it('Domain 엔티티가 Presentation 컴포넌트로 전달될 때 타입이 일치해야 한다', () => {
      // Domain Layer의 Image 타입
      const domainImage: Image = {
        id: 1,
        previewURL: 'https://example.com/preview.jpg',
        largeImageURL: 'https://example.com/large.jpg',
        tags: 'nature',
        views: 100,
        downloads: 50,
        likes: 25,
        user: 'testuser',
      };

      // Presentation Layer의 ImageGridProps 타입
      const images: Image[] = [domainImage];
      const props: ImageGridProps = {
        images,
        isLoading: false,
        error: null,
      };

      // 타입 일치 검증
      expect(props.images[0]).toEqual(domainImage);
      expect(props.images[0].id).toBe(1);
      expect(props.images[0].tags).toBe('nature');
    });

    it('Repository Result 타입이 UseCase를 거쳐 올바르게 전달되어야 한다', async () => {
      // Mock Repository
      const mockRepository: ImageRepository = {
        search: jest.fn().mockResolvedValue({
          success: true,
          data: [
            {
              id: 1,
              previewURL: 'https://example.com/1.jpg',
              largeImageURL: 'https://example.com/1-large.jpg',
              tags: 'test',
              views: 100,
              downloads: 50,
              likes: 25,
              user: 'user1',
            },
          ],
        } as Result<Image[]>),
        getByPage: jest.fn(),
      };

      // UseCase 실행
      const useCase = new SearchImagesUseCase(mockRepository);
      const result = await useCase.execute('test');

      // Result 타입 검증
      expect(result.success).toBe(true);
      if (result.success) {
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data[0].id).toBe(1);
      }
    });

    it('에러 타입이 모든 레이어를 통해 일관되게 전달되어야 한다', async () => {
      const errorMessage = 'API 호출 실패';

      // Mock Repository (실패 케이스)
      const mockRepository: ImageRepository = {
        search: jest.fn().mockResolvedValue({
          success: false,
          error: new Error(errorMessage),
        } as Result<Image[]>),
        getByPage: jest.fn(),
      };

      // UseCase 실행
      const useCase = new SearchImagesUseCase(mockRepository);
      const result = await useCase.execute('test');

      // Error 타입 검증
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(Error);
        expect(result.error.message).toBe(errorMessage);
      }

      // Presentation Layer 타입 검증
      const props: ImageGridProps = {
        images: [],
        isLoading: false,
        error: result.success ? null : result.error,
      };

      expect(props.error).toBeInstanceOf(Error);
      expect(props.error?.message).toBe(errorMessage);
    });
  });

  describe('타입 안전성 엔드투엔드', () => {
    it('검색 플로우의 전체 타입 체인이 유효해야 한다', async () => {
      // 1. Repository Layer (Infrastructure)
      const mockRepository: ImageRepository = {
        search: jest.fn().mockResolvedValue({
          success: true,
          data: [
            {
              id: 1,
              previewURL: 'https://example.com/1.jpg',
              largeImageURL: 'https://example.com/1-large.jpg',
              tags: 'mountain, nature',
              views: 1000,
              downloads: 500,
              likes: 250,
              user: 'photographer1',
            },
            {
              id: 2,
              previewURL: 'https://example.com/2.jpg',
              largeImageURL: 'https://example.com/2-large.jpg',
              tags: 'ocean, beach',
              views: 2000,
              downloads: 1000,
              likes: 500,
              user: 'photographer2',
            },
          ],
        } as Result<Image[]>),
        getByPage: jest.fn(),
      };

      // 2. UseCase Layer (Domain)
      const searchUseCase = new SearchImagesUseCase(mockRepository);
      const searchResult = await searchUseCase.execute('nature');

      // 3. Result 타입 검증
      expect(searchResult.success).toBe(true);
      if (!searchResult.success) {
        throw new Error('Expected success result');
      }

      // 4. Image[] 타입 검증
      const images: Image[] = searchResult.data;
      expect(images).toHaveLength(2);
      expect(images[0].id).toBe(1);
      expect(images[0].tags).toBe('mountain, nature');

      // 5. Presentation Layer 타입 검증
      const gridProps: ImageGridProps = {
        images,
        isLoading: false,
        error: null,
      };

      expect(gridProps.images).toHaveLength(2);
      expect(gridProps.images[0].previewURL).toBe('https://example.com/1.jpg');
      expect(gridProps.images[1].user).toBe('photographer2');
    });

    it('페이지네이션 플로우의 전체 타입 체인이 유효해야 한다', async () => {
      // 1. Repository Layer
      const mockRepository: ImageRepository = {
        search: jest.fn(),
        getByPage: jest.fn().mockResolvedValue({
          success: true,
          data: [
            {
              id: 21,
              previewURL: 'https://example.com/21.jpg',
              largeImageURL: 'https://example.com/21-large.jpg',
              tags: 'city',
              views: 500,
              downloads: 100,
              likes: 50,
              user: 'cityPhotographer',
            },
          ],
        } as Result<Image[]>),
      };

      // 2. UseCase Layer
      const getByPageUseCase = new GetImagesByPageUseCase(mockRepository);
      const pageResult = await getByPageUseCase.execute('nature', 2);

      // 3. Result 타입 검증
      expect(pageResult.success).toBe(true);
      if (!pageResult.success) {
        throw new Error('Expected success result');
      }

      // 4. Image[] 타입 검증
      const images: Image[] = pageResult.data;
      expect(images).toHaveLength(1);
      expect(images[0].id).toBe(21);

      // 5. Presentation Layer 타입 검증
      const gridProps: ImageGridProps = {
        images,
        isLoading: false,
        error: null,
      };

      expect(gridProps.images[0].tags).toBe('city');
    });

    it('타입 좁히기(Type Narrowing)가 올바르게 작동해야 한다', async () => {
      const mockRepository: ImageRepository = {
        search: jest.fn().mockResolvedValue({
          success: false,
          error: new Error('Network error'),
        } as Result<Image[]>),
        getByPage: jest.fn(),
      };

      const useCase = new SearchImagesUseCase(mockRepository);
      const result = await useCase.execute('test');

      // Result 타입 좁히기
      if (result.success) {
        // success === true일 때는 data 속성 접근 가능
        const images: Image[] = result.data;
        expect(images).toBeDefined();
      } else {
        // success === false일 때는 error 속성 접근 가능
        const error: Error = result.error;
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Network error');
      }

      // ImageGridProps 타입 좁히기
      const props: ImageGridProps = {
        images: result.success ? result.data : [],
        isLoading: false,
        error: result.success ? null : result.error,
      };

      expect(props.images).toEqual([]);
      expect(props.error).toBeInstanceOf(Error);
    });
  });

  describe('타입 제약 검증', () => {
    it('Image 엔티티는 필수 속성을 모두 가져야 한다', () => {
      const validImage: Image = {
        id: 1,
        previewURL: 'https://example.com/preview.jpg',
        largeImageURL: 'https://example.com/large.jpg',
        tags: 'test',
        views: 100,
        downloads: 50,
        likes: 25,
        user: 'testuser',
      };

      // 모든 필수 속성 검증
      expect(validImage.id).toBeDefined();
      expect(validImage.previewURL).toBeDefined();
      expect(validImage.largeImageURL).toBeDefined();
      expect(validImage.tags).toBeDefined();
      expect(validImage.views).toBeDefined();
      expect(validImage.downloads).toBeDefined();
      expect(validImage.likes).toBeDefined();
      expect(validImage.user).toBeDefined();
    });

    it('Result 타입은 Discriminated Union으로 동작해야 한다', () => {
      // Success 케이스
      const successResult: Result<string> = {
        success: true,
        data: 'test data',
      };

      expect(successResult.success).toBe(true);
      if (successResult.success) {
        expect(successResult.data).toBe('test data');
      }

      // Failure 케이스
      const failureResult: Result<string> = {
        success: false,
        error: new Error('test error'),
      };

      expect(failureResult.success).toBe(false);
      if (!failureResult.success) {
        expect(failureResult.error.message).toBe('test error');
      }
    });

    it('컴포넌트 Props는 타입 안전하게 전달되어야 한다', () => {
      const images: Image[] = [
        {
          id: 1,
          previewURL: 'https://example.com/1.jpg',
          largeImageURL: 'https://example.com/1-large.jpg',
          tags: 'test',
          views: 100,
          downloads: 50,
          likes: 25,
          user: 'user1',
        },
      ];

      const props: ImageGridProps = {
        images,
        isLoading: false,
        error: null,
      };

      // Props 타입 검증
      expect(Array.isArray(props.images)).toBe(true);
      expect(typeof props.isLoading).toBe('boolean');
      expect(props.error).toBeNull();
    });
  });
});
