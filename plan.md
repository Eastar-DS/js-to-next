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
2. React 19 + Zustand + **TypeScript** + **Styled Components** - **Clean Architecture** 도입
3. React 19 + React Query + **TypeScript** + **Styled Components** - **Clean Architecture** 심화
4. Next.js 16 + Tailwind CSS + **TypeScript** - **Feature-Sliced Design (FSD)** 도입
5. Next.js 16 + Styled Components + **TypeScript** - **Feature-Sliced Design (FSD)** 심화

### 아키텍처 학습 목표
- **Phase 1**: Vanilla JavaScript로 기본기 학습
- **Phase 2-3**: Clean Architecture의 레이어 기반 구조와 의존성 규칙 학습 + TypeScript 타입 시스템 + Styled Components 기초
- **Phase 4-5**: Feature-Sliced Design의 슬라이스 기반 현대적 구조 학습 + TypeScript 고급 활용 + Tailwind CSS vs Styled Components 비교

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
│   ├── api.js          # API 클라이언트 및 환경변수 관리
│   ├── config.js       # 설정 (API 키)
│   ├── state.js        # 상태 관리 모듈 (getter/setter)
│   ├── ui.js           # UI 렌더링 함수들 + clearContainer 헬퍼
│   └── main.js         # 메인 앱 로직 (상태 통합)
├── __tests__/
│   ├── api.test.js
│   ├── ui.test.js
│   └── integration.test.js
├── airbnb-style-test.js          # Airbnb Style Guide 검증 파일
├── AIRBNB-STYLE-TEST-REPORT.md   # 검증 리포트
├── .eslintrc.json
├── .prettierrc
├── jest.config.js
└── package.json
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
- [x] **Structural**: 중복 코드 제거 (DOM 조작 헬퍼 함수 `clearContainer` 추가)
- [x] **Structural**: 함수 분리 및 단일 책임 원칙 적용 (`scrollToTop`, `getContainers` 분리)
- [x] **Structural**: 상태 관리 모듈화 (`state.js` 생성 - getter/setter 패턴)
- [x] **Behavioral**: 순환 참조 해결 (인라인 콜백 사용, Airbnb 8.1 준수)
- [x] **Verification**: Airbnb Style Guide 검증 파일 작성 (`airbnb-style-test.js`)
- [x] **Documentation**: 검증 리포트 작성 (`AIRBNB-STYLE-TEST-REPORT.md`)

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

- [x] **브라우저 테스트**: 실제 동작 확인
  - [x] 검색 기능 작동 확인
  - [x] 로딩 스켈레톤 표시 확인
  - [x] 이미지 결과 렌더링 확인
  - [x] 페이지네이션 작동 확인
  - [x] 에러 핸들링 확인
  - [x] 반응형 디자인 확인

---

## Phase 2: React 19 + Zustand + TypeScript + Styled Components (Clean Architecture)

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

### Styled Components 학습 목표
- **CSS-in-JS 기초**: Styled Components의 기본 개념과 사용법
- **타입 안전한 스타일링**: TypeScript와 Styled Components 통합
- **테마 시스템**: ThemeProvider를 통한 전역 테마 관리
- **Props 기반 스타일링**: 동적 스타일 적용 방법

### Clean Architecture + TypeScript + Styled Components 레이어 구조
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
│   │   ├── datasources/
│   │   │   ├── PixabayDataSource.ts # Pixabay API 통신 (HTTP, DTO 반환)
│   │   │   └── dto/
│   │   │       └── PixabayDto.ts   # API 응답 DTO 타입
│   │   ├── mappers/
│   │   │   └── PixabayImageMapper.ts # DTO ↔ Entity 변환
│   │   ├── repositories/
│   │   │   └── PixabayImageRepository.ts # Repository 구현체
│   │   ├── logging/
│   │   │   └── Logger.ts           # 로깅 시스템
│   │   └── config/
│   │       └── env.ts              # 환경변수 관리
│   │
│   ├── presentation/              # 프레젠테이션 레이어 (UI)
│   │   ├── components/
│   │   │   ├── SearchBar/
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   └── SearchBar.styles.ts
│   │   │   ├── ImageGrid/
│   │   │   │   ├── ImageGrid.tsx
│   │   │   │   └── ImageGrid.styles.ts
│   │   │   ├── ImageCard/
│   │   │   │   ├── ImageCard.tsx
│   │   │   │   └── ImageCard.styles.ts
│   │   │   ├── SkeletonCard/
│   │   │   │   ├── SkeletonCard.tsx
│   │   │   │   └── SkeletonCard.styles.ts
│   │   │   ├── Pagination/
│   │   │   │   ├── Pagination.tsx
│   │   │   │   └── Pagination.styles.ts
│   │   │   └── ErrorMessage/
│   │   │       ├── ErrorMessage.tsx
│   │   │       └── ErrorMessage.styles.ts
│   │   ├── pages/
│   │   │   └── SearchPage.tsx
│   │   ├── styles/
│   │   │   ├── GlobalStyles.ts    # 전역 스타일
│   │   │   └── theme.ts           # 테마 정의
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

#### 2.0 TypeScript + Styled Components 설정 (Red → Green → Refactor)
- [x] **Test 0**: TypeScript 환경 설정
  - [x] tsconfig.json 설정 (strict mode, paths 등)
  - [x] Vite + TypeScript 통합
  - [x] Jest + TypeScript 설정 (@types/jest, ts-jest)
  - [x] React + TypeScript 타입 정의
  - [x] Jest 테스트 환경 구성 (jest.config.ts, tsconfig.test.json)
  - [x] Testing Library 설정 (@testing-library/react, @testing-library/jest-dom)
  - [x] 테스트 유틸리티 파일 생성 (setup.ts, test-utils.tsx, fileMock.ts)
  - [x] 설정 검증 테스트 (3/3 passed)
- [x] **Styled Components 설치**
  - [x] styled-components 및 타입 정의 설치
  - [x] jest-styled-components 설치 (테스트용)

#### 2.1 Domain Layer - Entities (Red → Green → Refactor)
- [x] **Test 1**: Image 엔티티 타입 테스트
  - [x] Image 인터페이스 정의 (id, tags, previewURL, largeImageURL 등)
  - [x] 타입 가드 함수 작성 (isImage)
  - [x] 엔티티 생성 팩토리 함수 및 유효성 검증 (createImage)
  - [x] 8개 테스트 모두 통과

#### 2.2 Domain Layer - Repository Interface (Red → Green → Refactor)
- [x] **Test 2**: ImageRepository 인터페이스 테스트
  - [x] TypeScript interface로 Repository 계약 정의
  - [x] search, getByPage 메서드 시그니처 정의
  - [x] Result 타입 정의 (Success | Failure)
  - [x] Discriminated Union을 활용한 타입 좁히기
  - [x] 7개 테스트 모두 통과

#### 2.3 Domain Layer - UseCases (Red → Green → Refactor)
- [x] **Test 3**: SearchImagesUseCase 테스트
  - [x] SearchImagesUseCase 클래스 정의
  - [x] Repository 인터페이스를 통해 검색 실행
  - [x] Result<Image[]> 반환 타입
  - [x] 6개 테스트 모두 통과

- [x] **Test 4**: GetImagesByPageUseCase 테스트
  - [x] GetImagesByPageUseCase 클래스 정의
  - [x] 페이지네이션 파라미터 타입 정의 (query: string, page: number)
  - [x] Repository를 통한 타입 안전한 데이터 조회
  - [x] 6개 테스트 모두 통과

#### 2.4 Infrastructure Layer - DataSource & Repository (Red → Green → Refactor)

**2.4.1 DTO 타입 정의**
- [x] **Test 5**: Pixabay API DTO 타입 정의
  - [x] PixabayImageDto 인터페이스 정의 (API 응답 구조)
  - [x] PixabayApiResponseDto 인터페이스 정의 (전체 응답 래퍼)
  - [x] DTO 타입 검증 함수 작성 (isPixabayImageDto, isPixabayApiResponseDto)
  - [x] 9개 테스트 모두 통과

**2.4.2 DataSource Layer (API 통신)**
- [x] **Test 6**: PixabayDataSource 테스트
  - [x] fetch 기반 HTTP 통신 구현
  - [x] search 메서드 구현 (query: string → DTO 반환)
  - [x] getByPage 메서드 구현 (query: string, page: number → DTO 반환)
  - [x] 타입 안전한 HTTP 요청/응답 처리
  - [x] 네트워크 에러 핸들링 (타입 가드 활용)
  - [x] URL 파라미터 인코딩 처리
  - [x] 11개 테스트 모두 통과

**2.4.3 Mapper Pattern (DTO ↔ Entity 변환) - 프로덕션급 개선**
- [x] **Mapper 구현**: PixabayImageMapper
  - [x] toEntity() - DTO → Entity 변환
  - [x] toEntities() - DTO[] → Entity[] 배치 변환
  - [x] toDto() - Entity → DTO 역변환 (양방향 변환 지원)
  - [x] 변환 로직 독립 테스트 (8개 테스트 통과)
  - [x] Repository에서 Mapper 사용하도록 리팩토링

**2.4.4 Repository Implementation (통합)**
- [x] **Test 7**: PixabayImageRepository 구현 테스트
  - [x] ImageRepository 인터페이스 구현
  - [x] DataSource 의존성 주입 (constructor)
  - [x] Mapper를 통한 DTO → Entity 변환
  - [x] Result<Image[]> 타입으로 래핑
  - [x] 타입 안전한 에러 매핑
  - [x] 9개 테스트 모두 통과

**2.4.5 프로덕션급 추가 구현**
- [x] **에러 타입 체계화**: DomainError, NotFoundError, ValidationError, NetworkError 등
  - [x] 기본 에러 클래스 상속 구조
  - [x] 에러 타입 가드 함수
  - [x] 에러 코드 체계 (NOT_FOUND, VALIDATION_ERROR 등)

- [x] **로깅 시스템**: Logger 클래스
  - [x] 환경별 로그 레벨 (DEBUG, INFO, WARN, ERROR, NONE)
  - [x] 콘솔 로깅 + 원격 로깅 지원 (Sentry 등)
  - [x] 타임스탬프 자동 기록

- [x] **환경변수 타입 안전 관리**: EnvConfig
  - [x] 타입 안전한 환경변수 접근
  - [x] 필수 환경변수 검증
  - [x] 환경별 기본값 설정
  - [x] isProduction(), isDevelopment() 헬퍼 메서드
  - [x] **의존성 주입 패턴 리팩토링** (테스트 가능하도록 개선)
    - [x] envConfig.ts: 순수 클래스 (import.meta 없음, 테스트 가능)
    - [x] env.ts: 싱글톤 인스턴스 (import.meta.env 사용)
    - [x] 18개 EnvConfig 테스트 모두 통과
  - [x] **Vite 환경변수 설정**
    - [x] .env 파일: VITE_ 접두사 규칙 적용
    - [x] .env.example: 팀원용 템플릿 생성
    - [x] MODE는 Vite 자동 설정 안내

- [x] **아키텍처 문서**: ARCHITECTURE.md
  - [x] Mapper 패턴 설명
  - [x] DataSource 패턴 설명
  - [x] 데이터 흐름 다이어그램
  - [x] 레이어별 책임 정의
  - [x] 프로덕션 체크리스트

**✅ Phase 2.4 완료 요약**
- 전체 85개 테스트 통과 (67 + EnvConfig 18)
- Infrastructure Layer: DTO(9) + DataSource(11) + Mapper(8) + Repository(9) + EnvConfig(18) = 55개 테스트
- 프로덕션급 패턴 적용:
  - Mapper 패턴: DTO ↔ Entity 변환 분리
  - 에러 체계화: DomainError 상속 구조
  - 로깅 시스템: 환경별 로그 레벨
  - **환경변수 관리 (DI 패턴)**: 테스트 가능한 의존성 주입 구현
  - Vite 환경변수: VITE_ 접두사, .env 설정

#### 2.5 Application Layer - Store & Hooks (Red → Green → Refactor) ✅
- [x] **Test 8**: Zustand 스토어 타입 정의 (6 tests)
  - [x] StoreState 인터페이스 정의: images, isLoading, error, currentPage, totalPages, query
  - [x] StoreActions 타입 정의: searchImages, getImagesByPage, resetStore
  - [x] ImageStore 타입: State & Actions 결합

- [x] **Test 9**: Zustand 스토어 구현 테스트 (6 tests)
  - [x] createImageStore 팩토리 함수 (UseCase DI 패턴)
  - [x] searchImages 액션: Result 타입 처리, 성공/실패 상태 업데이트
  - [x] getImagesByPage 액션: 페이지 변경 및 상태 업데이트
  - [x] resetStore 액션: 초기 상태로 리셋

- [x] **Test 10**: useImageSearch 훅 테스트 (6 tests)
  - [x] UseImageSearchReturn 반환 타입 정의
  - [x] 스토어와 타입 안전한 연동 (Zustand selector 패턴)
  - [x] 디바운스 구현 (기본 300ms, 설정 가능)
  - [x] search 함수: 디바운스된 검색
  - [x] goToPage 함수: 페이지 이동

**구현 파일:**
- `src/application/store/types.ts`: 스토어 타입 정의
- `src/application/store/useImageStore.ts`: Zustand 스토어 팩토리
- `src/application/hooks/useImageSearch.ts`: 커스텀 훅

**테스트 결과:** 103 tests passing

#### 2.6 Presentation Layer - Theme & Global Styles (Red → Green → Refactor) ✅
- [x] **Test 11**: 테마 및 전역 스타일 설정 (4 tests)
  - [x] 테마 타입 정의 (DefaultTheme 확장)
  - [x] Theme 인터페이스 정의: colors, spacing, typography, borderRadius, shadows
  - [x] GlobalStyles 정의: CSS Reset, body 스타일, 요소별 기본 스타일
  - [x] TypeScript 선언 병합으로 styled-components DefaultTheme 확장

**구현 파일:**
- `src/presentation/styles/theme.ts`: 테마 객체 및 타입 정의
- `src/presentation/styles/styled.d.ts`: DefaultTheme 타입 확장
- `src/presentation/styles/GlobalStyles.ts`: 전역 스타일 컴포넌트

**테스트 결과:** 107 tests passing

#### 2.7 Presentation Layer - Components (Red → Green → Refactor)

**2.7.1 Component Props 타입 정의** ✅
- [x] **Test 12**: 컴포넌트 Props 타입 정의 (4 tests)
  - [x] SearchBarProps: onSearch, isLoading
  - [x] ImageCardProps: image (Image 엔티티)
  - [x] ImageGridProps: images[], isLoading, error
  - [x] PaginationProps: currentPage, totalPages, onPageChange

**구현 파일:**
- `src/presentation/components/types.ts`: 모든 컴포넌트 Props 타입 정의

**테스트 결과:** 111 tests passing

**2.7.2 UI Components 구현** ✅
- [x] **Test 13**: SearchBar 컴포넌트 + 스타일링 (11 tests)
  - [x] 검색 입력 필드 렌더링
  - [x] 타입 안전한 이벤트 핸들러
  - [x] Styled Components로 스타일 정의
  - [x] Props 기반 동적 스타일링 (로딩 상태)

- [x] **Test 14**: ImageCard 컴포넌트 + 스타일링 (11 tests)
  - [x] Image 엔티티 데이터 표시
  - [x] 타입 안전한 props 전달
  - [x] 카드 레이아웃 및 호버 효과
  - [x] 반응형 이미지 스타일

- [x] **Test 15**: SkeletonCard 컴포넌트 + 스타일링 (8 tests)
  - [x] 스켈레톤 UI 렌더링
  - [x] 로딩 애니메이션 (keyframes)
  - [x] 테마 색상 적용

- [x] **Test 16**: Pagination 컴포넌트 + 스타일링 (14 tests)
  - [x] 페이지 버튼 렌더링
  - [x] 타입 안전한 페이지 변경 핸들러
  - [x] 버튼 상태별 스타일 (active, disabled)

- [x] **Test 17**: ErrorMessage 컴포넌트 + 스타일링 (9 tests)
  - [x] Error 객체 타입 체크
  - [x] 에러 메시지 표시
  - [x] 에러 메시지 스타일링

- [x] **Test 18**: ImageGrid 컴포넌트 + 스타일링 (10 tests)
  - [x] 이미지 목록 그리드 렌더링
  - [x] 로딩/에러 상태 처리
  - [x] 반응형 그리드 레이아웃

**구현 파일:**
- `src/presentation/components/SearchBar/SearchBar.tsx`: 검색 바 컴포넌트
- `src/presentation/components/ImageCard/ImageCard.tsx`: 이미지 카드 컴포넌트
- `src/presentation/components/SkeletonCard/SkeletonCard.tsx`: 로딩 스켈레톤 컴포넌트
- `src/presentation/components/Pagination/Pagination.tsx`: 페이지네이션 컴포넌트
- `src/presentation/components/ErrorMessage/ErrorMessage.tsx`: 에러 메시지 컴포넌트
- `src/presentation/components/ImageGrid/ImageGrid.tsx`: 이미지 그리드 컨테이너
- 각 컴포넌트별 `.styles.ts` 파일
- `src/presentation/components/types.ts`: ErrorMessageProps 추가
- `src/presentation/styles/theme.ts`: surface, textSecondary 색상 추가
- `src/App.tsx`: 컴포넌트 미리보기 (임시)

**테스트 결과:** 171 tests passing

#### 2.8 통합 테스트 (Red → Green → Refactor) ✅
- [x] **Test 19**: 타입 시스템 통합 검증 (9 tests)
  - [x] 레이어 간 타입 일관성 확인
  - [x] 타입 안전성 엔드투엔드 테스트
  - [x] 타입 좁히기 및 Result 타입 Discriminated Union 검증

- [x] **Test 20**: 전체 검색 워크플로우 테스트 (12 tests)
  - [x] 타입 안전한 검색 플로우
  - [x] 페이지네이션 타입 체크
  - [x] 에러 핸들링 타입 검증
  - [x] 스타일 렌더링 확인
  - [x] 전체 워크플로우 시나리오 (검색 → 결과 → 페이지 변경)

**테스트 결과:** 192 tests passing

#### 2.8.1 실제 API 연결 및 App.tsx 구현 (Red → Green → Refactor) ✅
- [x] **Test 21**: App.tsx 실제 API 연결 통합 테스트
  - [x] useImageSearch 훅 통합
  - [x] Pixabay API 실제 호출
  - [x] 검색 결과 상태 관리
  - [x] 페이지네이션 동작 확인
  - [x] 에러 핸들링 UI 표시

- [x] **실제 구현**: App.tsx 리팩토링
  - [x] .env 파일 설정 확인 (VITE_PIXABAY_API_KEY)
  - [x] Repository, UseCase, Store 의존성 주입
  - [x] useImageSearch 훅 사용
  - [x] 검색, 페이지네이션 핸들러 연결
  - [x] 로딩, 에러 상태 UI 연결
  - [x] Flexbox 레이아웃 구조 적용 (header/main/footer)

- [x] **브라우저 테스트**: 실제 동작 확인
  - [x] 검색 기능 작동 확인
  - [x] 로딩 스켈레톤 표시 확인
  - [x] 이미지 결과 렌더링 확인 (20개 이미지)
  - [x] 페이지네이션 작동 확인
  - [x] 에러 핸들링 확인
  - [x] 반응형 레이아웃 확인 (1열, 2열, 다열 그리드)

- [x] **버그 수정**: 실제 동작 중 발견된 이슈 해결
  - [x] CORS 에러 수정 (fetch 헤더 제거)
  - [x] import.meta.env 접근 방식 수정
  - [x] 반응형 이미지 잘림 현상 수정 (SearchBar 패딩, GridContainer 상단 패딩 제거)

**구현 파일:**
- `02-react-zustand/.env`: 환경변수 설정
- `src/App.tsx`: 전체 레이어 통합 및 의존성 주입
- `src/infrastructure/config/env.ts`: import.meta.env 직접 접근 방식 수정
- `src/infrastructure/datasources/PixabayDataSource.ts`: CORS 헤더 제거
- `src/presentation/components/SearchBar/SearchBar.styles.ts`: 패딩 조정
- `src/presentation/components/ImageGrid/ImageGrid.styles.ts`: 상단 패딩 제거
- `src/presentation/components/ImageCard/ImageCard.styles.ts`: 이미지 aspect-ratio 적용
- `src/presentation/styles/GlobalStyles.ts`: body min-height 수정

**테스트 결과:** 브라우저 실제 동작 확인 완료 (모든 기능 정상 작동)

#### 2.9 리팩토링 (Tidy First) ✅
- [x] **Structural**: 공통 타입 추출 및 재사용
  - [x] AsyncState<T> 인터페이스 정의 (data, isLoading, error)
  - [x] PaginationState 인터페이스 정의 (currentPage, totalPages)
  - [x] 중복된 타입 정의를 src/domain/types.ts로 통합
- [x] **Structural**: 유틸리티 타입 정의 (Nullable, Result 등)
  - [x] Nullable<T>, Optional<T> 타입 유틸리티
  - [x] ID, Timestamp 타입 별칭
  - [x] Result<T> 타입은 이미 정의되어 있음
- [x] **Structural**: 타입 가드 함수 정리 (사용자 선택으로 스킵)
- [x] **Structural**: 스타일 믹스인 및 공통 스타일 추출
  - [x] transitions 믹스인 (default, slow, transform, color)
  - [x] cardContainer 믹스인 (공통 카드 스타일)
  - [x] buttonStates 믹스인 (hover, active, disabled)
  - [x] flexColumn, flexRow 믹스인 (레이아웃)
  - [x] responsiveGrid 함수 (반응형 그리드)
  - [x] textEllipsis 함수 (단일/다중 줄 말줄임)
  - [x] absoluteCenter 믹스인 (중앙 정렬)
  - [x] customScrollbar 믹스인 (스크롤바 스타일)
- [x] **Verification**: strict 모드 확인 (이미 활성화됨)
  - [x] tsconfig.app.json에서 strict: true 확인
  - [x] 추가 strict 옵션 확인 (noUnusedLocals, noUnusedParameters 등)

**구현 파일:**
- `src/domain/types.ts`: 공통 타입 추가 (AsyncState, PaginationState, Nullable, Optional, ID, Timestamp)
- `src/presentation/styles/mixins.ts`: 8개 재사용 가능한 스타일 믹스인 생성

**테스트 결과:** 192 tests passing (Phase 2.8.1 테스트 수정 포함)

---

## Phase 3: React 19 + React Query + TypeScript + Styled Components (Clean Architecture 심화)

> **초기 설정**: [SETUP.md - Phase 3](./SETUP.md#phase-3-react-19--react-query--typescript-clean-architecture-심화) 참조

### 아키텍처 개념
Phase 2의 Clean Architecture를 유지하면서 **Zustand를 React Query로 교체**합니다.
서버 상태 관리에 특화된 React Query의 강력한 캐싱, 동기화, 리페칭 기능을 활용합니다.

**핵심 차이점:**
- **Phase 2**: Zustand (클라이언트 상태 관리) - `create()`, `useStore()`
- **Phase 3**: React Query (서버 상태 관리) - `useQuery()`, `QueryClient`

### 학습 목표

#### TypeScript 심화
- **React Query 타입 추론**: useQuery, useMutation의 제네릭 활용
- **Query Key 타입 안전성**: const assertion을 활용한 타입 안전한 Query Key
- **고급 제네릭**: Conditional Types, Mapped Types 활용
- **타입 좁히기**: Union Types와 타입 가드 고급 활용

#### React Query 핵심 개념
- **자동 캐싱**: staleTime, gcTime으로 캐시 관리
- **자동 리페칭**: refetchOnWindowFocus, refetchOnMount
- **Pagination**: placeholderData로 부드러운 페이지 전환
- **Prefetching**: 다음 페이지 미리 로드
- **DevTools**: React Query DevTools로 쿼리 상태 확인

### Phase 2 코드 재사용 전략

**재사용 (복사만 하면 됨):**
- ✅ `src/domain/` - 엔티티, UseCase, Repository 인터페이스 (100% 재사용)
- ✅ `src/infrastructure/` - DataSource, Mapper, Repository 구현 (100% 재사용)
- ✅ `src/presentation/components/` - 모든 UI 컴포넌트 (100% 재사용)
- ✅ `src/presentation/styles/` - 테마, GlobalStyles, mixins (100% 재사용)

**교체 (Zustand → React Query):**
- ❌ `src/application/store/` → 삭제
- ✅ `src/application/queries/` → 새로 작성 (Query 훅)
- ✅ `src/application/queryClient.ts` → 새로 작성 (React Query 설정)
- 🔄 `src/application/hooks/useImageSearch.ts` → 수정 (useQuery 사용)
- 🔄 `src/App.tsx` → 수정 (QueryClientProvider 추가)

### Clean Architecture + React Query 구조
```
03-react-query/
├── public/
├── src/
│   ├── domain/                    # ✅ Phase 2에서 100% 재사용
│   │   ├── entities/
│   │   │   ├── Image.ts
│   │   │   └── types.ts
│   │   ├── repositories/
│   │   │   └── ImageRepository.ts
│   │   └── usecases/
│   │       ├── SearchImagesUseCase.ts
│   │       └── GetImagesByPageUseCase.ts
│   │
│   ├── infrastructure/            # ✅ Phase 2에서 100% 재사용
│   │   ├── datasources/
│   │   │   ├── PixabayDataSource.ts
│   │   │   └── dto/
│   │   │       └── PixabayDto.ts
│   │   ├── mappers/
│   │   │   └── PixabayImageMapper.ts
│   │   ├── repositories/
│   │   │   └── PixabayImageRepository.ts
│   │   ├── logging/
│   │   │   └── Logger.ts
│   │   └── config/
│   │       └── env.ts
│   │
│   ├── application/               # 🔄 React Query로 교체
│   │   ├── queries/               # ✅ 새로 작성
│   │   │   ├── queryKeys.ts       # Query Key 팩토리
│   │   │   ├── types.ts           # Query 관련 타입
│   │   │   └── useImagesQuery.ts  # useQuery 훅
│   │   ├── hooks/
│   │   │   └── useImageSearch.ts  # 🔄 React Query 사용하도록 수정
│   │   └── queryClient.ts         # ✅ 새로 작성 (QueryClient 설정)
│   │
│   ├── presentation/              # ✅ Phase 2에서 100% 재사용
│   │   ├── components/
│   │   │   ├── SearchBar/
│   │   │   ├── ImageGrid/
│   │   │   ├── ImageCard/
│   │   │   ├── SkeletonCard/
│   │   │   ├── Pagination/
│   │   │   └── ErrorMessage/
│   │   ├── styles/
│   │   │   ├── theme.ts
│   │   │   ├── GlobalStyles.ts
│   │   │   └── mixins.ts
│   │   └── pages/
│   │       └── SearchPage.tsx
│   │
│   ├── App.tsx                    # 🔄 QueryClientProvider 추가
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── __tests__/                     # 일부 재사용, 일부 수정
│   ├── domain/                    # ✅ Phase 2에서 재사용 (31 tests)
│   ├── infrastructure/            # ✅ Phase 2에서 재사용 (55 tests)
│   ├── application/
│   │   └── queries/               # ✅ 새로 작성 (Query 훅 테스트)
│   └── presentation/              # ✅ Phase 2에서 재사용 (67 tests)
│
├── .env                           # ✅ Phase 2에서 재사용
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── jest.config.ts
└── package.json
```

### TDD 단계별 구현 (React Query 집중)

#### 3.0 프로젝트 설정 및 Phase 2 코드 복사 (Red → Green → Refactor)
- [x] **Setup 0**: 프로젝트 초기화
  - [x] `npm create vite@latest 03-react-query -- --template react-ts`
  - [x] React Query 설치: `npm install @tanstack/react-query`
  - [x] React Query DevTools 설치: `npm install @tanstack/react-query-devtools`
  - [x] Styled Components 설치: `npm install styled-components`
  - [x] 타입 정의 설치: `npm install -D @types/styled-components`
  - [x] Phase 2의 테스트 설정 복사 (Jest, Testing Library)

- [x] **Setup 1**: Phase 2 코드 복사
  - [x] `src/domain/` 전체 복사
  - [x] `src/infrastructure/` 전체 복사
  - [x] `src/presentation/` 전체 복사
  - [x] `__tests__/domain/` 전체 복사
  - [x] `__tests__/infrastructure/` 전체 복사
  - [x] `__tests__/presentation/` 전체 복사
  - [x] `.env` 파일 복사
  - [x] `tsconfig` 설정 복사
  - [x] ESLint 설정 복사 (`.eslintrc.json`)
  - [x] Prettier 설정 복사 (`.prettierrc.json`)
  - [x] 복사한 테스트 실행 확인 (174/174 통과)

#### 3.1 React Query 설정 (Red → Green → Refactor)
- [x] **Test 1**: QueryClient 설정 및 타입 테스트 (3 tests)
  - [x] `src/application/queryClient.ts` 작성
  - [x] QueryClient 옵션 타입 정의
  - [x] 기본 옵션 설정 (staleTime: 5분, gcTime: 10분, retry: 1)
  - [x] refetchOnWindowFocus 비활성화

**구현 파일:** `src/application/queryClient.ts`

#### 3.2 Query Key 타입 시스템 (Red → Green → Refactor)
- [x] **Test 2**: 타입 안전한 Query Key 팩토리 (5 tests)
  - [x] `src/application/queries/queryKeys.ts` 작성
  - [x] Query Key 타입 정의 (const assertion 활용)
  - [x] imageKeys 팩토리 함수 구현
    - [x] `imageKeys.all` - 모든 이미지 쿼리
    - [x] `imageKeys.list(query)` - 특정 검색어의 이미지 목록
    - [x] `imageKeys.page(query, page)` - 특정 페이지
  - [x] 타입 추론을 활용한 자동완성 검증 (as const)

**구현 파일:** `src/application/queries/queryKeys.ts`

#### 3.3 useImagesQuery 훅 구현 (Red → Green → Refactor)
- [x] **Test 3**: useImagesQuery 기본 기능 테스트 (8 tests)
  - [x] `src/application/queries/useImagesQuery.ts` 작성
  - [x] useQuery 제네릭 타입 활용 (`useQuery<Image[], Error>`)
  - [x] queryFn에서 UseCase 호출 및 Result 타입 처리
  - [x] 타입 안전한 에러 처리 (Result 타입의 success 분기)
  - [x] enabled 옵션 (query가 비어있으면 실행 안 함)
  - [x] QueryClient 기본 설정 사용 (staleTime, gcTime, retry)
  - [x] 반환 타입 추론 (data, isLoading, error)
  - [x] 캐싱 동작 검증

**구현 파일:** `src/application/queries/useImagesQuery.ts`
**핵심 학습:** useQuery 제네릭, queryFn, Query Key, enabled 옵션

#### 3.4 App.tsx 기본 구현 (조기 통합) ⭐
- [x] **Test 4**: App.tsx 기본 통합 테스트 (5 tests)
  - [x] `src/App.tsx` 수정
  - [x] QueryClientProvider 설정
  - [x] useState로 query 상태 관리 (page는 3.5에서 추가)
  - [x] useImagesQuery 훅 사용
  - [x] SearchBar 연동 (검색어 입력 → query state 변경)
  - [x] ImageGrid 연동 (data 표시)
  - [x] vite.config.ts에 path alias 설정 추가
  - [x] 브라우저 테스트: 기본 검색 기능 동작 확인 ✅

**구현 파일:** `src/App.tsx` (기본 버전), `vite.config.ts`
**목표:** 여기서 실제 브라우저에서 검색이 동작하는 것 확인!

#### 3.5 Pagination 구현 (Red → Green → Refactor)
- [x] **Test 5**: Pagination 기능 테스트 (6 tests)
  - [x] useImagesByPageQuery 새 훅 생성 (page 파라미터 포함)
  - [x] Query Key에 page 포함 (`imageKeys.page(query, page)`)
  - [x] placeholderData 옵션 (keepPreviousData 사용)
  - [x] App.tsx에 page 상태 추가 및 Pagination 컴포넌트 연동
  - [x] GetImagesByPageUseCase 사용
  - [x] 브라우저 테스트: 페이지 전환 동작 확인 ✅

**구현 파일:** `src/application/queries/useImagesByPageQuery.ts`, `src/App.tsx`
**핵심 학습:** Query Key의 중요성 (page가 바뀌면 새 쿼리로 인식), keepPreviousData로 부드러운 UX

#### 3.6 useImageSearch 커스텀 훅 (Red → Green → Refactor)
- [x] **Test 6**: useImageSearch 훅 구현 (5 tests)
  - [x] `src/application/hooks/useImageSearch.ts` 생성
  - [x] useState로 query, page 관리
  - [x] useImagesByPageQuery 호출
  - [x] search 함수: query 변경 + page를 1로 리셋
  - [x] goToPage 함수: page 변경
  - [x] App.tsx에 적용하여 코드 간소화

**구현 파일:** `src/application/hooks/useImageSearch.ts`, `src/App.tsx` (리팩토링)
**핵심 학습:** 커스텀 훅으로 상태 관리 로직 캡슐화, App 컴포넌트 단순화

#### 3.7 App.tsx 완성 (Red → Green → Refactor) ✅
- [x] **Test 7**: App.tsx 최종 통합 테스트 (6 tests)
  - [x] useImageSearch 훅 사용 확인 (이미 Phase 3.6에서 적용됨)
  - [x] 모든 컴포넌트 연동 확인 (SearchBar, ImageGrid, Pagination)
  - [x] React Query DevTools 추가
  - [x] 브라우저 테스트: 전체 기능 동작 확인 ✅
    - [x] 검색 기능
    - [x] 페이지네이션
    - [x] 컴포넌트 통합
    - [x] DevTools 확인

**구현 파일:** `src/App.tsx` (최종 버전)
**테스트 파일:** `src/__tests__/application/AppFinal.test.tsx`
**테스트 결과:** 6/6 tests passing, 전체 218 tests passing

#### 3.8 고급 기능 - Prefetching (Red → Green → Refactor) ✅
- [x] **Test 8**: Prefetching 테스트 (4 tests)
  - [x] usePrefetch 훅 생성 및 테스트
  - [x] queryClient.prefetchQuery 사용
  - [x] 현재 페이지 + 1 미리 로드
  - [x] useImageSearch에 자동 prefetch 통합
  - [x] useEffect에서 자동 prefetch 구현
  - [x] 브라우저 테스트: DevTools에서 prefetch 확인 ✅

**구현 파일:**
- `src/application/hooks/usePrefetch.ts`: Prefetch 커스텀 훅
- `src/application/hooks/useImageSearch.ts`: 자동 prefetch 통합
**테스트 파일:** `src/__tests__/application/hooks/usePrefetch.test.tsx`
**테스트 결과:** 4/4 tests passing (usePrefetch), 전체 222/222 tests passing
**핵심 학습:** 사용자 경험 개선 (다음 페이지 즉시 로드), QueryClient의 prefetchQuery API

#### 3.9 고급 기능 - Optimistic Updates (읽기 전용 학습) ✅
- [x] **학습 자료 작성**: Optimistic Updates 개념 학습
  - [x] Optimistic Updates란? (개념 이해)
  - [x] React Query에서의 구현 방법 (onMutate, onError, onSettled)
  - [x] 실제 코드 예제 3가지 (좋아요, 할 일 체크, 댓글 추가)
  - [x] 장단점 및 적합/부적합 사례 분석
  - [x] Prefetch vs Optimistic Updates 비교

**참고:** 이 프로젝트에서는 읽기 전용이라 실제 사용 X, 개념만 학습
**학습 자료:** `docs/phase3.9_study.md` - useMutation, 낙관적 업데이트, 롤백 패턴 학습
**핵심 학습:**
- 사용자 경험 극대화 (즉시 UI 반영)
- onMutate → onError → onSettled 3단계 프로세스
- 적합한 사례 (SNS 좋아요, 댓글) vs 부적합한 사례 (결제, 송금)

#### 3.10 Zustand vs React Query 비교 분석 ✅
- [x] **분석 1**: 코드 비교
  - [x] 상태 관리 코드 라인 수 비교 (Zustand 121 lines vs React Query 291 lines)
  - [x] 타입 안전성 비교 (둘 다 우수, React Query가 더 강력한 추론)
  - [x] 보일러플레이트 비교 (React Query가 3-4배 적음)

- [x] **분석 2**: 성능 비교
  - [x] 번들 크기 비교 (Zustand 3KB vs React Query 13KB)
  - [x] 렌더링 최적화 (둘 다 우수)
  - [x] 네트워크 요청 최적화 (React Query 캐싱으로 50% 감소)

- [x] **분석 3**: 개발 경험 비교
  - [x] DevTools 비교 (React Query 전용 DevTools 훨씬 강력)
  - [x] 타입 추론 능력 (React Query 자동 추론 우수)
  - [x] 에러 처리 방식 (React Query 자동 재시도)
  - [x] 학습 곡선 (Zustand 1-2시간, React Query 4-8시간)

- [x] **문서 작성**: `COMPARISON.md` 작성 완료
  - [x] Phase 2 (Zustand) vs Phase 3 (React Query) 상세 비교
  - [x] 각 접근법의 장단점 (장점/단점 각 6-7개)
  - [x] 사용 사례별 권장사항 (Best Practice: 함께 사용)
  - [x] 마이그레이션 가이드 (Zustand → React Query 4단계)

**문서 파일:** `COMPARISON.md` - Zustand vs React Query 완전 비교 분석
**핵심 학습:**
- 서버 상태 (React Query) vs 클라이언트 상태 (Zustand) 명확한 분리
- React Query: 자동 캐싱, 재시도, 동기화로 개발 생산성 ↑
- Zustand: 간단하고 가벼워 학습 곡선 ↓
- **Best Practice**: React Query (서버) + Zustand (클라이언트) 조합

#### 3.11 리팩토링 (Tidy First) ✅
- [x] **Structural**: Query 관련 타입 정리
  - [x] 공통 Query 타입 추출 (`queryOptions.ts`)
  - [x] Query 옵션 타입 체계화 (IMAGE_QUERY_OPTIONS 상수)

- [x] **Structural**: 커스텀 훅 최적화
  - [x] 중복 로직 제거 (Result 처리 로직)
  - [x] 재사용 가능한 유틸리티 함수 추출 (`queryUtils.ts`)

- [x] **Verification**: 전체 테스트 실행
  - [x] 모든 테스트 통과 확인 (222/222 tests passing)
  - [x] 타입 체크 확인 (리팩토링으로 인한 새로운 에러 없음)

**리팩토링 파일:**
- `src/application/queries/queryOptions.ts`: 공통 Query 옵션 상수
- `src/application/queries/queryUtils.ts`: Result 처리 유틸리티 함수
**적용 파일:**
- `useImagesByPageQuery.ts`: handleImageQueryResult 사용
- `usePrefetch.ts`: handleImageQueryResult + IMAGE_QUERY_OPTIONS 사용
**핵심 개선:**
- Result 처리 로직 중복 제거 (8줄 → 1줄)
- 하드코딩된 상수를 중앙 관리 (staleTime: 5분)
- 코드 가독성 및 유지보수성 향상

### 예상 테스트 결과
- Domain Layer: 31 tests (Phase 2 재사용)
- Infrastructure Layer: 55 tests (Phase 2 재사용)
- **Application Layer (React Query): 약 40 tests (새로 작성)**
- Presentation Layer: 67 tests (Phase 2 재사용)
- **예상 총합: 약 193 tests**

### 핵심 학습 포인트

#### 1. React Query 개념
- **서버 상태 vs 클라이언트 상태**: React Query는 서버 상태 전용
- **자동 캐싱**: staleTime 동안 캐시 사용, 이후 자동 리페칭
- **Query Key의 중요성**: 배열의 각 요소가 바뀌면 새 쿼리
- **Declarative API**: 상태를 "선언"하면 React Query가 알아서 관리

#### 2. Zustand vs React Query
| 항목 | Zustand | React Query |
|------|---------|-------------|
| **목적** | 클라이언트 상태 | 서버 상태 |
| **캐싱** | ❌ 없음 | ✅ 자동 |
| **리페칭** | ❌ 수동 | ✅ 자동 |
| **로딩 상태** | 직접 관리 | 자동 제공 |
| **에러 재시도** | 직접 구현 | 자동 (retry) |
| **DevTools** | ❌ 없음 | ✅ 강력함 |
| **번들 크기** | 작음 (~1KB) | 중간 (~13KB) |
| **학습 곡선** | 낮음 | 중간 |

#### 3. 언제 무엇을 사용할까?
- **Zustand**: UI 상태, 폼 상태, 모달 상태 등 클라이언트 상태
- **React Query**: API 데이터, 서버 데이터, 비동기 데이터
- **함께 사용**: Zustand (UI 상태) + React Query (서버 상태)

---

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

- [ ] **Test 2**: QueryClient 설정 테스트 (3 tests)
  - [ ] `src/shared/api/queryClient.ts` 작성
  - [ ] QueryClient 기본 옵션 (staleTime: 5분, gcTime: 10분, retry: 1)
  - [ ] refetchOnWindowFocus: false
  - [ ] QueryClient export

**4.1.2 공통 타입 정의**

- [ ] **Test 3**: 공통 타입 정의 테스트 (5 tests)
  - [ ] `src/shared/lib/types.ts` 작성
  - [ ] Result<T> 타입 (success/failure Discriminated Union)
  - [ ] AsyncState<T> 타입 (data, isLoading, error)
  - [ ] PaginationState 타입 (currentPage, totalPages)
  - [ ] Nullable<T>, Optional<T> 타입 유틸리티

**4.1.3 유틸리티 함수**

- [ ] **Test 4**: 유틸리티 함수 테스트 (4 tests)
  - [ ] `src/shared/lib/utils.ts` 이미 shadcn이 생성 (cn 함수 포함)
  - [ ] constants.ts 작성 (API_BASE_URL, ITEMS_PER_PAGE)
  - [ ] env.ts 작성 (환경 변수 타입 안전하게 접근)

**4.1.4 shadcn/ui 컴포넌트 검증**

- [ ] **Test 5**: shadcn/ui 컴포넌트 렌더링 테스트 (5 tests)
  - [ ] `src/shared/ui/button.tsx` (Setup에서 설치됨)
  - [ ] Button variant 테스트 (default, destructive, outline, ghost)
  - [ ] Button size 테스트 (default, sm, lg)
  - [ ] Input 렌더링 테스트
  - [ ] Card 렌더링 테스트
  - [ ] Skeleton 렌더링 테스트

**예상 테스트 수: 약 23 tests**

#### 4.2 Entities Layer - Image 엔티티 (Red → Green → Refactor)

**4.2.1 Image 타입 정의 및 DTO 변환**

- [ ] **Test 6**: Image 타입 및 DTO 정의 (9 tests)
  - [ ] `src/entities/image/model/types.ts` 작성
  - [ ] ImageDTO 인터페이스 (Pixabay API 응답 구조)
  - [ ] Image 인터페이스 (도메인 모델, 필요한 필드만)
  - [ ] toImage(dto: ImageDTO): Image 변환 함수
  - [ ] toImages(dtos: ImageDTO[]): Image[] 배치 변환
  - [ ] PixabayResponse 타입 (total, totalHits, hits)
  - [ ] 타입 가드 함수 (isImage)

**4.2.2 Image API**

- [ ] **Test 7**: imageApi 기본 기능 테스트 (8 tests)
  - [ ] `src/entities/image/api/imageApi.ts` 작성
  - [ ] getImages(query: string): Promise<Image[]> 구현
  - [ ] getImagesByPage(query: string, page: number): Promise<Image[]> 구현
  - [ ] httpClient 사용하여 Pixabay API 호출
  - [ ] DTO → Entity 변환 적용 (toImages 사용)
  - [ ] 에러 핸들링 (try-catch)
  - [ ] API 파라미터 검증 (빈 query 방어)

**4.2.3 ImageCard UI 컴포넌트**

- [ ] **Test 8**: ImageCard 컴포넌트 테스트 (10 tests)
  - [ ] `src/entities/image/ui/ImageCard.tsx` 작성
  - [ ] Image 타입 props 받기
  - [ ] shadcn Card 컴포넌트 사용
  - [ ] 이미지 썸네일 렌더링
  - [ ] 태그, 좋아요, 다운로드 정보 표시
  - [ ] Tailwind로 스타일링 (hover 효과)
  - [ ] 반응형 디자인

**4.2.4 ImageGrid UI 컴포넌트**

- [ ] **Test 9**: ImageGrid 컴포넌트 테스트 (8 tests)
  - [ ] `src/entities/image/ui/ImageGrid.tsx` 작성
  - [ ] Image[] props 받기
  - [ ] Grid 레이아웃 (Tailwind grid)
  - [ ] ImageCard 반복 렌더링
  - [ ] 빈 배열 처리 (Empty state)
  - [ ] shadcn Skeleton 사용한 로딩 상태

**4.2.5 Public API**

- [ ] **Test 10**: entities/image Public API 테스트 (4 tests)
  - [ ] `src/entities/image/index.ts` 작성
  - [ ] type Image export (ImageDTO는 숨김)
  - [ ] ImageCard, ImageGrid export
  - [ ] getImages, getImagesByPage export
  - [ ] 외부에서 internal imports 불가능 확인

**예상 테스트 수: 약 39 tests (누적: 62)**

#### 4.3 Features Layer - 사용자 시나리오 (Red → Green → Refactor)

**4.3.1 search-images Feature**

- [ ] **Test 11**: useImageSearch 훅 테스트 (8 tests)
  - [ ] `src/features/search-images/hooks/useImageSearch.ts` 작성
  - [ ] useQuery 사용 (React Query)
  - [ ] Query Key: `['images', 'search', query]`
  - [ ] queryFn에서 getImages 호출
  - [ ] enabled: query.length > 0
  - [ ] QueryClient 기본 설정 사용 (staleTime, gcTime)
  - [ ] 반환: { data, isLoading, error, refetch }

- [ ] **Test 12**: SearchForm UI 컴포넌트 테스트 (9 tests)
  - [ ] `src/features/search-images/ui/SearchForm.tsx` 작성
  - [ ] shadcn Input + Button 사용
  - [ ] onSearch(query: string) callback props
  - [ ] 폼 제출 핸들러
  - [ ] 검색어 상태 관리 (useState)
  - [ ] 빈 검색어 방어
  - [ ] Enter 키 지원

**4.3.2 paginate-images Feature**

- [ ] **Test 13**: useImagesByPage 훅 테스트 (8 tests)
  - [ ] `src/features/paginate-images/hooks/useImagesByPage.ts` 작성
  - [ ] useQuery<Image[], Error>
  - [ ] Query Key: `['images', 'page', query, page]`
  - [ ] queryFn에서 getImagesByPage 호출
  - [ ] enabled: query.length > 0
  - [ ] placeholderData: keepPreviousData (부드러운 페이지 전환)

- [ ] **Test 14**: Pagination UI 컴포넌트 테스트 (8 tests)
  - [ ] `src/features/paginate-images/ui/Pagination.tsx` 작성
  - [ ] shadcn Button 사용
  - [ ] currentPage, totalPages, onPageChange props
  - [ ] 이전/다음 버튼
  - [ ] 현재 페이지 표시
  - [ ] 첫/마지막 페이지 버튼 비활성화

**예상 테스트 수: 약 33 tests (누적: 95)**

#### 4.4 Widgets Layer - 복합 UI 블록 (Red → Green → Refactor)

- [ ] **Test 15**: ImageGallery 위젯 테스트 (8 tests)
  - [ ] `src/widgets/image-gallery/ui/ImageGallery.tsx` 작성
  - [ ] Features (useImagesByPage) + Entities (ImageGrid) 조합
  - [ ] query, page props 받기
  - [ ] 로딩 상태: ImageGrid에 Skeleton 전달
  - [ ] 에러 상태: shadcn Alert 사용
  - [ ] 성공 상태: ImageGrid에 data 전달
  - [ ] Public API: `src/widgets/image-gallery/index.ts`

**예상 테스트 수: 약 8 tests (누적: 103)**

#### 4.5 Pages Layer - 전체 페이지 (Red → Green → Refactor)

- [ ] **Test 16**: SearchPage 테스트 (7 tests)
  - [ ] `src/pages/search/ui/SearchPage.tsx` 작성
  - [ ] SearchForm (features) + ImageGallery (widgets) + Pagination (features) 조합
  - [ ] query, page 상태 관리 (useState)
  - [ ] 검색 핸들러: query 변경 + page를 1로 리셋
  - [ ] 페이지 변경 핸들러: page 변경
  - [ ] Tailwind로 레이아웃 (Flexbox)
  - [ ] Public API: `src/pages/search/index.ts`

**예상 테스트 수: 약 7 tests (누적: 110)**

#### 4.6 App Layer - 앱 초기화 (Red → Green → Refactor)

- [ ] **Test 17**: QueryProvider 테스트 (3 tests)
  - [ ] `src/app/providers/QueryProvider.tsx` 작성
  - [ ] QueryClientProvider 설정
  - [ ] React Query DevTools 추가 (개발 환경만)
  - [ ] children props 렌더링

- [ ] **Test 18**: App.tsx 테스트 (6 tests)
  - [ ] `src/app/App.tsx` 작성
  - [ ] QueryProvider로 래핑
  - [ ] SearchPage import (from @/pages/search)
  - [ ] Tailwind 스타일 적용 (globals.css import)
  - [ ] 전역 레이아웃 (header, main, footer 구조)

**예상 테스트 수: 약 9 tests (누적: 119)**

#### 4.7 FSD 검증 및 Public API 테스트 (Red → Green → Refactor)

- [ ] **Test 19**: FSD 레이어 의존성 규칙 검증 (5 tests)
  - [ ] 상위 레이어만 하위 레이어 import 확인
  - [ ] 같은 레이어 간 import 금지 확인
  - [ ] Public API만 사용하는지 확인 (직접 internal import 금지)
  - [ ] ESLint 규칙 추가 고려 (import/no-restricted-paths)

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
