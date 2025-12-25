import { httpClient } from '@/shared/api/httpClient';
import { PIXABAY_API_KEY } from '@/shared/lib/env';
import type { PixabayResponse, Image } from '@/entities/image/model/types';
import { toImages } from '@/entities/image/model/types';

export async function getImages(query: string): Promise<Image[]> {
  if (!query || query.trim() === '') {
    throw new Error('Query parameter is required');
  }

  try {
    const response = await httpClient.get<PixabayResponse>('/', {
      key: PIXABAY_API_KEY,
      q: query,
    });

    return toImages(response.hits);
  } catch (error) {
    throw error;
  }
}

export async function getImagesByPage(
  query: string,
  page: number
): Promise<Image[]> {
  if (!query || query.trim() === '') {
    throw new Error('Query parameter is required');
  }

  if (page < 1) {
    throw new Error('Page must be greater than 0');
  }

  try {
    const response = await httpClient.get<PixabayResponse>('/', {
      key: PIXABAY_API_KEY,
      q: query,
      page,
    });

    return toImages(response.hits);
  } catch (error) {
    throw error;
  }
}
