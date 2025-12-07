/**
 * 환경변수 관리
 * 큰 프로젝트에서는 환경변수를 타입 안전하게 관리합니다.
 */

/**
 * 환경 타입
 */
export type Environment = 'development' | 'staging' | 'production' | 'test';

/**
 * 환경변수 인터페이스
 */
interface EnvironmentConfig {
  NODE_ENV: Environment;
  PIXABAY_API_KEY: string;
  API_BASE_URL: string;
  LOG_LEVEL: string;
  ENABLE_ANALYTICS: boolean;
}

/**
 * 환경변수 검증 및 기본값 설정
 */
class EnvConfig {
  private config: EnvironmentConfig;

  constructor() {
    this.config = this.loadConfig();
    this.validate();
  }

  /**
   * 환경변수 로드
   */
  private loadConfig(): EnvironmentConfig {
    return this.loadFromViteEnv();
  }

  /**
   * Vite 환경변수에서 로드
   */
  private loadFromViteEnv(): EnvironmentConfig {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { env } = import.meta as any;
    return {
      NODE_ENV: (env.MODE as Environment) || 'development',
      PIXABAY_API_KEY:
        env.VITE_PIXABAY_API_KEY ||
        EnvConfig.throwMissingEnv('VITE_PIXABAY_API_KEY'),
      API_BASE_URL: env.VITE_API_BASE_URL || 'https://pixabay.com/api/',
      LOG_LEVEL: env.VITE_LOG_LEVEL || 'info',
      ENABLE_ANALYTICS: env.VITE_ENABLE_ANALYTICS === 'true' || false,
    };
  }

  /**
   * 필수 환경변수 누락 시 에러
   */
  private static throwMissingEnv(key: string): never {
    throw new Error(`Missing required environment variable: ${key}`);
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

/**
 * 싱글톤 인스턴스
 */
export const env = new EnvConfig();
