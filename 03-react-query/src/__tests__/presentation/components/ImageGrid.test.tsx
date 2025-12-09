/**
 * ImageGrid 컴포넌트 테스트
 * Test 18: 이미지 그리드 통합 컴포넌트
 */

import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ImageGrid } from '@presentation/components/ImageGrid/ImageGrid';
import { theme } from '@presentation/styles/theme';
import type { Image } from '@domain/entities/Image';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

const mockImages: Image[] = [
  {
    id: 1,
    previewURL: 'https://example.com/1.jpg',
    largeImageURL: 'https://example.com/1-large.jpg',
    tags: 'nature, forest',
    views: 1000,
    downloads: 100,
    likes: 50,
    user: 'user1',
  },
  {
    id: 2,
    previewURL: 'https://example.com/2.jpg',
    largeImageURL: 'https://example.com/2-large.jpg',
    tags: 'ocean, beach',
    views: 2000,
    downloads: 200,
    likes: 100,
    user: 'user2',
  },
];

describe('ImageGrid - 컴포넌트 렌더링 및 동작', () => {
  describe('로딩 상태', () => {
    it('로딩 중일 때 스켈레톤 카드를 표시해야 한다', () => {
      renderWithTheme(<ImageGrid images={[]} isLoading error={null} />);

      const skeletonCards = screen.getAllByLabelText(/로딩 중/i);
      expect(skeletonCards.length).toBeGreaterThan(0);
    });

    it('로딩 중일 때 실제 이미지를 표시하지 않아야 한다', () => {
      renderWithTheme(<ImageGrid images={mockImages} isLoading error={null} />);

      const imageCards = screen.queryByAltText(/nature/i);
      expect(imageCards).not.toBeInTheDocument();
    });
  });

  describe('에러 상태', () => {
    it('에러가 있을 때 에러 메시지를 표시해야 한다', () => {
      const error = new Error('이미지를 불러올 수 없습니다');
      renderWithTheme(
        <ImageGrid images={[]} isLoading={false} error={error} />
      );

      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent(/이미지를 불러올 수 없습니다/i);
    });

    it('에러 상태일 때 이미지를 표시하지 않아야 한다', () => {
      const error = new Error('에러 발생');
      renderWithTheme(
        <ImageGrid images={mockImages} isLoading={false} error={error} />
      );

      const imageCards = screen.queryByAltText(/nature/i);
      expect(imageCards).not.toBeInTheDocument();
    });
  });

  describe('이미지 표시', () => {
    it('이미지 목록을 그리드로 표시해야 한다', () => {
      renderWithTheme(
        <ImageGrid images={mockImages} isLoading={false} error={null} />
      );

      const image1 = screen.getByAltText(/nature, forest/i);
      const image2 = screen.getByAltText(/ocean, beach/i);

      expect(image1).toBeInTheDocument();
      expect(image2).toBeInTheDocument();
    });

    it('빈 이미지 목록일 때 아무것도 표시하지 않아야 한다', () => {
      const { container } = renderWithTheme(
        <ImageGrid images={[]} isLoading={false} error={null} />
      );

      const gridContainer = container.querySelector(
        '[data-testid="image-grid"]'
      );
      expect(gridContainer?.children.length).toBe(0);
    });
  });

  describe('그리드 레이아웃', () => {
    it('그리드 컨테이너가 렌더링되어야 한다', () => {
      const { container } = renderWithTheme(
        <ImageGrid images={mockImages} isLoading={false} error={null} />
      );

      const gridContainer = container.querySelector(
        '[data-testid="image-grid"]'
      );
      expect(gridContainer).toBeInTheDocument();
    });

    it('반응형 그리드 스타일이 적용되어야 한다', () => {
      const { container } = renderWithTheme(
        <ImageGrid images={mockImages} isLoading={false} error={null} />
      );

      const gridContainer = container.querySelector(
        '[data-testid="image-grid"]'
      ) as HTMLElement;

      expect(gridContainer).toHaveStyle({
        display: 'grid',
      });
    });
  });

  describe('우선순위 렌더링', () => {
    it('로딩 상태가 우선순위를 가져야 한다', () => {
      const error = new Error('에러');
      renderWithTheme(
        <ImageGrid images={mockImages} isLoading error={error} />
      );

      // 로딩 중이면 에러 메시지가 표시되지 않아야 함
      const errorMessage = screen.queryByRole('alert');
      expect(errorMessage).not.toBeInTheDocument();

      // 스켈레톤 카드가 표시되어야 함
      const skeletonCards = screen.getAllByLabelText(/로딩 중/i);
      expect(skeletonCards.length).toBeGreaterThan(0);
    });

    it('에러 상태가 빈 이미지보다 우선순위를 가져야 한다', () => {
      const error = new Error('에러 발생');
      renderWithTheme(
        <ImageGrid images={[]} isLoading={false} error={error} />
      );

      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
