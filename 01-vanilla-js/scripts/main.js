/**
 * 메인 애플리케이션 파일
 * 앱 초기화 및 전체 워크플로우 관리
 */

import { searchImages } from './api.js';
import {
  renderSearchForm,
  renderImageResults,
  renderLoadingSkeleton,
  renderErrorMessage,
  renderPagination,
} from './ui.js';
import { getQuery, setQuery, getPage, setPage, getPerPage } from './state.js';

/**
 * 페이지 상단으로 스크롤합니다.
 */
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

/**
 * DOM 컨테이너들을 가져옵니다.
 * @returns {Object} 결과 및 페이지네이션 컨테이너
 */
const getContainers = () => ({
  resultsContainer: document.getElementById('results-container'),
  paginationContainer: document.getElementById('pagination-container'),
});

/**
 * 검색을 수행하고 결과를 렌더링합니다.
 * @param {string} query - 검색어
 * @param {number} page - 페이지 번호
 */
const performSearch = async (query, page = 1) => {
  const { resultsContainer, paginationContainer } = getContainers();

  // 빈 검색어는 무시
  if (!query.trim()) {
    return;
  }

  // 현재 상태 업데이트
  setQuery(query);
  setPage(page);

  try {
    // 1. 로딩 스켈레톤 표시
    renderLoadingSkeleton(resultsContainer, getPerPage());

    // 페이지네이션 초기화 (첫 검색시)
    if (page === 1) {
      paginationContainer.innerHTML = '';
    }

    // 2. API 호출
    const data = await searchImages(getQuery(), getPage(), getPerPage());

    // 3. 결과 렌더링
    renderImageResults(resultsContainer, data.hits);

    // 4. 페이지네이션 렌더링
    const totalPages = Math.ceil(data.totalHits / getPerPage());
    if (totalPages > 1) {
      // Airbnb 8.1: Use arrow function for inline callback
      renderPagination(paginationContainer, getPage(), totalPages, (newPage) => {
        performSearch(getQuery(), newPage);
        scrollToTop();
      });
    } else {
      paginationContainer.innerHTML = '';
    }
  } catch (error) {
    // 에러 처리
    renderErrorMessage(
      resultsContainer,
      '이미지를 불러오는데 실패했습니다. 다시 시도해주세요.',
      () => performSearch(getQuery(), getPage())
    );
    paginationContainer.innerHTML = '';
  }
};

/**
 * 검색 폼 제출 핸들러
 * @param {string} query - 검색어
 */
const handleSearch = (query) => {
  performSearch(query, 1);
};

/**
 * 앱 초기화 함수
 */
const initApp = () => {
  const searchContainer = document.getElementById('search-container');

  // 검색 폼 렌더링
  renderSearchForm(searchContainer, handleSearch);

  console.log('이미지 검색 앱이 초기화되었습니다.');
};

// DOM 로드 완료 시 앱 초기화
document.addEventListener('DOMContentLoaded', initApp);
