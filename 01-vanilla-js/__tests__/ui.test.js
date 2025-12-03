import { jest } from '@jest/globals';
import { renderSearchForm, renderImageResults } from '../scripts/ui.js';

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
