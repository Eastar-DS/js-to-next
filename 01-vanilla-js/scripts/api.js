/**
 * API 클라이언트 모듈
 */

const API_BASE_URL = 'https://pixabay.com/api/';

/**
 * 환경 변수에서 API 키를 가져옵니다.
 * @returns {string} Pixabay API 키
 */
export const getApiKey = () => {
  return process.env.PIXABAY_API_KEY;
};

/**
 * API 기본 URL을 반환합니다.
 * @returns {string} API 기본 URL
 */
export const getApiBaseUrl = () => {
  return API_BASE_URL;
};
