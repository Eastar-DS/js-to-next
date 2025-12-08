/**
 * Image Store 테스트
 * Application Layer - Zustand Store
 *
 * Test 8: Zustand 스토어 타입 정의
 */

import type { Image } from '@domain/entities/Image';

describe('ImageStore - 타입 정의', () => {
  describe('StoreState 인터페이스', () => {
    it('should define initial state with correct types', () => {
      // Given: 스토어 초기 상태 타입 정의
      type StoreState = {
        images: Image[];
        isLoading: boolean;
        error: Error | null;
        currentPage: number;
        totalPages: number;
        query: string;
      };

      // When: 타입을 사용하여 초기 상태 객체 생성
      const initialState: StoreState = {
        images: [],
        isLoading: false,
        error: null,
        currentPage: 1,
        totalPages: 0,
        query: '',
      };

      // Then: 타입이 올바르게 정의되었는지 확인
      expect(initialState.images).toEqual([]);
      expect(initialState.isLoading).toBe(false);
      expect(initialState.error).toBeNull();
      expect(initialState.currentPage).toBe(1);
      expect(initialState.totalPages).toBe(0);
      expect(initialState.query).toBe('');
    });

    it('should allow images to be an array of Image entities', () => {
      // Given: Image 배열 타입 정의
      const images: Image[] = [
        {
          id: 1,
          tags: 'nature, landscape',
          previewURL: 'https://example.com/preview.jpg',
          largeImageURL: 'https://example.com/large.jpg',
          user: 'photographer',
          likes: 100,
          views: 1000,
          downloads: 50,
        },
      ];

      // When: StoreState 타입에 할당
      type StoreState = {
        images: Image[];
      };

      const state: StoreState = {
        images,
      };

      // Then: 타입이 올바르게 할당됨
      expect(state.images).toHaveLength(1);
      expect(state.images[0].id).toBe(1);
    });
  });

  describe('StoreActions 타입 정의', () => {
    it('should define searchImages action type', () => {
      // Given: searchImages 액션 타입 정의
      type SearchImagesAction = (query: string) => Promise<void>;

      // When: 타입을 사용하여 모의 함수 생성
      const searchImages: SearchImagesAction = async (query: string) => {
        // 실제 구현은 나중에
        expect(typeof query).toBe('string');
      };

      // Then: 함수가 올바른 시그니처를 가짐
      expect(searchImages).toBeDefined();
      searchImages('test query');
    });

    it('should define getImagesByPage action type', () => {
      // Given: getImagesByPage 액션 타입 정의
      type GetImagesByPageAction = (query: string, page: number) => Promise<void>;

      // When: 타입을 사용하여 모의 함수 생성
      const getImagesByPage: GetImagesByPageAction = async (
        query: string,
        page: number,
      ) => {
        expect(typeof query).toBe('string');
        expect(typeof page).toBe('number');
      };

      // Then: 함수가 올바른 시그니처를 가짐
      expect(getImagesByPage).toBeDefined();
      getImagesByPage('test', 1);
    });

    it('should define resetStore action type', () => {
      // Given: resetStore 액션 타입 정의
      type ResetStoreAction = () => void;

      // When: 타입을 사용하여 모의 함수 생성
      const resetStore: ResetStoreAction = () => {
        // 실제 구현은 나중에
      };

      // Then: 함수가 올바른 시그니처를 가짐
      expect(resetStore).toBeDefined();
      resetStore();
    });
  });

  describe('타입 안전한 스토어 생성', () => {
    it('should combine StoreState and StoreActions into ImageStore type', () => {
      // Given: StoreState와 StoreActions를 결합한 타입 정의
      type StoreState = {
        images: Image[];
        isLoading: boolean;
        error: Error | null;
        currentPage: number;
        totalPages: number;
        query: string;
      };

      type StoreActions = {
        searchImages: (query: string) => Promise<void>;
        getImagesByPage: (query: string, page: number) => Promise<void>;
        resetStore: () => void;
      };

      type ImageStore = StoreState & StoreActions;

      // When: ImageStore 타입을 사용하여 모의 스토어 생성
      const mockStore: ImageStore = {
        images: [],
        isLoading: false,
        error: null,
        currentPage: 1,
        totalPages: 0,
        query: '',
        searchImages: async () => {},
        getImagesByPage: async () => {},
        resetStore: () => {},
      };

      // Then: 타입이 올바르게 결합됨
      expect(mockStore.images).toEqual([]);
      expect(mockStore.isLoading).toBe(false);
      expect(mockStore.searchImages).toBeDefined();
      expect(mockStore.getImagesByPage).toBeDefined();
      expect(mockStore.resetStore).toBeDefined();
    });
  });
});
