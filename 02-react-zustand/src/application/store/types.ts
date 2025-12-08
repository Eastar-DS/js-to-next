/**
 * Image Store 타입 정의
 * Application Layer - Zustand Store Types
 */

import type { Image } from '@domain/entities/Image';

/**
 * 스토어 상태 타입
 */
export interface StoreState {
  images: Image[];
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  query: string;
}

/**
 * 스토어 액션 타입
 */
export interface StoreActions {
  searchImages: (query: string) => Promise<void>;
  getImagesByPage: (query: string, page: number) => Promise<void>;
  resetStore: () => void;
}

/**
 * ImageStore 타입 (State + Actions)
 */
export type ImageStore = StoreState & StoreActions;
