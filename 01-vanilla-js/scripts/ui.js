/**
 * UI 모듈
 * DOM 조작 관련 함수들
 */

/**
 * 검색 폼을 렌더링합니다.
 * @param {HTMLElement} container - 폼을 렌더링할 컨테이너
 * @param {Function} onSearch - 검색 시 호출될 콜백 함수
 */
export const renderSearchForm = (container, onSearch) => {
  // Create form element
  const form = document.createElement('form');
  form.id = 'search-form';

  // Create search input
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Search for images...';
  input.name = 'query';

  // Create search button
  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Search';

  // Add event listener for form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (onSearch) {
      const query = input.value.trim();
      onSearch(query);
    }
  });

  // Append elements to form
  form.appendChild(input);
  form.appendChild(button);

  // Append form to container
  container.appendChild(form);
};
