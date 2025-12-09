/**
 * Component Props Types
 * Presentation Layer - Component Props 타입 정의
 */

import type { Image } from '@domain/entities/Image';

/**
 * SearchBar 컴포넌트 Props
 */
export interface SearchBarProps {
  /** 검색 이벤트 핸들러 */
  onSearch: (query: string) => void;
  /** 로딩 상태 */
  isLoading: boolean;
}

/**
 * ImageCard 컴포넌트 Props
 */
export interface ImageCardProps {
  /** 표시할 이미지 데이터 */
  image: Image;
}

/**
 * ImageGrid 컴포넌트 Props
 */
export interface ImageGridProps {
  /** 이미지 목록 */
  images: Image[];
  /** 로딩 상태 */
  isLoading: boolean;
  /** 에러 상태 */
  error: Error | null;
}

/**
 * Pagination 컴포넌트 Props
 */
export interface PaginationProps {
  /** 현재 페이지 번호 */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 페이지 변경 이벤트 핸들러 */
  onPageChange: (page: number) => void;
}

/**
 * ErrorMessage 컴포넌트 Props
 */
export interface ErrorMessageProps {
  /** 에러 메시지 */
  message: string;
  /** 재시도 버튼 핸들러 (선택사항) */
  onRetry?: () => void;
}
