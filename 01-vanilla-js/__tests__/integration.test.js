import { jest } from '@jest/globals';
import { searchImages } from '../scripts/api.js';
import {
  renderSearchForm,
  renderImageResults,
  renderLoadingSkeleton,
  renderErrorMessage,
} from '../scripts/ui.js';

describe('Search Workflow Integration', () => {
  beforeEach(() => {
    // Set up a fresh DOM for each test
    document.body.innerHTML = `
      <div id="app">
        <div id="search-container"></div>
        <div id="results-container"></div>
      </div>
    `;

    // Reset fetch mock
    global.fetch = jest.fn();
  });

  afterEach(() => {
    // Clean up DOM after each test
    document.body.innerHTML = '';
    jest.restoreAllMocks();
  });

  test('should complete full search workflow: input → loading → results', async () => {
    // Given: containers and mock API response
    const searchContainer = document.getElementById('search-container');
    const resultsContainer = document.getElementById('results-container');

    const mockResponse = {
      total: 100,
      totalHits: 100,
      hits: [
        {
          id: 1,
          tags: 'cat, animal, pet',
          previewURL: 'https://pixabay.com/preview/cat1.jpg',
          largeImageURL: 'https://pixabay.com/large/cat1.jpg',
        },
        {
          id: 2,
          tags: 'dog, animal, pet',
          previewURL: 'https://pixabay.com/preview/dog1.jpg',
          largeImageURL: 'https://pixabay.com/large/dog1.jpg',
        },
      ],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    // When: we set up the search workflow
    const handleSearch = async (query) => {
      // 1. Show loading skeleton
      renderLoadingSkeleton(resultsContainer, 20);

      // 2. Fetch search results
      const data = await searchImages(query);

      // 3. Render results
      renderImageResults(resultsContainer, data.hits);
    };

    renderSearchForm(searchContainer, handleSearch);

    // And: user enters search query and submits
    const input = searchContainer.querySelector('input[type="text"]');
    const form = searchContainer.querySelector('form');
    input.value = 'cats';

    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(submitEvent);

    // Then: loading skeleton should be displayed immediately
    let skeletonItems = resultsContainer.querySelectorAll('.skeleton-item');
    expect(skeletonItems.length).toBe(20);

    // And: wait for async operations to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    // And: results should be rendered after API call
    const imageItems = resultsContainer.querySelectorAll('.image-item');
    expect(imageItems.length).toBe(2);

    // And: skeleton should be cleared
    skeletonItems = resultsContainer.querySelectorAll('.skeleton-item');
    expect(skeletonItems.length).toBe(0);
  });

  test('should handle empty search results', async () => {
    // Given: containers and mock empty response
    const searchContainer = document.getElementById('search-container');
    const resultsContainer = document.getElementById('results-container');

    const mockResponse = {
      total: 0,
      totalHits: 0,
      hits: [],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    // When: we set up search workflow
    const handleSearch = async (query) => {
      renderLoadingSkeleton(resultsContainer, 20);
      const data = await searchImages(query);
      renderImageResults(resultsContainer, data.hits);
    };

    renderSearchForm(searchContainer, handleSearch);

    // And: user searches for something with no results
    const input = searchContainer.querySelector('input[type="text"]');
    const form = searchContainer.querySelector('form');
    input.value = 'xyzabc123nonexistent';

    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(submitEvent);

    // Wait for async operations
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Then: "No results found" message should be displayed
    const noResults = resultsContainer.querySelector('.no-results');
    expect(noResults).toBeTruthy();
    expect(noResults.textContent).toBe('No results found');
  });

  test('should handle API errors gracefully', async () => {
    // Given: containers and mock error response
    const searchContainer = document.getElementById('search-container');
    const resultsContainer = document.getElementById('results-container');

    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    // When: we set up search workflow with error handling
    const handleSearch = async (query) => {
      try {
        renderLoadingSkeleton(resultsContainer, 20);
        const data = await searchImages(query);
        renderImageResults(resultsContainer, data.hits);
      } catch (error) {
        renderErrorMessage(resultsContainer, 'Failed to load images. Please try again.');
      }
    };

    renderSearchForm(searchContainer, handleSearch);

    // And: user performs search
    const input = searchContainer.querySelector('input[type="text"]');
    const form = searchContainer.querySelector('form');
    input.value = 'cats';

    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(submitEvent);

    // Wait for async operations
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Then: error message should be displayed
    const errorElement = resultsContainer.querySelector('.error-message');
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent).toContain('Failed to load images');
  });
});
