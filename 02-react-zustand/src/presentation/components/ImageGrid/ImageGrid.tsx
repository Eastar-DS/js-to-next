/**
 * ImageGrid 컴포넌트
 * Presentation Layer - Image Grid Component
 */

import type { ImageGridProps } from '@presentation/components/types';
import { ImageCard } from '@presentation/components/ImageCard/ImageCard';
import { SkeletonCard } from '@presentation/components/SkeletonCard/SkeletonCard';
import { ErrorMessage } from '@presentation/components/ErrorMessage/ErrorMessage';
import { GridContainer } from './ImageGrid.styles';

/**
 * 이미지 그리드 컴포넌트
 * 로딩, 에러, 이미지 목록 상태를 처리하여 적절한 UI를 표시합니다.
 */
export const ImageGrid = ({ images, isLoading, error }: ImageGridProps) => {
  // 로딩 중일 때 스켈레톤 카드 표시
  if (isLoading) {
    return (
      <GridContainer data-testid="image-grid">
        {Array.from({ length: 6 }, (_, i) => `skeleton-${i}`).map((id) => (
          <SkeletonCard key={id} />
        ))}
      </GridContainer>
    );
  }

  // 에러가 있을 때 에러 메시지 표시
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  // 이미지 목록 표시
  return (
    <GridContainer data-testid="image-grid">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </GridContainer>
  );
};
