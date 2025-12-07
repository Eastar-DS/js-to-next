/**
 * PixabayDto 테스트
 * Infrastructure Layer - API 응답 DTO 타입 정의
 */

import type {
  PixabayImageDto,
  PixabayApiResponseDto,
} from '@infrastructure/datasources/dto/PixabayDto';
import {
  isPixabayImageDto,
  isPixabayApiResponseDto,
} from '@infrastructure/datasources/dto/PixabayDto';

describe('PixabayDto Types', () => {
  describe('PixabayImageDto', () => {
    it('should define PixabayImageDto type with all required fields', () => {
      // Given: Pixabay API가 반환하는 이미지 객체 구조
      const dto: PixabayImageDto = {
        id: 123456,
        tags: 'cat, animal, pet',
        previewURL: 'https://pixabay.com/preview.jpg',
        largeImageURL: 'https://pixabay.com/large.jpg',
        user: 'photographer123',
        likes: 100,
        views: 1000,
        downloads: 50,
      };

      // Then: 타입이 올바르게 정의되어야 함
      expect(dto.id).toBe(123456);
      expect(dto.tags).toBe('cat, animal, pet');
      expect(dto.previewURL).toBe('https://pixabay.com/preview.jpg');
      expect(dto.largeImageURL).toBe('https://pixabay.com/large.jpg');
      expect(dto.user).toBe('photographer123');
      expect(dto.likes).toBe(100);
      expect(dto.views).toBe(1000);
      expect(dto.downloads).toBe(50);
    });

    it('should validate valid PixabayImageDto with type guard', () => {
      // Given: 올바른 DTO 객체
      const validDto = {
        id: 123,
        tags: 'nature',
        previewURL: 'https://preview.jpg',
        largeImageURL: 'https://large.jpg',
        user: 'user1',
        likes: 10,
        views: 100,
        downloads: 5,
      };

      // When: 타입 가드 함수 호출
      const isValid = isPixabayImageDto(validDto);

      // Then: true를 반환해야 함
      expect(isValid).toBe(true);
    });

    it('should reject invalid PixabayImageDto with type guard - missing fields', () => {
      // Given: 필수 필드가 누락된 객체
      const invalidDto = {
        id: 123,
        tags: 'nature',
        // previewURL 누락
        largeImageURL: 'https://large.jpg',
      };

      // When: 타입 가드 함수 호출
      const isValid = isPixabayImageDto(invalidDto);

      // Then: false를 반환해야 함
      expect(isValid).toBe(false);
    });

    it('should reject invalid PixabayImageDto with type guard - wrong types', () => {
      // Given: 잘못된 타입의 필드를 가진 객체
      const invalidDto = {
        id: '123', // number여야 하는데 string
        tags: 'nature',
        previewURL: 'https://preview.jpg',
        largeImageURL: 'https://large.jpg',
        user: 'user1',
        likes: 10,
        views: 100,
        downloads: 5,
      };

      // When: 타입 가드 함수 호출
      const isValid = isPixabayImageDto(invalidDto);

      // Then: false를 반환해야 함
      expect(isValid).toBe(false);
    });
  });

  describe('PixabayApiResponseDto', () => {
    it('should define PixabayApiResponseDto type with required fields', () => {
      // Given: Pixabay API 전체 응답 구조
      const responseDto: PixabayApiResponseDto = {
        total: 500,
        totalHits: 500,
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
        ],
      };

      // Then: 타입이 올바르게 정의되어야 함
      expect(responseDto.total).toBe(500);
      expect(responseDto.totalHits).toBe(500);
      expect(responseDto.hits).toHaveLength(2);
      expect(responseDto.hits[0].id).toBe(1);
    });

    it('should validate valid PixabayApiResponseDto with type guard', () => {
      // Given: 올바른 응답 DTO
      const validResponse = {
        total: 100,
        totalHits: 100,
        hits: [
          {
            id: 1,
            tags: 'nature',
            previewURL: 'https://preview.jpg',
            largeImageURL: 'https://large.jpg',
            user: 'user1',
            likes: 10,
            views: 100,
            downloads: 5,
          },
        ],
      };

      // When: 타입 가드 함수 호출
      const isValid = isPixabayApiResponseDto(validResponse);

      // Then: true를 반환해야 함
      expect(isValid).toBe(true);
    });

    it('should reject invalid PixabayApiResponseDto - missing total', () => {
      // Given: total 필드가 누락된 응답
      const invalidResponse = {
        // total 누락
        totalHits: 100,
        hits: [],
      };

      // When: 타입 가드 함수 호출
      const isValid = isPixabayApiResponseDto(invalidResponse);

      // Then: false를 반환해야 함
      expect(isValid).toBe(false);
    });

    it('should reject invalid PixabayApiResponseDto - invalid hits array', () => {
      // Given: hits 배열이 잘못된 응답
      const invalidResponse = {
        total: 100,
        totalHits: 100,
        hits: [
          {
            id: 1,
            // tags 누락
            previewURL: 'https://preview.jpg',
          },
        ],
      };

      // When: 타입 가드 함수 호출
      const isValid = isPixabayApiResponseDto(invalidResponse);

      // Then: false를 반환해야 함
      expect(isValid).toBe(false);
    });

    it('should handle empty hits array', () => {
      // Given: hits가 빈 배열인 응답
      const emptyResponse: PixabayApiResponseDto = {
        total: 0,
        totalHits: 0,
        hits: [],
      };

      // When: 타입 가드 함수 호출
      const isValid = isPixabayApiResponseDto(emptyResponse);

      // Then: true를 반환해야 함 (빈 배열도 유효함)
      expect(isValid).toBe(true);
      expect(emptyResponse.hits).toHaveLength(0);
    });
  });
});
