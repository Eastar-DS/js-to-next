# Image Search Application - Progressive Learning Plan

## 📋 프로젝트 개요
Pixabay API를 활용한 이미지 검색 애플리케이션을 다양한 기술 스택으로 구현하며 점진적으로 학습합니다.

### 🗂️ 완료된 Phase 아카이브

**Phase 1-3의 상세 계획은 [plan_complete.md](./plan_complete.md)를 참조하세요.**

#### ✅ 완료된 Phase 요약

- **Phase 1**: Vanilla JavaScript (HTML, CSS, JS) - 기본 구조
- **Phase 2**: React 19 + Zustand + TypeScript + Styled Components - Clean Architecture 도입
- **Phase 3**: React 19 + React Query + TypeScript + Styled Components - Clean Architecture 심화

### 🎯 현재 진행 중

## Phase 4: React 19 + React Query + Tailwind CSS + shadcn/ui + TypeScript (Feature-Sliced Design)

> **초기 설정**: [SETUP.md - Phase 4](./SETUP.md#phase-4-react-19--react-query--tailwind-css--shadcnui--typescript-feature-sliced-design) 참조
>
> **⚠️ 중요**: 이 Phase는 **처음부터 다시 구현**합니다. Phase 2-3의 코드를 복사하지 않고 TDD로 새롭게 작성합니다.

### 아키텍처 개념

**Feature-Sliced Design (FSD)**는 기능 중심의 현대적 프론트엔드 아키텍처입니다.
Clean Architecture의 레이어 기반 구조를 유지하면서, 수평적으로는 **기능(Feature/Slice)**으로 나누어 관리합니다.

**Clean Architecture vs FSD 비교:**

| 항목 | Clean Architecture (Phase 2-3) | Feature-Sliced Design (Phase 4) |
|------|--------------------------------|----------------------------------|
| **조직 방식** | 역할 기반 (Domain, Application, Infrastructure) | 기능 + 레이어 기반 (Entities, Features, Widgets) |
| **UI 위치** | Presentation 레이어에 집중 | 각 레이어에 분산 (shared/ui, entities/ui, features/ui) |
| **비즈니스 로직** | Domain Layer (UseCases, Repository Interface) | Features Layer (hooks + API) |
| **데이터 저장소** | Repository 패턴 (구현체 분리) | React Query가 대체 (캐싱 자동 관리) |
| **확장성** | 새 기능 추가 시 여러 레이어 수정 | 새 Feature 폴더 하나만 추가 |

**FSD 핵심 원칙:**

1. **6개 레이어** (하위 → 상위):
   - `shared` - 도메인에 독립적인 공통 코드 (Button, httpClient, utils)
   - `entities` - 비즈니스 엔티티 (Image 타입, ImageCard UI, Image API)
   - `features` - 사용자 시나리오 (검색, 페이지네이션)
   - `widgets` - 복합 UI 블록 (ImageGallery)
   - `pages` - 전체 페이지 구성 (SearchPage)
   - `app` - 앱 초기화 및 전역 설정

2. **Public API 패턴**:
   - 각 Slice는 `index.ts`를 통해서만 export
   - 외부 레이어는 `index.ts`만 import 가능 (내부 구조 숨김)

3. **의존성 규칙**:
   - 상위 레이어만 하위 레이어를 import 가능
   - 같은 레이어 간 import 금지
   - 예: `features` → `entities` (✅), `entities` → `features` (❌)

### 기술 스택

**Phase 3 대비 변경사항:**

| 항목 | Phase 3 | Phase 4 |
|------|---------|---------|
| **프레임워크** | React 19 (Vite) | React 19 (Vite) |
| **서버 상태** | React Query | React Query (동일) |
| **스타일링** | Styled Components | Tailwind CSS + shadcn/ui |
| **아키텍처** | Clean Architecture | Feature-Sliced Design |
| **Component Library** | 없음 (직접 구현) | shadcn/ui (Radix UI + CVA) |

**Phase 4 주요 기술:**

- **React Query**: 서버 상태 관리 (캐싱, prefetching)
- **Tailwind CSS**: Utility-first CSS 프레임워크
- **shadcn/ui**: Copy-paste 기반 컴포넌트 라이브러리
  - **Radix UI**: 접근성(A11y) 보장
  - **CVA (Class Variance Authority)**: 타입 안전한 variant 관리
  - **tailwind-merge + clsx**: className 충돌 해결
- **TypeScript 5.7**: 타입 안전성

### TypeScript 학습 목표

- **FSD 타입 구조**: 레이어별 타입 정의 및 의존성 관리
- **React Query 타입**: UseQueryResult, QueryKey 타입 추론
- **Tailwind + CVA 타입**: VariantProps를 활용한 컴포넌트 타입
- **Public API 타입**: index.ts에서 타입만 선택적으로 export

### shadcn/ui 학습 목표

- **Copy-paste 철학**: npm install 없이 코드 복사로 설치
- **Customizable**: 직접 수정 가능한 컴포넌트 소스
- **Radix UI 기반**: 접근성과 키보드 네비게이션 자동 지원
- **CVA 활용**: variant와 size를 타입 안전하게 관리

### Clean Architecture → FSD 데이터 흐름 비교

**Phase 3 (Clean Architecture):**
```
DataSource → Repository → UseCase → Hook (React Query) → UI
(Infrastructure) (Infrastructure) (Domain) (Application) (Presentation)
```

**Phase 4 (FSD):**
```
API (entities) → React Query Hook (features) → UI (widgets/pages)
```

**주요 차이점:**
- **Repository 제거**: React Query의 캐싱이 Repository 역할 대체
- **UseCase 제거**: React Query hooks가 UseCase 역할 대체
- **DTO 변환 위치**: `entities/image/model/types.ts` (변환 함수) + `entities/image/api/*.ts` (변환 실행)
- **UI 분산**: shared/ui (Button), entities/ui (ImageCard), features/ui (SearchForm), widgets/ui (ImageGallery)

### Feature-Sliced Design 폴더 구조

```
04-react-query-fsd/
├── src/
│   ├── app/                           # App 레이어: 앱 초기화
│   │   ├── providers/
│   │   │   └── QueryProvider.tsx      # React Query Provider
│   │   ├── styles/
│   │   │   └── index.css              # Tailwind 진입점
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── pages/                         # Pages 레이어: 페이지 조합
│   │   └── search/
│   │       ├── ui/
│   │       │   └── SearchPage.tsx     # Widgets 조합
│   │       └── index.ts               # Public API
│   │
│   ├── widgets/                       # Widgets 레이어: 복합 UI 블록
│   │   └── image-gallery/
│   │       ├── ui/
│   │       │   └── ImageGallery.tsx   # Features + Entities 조합
│   │       └── index.ts
│   │
│   ├── features/                      # Features 레이어: 사용자 시나리오
│   │   ├── search-images/
│   │   │   ├── ui/
│   │   │   │   └── SearchForm.tsx     # 검색 폼 UI
│   │   │   ├── hooks/
│   │   │   │   └── useImageSearch.ts  # React Query 훅
│   │   │   └── index.ts
│   │   │
│   │   └── paginate-images/
│   │       ├── ui/
│   │       │   └── Pagination.tsx
│   │       ├── hooks/
│   │       │   └── usePagination.ts
│   │       └── index.ts
│   │
│   ├── entities/                      # Entities 레이어: 비즈니스 엔티티
│   │   └── image/
│   │       ├── ui/
│   │       │   ├── ImageCard.tsx      # 이미지 카드 UI
│   │       │   └── ImageGrid.tsx      # 이미지 그리드 UI
│   │       ├── model/
│   │       │   └── types.ts           # Image, ImageDTO, 변환 함수
│   │       ├── api/
│   │       │   └── imageApi.ts        # Pixabay API 호출 + DTO 변환
│   │       └── index.ts               # type Image, ImageCard, ImageGrid export (DTO는 숨김)
│   │
│   └── shared/                        # Shared 레이어: 도메인 독립적 코드
│       ├── ui/                        # shadcn/ui 컴포넌트
│       │   ├── button.tsx             # shadcn/ui Button
│       │   ├── input.tsx              # shadcn/ui Input
│       │   ├── card.tsx               # shadcn/ui Card
│       │   └── skeleton.tsx           # shadcn/ui Skeleton
│       ├── api/
│       │   ├── httpClient.ts          # fetch 래퍼
│       │   └── queryClient.ts         # React Query 설정
│       ├── lib/
│       │   ├── utils.ts               # cn() 함수 (tailwind-merge)
│       │   └── constants.ts
│       └── config/
│           └── env.ts                 # 환경 변수
│
├── __tests__/                         # 테스트 (FSD 구조 반영)
│   ├── shared/
│   ├── entities/
│   ├── features/
│   ├── widgets/
│   └── pages/
│
├── components.json                    # shadcn/ui 설정
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── .eslintrc.json                     # ✅ Phase 3와 동일 (Airbnb)
├── .prettierrc.json                   # ✅ Phase 3와 동일
├── jest.config.ts                     # ✅ Path alias만 FSD로 변경
└── package.json
```

### FSD 레이어 의존성 방향

```
┌─────────────────────────────────────────┐
│ app (App.tsx, QueryProvider)            │ ← 앱 진입점
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ pages (SearchPage)                      │ ← 전체 페이지 조합
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ widgets (ImageGallery)                  │ ← 복합 UI 블록
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ features (search-images, pagination)    │ ← 사용자 시나리오
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ entities (image)                        │ ← 비즈니스 엔티티
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ shared (ui, api, lib, config)           │ ← 도메인 독립적 코드
└─────────────────────────────────────────┘
```

### TDD 단계별 구현 (처음부터 새로 작성)

**⚠️ 중요 원칙:**
- Phase 2-3 코드를 **절대 복사하지 않음**
- 모든 코드를 **TDD로 처음부터 작성**
- 각 테스트는 **Red → Green → Refactor** 순서 엄격히 준수

#### 4.0 프로젝트 설정 (Setup)

- [x] **Setup 0**: Vite + React 19 + TypeScript 초기화
  - [x] `npm create vite@latest 04-react-query-fsd -- --template react-ts`
  - [x] React 19 및 TypeScript 설정 확인
  - [x] Git 저장소 초기화

- [x] **Setup 1**: Tailwind CSS 설치 및 설정
  - [x] `npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss`
  - [x] tailwind.config.ts 설정 (content paths, shadcn/ui theme)
  - [x] postcss.config.js 설정 (@tailwindcss/postcss 사용)
  - [x] src/app/styles/index.css 생성 (@tailwind 지시문 + CSS variables)

- [x] **Setup 2**: shadcn/ui 설치 및 초기 설정
  - [x] components.json 수동 생성 (aliases: @/shared/ui, @/shared/lib/utils)
  - [x] src/shared/lib/utils.ts 생성 (cn 함수)
  - [x] 기본 컴포넌트 수동 생성: Button, Input, Card, Skeleton

- [x] **Setup 3**: React Query 설치
  - [x] `npm install @tanstack/react-query`
  - [x] `npm install -D @tanstack/react-query-devtools`

- [x] **Setup 4**: 테스트 환경 설정 (Jest + Testing Library)
  - [x] `npm install -D jest @types/jest ts-jest ts-node`
  - [x] `npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event`
  - [x] `npm install -D jest-environment-jsdom identity-obj-proxy`
  - [x] jest.config.ts 생성 (FSD path aliases 적용)
  - [x] jest.setup.ts 생성
  - [x] __tests__/ 폴더 구조 생성 (shared, entities, features, widgets, pages)

- [x] **Setup 5**: ESLint + Prettier 설정 (ESLint 9 flat config 형식)
  - [x] eslint.config.js 작성 (Airbnb 스타일 가이드 규칙 적용)
  - [x] .prettierrc.json 생성
  - [x] `npm install -D prettier eslint-plugin-prettier eslint-config-prettier`
  - [x] `npm install -D eslint-plugin-react eslint-plugin-jsx-a11y @typescript-eslint/parser`
  - [x] Lint 실행 확인: `npm run lint` ✅

- [x] **Setup 6**: TypeScript Path Aliases (FSD 구조)
  - [x] tsconfig.app.json 수정: `baseUrl`, `paths` 설정
  - [x] vite.config.ts에 alias 추가 (path.resolve 사용)
  - [x] jest.config.ts에 moduleNameMapper 이미 추가됨

**Setup 검증:**
- [x] `npm run dev` 실행 확인 (http://localhost:5174) ✅
- [x] `npm run test` 실행 확인 (빈 테스트) ✅
- [x] `npm run build` 빌드 성공 ✅
- [x] `npm run lint` 통과 확인 ✅

#### 4.1 Shared Layer - 공통 코드 (Red → Green → Refactor)

**4.1.1 API Client & React Query 설정**

- [x] **Test 1**: httpClient 기본 기능 테스트 (6 tests) ✅
  - [x] `src/shared/api/httpClient.ts` 작성
  - [x] fetch 래퍼 함수 (get, post 메서드)
  - [x] 기본 URL 설정 (env 사용 - src/shared/lib/env.ts)
  - [x] 에러 핸들링 (NetworkError)
  - [x] JSON 자동 파싱
  - [x] Query params 자동 인코딩

- [x] **Test 2**: QueryClient 설정 테스트 (3 tests) ✅
  - [x] `src/shared/api/queryClient.ts` 작성
  - [x] QueryClient 기본 옵션 (staleTime: 5분, gcTime: 10분, retry: 1)
  - [x] refetchOnWindowFocus: false
  - [x] QueryClient export

**4.1.2 공통 타입 정의**

- [x] **Test 3**: 공통 타입 정의 테스트 (10 tests) ✅
  - [x] `src/shared/lib/types.ts` 작성
  - [x] Result<T> 타입 (success/failure Discriminated Union)
  - [x] AsyncState<T> 타입 (data, isLoading, error)
  - [x] PaginationState 타입 (currentPage, totalPages)
  - [x] Nullable<T>, Optional<T> 타입 유틸리티

**4.1.3 유틸리티 함수**

- [x] **Test 4**: 유틸리티 함수 테스트 (6 tests) ✅
  - [x] `src/shared/lib/utils.ts` 이미 shadcn이 생성 (cn 함수 포함)
  - [x] constants.ts 작성 (ITEMS_PER_PAGE)
  - [x] env.ts 작성 (API_BASE_URL, PIXABAY_API_KEY)

**4.1.4 shadcn/ui 컴포넌트 검증**

- [x] **Test 5**: shadcn/ui 컴포넌트 렌더링 테스트 (9 tests) ✅
  - [x] `src/shared/ui/button.tsx` (Setup에서 설치됨)
  - [x] Button variant 테스트 (default, destructive, outline, ghost)
  - [x] Button size 테스트 (sm, lg)
  - [x] Input 렌더링 테스트
  - [x] Card 렌더링 테스트
  - [x] Skeleton 렌더링 테스트

**Phase 4.1 완료! 총 34 tests 통과** ✅

#### 4.2 Entities Layer - Image 엔티티 (Red → Green → Refactor)

**4.2.1 Image 타입 정의 및 DTO 변환**

- [x] **Test 6**: Image 타입 및 DTO 정의 (9 tests) ✅
  - [x] `src/entities/image/model/types.ts` 작성
  - [x] ImageDTO 인터페이스 (Pixabay API 응답 구조)
  - [x] Image 인터페이스 (도메인 모델, 필요한 필드만)
  - [x] toImage(dto: ImageDTO): Image 변환 함수
  - [x] toImages(dtos: ImageDTO[]): Image[] 배치 변환
  - [x] PixabayResponse 타입 (total, totalHits, hits)
  - [x] 타입 가드 함수 (isImage)

**4.2.2 Image API**

- [x] **Test 7**: imageApi 기본 기능 테스트 (8 tests) ✅
  - [x] `src/entities/image/api/imageApi.ts` 작성
  - [x] getImages(query: string): Promise<Image[]> 구현
  - [x] getImagesByPage(query: string, page: number): Promise<Image[]> 구현
  - [x] httpClient 사용하여 Pixabay API 호출
  - [x] DTO → Entity 변환 적용 (toImages 사용)
  - [x] 에러 핸들링 (try-catch)
  - [x] API 파라미터 검증 (빈 query 방어)

**4.2.3 ImageCard UI 컴포넌트**

- [x] **Test 8**: ImageCard 컴포넌트 테스트 (10 tests) ✅
  - [x] `src/entities/image/ui/ImageCard.tsx` 작성
  - [x] Image 타입 props 받기
  - [x] shadcn Card 컴포넌트 사용
  - [x] 이미지 썸네일 렌더링
  - [x] 태그, 좋아요, 조회수 정보 표시
  - [x] Tailwind로 스타일링 (hover 효과)
  - [x] 반응형 디자인

**4.2.4 ImageGrid UI 컴포넌트**

- [x] **Test 9**: ImageGrid 컴포넌트 테스트 (8 tests) ✅
  - [x] `src/entities/image/ui/ImageGrid.tsx` 작성
  - [x] Image[] props 받기
  - [x] Grid 레이아웃 (Tailwind grid)
  - [x] ImageCard 반복 렌더링
  - [x] 빈 배열 처리 (Empty state)
  - [x] 반응형 그리드 (1/2/3/4 columns)

**4.2.5 Public API**

- [x] **Test 10**: entities/image Public API 테스트 (4 tests) ✅
  - [x] `src/entities/image/index.ts` 작성
  - [x] type Image, ImageDTO, PixabayResponse export
  - [x] ImageCard, ImageGrid export
  - [x] imageApi (getImages, getImagesByPage) namespace export
  - [x] FSD Public API 패턴 적용

**Phase 4.2 완료! 총 39 tests 통과** ✅

#### 4.3 Features Layer - 사용자 시나리오 (Red → Green → Refactor)

**4.3.1 search-images Feature**

- [x] **Test 11**: useImageSearch 훅 테스트 (8 tests) ✅
  - [x] `src/features/search-images/hooks/useImageSearch.ts` 작성
  - [x] useQuery 사용 (React Query)
  - [x] Query Key: `['images', 'search', query]`
  - [x] queryFn에서 getImages 호출
  - [x] enabled: query.length > 0
  - [x] QueryClient 기본 설정 사용 (staleTime, gcTime)
  - [x] 반환: { data, isLoading, error, refetch }

- [x] **Test 12**: SearchForm UI 컴포넌트 테스트 (9 tests) ✅
  - [x] `src/features/search-images/ui/SearchForm.tsx` 작성
  - [x] shadcn Input + Button 사용
  - [x] onSearch(query: string) callback props
  - [x] 폼 제출 핸들러
  - [x] 검색어 상태 관리 (useState)
  - [x] 빈 검색어 방어
  - [x] Enter 키 지원

**4.3.2 paginate-images Feature**

- [x] **Test 13**: useImagesByPage 훅 테스트 (8 tests) ✅
  - [x] `src/features/paginate-images/hooks/useImagesByPage.ts` 작성
  - [x] useQuery<Image[], Error>
  - [x] Query Key: `['images', 'page', query, page]`
  - [x] queryFn에서 getImagesByPage 호출
  - [x] enabled: query.length > 0
  - [x] placeholderData: keepPreviousData (부드러운 페이지 전환)

- [x] **Test 14**: Pagination UI 컴포넌트 테스트 (8 tests) ✅
  - [x] `src/features/paginate-images/ui/Pagination.tsx` 작성
  - [x] shadcn Button 사용
  - [x] currentPage, totalPages, onPageChange props
  - [x] 이전/다음 버튼
  - [x] 현재 페이지 표시
  - [x] 첫/마지막 페이지 버튼 비활성화

**Phase 4.3 완료! 총 33 tests 통과** ✅

#### 4.4 Widgets Layer - 복합 UI 블록 (Red → Green → Refactor)

- [x] **Test 15**: ImageGallery 위젯 테스트 (8 tests) ✅
  - [x] `src/widgets/image-gallery/ui/ImageGallery.tsx` 작성
  - [x] Features (useImagesByPage) + Entities (ImageGrid) 조합
  - [x] query, page props 받기
  - [x] 로딩 상태: ImageGrid에 Skeleton 전달
  - [x] 에러 상태: shadcn Alert 사용
  - [x] 성공 상태: ImageGrid에 data 전달
  - [x] Public API: `src/widgets/image-gallery/index.ts`

**Phase 4.4 완료! 총 8 tests 통과** ✅

#### 4.5 Pages Layer - 전체 페이지 (Red → Green → Refactor)

- [x] **Test 16**: SearchPage 테스트 (7 tests) ✅
  - [x] `src/pages/search/ui/SearchPage.tsx` 작성
  - [x] SearchForm (features) + ImageGallery (widgets) + Pagination (features) 조합
  - [x] query, page 상태 관리 (useState)
  - [x] 검색 핸들러: query 변경 + page를 1로 리셋
  - [x] 페이지 변경 핸들러: page 변경
  - [x] Tailwind로 레이아웃 (Flexbox)
  - [x] Public API: `src/pages/search/index.ts`

**Phase 4.5 완료! 총 7 tests 통과** ✅

#### 4.6 App Layer - 앱 초기화 (Red → Green → Refactor)

- [x] **Test 17**: QueryProvider 테스트 (3 tests) ✅
  - [x] `src/app/providers/QueryProvider.tsx` 작성
  - [x] QueryClientProvider 설정
  - [x] React Query DevTools 추가 (개발 환경만)
  - [x] children props 렌더링

- [x] **Test 18**: App.tsx 테스트 (6 tests) ✅
  - [x] `src/app/App.tsx` 작성
  - [x] QueryProvider로 래핑
  - [x] SearchPage import (from @/pages/search)
  - [x] Tailwind 스타일 적용 (globals.css import)
  - [x] 전역 레이아웃 (header, main, footer 구조)

**Phase 4.6 완료! 총 9 tests 통과** ✅

#### 4.7 FSD 검증 및 Public API 테스트 (Red → Green → Refactor)

- [x] **Test 19**: FSD 레이어 의존성 규칙 검증 (5 tests) ✅
  - [x] 상위 레이어만 하위 레이어 import 확인
  - [x] 같은 레이어 간 import 금지 확인 (같은 slice 내부는 허용)
  - [x] Public API만 사용하는지 확인 (직접 internal import 금지)
  - [x] ESLint 규칙 추가 고려 (import/no-restricted-paths)

**Phase 4.7 완료! 총 5 tests 통과** ✅

- [ ] **Test 20**: Public API 완전성 검증 (5 tests)
  - [ ] 각 레이어의 index.ts가 필요한 것만 export하는지 확인
  - [ ] DTO 타입이 외부에 노출되지 않는지 확인
  - [ ] 타입과 컴포넌트/함수가 모두 export되는지 확인

**예상 테스트 수: 약 10 tests (누적: 129)**

#### 4.8 고급 기능 - Prefetching (Red → Green → Refactor)

- [ ] **Test 21**: usePrefetch 훅 테스트 (4 tests)
  - [ ] `src/features/paginate-images/hooks/usePrefetch.ts` 작성
  - [ ] queryClient.prefetchQuery 사용
  - [ ] 다음 페이지 (currentPage + 1) prefetch
  - [ ] 빈 query나 마지막 페이지는 prefetch 안 함
  - [ ] SearchPage에서 사용 (useEffect로 자동 prefetch)

**예상 테스트 수: 약 4 tests (누적: 133)**

#### 4.9 브라우저 테스트 및 실제 동작 확인

- [ ] **실제 구현**: .env 파일 설정
  - [ ] VITE_PIXABAY_API_KEY 설정
  - [ ] env.ts에서 환경 변수 읽기

- [ ] **브라우저 테스트**: 전체 기능 동작 확인
  - [ ] 검색 기능 작동 확인
  - [ ] 로딩 스켈레톤 표시 확인
  - [ ] 이미지 결과 렌더링 확인
  - [ ] 페이지네이션 작동 확인
  - [ ] Prefetching 확인 (DevTools)
  - [ ] shadcn/ui 스타일 확인
  - [ ] 반응형 디자인 확인
  - [ ] 에러 핸들링 확인

#### 4.10 리팩토링 (Tidy First)

- [ ] **Structural**: 공통 타입 추출
  - [ ] 중복된 타입 정의를 shared/lib/types.ts로 이동

- [ ] **Structural**: Query 관련 유틸리티 추출
  - [ ] handleQueryResult 함수 (Result → data 또는 throw error)

- [ ] **Structural**: Tailwind 공통 클래스 추출
  - [ ] 재사용되는 className을 constants로 정의

- [ ] **Verification**: 전체 테스트 실행
  - [ ] 모든 테스트 통과 확인 (약 133 tests)
  - [ ] ESLint 통과 확인
  - [ ] TypeScript 컴파일 확인

### 예상 최종 테스트 수

- **Setup**: 검증 테스트
- **Shared Layer**: ~23 tests
- **Entities Layer**: ~39 tests
- **Features Layer**: ~33 tests
- **Widgets Layer**: ~8 tests
- **Pages Layer**: ~7 tests
- **App Layer**: ~9 tests
- **FSD 검증**: ~10 tests
- **Prefetching**: ~4 tests
- **총합**: 약 **130+ tests**

### 핵심 학습 포인트

#### 1. FSD 아키텍처

- **Shared**: 도메인에 독립적 (Button, httpClient, utils) - 어디서든 재사용
- **Entities**: 비즈니스 엔티티 (Image 타입, ImageCard UI, Image API)
- **Features**: 사용자 시나리오 (검색, 페이지네이션) - 독립적인 기능 단위
- **Widgets**: 복합 UI 블록 (ImageGallery) - Features + Entities 조합
- **Pages**: 전체 페이지 (SearchPage) - Widgets 조합
- **App**: 앱 설정 (QueryProvider, 전역 스타일)

#### 2. Public API 패턴

```typescript
// ❌ Bad: 직접 internal import
import { ImageCard } from '@/entities/image/ui/ImageCard';
import { ImageDTO } from '@/entities/image/model/types';

// ✅ Good: Public API 사용
import { ImageCard, type Image } from '@/entities/image';
// ImageDTO는 외부에 노출되지 않음 (내부 구현 detail)
```

#### 3. DTO 변환 위치 (FSD)

```typescript
// entities/image/model/types.ts
export interface ImageDTO { /* API 응답 */ }
export interface Image { /* Domain 모델 */ }
export const toImage = (dto: ImageDTO): Image => ({ /* 변환 */ });

// entities/image/api/imageApi.ts
import { toImages } from '../model/types';

export const getImages = async (query: string): Promise<Image[]> => {
  const response = await httpClient.get<PixabayResponse>('/api/', { params });
  return toImages(response.hits); // DTO → Entity 변환
};

// entities/image/index.ts (Public API)
export type { Image } from './model/types';  // ✅ Entity만 export
// export type { ImageDTO } ← ❌ DTO는 숨김
export { getImages, getImagesByPage } from './api/imageApi';
export { ImageCard, ImageGrid } from './ui';
```

#### 4. shadcn/ui 활용

- **Copy-paste 철학**: `npx shadcn@latest add button` → src/shared/ui/button.tsx 생성
- **직접 수정 가능**: button.tsx 파일을 직접 수정하여 커스터마이징
- **CVA로 variant 관리**: `variant="destructive" size="lg"`
- **Tailwind 기반**: className으로 추가 스타일링 가능

#### 5. FSD vs Clean Architecture

| 항목 | Clean Architecture | FSD |
|------|-------------------|-----|
| **새 기능 추가** | Domain, Application, Infrastructure, Presentation 모두 수정 | features/ 폴더 하나만 추가 |
| **코드 위치 찾기** | 역할별로 분산 (UseCase, Repository, UI 각각 다른 폴더) | 기능별로 집중 (search-images/ 안에 모두 있음) |
| **UI 재사용** | Presentation에서 찾기 | shared/ui (공통), entities/ui (엔티티 전용) 구분 |
| **확장성** | 수직 확장 (레이어 추가 어려움) | 수평 확장 (Feature Slice 추가 쉬움) |

### Phase 3 Lint 설정 보존 확인

**Phase 3에서 가져올 설정:**

1. **.eslintrc.json** (그대로 복사):
   ```json
   {
     "extends": [
       "airbnb",
       "airbnb-typescript",
       "airbnb/hooks",
       "plugin:@typescript-eslint/recommended",
       "plugin:react/recommended",
       "plugin:react-hooks/recommended",
       "plugin:jsx-a11y/recommended",
       "plugin:prettier/recommended"
     ],
     "parserOptions": {
       "project": "./tsconfig.app.json"
     },
     "rules": {
       "react/function-component-definition": ["error", {
         "namedComponents": "arrow-function"
       }],
       "@typescript-eslint/no-unused-vars": ["error", {
         "argsIgnorePattern": "^_"
       }],
       "react/react-in-jsx-scope": "off"
     }
   }
   ```

2. **.prettierrc.json** (그대로 복사):
   ```json
   {
     "semi": true,
     "trailingComma": "es5",
     "singleQuote": true,
     "printWidth": 80,
     "tabWidth": 2,
     "useTabs": false,
     "arrowParens": "always",
     "bracketSpacing": true,
     "endOfLine": "lf"
   }
   ```

3. **jest.config.ts** (path alias만 수정):
   ```typescript
   moduleNameMapper: {
     // Phase 3 (Clean Architecture)
     '^@domain/(.*)$': '<rootDir>/src/domain/$1',
     '^@application/(.*)$': '<rootDir>/src/application/$1',
     '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
     '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',

     // Phase 4 (FSD) - 이것으로 변경
     '^@/shared/(.*)$': '<rootDir>/src/shared/$1',
     '^@/entities/(.*)$': '<rootDir>/src/entities/$1',
     '^@/features/(.*)$': '<rootDir>/src/features/$1',
     '^@/widgets/(.*)$': '<rootDir>/src/widgets/$1',
     '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
     '^@/app/(.*)$': '<rootDir>/src/app/$1',
   }
   ```

4. **tsconfig.app.json** (strict mode + path alias 수정):
   ```json
   {
     "compilerOptions": {
       "strict": true,
       "noUnusedLocals": true,
       "noUnusedParameters": true,
       "baseUrl": ".",
       "paths": {
         "@/shared/*": ["src/shared/*"],
         "@/entities/*": ["src/entities/*"],
         "@/features/*": ["src/features/*"],
         "@/widgets/*": ["src/widgets/*"],
         "@/pages/*": ["src/pages/*"],
         "@/app/*": ["src/app/*"]
       }
     }
   }
   ```

---

## Phase 5: Next.js 16 + Tailwind CSS + shadcn/ui + TypeScript (FSD + toFSD.md 대규모 구조)

> **초기 설정**: [SETUP.md - Phase 5](./SETUP.md#phase-5-nextjs-16--tailwind-css--shadcnui--typescript-fsd--tofsdmd-대규모-구조) 참조
>
> **⚠️ 중요**: 이 Phase는 **처음부터 다시 구현**합니다. Phase 4 코드를 복사하지 않고 TDD로 새롭게 작성합니다.

### 아키텍처 개념

Phase 4의 FSD 구조를 Next.js 16으로 확장하고, **toFSD.md의 대규모 웹사이트 구조**를 적용합니다.

**Phase 4 vs Phase 5 비교:**

| 항목 | Phase 4 | Phase 5 |
|------|---------|---------|
| **프레임워크** | React 19 (Vite, CSR) | Next.js 16 (App Router, SSR/SSG) |
| **렌더링** | Client-Side Rendering | Server-Side Rendering + Client Components |
| **라우팅** | Single Page App | File-based Routing (app/) |
| **데이터 페칭** | React Query (Client) | React Query + Server Components |
| **규모** | 소규모 애플리케이션 | 대규모 웹사이트 구조 (toFSD.md) |
| **FSD 구조** | 기본 6개 레이어 | 확장된 FSD (segments 추가) |

**Phase 5 핵심 학습 목표:**

1. **Next.js App Router + FSD 통합**
   - FSD 레이어와 Next.js app/ 디렉토리 조합
   - Server Components와 Client Components 분리
   - SSR에서 React Query Hydration

2. **toFSD.md 대규모 구조 적용**
   - MSA(Micro Service Architecture) 스타일 segments
   - 확장 가능한 폴더 구조
   - 대규모 팀 협업을 고려한 설계

3. **Next.js 16 + React 19 최신 기능**
   - Turbopack (빌드 최적화)
   - Server Actions (선택적)
   - next/image, next/font 최적화
   - Parallel Routes, Intercepting Routes

### toFSD.md 기반 대규모 구조

**toFSD.md 저자의 접근법:**
- 큰 웹사이트를 **여러 "앱"으로 분리** (예: intro, product, support)
- 각 앱은 독립적인 FSD 구조를 가짐
- 공통 코드는 최상위 shared에서 관리

**우리의 적용 방식:**
- 단일 이미지 검색 앱이지만, **확장 가능한 구조**로 설계
- 향후 다른 기능(예: user, admin) 추가 시 쉽게 확장 가능
- Next.js app/ 디렉토리와 FSD 레이어를 조화롭게 결합

### TypeScript + Next.js 학습 목표

- **Server Component 타입**: async 컴포넌트, Promise<JSX.Element>
- **Client Component 타입**: 'use client' 지시문과 타입 시스템
- **Next.js 타입**: Metadata, Params, SearchParams, PageProps
- **React Query SSR 타입**: dehydrate, HydrationBoundary 타입
- **Server Actions 타입** (선택적): 서버 액션 함수 타입

### Feature-Sliced Design + Next.js 구조

```
05-nextjs-fsd/
├── src/
│   ├── app/                           # Next.js App Router (최상위)
│   │   ├── (routes)/                  # Route Groups
│   │   │   ├── search/
│   │   │   │   └── page.tsx           # /search 페이지 (Server Component)
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/                       # API Routes (Server-side)
│   │   │   └── images/
│   │   │       └── route.ts
│   │   │
│   │   ├── providers/
│   │   │   └── Providers.tsx          # React Query Provider (Client)
│   │   │
│   │   ├── layout.tsx                 # Root Layout
│   │   ├── page.tsx                   # Home Page (/)
│   │   └── globals.css                # Tailwind CSS
│   │
│   ├── pages/                         # FSD Pages Layer
│   │   └── search-page/
│   │       ├── ui/
│   │       │   └── SearchPage.tsx     # Client Component (Widgets 조합)
│   │       └── index.ts
│   │
│   ├── widgets/                       # FSD Widgets Layer
│   │   ├── search-header/
│   │   │   ├── ui/
│   │   │   │   └── SearchHeader.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── image-gallery/
│   │       ├── ui/
│   │       │   └── ImageGallery.tsx   # Client Component
│   │       └── index.ts
│   │
│   ├── features/                      # FSD Features Layer
│   │   ├── search-images/
│   │   │   ├── ui/
│   │   │   │   └── SearchForm.tsx     # Client Component
│   │   │   ├── hooks/
│   │   │   │   └── useImageSearch.ts  # React Query Hook
│   │   │   ├── server/                # ✅ 새로운 segment (Server 전용)
│   │   │   │   └── getImagesServer.ts # Server Component용 함수
│   │   │   └── index.ts
│   │   │
│   │   └── paginate-images/
│   │       ├── ui/
│   │       │   └── Pagination.tsx
│   │       ├── hooks/
│   │       │   └── useImagesByPage.ts
│   │       └── index.ts
│   │
│   ├── entities/                      # FSD Entities Layer
│   │   └── image/
│   │       ├── ui/
│   │       │   ├── ImageCard.tsx
│   │       │   └── ImageGrid.tsx
│   │       ├── model/
│   │       │   └── types.ts           # Image, ImageDTO
│   │       ├── api/
│   │       │   └── imageApi.ts        # API 호출 (Client/Server 공용)
│   │       └── index.ts
│   │
│   └── shared/                        # FSD Shared Layer
│       ├── ui/                        # shadcn/ui 컴포넌트
│       │   ├── button.tsx
│       │   ├── input.tsx
│       │   ├── card.tsx
│       │   └── skeleton.tsx
│       ├── api/
│       │   ├── httpClient.ts          # fetch 래퍼 (Client/Server 공용)
│       │   ├── queryClient.ts         # React Query 설정
│       │   └── serverQueryClient.ts   # ✅ Server Component용 QueryClient
│       ├── lib/
│       │   ├── utils.ts
│       │   └── constants.ts
│       └── config/
│           └── env.ts
│
├── __tests__/                         # 테스트 (FSD 구조 반영)
│   ├── shared/
│   ├── entities/
│   ├── features/
│   ├── widgets/
│   └── pages/
│
├── components.json                    # shadcn/ui 설정
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── .eslintrc.json                     # ✅ Phase 3-4와 동일 (Airbnb)
├── .prettierrc.json                   # ✅ Phase 3-4와 동일
├── jest.config.ts                     # ✅ Next.js + FSD path alias
└── package.json
```

### Next.js App Router + FSD 통합 패턴

**핵심 개념:**
1. **app/ 디렉토리**: Next.js 라우팅 (pages는 라우트가 아닌 FSD 레이어)
2. **Server Components**: app/ 내부의 page.tsx, layout.tsx (기본값)
3. **Client Components**: 'use client' 지시문이 있는 컴포넌트 (대부분 FSD 레이어)
4. **FSD 레이어**: src/ 아래에 위치 (pages/, widgets/, features/, entities/, shared/)

**데이터 흐름:**

```
Server Component (app/search/page.tsx)
  ↓ (초기 데이터 페칭)
Server-side React Query (dehydrate)
  ↓ (Hydration)
Client Component (pages/search-page/ui/SearchPage.tsx)
  ↓ (사용자 인터랙션)
Client-side React Query (useQuery)
```

### FSD 레이어별 Server/Client 분리

| FSD Layer | Server Component | Client Component |
|-----------|------------------|------------------|
| **app** | page.tsx, layout.tsx | Providers.tsx |
| **pages** | ❌ (Server는 app/에서 처리) | ✅ SearchPage.tsx |
| **widgets** | ❌ | ✅ ImageGallery.tsx |
| **features** | getImagesServer.ts (server/) | SearchForm.tsx, useImageSearch.ts |
| **entities** | imageApi.ts (Server 호출 가능) | ImageCard.tsx, ImageGrid.tsx |
| **shared** | serverQueryClient.ts | queryClient.ts, shadcn/ui |

### TDD 단계별 구현 (처음부터 새로 작성)

**⚠️ 중요 원칙:**
- Phase 4 코드를 **절대 복사하지 않음**
- 모든 코드를 **TDD로 처음부터 작성**
- Next.js 특화 기능(SSR, Server Components)을 **단계적으로 추가**

#### 5.0 프로젝트 설정 (Setup)

- [ ] **Setup 0**: Next.js 16 + TypeScript 초기화
  - [ ] `npx create-next-app@latest 05-nextjs-fsd --typescript --tailwind --app --src-dir`
  - [ ] Next.js 16 및 React 19 확인
  - [ ] App Router 확인 (src/app/)
  - [ ] Git 저장소 초기화

- [ ] **Setup 1**: Tailwind CSS 설정 (Next.js 설치 시 포함)
  - [ ] tailwind.config.ts 확인 및 수정 (FSD paths)
  - [ ] src/app/globals.css 확인
  - [ ] Tailwind IntelliSense 확인

- [ ] **Setup 2**: shadcn/ui 설치 및 초기 설정
  - [ ] `npx shadcn@latest init` (Next.js 프로젝트 감지)
  - [ ] components.json 설정 (aliases: @/shared/ui)
  - [ ] src/shared/lib/utils.ts 생성 (cn 함수)
  - [ ] 기본 컴포넌트 설치: `npx shadcn@latest add button input card skeleton`

- [ ] **Setup 3**: React Query 설치 (SSR 지원)
  - [ ] `npm install @tanstack/react-query`
  - [ ] `npm install -D @tanstack/react-query-devtools`
  - [ ] React Query v5 + Next.js 통합 확인

- [ ] **Setup 4**: 테스트 환경 설정 (Jest + Testing Library + Next.js)
  - [ ] `npm install -D jest @types/jest ts-jest`
  - [ ] `npm install -D @testing-library/react @testing-library/jest-dom`
  - [ ] `npm install -D jest-environment-jsdom`
  - [ ] jest.config.ts 생성 (Next.js 전용 설정)
  - [ ] jest.setup.ts 생성
  - [ ] __tests__/ 폴더 구조 생성

- [ ] **Setup 5**: ESLint + Prettier 설정 (Phase 3-4와 동일)
  - [ ] `.eslintrc.json` 업데이트 (Next.js 규칙 추가)
  - [ ] `.prettierrc.json` 복사
  - [ ] `npm install` (ESLint 플러그인)
  - [ ] Lint 실행 확인: `npm run lint`

- [ ] **Setup 6**: TypeScript Path Aliases (FSD + Next.js)
  - [ ] tsconfig.json 수정
    ```json
    {
      "compilerOptions": {
        "baseUrl": ".",
        "paths": {
          "@/app/*": ["src/app/*"],
          "@/pages/*": ["src/pages/*"],
          "@/widgets/*": ["src/widgets/*"],
          "@/features/*": ["src/features/*"],
          "@/entities/*": ["src/entities/*"],
          "@/shared/*": ["src/shared/*"]
        }
      }
    }
    ```
  - [ ] next.config.mjs 확인 (Turbopack 설정)
  - [ ] jest.config.ts에 moduleNameMapper 추가

**Setup 검증:**
- [ ] `npm run dev` 실행 확인 (Turbopack)
- [ ] `npm run test` 실행 확인 (빈 테스트)
- [ ] `npm run lint` 통과 확인
- [ ] `npm run build` 실행 확인

#### 5.1 Shared Layer - Server/Client 공용 코드 (Red → Green → Refactor)

**5.1.1 httpClient (Server/Client 공용)**

- [ ] **Test 1**: httpClient 기본 기능 테스트 (7 tests)
  - [ ] `src/shared/api/httpClient.ts` 작성
  - [ ] Server/Client 환경 모두 지원 (fetch 사용)
  - [ ] 에러 핸들링
  - [ ] Query params 인코딩
  - [ ] Server Component에서 사용 가능 확인

**5.1.2 React Query 설정 (Server/Client 분리)**

- [ ] **Test 2**: Client QueryClient 설정 테스트 (3 tests)
  - [ ] `src/shared/api/queryClient.ts` 작성
  - [ ] QueryClient 기본 옵션
  - [ ] Client-side 전용

- [ ] **Test 3**: Server QueryClient 설정 테스트 (4 tests)
  - [ ] `src/shared/api/serverQueryClient.ts` 작성
  - [ ] Server Component용 QueryClient 팩토리
  - [ ] getQueryClient() 함수 (캐시 전략)
  - [ ] dehydrate 지원

**5.1.3 공통 타입 및 shadcn/ui**

- [ ] **Test 4**: 공통 타입 정의 (5 tests)
  - [ ] `src/shared/lib/types.ts`
  - [ ] Result, AsyncState, PaginationState 타입

- [ ] **Test 5**: shadcn/ui 컴포넌트 검증 (5 tests)
  - [ ] Button, Input, Card, Skeleton 렌더링
  - [ ] Client Component 확인

**예상 테스트 수: 약 24 tests**

#### 5.2 Entities Layer - Image 엔티티 (Red → Green → Refactor)

**5.2.1 Image 타입 및 API (Server/Client 공용)**

- [ ] **Test 6**: Image 타입 및 DTO (9 tests)
  - [ ] `src/entities/image/model/types.ts`
  - [ ] ImageDTO, Image, 변환 함수

- [ ] **Test 7**: imageApi (Server/Client 공용) (9 tests)
  - [ ] `src/entities/image/api/imageApi.ts`
  - [ ] getImages, getImagesByPage
  - [ ] Server Component에서 직접 호출 가능
  - [ ] Client Component에서 React Query를 통해 호출

**5.2.2 Image UI (Client Components)**

- [ ] **Test 8**: ImageCard 컴포넌트 (10 tests)
  - [ ] `src/entities/image/ui/ImageCard.tsx`
  - [ ] 'use client' 지시문
  - [ ] shadcn Card 사용

- [ ] **Test 9**: ImageGrid 컴포넌트 (8 tests)
  - [ ] `src/entities/image/ui/ImageGrid.tsx`
  - [ ] Client Component
  - [ ] Tailwind Grid 레이아웃

**5.2.3 Public API**

- [ ] **Test 10**: entities/image Public API (4 tests)
  - [ ] `src/entities/image/index.ts`
  - [ ] Server/Client 구분 없이 export

**예상 테스트 수: 약 40 tests (누적: 64)**

#### 5.3 Features Layer - Server/Client 분리 (Red → Green → Refactor)

**5.3.1 search-images Feature**

- [ ] **Test 11**: useImageSearch 훅 (Client) (8 tests)
  - [ ] `src/features/search-images/hooks/useImageSearch.ts`
  - [ ] useQuery 사용
  - [ ] Client-side 전용

- [ ] **Test 12**: getImagesServer (Server) (6 tests)
  - [ ] `src/features/search-images/server/getImagesServer.ts` ✅ 새로운 segment
  - [ ] Server Component에서 사용
  - [ ] QueryClient.fetchQuery 사용
  - [ ] dehydrate 지원

- [ ] **Test 13**: SearchForm UI (Client) (9 tests)
  - [ ] `src/features/search-images/ui/SearchForm.tsx`
  - [ ] 'use client' 지시문
  - [ ] shadcn Input + Button

**5.3.2 paginate-images Feature**

- [ ] **Test 14**: useImagesByPage 훅 (Client) (8 tests)
  - [ ] `src/features/paginate-images/hooks/useImagesByPage.ts`
  - [ ] keepPreviousData 사용

- [ ] **Test 15**: Pagination UI (Client) (8 tests)
  - [ ] `src/features/paginate-images/ui/Pagination.tsx`
  - [ ] shadcn Button 사용

**예상 테스트 수: 약 39 tests (누적: 103)**

#### 5.4 Widgets Layer - Client Components (Red → Green → Refactor)

- [ ] **Test 16**: ImageGallery 위젯 (8 tests)
  - [ ] `src/widgets/image-gallery/ui/ImageGallery.tsx`
  - [ ] 'use client' 지시문
  - [ ] Features + Entities 조합

- [ ] **Test 17**: SearchHeader 위젯 (6 tests)
  - [ ] `src/widgets/search-header/ui/SearchHeader.tsx`
  - [ ] Client Component
  - [ ] SearchForm 통합

**예상 테스트 수: 약 14 tests (누적: 117)**

#### 5.5 Pages Layer - Client Components (Red → Green → Refactor)

- [ ] **Test 18**: SearchPage (7 tests)
  - [ ] `src/pages/search-page/ui/SearchPage.tsx`
  - [ ] 'use client' 지시문
  - [ ] Widgets 조합
  - [ ] useState로 상태 관리

**예상 테스트 수: 약 7 tests (누적: 124)**

#### 5.6 App Layer - Next.js Integration (Red → Green → Refactor)

**5.6.1 Providers (Client Component)**

- [ ] **Test 19**: QueryProvider 테스트 (5 tests)
  - [ ] `src/app/providers/Providers.tsx`
  - [ ] 'use client' 지시문
  - [ ] QueryClientProvider + HydrationBoundary
  - [ ] React Query DevTools

**5.6.2 Root Layout (Server Component)**

- [ ] **Test 20**: layout.tsx 테스트 (4 tests)
  - [ ] `src/app/layout.tsx`
  - [ ] Server Component (기본값)
  - [ ] Metadata export
  - [ ] Providers로 children 래핑
  - [ ] globals.css import

**5.6.3 Search Page (Server Component)**

- [ ] **Test 21**: app/search/page.tsx 테스트 (6 tests)
  - [ ] `src/app/(routes)/search/page.tsx`
  - [ ] Server Component (async)
  - [ ] getImagesServer로 초기 데이터 페칭
  - [ ] dehydrate + HydrationBoundary
  - [ ] SearchPage (Client Component) 렌더링

**5.6.4 Home Page (Server Component)**

- [ ] **Test 22**: app/page.tsx 테스트 (3 tests)
  - [ ] `src/app/page.tsx`
  - [ ] Server Component
  - [ ] /search로 리다이렉트 또는 간단한 홈페이지

**예상 테스트 수: 약 18 tests (누적: 142)**

#### 5.7 React Query SSR Hydration (Red → Green → Refactor)

- [ ] **Test 23**: SSR Hydration 통합 테스트 (8 tests)
  - [ ] Server에서 데이터 페칭 → dehydrate
  - [ ] Client에서 HydrationBoundary → useQuery
  - [ ] 초기 로딩 없이 데이터 즉시 표시
  - [ ] 이후 Client-side 페칭 동작 확인
  - [ ] Prefetch 동작 확인

**예상 테스트 수: 약 8 tests (누적: 150)**

#### 5.8 Next.js 특화 기능 (Red → Green → Refactor)

- [ ] **Test 24**: API Route 구현 (선택적) (5 tests)
  - [ ] `src/app/api/images/route.ts`
  - [ ] Server-side API endpoint
  - [ ] Pixabay API 프록시

- [ ] **Test 25**: next/image 최적화 (4 tests)
  - [ ] ImageCard에서 next/image 사용
  - [ ] 자동 최적화 확인
  - [ ] Blur placeholder

- [ ] **Test 26**: Metadata 최적화 (3 tests)
  - [ ] layout.tsx, page.tsx Metadata
  - [ ] SEO 최적화
  - [ ] Dynamic Metadata (선택적)

**예상 테스트 수: 약 12 tests (누적: 162)**

#### 5.9 FSD 검증 및 Public API (Red → Green → Refactor)

- [ ] **Test 27**: FSD 레이어 의존성 검증 (5 tests)
  - [ ] 상위 레이어만 하위 레이어 import
  - [ ] Public API 사용 검증

- [ ] **Test 28**: Server/Client 분리 검증 (5 tests)
  - [ ] Server Component는 'use client' 없음
  - [ ] Client Component는 'use client' 있음
  - [ ] Server/Client 경계 확인

**예상 테스트 수: 약 10 tests (누적: 172)**

#### 5.10 브라우저 및 SSR 테스트

- [ ] **실제 구현**: .env 파일 설정
  - [ ] NEXT_PUBLIC_PIXABAY_API_KEY 설정
  - [ ] env.ts에서 환경 변수 읽기

- [ ] **브라우저 테스트**: 전체 기능 동작 확인
  - [ ] 검색 기능 작동 (SSR → CSR)
  - [ ] 초기 페이지 로드 (SSR 데이터 표시)
  - [ ] 페이지네이션 (Client-side)
  - [ ] Hydration 에러 없음
  - [ ] React Query DevTools 확인
  - [ ] shadcn/ui 스타일 확인
  - [ ] Turbopack 빌드 확인
  - [ ] 프로덕션 빌드 확인 (`npm run build`)

#### 5.11 리팩토링 및 최적화 (Tidy First)

- [ ] **Structural**: Server/Client 코드 분리 최적화
  - [ ] Server 전용 함수는 server/ segment에
  - [ ] Client 전용 훅은 hooks/ segment에

- [ ] **Structural**: 공통 타입 추출
  - [ ] 중복 타입 제거

- [ ] **Performance**: Next.js 최적화
  - [ ] Dynamic imports (next/dynamic)
  - [ ] Suspense boundaries
  - [ ] Loading.tsx 파일 추가

- [ ] **Verification**: 전체 테스트 실행
  - [ ] 모든 테스트 통과 (약 172 tests)
  - [ ] ESLint 통과
  - [ ] TypeScript 컴파일 확인
  - [ ] 프로덕션 빌드 성공

#### 5.12 toFSD.md 대규모 구조 적용 (확장성 준비)

- [ ] **Structural**: Segments 정리
  - [ ] 각 Feature/Entity에 적절한 segments (ui, model, api, hooks, server)
  - [ ] Public API 일관성 확보

- [ ] **Documentation**: 아키텍처 문서 작성
  - [ ] FSD + Next.js 통합 가이드
  - [ ] Server/Client 분리 전략 문서
  - [ ] 대규모 확장 시나리오 (향후 user, admin 앱 추가)

### 예상 최종 테스트 수

- **Setup**: 검증 테스트
- **Shared Layer**: ~24 tests
- **Entities Layer**: ~40 tests
- **Features Layer**: ~39 tests
- **Widgets Layer**: ~14 tests
- **Pages Layer**: ~7 tests
- **App Layer**: ~18 tests
- **SSR Hydration**: ~8 tests
- **Next.js 특화**: ~12 tests
- **FSD 검증**: ~10 tests
- **총합**: 약 **170+ tests**

### 핵심 학습 포인트

#### 1. Next.js App Router + FSD 통합

**폴더 구조:**
```
src/
├── app/                    # Next.js 라우팅 (Server Components 기본)
│   ├── (routes)/
│   │   └── search/
│   │       └── page.tsx    # Server Component
│   ├── providers/
│   │   └── Providers.tsx   # Client Component ('use client')
│   └── layout.tsx
│
├── pages/                  # FSD Pages Layer (Client Components)
│   └── search-page/
│       └── ui/
│           └── SearchPage.tsx  # 'use client'
```

**핵심 원칙:**
- `app/` 디렉토리: Next.js 라우팅 전용 (pages는 FSD 레이어)
- `app/**/page.tsx`: Server Component (초기 데이터 페칭)
- FSD 레이어 (pages, widgets, features): 대부분 Client Component

#### 2. React Query SSR Hydration

```typescript
// src/app/(routes)/search/page.tsx (Server Component)
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getImagesServer } from '@/features/search-images/server';
import { SearchPage } from '@/pages/search-page';

export default async function SearchRoute() {
  const queryClient = getQueryClient();

  // Server-side 데이터 페칭
  await queryClient.prefetchQuery({
    queryKey: ['images', 'search', 'cats'],
    queryFn: () => getImagesServer('cats'),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchPage />
    </HydrationBoundary>
  );
}
```

```typescript
// src/pages/search-page/ui/SearchPage.tsx (Client Component)
'use client';

export const SearchPage = () => {
  // Server에서 prefetch된 데이터를 즉시 사용 (로딩 없음)
  const { data } = useImageSearch('cats');

  return <ImageGallery images={data} />;
};
```

#### 3. Server/Client 분리 전략

| Segment | 목적 | 예시 |
|---------|------|------|
| **ui/** | UI 컴포넌트 (대부분 Client) | SearchForm.tsx |
| **hooks/** | React Hooks (Client 전용) | useImageSearch.ts |
| **server/** | Server 전용 함수 | getImagesServer.ts |
| **api/** | API 호출 (Server/Client 공용) | imageApi.ts |
| **model/** | 타입 및 비즈니스 로직 (공용) | types.ts |

#### 4. toFSD.md 대규모 확장 시나리오

**현재 구조 (Phase 5):**
```
src/
├── app/
│   └── (routes)/
│       └── search/         # 검색 앱
├── pages/
│   └── search-page/
├── features/
│   ├── search-images/
│   └── paginate-images/
└── entities/
    └── image/
```

**향후 확장 예시 (여러 앱):**
```
src/
├── app/
│   └── (routes)/
│       ├── search/         # 검색 앱
│       ├── user/           # 사용자 앱
│       └── admin/          # 관리자 앱
│
├── pages/
│   ├── search-page/
│   ├── user-profile-page/
│   └── admin-dashboard-page/
│
├── features/
│   ├── search-images/      # 검색 앱 전용
│   ├── manage-favorites/   # 사용자 앱 전용
│   └── manage-users/       # 관리자 앱 전용
│
└── entities/
    ├── image/              # 공용
    ├── user/               # 공용
    └── admin/              # 관리자 전용
```

#### 5. Phase 4 vs Phase 5 비교

| 항목 | Phase 4 (React) | Phase 5 (Next.js) |
|------|-----------------|-------------------|
| **렌더링** | CSR (Client-Side Rendering) | SSR + CSR (Hybrid) |
| **초기 로딩** | 빈 화면 → 로딩 → 데이터 | 데이터 즉시 표시 (SSR) |
| **SEO** | 제한적 (빈 HTML) | 우수 (Full HTML) |
| **React Query** | Client-only | SSR Hydration |
| **라우팅** | Single Page | File-based (app/) |
| **빌드 도구** | Vite | Turbopack |
| **API 호출** | Client에서만 | Server/Client 모두 |
| **확장성** | 소규모 앱 | 대규모 웹사이트 |

### Phase 3-4 Lint 설정 보존 확인

**Phase 5에서 가져올 설정:**

1. **.eslintrc.json** (Next.js 규칙 추가):
   ```json
   {
     "extends": [
       "next/core-web-vitals",
       "airbnb",
       "airbnb-typescript",
       "airbnb/hooks",
       "plugin:@typescript-eslint/recommended",
       "plugin:react/recommended",
       "plugin:react-hooks/recommended",
       "plugin:jsx-a11y/recommended",
       "plugin:prettier/recommended"
     ],
     "parserOptions": {
       "project": "./tsconfig.json"
     },
     "rules": {
       "react/function-component-definition": ["error", {
         "namedComponents": "arrow-function"
       }],
       "@typescript-eslint/no-unused-vars": ["error", {
         "argsIgnorePattern": "^_"
       }],
       "react/react-in-jsx-scope": "off"
     }
   }
   ```

2. **.prettierrc.json** (그대로):
   ```json
   {
     "semi": true,
     "trailingComma": "es5",
     "singleQuote": true,
     "printWidth": 80,
     "tabWidth": 2,
     "useTabs": false,
     "arrowParens": "always",
     "bracketSpacing": true,
     "endOfLine": "lf"
   }
   ```

3. **jest.config.ts** (Next.js + FSD):
   ```typescript
   const nextJest = require('next/jest');

   const createJestConfig = nextJest({
     dir: './',
   });

   const customJestConfig = {
     setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
     testEnvironment: 'jest-environment-jsdom',
     moduleNameMapper: {
       '^@/app/(.*)$': '<rootDir>/src/app/$1',
       '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
       '^@/widgets/(.*)$': '<rootDir>/src/widgets/$1',
       '^@/features/(.*)$': '<rootDir>/src/features/$1',
       '^@/entities/(.*)$': '<rootDir>/src/entities/$1',
       '^@/shared/(.*)$': '<rootDir>/src/shared/$1',
     },
   };

   module.exports = createJestConfig(customJestConfig);
   ```

4. **tsconfig.json** (Next.js + FSD):
   ```json
   {
     "compilerOptions": {
       "strict": true,
       "noUnusedLocals": true,
       "noUnusedParameters": true,
       "lib": ["dom", "dom.iterable", "esnext"],
       "allowJs": true,
       "skipLibCheck": true,
       "noEmit": true,
       "esModuleInterop": true,
       "module": "esnext",
       "moduleResolution": "bundler",
       "resolveJsonModule": true,
       "isolatedModules": true,
       "jsx": "preserve",
       "incremental": true,
       "plugins": [
         {
           "name": "next"
         }
       ],
       "baseUrl": ".",
       "paths": {
         "@/app/*": ["src/app/*"],
         "@/pages/*": ["src/pages/*"],
         "@/widgets/*": ["src/widgets/*"],
         "@/features/*": ["src/features/*"],
         "@/entities/*": ["src/entities/*"],
         "@/shared/*": ["src/shared/*"]
       }
     },
     "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
     "exclude": ["node_modules"]
   }
   ```

---

## 추가 학습 및 개선 사항

### 성능 최적화
- [ ] Lighthouse 점수 측정 및 개선
- [ ] 이미지 Lazy Loading
- [ ] Code Splitting
- [ ] Memoization (React.memo, useMemo, useCallback)

### 접근성 (A11y)
- [ ] 키보드 네비게이션
- [ ] ARIA 속성 추가
- [ ] 스크린 리더 지원
- [ ] 색상 대비 개선

### 테스트 커버리지
- [ ] 유닛 테스트 커버리지 80% 이상
- [ ] 통합 테스트 커버리지 확인
- [ ] E2E 테스트 주요 플로우 커버

### CI/CD
- [ ] GitHub Actions 설정
- [ ] 자동 테스트 실행
- [ ] 자동 배포 (Vercel 또는 Netlify)

### 문서화
- [ ] README 작성 (각 Phase별)
- [ ] API 문서화
- [ ] 학습 내용 정리 (블로그 포스트 또는 노트)

---

## TDD 및 Tidy First 원칙 준수 체크리스트

### 각 테스트마다
- [ ] Red: 실패하는 테스트 먼저 작성
- [ ] Green: 최소한의 코드로 테스트 통과
- [ ] Refactor: 테스트 통과 후 코드 개선
- [ ] 모든 테스트 통과 확인 후 다음 단계 진행

### 커밋 전
- [ ] 모든 테스트 통과
- [ ] 린터/컴파일러 경고 해결
- [ ] Structural 변경과 Behavioral 변경 분리
- [ ] 의미 있는 커밋 메시지 작성

### 리팩토링 시
- [ ] 테스트가 통과하는 상태에서만 리팩토링
- [ ] 한 번에 하나의 리팩토링만 수행
- [ ] 각 리팩토링 후 테스트 실행

---

## 참고 자료

### 공식 문서
- [Pixabay API Documentation](https://pixabay.com/api/docs/)
- [React 19 Documentation](https://react.dev/)
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [React Query (TanStack Query) Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Styled Components Documentation](https://styled-components.com/docs)

### 아키텍처 패턴
- [Clean Architecture in React - Alex Kondov](https://alexkondov.com/full-stack-tao-clean-architecture-react/)
- [Clean Architecture with Next.js - DEV Community](https://dev.to/dan1618/clean-architecture-with-nextjs-43cg)
- [Feature-Sliced Design Official Documentation](https://feature-sliced.design/)
- [Feature-Sliced Design GitHub](https://github.com/feature-sliced/documentation)
- [React & Next.js in 2025 - Modern Best Practices](https://strapi.io/blog/react-and-nextjs-in-2025-modern-best-practices)

### 테스트 도구
- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)

### 버전 정보
- React: 19.x (최신 안정 버전, 2024년 12월 출시)
- Next.js: 16.x (Turbopack 안정화, React 19.2 지원, 2025년 10월 출시)
- TypeScript: 5.7.x (최신 안정 버전)
- Node.js: 20.x 이상 권장

### TypeScript 관련 자료
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Type Challenges](https://github.com/type-challenges/type-challenges) - 타입 연습

### Code Style 가이드
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/)

---

## 시작 방법

1. `.env` 파일에 `PIXABAY_API_KEY` 설정
2. Phase 1부터 순차적으로 진행
3. 각 Phase의 첫 테스트부터 시작
4. "go" 명령으로 다음 테스트 진행
5. 모든 테스트 통과 후 다음 Phase로 이동

**Ready to start? Say "go" to begin with Phase 1, Test 1!**
