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

## 🔜 다음 단계

### Phase 3: React Query (진행 예정)
- React Query를 활용한 서버 상태 관리
- Query Key 타입 시스템
- 캐싱 전략 및 Optimistic Updates

### Phase 4: Next.js + Tailwind (진행 예정)
- Feature-Sliced Design 아키텍처
- Server/Client Component 분리
- SSR 및 성능 최적화

### Phase 5: Next.js + Styled Components (진행 예정)
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
- [Styled Components](https://styled-components.com/)

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
