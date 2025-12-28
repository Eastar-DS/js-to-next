import type { Image } from '@/entities/image/model/types';

export const createMockImage = (overrides?: Partial<Image>): Image => ({
  id: 1,
  tags: ['nature', 'landscape'],
  previewURL: 'https://example.com/preview.jpg',
  webformatURL: 'https://example.com/image.jpg',
  largeImageURL: 'https://example.com/large.jpg',
  user: 'testuser',
  likes: 100,
  views: 1000,
  downloads: 50,
  ...overrides,
});

export const createMockImages = (count: number = 2): Image[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockImage({
      id: index + 1,
      user: `user${index + 1}`,
      likes: (index + 1) * 100,
      views: (index + 1) * 500,
      downloads: (index + 1) * 25,
    })
  );
};
