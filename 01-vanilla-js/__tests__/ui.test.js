import { jest } from '@jest/globals';
import { renderSearchForm } from '../scripts/ui.js';

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
