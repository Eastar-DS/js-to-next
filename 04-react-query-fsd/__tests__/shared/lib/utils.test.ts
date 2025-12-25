import { cn } from '@/shared/lib/utils';
import { API_BASE_URL, PIXABAY_API_KEY } from '@/shared/lib/env';
import { ITEMS_PER_PAGE } from '@/shared/lib/constants';

describe('유틸리티 함수', () => {
  describe('cn 함수', () => {
    it('여러 클래스명을 병합해야 한다', () => {
      const result = cn('text-red-500', 'bg-blue-500');
      expect(result).toContain('text-red-500');
      expect(result).toContain('bg-blue-500');
    });

    it('조건부 클래스명을 처리해야 한다', () => {
      const isActive = true;
      const result = cn('base-class', isActive && 'active-class');
      expect(result).toContain('base-class');
      expect(result).toContain('active-class');
    });
  });

  describe('환경 변수 (env.ts)', () => {
    it('API_BASE_URL이 정의되어 있어야 한다', () => {
      expect(API_BASE_URL).toBeDefined();
    });

    it('PIXABAY_API_KEY가 정의되어 있어야 한다', () => {
      expect(PIXABAY_API_KEY).toBeDefined();
    });
  });

  describe('상수 (constants.ts)', () => {
    it('ITEMS_PER_PAGE가 정의되어 있어야 한다', () => {
      expect(ITEMS_PER_PAGE).toBeDefined();
      expect(typeof ITEMS_PER_PAGE).toBe('number');
    });

    it('ITEMS_PER_PAGE가 양수여야 한다', () => {
      expect(ITEMS_PER_PAGE).toBeGreaterThan(0);
    });
  });
});
