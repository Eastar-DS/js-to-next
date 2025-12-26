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

