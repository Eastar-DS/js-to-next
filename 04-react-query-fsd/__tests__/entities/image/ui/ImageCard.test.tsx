import { render, screen } from '@testing-library/react';
import { ImageCard } from '@/entities/image/ui/ImageCard';
import type { Image } from '@/entities/image/model/types';

describe('ImageCard 컴포넌트', () => {
  const mockImage: Image = {
    id: 123456,
    tags: ['nature', 'landscape', 'mountain'],
    webformatURL: 'https://example.com/image.jpg',
    largeImageURL: 'https://example.com/large.jpg',
    user: 'photographer',
    likes: 200,
    views: 1000,
  };

  it('Image 타입의 props를 받아 렌더링해야 한다', () => {
    render(<ImageCard image={mockImage} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('이미지 썸네일을 렌더링해야 한다', () => {
    render(<ImageCard image={mockImage} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockImage.webformatURL);
  });

  it('이미지에 alt 속성이 있어야 한다', () => {
    render(<ImageCard image={mockImage} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt');
  });

  it('사용자 이름을 표시해야 한다', () => {
    render(<ImageCard image={mockImage} />);
    expect(screen.getByText(/photographer/i)).toBeInTheDocument();
  });

  it('좋아요 수를 표시해야 한다', () => {
    render(<ImageCard image={mockImage} />);
    expect(screen.getByText(/200/)).toBeInTheDocument();
  });

  it('조회수를 표시해야 한다', () => {
    render(<ImageCard image={mockImage} />);
    expect(screen.getByText(/1000/)).toBeInTheDocument();
  });

  it('태그를 표시해야 한다', () => {
    render(<ImageCard image={mockImage} />);
    expect(screen.getByText(/nature/i)).toBeInTheDocument();
  });

  it('Card 컴포넌트를 사용해야 한다', () => {
    const { container } = render(<ImageCard image={mockImage} />);
    // Card 컴포넌트는 특정 클래스나 구조를 가지므로 확인
    expect(container.querySelector('[class*="rounded"]')).toBeInTheDocument();
  });

  it('hover 효과를 위한 클래스를 가져야 한다', () => {
    const { container } = render(<ImageCard image={mockImage} />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toMatch(/hover/);
  });

  it('반응형 디자인 클래스를 가져야 한다', () => {
    const { container } = render(<ImageCard image={mockImage} />);
    // Tailwind의 반응형 클래스 확인 (w-full 등)
    expect(container.querySelector('[class*="w-"]')).toBeInTheDocument();
  });
});
