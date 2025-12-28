import { useQueryClient } from '@tanstack/react-query';
import { getImagesByPage } from '@/entities/image/api/imageApi';

export const usePrefetch = (
  query: string,
  currentPage: number,
  totalPages: number
) => {
  const queryClient = useQueryClient();

  const prefetchNextPage = () => {
    // 빈 query이거나 totalPages가 0이면 prefetch 하지 않음
    if (!query || totalPages === 0) {
      return;
    }

    const nextPage = currentPage + 1;

    // 마지막 페이지이면 prefetch 하지 않음
    if (nextPage > totalPages) {
      return;
    }

    // 다음 페이지 prefetch
    queryClient.prefetchQuery({
      queryKey: ['images', 'page', query, nextPage],
      queryFn: () => getImagesByPage(query, nextPage),
    });
  };

  return {
    prefetchNextPage,
  };
};
