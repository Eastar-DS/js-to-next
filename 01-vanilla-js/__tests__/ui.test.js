import { jest } from '@jest/globals';
import {
  renderSearchForm,
  renderImageResults,
  renderLoadingSkeleton,
  renderErrorMessage,
  renderPagination,
} from '../scripts/ui.js';

describe('Search Form Rendering', () => {
  beforeEach(() => {
    // Set up a fresh DOM for each test
    document.body.innerHTML = '<div id="app"></div>';
  });

  afterEach(() => {
    // Clean up DOM after each test
    document.body.innerHTML = '';
  });

  test('should render search input and button', () => {
    // Given: a container element
    const container = document.getElementById('app');

    // When: we render the search form
    renderSearchForm(container);

    // Then: it should have a search input
    const searchInput = container.querySelector('input[type="text"]');
    expect(searchInput).toBeTruthy();
    expect(searchInput.placeholder).toBe('Search for images...');

    // And: it should have a search button
    const searchButton = container.querySelector('button[type="submit"]');
    expect(searchButton).toBeTruthy();
    expect(searchButton.textContent).toBe('Search');
  });

  test('should wrap form elements in a form tag', () => {
    // Given: a container element
    const container = document.getElementById('app');

    // When: we render the search form
    renderSearchForm(container);

    // Then: it should have a form element
    const form = container.querySelector('form');
    expect(form).toBeTruthy();
    expect(form.id).toBe('search-form');
  });

  test('should call callback when form is submitted', () => {
    // Given: a container and a callback function
    const container = document.getElementById('app');
    const onSearch = jest.fn();

    // When: we render the form with callback
    renderSearchForm(container, onSearch);

    // And: user enters text and submits
    const form = container.querySelector('form');
    const input = container.querySelector('input[type="text"]');
    input.value = 'cats';

    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(submitEvent);

    // Then: callback should be called with the search query
    expect(onSearch).toHaveBeenCalledWith('cats');
  });

  test('should prevent default form submission', () => {
    // Given: a container
    const container = document.getElementById('app');
    renderSearchForm(container);

    // When: form is submitted
    const form = container.querySelector('form');
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');

    form.dispatchEvent(submitEvent);

    // Then: preventDefault should be called
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});

describe('Image Results Rendering', () => {
  beforeEach(() => {
    // Set up a fresh DOM for each test
    document.body.innerHTML = '<div id="results"></div>';
  });

  afterEach(() => {
    // Clean up DOM after each test
    document.body.innerHTML = '';
  });

  test('should render image grid with correct number of images', () => {
    // Given: a container and image data
    const container = document.getElementById('results');
    const images = [
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
    ];

    // When: we render the images
    renderImageResults(container, images);

    // Then: it should render correct number of image items
    const imageItems = container.querySelectorAll('.image-item');
    expect(imageItems.length).toBe(2);
  });

  test('should render image with correct attributes', () => {
    // Given: a container and single image data
    const container = document.getElementById('results');
    const images = [
      {
        id: 1,
        tags: 'cat, animal, pet',
        previewURL: 'https://pixabay.com/preview/cat1.jpg',
        largeImageURL: 'https://pixabay.com/large/cat1.jpg',
      },
    ];

    // When: we render the image
    renderImageResults(container, images);

    // Then: image should have correct src and alt
    const img = container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.src).toBe('https://pixabay.com/preview/cat1.jpg');
    expect(img.alt).toBe('cat, animal, pet');
  });

  test('should render empty state when no images', () => {
    // Given: a container and empty array
    const container = document.getElementById('results');
    const images = [];

    // When: we render with no images
    renderImageResults(container, images);

    // Then: it should show "No results found" message
    const message = container.querySelector('.no-results');
    expect(message).toBeTruthy();
    expect(message.textContent).toBe('No results found');
  });

  test('should clear previous results before rendering new ones', () => {
    // Given: a container with existing content
    const container = document.getElementById('results');
    container.innerHTML = '<div class="old-content">Old</div>';

    const images = [
      {
        id: 1,
        tags: 'cat',
        previewURL: 'https://pixabay.com/preview/cat1.jpg',
        largeImageURL: 'https://pixabay.com/large/cat1.jpg',
      },
    ];

    // When: we render new images
    renderImageResults(container, images);

    // Then: old content should be removed
    const oldContent = container.querySelector('.old-content');
    expect(oldContent).toBeFalsy();

    // And: new content should be present
    const imageItems = container.querySelectorAll('.image-item');
    expect(imageItems.length).toBe(1);
  });
});

describe('Loading Skeleton Rendering', () => {
  beforeEach(() => {
    // Set up a fresh DOM for each test
    document.body.innerHTML = '<div id="loading"></div>';
  });

  afterEach(() => {
    // Clean up DOM after each test
    document.body.innerHTML = '';
  });

  test('should render skeleton cards', () => {
    // Given: a container and count
    const container = document.getElementById('loading');
    const count = 3;

    // When: we render skeleton loading
    renderLoadingSkeleton(container, count);

    // Then: it should render correct number of skeleton items
    const skeletonItems = container.querySelectorAll('.skeleton-item');
    expect(skeletonItems.length).toBe(3);
  });

  test('should render default number of skeleton cards when count not provided', () => {
    // Given: a container without count
    const container = document.getElementById('loading');

    // When: we render skeleton loading without count
    renderLoadingSkeleton(container);

    // Then: it should render default 20 skeleton items
    const skeletonItems = container.querySelectorAll('.skeleton-item');
    expect(skeletonItems.length).toBe(20);
  });

  test('should add skeleton class to container', () => {
    // Given: a container
    const container = document.getElementById('loading');

    // When: we render skeleton loading
    renderLoadingSkeleton(container, 5);

    // Then: container should have skeleton-grid class
    const grid = container.querySelector('.skeleton-grid');
    expect(grid).toBeTruthy();
  });

  test('should clear previous content before rendering skeleton', () => {
    // Given: a container with existing content
    const container = document.getElementById('loading');
    container.innerHTML = '<div class="old-content">Old</div>';

    // When: we render skeleton loading
    renderLoadingSkeleton(container, 2);

    // Then: old content should be removed
    const oldContent = container.querySelector('.old-content');
    expect(oldContent).toBeFalsy();

    // And: skeleton items should be present
    const skeletonItems = container.querySelectorAll('.skeleton-item');
    expect(skeletonItems.length).toBe(2);
  });
});

describe('Error Message Rendering', () => {
  beforeEach(() => {
    // Set up a fresh DOM for each test
    document.body.innerHTML = '<div id="error"></div>';
  });

  afterEach(() => {
    // Clean up DOM after each test
    document.body.innerHTML = '';
  });

  test('should render error message with text', () => {
    // Given: a container and error message
    const container = document.getElementById('error');
    const errorMessage = 'Failed to load images. Please try again.';

    // When: we render error message
    renderErrorMessage(container, errorMessage);

    // Then: it should display the error message
    const errorElement = container.querySelector('.error-message');
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent).toContain('Failed to load images');
  });

  test('should render default error message when no message provided', () => {
    // Given: a container without error message
    const container = document.getElementById('error');

    // When: we render error message without text
    renderErrorMessage(container);

    // Then: it should display default error message
    const errorElement = container.querySelector('.error-message');
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent).toContain('An error occurred');
  });

  test('should include retry button', () => {
    // Given: a container and callback
    const container = document.getElementById('error');
    const onRetry = jest.fn();

    // When: we render error message with retry callback
    renderErrorMessage(container, 'Error occurred', onRetry);

    // Then: it should have a retry button
    const retryButton = container.querySelector('.retry-button');
    expect(retryButton).toBeTruthy();
    expect(retryButton.textContent).toBe('Retry');
  });

  test('should call retry callback when button clicked', () => {
    // Given: a container and callback
    const container = document.getElementById('error');
    const onRetry = jest.fn();

    // When: we render error message and click retry
    renderErrorMessage(container, 'Error occurred', onRetry);
    const retryButton = container.querySelector('.retry-button');
    retryButton.click();

    // Then: callback should be called
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  test('should clear previous content before rendering error', () => {
    // Given: a container with existing content
    const container = document.getElementById('error');
    container.innerHTML = '<div class="old-content">Old</div>';

    // When: we render error message
    renderErrorMessage(container, 'Error occurred');

    // Then: old content should be removed
    const oldContent = container.querySelector('.old-content');
    expect(oldContent).toBeFalsy();

    // And: error message should be present
    const errorElement = container.querySelector('.error-message');
    expect(errorElement).toBeTruthy();
  });
});

describe('Pagination Rendering', () => {
  beforeEach(() => {
    // Set up a fresh DOM for each test
    document.body.innerHTML = '<div id="pagination"></div>';
  });

  afterEach(() => {
    // Clean up DOM after each test
    document.body.innerHTML = '';
  });

  test('should render previous and next buttons', () => {
    // Given: a container and pagination data
    const container = document.getElementById('pagination');
    const currentPage = 2;
    const totalPages = 5;
    const onPageChange = jest.fn();

    // When: we render pagination
    renderPagination(container, currentPage, totalPages, onPageChange);

    // Then: it should have previous and next buttons
    const prevButton = container.querySelector('.prev-button');
    const nextButton = container.querySelector('.next-button');
    expect(prevButton).toBeTruthy();
    expect(nextButton).toBeTruthy();
  });

  test('should display current page number', () => {
    // Given: a container and pagination data
    const container = document.getElementById('pagination');
    const currentPage = 3;
    const totalPages = 10;
    const onPageChange = jest.fn();

    // When: we render pagination
    renderPagination(container, currentPage, totalPages, onPageChange);

    // Then: it should display current page and total pages
    const pageInfo = container.querySelector('.page-info');
    expect(pageInfo).toBeTruthy();
    expect(pageInfo.textContent).toContain('3');
    expect(pageInfo.textContent).toContain('10');
  });

  test('should disable previous button on first page', () => {
    // Given: first page pagination
    const container = document.getElementById('pagination');
    const currentPage = 1;
    const totalPages = 5;
    const onPageChange = jest.fn();

    // When: we render pagination
    renderPagination(container, currentPage, totalPages, onPageChange);

    // Then: previous button should be disabled
    const prevButton = container.querySelector('.prev-button');
    expect(prevButton.disabled).toBe(true);
  });

  test('should disable next button on last page', () => {
    // Given: last page pagination
    const container = document.getElementById('pagination');
    const currentPage = 5;
    const totalPages = 5;
    const onPageChange = jest.fn();

    // When: we render pagination
    renderPagination(container, currentPage, totalPages, onPageChange);

    // Then: next button should be disabled
    const nextButton = container.querySelector('.next-button');
    expect(nextButton.disabled).toBe(true);
  });

  test('should call callback with previous page when prev button clicked', () => {
    // Given: pagination on page 3
    const container = document.getElementById('pagination');
    const currentPage = 3;
    const totalPages = 5;
    const onPageChange = jest.fn();

    // When: we render pagination and click prev
    renderPagination(container, currentPage, totalPages, onPageChange);
    const prevButton = container.querySelector('.prev-button');
    prevButton.click();

    // Then: callback should be called with page 2
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test('should call callback with next page when next button clicked', () => {
    // Given: pagination on page 3
    const container = document.getElementById('pagination');
    const currentPage = 3;
    const totalPages = 5;
    const onPageChange = jest.fn();

    // When: we render pagination and click next
    renderPagination(container, currentPage, totalPages, onPageChange);
    const nextButton = container.querySelector('.next-button');
    nextButton.click();

    // Then: callback should be called with page 4
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
