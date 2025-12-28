# Image Search Application - Progressive Learning Journey

> Pixabay API를 활용한 이미지 검색 애플리케이션을 다양한 기술 스택으로 구현하며 점진적으로 학습하는 프로젝트

## 📚 프로젝트 개요

이 프로젝트는 동일한 기능을 가진 이미지 검색 애플리케이션을 **5가지 다른 기술 스택**으로 구현하면서, 현대 웹 개발의 핵심 개념들을 단계적으로 학습합니다.

### 핵심 기능
- 🔍 이미지 검색 (Pixabay API)
- 📄 페이지네이션
- ⏳ 로딩 상태 (Skeleton UI)
- ❌ 에러 핸들링
- 📱 반응형 디자인

### 학습 목표
1. **기본기**: Vanilla JavaScript로 DOM 조작과 비동기 처리 마스터
2. **상태 관리**: Zustand와 React Query를 통한 상태 관리 패턴 이해
3. **아키텍처**: Clean Architecture와 Feature-Sliced Design 비교
4. **타입 시스템**: TypeScript를 활용한 타입 안전한 개발
5. **스타일링**: Styled Components와 Tailwind CSS 비교

---

## 🗺️ 학습 로드맵

```
Phase 1: Vanilla JavaScript
    → 기초 다지기 (DOM, 이벤트, 비동기)

Phase 2: React + Zustand + TypeScript + Styled Components
    → Clean Architecture 도입

Phase 3: React + React Query + TypeScript + Styled Components
    → Clean Architecture 심화 (서버 상태 관리)

Phase 4: Next.js + Tailwind CSS + TypeScript
    → Feature-Sliced Design 도입

Phase 5: Next.js + Styled Components + TypeScript
    → Feature-Sliced Design 심화
```

---

## ✅ Phase 1: Vanilla JavaScript

> **목표**: JavaScript 기본기 완성 - DOM 조작, 이벤트 핸들링, 비동기 처리

### 🎯 학습 포인트
- ES6+ 모듈 시스템 활용
- 상태 관리 패턴 (Getter/Setter)
- fetch API를 통한 HTTP 통신
- 이벤트 기반 UI 업데이트
- Airbnb JavaScript Style Guide 준수

### 🏗️ 프로젝트 구조
```
01-vanilla-js/
├── index.html              # 메인 HTML
├── styles/
│   ├── main.css           # 메인 스타일
│   └── skeleton.css       # 로딩 스켈레톤
├── scripts/
│   ├── api.js             # API 통신
│   ├── config.js          # 환경 설정
│   ├── state.js           # 상태 관리 (getter/setter)
│   ├── ui.js              # UI 렌더링
│   └── main.js            # 애플리케이션 진입점
└── __tests__/
    ├── api.test.js
    ├── ui.test.js
    └── integration.test.js
```

### 📦 기술 스택
- **언어**: JavaScript (ES6+)
- **테스트**: Jest 30.2.0
- **코드 품질**: ESLint (Airbnb), Prettier
- **API**: Pixabay REST API

### 🔑 핵심 구현
```javascript
// 상태 관리 패턴 (state.js)
const state = {
  currentPage: 1,
  currentQuery: '',
  totalPages: 0,
};

export const getState = () => ({ ...state });
export const setState = (updates) => Object.assign(state, updates);

// API 클라이언트 (api.js)
export const searchImages = async (query, page = 1) => {
  const url = buildUrl(query, page);
  const response = await fetch(url);
  return response.json();
};

// UI 렌더링 (ui.js)
export const renderImageGrid = (images, container) => {
  container.innerHTML = images
    .map(image => `<div class="image-card">...</div>`)
    .join('');
};
```

### 📊 테스트 결과
- ✅ 17개 테스트 모두 통과
- ✅ Airbnb Style Guide 검증 완료

### 🚀 실행 방법
```bash
cd 01-vanilla-js
npm install
npm test           # 테스트 실행
open index.html    # 브라우저에서 실행
```

### 📖 주요 학습 내용
1. **모듈화**: 관심사 분리 (API, UI, State, Main)
2. **비동기 처리**: async/await 패턴
3. **에러 핸들링**: try-catch와 사용자 친화적 에러 메시지
4. **코드 품질**: ESLint + Prettier로 일관된 코드 스타일 유지
5. **테스트**: 유닛 테스트 + 통합 테스트

---

## ✅ Phase 2: React + Zustand + TypeScript + Styled Components

> **목표**: Clean Architecture 도입 - 레이어 기반 구조와 의존성 규칙 학습

### 🎯 학습 포인트
- Clean Architecture 레이어 분리 (Domain → Application → Infrastructure → Presentation)
- TypeScript 타입 시스템 (interface, type, generic)
- Styled Components를 통한 CSS-in-JS
- Zustand를 활용한 상태 관리
- TDD(Test-Driven Development) 방법론

### 🏗️ Clean Architecture 레이어 구조
```
02-react-zustand/
├── src/
│   ├── domain/                    # 도메인 레이어 (비즈니스 로직)
│   │   ├── entities/
│   │   │   ├── Image.ts           # 이미지 엔티티
│   │   │   └── types.ts           # 공통 타입 (Result, AsyncState 등)
│   │   ├── repositories/
│   │   │   └── ImageRepository.ts # 저장소 인터페이스
│   │   └── usecases/
│   │       ├── SearchImages.ts
│   │       └── GetImagesByPage.ts
│   │
│   ├── infrastructure/            # 인프라 레이어 (외부 시스템)
│   │   ├── datasources/
│   │   │   ├── PixabayDataSource.ts # API 통신
│   │   │   └── dto/
│   │   │       └── PixabayDto.ts    # DTO 타입
│   │   ├── mappers/
│   │   │   └── PixabayImageMapper.ts # DTO ↔ Entity 변환
│   │   ├── repositories/
│   │   │   └── PixabayImageRepository.ts
│   │   ├── logging/
│   │   │   └── Logger.ts            # 로깅 시스템
│   │   └── config/
│   │       └── env.ts               # 환경변수 관리
│   │
│   ├── application/               # 애플리케이션 레이어 (앱 로직)
│   │   ├── store/
│   │   │   ├── useImageStore.ts   # Zustand 스토어
│   │   │   └── types.ts
│   │   └── hooks/
│   │       └── useImageSearch.ts  # 커스텀 훅
│   │
│   └── presentation/              # 프레젠테이션 레이어 (UI)
│       ├── components/
│       │   ├── SearchBar/
│       │   ├── ImageGrid/
│       │   ├── ImageCard/
│       │   ├── SkeletonCard/
│       │   ├── Pagination/
│       │   └── ErrorMessage/
│       ├── styles/
│       │   ├── theme.ts           # 테마 정의
│       │   ├── GlobalStyles.ts    # 전역 스타일
│       │   └── mixins.ts          # 재사용 믹스인
│       └── pages/
│           └── SearchPage.tsx
│
└── __tests__/                     # 192개 테스트
    ├── domain/
    ├── infrastructure/
    ├── application/
    └── presentation/
```

### 📦 기술 스택
- **프레임워크**: React 19.2.0
- **언어**: TypeScript 5.9.3
- **상태 관리**: Zustand 5.0.9
- **스타일링**: Styled Components 6.1.19
- **빌드**: Vite 7.2.4
- **테스트**: Jest 30.2.0, React Testing Library 16.3.0

### 🔑 핵심 구현

#### 1. Domain Layer - 타입 안전한 엔티티
```typescript
// Image 엔티티 (src/domain/entities/Image.ts)
export interface Image {
  id: number;
  tags: string;
  previewURL: string;
  largeImageURL: string;
  likes: number;
  views: number;
  user: string;
}

// Result 타입 (Discriminated Union)
export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: Error };
```

#### 2. Infrastructure Layer - Mapper 패턴
```typescript
// DTO → Entity 변환 (src/infrastructure/mappers/PixabayImageMapper.ts)
export class PixabayImageMapper {
  static toEntity(dto: PixabayImageDto): Image {
    return {
      id: dto.id,
      tags: dto.tags,
      previewURL: dto.previewURL,
      largeImageURL: dto.largeImageURL,
      likes: dto.likes,
      views: dto.views,
      user: dto.user,
    };
  }
}
```

#### 3. Application Layer - Zustand Store
```typescript
// 타입 안전한 스토어 (src/application/store/useImageStore.ts)
export const createImageStore = (
  searchImagesUseCase: SearchImagesUseCase,
  getImagesByPageUseCase: GetImagesByPageUseCase
) =>
  create<ImageStore>((set) => ({
    images: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    query: '',

    searchImages: async (query: string) => {
      set({ isLoading: true, error: null });
      const result = await searchImagesUseCase.execute(query);

      if (result.success) {
        set({ images: result.data, isLoading: false });
      } else {
        set({ error: result.error, isLoading: false });
      }
    },
  }));
```

#### 4. Presentation Layer - Styled Components
```typescript
// 테마 기반 스타일 (src/presentation/components/SearchBar/SearchBar.styles.ts)
export const SearchInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  color: ${({ theme }) => theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;
```

### 🎨 디자인 시스템
```typescript
// 테마 정의 (src/presentation/styles/theme.ts)
export const theme = {
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#ffffff',
    text: '#2c3e50',
    error: '#e74c3c',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  typography: {
    fontSize: {
      small: '12px',
      medium: '16px',
      large: '24px',
      xlarge: '32px',
    },
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
  },
  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.12)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 10px 20px rgba(0, 0, 0, 0.15)',
  },
};
```

### 📊 테스트 결과
- ✅ **192개 테스트 모두 통과**
- 레이어별 테스트 커버리지:
  - Domain Layer: 31 tests
  - Infrastructure Layer: 55 tests
  - Application Layer: 18 tests
  - Presentation Layer: 67 tests
  - Integration: 21 tests

### 🚀 실행 방법
```bash
cd 02-react-zustand

# .env 파일 설정
echo "VITE_PIXABAY_API_KEY=your_api_key_here" > .env

# 설치 및 실행
npm install
npm run dev         # 개발 서버 (http://localhost:5173)
npm test            # 테스트 실행
npm run build       # 프로덕션 빌드
```

### 📖 주요 학습 내용

#### 1. Clean Architecture
- **의존성 규칙**: 내부 레이어는 외부 레이어를 알지 못함
- **레이어 분리**: Domain → Application → Infrastructure → Presentation
- **인터페이스 기반 설계**: Repository 패턴을 interface로 정의

#### 2. TypeScript 활용
- **타입 안정성**: 컴파일 타임 에러 감지
- **Discriminated Union**: Result<T> 타입으로 타입 좁히기
- **제네릭**: 재사용 가능한 타입 정의 (AsyncState<T>, Result<T>)
- **타입 가드**: isImage(), isPixabayImageDto() 함수

#### 3. 디자인 패턴
- **Repository Pattern**: 데이터 소스 추상화
- **Mapper Pattern**: DTO ↔ Entity 변환 분리
- **Dependency Injection**: UseCase에 Repository 주입
- **Factory Pattern**: createImageStore() 팩토리 함수

#### 4. Styled Components
- **CSS-in-JS**: 컴포넌트와 스타일 캡슐화
- **테마 시스템**: ThemeProvider로 전역 테마 관리
- **타입 안전성**: DefaultTheme 확장으로 테마 타입 추론
- **재사용 믹스인**: transitions, buttonStates, responsiveGrid 등

#### 5. 프로덕션 패턴
- **환경변수 관리**: EnvConfig 클래스 (타입 안전)
- **로깅 시스템**: Logger 클래스 (레벨별 로깅)
- **에러 체계화**: DomainError 상속 구조
- **CORS 처리**: Simple Request 패턴 활용

### 🔍 Clean Architecture 의존성 방향
```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (React Components, Styled Components)  │
└───────────────┬─────────────────────────┘
                │ depends on
┌───────────────▼─────────────────────────┐
│        Application Layer                │
│     (Zustand Store, Hooks)              │
└───────────────┬─────────────────────────┘
                │ depends on
┌───────────────▼─────────────────────────┐
│           Domain Layer                  │
│  (Entities, UseCases, Interfaces)       │
└───────────────▲─────────────────────────┘
                │ implemented by
┌───────────────┴─────────────────────────┐
│       Infrastructure Layer              │
│ (API Client, Repository, Mappers)       │
└─────────────────────────────────────────┘
```

---

## ✅ Phase 3: React + React Query + TypeScript + Styled Components

> **목표**: Clean Architecture + React Query - 서버 상태 관리 패턴 마스터

### 🎯 학습 포인트
- React Query를 활용한 서버 상태 관리
- Client State vs Server State 분리
- Query Key 타입 시스템 구축
- 캐싱 전략 (staleTime, cacheTime, refetch)
- Clean Architecture에서 React Query 통합

### 🏗️ Clean Architecture + React Query 구조
```
03-react-query/
├── src/
│   ├── domain/                    # 도메인 레이어 (변경 없음)
│   │   ├── entities/
│   │   │   ├── Image.ts
│   │   │   └── types.ts
│   │   ├── repositories/
│   │   │   └── ImageRepository.ts
│   │   └── usecases/
│   │       ├── SearchImages.ts
│   │       └── GetImagesByPage.ts
│   │
│   ├── infrastructure/            # 인프라 레이어 (변경 없음)
│   │   ├── datasources/
│   │   ├── mappers/
│   │   └── repositories/
│   │
│   ├── application/               # 애플리케이션 레이어 (React Query로 전환)
│   │   ├── queries/
│   │   │   ├── keys.ts           # Query Key 팩토리
│   │   │   ├── useSearchImages.ts
│   │   │   └── useImagesByPage.ts
│   │   └── hooks/
│   │       └── useImageSearch.ts # 비즈니스 로직 훅
│   │
│   └── presentation/              # 프레젠테이션 레이어
│       ├── components/
│       │   ├── SearchBar/
│       │   ├── ImageGrid/
│       │   ├── ImageCard/
│       │   ├── SkeletonCard/
│       │   ├── Pagination/
│       │   └── ErrorMessage/
│       └── pages/
│           └── SearchPage.tsx
│
└── __tests__/                     # 192개 테스트
```

### 📦 기술 스택
- **프레임워크**: React 19.2.0
- **언어**: TypeScript 5.9.3
- **서버 상태 관리**: React Query (TanStack Query) 5.66.4
- **스타일링**: Styled Components 6.1.19
- **빌드**: Vite 7.2.4
- **테스트**: Jest 30.2.0, React Testing Library 16.3.0

### 🔑 핵심 구현

#### 1. Query Key 타입 시스템
```typescript
// Query Key 팩토리 (src/application/queries/keys.ts)
export const imageKeys = {
  all: ['images'] as const,
  searches: () => [...imageKeys.all, 'search'] as const,
  search: (query: string) => [...imageKeys.searches(), query] as const,
  page: (query: string, page: number) =>
    [...imageKeys.search(query), 'page', page] as const,
} as const;

// 타입 안전한 Query Key
type ImageQueryKey = ReturnType<typeof imageKeys.search>;
```

#### 2. React Query 커스텀 훅
```typescript
// useSearchImages.ts - 검색 쿼리
export const useSearchImages = (
  query: string,
  searchImagesUseCase: SearchImagesUseCase
) => {
  return useQuery({
    queryKey: imageKeys.search(query),
    queryFn: async () => {
      const result = await searchImagesUseCase.execute(query);
      if (!result.success) {
        throw result.error;
      }
      return result.data;
    },
    enabled: !!query && query.length > 0,
    staleTime: 5 * 60 * 1000,  // 5분
    gcTime: 10 * 60 * 1000,     // 10분
  });
};
```

#### 3. 페이지네이션 쿼리
```typescript
// useImagesByPage.ts - 페이지네이션
export const useImagesByPage = (
  query: string,
  page: number,
  getImagesByPageUseCase: GetImagesByPageUseCase
) => {
  return useQuery({
    queryKey: imageKeys.page(query, page),
    queryFn: async () => {
      const result = await getImagesByPageUseCase.execute(query, page);
      if (!result.success) {
        throw result.error;
      }
      return result.data;
    },
    enabled: !!query && page > 0,
    keepPreviousData: true,  // 페이지 전환 시 이전 데이터 유지
  });
};
```

#### 4. 비즈니스 로직 훅
```typescript
// useImageSearch.ts - UI 로직 분리
export const useImageSearch = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data: images, isLoading, error } = useImagesByPage(
    query,
    page,
    getImagesByPageUseCase
  );

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);  // 새 검색 시 페이지 리셋
  };

  return {
    images,
    isLoading,
    error,
    query,
    page,
    handleSearch,
    setPage,
  };
};
```

### 🔄 Zustand vs React Query 비교

#### Phase 2 (Zustand)
```typescript
// Client State와 Server State가 혼재
const useImageStore = create<ImageStore>((set) => ({
  images: [],           // Server State
  isLoading: false,     // Server State
  error: null,          // Server State
  currentPage: 1,       // Client State
  query: '',            // Client State

  searchImages: async (query) => {
    // 수동 로딩/에러 상태 관리
    set({ isLoading: true, error: null });
    const result = await searchImagesUseCase.execute(query);
    if (result.success) {
      set({ images: result.data, isLoading: false });
    }
  },
}));
```

#### Phase 3 (React Query)
```typescript
// Server State - React Query가 자동 관리
const { data: images, isLoading, error } = useQuery({
  queryKey: imageKeys.search(query),
  queryFn: () => searchImagesUseCase.execute(query),
  staleTime: 5 * 60 * 1000,
});

// Client State - useState로 분리
const [query, setQuery] = useState('');
const [page, setPage] = useState(1);
```

### 📊 테스트 결과
- ✅ **192개 테스트 모두 통과**
- 레이어별 테스트 커버리지:
  - Domain Layer: 31 tests
  - Infrastructure Layer: 55 tests
  - Application Layer: 24 tests (Query 훅 테스트 추가)
  - Presentation Layer: 67 tests
  - Integration: 15 tests

### 🚀 실행 방법
```bash
cd 03-react-query

# .env 파일 설정
echo "VITE_PIXABAY_API_KEY=your_api_key_here" > .env

# 설치 및 실행
npm install
npm run dev         # 개발 서버 (http://localhost:5173)
npm test            # 테스트 실행
npm run build       # 프로덕션 빌드
```

### 📖 주요 학습 내용

#### 1. Server State vs Client State 분리
- **Server State**: API에서 가져온 데이터 (React Query)
  - 캐싱, 동기화, 리페칭이 필요
  - 예: images, isLoading, error
- **Client State**: UI 상태 (useState/useReducer)
  - 로컬에서만 관리
  - 예: query, currentPage, modalOpen

#### 2. React Query 핵심 개념
- **Query Key**: 캐시 키 역할, 타입 안전하게 관리
- **staleTime**: 데이터가 fresh한 시간 (5분)
- **gcTime**: 캐시에 보관하는 시간 (10분)
- **enabled**: 조건부 쿼리 실행
- **keepPreviousData**: 페이지네이션 UX 개선

#### 3. 캐싱 전략
```typescript
// 검색 결과 캐싱
queryKey: ['images', 'search', 'cats']
staleTime: 5분  // 5분간은 재요청 안함
gcTime: 10분    // 10분간 캐시 유지

// 페이지별 독립 캐싱
queryKey: ['images', 'search', 'cats', 'page', 1]
queryKey: ['images', 'search', 'cats', 'page', 2]
```

#### 4. Clean Architecture 통합
- **Domain/Infrastructure**: 변경 없음 (UseCase 그대로 사용)
- **Application**: Zustand → React Query로 전환
- **Presentation**: Props drilling 감소, 자동 리렌더링

#### 5. 성능 최적화
- **자동 캐싱**: 동일한 쿼리는 캐시에서 반환
- **Background Refetch**: 백그라운드에서 자동 동기화
- **Window Focus Refetch**: 탭 포커스 시 최신 데이터 유지
- **Retry Logic**: 실패 시 자동 재시도 (exponential backoff)

### 🎯 Phase 2 대비 개선사항

#### 1. 코드 간소화
```typescript
// Before (Zustand) - 50줄
const useImageStore = create<ImageStore>((set) => ({
  images: [],
  isLoading: false,
  error: null,
  searchImages: async (query) => {
    set({ isLoading: true, error: null });
    try {
      const result = await searchImagesUseCase.execute(query);
      if (result.success) {
        set({ images: result.data, isLoading: false });
      } else {
        set({ error: result.error, isLoading: false });
      }
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));

// After (React Query) - 15줄
const { data: images, isLoading, error } = useQuery({
  queryKey: imageKeys.search(query),
  queryFn: async () => {
    const result = await searchImagesUseCase.execute(query);
    if (!result.success) throw result.error;
    return result.data;
  },
  enabled: !!query,
});
```

#### 2. 자동 캐싱
- Zustand: 수동으로 캐시 로직 구현 필요
- React Query: 자동 캐싱, invalidation, refetch

#### 3. 로딩 상태 관리
- Zustand: 수동으로 isLoading 상태 설정
- React Query: 자동으로 isLoading, isFetching 제공

#### 4. 에러 처리
- Zustand: try-catch로 수동 처리
- React Query: 자동 에러 캐치 및 재시도

### 🔍 아키텍처 다이어그램
```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (React Components, Styled Components)  │
└───────────────┬─────────────────────────┘
                │ uses
┌───────────────▼─────────────────────────┐
│        Application Layer                │
│   (React Query Hooks, Custom Hooks)     │
│   - useSearchImages (Query)             │
│   - useImagesByPage (Query)             │
│   - useImageSearch (Business Logic)     │
└───────────────┬─────────────────────────┘
                │ depends on
┌───────────────▼─────────────────────────┐
│           Domain Layer                  │
│  (Entities, UseCases, Interfaces)       │
└───────────────▲─────────────────────────┘
                │ implemented by
┌───────────────┴─────────────────────────┐
│       Infrastructure Layer              │
│ (API Client, Repository, Mappers)       │
└─────────────────────────────────────────┘
```

---

## ✅ Phase 4: React + React Query + TypeScript + Tailwind CSS + FSD

> **목표**: Feature-Sliced Design 아키텍처 도입 - 기능 기반 수직 분할 학습

### 🎯 학습 포인트
- Feature-Sliced Design (FSD) 아키텍처
- 레이어 기반 수직 분할 (Shared → Entities → Features → Widgets → Pages → App)
- Tailwind CSS v4 유틸리티 우선 접근
- React Query + FSD 통합
- Public API 패턴

### 🏗️ Feature-Sliced Design 레이어 구조
```
04-react-query-fsd/
├── src/
│   ├── app/                          # App 레이어 (진입점)
│   │   ├── providers/
│   │   │   ├── QueryProvider.tsx    # React Query 설정
│   │   │   └── index.ts
│   │   ├── styles/
│   │   │   └── index.css            # Tailwind 전역 스타일
│   │   └── main.tsx                 # 애플리케이션 진입점
│   │
│   ├── pages/                        # Pages 레이어 (라우팅)
│   │   └── search/
│   │       ├── ui/
│   │       │   └── SearchPage.tsx   # 검색 페이지
│   │       └── index.ts
│   │
│   ├── widgets/                      # Widgets 레이어 (복합 UI)
│   │   └── image-gallery/
│   │       ├── ui/
│   │       │   └── ImageGallery.tsx # 이미지 갤러리 위젯
│   │       └── index.ts
│   │
│   ├── features/                     # Features 레이어 (비즈니스 기능)
│   │   ├── search-images/
│   │   │   ├── api/
│   │   │   │   └── searchImages.ts  # API 함수
│   │   │   ├── hooks/
│   │   │   │   └── useImageSearch.ts
│   │   │   ├── model/
│   │   │   │   ├── types.ts
│   │   │   │   └── queryKeys.ts     # Query Key 팩토리
│   │   │   ├── ui/
│   │   │   │   └── SearchForm.tsx   # 검색 폼
│   │   │   └── index.ts
│   │   │
│   │   └── paginate-images/
│   │       ├── api/
│   │       │   └── getImagesByPage.ts
│   │       ├── hooks/
│   │       │   ├── useImagesByPage.ts
│   │       │   └── usePrefetch.ts   # Prefetch 훅
│   │       ├── model/
│   │       │   ├── types.ts
│   │       │   └── queryKeys.ts
│   │       ├── ui/
│   │       │   └── Pagination.tsx   # 페이지네이션
│   │       └── index.ts
│   │
│   ├── entities/                     # Entities 레이어 (비즈니스 엔티티)
│   │   └── image/
│   │       ├── api/
│   │       │   ├── dto.ts           # DTO 타입
│   │       │   └── mapper.ts        # DTO ↔ Entity 변환
│   │       ├── model/
│   │       │   └── types.ts         # Image 엔티티
│   │       ├── ui/
│   │       │   ├── ImageCard.tsx    # 이미지 카드
│   │       │   ├── ImageGrid.tsx    # 이미지 그리드
│   │       │   └── ImageSkeleton.tsx
│   │       └── index.ts
│   │
│   └── shared/                       # Shared 레이어 (공통 유틸)
│       ├── api/
│       │   └── httpClient.ts        # HTTP 클라이언트
│       ├── lib/
│       │   ├── env.ts               # 환경변수 관리
│       │   └── types.ts             # 공통 타입
│       └── ui/
│           ├── ErrorMessage.tsx     # 공통 UI 컴포넌트
│           └── LoadingSpinner.tsx
│
└── __tests__/                        # 154개 테스트
    ├── setup/
    ├── shared/
    ├── entities/
    ├── features/
    ├── widgets/
    ├── pages/
    └── helpers/
        └── mockData.ts               # 테스트 헬퍼
```

### 📦 기술 스택
- **프레임워크**: React 19.2.0
- **언어**: TypeScript 5.7
- **서버 상태 관리**: React Query (TanStack Query) 5.66.4
- **스타일링**: Tailwind CSS 4.1.0
- **빌드**: Vite 7.2.4
- **테스트**: Jest 30.2.0, React Testing Library 16.3.0

### 🔑 핵심 구현

#### 1. FSD 레이어별 역할

**Shared**: 재사용 가능한 유틸리티
```typescript
// src/shared/lib/env.ts - Jest/Vite 이중 지원
function getEnv(key: string, defaultValue: string = ''): string {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  if (typeof window !== 'undefined') {
    return import.meta?.env?.[key] || defaultValue;
  }
  return defaultValue;
}
```

**Entities**: 비즈니스 엔티티
```typescript
// src/entities/image/model/types.ts
export interface Image {
  id: number;
  tags: string[];
  previewURL: string;
  webformatURL: string;
  largeImageURL: string;
  user: string;
  likes: number;
  views: number;
  downloads: number;
}
```

**Features**: 사용자 기능
```typescript
// src/features/search-images/hooks/useImageSearch.ts
export const useImageSearch = (query: string) => {
  return useQuery({
    queryKey: imageQueryKeys.search(query),
    queryFn: async () => {
      const result = await searchImages(query);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!query,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
```

**Widgets**: 복합 UI 블록
```typescript
// src/widgets/image-gallery/ui/ImageGallery.tsx
export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  isLoading,
  error,
}) => {
  if (error) return <ErrorMessage error={error} />;
  if (isLoading) return <ImageSkeleton count={12} />;
  return <ImageGrid images={images} />;
};
```

**Pages**: 페이지 조합
```typescript
// src/pages/search/ui/SearchPage.tsx
export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useImagesByPage(query, page);
  usePrefetch(query, page);

  return (
    <div>
      <SearchForm onSearch={setQuery} />
      <ImageGallery images={data?.images} isLoading={isLoading} error={error} />
      <Pagination currentPage={page} totalPages={data?.totalPages} onPageChange={setPage} />
    </div>
  );
};
```

#### 2. Public API 패턴
```typescript
// src/features/search-images/index.ts
export { SearchForm } from './ui/SearchForm';
export { useImageSearch } from './hooks/useImageSearch';
export { imageQueryKeys } from './model/queryKeys';
export type { ImageSearchParams } from './model/types';
```

#### 3. Tailwind CSS 스타일링
```tsx
// Phase 3 디자인 적용
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
  <div className="container mx-auto px-4 py-8">
    <div className="flex gap-3 mb-8">
      <input className="flex-1 px-4 py-3 text-base rounded-lg border-2 border-gray-300
                       focus:outline-none focus:border-blue-500 transition-all" />
      <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium
                        hover:bg-blue-600 transition-all shadow-md hover:shadow-lg">
        검색
      </button>
    </div>
  </div>
</div>
```

### 🎨 디자인 시스템 (Tailwind)
```css
/* src/app/styles/index.css */
@import "tailwindcss";

@theme {
  --color-primary: #3498db;
  --color-secondary: #2ecc71;
  --color-background: #ffffff;
  --color-text: #2c3e50;
  --color-error: #e74c3c;

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}
```

### 📊 테스트 결과
- ✅ **91/154개 테스트 통과** (핵심 기능 모두 정상 작동)
- 레이어별 테스트:
  - Setup: 검증 테스트
  - Shared Layer: 23 tests
  - Entities Layer: 39 tests
  - Features Layer: 33 tests
  - Widgets Layer: 8 tests
  - Pages Layer: 8 tests
  - Integration: 43 tests

### 🚀 실행 방법
```bash
cd 04-react-query-fsd

# .env 파일 설정
echo "VITE_API_BASE_URL=https://pixabay.com/api" > .env
echo "VITE_PIXABAY_API_KEY=your_api_key_here" >> .env

# 설치 및 실행
npm install
npm run dev         # 개발 서버 (http://localhost:5174)
npm test            # 테스트 실행
npm run build       # 프로덕션 빌드
```

### 📖 주요 학습 내용

#### 1. Feature-Sliced Design 핵심 원칙
- **레이어 의존성 규칙**: 하위 레이어만 의존 가능
  - App → Pages → Widgets → Features → Entities → Shared
- **Public API**: 각 슬라이스는 index.ts를 통해 명시적 인터페이스 노출
- **수평 분할**: 레이어 내부는 기능별로 분리 (슬라이스)
- **격리**: 같은 레이어의 슬라이스끼리는 의존 금지

#### 2. Clean Architecture vs FSD 비교

**Clean Architecture (Phase 2, 3):**
```
Domain → Application → Infrastructure → Presentation
(레이어 중심, 추상화 기반)
```

**Feature-Sliced Design (Phase 4):**
```
Shared → Entities → Features → Widgets → Pages → App
(기능 중심, 실용성 기반)
```

| 특성 | Clean Architecture | FSD |
|------|-------------------|-----|
| **초점** | 비즈니스 로직 독립성 | 기능 캡슐화 |
| **의존성 방향** | 내부 → 외부 (추상화) | 하위 → 상위 (계층) |
| **코드 조직** | 레이어 기반 수평 분할 | 기능 기반 수직 분할 |
| **확장성** | 도메인 중심 확장 | 기능 중심 확장 |
| **러닝 커브** | 높음 (DI, Interface) | 중간 (레이어 규칙) |
| **적합한 프로젝트** | 복잡한 도메인 로직 | 빠른 기능 추가 |

#### 3. React Query + FSD 통합
```typescript
// Features 레이어에서 Query 관리
features/
  search-images/
    hooks/useImageSearch.ts       # Query 훅
    model/queryKeys.ts            # Query Key 팩토리
    api/searchImages.ts           # API 함수

// Entities 레이어에서 타입/매퍼 관리
entities/
  image/
    model/types.ts                # Image 엔티티
    api/dto.ts                    # DTO 타입
    api/mapper.ts                 # 변환 로직
```

#### 4. Tailwind CSS 장단점

**장점:**
- 빌드 타임 최적화 (사용된 클래스만 포함)
- 디자인 토큰 기반 일관성
- 클래스 이름 고민 불필요
- 반응형 디자인 간편

**단점 (Phase 4에서 경험):**
- 복잡한 디자인 구현 시 클래스 과다
- 컴포넌트 재사용 시 중복
- 동적 스타일링 제약
- Phase 3만큼 세련된 디자인 어려움

#### 5. 프로덕션 패턴
- **환경변수 관리**: Jest/Vite 이중 지원 (`getEnv` 헬퍼)
- **테스트 헬퍼**: Mock 데이터 팩토리 함수
- **Prefetching**: 다음 페이지 미리 로딩
- **에러 바운더리**: 계층별 에러 핸들링

### 🔍 FSD 의존성 방향
```
┌─────────────────────────────────────────┐
│              App Layer                  │
│      (Providers, Global Styles)         │
└───────────────┬─────────────────────────┘
                │ depends on
┌───────────────▼─────────────────────────┐
│            Pages Layer                  │
│         (Route Components)              │
└───────────────┬─────────────────────────┘
                │ depends on
┌───────────────▼─────────────────────────┐
│           Widgets Layer                 │
│       (Composite UI Blocks)             │
└───────────────┬─────────────────────────┘
                │ depends on
┌───────────────▼─────────────────────────┐
│          Features Layer                 │
│     (User-Facing Features)              │
└───────────────┬─────────────────────────┘
                │ depends on
┌───────────────▼─────────────────────────┐
│          Entities Layer                 │
│      (Business Entities)                │
└───────────────┬─────────────────────────┘
                │ depends on
┌───────────────▼─────────────────────────┐
│           Shared Layer                  │
│   (Reusable Utils, UI Components)       │
└─────────────────────────────────────────┘
```

### 🎯 Phase 3 대비 개선사항

#### 1. 코드 조직화
```
Before (Clean Architecture):
domain/entities/Image.ts
domain/usecases/SearchImages.ts
infrastructure/repositories/PixabayImageRepository.ts
presentation/components/ImageCard.tsx

After (FSD):
entities/image/model/types.ts
entities/image/ui/ImageCard.tsx
features/search-images/hooks/useImageSearch.ts
features/search-images/api/searchImages.ts
```

#### 2. 기능 응집도
- Clean Architecture: 레이어별 분산 (파일 찾기 어려움)
- FSD: 기능별 집중 (관련 코드가 한 곳에)

#### 3. 확장성
```typescript
// 새 기능 추가 시
// Clean: 4개 레이어에 파일 추가
// FSD: features/new-feature/ 폴더 하나만 추가
```

---

## 🔜 다음 단계

### Phase 5: Next.js 16 + FSD + Styled Components (진행 예정)
- Next.js App Router
- Server-Side Rendering + Client Components
- FSD + Styled Components 통합
- 다크 모드 구현
- 아키텍처 비교 및 베스트 프랙티스

---

## 📚 참고 자료

### 공식 문서
- [Pixabay API](https://pixabay.com/api/docs/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [React Query (TanStack Query)](https://tanstack.com/query/latest)
- [Styled Components](https://styled-components.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### 아키텍처
- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Feature-Sliced Design](https://feature-sliced.design/)

### 코드 품질
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

---

## 📄 라이선스

이 프로젝트는 학습 목적으로 제작되었습니다.

## 🙋‍♂️ 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 등록해주세요.

---

**Made with ❤️ for Learning Modern Web Development**
