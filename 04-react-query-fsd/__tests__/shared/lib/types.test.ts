import type {
  Result,
  AsyncState,
  PaginationState,
  Nullable,
  Optional,
} from '@/shared/lib/types';

describe('공통 타입 정의', () => {
  describe('Result<T> 타입', () => {
    it('success 케이스를 올바르게 표현해야 한다', () => {
      const successResult: Result<string> = {
        success: true,
        data: 'test data',
      };

      expect(successResult.success).toBe(true);
      expect(successResult.data).toBe('test data');
    });

    it('failure 케이스를 올바르게 표현해야 한다', () => {
      const failureResult: Result<string> = {
        success: false,
        error: 'error message',
      };

      expect(failureResult.success).toBe(false);
      expect(failureResult.error).toBe('error message');
    });
  });

  describe('AsyncState<T> 타입', () => {
    it('로딩 상태를 올바르게 표현해야 한다', () => {
      const loadingState: AsyncState<string> = {
        data: null,
        isLoading: true,
        error: null,
      };

      expect(loadingState.isLoading).toBe(true);
      expect(loadingState.data).toBeNull();
      expect(loadingState.error).toBeNull();
    });

    it('성공 상태를 올바르게 표현해야 한다', () => {
      const successState: AsyncState<string> = {
        data: 'loaded data',
        isLoading: false,
        error: null,
      };

      expect(successState.data).toBe('loaded data');
      expect(successState.isLoading).toBe(false);
      expect(successState.error).toBeNull();
    });

    it('에러 상태를 올바르게 표현해야 한다', () => {
      const errorState: AsyncState<string> = {
        data: null,
        isLoading: false,
        error: 'error occurred',
      };

      expect(errorState.error).toBe('error occurred');
      expect(errorState.isLoading).toBe(false);
      expect(errorState.data).toBeNull();
    });
  });

  describe('PaginationState 타입', () => {
    it('페이지네이션 상태를 올바르게 표현해야 한다', () => {
      const paginationState: PaginationState = {
        currentPage: 1,
        totalPages: 10,
      };

      expect(paginationState.currentPage).toBe(1);
      expect(paginationState.totalPages).toBe(10);
    });
  });

  describe('Nullable<T> 타입', () => {
    it('null을 허용해야 한다', () => {
      const nullableValue: Nullable<string> = null;
      expect(nullableValue).toBeNull();
    });

    it('실제 값을 허용해야 한다', () => {
      const nullableValue: Nullable<string> = 'value';
      expect(nullableValue).toBe('value');
    });
  });

  describe('Optional<T> 타입', () => {
    it('undefined를 허용해야 한다', () => {
      const optionalValue: Optional<string> = undefined;
      expect(optionalValue).toBeUndefined();
    });

    it('실제 값을 허용해야 한다', () => {
      const optionalValue: Optional<string> = 'value';
      expect(optionalValue).toBe('value');
    });
  });
});
