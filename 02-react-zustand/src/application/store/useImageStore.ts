/**
 * Image Store
 * Application Layer - Zustand Store Implementation
 */

import { create } from 'zustand';
import type { SearchImagesUseCase } from '@domain/usecases/SearchImagesUseCase';
import type { GetImagesByPageUseCase } from '@domain/usecases/GetImagesByPageUseCase';
import type { ImageStore } from './types';

/**
 * Image Store Factory
 * UseCase를 주입받아 Zustand 스토어를 생성하는 팩토리 함수
 *
 * @param searchImagesUseCase - 이미지 검색 UseCase
 * @param getImagesByPageUseCase - 페이지별 이미지 조회 UseCase
 * @returns Zustand store hook
 */
export const createImageStore = (
  searchImagesUseCase: SearchImagesUseCase,
  getImagesByPageUseCase: GetImagesByPageUseCase,
) => {
  return create<ImageStore>((set) => ({
    // 초기 상태
    images: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    query: '',

    // 액션: 이미지 검색
    searchImages: async (query: string) => {
      set({ isLoading: true, error: null, query });

      const result = await searchImagesUseCase.execute(query);

      if (result.success) {
        set({
          images: result.data,
          isLoading: false,
          currentPage: 1,
        });
      } else {
        set({
          error: result.error,
          isLoading: false,
          images: [],
        });
      }
    },

    // 액션: 페이지별 이미지 조회
    getImagesByPage: async (query: string, page: number) => {
      set({ isLoading: true, error: null });

      const result = await getImagesByPageUseCase.execute(query, page);

      if (result.success) {
        set({
          images: result.data,
          currentPage: page,
          isLoading: false,
        });
      } else {
        set({
          error: result.error,
          isLoading: false,
        });
      }
    },

    // 액션: 스토어 초기화
    resetStore: () => {
      set({
        images: [],
        isLoading: false,
        error: null,
        currentPage: 1,
        totalPages: 0,
        query: '',
      });
    },
  }));
};
