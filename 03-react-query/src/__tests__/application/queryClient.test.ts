/**
 * QueryClient 설정 테스트
 * Application Layer - React Query 설정
 */

import { QueryClient } from '@tanstack/react-query';
import { createQueryClient } from '@application/queryClient';

describe('QueryClient 설정', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createQueryClient();
  });

  afterEach(() => {
    queryClient.clear();
  });

  describe('기본 옵션', () => {
    it('staleTime이 5분으로 설정되어야 함', () => {
      const defaultOptions = queryClient.getDefaultOptions();

      expect(defaultOptions.queries?.staleTime).toBe(5 * 60 * 1000); // 5분
    });

    it('gcTime이 10분으로 설정되어야 함', () => {
      const defaultOptions = queryClient.getDefaultOptions();

      expect(defaultOptions.queries?.gcTime).toBe(10 * 60 * 1000); // 10분
    });

    it('retry가 1로 설정되어야 함', () => {
      const defaultOptions = queryClient.getDefaultOptions();

      expect(defaultOptions.queries?.retry).toBe(1);
    });
  });
});
