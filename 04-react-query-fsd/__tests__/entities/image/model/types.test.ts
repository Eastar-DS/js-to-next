import type { ImageDTO, Image, PixabayResponse } from '@/entities/image/model/types';
import { toImage, toImages, isImage } from '@/entities/image/model/types';

describe('Image 타입 및 DTO 변환', () => {
  const mockImageDTO: ImageDTO = {
    id: 123456,
    pageURL: 'https://pixabay.com/photos/123456',
    type: 'photo',
    tags: 'nature, landscape, mountain',
    previewURL: 'https://pixabay.com/preview/123456.jpg',
    previewWidth: 150,
    previewHeight: 100,
    webformatURL: 'https://pixabay.com/get/123456_640.jpg',
    webformatWidth: 640,
    webformatHeight: 427,
    largeImageURL: 'https://pixabay.com/get/123456_1280.jpg',
    imageWidth: 1920,
    imageHeight: 1280,
    imageSize: 500000,
    views: 1000,
    downloads: 100,
    collections: 50,
    likes: 200,
    comments: 10,
    user_id: 789,
    user: 'photographer',
    userImageURL: 'https://pixabay.com/user/789.jpg',
  };

  describe('ImageDTO 타입', () => {
    it('ImageDTO가 올바른 구조를 가져야 한다', () => {
      expect(mockImageDTO).toHaveProperty('id');
      expect(mockImageDTO).toHaveProperty('tags');
      expect(mockImageDTO).toHaveProperty('webformatURL');
      expect(mockImageDTO).toHaveProperty('user');
    });
  });

  describe('Image 타입', () => {
    it('Image가 필요한 필드만 가져야 한다', () => {
      const image: Image = {
        id: 123456,
        tags: ['nature', 'landscape', 'mountain'],
        webformatURL: 'https://pixabay.com/get/123456_640.jpg',
        largeImageURL: 'https://pixabay.com/get/123456_1280.jpg',
        user: 'photographer',
        likes: 200,
        views: 1000,
      };

      expect(image).toHaveProperty('id');
      expect(image).toHaveProperty('tags');
      expect(image.tags).toBeInstanceOf(Array);
    });
  });

  describe('toImage 변환 함수', () => {
    it('ImageDTO를 Image로 변환해야 한다', () => {
      const image = toImage(mockImageDTO);

      expect(image.id).toBe(123456);
      expect(image.user).toBe('photographer');
      expect(image.webformatURL).toBe('https://pixabay.com/get/123456_640.jpg');
    });

    it('tags 문자열을 배열로 변환해야 한다', () => {
      const image = toImage(mockImageDTO);

      expect(image.tags).toBeInstanceOf(Array);
      expect(image.tags).toEqual(['nature', 'landscape', 'mountain']);
    });

    it('필요한 필드만 포함해야 한다', () => {
      const image = toImage(mockImageDTO);

      expect(image).not.toHaveProperty('previewURL');
      expect(image).not.toHaveProperty('pageURL');
      expect(image).not.toHaveProperty('type');
    });
  });

  describe('toImages 배치 변환 함수', () => {
    it('ImageDTO 배열을 Image 배열로 변환해야 한다', () => {
      const mockDTOs = [mockImageDTO, { ...mockImageDTO, id: 789 }];
      const images = toImages(mockDTOs);

      expect(images).toHaveLength(2);
      expect(images[0].id).toBe(123456);
      expect(images[1].id).toBe(789);
    });
  });

  describe('PixabayResponse 타입', () => {
    it('올바른 구조를 가져야 한다', () => {
      const response: PixabayResponse = {
        total: 1000,
        totalHits: 500,
        hits: [mockImageDTO],
      };

      expect(response).toHaveProperty('total');
      expect(response).toHaveProperty('totalHits');
      expect(response).toHaveProperty('hits');
      expect(response.hits).toBeInstanceOf(Array);
    });
  });

  describe('isImage 타입 가드', () => {
    it('유효한 Image 객체에 대해 true를 반환해야 한다', () => {
      const validImage: Image = {
        id: 123,
        tags: ['test'],
        webformatURL: 'https://example.com/image.jpg',
        largeImageURL: 'https://example.com/large.jpg',
        user: 'testuser',
        likes: 10,
        views: 100,
      };

      expect(isImage(validImage)).toBe(true);
    });

    it('유효하지 않은 객체에 대해 false를 반환해야 한다', () => {
      const invalidImage = {
        id: 123,
        tags: ['test'],
      };

      expect(isImage(invalidImage)).toBe(false);
    });
  });
});
