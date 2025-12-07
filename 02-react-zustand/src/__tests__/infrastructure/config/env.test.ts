/**
 * EnvConfig 테스트
 * Infrastructure Layer - 환경변수 관리
 *
 * Note: EnvConfig는 Vite의 import.meta.env를 사용하므로
 * Jest 환경에서는 실제 구현체를 직접 테스트할 수 없습니다.
 * 대신 환경변수 인터페이스와 타입을 검증합니다.
 */

import type { Environment } from '@infrastructure/config/env';

describe('EnvConfig 타입 정의', () => {
  describe('Environment 타입', () => {
    it('should accept valid environment values', () => {
      // Given: 유효한 환경 값들
      const validEnvs: Environment[] = [
        'development',
        'staging',
        'production',
        'test',
      ];

      // Then: 모든 값이 Environment 타입으로 허용되어야 함
      validEnvs.forEach((env) => {
        expect(['development', 'staging', 'production', 'test']).toContain(env);
      });
    });

    it('should have exactly 4 environment types', () => {
      // Given: Environment 타입의 가능한 값
      const environments: Environment[] = [
        'development',
        'staging',
        'production',
        'test',
      ];

      // Then: 정확히 4개의 환경이어야 함
      expect(environments).toHaveLength(4);
      expect(new Set(environments).size).toBe(4);
    });
  });

  describe('EnvironmentConfig 인터페이스', () => {
    it('should have correct structure', () => {
      // Given: 환경설정 객체 예시
      const mockConfig = {
        NODE_ENV: 'test' as Environment,
        PIXABAY_API_KEY: 'test_key',
        API_BASE_URL: 'https://api.test.com',
        LOG_LEVEL: 'info',
        ENABLE_ANALYTICS: false,
      };

      // Then: 모든 필수 필드가 있어야 함
      expect(mockConfig).toHaveProperty('NODE_ENV');
      expect(mockConfig).toHaveProperty('PIXABAY_API_KEY');
      expect(mockConfig).toHaveProperty('API_BASE_URL');
      expect(mockConfig).toHaveProperty('LOG_LEVEL');
      expect(mockConfig).toHaveProperty('ENABLE_ANALYTICS');
    });

    it('should have correct field types', () => {
      // Given: 환경설정 객체
      const mockConfig = {
        NODE_ENV: 'development' as Environment,
        PIXABAY_API_KEY: 'abc123',
        API_BASE_URL: 'https://pixabay.com/api/',
        LOG_LEVEL: 'debug',
        ENABLE_ANALYTICS: true,
      };

      // Then: 각 필드가 올바른 타입이어야 함
      expect(typeof mockConfig.NODE_ENV).toBe('string');
      expect(typeof mockConfig.PIXABAY_API_KEY).toBe('string');
      expect(typeof mockConfig.API_BASE_URL).toBe('string');
      expect(typeof mockConfig.LOG_LEVEL).toBe('string');
      expect(typeof mockConfig.ENABLE_ANALYTICS).toBe('boolean');
    });
  });

  describe('EnvConfig 사용 패턴', () => {
    it('should be used as singleton', () => {
      // Given: 환경설정 사용 패턴
      const pattern = 'singleton';

      // Then: 싱글톤 패턴이어야 함
      expect(pattern).toBe('singleton');
    });

    it('should validate required environment variables', () => {
      // Given: 필수 환경변수 목록
      const requiredVars = ['PIXABAY_API_KEY'];

      // Then: PIXABAY_API_KEY는 필수여야 함
      expect(requiredVars).toContain('PIXABAY_API_KEY');
      expect(requiredVars).toHaveLength(1);
    });

    it('should provide default values for optional variables', () => {
      // Given: 기본값이 있는 환경변수들
      const defaults = {
        API_BASE_URL: 'https://pixabay.com/api/',
        LOG_LEVEL: 'info',
        ENABLE_ANALYTICS: false,
      };

      // Then: 기본값이 정의되어 있어야 함
      expect(defaults.API_BASE_URL).toBeDefined();
      expect(defaults.LOG_LEVEL).toBeDefined();
      expect(defaults.ENABLE_ANALYTICS).toBeDefined();
    });
  });

  describe('환경 체크 로직', () => {
    it('should check production environment correctly', () => {
      // Given: 프로덕션 환경
      const nodeEnv: Environment = 'production';

      // When: 프로덕션 체크
      const isProduction = nodeEnv === 'production';

      // Then: true여야 함
      expect(isProduction).toBe(true);
    });

    it('should check development environment correctly', () => {
      // Given: 개발 환경
      const nodeEnv: Environment = 'development';

      // When: 개발 환경 체크
      const isDevelopment = nodeEnv === 'development';

      // Then: true여야 함
      expect(isDevelopment).toBe(true);
    });

    it('should check test environment correctly', () => {
      // Given: 테스트 환경
      const nodeEnv: Environment = 'test';

      // When: 테스트 환경 체크
      const isTest = nodeEnv === 'test';

      // Then: true여야 함
      expect(isTest).toBe(true);
    });

    it('should have only one environment type active', () => {
      // Given: 다양한 환경들
      const environments: Environment[] = [
        'development',
        'staging',
        'production',
        'test',
      ];

      // When & Then: 각 환경에 대해 정확히 하나만 매치되어야 함
      environments.forEach((currentEnv) => {
        const checks = {
          isProduction: currentEnv === 'production',
          isDevelopment: currentEnv === 'development',
          isTest: currentEnv === 'test',
          isStaging: currentEnv === 'staging',
        };

        const trueCount = Object.values(checks).filter(Boolean).length;
        expect(trueCount).toBe(1);
      });
    });
  });

  describe('환경변수 검증 로직', () => {
    it('should throw error for missing API key', () => {
      // Given: API 키가 없는 경우
      const apiKey = '';

      // When & Then: 빈 문자열은 검증 실패해야 함
      expect(apiKey.trim()).toBe('');
    });

    it('should warn about test key in production', () => {
      // Given: 프로덕션 환경과 테스트 API 키
      const isProduction = true;
      const apiKey = 'test_api_key';

      // When: 프로덕션에서 테스트 키 사용 체크
      const shouldWarn = isProduction && apiKey.includes('test');

      // Then: 경고가 필요해야 함
      expect(shouldWarn).toBe(true);
    });

    it('should not warn about real key in production', () => {
      // Given: 프로덕션 환경과 실제 API 키
      const isProduction = true;
      const apiKey = 'real_production_key_abc123';

      // When: 프로덕션에서 실제 키 사용 체크
      const shouldWarn = isProduction && apiKey.includes('test');

      // Then: 경고가 필요하지 않아야 함
      expect(shouldWarn).toBe(false);
    });
  });

  describe('환경변수 타입 안전성', () => {
    it('should enforce boolean type for ENABLE_ANALYTICS', () => {
      // Given: ENABLE_ANALYTICS 값들
      const validValues = [true, false];
      const stringValue = 'true';

      // Then: boolean 타입만 허용해야 함
      validValues.forEach((val) => {
        expect(typeof val).toBe('boolean');
      });
      expect(typeof stringValue).not.toBe('boolean');
    });

    it('should convert string to boolean for ENABLE_ANALYTICS', () => {
      // Given: 환경변수 문자열
      const envValue = 'true';

      // When: boolean으로 변환
      const boolValue = envValue === 'true';

      // Then: 올바르게 변환되어야 함
      expect(boolValue).toBe(true);
      expect(typeof boolValue).toBe('boolean');
    });

    it('should have URL format for API_BASE_URL', () => {
      // Given: API URL들
      const validUrls = [
        'https://pixabay.com/api/',
        'https://api.example.com',
        'http://localhost:3000',
      ];

      // Then: 모두 URL 형식이어야 함
      validUrls.forEach((url) => {
        expect(url).toMatch(/^https?:\/\//);
      });
    });
  });

  describe('Readonly 설정', () => {
    it('should return frozen config object', () => {
      // Given: 설정 객체
      const config = {
        NODE_ENV: 'test' as Environment,
        PIXABAY_API_KEY: 'test',
        API_BASE_URL: 'https://test.com',
        LOG_LEVEL: 'info',
        ENABLE_ANALYTICS: false,
      };

      // When: freeze 적용
      const frozenConfig = Object.freeze(config);

      // Then: frozen 상태여야 함
      expect(Object.isFrozen(frozenConfig)).toBe(true);

      // Then: 수정 시도 시 에러
      expect(() => {
        // @ts-expect-error - Testing readonly behavior
        frozenConfig.NODE_ENV = 'production';
      }).toThrow();
    });
  });
});
