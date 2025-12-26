import * as imageEntity from '@/entities/image';
import type { Image } from '@/entities/image';

describe('entities/image Public API', () => {
  it('Image 타입을 import 할 수 있어야 한다', () => {
    const mockImage: Image = {
      id: 1,
      tags: ['test'],
      webformatURL: 'test.jpg',
      largeImageURL: 'large.jpg',
      user: 'user',
      likes: 100,
      views: 500,
    };
    expect(mockImage).toBeDefined();
  });

  it('imageApi를 export 해야 한다', () => {
    expect(imageEntity).toHaveProperty('imageApi');
    expect(imageEntity.imageApi).toHaveProperty('getImages');
    expect(imageEntity.imageApi).toHaveProperty('getImagesByPage');
  });

  it('ImageCard 컴포넌트를 export 해야 한다', () => {
    expect(imageEntity).toHaveProperty('ImageCard');
  });

  it('ImageGrid 컴포넌트를 export 해야 한다', () => {
    expect(imageEntity).toHaveProperty('ImageGrid');
  });
});
