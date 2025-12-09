/**
 * SkeletonCard 컴포넌트 테스트
 * Test 15: 로딩 상태를 나타내는 Skeleton UI 컴포넌트
 */

import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { SkeletonCard } from '@presentation/components/SkeletonCard/SkeletonCard';
import { theme } from '@presentation/styles/theme';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('SkeletonCard - 컴포넌트 렌더링', () => {
  describe('렌더링', () => {
    it('스켈레톤 카드가 렌더링되어야 한다', () => {
      const { container } = renderWithTheme(<SkeletonCard />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('이미지 영역 스켈레톤이 렌더링되어야 한다', () => {
      const { container } = renderWithTheme(<SkeletonCard />);
      const skeletonElements = container.querySelectorAll(
        '[data-testid^="skeleton"]'
      );
      expect(skeletonElements.length).toBeGreaterThan(0);
    });

    it('올바른 스타일이 적용되어야 한다', () => {
      const { container } = renderWithTheme(<SkeletonCard />);
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveStyle({
        borderRadius: '8px',
      });
    });
  });

  describe('애니메이션', () => {
    it('애니메이션이 적용되어야 한다', () => {
      const { container } = renderWithTheme(<SkeletonCard />);
      const skeletonImage = container.querySelector(
        '[data-testid="skeleton-image"]'
      ) as HTMLElement;

      // styled-components의 keyframes는 고유 ID로 변환되므로 animation 속성 존재 여부만 확인
      const styles = window.getComputedStyle(skeletonImage);
      expect(styles.animation).toBeTruthy();
    });
  });

  describe('구조', () => {
    it('이미지 영역과 정보 영역으로 구성되어야 한다', () => {
      const { container } = renderWithTheme(<SkeletonCard />);

      const skeletonImage = container.querySelector(
        '[data-testid="skeleton-image"]'
      );
      const skeletonInfo = container.querySelector(
        '[data-testid="skeleton-info"]'
      );

      expect(skeletonImage).toBeInTheDocument();
      expect(skeletonInfo).toBeInTheDocument();
    });

    it('정보 영역에 여러 스켈레톤 라인이 있어야 한다', () => {
      const { container } = renderWithTheme(<SkeletonCard />);

      const skeletonLines = container.querySelectorAll(
        '[data-testid^="skeleton-line"]'
      );
      expect(skeletonLines.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('접근성', () => {
    it('로딩 상태를 나타내는 aria-label이 있어야 한다', () => {
      const { container } = renderWithTheme(<SkeletonCard />);
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveAttribute('aria-label', '로딩 중');
    });

    it('aria-busy 속성이 true여야 한다', () => {
      const { container } = renderWithTheme(<SkeletonCard />);
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveAttribute('aria-busy', 'true');
    });
  });
});
