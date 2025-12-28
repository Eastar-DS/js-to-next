import { render, screen } from '@testing-library/react';
import { ImageGrid } from '@/entities/image/ui/ImageGrid';
import type { Image } from '@/entities/image/model/types';

describe('ImageGrid 컴포넌트', () => {
  const mockImages: Image[] = [
    {
      id: 1,
      tags: ['nature', 'landscape'],
      previewURL: 'https://example.com/preview1.jpg',
      webformatURL: 'https://example.com/image1.jpg',
      largeImageURL: 'https://example.com/large1.jpg',
      user: 'user1',
      likes: 100,
      views: 500,
      downloads: 25,
    },
    {
      id: 2,
      tags: ['city', 'architecture'],
      previewURL: 'https://example.com/preview2.jpg',
      webformatURL: 'https://example.com/image2.jpg',
      largeImageURL: 'https://example.com/large2.jpg',
      user: 'user2',
      likes: 200,
      views: 1000,
      downloads: 50,
    },
  ];

  it('Image[] 타입의 props를 받아 렌더링해야 한다', () => {
    render(<ImageGrid images={mockImages} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
  });

  it('Grid 레이아웃을 가져야 한다', () => {
    const { container } = render(<ImageGrid images={mockImages} />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toMatch(/grid/);
  });

  it('각 이미지를 ImageCard로 렌더링해야 한다', () => {
    render(<ImageGrid images={mockImages} />);
    expect(screen.getByText(/user1/i)).toBeInTheDocument();
    expect(screen.getByText(/user2/i)).toBeInTheDocument();
  });

  it('빈 배열에 대해 Empty state를 표시해야 한다', () => {
    render(<ImageGrid images={[]} />);
    expect(screen.getByText(/no images found/i)).toBeInTheDocument();
  });

  it('이미지가 없을 때 검색 안내 메시지를 표시해야 한다', () => {
    render(<ImageGrid images={[]} />);
    expect(
      screen.getByText(/try searching for something/i)
    ).toBeInTheDocument();
  });

  it('반응형 그리드 클래스를 가져야 한다', () => {
    const { container } = render(<ImageGrid images={mockImages} />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toMatch(/grid-cols/);
  });

  it('gap 클래스를 가져야 한다', () => {
    const { container } = render(<ImageGrid images={mockImages} />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toMatch(/gap/);
  });

  it('이미지 개수만큼 ImageCard가 렌더링되어야 한다', () => {
    render(<ImageGrid images={mockImages} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockImages.length);
  });
});
