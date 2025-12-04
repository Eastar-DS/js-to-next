import { jest } from '@jest/globals';
import { searchImages } from '../scripts/api.js';
import {
  renderSearchForm,
  renderImageResults,
  renderLoadingSkeleton,
  renderErrorMessage,
  renderPagination,
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
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

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
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

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
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    // Then: error message should be displayed
    const errorElement = resultsContainer.querySelector('.error-message');
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent).toContain('Failed to load images');
  });
});

describe('Pagination Integration', () => {
  beforeEach(() => {
    // Set up a fresh DOM for each test
    document.body.innerHTML = `
      <div id="app">
        <div id="search-container"></div>
        <div id="results-container"></div>
        <div id="pagination-container"></div>
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

  test('should handle page change: loading → API call → new results', async () => {
    // Given: containers and initial search results
    const resultsContainer = document.getElementById('results-container');
    const paginationContainer = document.getElementById('pagination-container');

    // Mock first page response
    const firstPageResponse = {
      total: 500,
      totalHits: 500,
      hits: [
        {
          id: 1,
          tags: 'cat, page 1',
          previewURL: 'https://pixabay.com/preview/cat1.jpg',
          largeImageURL: 'https://pixabay.com/large/cat1.jpg',
        },
      ],
    };

    // Mock second page response
    const secondPageResponse = {
      total: 500,
      totalHits: 500,
      hits: [
        {
          id: 21,
          tags: 'cat, page 2',
          previewURL: 'https://pixabay.com/preview/cat21.jpg',
          largeImageURL: 'https://pixabay.com/large/cat21.jpg',
        },
      ],
    };

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => firstPageResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => secondPageResponse,
      });

    // When: we set up pagination workflow
    let currentPage = 1;
    const currentQuery = 'cats';
    const perPage = 20;

    const handlePageChange = async (newPage) => {
      currentPage = newPage;

      // 1. Show loading skeleton
      renderLoadingSkeleton(resultsContainer, perPage);

      // 2. Fetch new page
      const data = await searchImages(currentQuery, currentPage, perPage);

      // 3. Render new results
      renderImageResults(resultsContainer, data.hits);

      // 4. Update pagination
      const totalPages = Math.ceil(data.totalHits / perPage);
      renderPagination(paginationContainer, currentPage, totalPages, handlePageChange);
    };

    // Initial render (page 1)
    await handlePageChange(1);

    // Wait for async operations
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    // Then: first page results should be displayed
    let imageItems = resultsContainer.querySelectorAll('.image-item');
    expect(imageItems.length).toBe(1);
    expect(imageItems[0].querySelector('img').alt).toBe('cat, page 1');

    // And: pagination should be rendered
    const nextButton = paginationContainer.querySelector('.next-button');
    expect(nextButton).toBeTruthy();
    expect(nextButton.disabled).toBe(false);

    // When: user clicks next page
    nextButton.click();

    // Then: loading skeleton should be displayed immediately
    let skeletonItems = resultsContainer.querySelectorAll('.skeleton-item');
    expect(skeletonItems.length).toBe(20);

    // Wait for async operations
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    // And: second page results should be displayed
    imageItems = resultsContainer.querySelectorAll('.image-item');
    expect(imageItems.length).toBe(1);
    expect(imageItems[0].querySelector('img').alt).toBe('cat, page 2');

    // And: skeleton should be cleared
    skeletonItems = resultsContainer.querySelectorAll('.skeleton-item');
    expect(skeletonItems.length).toBe(0);

    // And: pagination should reflect page 2
    const pageInfo = paginationContainer.querySelector('.page-info');
    expect(pageInfo.textContent).toContain('2');
  });
});
