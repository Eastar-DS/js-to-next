// Result 타입: 성공/실패를 표현하는 Discriminated Union
export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// AsyncState 타입: 비동기 상태 표현
export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

// PaginationState 타입: 페이지네이션 상태
export interface PaginationState {
  currentPage: number;
  totalPages: number;
}

// Nullable 타입: null을 허용하는 타입
export type Nullable<T> = T | null;

// Optional 타입: undefined를 허용하는 타입
export type Optional<T> = T | undefined;
