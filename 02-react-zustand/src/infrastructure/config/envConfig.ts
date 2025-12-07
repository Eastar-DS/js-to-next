/**
 * 환경변수 관리 - EnvConfig 클래스
 * 테스트 가능한 순수 클래스 (import.meta 없음)
 */

/**
 * 환경 타입
 */
export type Environment = 'development' | 'staging' | 'production' | 'test';

/**
 * 환경변수 인터페이스
 */
export interface EnvironmentConfig {
  NODE_ENV: Environment;
  PIXABAY_API_KEY: string;
  API_BASE_URL: string;
  LOG_LEVEL: string;
  ENABLE_ANALYTICS: boolean;
}

/**
 * 환경변수 소스 인터페이스 (의존성 주입용)
 */
export interface EnvSource {
  MODE?: string;
  VITE_PIXABAY_API_KEY?: string;
  VITE_API_BASE_URL?: string;
  VITE_LOG_LEVEL?: string;
  VITE_ENABLE_ANALYTICS?: string;
}

/**
 * 환경변수 검증 및 기본값 설정
 */
export class EnvConfig {
  private config: EnvironmentConfig;

  /**
   * 의존성 주입 패턴: 환경변수 소스를 외부에서 주입받음
   * @param envSource - 환경변수 소스 객체
   */
  constructor(envSource: EnvSource) {
    this.config = this.loadFromSource(envSource);
    this.validate();
  }

  /**
   * 제공된 환경변수 소스에서 로드
   */
  private loadFromSource(source: EnvSource): EnvironmentConfig {
    // undefined나 없을 때만 기본값 사용, 빈 문자열은 그대로 유지 (validate에서 에러)
    const apiKey = source.VITE_PIXABAY_API_KEY !== undefined
      ? source.VITE_PIXABAY_API_KEY
      : 'test_api_key';

    return {
      NODE_ENV: (source.MODE as Environment) || 'development',
      PIXABAY_API_KEY: apiKey,
      API_BASE_URL: source.VITE_API_BASE_URL || 'https://pixabay.com/api/',
      LOG_LEVEL: source.VITE_LOG_LEVEL || 'info',
      ENABLE_ANALYTICS: source.VITE_ENABLE_ANALYTICS === 'true' || false,
    };
  }

  /**
   * 환경변수 검증
   */
  private validate(): void {
    const { PIXABAY_API_KEY } = this.config;

    if (!PIXABAY_API_KEY || PIXABAY_API_KEY.trim() === '') {
      throw new Error('PIXABAY_API_KEY must not be empty');
    }

    // 프로덕션에서는 더 엄격한 검증
    if (this.isProduction() && PIXABAY_API_KEY.includes('test')) {
      console.warn('Warning: Using test API key in production');
    }
  }

  /**
   * 환경 체크 메서드들
   */
  isProduction(): boolean {
    return this.config.NODE_ENV === 'production';
  }

  isDevelopment(): boolean {
    return this.config.NODE_ENV === 'development';
  }

  isTest(): boolean {
    return this.config.NODE_ENV === 'test';
  }

  /**
   * 환경변수 접근자
   */
  get<K extends keyof EnvironmentConfig>(key: K): EnvironmentConfig[K] {
    return this.config[key];
  }

  /**
   * 전체 설정 반환 (읽기 전용)
   */
  getAll(): Readonly<EnvironmentConfig> {
    return Object.freeze({ ...this.config });
  }
}
