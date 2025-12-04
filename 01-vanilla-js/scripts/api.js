/**
 * API 클라이언트 모듈
 */

import { CONFIG } from './config.js';

const API_BASE_URL = 'https://pixabay.com/api/';

/**
 * 환경 변수에서 API 키를 가져옵니다.
 * @returns {string} Pixabay API 키
 */
export const getApiKey = () => {
  // 브라우저 환경에서는 config.js 사용
  if (typeof process === 'undefined' || !process.env) {
    return CONFIG.PIXABAY_API_KEY;
  }
  // Node.js 환경(테스트)에서는 환경변수 사용
  return process.env.PIXABAY_API_KEY;
};

/**
 * API 기본 URL을 반환합니다.
 * @returns {string} API 기본 URL
 */
export const getApiBaseUrl = () => API_BASE_URL;

/**
 * 검색어로 이미지를 검색합니다.
 * @param {string} query - 검색어
 * @param {number} page - 페이지 번호 (기본값: 1)
 * @param {number} perPage - 페이지당 결과 수 (기본값: 20)
 * @returns {Promise<Object>} Pixabay API 응답
 */
export const searchImages = async (query, page = 1, perPage = 20) => {
  const apiKey = getApiKey();
  const baseUrl = getApiBaseUrl();

  // URL 생성
  const params = new URLSearchParams({
    key: apiKey,
    q: query,
    page: page.toString(),
    per_page: perPage.toString(),
    image_type: 'photo',
  });

  const url = `${baseUrl}?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
