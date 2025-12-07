/**
 * ImageRepository 인터페이스 테스트
 * Domain Layer - Repository 계약 정의
 */

import type { ImageRepository } from '@domain/repositories/ImageRepository';
import type { Result } from '@domain/types';
import type { Image } from '@domain/entities/Image';

describe('ImageRepository Interface', () => {
  describe('타입 정의', () => {
    it('should define ImageRepository interface with search method', () => {
      // Given: ImageRepository 인터페이스를 구현하는 Mock 객체
      const mockRepository: ImageRepository = {
        search: async (_query: string) => {
          return {
            success: true,
            data: [],
          } as Result<Image[]>;
        },
        getByPage: async (_query: string, _page: number) => {
          return {
            success: true,
            data: [],
          } as Result<Image[]>;
        },
      };

      // Then: 타입 체크가 통과해야 함
      expect(mockRepository.search).toBeDefined();
      expect(mockRepository.getByPage).toBeDefined();
    });
  });

  describe('Result 타입', () => {
    it('should support Success result type', () => {
      // Given: 성공 결과
      const successResult: Result<Image[]> = {
        success: true,
        data: [
          {
            id: 123,
            tags: 'test',
            previewURL: 'https://preview.jpg',
            largeImageURL: 'https://large.jpg',
            user: 'user',
            likes: 10,
            views: 100,
            downloads: 5,
          },
        ],
      };

      // Then: success가 true이고 data가 있어야 함
      expect(successResult.success).toBe(true);
      expect(successResult.data).toBeDefined();
      if (successResult.success) {
        expect(Array.isArray(successResult.data)).toBe(true);
      }
    });

    it('should support Failure result type', () => {
      // Given: 실패 결과
      const failureResult: Result<Image[]> = {
        success: false,
        error: new Error('API request failed'),
      };

      // Then: success가 false이고 error가 있어야 함
      expect(failureResult.success).toBe(false);
      if (!failureResult.success) {
        expect(failureResult.error).toBeInstanceOf(Error);
        expect(failureResult.error.message).toBe('API request failed');
      }
    });

    it('should use discriminated union for type narrowing with success', () => {
      // Given: 성공 Result 타입 값
      const successResult: Result<Image[]> = {
        success: true,
        data: [],
      };

      // When & Then: success 값으로 타입 좁히기
      if (successResult.success) {
        // success가 true일 때는 data 접근 가능
        expect(successResult.data).toBeDefined();
      }
    });

    it('should use discriminated union for type narrowing with failure', () => {
      // Given: 실패 Result 타입 값
      const failureResult: Result<Image[]> = {
        success: false,
        error: new Error('Test error'),
      };

      // When & Then: success 값으로 타입 좁히기
      if (!failureResult.success) {
        // success가 false일 때는 error 접근 가능
        expect(failureResult.error).toBeDefined();
      }
    });
  });

  describe('search 메서드 시그니처', () => {
    it('should accept query string and return Promise<Result<Image[]>>', async () => {
      // Given: 검색 쿼리
      const query = 'cats';

      // When: Mock Repository의 search 메서드 호출
      const mockRepository: ImageRepository = {
        search: async (_q: string) => ({
          success: true,
          data: [],
        }),
        getByPage: async () => ({ success: true, data: [] }),
      };

      const result = await mockRepository.search(query);

      // Then: Result 타입을 반환해야 함
      expect(result).toHaveProperty('success');
      if (result.success) {
        expect(Array.isArray(result.data)).toBe(true);
      }
    });
  });

  describe('getByPage 메서드 시그니처', () => {
    it('should accept query and page number, return Promise<Result<Image[]>>', async () => {
      // Given: 검색 쿼리와 페이지 번호
      const query = 'dogs';
      const page = 2;

      // When: Mock Repository의 getByPage 메서드 호출
      const mockRepository: ImageRepository = {
        search: async () => ({ success: true, data: [] }),
        getByPage: async (_q: string, _p: number) => ({
          success: true,
          data: [],
        }),
      };

      const result = await mockRepository.getByPage(query, page);

      // Then: Result 타입을 반환해야 함
      expect(result).toHaveProperty('success');
      if (result.success) {
        expect(Array.isArray(result.data)).toBe(true);
      }
    });
  });
});
