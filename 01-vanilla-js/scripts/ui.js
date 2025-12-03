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

/**
 * 이미지 검색 결과를 렌더링합니다.
 * @param {HTMLElement} container - 결과를 렌더링할 컨테이너
 * @param {Array} images - 이미지 데이터 배열
 */
export const renderImageResults = (container, images) => {
  // Clear previous results
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  // Handle empty results
  if (images.length === 0) {
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.textContent = 'No results found';
    container.appendChild(noResults);
    return;
  }

  // Create image grid
  const grid = document.createElement('div');
  grid.className = 'image-grid';

  // Render each image
  images.forEach((image) => {
    const imageItem = document.createElement('div');
    imageItem.className = 'image-item';

    const img = document.createElement('img');
    img.src = image.previewURL;
    img.alt = image.tags;

    imageItem.appendChild(img);
    grid.appendChild(imageItem);
  });

  container.appendChild(grid);
};

/**
 * 로딩 스켈레톤 UI를 렌더링합니다.
 * @param {HTMLElement} container - 스켈레톤을 렌더링할 컨테이너
 * @param {number} count - 스켈레톤 카드 개수 (기본값: 20)
 */
export const renderLoadingSkeleton = (container, count = 20) => {
  // Clear previous content
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  // Create skeleton grid
  const grid = document.createElement('div');
  grid.className = 'skeleton-grid';

  // Render skeleton items
  for (let i = 0; i < count; i += 1) {
    const skeletonItem = document.createElement('div');
    skeletonItem.className = 'skeleton-item';

    container.appendChild(skeletonItem);
  }

  container.appendChild(grid);
};
