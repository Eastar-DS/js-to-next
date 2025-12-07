/**
 * EnvConfig 테스트
 * Infrastructure Layer - 환경변수 관리
 *
 * 의존성 주입 패턴을 사용하여 실제 EnvConfig 클래스를 테스트합니다.
 */

import { EnvConfig, type Environment, type EnvSource } from '@infrastructure/config/envConfig';

describe('EnvConfig', () => {
  describe('생성자 및 환경변수 로드', () => {
    it('should load environment variables from provided source', () => {
      // Given: 테스트용 환경변수 소스
      const mockEnvSource: EnvSource = {
        MODE: 'test',
        VITE_PIXABAY_API_KEY: 'test_key_123',
        VITE_API_BASE_URL: 'https://test.api.com',
        VITE_LOG_LEVEL: 'debug',
        VITE_ENABLE_ANALYTICS: 'true',
      };

      // When: EnvConfig 인스턴스 생성
      const envConfig = new EnvConfig(mockEnvSource);

      // Then: 제공된 값으로 설정되어야 함
      expect(envConfig.get('NODE_ENV')).toBe('test');
      expect(envConfig.get('PIXABAY_API_KEY')).toBe('test_key_123');
      expect(envConfig.get('API_BASE_URL')).toBe('https://test.api.com');
      expect(envConfig.get('LOG_LEVEL')).toBe('debug');
      expect(envConfig.get('ENABLE_ANALYTICS')).toBe(true);
    });

    it('should use default values when source values are missing', () => {
      // Given: 빈 환경변수 소스
      const mockEnvSource: EnvSource = {};

      // When: EnvConfig 인스턴스 생성
      const envConfig = new EnvConfig(mockEnvSource);

      // Then: 기본값이 사용되어야 함
      expect(envConfig.get('NODE_ENV')).toBe('development');
      expect(envConfig.get('PIXABAY_API_KEY')).toBe('test_api_key');
      expect(envConfig.get('API_BASE_URL')).toBe('https://pixabay.com/api/');
      expect(envConfig.get('LOG_LEVEL')).toBe('info');
      expect(envConfig.get('ENABLE_ANALYTICS')).toBe(false);
    });

    it('should convert string "true" to boolean for ENABLE_ANALYTICS', () => {
      // Given: 문자열 "true"
      const mockEnvSource: EnvSource = {
        VITE_ENABLE_ANALYTICS: 'true',
      };

      // When: EnvConfig 생성
      const envConfig = new EnvConfig(mockEnvSource);

      // Then: boolean true로 변환되어야 함
      expect(envConfig.get('ENABLE_ANALYTICS')).toBe(true);
      expect(typeof envConfig.get('ENABLE_ANALYTICS')).toBe('boolean');
    });

    it('should convert non-"true" string to false for ENABLE_ANALYTICS', () => {
      // Given: "true"가 아닌 문자열
      const mockEnvSource: EnvSource = {
        VITE_ENABLE_ANALYTICS: 'false',
      };

      // When: EnvConfig 생성
      const envConfig = new EnvConfig(mockEnvSource);

      // Then: false로 변환되어야 함
      expect(envConfig.get('ENABLE_ANALYTICS')).toBe(false);
    });
  });

  describe('환경변수 검증', () => {
    it('should throw error when API key is empty string', () => {
      // Given: 빈 API 키
      const mockEnvSource: EnvSource = {
        VITE_PIXABAY_API_KEY: '',
      };

      // When & Then: 에러가 발생해야 함
      expect(() => {
        new EnvConfig(mockEnvSource);
      }).toThrow('PIXABAY_API_KEY must not be empty');
    });

    it('should throw error when API key is only whitespace', () => {
      // Given: 공백만 있는 API 키
      const mockEnvSource: EnvSource = {
        VITE_PIXABAY_API_KEY: '   ',
      };

      // When & Then: 에러가 발생해야 함
      expect(() => {
        new EnvConfig(mockEnvSource);
      }).toThrow('PIXABAY_API_KEY must not be empty');
    });

    it('should warn when using test key in production', () => {
      // Given: 프로덕션 환경 + 테스트 API 키
      const mockEnvSource: EnvSource = {
        MODE: 'production',
        VITE_PIXABAY_API_KEY: 'test_key',
      };

      // When: console.warn 스파이
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      // When: EnvConfig 생성
      new EnvConfig(mockEnvSource);

      // Then: 경고가 출력되어야 함
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Warning: Using test API key in production'
      );

      // Cleanup
      consoleWarnSpy.mockRestore();
    });

    it('should not warn when using real key in production', () => {
      // Given: 프로덕션 환경 + 실제 API 키
      const mockEnvSource: EnvSource = {
        MODE: 'production',
        VITE_PIXABAY_API_KEY: 'real_production_key_abc123',
      };

      // When: console.warn 스파이
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      // When: EnvConfig 생성
      new EnvConfig(mockEnvSource);

      // Then: 경고가 출력되지 않아야 함
      expect(consoleWarnSpy).not.toHaveBeenCalled();

      // Cleanup
      consoleWarnSpy.mockRestore();
    });
  });

  describe('환경 체크 메서드', () => {
    it('should correctly identify production environment', () => {
      // Given: 프로덕션 환경
      const mockEnvSource: EnvSource = {
        MODE: 'production',
        VITE_PIXABAY_API_KEY: 'prod_key',
      };
      const envConfig = new EnvConfig(mockEnvSource);

      // When & Then
      expect(envConfig.isProduction()).toBe(true);
      expect(envConfig.isDevelopment()).toBe(false);
      expect(envConfig.isTest()).toBe(false);
    });

    it('should correctly identify development environment', () => {
      // Given: 개발 환경
      const mockEnvSource: EnvSource = {
        MODE: 'development',
        VITE_PIXABAY_API_KEY: 'dev_key',
      };
      const envConfig = new EnvConfig(mockEnvSource);

      // When & Then
      expect(envConfig.isProduction()).toBe(false);
      expect(envConfig.isDevelopment()).toBe(true);
      expect(envConfig.isTest()).toBe(false);
    });

    it('should correctly identify test environment', () => {
      // Given: 테스트 환경
      const mockEnvSource: EnvSource = {
        MODE: 'test',
        VITE_PIXABAY_API_KEY: 'test_key',
      };
      const envConfig = new EnvConfig(mockEnvSource);

      // When & Then
      expect(envConfig.isProduction()).toBe(false);
      expect(envConfig.isDevelopment()).toBe(false);
      expect(envConfig.isTest()).toBe(true);
    });
  });

  describe('환경변수 접근자', () => {
    it('should get specific environment variable', () => {
      // Given: 환경변수 소스
      const mockEnvSource: EnvSource = {
        MODE: 'test',
        VITE_PIXABAY_API_KEY: 'my_api_key',
        VITE_API_BASE_URL: 'https://custom.api.com',
      };
      const envConfig = new EnvConfig(mockEnvSource);

      // When & Then: get 메서드로 특정 변수 조회
      expect(envConfig.get('NODE_ENV')).toBe('test');
      expect(envConfig.get('PIXABAY_API_KEY')).toBe('my_api_key');
      expect(envConfig.get('API_BASE_URL')).toBe('https://custom.api.com');
    });

    it('should return all config as frozen object', () => {
      // Given: 환경변수 소스
      const mockEnvSource: EnvSource = {
        MODE: 'test',
        VITE_PIXABAY_API_KEY: 'test_key',
      };
      const envConfig = new EnvConfig(mockEnvSource);

      // When: getAll 호출
      const config = envConfig.getAll();

      // Then: frozen 객체여야 함
      expect(Object.isFrozen(config)).toBe(true);

      // Then: 수정 시도 시 에러
      expect(() => {
        // @ts-expect-error - Testing readonly behavior
        config.NODE_ENV = 'production';
      }).toThrow();
    });

    it('should return new frozen object on each getAll call', () => {
      // Given: EnvConfig 인스턴스
      const mockEnvSource: EnvSource = {
        VITE_PIXABAY_API_KEY: 'test_key',
      };
      const envConfig = new EnvConfig(mockEnvSource);

      // When: getAll을 두 번 호출
      const config1 = envConfig.getAll();
      const config2 = envConfig.getAll();

      // Then: 값은 같지만 다른 객체여야 함
      expect(config1).toEqual(config2);
      expect(config1).not.toBe(config2);
    });
  });

  describe('Environment 타입', () => {
    it('should accept all valid environment values', () => {
      // Given: 모든 유효한 환경 값
      const validEnvs: Environment[] = [
        'development',
        'staging',
        'production',
        'test',
      ];

      // When & Then: 각각 EnvConfig 생성 가능해야 함
      validEnvs.forEach((env) => {
        const mockEnvSource: EnvSource = {
          MODE: env,
          VITE_PIXABAY_API_KEY: 'test_key',
        };
        const envConfig = new EnvConfig(mockEnvSource);
        expect(envConfig.get('NODE_ENV')).toBe(env);
      });
    });
  });

  describe('타입 안전성', () => {
    it('should enforce correct return types', () => {
      // Given: EnvConfig 인스턴스
      const mockEnvSource: EnvSource = {
        MODE: 'test',
        VITE_PIXABAY_API_KEY: 'test_key',
        VITE_API_BASE_URL: 'https://test.com',
        VITE_LOG_LEVEL: 'debug',
        VITE_ENABLE_ANALYTICS: 'true',
      };
      const envConfig = new EnvConfig(mockEnvSource);

      // When: 각 환경변수 조회
      const nodeEnv = envConfig.get('NODE_ENV');
      const apiKey = envConfig.get('PIXABAY_API_KEY');
      const baseUrl = envConfig.get('API_BASE_URL');
      const logLevel = envConfig.get('LOG_LEVEL');
      const analytics = envConfig.get('ENABLE_ANALYTICS');

      // Then: 올바른 타입이어야 함
      expect(typeof nodeEnv).toBe('string');
      expect(typeof apiKey).toBe('string');
      expect(typeof baseUrl).toBe('string');
      expect(typeof logLevel).toBe('string');
      expect(typeof analytics).toBe('boolean');
    });
  });

  describe('엣지 케이스', () => {
    it('should handle partial environment source', () => {
      // Given: 일부만 제공된 환경변수
      const mockEnvSource: EnvSource = {
        VITE_PIXABAY_API_KEY: 'partial_key',
        VITE_LOG_LEVEL: 'warn',
      };

      // When: EnvConfig 생성
      const envConfig = new EnvConfig(mockEnvSource);

      // Then: 제공된 값은 사용하고 나머지는 기본값
      expect(envConfig.get('PIXABAY_API_KEY')).toBe('partial_key');
      expect(envConfig.get('LOG_LEVEL')).toBe('warn');
      expect(envConfig.get('NODE_ENV')).toBe('development'); // 기본값
      expect(envConfig.get('API_BASE_URL')).toBe('https://pixabay.com/api/'); // 기본값
    });

    it('should handle URL with trailing slash', () => {
      // Given: 끝에 슬래시가 있는 URL
      const mockEnvSource: EnvSource = {
        VITE_PIXABAY_API_KEY: 'test_key',
        VITE_API_BASE_URL: 'https://api.example.com/',
      };

      // When: EnvConfig 생성
      const envConfig = new EnvConfig(mockEnvSource);

      // Then: URL이 그대로 저장되어야 함
      expect(envConfig.get('API_BASE_URL')).toBe('https://api.example.com/');
    });
  });
});
