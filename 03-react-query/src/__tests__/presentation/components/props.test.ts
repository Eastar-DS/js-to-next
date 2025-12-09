/**
 * Component Props 타입 정의 테스트
 * Presentation Layer - Component Props Types
 *
 * Test 12: 컴포넌트 Props 타입 정의
 */

import type { Image } from '@domain/entities/Image';
import type {
  SearchBarProps,
  ImageCardProps,
  ImageGridProps,
  PaginationProps,
} from '@presentation/components/types';

describe('Component Props - 타입 정의', () => {
  describe('SearchBar Props', () => {
    it('should define SearchBarProps with required properties', () => {
      // Given: SearchBar 컴포넌트의 Props 타입 정의
      const mockOnSearch = jest.fn();

      // When: Props 객체 생성
      const props: SearchBarProps = {
        onSearch: mockOnSearch,
        isLoading: false,
      };

      // Then: Props가 올바르게 정의되어야 함
      expect(props.onSearch).toBeDefined();
      expect(props.isLoading).toBe(false);
      expect(typeof props.onSearch).toBe('function');
    });
  });

  describe('ImageCard Props', () => {
    it('should define ImageCardProps with Image entity', () => {
      // Given: ImageCard 컴포넌트의 Props 타입 정의
      const mockImage: Image = {
        id: 1,
        tags: 'nature, landscape',
        previewURL: 'https://example.com/preview.jpg',
        largeImageURL: 'https://example.com/large.jpg',
        user: 'photographer',
        likes: 100,
        views: 1000,
        downloads: 50,
      };

      // When: Props 객체 생성
      const props: ImageCardProps = {
        image: mockImage,
      };

      // Then: Props가 올바르게 정의되어야 함
      expect(props.image).toBeDefined();
      expect(props.image.id).toBe(1);
      expect(props.image.tags).toBe('nature, landscape');
    });
  });

  describe('ImageGrid Props', () => {
    it('should define ImageGridProps with images array', () => {
      // Given: ImageGrid 컴포넌트의 Props 타입 정의
      const mockImages: Image[] = [
        {
          id: 1,
          tags: 'nature',
          previewURL: 'https://example.com/1.jpg',
          largeImageURL: 'https://example.com/1_large.jpg',
          user: 'user1',
          likes: 50,
          views: 500,
          downloads: 25,
        },
        {
          id: 2,
          tags: 'technology',
          previewURL: 'https://example.com/2.jpg',
          largeImageURL: 'https://example.com/2_large.jpg',
          user: 'user2',
          likes: 100,
          views: 1000,
          downloads: 50,
        },
      ];

      // When: Props 객체 생성
      const props: ImageGridProps = {
        images: mockImages,
        isLoading: false,
        error: null,
      };

      // Then: Props가 올바르게 정의되어야 함
      expect(props.images).toHaveLength(2);
      expect(props.isLoading).toBe(false);
      expect(props.error).toBeNull();
    });
  });

  describe('Pagination Props', () => {
    it('should define PaginationProps with page controls', () => {
      // Given: Pagination 컴포넌트의 Props 타입 정의
      const mockOnPageChange = jest.fn();

      // When: Props 객체 생성
      const props: PaginationProps = {
        currentPage: 1,
        totalPages: 10,
        onPageChange: mockOnPageChange,
      };

      // Then: Props가 올바르게 정의되어야 함
      expect(props.currentPage).toBe(1);
      expect(props.totalPages).toBe(10);
      expect(typeof props.onPageChange).toBe('function');
    });
  });
});
