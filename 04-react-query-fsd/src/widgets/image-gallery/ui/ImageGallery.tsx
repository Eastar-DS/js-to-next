import React from 'react';
import { useImagesByPage } from '@/features/paginate-images/hooks/useImagesByPage';
import { ImageGrid } from '@/entities/image/ui/ImageGrid';

export interface ImageGalleryProps {
  query: string;
  page: number;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ query, page }) => {
  const { data, isLoading, error } = useImagesByPage(query, page);

  if (query.length === 0) {
    return null;
  }

  if (isLoading) {
    return (
      <div data-testid="image-gallery">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="image-gallery">
        <p>에러가 발생했습니다: {error.message}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div data-testid="image-gallery">
        <p>이미지가 없습니다</p>
      </div>
    );
  }

  return (
    <div data-testid="image-gallery">
      <ImageGrid images={data} />
    </div>
  );
};
