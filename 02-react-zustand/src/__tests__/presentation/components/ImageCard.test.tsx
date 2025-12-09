/**
 * ImageCard 컴포넌트 테스트
 * Test 14: Image 엔티티 데이터 표시, 타입 안전한 props 전달, 카드 레이아웃 및 호버 효과
 */

import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ImageCard } from '@presentation/components/ImageCard/ImageCard';
import { theme } from '@presentation/styles/theme';
import type { Image } from '@domain/entities/Image';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

const mockImage: Image = {
  id: 12345,
  previewURL: 'https://example.com/preview.jpg',
  largeImageURL: 'https://example.com/large.jpg',
  tags: 'nature, landscape, mountains',
  views: 1500,
  downloads: 250,
  likes: 89,
  user: 'johndoe',
};

describe('ImageCard - 컴포넌트 렌더링 및 동작', () => {
  describe('렌더링', () => {
    it('이미지가 올바른 src로 렌더링되어야 한다', () => {
      renderWithTheme(<ImageCard image={mockImage} />);

      const imgElement = screen.getByAltText(mockImage.tags);
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute('src', mockImage.previewURL);
    });

    it('태그가 alt 텍스트로 렌더링되어야 한다', () => {
      renderWithTheme(<ImageCard image={mockImage} />);

      const imgElement = screen.getByAltText('nature, landscape, mountains');
      expect(imgElement).toBeInTheDocument();
    });

    it('사용자 이름이 렌더링되어야 한다', () => {
      renderWithTheme(<ImageCard image={mockImage} />);

      const userElement = screen.getByText(/johndoe/i);
      expect(userElement).toBeInTheDocument();
    });

    it('조회수가 렌더링되어야 한다', () => {
      renderWithTheme(<ImageCard image={mockImage} />);

      const viewsElement = screen.getByText(/1,500/i);
      expect(viewsElement).toBeInTheDocument();
    });

    it('다운로드 수가 렌더링되어야 한다', () => {
      renderWithTheme(<ImageCard image={mockImage} />);

      const downloadsElement = screen.getByText(/250/i);
      expect(downloadsElement).toBeInTheDocument();
    });

    it('좋아요 수가 렌더링되어야 한다', () => {
      renderWithTheme(<ImageCard image={mockImage} />);

      const likesElement = screen.getByText(/89/i);
      expect(likesElement).toBeInTheDocument();
    });
  });

  describe('타입 안전성', () => {
    it('Image 엔티티를 props로 받아야 한다', () => {
      const { container } = renderWithTheme(<ImageCard image={mockImage} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('큰 숫자를 올바르게 처리해야 한다', () => {
      const largeNumberImage: Image = {
        ...mockImage,
        views: 1234567,
        downloads: 9876543,
        likes: 555555,
      };

      renderWithTheme(<ImageCard image={largeNumberImage} />);

      expect(screen.getByText(/1,234,567/i)).toBeInTheDocument();
      expect(screen.getByText(/9,876,543/i)).toBeInTheDocument();
      expect(screen.getByText(/555,555/i)).toBeInTheDocument();
    });
  });

  describe('이미지 속성', () => {
    it('lazy loading 속성이 있어야 한다', () => {
      renderWithTheme(<ImageCard image={mockImage} />);

      const imgElement = screen.getByAltText(mockImage.tags);
      expect(imgElement).toHaveAttribute('loading', 'lazy');
    });

    it('올바른 이미지 크기로 렌더링되어야 한다', () => {
      renderWithTheme(<ImageCard image={mockImage} />);

      const imgElement = screen.getByAltText(mockImage.tags);
      expect(imgElement).toHaveStyle({ width: '100%', height: '100%' });
    });
  });

  describe('접근성', () => {
    it('스크린 리더를 위한 적절한 alt 텍스트가 있어야 한다', () => {
      renderWithTheme(<ImageCard image={mockImage} />);

      const imgElement = screen.getByRole('img');
      expect(imgElement).toHaveAttribute('alt', 'nature, landscape, mountains');
    });
  });
});
