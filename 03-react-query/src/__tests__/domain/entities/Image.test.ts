/**
 * Image 엔티티 테스트
 * Domain Layer - 비즈니스 로직의 핵심 엔티티
 */

import { isImage, createImage } from '@domain/entities/Image';
import type { Image } from '@domain/entities/Image';

describe('Image Entity', () => {
  describe('Image 인터페이스', () => {
    it('should define valid Image type', () => {
      // Given: Pixabay API 응답과 유사한 이미지 데이터
      const validImage: Image = {
        id: 123456,
        tags: 'cat, animal, pet',
        previewURL: 'https://pixabay.com/get/preview.jpg',
        largeImageURL: 'https://pixabay.com/get/large.jpg',
        user: 'photographer',
        likes: 100,
        views: 1000,
        downloads: 50,
      };

      // Then: TypeScript 컴파일러가 타입을 인식해야 함
      expect(validImage.id).toBe(123456);
      expect(validImage.tags).toBe('cat, animal, pet');
    });
  });

  describe('isImage 타입 가드', () => {
    it('should return true for valid Image object', () => {
      // Given: 유효한 이미지 객체
      const validImage = {
        id: 123456,
        tags: 'cat, animal, pet',
        previewURL: 'https://pixabay.com/get/preview.jpg',
        largeImageURL: 'https://pixabay.com/get/large.jpg',
        user: 'photographer',
        likes: 100,
        views: 1000,
        downloads: 50,
      };

      // When & Then: 타입 가드가 true를 반환해야 함
      expect(isImage(validImage)).toBe(true);
    });

    it('should return false for invalid object (missing required fields)', () => {
      // Given: 필수 필드가 누락된 객체
      const invalidImage = {
        id: 123456,
        tags: 'cat, animal, pet',
        // previewURL 누락
        largeImageURL: 'https://pixabay.com/get/large.jpg',
      };

      // When & Then: 타입 가드가 false를 반환해야 함
      expect(isImage(invalidImage)).toBe(false);
    });

    it('should return false for null or undefined', () => {
      expect(isImage(null)).toBe(false);
      expect(isImage(undefined)).toBe(false);
    });

    it('should return false for non-object types', () => {
      expect(isImage('string')).toBe(false);
      expect(isImage(123)).toBe(false);
      expect(isImage(true)).toBe(false);
    });
  });

  describe('createImage 팩토리 함수', () => {
    it('should create Image entity from valid data', () => {
      // Given: 유효한 데이터
      const data = {
        id: 123456,
        tags: 'cat, animal, pet',
        previewURL: 'https://pixabay.com/get/preview.jpg',
        largeImageURL: 'https://pixabay.com/get/large.jpg',
        user: 'photographer',
        likes: 100,
        views: 1000,
        downloads: 50,
      };

      // When: 팩토리 함수로 이미지 생성
      const image = createImage(data);

      // Then: 유효한 Image 엔티티가 생성되어야 함
      expect(image).toEqual(data);
      expect(isImage(image)).toBe(true);
    });

    it('should throw error for invalid data', () => {
      // Given: 필수 필드가 누락된 데이터
      const invalidData = {
        id: 123456,
        tags: 'cat, animal, pet',
        // previewURL 누락
      };

      // When & Then: 에러가 발생해야 함
      expect(() => createImage(invalidData as any)).toThrow(
        'Invalid image data'
      );
    });

    it('should validate id is a number', () => {
      // Given: id가 숫자가 아닌 데이터
      const invalidData = {
        id: '123456', // 문자열
        tags: 'cat, animal, pet',
        previewURL: 'https://pixabay.com/get/preview.jpg',
        largeImageURL: 'https://pixabay.com/get/large.jpg',
        user: 'photographer',
        likes: 100,
        views: 1000,
        downloads: 50,
      };

      // When & Then: 에러가 발생해야 함
      expect(() => createImage(invalidData as any)).toThrow();
    });
  });
});
