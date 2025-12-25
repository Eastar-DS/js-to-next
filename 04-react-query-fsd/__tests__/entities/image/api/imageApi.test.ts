import { getImages, getImagesByPage } from '@/entities/image/api/imageApi';
import { httpClient } from '@/shared/api/httpClient';
import type { PixabayResponse } from '@/entities/image/model/types';

jest.mock('@/shared/api/httpClient');

describe('imageApi', () => {
  const mockPixabayResponse: PixabayResponse = {
    total: 100,
    totalHits: 50,
    hits: [
      {
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
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getImages', () => {
    it('query를 받아 이미지 목록을 반환해야 한다', async () => {
      (httpClient.get as jest.Mock).mockResolvedValueOnce(mockPixabayResponse);

      const images = await getImages('nature');

      expect(httpClient.get).toHaveBeenCalledWith('/', expect.any(Object));
      expect(images).toHaveLength(1);
      expect(images[0].id).toBe(123456);
    });

    it('DTO를 Entity로 변환해야 한다', async () => {
      (httpClient.get as jest.Mock).mockResolvedValueOnce(mockPixabayResponse);

      const images = await getImages('nature');

      expect(images[0].tags).toBeInstanceOf(Array);
      expect(images[0].tags).toEqual(['nature', 'landscape', 'mountain']);
    });

    it('빈 query에 대해 에러를 던져야 한다', async () => {
      await expect(getImages('')).rejects.toThrow('Query parameter is required');
    });

    it('API 에러 시 에러를 던져야 한다', async () => {
      (httpClient.get as jest.Mock).mockRejectedValueOnce(
        new Error('API Error')
      );

      await expect(getImages('nature')).rejects.toThrow('API Error');
    });
  });

  describe('getImagesByPage', () => {
    it('query와 page를 받아 이미지 목록을 반환해야 한다', async () => {
      (httpClient.get as jest.Mock).mockResolvedValueOnce(mockPixabayResponse);

      const images = await getImagesByPage('nature', 2);

      expect(httpClient.get).toHaveBeenCalledWith(
        '/',
        expect.objectContaining({
          page: 2,
        })
      );
      expect(images).toHaveLength(1);
    });

    it('page가 1 미만이면 에러를 던져야 한다', async () => {
      await expect(getImagesByPage('nature', 0)).rejects.toThrow(
        'Page must be greater than 0'
      );
    });

    it('빈 query에 대해 에러를 던져야 한다', async () => {
      await expect(getImagesByPage('', 1)).rejects.toThrow(
        'Query parameter is required'
      );
    });

    it('API 파라미터에 key와 query가 포함되어야 한다', async () => {
      (httpClient.get as jest.Mock).mockResolvedValueOnce(mockPixabayResponse);

      await getImagesByPage('nature', 1);

      expect(httpClient.get).toHaveBeenCalledWith(
        '/',
        expect.objectContaining({
          key: expect.any(String),
          q: 'nature',
          page: 1,
        })
      );
    });
  });
});
