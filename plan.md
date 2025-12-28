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

> **Phase 4 관련**: Phase 4 (React 19 + React Query + Tailwind CSS + shadcn/ui + TypeScript) 상세 내용은 [plan_complete.md](./plan_complete.md#phase-4-react-19--react-query--tailwind-css--shadcnui--typescript-feature-sliced-design)를 참조하세요.

---

## Phase 5: Next.js 16 + Tailwind CSS + TypeScript (FSD + Server/Client 분리)

> **초기 설정**: [SETUP.md - Phase 5](./SETUP.md#phase-5-nextjs-16--tailwind-css--typescript-fsd) 참조
>
> **⚠️ 중요**: 이 Phase는 **처음부터 다시 구현**합니다. Phase 4 코드를 복사하지 않고 TDD로 새롭게 작성합니다.
>
> **📝 ESLint 설정**: [`airbnb-style-guide/ESLINT_SETUP_GUIDE.md`](./airbnb-style-guide/ESLINT_SETUP_GUIDE.md) 참고
>
> **스타일링**: Tailwind CSS를 사용합니다.

### 아키텍처 개념

Phase 4의 FSD 구조를 Next.js 16으로 확장하고, **toFSD.md의 대규모 웹사이트 구조**를 적용합니다.

**Phase 4 vs Phase 5 비교:**

| 항목 | Phase 4 | Phase 5 |
|------|---------|---------|
| **프레임워크** | React 19 (Vite, CSR) | Next.js 16 (App Router, SSR/SSG) |
| **렌더링** | Client-Side Rendering | Server-Side Rendering + Client Components |
| **라우팅** | Single Page App | File-based Routing (app/) |
| **데이터 페칭** | React Query (Client) | React Query + Server Components |
| **스타일링** | Tailwind CSS | Tailwind CSS (동일, Next.js 최적화) |
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
│       ├── ui/                        # 공통 UI 컴포넌트 (Tailwind)
│       │   ├── Button.tsx
│       │   ├── Input.tsx
│       │   ├── Card.tsx
│       │   └── Skeleton.tsx
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
├── tailwind.config.ts                 # Tailwind 설정
├── next.config.mjs                    # Next.js 설정 (Turbopack)
├── tsconfig.json                      # TypeScript 설정
├── eslint.config.js                   # ✅ ESLint 9 Flat Config (Airbnb + Next.js)
├── .prettierrc.json                   # ✅ Prettier (Phase 4와 동일)
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
| **shared** | serverQueryClient.ts | queryClient.ts, Tailwind UI 컴포넌트 |

### TDD 단계별 구현 (처음부터 새로 작성)

**⚠️ 중요 원칙:**
- Phase 4 코드를 **절대 복사하지 않음**
- 모든 코드를 **TDD로 처음부터 작성**
- Next.js 특화 기능(SSR, Server Components)을 **단계적으로 추가**

#### 5.0 프로젝트 설정 (Setup)

- [x] **Setup 0**: Next.js 16 + TypeScript + Tailwind CSS + React Compiler 초기화
  - [x] `npx create-next-app@latest 05-nextjs-fsd --typescript --tailwind --app --src-dir --eslint --import-alias "@/*" --react-compiler`
  - [x] Next.js 16.1.1 및 React 19.2.3 확인
  - [x] React Compiler 활성화 확인 (`next.config.ts`에 `reactCompiler: true`)
  - [x] App Router 확인 (src/app/)
  - [x] Tailwind CSS 4 포함 확인 (globals.css에 `@import "tailwindcss"`)
  - [x] ESLint 9 Flat Config 확인 (eslint.config.mjs)
  - [x] Import alias 확인 (tsconfig.json에 `"@/*": ["./src/*"]`)
  - [x] Git 저장소는 상위 폴더 사용 (js-to-next)

- [x] **Setup 1**: Tailwind CSS 설정 (Tailwind CSS 4 + FSD 레이어)
  - [x] `tailwind.config.ts` 생성 (FSD 레이어 경로 명시):
    ```typescript
    import type { Config } from "tailwindcss";

    export default {
      content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/entities/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    } satisfies Config;
    ```
  - [x] `src/app/globals.css` 확인 (Tailwind CSS 4: `@import "tailwindcss"`)
  - [x] Tailwind CSS 4 사용 (`@tailwindcss/postcss` 플러그인)

- [x] **Setup 2**: React Query 설치 (SSR 지원)
  - [x] `npm install @tanstack/react-query`
  - [x] `npm install -D @tanstack/react-query-devtools`
  - [x] React Query v5.90.13 + Next.js 16 통합 확인

- [x] **Setup 3**: 테스트 환경 설정 (Jest + Testing Library + Next.js)
  - [x] `npm install -D jest @types/jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom`
  - [x] jest.config.ts 생성 (Next.js의 `next/jest` 사용)
  - [x] jest.setup.ts 생성
  - [x] __tests__/ 폴더 구조 생성 (shared, entities, features, widgets, pages)
  - [x] package.json에 테스트 스크립트 추가 (`test`, `test:watch`)

- [x] **Setup 4**: ESLint + Prettier 설정 (Flat Config + Airbnb TypeScript)
  - [x] **참고**: [`airbnb-style-guide/ESLINT_SETUP_GUIDE.md`](./airbnb-style-guide/ESLINT_SETUP_GUIDE.md) 가이드 따라 설정
  - [x] **⚠️ 중요**: ESLint 9 Flat Config 방식 사용 (`eslint.config.mjs`)
  - [x] ESLint 관련 패키지 설치:
    ```bash
    # ESLint 9 + TypeScript
    npm install -D eslint@9 globals typescript-eslint

    # React 플러그인
    npm install -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y

    # FlatCompat (Airbnb 호환 레이어)
    npm install -D @eslint/eslintrc

    # Airbnb Config (레거시 형식)
    npm install -D eslint-config-airbnb eslint-config-airbnb-typescript
    npm install -D eslint-plugin-import

    # Prettier 통합
    npm install -D eslint-config-prettier eslint-plugin-prettier prettier
    ```
  - [x] `eslint.config.mjs` 생성 (Flat Config + Airbnb + Comprehensive Rules):
    ```javascript
    // 실제 설정: eslint.config.mjs
    import js from '@eslint/js';
    import globals from 'globals';
    import tseslint from 'typescript-eslint';
    import react from 'eslint-plugin-react';
    import reactHooks from 'eslint-plugin-react-hooks';
    import jsxA11y from 'eslint-plugin-jsx-a11y';
    import { FlatCompat } from '@eslint/eslintrc';
    import { fileURLToPath } from 'url';
    import path from 'path';
    import prettierConfig from 'eslint-config-prettier';

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const compat = new FlatCompat({
      baseDirectory: __dirname,
    });

    export default tseslint.config(
      // 1. Ignore 패턴
      {
        ignores: [
          '.next/**',
          'out/**',
          'build/**',
          'dist/**',
          'node_modules/**',
          '*.config.js',
          '*.config.mjs',
          '*.config.ts',
          'next-env.d.ts',
        ],
      },

      // 2. TypeScript + React 파일 설정
      {
        files: ['**/*.{ts,tsx}'],
        extends: [
          js.configs.recommended,
          ...tseslint.configs.recommended,
          ...compat.extends(
            'airbnb',
            'airbnb-typescript',
            'airbnb/hooks'
          ),
          prettierConfig,
        ],
        languageOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
          globals: {
            ...globals.browser,
            ...globals.node,
          },
          parser: tseslint.parser,
          parserOptions: {
            ecmaFeatures: { jsx: true },
            project: './tsconfig.json',
          },
        },
        plugins: {
          '@typescript-eslint': tseslint.plugin,
          react,
          'react-hooks': reactHooks,
          'jsx-a11y': jsxA11y,
        },
        settings: {
          react: {
            version: 'detect',
          },
        },
        rules: {
          // React 컴포넌트 규칙
          'react/function-component-definition': ['error', {
            namedComponents: 'function-declaration', // Airbnb: 일반 함수 선언 권장
            unnamedComponents: 'arrow-function',
          }],
          'react/react-in-jsx-scope': 'off', // Next.js/React 17+
          'react/prop-types': 'off', // TypeScript 사용
          'react/jsx-filename-extension': ['error', {
            extensions: ['.tsx', '.jsx']
          }],
          'react/no-array-index-key': 'warn',

          // Arrow Function 규칙 (Airbnb 8.1, 8.2, 8.4)
          'prefer-arrow-callback': ['error', {
            allowNamedFunctions: false,
            allowUnboundThis: true,
          }],
          'arrow-body-style': ['error', 'as-needed', {
            requireReturnForObjectLiteral: false,
          }],
          'arrow-parens': ['error', 'always'],
          'no-confusing-arrow': ['error', {
            allowParens: true,
          }],
          'implicit-arrow-linebreak': ['error', 'beside'],

          // TypeScript 규칙
          '@typescript-eslint/no-unused-vars': ['error', {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          }],
          '@typescript-eslint/lines-between-class-members': 'off',
          '@typescript-eslint/no-throw-literal': 'off',
          '@typescript-eslint/return-await': 'off',

          // Import 규칙
          'import/prefer-default-export': 'off',
          'import/extensions': ['error', 'ignorePackages', {
            ts: 'never',
            tsx: 'never',
            js: 'never',
            jsx: 'never',
          }],

          // 일반 JavaScript 규칙
          'no-console': ['warn', {
            allow: ['warn', 'error']
          }],
          'no-debugger': 'error',

          // Accessibility 규칙
          'jsx-a11y/alt-text': 'error',
          'jsx-a11y/aria-role': 'error',
          'jsx-a11y/no-access-key': 'error',
        },
      }
    );
    ```
  - [x] `.prettierrc.json` 생성:
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
  - [x] package.json에 스크립트 이미 존재:
    ```json
    {
      "scripts": {
        "lint": "eslint",
        "test": "jest",
        "test:watch": "jest --watch"
      }
    }
    ```

- [x] **Setup 5**: TypeScript Path Aliases (FSD + Next.js)
  - [x] tsconfig.json 수정 (FSD 레이어별 path alias)
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
  - [x] next.config.ts 확인 (React Compiler 활성화)
  - [x] jest.config.ts에 moduleNameMapper 이미 설정됨

**Setup 검증:**
- [ ] `npm run dev` 실행 확인 (Turbopack)
- [x] `npm run test` 실행 확인 (빈 테스트) ✅ 통과
- [x] `npm run lint` 통과 확인 ✅ Airbnb + TypeScript + Prettier 규칙 적용
- [x] `npm run build` 실행 확인 ✅ Next.js 16.1.1 빌드 성공

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

**5.1.3 공통 타입 및 Tailwind UI 컴포넌트**

- [ ] **Test 4**: 공통 타입 정의 (5 tests)
  - [ ] `src/shared/lib/types.ts`
  - [ ] Result, AsyncState, PaginationState 타입

- [ ] **Test 5**: Tailwind UI 컴포넌트 검증 (5 tests)
  - [ ] Button, Input, Card, Skeleton 렌더링 (Tailwind 스타일)
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
  - [ ] Tailwind Card 스타일

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
  - [ ] Tailwind Input + Button

**5.3.2 paginate-images Feature**

- [ ] **Test 14**: useImagesByPage 훅 (Client) (8 tests)
  - [ ] `src/features/paginate-images/hooks/useImagesByPage.ts`
  - [ ] keepPreviousData 사용

- [ ] **Test 15**: Pagination UI (Client) (8 tests)
  - [ ] `src/features/paginate-images/ui/Pagination.tsx`
  - [ ] Tailwind Button 사용

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
  - [ ] globals.css (Tailwind 전역 스타일) 적용

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
  - [ ] Tailwind 스타일 적용

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
  - [ ] Tailwind 스타일 확인
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

### Phase 3-4 Lint 설정에서 Phase 5로 발전

**Phase 5의 주요 변경사항:**

1. **eslint.config.js** (Flat Config 방식):
   - Phase 4는 `eslint.config.js` (Flat Config) 사용
   - Phase 5는 **동일한 Flat Config 방식** + Next.js 플러그인 추가
   - `.eslintrc.json` (구버전) 사용 안 함

2. **Phase 4 → Phase 5 차이점**:
   ```javascript
   // Phase 4: Vite + React
   export default tseslint.config(
     {
       files: ['**/*.{ts,tsx}'],
       extends: [
         js.configs.recommended,
         ...tseslint.configs.recommended,
         ...compat.extends('airbnb', 'airbnb-typescript', 'airbnb/hooks'),
       ],
     }
   );

   // Phase 5: Next.js + React (추가 부분)
   export default tseslint.config(
     {
       ignores: ['.next/**', 'out/**'],  // ← Next.js 빌드 폴더
       files: ['**/*.{ts,tsx}'],
       extends: [
         // Phase 4와 동일
       ],
       plugins: {
         '@next/next': nextPlugin,  // ← Next.js 플러그인
       },
       rules: {
         '@next/next/no-html-link-for-pages': 'error',  // ← Next.js 규칙
       },
     }
   );
   ```

3. **.prettierrc.json** (Phase 4와 동일):
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
