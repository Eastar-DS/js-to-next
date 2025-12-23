/**
 * SkeletonCard 컴포넌트
 * Presentation Layer - Skeleton Loading UI Component
 */

import {
  SkeletonCardContainer,
  SkeletonImage,
  SkeletonInfo,
  SkeletonLine,
  SkeletonStats,
} from './SkeletonCard.styles';

/**
 * 스켈레톤 카드 컴포넌트
 * 이미지 로딩 중 표시되는 스켈레톤 UI
 */
export const SkeletonCard = () => (
  <SkeletonCardContainer aria-label="로딩 중" aria-busy="true" data-testid="skeleton-card">
    <SkeletonImage data-testid="skeleton-image" />
    <SkeletonInfo data-testid="skeleton-info">
      <SkeletonLine width="60%" data-testid="skeleton-line-1" />
      <SkeletonStats>
        <SkeletonLine width="30%" data-testid="skeleton-line-2" />
        <SkeletonLine width="30%" data-testid="skeleton-line-3" />
        <SkeletonLine width="30%" data-testid="skeleton-line-4" />
      </SkeletonStats>
    </SkeletonInfo>
  </SkeletonCardContainer>
);
