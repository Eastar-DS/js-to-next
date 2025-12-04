/**
 * 상태 관리 모듈
 * 애플리케이션 전역 상태를 관리합니다.
 */

// 비공개 상태
let currentQuery = '';
let currentPage = 1;
const perPage = 20;

/**
 * 현재 검색어를 반환합니다.
 * @returns {string} 현재 검색어
 */
export const getQuery = () => currentQuery;

/**
 * 검색어를 설정합니다.
 * @param {string} query - 새로운 검색어
 */
export const setQuery = (query) => {
  currentQuery = query;
};

/**
 * 현재 페이지 번호를 반환합니다.
 * @returns {number} 현재 페이지 번호
 */
export const getPage = () => currentPage;

/**
 * 페이지 번호를 설정합니다.
 * @param {number} page - 새로운 페이지 번호
 */
export const setPage = (page) => {
  currentPage = page;
};

/**
 * 페이지당 결과 수를 반환합니다.
 * @returns {number} 페이지당 결과 수
 */
export const getPerPage = () => perPage;

/**
 * 상태를 초기화합니다.
 */
export const resetState = () => {
  currentQuery = '';
  currentPage = 1;
};
