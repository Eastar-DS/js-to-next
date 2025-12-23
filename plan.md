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
- [ ] **Test 5**: Pagination 기능 테스트 (6 tests)
  - [ ] useImagesQuery에 page 파라미터 추가
  - [ ] Query Key에 page 포함 (`imageKeys.page(query, page)`)
  - [ ] placeholderData 옵션 (이전 데이터 유지하며 로딩)
  - [ ] Pagination 컴포넌트 연동
  - [ ] 브라우저 테스트: 페이지 전환 동작 확인 ✅

**핵심 학습:** Query Key의 중요성 (page가 바뀌면 새 쿼리로 인식)

#### 3.6 useImageSearch 커스텀 훅 (Red → Green → Refactor)
- [ ] **Test 6**: useImageSearch 훅 리팩토링 (5 tests)
  - [ ] `src/application/hooks/useImageSearch.ts` 수정
  - [ ] useState로 query, page 관리
  - [ ] useImagesQuery 호출
  - [ ] search 함수: query 변경 + page를 1로 리셋
  - [ ] goToPage 함수: page 변경
  - [ ] 디바운스 기능 유지 (useDebounce 또는 직접 구현)

**구현 파일:** `src/application/hooks/useImageSearch.ts` (수정)

#### 3.7 App.tsx 완성 (Red → Green → Refactor)
- [ ] **Test 7**: App.tsx 최종 통합 테스트 (6 tests)
  - [ ] useImageSearch 훅 사용하도록 리팩토링
  - [ ] 모든 컴포넌트 연동 확인
  - [ ] React Query DevTools 추가
  - [ ] 브라우저 테스트: 전체 기능 동작 확인 ✅
    - [ ] 검색 기능
    - [ ] 페이지네이션
    - [ ] 로딩 스켈레톤
    - [ ] 에러 핸들링

**구현 파일:** `src/App.tsx` (최종 버전)

#### 3.8 고급 기능 - Prefetching (Red → Green → Refactor)
- [ ] **Test 8**: Prefetching 테스트 (4 tests)
  - [ ] queryClient.prefetchQuery 사용
  - [ ] 현재 페이지 + 1 미리 로드
  - [ ] useEffect에서 자동 prefetch
  - [ ] 브라우저 테스트: DevTools에서 prefetch 확인 ✅

**핵심 학습:** 사용자 경험 개선 (다음 페이지 즉시 로드)

#### 3.9 고급 기능 - Optimistic Updates (선택적)
- [ ] **Test 9**: Optimistic Updates 테스트 (선택적, 3 tests)
  - [ ] useMutation 사용
  - [ ] onMutate에서 낙관적 업데이트
  - [ ] onError에서 롤백
  - [ ] onSettled에서 쿼리 무효화

**참고:** 이 프로젝트에서는 읽기 전용이라 실제 사용 X, 개념만 학습

#### 3.10 Zustand vs React Query 비교 분석
- [ ] **분석 1**: 코드 비교
  - [ ] 상태 관리 코드 라인 수 비교
  - [ ] 타입 안전성 비교
  - [ ] 보일러플레이트 비교

- [ ] **분석 2**: 성능 비교
  - [ ] 번들 크기 비교 (`npm run build`)
  - [ ] 렌더링 횟수 비교 (React DevTools Profiler)
  - [ ] 네트워크 요청 횟수 비교

- [ ] **분석 3**: 개발 경험 비교
  - [ ] DevTools 비교
  - [ ] 타입 추론 능력
  - [ ] 에러 처리 방식
  - [ ] 학습 곡선

- [ ] **문서 작성**: `COMPARISON.md` 작성
  - [ ] Phase 2 (Zustand) vs Phase 3 (React Query) 상세 비교
  - [ ] 각 접근법의 장단점
  - [ ] 사용 사례별 권장사항

#### 3.11 리팩토링 (Tidy First)
- [ ] **Structural**: Query 관련 타입 정리
  - [ ] 공통 Query 타입 추출
  - [ ] Query 옵션 타입 체계화

- [ ] **Structural**: 커스텀 훅 최적화
  - [ ] 중복 로직 제거
  - [ ] 재사용 가능한 유틸리티 함수 추출

- [ ] **Verification**: 전체 테스트 실행
  - [ ] 모든 테스트 통과 확인
  - [ ] 타입 체크 확인 (`npm run build`)

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
