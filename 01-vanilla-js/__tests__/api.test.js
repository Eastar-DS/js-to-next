import { jest } from '@jest/globals';
import { getApiKey, getApiBaseUrl, searchImages } from '../scripts/api.js';

describe('API Client Initialization', () => {
  test('should read API key from environment variable', () => {
    // Given: PIXABAY_API_KEY is set in environment
    const expectedKey = process.env.PIXABAY_API_KEY;

    // When: we get the API key
    const apiKey = getApiKey();

    // Then: it should return the correct API key
    expect(apiKey).toBeDefined();
    expect(apiKey).toBe(expectedKey);
  });

  test('should have correct API base URL', () => {
    // When: we get the API base URL
    const baseUrl = getApiBaseUrl();

    // Then: it should be the Pixabay API URL
    expect(baseUrl).toBe('https://pixabay.com/api/');
  });
});

describe('Image Search Function', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call Pixabay API with correct parameters', async () => {
    // Given: a search query
    const query = 'cats';
    const mockResponse = {
      total: 100,
      totalHits: 100,
      hits: [
        {
          id: 1,
          tags: 'cat, animal, pet',
          previewURL: 'https://pixabay.com/preview/cat.jpg',
          largeImageURL: 'https://pixabay.com/large/cat.jpg',
        },
      ],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    // When: we search for images
    const result = await searchImages(query);

    // Then: it should call fetch with correct URL and parameters
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('https://pixabay.com/api/'));
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(`q=${encodeURIComponent(query)}`)
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(`key=${process.env.PIXABAY_API_KEY}`)
    );

    // And: it should return the response data
    expect(result).toEqual(mockResponse);
  });

  test('should handle API errors gracefully', async () => {
    // Given: API returns an error
    const query = 'test';
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
    });

    // When & Then: it should throw an error
    await expect(searchImages(query)).rejects.toThrow('API request failed: 400 Bad Request');
  });

  test('should handle network errors', async () => {
    // Given: network error occurs
    const query = 'test';
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    // When & Then: it should throw the network error
    await expect(searchImages(query)).rejects.toThrow('Network error');
  });
});
