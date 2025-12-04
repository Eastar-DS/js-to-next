# Image Search Application - Progressive Learning Plan

## 프로젝트 개요
Pixabay API를 활용한 이미지 검색 애플리케이션을 다양한 기술 스택으로 구현하며 점진적으로 학습합니다.

### 공통 기능 요구사항
- 검색어 입력 및 이미지 검색
- 페이지네이션
- 로딩 상태 스켈레톤 UI
- 에러 핸들링
- 반응형 디자인 (점진적 개선)

### 기술 스택 및 아키텍처 진행 순서
1. Vanilla JavaScript (HTML, CSS, JS) - 기본 구조
2. React 19 + Zustand + **TypeScript** - **Clean Architecture** 도입
3. React 19 + React Query + **TypeScript** - **Clean Architecture** 심화
4. Next.js 16 + Tailwind CSS + **TypeScript** - **Feature-Sliced Design (FSD)** 도입
5. Next.js 16 + Styled Components + **TypeScript** - **Feature-Sliced Design (FSD)** 심화

### 아키텍처 학습 목표
- **Phase 1**: Vanilla JavaScript로 기본기 학습
- **Phase 2-3**: Clean Architecture의 레이어 기반 구조와 의존성 규칙 학습 + TypeScript 타입 시스템
- **Phase 4-5**: Feature-Sliced Design의 슬라이스 기반 현대적 구조 학습 + TypeScript 고급 활용

---

## Phase 1: Vanilla JavaScript

> **초기 설정**: [SETUP.md - Phase 1](./SETUP.md#phase-1-vanilla-javascript) 참조

### 디렉토리 구조
```
01-vanilla-js/
├── index.html
├── styles/
│   ├── main.css
│   └── skeleton.css
├── scripts/
│   ├── api.js
│   ├── ui.js
│   └── main.js
└── __tests__/
    ├── api.test.js
    ├── ui.test.js
    └── integration.test.js
```

### TDD 단계별 구현

#### 1.1 API 모듈 (Red → Green → Refactor)
- [x] **Test 1**: API 클라이언트 초기화 테스트
  - [x] 환경변수에서 API 키를 읽어오는지 확인
  - [x] API 기본 URL이 올바른지 확인

- [x] **Test 2**: 이미지 검색 함수 테스트
  - [x] 검색어를 받아 Pixabay API 호출
  - [x] 응답 데이터 파싱 확인
  - [x] API 에러 핸들링 (네트워크 에러, 401, 404 등)

- [x] **Test 3**: 페이지네이션 파라미터 테스트
  - [x] page와 per_page 파라미터가 올바르게 전달되는지 확인

#### 1.2 UI 렌더링 모듈 (Red → Green → Refactor)
- [x] **Test 4**: 검색창 렌더링 테스트
  - [x] 입력 필드와 검색 버튼이 렌더링되는지 확인

- [x] **Test 5**: 이미지 그리드 렌더링 테스트
  - [x] 이미지 배열을 받아 그리드로 렌더링
  - [x] 각 이미지 카드에 필요한 정보(썸네일, 태그 등) 표시

- [x] **Test 6**: 스켈레톤 로딩 UI 테스트
  - [x] 로딩 상태일 때 스켈레톤 카드 표시
  - [x] 로딩 완료 시 실제 데이터로 교체

- [x] **Test 7**: 에러 메시지 표시 테스트
  - [x] 에러 발생 시 사용자 친화적 메시지 표시

- [x] **Test 8**: 페이지네이션 UI 테스트
  - [x] 이전/다음 버튼 렌더링
  - [x] 현재 페이지 번호 표시
  - [x] 첫 페이지/마지막 페이지에서 버튼 비활성화

#### 1.3 통합 테스트
- [x] **Test 9**: 검색 워크플로우 통합 테스트
  - [x] 검색어 입력 → 로딩 표시 → 결과 렌더링
  - [x] 검색 결과 없음 처리
  - [x] API 에러 핸들링

- [x] **Test 10**: 페이지네이션 통합 테스트
  - [x] 다음 페이지 클릭 → 로딩 → 새 결과 표시

#### 1.4 리팩토링 (Tidy First)
- [ ] **Structural**: 중복 코드 제거 (DOM 조작, API 호출 등)
- [ ] **Structural**: 함수 분리 및 단일 책임 원칙 적용
- [ ] **Structural**: 상수 분리 (API URL, 페이지 크기 등)

#### 1.5 실제 웹페이지 구현
- [x] **HTML 구조**: index.html 작성
  - [x] 기본 HTML5 구조 (DOCTYPE, meta tags)
  - [x] 검색 폼 컨테이너 (#search-container)
  - [x] 결과 컨테이너 (#results-container)
  - [x] 페이지네이션 컨테이너 (#pagination-container)
  - [x] scripts 및 styles 파일 링크

- [x] **CSS 스타일링**: styles/main.css 작성
  - [x] 레이아웃 스타일 (Flexbox/Grid)
  - [x] 검색 폼 스타일
  - [x] 이미지 그리드 스타일 (반응형)
  - [x] 페이지네이션 스타일
  - [x] 에러 메시지 스타일

- [x] **스켈레톤 UI**: styles/skeleton.css 작성
  - [x] 스켈레톤 그리드 레이아웃
  - [x] 스켈레톤 아이템 애니메이션
  - [x] 로딩 효과 (shimmer/pulse)

- [x] **메인 애플리케이션**: scripts/main.js 작성
  - [x] DOM 로드 이벤트 핸들러
  - [x] 앱 초기화 함수
  - [x] 검색 핸들러 (API + UI 통합)
  - [x] 페이지네이션 핸들러
  - [x] 전역 상태 관리 (currentPage, currentQuery)

- [ ] **브라우저 테스트**: 실제 동작 확인
  - [ ] 검색 기능 작동 확인
  - [ ] 로딩 스켈레톤 표시 확인
  - [ ] 이미지 결과 렌더링 확인
  - [ ] 페이지네이션 작동 확인
  - [ ] 에러 핸들링 확인
  - [ ] 반응형 디자인 확인

---

## Phase 2: React 19 + Zustand + TypeScript (Clean Architecture)

> **초기 설정**: [SETUP.md - Phase 2](./SETUP.md#phase-2-react-19--zustand--typescript-clean-architecture) 참조

### 아키텍처 개념
**Clean Architecture**는 비즈니스 로직을 프레임워크, UI, 외부 시스템으로부터 독립시키는 레이어 기반 아키텍처입니다.

**핵심 원칙:**
1. **의존성 규칙**: 내부 레이어는 외부 레이어를 알지 못함 (Presentation → Application → Domain → Infrastructure)
2. **관심사의 분리**: 각 레이어는 명확한 책임을 가짐
3. **테스트 용이성**: 비즈니스 로직을 UI와 분리하여 독립적으로 테스트 가능

### TypeScript 학습 목표
- **타입 안정성**: 컴파일 타임에 에러 감지
- **인터페이스 기반 설계**: Repository 패턴을 interface로 정의
- **타입 추론**: Zustand와 함께 강력한 타입 추론 활용
- **제네릭**: 재사용 가능한 타입 정의

### Clean Architecture + TypeScript 레이어 구조
```
02-react-zustand/
├── public/
├── src/
│   ├── domain/                    # 도메인 레이어 (비즈니스 로직)
│   │   ├── entities/
│   │   │   ├── Image.ts           # 이미지 엔티티 (타입 정의)
│   │   │   └── types.ts           # 공통 도메인 타입
│   │   ├── repositories/
│   │   │   └── ImageRepository.ts # 이미지 저장소 인터페이스
│   │   └── usecases/
│   │       ├── SearchImages.ts    # 이미지 검색 유스케이스
│   │       └── GetImagesByPage.ts # 페이지네이션 유스케이스
│   │
│   ├── application/               # 애플리케이션 레이어 (앱 로직)
│   │   ├── store/
│   │   │   ├── imageStore.ts      # Zustand 스토어 (상태 관리)
│   │   │   └── types.ts           # 스토어 타입
│   │   └── hooks/
│   │       └── useImageSearch.ts  # 커스텀 훅
│   │
│   ├── infrastructure/            # 인프라 레이어 (외부 시스템 연동)
│   │   ├── api/
│   │   │   ├── PixabayApiClient.ts # Pixabay API 클라이언트
│   │   │   └── types.ts            # API 응답 타입
│   │   └── repositories/
│   │       └── PixabayImageRepository.ts # Repository 구현체
│   │
│   ├── presentation/              # 프레젠테이션 레이어 (UI)
│   │   ├── components/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── ImageGrid.tsx
│   │   │   ├── ImageCard.tsx
│   │   │   ├── SkeletonCard.tsx
│   │   │   ├── Pagination.tsx
│   │   │   └── ErrorMessage.tsx
│   │   ├── pages/
│   │   │   └── SearchPage.tsx
│   │   └── types.ts               # 컴포넌트 Props 타입
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── __tests__/
│   ├── domain/
│   │   └── usecases/
│   ├── infrastructure/
│   ├── application/
│   └── presentation/
│
├── tsconfig.json
├── tsconfig.node.json
├── package.json
└── vite.config.ts
```

### Clean Architecture 의존성 방향
```
Presentation (UI)
    ↓ depends on
Application (State, Hooks)
    ↓ depends on
Domain (Business Logic, Entities, UseCases)
    ↑ implemented by
Infrastructure (API, External Services)
```

### TDD 단계별 구현 (Clean Architecture + TypeScript)

#### 2.0 TypeScript 설정 (Red → Green → Refactor)
- [ ] **Test 0**: TypeScript 환경 설정
  - [ ] tsconfig.json 설정 (strict mode, paths 등)
  - [ ] Vite + TypeScript 통합
  - [ ] Jest + TypeScript 설정 (@types/jest, ts-jest)
  - [ ] React + TypeScript 타입 정의

#### 2.1 Domain Layer - Entities (Red → Green → Refactor)
- [ ] **Test 1**: Image 엔티티 타입 테스트
  - [ ] Image 인터페이스 정의 (id, tags, previewURL, largeImageURL 등)
  - [ ] 타입 가드 함수 작성 (isImage)
  - [ ] 엔티티 생성 팩토리 함수 및 유효성 검증

#### 2.2 Domain Layer - Repository Interface (Red → Green → Refactor)
- [ ] **Test 2**: ImageRepository 인터페이스 테스트
  - [ ] TypeScript interface로 Repository 계약 정의
  - [ ] search, getByPage 메서드 시그니처 정의
  - [ ] Result 타입 정의 (Success | Failure)

#### 2.3 Domain Layer - UseCases (Red → Green → Refactor)
- [ ] **Test 3**: SearchImages 유스케이스 테스트
  - [ ] 제네릭 타입을 활용한 UseCase 인터페이스
  - [ ] Repository 인터페이스를 통해 검색 실행
  - [ ] 타입 안전한 에러 핸들링

- [ ] **Test 4**: GetImagesByPage 유스케이스 테스트
  - [ ] 페이지네이션 파라미터 타입 정의
  - [ ] Repository를 통한 타입 안전한 데이터 조회

#### 2.4 Infrastructure Layer - API Client (Red → Green → Refactor)
- [ ] **Test 5**: API 응답 타입 정의
  - [ ] PixabayApiResponse 인터페이스 정의
  - [ ] API 에러 타입 정의

- [ ] **Test 6**: PixabayApiClient 테스트
  - [ ] 제네릭 fetch 래퍼 구현
  - [ ] 타입 안전한 HTTP 요청/응답 처리
  - [ ] 타입 가드를 활용한 에러 핸들링

- [ ] **Test 7**: PixabayImageRepository 구현 테스트
  - [ ] ImageRepository 인터페이스 구현
  - [ ] API 응답 → 도메인 엔티티 타입 변환
  - [ ] 타입 안전한 에러 매핑

#### 2.5 Application Layer - Store & Hooks (Red → Green → Refactor)
- [ ] **Test 8**: Zustand 스토어 타입 정의
  - [ ] StoreState 인터페이스 정의
  - [ ] StoreActions 타입 정의
  - [ ] 타입 안전한 스토어 생성

- [ ] **Test 9**: Zustand 스토어 구현 테스트
  - [ ] 타입 추론을 활용한 초기 상태
  - [ ] UseCase를 호출하는 타입 안전한 액션
  - [ ] 상태 업데이트 로직

- [ ] **Test 10**: useImageSearch 훅 테스트
  - [ ] 커스텀 훅 반환 타입 정의
  - [ ] 스토어와 타입 안전한 연동
  - [ ] 제네릭을 활용한 디바운스 구현

#### 2.6 Presentation Layer - Components (Red → Green → Refactor)
- [ ] **Test 11**: 컴포넌트 Props 타입 정의
  - [ ] 각 컴포넌트의 Props 인터페이스 정의
  - [ ] React.FC vs 함수 선언 방식 선택

- [ ] **Test 12**: SearchBar 컴포넌트 테스트
  - [ ] SearchBarProps 타입 정의
  - [ ] 타입 안전한 이벤트 핸들러
  - [ ] onChange, onSubmit 타입 체크

- [ ] **Test 13**: ImageCard 컴포넌트 테스트
  - [ ] ImageCardProps 타입 정의 (Image 엔티티 사용)
  - [ ] 타입 안전한 props 전달
  - [ ] 조건부 렌더링 타입 체크

- [ ] **Test 14**: SkeletonCard 컴포넌트 테스트
  - [ ] SkeletonCardProps 타입 정의
  - [ ] 스켈레톤 UI 렌더링

- [ ] **Test 15**: Pagination 컴포넌트 테스트
  - [ ] PaginationProps 타입 정의
  - [ ] 타입 안전한 페이지 변경 핸들러
  - [ ] 제네릭을 활용한 페이지 정보 타입

- [ ] **Test 16**: ErrorMessage 컴포넌트 테스트
  - [ ] ErrorMessageProps 타입 정의
  - [ ] Error 객체 타입 체크
  - [ ] 재시도 콜백 타입 정의

#### 2.7 통합 테스트
- [ ] **Test 17**: 타입 시스템 통합 검증
  - [ ] 레이어 간 타입 일관성 확인
  - [ ] 타입 안전성 엔드투엔드 테스트

- [ ] **Test 18**: 전체 검색 워크플로우 테스트
  - [ ] 타입 안전한 검색 플로우
  - [ ] 페이지네이션 타입 체크
  - [ ] 에러 핸들링 타입 검증

#### 2.8 리팩토링 (Tidy First)
- [ ] **Structural**: 공통 타입 추출 및 재사용
- [ ] **Structural**: 유틸리티 타입 정의 (Nullable, Result 등)
- [ ] **Structural**: 타입 가드 함수 정리
- [ ] **Behavioral**: strict 모드 활성화 및 에러 수정

---

## Phase 3: React 19 + React Query + TypeScript (Clean Architecture 심화)

> **초기 설정**: [SETUP.md - Phase 3](./SETUP.md#phase-3-react-19--react-query--typescript-clean-architecture-심화) 참조

### 아키텍처 개념
Phase 2의 Clean Architecture를 유지하면서 **React Query를 서버 상태 관리 계층**에 통합합니다.
Zustand 대신 React Query의 강력한 캐싱과 동기화 기능을 활용하여 서버 상태를 관리합니다.

### TypeScript 심화 학습 목표
- **React Query 타입 추론**: useQuery, useMutation의 제네릭 활용
- **Query Key 타입 안전성**: 타입 안전한 Query Key 관리
- **고급 제네릭**: Conditional Types, Mapped Types 활용
- **타입 좁히기**: Union Types와 타입 가드 고급 활용

### Clean Architecture + React Query + TypeScript 구조
```
03-react-query/
├── public/
├── src/
│   ├── domain/                    # 도메인 레이어 (Phase 2와 동일)
│   │   ├── entities/
│   │   │   ├── Image.ts
│   │   │   └── types.ts
│   │   ├── repositories/
│   │   │   └── ImageRepository.ts
│   │   └── usecases/
│   │       ├── SearchImages.ts
│   │       └── GetImagesByPage.ts
│   │
│   ├── application/               # 애플리케이션 레이어 (React Query 통합)
│   │   ├── queries/
│   │   │   ├── queryKeys.ts       # 타입 안전한 Query key 팩토리
│   │   │   ├── types.ts           # Query 관련 타입
│   │   │   ├── useImagesQuery.ts  # 이미지 조회 쿼리
│   │   │   └── useSearchQuery.ts  # 검색 쿼리
│   │   ├── hooks/
│   │   │   └── useImageSearch.ts  # 비즈니스 로직 훅
│   │   └── queryClient.ts         # React Query 설정
│   │
│   ├── infrastructure/            # 인프라 레이어 (Phase 2와 동일)
│   │   ├── api/
│   │   │   ├── PixabayApiClient.ts
│   │   │   └── types.ts
│   │   └── repositories/
│   │       └── PixabayImageRepository.ts
│   │
│   ├── presentation/              # 프레젠테이션 레이어
│   │   ├── components/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── ImageGrid.tsx
│   │   │   ├── ImageCard.tsx
│   │   │   ├── SkeletonCard.tsx
│   │   │   ├── Pagination.tsx
│   │   │   └── ErrorMessage.tsx
│   │   ├── pages/
│   │   │   └── SearchPage.tsx
│   │   └── types.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── __tests__/
│   ├── domain/
│   ├── application/
│   │   └── queries/
│   ├── infrastructure/
│   └── presentation/
│
├── tsconfig.json
├── tsconfig.node.json
└── package.json
```

### TDD 단계별 구현 (TypeScript + React Query)

#### 3.1 React Query 타입 안전한 설정 (Red → Green → Refactor)
- [ ] **Test 1**: QueryClient 타입 정의 및 초기화
  - [ ] QueryClient 옵션 타입 정의
  - [ ] 기본 옵션 설정 (staleTime, gcTime 등)
  - [ ] 에러 핸들링 기본 설정 타입

#### 3.2 Query Key 타입 시스템 (Red → Green → Refactor)
- [ ] **Test 2**: 타입 안전한 Query Key 팩토리
  - [ ] Query Key 타입 정의 (const assertion 활용)
  - [ ] Query Key 팩토리 함수 구현
  - [ ] 타입 추론을 활용한 자동완성

#### 3.3 타입 안전한 Query 훅 (Red → Green → Refactor)
- [ ] **Test 3**: useImagesQuery 훅 타입 정의
  - [ ] useQuery 제네릭 타입 활용
  - [ ] QueryFunctionContext 타입 정의
  - [ ] 반환 타입 추론 및 타입 좁히기

- [ ] **Test 4**: useSearchQuery 훅 타입 정의
  - [ ] useQuery 파라미터 타입 정의
  - [ ] enabled 옵션과 타입 안전성
  - [ ] select 옵션 타입 추론

- [ ] **Test 5**: Pagination with React Query 타입
  - [ ] placeholderData 옵션 타입 (keepPreviousData 대체)
  - [ ] 페이지 상태 타입 정의
  - [ ] 타입 안전한 페이지 전환

- [ ] **Test 6**: Prefetching 타입 안전성
  - [ ] queryClient.prefetchQuery 타입
  - [ ] 다음 페이지 예측 로직 타입

#### 3.4 고급 TypeScript 패턴 (Red → Green → Refactor)
- [ ] **Test 7**: Conditional Types 활용
  - [ ] Query 상태에 따른 조건부 타입
  - [ ] Error 타입 좁히기

- [ ] **Test 8**: Utility Types 정의
  - [ ] QueryResult 헬퍼 타입
  - [ ] Awaited<> 활용한 비동기 타입 추출

#### 3.5 통합 테스트
- [ ] **Test 9**: React Query 캐싱 통합 타입 테스트
  - [ ] 타입 안전한 캐시 사용
  - [ ] 캐시 무효화 타입 체크

- [ ] **Test 10**: 에러 재시도 로직 타입 테스트
  - [ ] retry 옵션 타입 정의
  - [ ] 타입 안전한 에러 핸들링

#### 3.6 리팩토링 (Tidy First)
- [ ] **Structural**: Query key 타입 체계화
- [ ] **Structural**: 제네릭 타입 재사용성 개선
- [ ] **Structural**: 타입 유틸리티 정리
- [ ] **Behavioral**: Optimistic updates 타입 안전성 (선택적)

#### 3.7 TypeScript + Zustand vs React Query 비교
- [ ] 타입 추론 능력 비교
- [ ] 타입 안전성 비교
- [ ] 개발 경험 (DX) 비교
- [ ] 각 접근법의 타입 시스템 장단점

---

## Phase 4: Next.js 16 + Tailwind CSS + TypeScript (Feature-Sliced Design)

> **초기 설정**: [SETUP.md - Phase 4](./SETUP.md#phase-4-nextjs-16--tailwind-css--typescript-feature-sliced-design) 참조

### 아키텍처 개념
**Feature-Sliced Design (FSD)**는 기능 중심의 현대적 프론트엔드 아키텍처입니다.
Clean Architecture의 레이어 개념을 유지하면서, 수평적으로는 **기능(슬라이스)**으로 나누어 관리합니다.

**핵심 원칙:**
1. **7개 레이어**: app → pages → widgets → features → entities → shared (processes 제외)
2. **슬라이스 (Slice)**: 각 레이어 내에서 기능별로 분리
3. **세그먼트 (Segment)**: 각 슬라이스 내에서 목적별 분리 (ui, api, model, lib)
4. **의존성 규칙**: 상위 레이어만 하위 레이어를 import 가능

### TypeScript + Next.js 학습 목표
- **Server/Client Component 타입**: 'use client' 지시문과 타입 시스템
- **Next.js 타입**: Metadata, Params, SearchParams 타입
- **Server Actions 타입**: 서버 액션 타입 안전성
- **Path Alias**: TypeScript paths와 FSD 구조 통합

### Feature-Sliced Design + TypeScript 구조
```
04-nextjs-tailwind/
├── app/                           # App 레이어: 앱 초기화, 라우팅
│   ├── providers/
│   │   └── Providers.tsx          # React Query, Theme 등
│   ├── styles/
│   │   └── globals.css
│   ├── layout.tsx
│   ├── page.tsx                   # 메인 페이지
│   └── api/                       # API Routes
│       └── images/
│           └── route.ts
│
├── pages/                         # Pages 레이어: 페이지 조합
│   └── search/
│       ├── ui/
│       │   └── SearchPage.tsx     # 검색 페이지 구성
│       ├── types.ts
│       └── index.ts
│
├── widgets/                       # Widgets 레이어: 독립적인 UI 블록
│   ├── image-search-bar/
│   │   ├── ui/
│   │   │   └── ImageSearchBar.tsx
│   │   ├── model/
│   │   │   ├── useSearchState.ts
│   │   │   └── types.ts
│   │   └── index.ts
│   │
│   └── image-grid/
│       ├── ui/
│       │   ├── ImageGrid.tsx
│       │   └── ImageGridSkeleton.tsx
│       ├── types.ts
│       └── index.ts
│
├── features/                      # Features 레이어: 사용자 시나리오
│   ├── search-images/
│   │   ├── ui/
│   │   │   └── SearchForm.tsx
│   │   ├── model/
│   │   │   ├── useImageSearch.ts  # React Query 훅
│   │   │   └── types.ts
│   │   ├── api/
│   │   │   ├── searchImages.ts
│   │   │   └── types.ts
│   │   └── index.ts
│   │
│   └── pagination/
│       ├── ui/
│       │   └── Pagination.tsx
│       ├── model/
│       │   ├── usePagination.ts
│       │   └── types.ts
│       └── index.ts
│
├── entities/                      # Entities 레이어: 비즈니스 엔티티
│   └── image/
│       ├── ui/
│       │   └── ImageCard.tsx      # 이미지 카드 컴포넌트
│       ├── model/
│       │   ├── types.ts           # Image 타입 정의
│       │   └── imageSchema.ts     # Zod 스키마
│       ├── api/
│       │   ├── imageApi.ts        # 이미지 관련 API
│       │   └── types.ts
│       └── index.ts
│
├── shared/                        # Shared 레이어: 공통 코드
│   ├── ui/                        # 공통 UI 컴포넌트
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── types.ts
│   │   ├── Input/
│   │   ├── ErrorMessage/
│   │   └── Skeleton/
│   ├── api/
│   │   ├── apiClient.ts           # API 클라이언트 설정
│   │   ├── queryClient.ts         # React Query 설정
│   │   └── types.ts
│   ├── lib/
│   │   ├── utils.ts               # 유틸리티 함수
│   │   ├── constants.ts           # 상수
│   │   └── types.ts               # 공통 타입
│   └── config/
│       ├── env.ts                 # 환경 변수
│       └── types.ts
│
├── __tests__/
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

### FSD 레이어 의존성 방향
```
app (앱 설정, 라우팅)
  ↓
pages (페이지 조합)
  ↓
widgets (복합 UI 블록)
  ↓
features (사용자 시나리오)
  ↓
entities (비즈니스 엔티티)
  ↓
shared (공통 코드)
```

### TDD 단계별 구현 (FSD 레이어별)

#### 4.1 Shared Layer - 공통 코드 (Red → Green → Refactor)
- [ ] **Test 1**: API Client 설정 테스트
  - [ ] 기본 fetch 래퍼 구현
  - [ ] 에러 핸들링 유틸리티
  - [ ] 환경 변수 관리

- [ ] **Test 2**: 공통 UI 컴포넌트 테스트
  - [ ] Button, Input 컴포넌트 (Tailwind)
  - [ ] Skeleton 컴포넌트
  - [ ] ErrorMessage 컴포넌트

#### 4.2 Entities Layer - 비즈니스 엔티티 (Red → Green → Refactor)
- [ ] **Test 3**: Image 엔티티 테스트
  - [ ] Image 타입 정의
  - [ ] 데이터 검증 스키마
  - [ ] ImageCard 컴포넌트 렌더링

- [ ] **Test 4**: Image API 테스트
  - [ ] API Route 구현 (app/api/images/route.js)
  - [ ] 이미지 데이터 변환 로직

#### 4.3 Features Layer - 사용자 시나리오 (Red → Green → Refactor)
- [ ] **Test 5**: search-images 피처 테스트
  - [ ] useImageSearch 훅 (React Query)
  - [ ] SearchForm UI 컴포넌트
  - [ ] 검색 API 함수

- [ ] **Test 6**: pagination 피처 테스트
  - [ ] usePagination 훅
  - [ ] Pagination UI 컴포넌트
  - [ ] 페이지 상태 관리

#### 4.4 Widgets Layer - 복합 UI 블록 (Red → Green → Refactor)
- [ ] **Test 7**: image-search-bar 위젯 테스트
  - [ ] 검색창 + 버튼 조합
  - [ ] useSearchState 훅
  - [ ] features/search-images와 통합

- [ ] **Test 8**: image-grid 위젯 테스트
  - [ ] ImageGrid 레이아웃
  - [ ] ImageGridSkeleton
  - [ ] entities/image와 통합

#### 4.5 Pages Layer - 페이지 조합 (Red → Green → Refactor)
- [ ] **Test 9**: SearchPage 테스트
  - [ ] widgets 조합하여 페이지 구성
  - [ ] Server Component로 초기 데이터 로드
  - [ ] Client Component로 인터랙션 처리

#### 4.6 App Layer - 앱 설정 (Red → Green → Refactor)
- [ ] **Test 10**: Providers 테스트
  - [ ] React Query Provider 설정
  - [ ] Tailwind 테마 설정
  - [ ] 전역 에러 바운더리

#### 4.7 통합 테스트 및 FSD 검증
- [ ] **Test 11**: FSD 레이어 의존성 검증
  - [ ] 하위 레이어만 import하는지 확인
  - [ ] Public API (index.js) 사용 검증

- [ ] **Test 12**: E2E 테스트 (Playwright)
  - [ ] 전체 검색 플로우
  - [ ] SSR 및 CSR 동작 확인

#### 4.8 Next.js 16 특화 기능
- [ ] **Test 13**: Turbopack 빌드 최적화
  - [ ] 빌드 시간 측정
  - [ ] 프로덕션 번들 분석

- [ ] **Test 14**: React 19.2 기능 활용
  - [ ] Server Actions (선택적)
  - [ ] next/image 최적화

#### 4.9 리팩토링 (Tidy First)
- [ ] **Structural**: FSD 구조 최적화
- [ ] **Structural**: Public API 일관성 확보
- [ ] **Behavioral**: Suspense, Lazy loading 적용

---

## Phase 5: Next.js 16 + Styled Components + TypeScript (FSD 심화)

> **초기 설정**: [SETUP.md - Phase 5](./SETUP.md#phase-5-nextjs-16--styled-components--typescript-fsd-심화) 참조

### 아키텍처 개념
Phase 4의 Feature-Sliced Design 구조를 유지하면서 **Styled Components**로 스타일링을 전환합니다.
FSD의 각 슬라이스에서 스타일을 캡슐화하여 더 응집력 있는 구조를 만듭니다.

**추가 학습 목표:**
1. CSS-in-JS와 FSD의 조합
2. 테마 시스템과 디자인 토큰 관리
3. SSR에서 Styled Components 최적화

### TypeScript + Styled Components 학습 목표
- **Styled Components 타입**: DefaultTheme 타입 확장
- **테마 타입**: 타입 안전한 테마 객체
- **Props 타입**: Transient props와 attrs 타입
- **타입 추론**: css 헬퍼의 타입 추론 활용

### Feature-Sliced Design + Styled Components 구조
```
05-nextjs-styled-components/
├── app/                           # App 레이어
│   ├── providers/
│   │   ├── Providers.jsx
│   │   └── StyledComponentsRegistry.jsx  # SC SSR 설정
│   ├── styles/
│   │   ├── GlobalStyles.js        # 전역 스타일
│   │   └── theme.js               # 테마 객체
│   ├── layout.jsx
│   ├── page.jsx
│   └── api/
│       └── images/
│           └── route.js
│
├── pages/                         # Pages 레이어 (Phase 4와 동일)
│   └── search/
│       ├── ui/
│       │   ├── SearchPage.jsx
│       │   └── SearchPage.styles.js  # 페이지 전용 스타일
│       └── index.js
│
├── widgets/                       # Widgets 레이어
│   ├── image-search-bar/
│   │   ├── ui/
│   │   │   ├── ImageSearchBar.jsx
│   │   │   └── ImageSearchBar.styles.js  # 위젯 스타일
│   │   ├── model/
│   │   │   └── useSearchState.js
│   │   └── index.js
│   │
│   └── image-grid/
│       ├── ui/
│       │   ├── ImageGrid.jsx
│       │   ├── ImageGrid.styles.js
│       │   ├── ImageGridSkeleton.jsx
│       │   └── ImageGridSkeleton.styles.js
│       └── index.js
│
├── features/                      # Features 레이어
│   ├── search-images/
│   │   ├── ui/
│   │   │   ├── SearchForm.jsx
│   │   │   └── SearchForm.styles.js
│   │   ├── model/
│   │   │   └── useImageSearch.js
│   │   ├── api/
│   │   │   └── searchImages.js
│   │   └── index.js
│   │
│   └── pagination/
│       ├── ui/
│       │   ├── Pagination.jsx
│       │   └── Pagination.styles.js
│       ├── model/
│       │   └── usePagination.js
│       └── index.js
│
├── entities/                      # Entities 레이어
│   └── image/
│       ├── ui/
│       │   ├── ImageCard.jsx
│       │   └── ImageCard.styles.js
│       ├── model/
│       │   ├── types.js
│       │   └── imageSchema.js
│       ├── api/
│       │   └── imageApi.js
│       └── index.js
│
├── shared/                        # Shared 레이어
│   ├── ui/                        # 공통 UI 컴포넌트
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.styles.js
│   │   ├── Input/
│   │   │   ├── Input.jsx
│   │   │   └── Input.styles.js
│   │   ├── ErrorMessage/
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── ErrorMessage.styles.js
│   │   └── Skeleton/
│   │       ├── Skeleton.jsx
│   │       └── Skeleton.styles.js
│   ├── api/
│   │   ├── apiClient.js
│   │   └── queryClient.js
│   ├── lib/
│   │   ├── utils.js
│   │   ├── constants.js
│   │   └── styled-helpers.js      # Styled Components 헬퍼
│   ├── styles/
│   │   ├── mixins.js              # 재사용 가능한 믹스인
│   │   └── animations.js          # 공통 애니메이션
│   └── config/
│       └── env.js
│
├── __tests__/
├── next.config.js
└── package.json
```

### TDD 단계별 구현 (FSD + Styled Components)

#### 5.1 App Layer - Styled Components 설정 (Red → Green → Refactor)
- [ ] **Test 1**: SSR 설정 테스트
  - [ ] StyledComponentsRegistry 구현
  - [ ] ServerStyleSheet 동작 확인
  - [ ] FOUC 방지 검증

- [ ] **Test 2**: Theme Provider 및 GlobalStyles 테스트
  - [ ] 테마 객체 정의 (colors, spacing, typography, breakpoints)
  - [ ] GlobalStyles 적용 (리셋, 폰트)
  - [ ] ThemeProvider로 전역 테마 제공

#### 5.2 Shared Layer - 공통 스타일 시스템 (Red → Green → Refactor)
- [ ] **Test 3**: 디자인 토큰 및 믹스인 테스트
  - [ ] 재사용 가능한 믹스인 (flexbox, grid 등)
  - [ ] 공통 애니메이션 (fadeIn, slideUp 등)
  - [ ] Styled Components 헬퍼 함수

- [ ] **Test 4**: 공통 UI 컴포넌트 스타일링
  - [ ] Button.styles.js (variant, size props)
  - [ ] Input.styles.js (상태별 스타일)
  - [ ] Skeleton.styles.js (애니메이션)
  - [ ] ErrorMessage.styles.js

#### 5.3 Entities Layer - 엔티티 스타일링 (Red → Green → Refactor)
- [ ] **Test 5**: ImageCard 스타일 컴포넌트
  - [ ] 카드 레이아웃 및 호버 효과
  - [ ] 반응형 디자인
  - [ ] 이미지 로딩 상태 스타일

#### 5.4 Features Layer - 피처 스타일링 (Red → Green → Refactor)
- [ ] **Test 6**: SearchForm 스타일링
  - [ ] 검색 폼 레이아웃
  - [ ] 포커스 상태 및 애니메이션
  - [ ] 테마 기반 색상 적용

- [ ] **Test 7**: Pagination 스타일링
  - [ ] 버튼 상태별 스타일 (active, disabled)
  - [ ] 호버 및 클릭 효과

#### 5.5 Widgets Layer - 위젯 스타일링 (Red → Green → Refactor)
- [ ] **Test 8**: ImageSearchBar 위젯 스타일
  - [ ] 복합 컴포넌트 레이아웃
  - [ ] Features와 Shared 스타일 조합

- [ ] **Test 9**: ImageGrid 위젯 스타일
  - [ ] CSS Grid 레이아웃
  - [ ] 반응형 그리드 (1~4열)
  - [ ] GridSkeleton 애니메이션

#### 5.6 Pages Layer - 페이지 스타일링 (Red → Green → Refactor)
- [ ] **Test 10**: SearchPage 스타일
  - [ ] 페이지 레이아웃 및 여백
  - [ ] 위젯 조합 스타일

#### 5.7 고급 기능 테스트 (Red → Green → Refactor)
- [ ] **Test 11**: 다크 모드 구현 (선택적)
  - [ ] 라이트/다크 테마 정의
  - [ ] 테마 전환 로직
  - [ ] 사용자 선호도 저장

- [ ] **Test 12**: 동적 스타일링
  - [ ] Props 기반 조건부 스타일
  - [ ] Transient props ($-prefix) 활용
  - [ ] attrs() 헬퍼 활용

#### 5.8 통합 테스트
- [ ] **Test 13**: FSD + Styled Components SSR 통합
  - [ ] 모든 레이어의 스타일 SSR 적용 확인
  - [ ] Hydration 이슈 없는지 검증
  - [ ] 성능 측정 (Lighthouse)

#### 5.9 리팩토링 (Tidy First)
- [ ] **Structural**: 스타일 코드 중복 제거
- [ ] **Structural**: 테마 변수 일관성 확보
- [ ] **Structural**: 믹스인 및 헬퍼 최적화

#### 5.10 아키텍처 비교 정리
- [ ] **Clean Architecture vs FSD 비교**
  - [ ] 레이어 구조 차이점
  - [ ] 확장성 및 유지보수성 비교
  - [ ] 팀 협업 관점 차이

- [ ] **Tailwind vs Styled Components 비교**
  - [ ] 번들 크기 측정
  - [ ] 개발 속도 (DX) 비교
  - [ ] 런타임 성능 비교
  - [ ] 사용 사례별 권장사항

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
