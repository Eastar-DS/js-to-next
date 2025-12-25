import { queryClient } from '@/shared/api/queryClient';
import { QueryClient } from '@tanstack/react-query';

describe('QueryClient 설정', () => {
  it('QueryClient 인스턴스를 생성해야 한다', () => {
    expect(queryClient).toBeInstanceOf(QueryClient);
  });

  it('기본 옵션이 올바르게 설정되어야 한다', () => {
    const defaultOptions = queryClient.getDefaultOptions();

    expect(defaultOptions.queries?.staleTime).toBe(5 * 60 * 1000); // 5분
    expect(defaultOptions.queries?.gcTime).toBe(10 * 60 * 1000); // 10분
    expect(defaultOptions.queries?.retry).toBe(1);
  });

  it('refetchOnWindowFocus가 false로 설정되어야 한다', () => {
    const defaultOptions = queryClient.getDefaultOptions();

    expect(defaultOptions.queries?.refetchOnWindowFocus).toBe(false);
  });
});
