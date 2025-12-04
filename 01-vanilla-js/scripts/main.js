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

// 전역 상태 관리
let currentQuery = '';
let currentPage = 1;
const perPage = 20;

/**
 * 검색을 수행하고 결과를 렌더링합니다.
 * @param {string} query - 검색어
 * @param {number} page - 페이지 번호
 */
const performSearch = async (query, page = 1) => {
  const resultsContainer = document.getElementById('results-container');
  const paginationContainer = document.getElementById('pagination-container');

  // 빈 검색어는 무시
  if (!query.trim()) {
    return;
  }

  // 현재 상태 업데이트
  currentQuery = query;
  currentPage = page;

  try {
    // 1. 로딩 스켈레톤 표시
    renderLoadingSkeleton(resultsContainer, perPage);

    // 페이지네이션 초기화 (첫 검색시)
    if (page === 1) {
      paginationContainer.innerHTML = '';
    }

    // 2. API 호출
    const data = await searchImages(currentQuery, currentPage, perPage);

    // 3. 결과 렌더링
    renderImageResults(resultsContainer, data.hits);

    // 4. 페이지네이션 렌더링
    const totalPages = Math.ceil(data.totalHits / perPage);
    if (totalPages > 1) {
      renderPagination(paginationContainer, currentPage, totalPages, handlePageChange);
    } else {
      paginationContainer.innerHTML = '';
    }
  } catch (error) {
    // 에러 처리
    renderErrorMessage(
      resultsContainer,
      '이미지를 불러오는데 실패했습니다. 다시 시도해주세요.',
      () => performSearch(currentQuery, currentPage)
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
 * 페이지 변경 핸들러
 * @param {number} newPage - 새 페이지 번호
 */
const handlePageChange = (newPage) => {
  performSearch(currentQuery, newPage);

  // 페이지 변경 시 상단으로 스크롤
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
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
