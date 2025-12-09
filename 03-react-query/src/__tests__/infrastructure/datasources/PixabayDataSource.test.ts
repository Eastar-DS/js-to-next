/**
 * PixabayDataSource 테스트
 * Infrastructure Layer - Pixabay API 통신 계층
 */

import { PixabayDataSource } from '@infrastructure/datasources/PixabayDataSource';
import type { PixabayApiResponseDto } from '@infrastructure/datasources/dto/PixabayDto';

// fetch를 모킹하기 위한 전역 설정
globalThis.fetch = jest.fn() as jest.Mock;

describe('PixabayDataSource', () => {
  let dataSource: PixabayDataSource;
  const mockApiKey = 'test-api-key-12345';

  beforeEach(() => {
    // 각 테스트 전에 fetch mock 초기화
    (globalThis.fetch as jest.Mock).mockClear();
    dataSource = new PixabayDataSource(mockApiKey);
  });

  describe('클래스 정의', () => {
    it('should be instantiable with API key', () => {
      // Given & When: DataSource 인스턴스 생성
      const ds = new PixabayDataSource('my-api-key');

      // Then: 인스턴스가 생성되어야 함
      expect(ds).toBeInstanceOf(PixabayDataSource);
      expect(ds.search).toBeDefined();
      expect(typeof ds.search).toBe('function');
      expect(ds.getByPage).toBeDefined();
      expect(typeof ds.getByPage).toBe('function');
    });
  });

  describe('search 메서드', () => {
    it('should call Pixabay API with correct URL and return DTO', async () => {
      // Given: 성공적인 API 응답
      const mockResponse: PixabayApiResponseDto = {
        total: 500,
        totalHits: 500,
        hits: [
          {
            id: 1,
            tags: 'cat, animal',
            previewURL: 'https://preview.jpg',
            largeImageURL: 'https://large.jpg',
            user: 'user1',
            likes: 10,
            views: 100,
            downloads: 5,
          },
        ],
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      // When: search 메서드 호출
      const result = await dataSource.search('cats');

      // Then: 올바른 URL로 fetch 호출
      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('https://pixabay.com/api/')
      );
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining(`key=${mockApiKey}`)
      );
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('q=cats')
      );

      // Then: DTO를 반환해야 함
      expect(result).toEqual(mockResponse);
      expect(result.hits).toHaveLength(1);
    });

    it('should encode query parameter correctly', async () => {
      // Given: 특수 문자가 포함된 쿼리
      const mockResponse: PixabayApiResponseDto = {
        total: 0,
        totalHits: 0,
        hits: [],
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      // When: 특수 문자가 포함된 검색어로 호출
      await dataSource.search('cats and dogs');

      // Then: URL 인코딩이 적용되어야 함 (URLSearchParams는 공백을 +로 인코딩)
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('q=cats+and+dogs')
      );
    });

    it('should throw error when API returns non-ok response', async () => {
      // Given: API 에러 응답
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      });

      // When & Then: 에러를 throw해야 함
      await expect(dataSource.search('invalid')).rejects.toThrow(
        'Pixabay API request failed: 400 Bad Request'
      );
    });

    it('should throw error when network fails', async () => {
      // Given: 네트워크 에러
      (globalThis.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      // When & Then: 에러를 throw해야 함
      await expect(dataSource.search('cats')).rejects.toThrow('Network error');
    });

    it('should throw error when response is not valid DTO', async () => {
      // Given: 잘못된 형식의 응답
      const invalidResponse = {
        // total 필드 누락
        totalHits: 100,
        hits: [],
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => invalidResponse,
      });

      // When & Then: 에러를 throw해야 함
      await expect(dataSource.search('cats')).rejects.toThrow(
        'Invalid Pixabay API response format'
      );
    });
  });

  describe('getByPage 메서드', () => {
    it('should call Pixabay API with page parameter', async () => {
      // Given: 성공적인 API 응답
      const mockResponse: PixabayApiResponseDto = {
        total: 500,
        totalHits: 500,
        hits: [
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

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      // When: getByPage 메서드 호출
      const result = await dataSource.getByPage('dogs', 2);

      // Then: 페이지 파라미터가 포함된 URL로 호출
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('q=dogs')
      );
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('page=2')
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle page 1 correctly', async () => {
      // Given: 첫 페이지 응답
      const mockResponse: PixabayApiResponseDto = {
        total: 100,
        totalHits: 100,
        hits: [],
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      // When: 첫 페이지 요청
      await dataSource.getByPage('birds', 1);

      // Then: page=1 파라미터가 포함되어야 함
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('page=1')
      );
    });

    it('should include per_page parameter', async () => {
      // Given: API 응답
      const mockResponse: PixabayApiResponseDto = {
        total: 500,
        totalHits: 500,
        hits: [],
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      // When: getByPage 호출
      await dataSource.getByPage('nature', 1);

      // Then: per_page 파라미터가 포함되어야 함
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('per_page=')
      );
    });

    it('should throw error when API returns error', async () => {
      // Given: API 에러
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      // When & Then: 에러를 throw해야 함
      await expect(dataSource.getByPage('test', 999)).rejects.toThrow(
        'Pixabay API request failed: 404 Not Found'
      );
    });
  });

  describe('환경 변수 및 설정', () => {
    it('should use provided API key', async () => {
      // Given: 특정 API 키로 생성된 DataSource
      const customKey = 'custom-key-xyz';
      const customDs = new PixabayDataSource(customKey);

      const mockResponse: PixabayApiResponseDto = {
        total: 0,
        totalHits: 0,
        hits: [],
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      // When: API 호출
      await customDs.search('test');

      // Then: 제공된 API 키를 사용해야 함
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining(`key=${customKey}`)
      );
    });
  });
});
