import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분
      gcTime: 10 * 60 * 1000, // 10분 (cacheTime 대신 gcTime 사용)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
