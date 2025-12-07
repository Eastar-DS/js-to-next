/**
 * 환경변수 관리 - 싱글톤 인스턴스 (프로덕션용)
 *
 * 이 파일은 import.meta.env를 사용하므로 Jest 테스트에서는 import하지 않습니다.
 * 테스트에서는 envConfig.ts의 EnvConfig 클래스를 직접 사용하세요.
 */

import { EnvConfig } from './envConfig';

/**
 * Vite의 import.meta.env에서 환경변수 로드
 */
function getViteEnvSource() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { env } = import.meta as any;
  return {
    MODE: env.MODE,
    VITE_PIXABAY_API_KEY: env.VITE_PIXABAY_API_KEY,
    VITE_API_BASE_URL: env.VITE_API_BASE_URL,
    VITE_LOG_LEVEL: env.VITE_LOG_LEVEL,
    VITE_ENABLE_ANALYTICS: env.VITE_ENABLE_ANALYTICS,
  };
}

/**
 * 싱글톤 인스턴스
 */
export const env = new EnvConfig(getViteEnvSource());

// 타입도 함께 export
export type { Environment, EnvironmentConfig, EnvSource } from './envConfig';
