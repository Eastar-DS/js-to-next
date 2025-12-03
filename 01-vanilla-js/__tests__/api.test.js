import { getApiKey, getApiBaseUrl } from '../scripts/api.js';

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
