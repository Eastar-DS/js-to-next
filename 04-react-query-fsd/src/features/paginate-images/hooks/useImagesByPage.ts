import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getImagesByPage } from '@/entities/image/api/imageApi';
import type { Image } from '@/entities/image/model/types';

export const useImagesByPage = (query: string, page: number) => {
  return useQuery<Image[], Error>({
    queryKey: ['images', 'page', query, page],
    queryFn: () => getImagesByPage(query, page),
    enabled: query.length > 0,
    placeholderData: keepPreviousData,
  });
};
