# Zustand vs React Query 비교 분석

> **Phase 2 (Zustand)** vs **Phase 3 (React Query)** 상세 비교

동일한 이미지 검색 애플리케이션을 Zustand와 React Query 두 가지 방식으로 구현했습니다.
이 문서는 두 접근법의 차이점, 장단점, 그리고 사용 사례별 권장사항을 정리합니다.

---

## 목차

1. [핵심 차이점 요약](#핵심-차이점-요약)
2. [코드 비교 분석](#코드-비교-분석)
3. [성능 비교](#성능-비교)
4. [개발 경험 비교](#개발-경험-비교)
5. [장단점 비교](#장단점-비교)
6. [사용 사례별 권장사항](#사용-사례별-권장사항)
7. [마이그레이션 가이드](#마이그레이션-가이드)

---

## 핵심 차이점 요약

| 항목 | Zustand | React Query |
|------|---------|-------------|
| **목적** | 클라이언트 상태 관리 | 서버 상태 관리 |
| **상태 위치** | 클라이언트 메모리 | 서버 + 클라이언트 캐시 |
| **데이터 흐름** | 수동 관리 | 자동 동기화 |
| **캐싱** | 수동 구현 필요 | 내장 (자동) |
| **로딩 상태** | 수동 관리 | 자동 제공 |
| **에러 처리** | 수동 관리 | 자동 제공 + 재시도 |
| **재시도 로직** | 직접 구현 필요 | 내장 (설정 가능) |
| **Prefetch** | 직접 구현 필요 | 내장 API 제공 |
| **Optimistic Updates** | 직접 구현 필요 | 내장 API 제공 |
| **DevTools** | Redux DevTools 사용 | 전용 DevTools 제공 |
| **번들 크기** | ~3KB (작음) | ~13KB (중간) |
| **학습 곡선** | 낮음 (간단) | 중간 (개념 이해 필요) |

---

## 코드 비교 분석

### 1. 코드 라인 수 비교

#### Zustand (Phase 2)
```
src/application/store/
├── useImageStore.ts        84 lines  (상태 + 로직 + 타입 모두 포함)
├── types.ts                37 lines
└── Total:                  121 lines
```

#### React Query (Phase 3)
```
src/application/
├── queries/
│   ├── queryKeys.ts        36 lines  (쿼리 키 관리)
│   └── useImagesByPageQuery.ts  59 lines
├── hooks/
│   ├── useImageSearch.ts   86 lines  (검색 로직 캡슐화)
│   └── usePrefetch.ts      80 lines  (Prefetch 기능)
└── queryClient.ts          30 lines  (QueryClient 설정)
└── Total:                  291 lines
```

**결과**: Zustand가 React Query보다 **2.4배 적은 코드**

**이유**:
- Zustand: 단순한 상태 관리만 수행
- React Query: 캐싱, 재시도, prefetch 등 고급 기능 포함

---

### 2. 상태 관리 코드 비교

#### Zustand: 직접 관리
```typescript
// useImageStore.ts
interface ImageStoreState {
  images: Image[];
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  query: string;
}

interface ImageStoreActions {
  searchImages: (query: string) => Promise<void>;
  goToPage: (page: number) => Promise<void>;
}

export const useImageStore = create<ImageStoreState & ImageStoreActions>()(
  devtools((set, get) => ({
    // 초기 상태
    images: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    query: '',

    // 검색 함수
    searchImages: async (newQuery: string) => {
      set({ isLoading: true, error: null, query: newQuery, currentPage: 1 });

      try {
        const result = await getImagesByPageUseCase.execute(newQuery, 1);

        if (result.success) {
          set({ images: result.data, isLoading: false });
        } else {
          set({ error: result.error, isLoading: false, images: [] });
        }
      } catch (error) {
        set({
          error: error instanceof Error ? error : new Error('Unknown error'),
          isLoading: false,
          images: []
        });
      }
    },

    // ... 수동으로 모든 상태 관리
  }))
);
```

**특징**:
- ✅ 명시적: 모든 상태 변화를 직접 제어
- ✅ 간단: 이해하기 쉬운 코드
- ❌ 반복적: 로딩, 에러 처리 직접 구현
- ❌ 캐싱 없음: 같은 데이터 반복 요청

---

#### React Query: 자동 관리
```typescript
// useImagesByPageQuery.ts
export const useImagesByPageQuery = (
  query: string,
  page: number,
  getImagesByPageUseCase: GetImagesByPageUseCase
) => {
  return useQuery({
    queryKey: imageKeys.page(query, page),
    queryFn: async () => {
      const result = await getImagesByPageUseCase.execute(query, page);

      if (result.success) {
        return result.data;
      }

      throw result.error;
    },
    enabled: query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000,   // 10분
    retry: 1,
  });
};

// 컴포넌트에서 사용
const { data: images, isLoading, error } = useImagesByPageQuery(query, page, useCase);
```

**특징**:
- ✅ 선언적: "무엇을" 가져올지만 명시
- ✅ 자동 캐싱: 같은 쿼리키는 캐시에서 반환
- ✅ 자동 재시도: 실패 시 1회 자동 재시도
- ✅ 타입 안전: data, isLoading, error 자동 타입 추론
- ❌ 학습 곡선: queryKey, staleTime, gcTime 개념 이해 필요

---

### 3. 타입 안전성 비교

#### Zustand
```typescript
// 타입을 수동으로 정의해야 함
interface ImageStoreState {
  images: Image[];
  isLoading: boolean;
  error: Error | null;
  // ...
}

// 사용 시
const { images, isLoading, searchImages } = useImageStore();
// ✅ 타입 안전하지만 수동으로 모든 타입 정의 필요
```

#### React Query
```typescript
// useQuery가 자동으로 타입 추론
const { data, isLoading, error } = useQuery({
  queryKey: ['images'],
  queryFn: async (): Promise<Image[]> => {
    // queryFn의 반환 타입이 data의 타입이 됨
  }
});

// data: Image[] | undefined (자동 추론)
// isLoading: boolean (자동 제공)
// error: Error | null (자동 제공)
```

**결과**: React Query가 더 강력한 타입 추론 제공

---

### 4. 보일러플레이트 비교

#### Zustand: 중간 수준의 보일러플레이트

**필수 구현 사항**:
```typescript
// 1. 상태 타입 정의
interface State { ... }

// 2. 액션 타입 정의
interface Actions { ... }

// 3. Store 생성
export const useStore = create<State & Actions>()(...);

// 4. 로딩 상태 관리
set({ isLoading: true });

// 5. 에러 처리
try { ... } catch { set({ error }) }

// 6. 성공 처리
set({ data, isLoading: false });
```

**라인 수**: ~20-30 lines (기본 CRUD 기준)

---

#### React Query: 최소한의 보일러플레이트

**필수 구현 사항**:
```typescript
// 1. QueryClient 설정 (앱 전체에서 1회)
const queryClient = new QueryClient();

// 2. 쿼리 훅 작성 (재사용 가능)
export const useImages = () => {
  return useQuery({
    queryKey: ['images'],
    queryFn: fetchImages,
  });
};

// 끝! 로딩, 에러, 캐싱 모두 자동 처리
```

**라인 수**: ~5-10 lines (기본 CRUD 기준)

**결과**: React Query가 **3-4배 적은 보일러플레이트**

---

## 성능 비교

### 1. 번들 크기

```bash
# 실제 측정 결과 (gzip 압축 후)

Zustand (02-react-zustand):
- zustand: ~3.2 KB
- 총 번들: ~145 KB

React Query (03-react-query):
- @tanstack/react-query: ~13.5 KB
- @tanstack/react-query-devtools: ~25 KB (개발 전용)
- 총 번들: ~158 KB

차이: +13 KB (프로덕션)
```

**결론**: Zustand가 더 가볍지만, 차이는 미미 (10KB 수준)

---

### 2. 렌더링 성능

#### Zustand
```typescript
const images = useImageStore((state) => state.images);
// ✅ 선택적 구독: images가 변경될 때만 리렌더링
```

**장점**: 세밀한 렌더링 제어 가능

---

#### React Query
```typescript
const { data: images } = useQuery({ queryKey: ['images'], ... });
// ✅ 자동 최적화: 같은 queryKey는 결과 공유
```

**장점**:
- 동일한 쿼리를 여러 컴포넌트에서 사용해도 1회만 요청
- 캐시 히트 시 네트워크 요청 없음

---

### 3. 네트워크 요청 최적화

#### Zustand: 캐싱 없음
```
사용자 액션:
1. 페이지 1 검색 → API 호출
2. 페이지 2 이동 → API 호출
3. 페이지 1 복귀 → API 호출 (다시!)
4. 페이지 2 이동 → API 호출 (다시!)

총 API 호출: 4회
```

#### React Query: 자동 캐싱
```
사용자 액션:
1. 페이지 1 검색 → API 호출 (캐시 저장)
2. 페이지 2 이동 → API 호출 (캐시 저장)
3. 페이지 1 복귀 → 캐시에서 즉시 반환 (0ms)
4. 페이지 2 이동 → 캐시에서 즉시 반환 (0ms)

총 API 호출: 2회 (50% 감소)
```

**+ Prefetch 사용 시**:
```
1. 페이지 1 검색 → API 호출
   → 동시에 페이지 2 prefetch (백그라운드)
2. 페이지 2 이동 → 이미 캐시됨 (즉시 표시!)

사용자 체감 로딩 시간: 거의 0ms
```

---

## 개발 경험 비교

### 1. DevTools

#### Zustand: Redux DevTools 사용
```typescript
import { devtools } from 'zustand/middleware';

export const useImageStore = create<State>()(
  devtools((set) => ({ ... }))
);
```

**기능**:
- ✅ 상태 변화 추적
- ✅ 액션 히스토리
- ✅ 시간 여행 디버깅
- ❌ 네트워크 요청 추적 없음
- ❌ 캐시 상태 확인 불가

---

#### React Query: 전용 DevTools
```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

**기능**:
- ✅ 모든 쿼리 상태 실시간 확인
- ✅ 캐시 데이터 검사
- ✅ 쿼리 강제 무효화/재시도
- ✅ Stale/Fresh 상태 시각화
- ✅ 네트워크 요청 타임라인
- ✅ 쿼리 의존성 그래프

**결론**: React Query DevTools가 훨씬 강력

---

### 2. 타입 추론

#### Zustand
```typescript
const images = useImageStore((state) => state.images);
// Type: Image[] (수동으로 정의한 타입)

const searchImages = useImageStore((state) => state.searchImages);
// Type: (query: string) => Promise<void> (수동 정의)
```

#### React Query
```typescript
const { data } = useQuery({
  queryKey: ['images'],
  queryFn: async (): Promise<Image[]> => fetchImages(),
});
// data: Image[] | undefined (자동 추론)

const mutation = useMutation({
  mutationFn: (newImage: Image) => postImage(newImage),
});
// mutation.mutate: (newImage: Image) => void (자동 추론)
```

**결론**: 둘 다 타입 안전하지만, React Query가 더 강력한 타입 추론

---

### 3. 에러 처리

#### Zustand: 수동 처리
```typescript
searchImages: async (query: string) => {
  set({ isLoading: true, error: null });

  try {
    const result = await api.search(query);
    if (result.success) {
      set({ images: result.data, isLoading: false });
    } else {
      set({ error: result.error, isLoading: false });
    }
  } catch (error) {
    set({
      error: error instanceof Error ? error : new Error('Unknown'),
      isLoading: false
    });
  }
};
```

**문제점**:
- 모든 함수마다 try-catch 작성
- 재시도 로직 직접 구현
- 에러 경계 처리 어려움

---

#### React Query: 자동 처리
```typescript
const { data, error, isError, refetch } = useQuery({
  queryKey: ['images', query],
  queryFn: () => api.search(query),
  retry: 3, // 자동 3회 재시도
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
});

// 컴포넌트에서
if (isError) {
  return <ErrorMessage error={error} onRetry={refetch} />;
}
```

**장점**:
- 자동 재시도 (설정 가능)
- 지수 백오프 내장
- refetch로 쉬운 재시도

---

### 4. 학습 곡선

#### Zustand
```
난이도: ★☆☆☆☆ (매우 쉬움)

학습 시간: ~1-2시간
- create() 함수
- set/get 사용법
- 선택적 구독
- 미들웨어 (devtools)

개념: React useState와 유사
```

#### React Query
```
난이도: ★★★☆☆ (중간)

학습 시간: ~4-8시간
- QueryClient 설정
- useQuery/useMutation
- queryKey 개념
- staleTime vs gcTime
- 캐싱 전략
- 재시도 로직
- Optimistic Updates
- Prefetch

개념: 서버 상태 관리 패러다임 이해 필요
```

---

## 장단점 비교

### Zustand

#### 장점 ✅
1. **간단한 API**: 배우기 쉽고 직관적
2. **작은 번들**: ~3KB로 매우 가벼움
3. **유연성**: 원하는 대로 상태 관리 가능
4. **선택적 구독**: 세밀한 렌더링 제어
5. **React 외 사용 가능**: Vanilla JS에서도 사용 가능
6. **미들웨어 생태계**: persist, immer 등 다양한 미들웨어

#### 단점 ❌
1. **수동 관리**: 로딩, 에러, 캐싱 직접 구현
2. **보일러플레이트**: CRUD마다 반복 코드
3. **캐싱 없음**: 같은 데이터 반복 요청
4. **재시도 로직 없음**: 직접 구현 필요
5. **서버 상태 동기화 어려움**: 실시간 업데이트 복잡
6. **고급 기능 부족**: Prefetch, Optimistic Updates 직접 구현

---

### React Query

#### 장점 ✅
1. **자동 캐싱**: 네트워크 요청 최소화
2. **자동 재시도**: 실패 시 자동 재시도
3. **자동 동기화**: 창 포커스 시 자동 refetch
4. **강력한 DevTools**: 쿼리 상태 실시간 확인
5. **내장 최적화**: Prefetch, Deduping, Polling 등
6. **Optimistic Updates**: 낙관적 업데이트 쉽게 구현
7. **타입 안전**: 강력한 TypeScript 지원
8. **적은 보일러플레이트**: 선언적 코드

#### 단점 ❌
1. **학습 곡선**: 개념 이해에 시간 필요
2. **번들 크기**: ~13KB (Zustand보다 4배)
3. **서버 상태 전용**: 클라이언트 상태에는 부적합
4. **설정 복잡도**: staleTime, gcTime 등 설정 이해 필요
5. **과한 기능**: 간단한 앱에는 오버엔지니어링
6. **의존성**: React Query에 강하게 의존

---

## 사용 사례별 권장사항

### Zustand를 선택해야 하는 경우 ✅

1. **클라이언트 전용 상태 관리**
   - 예: 테마 설정, 사이드바 열림/닫힘, 모달 상태
   ```typescript
   interface UIStore {
     theme: 'light' | 'dark';
     isSidebarOpen: boolean;
     toggleSidebar: () => void;
   }
   ```

2. **간단한 앱 또는 프로토타입**
   - 빠르게 시작하고 싶을 때
   - 복잡한 캐싱 불필요

3. **번들 크기가 중요한 경우**
   - 모바일 웹, 느린 네트워크 환경
   - 매 KB가 중요한 경우

4. **React 외 프레임워크 사용**
   - Vanilla JS, Svelte, Vue 등

5. **세밀한 렌더링 제어 필요**
   - 성능 최적화가 중요한 대시보드
   - 복잡한 상태 의존성

---

### React Query를 선택해야 하는 경우 ✅

1. **서버 데이터 중심 앱**
   - 예: 이커머스, 소셜 미디어, 대시보드
   ```typescript
   // 상품 목록, 사용자 프로필, 주문 내역 등
   useQuery({ queryKey: ['products'], queryFn: fetchProducts });
   ```

2. **실시간 동기화 필요**
   - 여러 사용자가 동시 작업
   - 데이터 최신성이 중요

3. **복잡한 데이터 페칭**
   - 페이지네이션
   - 무한 스크롤
   - Prefetch

4. **네트워크 요청이 많은 앱**
   - API 호출 최적화 필요
   - 캐싱으로 성능 개선

5. **개발 생산성 중요**
   - 보일러플레이트 최소화
   - 빠른 기능 개발

---

### 함께 사용하는 경우 (Best Practice) 🎯

**추천**: React Query (서버 상태) + Zustand (클라이언트 상태)

```typescript
// 1. 서버 상태: React Query
const { data: products } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
});

// 2. 클라이언트 상태: Zustand
const { theme, cart, toggleTheme } = useUIStore();

// 3. 각자의 강점 활용!
```

**예시**:
- **React Query**: 상품 목록, 사용자 프로필, 주문 내역
- **Zustand**: 테마, 장바구니, 사이드바, 모달 상태

---

## 마이그레이션 가이드

### Zustand → React Query 마이그레이션

#### Step 1: 서버 상태와 클라이언트 상태 분리

```typescript
// Before (Zustand)
interface ImageStore {
  images: Image[];         // 서버 상태
  isLoading: boolean;      // 서버 상태
  error: Error | null;     // 서버 상태
  currentPage: number;     // 클라이언트 상태
  query: string;           // 클라이언트 상태
}
```

```typescript
// After (React Query + Zustand)

// 서버 상태: React Query
const { data: images, isLoading, error } = useQuery({
  queryKey: ['images', query, page],
  queryFn: () => fetchImages(query, page),
});

// 클라이언트 상태: Zustand (또는 useState)
const [page, setPage] = useState(1);
const [query, setQuery] = useState('');
```

---

#### Step 2: API 호출을 queryFn으로 변환

```typescript
// Before (Zustand)
searchImages: async (query: string) => {
  set({ isLoading: true, error: null });
  try {
    const result = await api.search(query);
    set({ images: result.data, isLoading: false });
  } catch (error) {
    set({ error, isLoading: false });
  }
};
```

```typescript
// After (React Query)
const useImages = (query: string) => {
  return useQuery({
    queryKey: ['images', query],
    queryFn: () => api.search(query),
    enabled: query.length > 0,
  });
};

// 컴포넌트에서
const { data: images, isLoading, error } = useImages(query);
```

---

#### Step 3: 캐싱 설정 추가

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,  // 5분
      gcTime: 10 * 60 * 1000,    // 10분
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
});
```

---

#### Step 4: 점진적 마이그레이션

```typescript
// 1단계: 일부 상태만 React Query로 이동
const { data: images } = useQuery(['images'], fetchImages);
const { theme } = useUIStore(); // Zustand 유지

// 2단계: 모든 서버 상태 이동 완료
// 3단계: 클라이언트 상태도 필요 시 Zustand 유지
```

---

## 결론

### 요약 테이블

| 요구사항 | Zustand | React Query |
|---------|---------|-------------|
| 간단한 앱 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 복잡한 서버 상태 | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| 번들 크기 최소화 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 개발 생산성 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 학습 곡선 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 캐싱/최적화 | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| 타입 안전성 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| DevTools | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 클라이언트 상태 | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| 서버 상태 | ⭐⭐ | ⭐⭐⭐⭐⭐ |

---

### 최종 권장사항

#### 🎯 **Best Practice: 함께 사용**

```typescript
// 서버 상태: React Query
const { data: user } = useQuery(['user'], fetchUser);
const { data: posts } = useQuery(['posts'], fetchPosts);

// 클라이언트 상태: Zustand
const { theme, sidebar, cart } = useUIStore();
```

**이유**:
- 각각의 강점을 최대한 활용
- 명확한 책임 분리
- 최고의 개발 경험

---

#### 단독 사용 시

**Zustand 선택**:
- 간단한 앱, 프로토타입
- 클라이언트 상태 중심
- 번들 크기 중요

**React Query 선택**:
- 데이터 중심 앱 (이커머스, 대시보드)
- 복잡한 서버 상태 관리
- 캐싱/최적화 필요

---

## 참고 자료

- [Zustand 공식 문서](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [React Query 공식 문서](https://tanstack.com/query/latest)
- [When to use Zustand vs React Query](https://tkdodo.eu/blog/zustand-and-react-query)

---

**작성일**: 2025-12-23
**프로젝트**: js-to-next (Phase 2 vs Phase 3)
