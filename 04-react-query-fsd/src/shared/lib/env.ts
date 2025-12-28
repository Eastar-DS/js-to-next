// Vite 환경 변수 가져오기
// Jest 환경에서는 process.env, 브라우저에서는 import.meta.env 사용
function getEnv(key: string, defaultValue: string = ''): string {
  // 테스트 환경 (Node.js)
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }

  // 브라우저 환경 (Vite)
  if (typeof window !== 'undefined') {
    // @ts-ignore - Vite의 import.meta.env는 빌드 타임에 주입됨
    return import.meta?.env?.[key] || defaultValue;
  }

  return defaultValue;
}

export const API_BASE_URL = getEnv('VITE_API_BASE_URL', 'https://pixabay.com/api');
export const PIXABAY_API_KEY = getEnv('VITE_PIXABAY_API_KEY', '');
