import { useQuery } from '@tanstack/react-query';
import { getImages } from '@/entities/image/api/imageApi';
import type { Image } from '@/entities/image/model/types';

export const useImageSearch = (query: string) => {
  return useQuery<Image[], Error>({
    queryKey: ['images', 'search', query],
    queryFn: () => getImages(query),
    enabled: query.length > 0,
  });
};
