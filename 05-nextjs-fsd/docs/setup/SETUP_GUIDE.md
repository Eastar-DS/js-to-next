# Next.js 16 + FSD 프로젝트 초기 설정 가이드

이 문서는 Next.js 16 + Tailwind CSS + TypeScript + Feature-Sliced Design 프로젝트의 초기 설정 과정을 상세히 설명합니다.

**적용 가능 프로젝트:**
- Next.js 16 + App Router
- TypeScript
- Tailwind CSS 4
- Feature-Sliced Design (FSD) 아키텍처
- React Query (TanStack Query)
- Jest + React Testing Library
- ESLint 9 Flat Config + Airbnb Style Guide
- Prettier

## 📋 목차

1. [프로젝트 생성 (Setup 0)](#setup-0-프로젝트-생성)
2. [Tailwind CSS 설정 (Setup 1)](#setup-1-tailwind-css-설정)
3. [React Query 설치 (Setup 2)](#setup-2-react-query-설치)
4. [테스트 환경 설정 (Setup 3)](#setup-3-테스트-환경-설정)
5. [ESLint + Prettier 설정 (Setup 4)](#setup-4-eslint--prettier-설정)
6. [TypeScript Path Aliases (Setup 5)](#setup-5-typescript-path-aliases)
7. [검증](#검증)

---

## Setup 0: 프로젝트 생성

### 명령어

```bash
npx create-next-app@latest your-project-name \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --eslint \
  --import-alias "@/*" \
  --react-compiler
```

> **참고**: `your-project-name`을 실제 프로젝트 이름으로 변경하세요.

### 설치된 버전 확인

```bash
cd your-project-name
cat package.json | grep -A 3 '"dependencies"'
```

**예상 출력:**
```json
"dependencies": {
  "@tanstack/react-query": "^5.90.13",
  "next": "16.1.1",
  "react": "19.2.3",
  "react-dom": "19.2.3"
}
```

### 주요 확인 사항

- ✅ **Next.js 16.1.1**: App Router, Turbopack, React 19 지원
- ✅ **React 19.2.3**: 최신 React 버전
- ✅ **Tailwind CSS 4**: `@import "tailwindcss"` 방식
- ✅ **ESLint 9**: Flat Config (`eslint.config.mjs`)
- ✅ **TypeScript**: `src/` 디렉토리 구조
- ✅ **React Compiler**: `next.config.ts`에서 활성화

### React Compiler 확인

`next.config.ts`:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,  // ✅ React Compiler 활성화
};

export default nextConfig;
```

---

## Setup 1: Tailwind CSS 설정

### Tailwind CSS 4 확인

`src/app/globals.css` 파일을 열어 다음 내용이 포함되어 있는지 확인:
```css
@import "tailwindcss";  /* ✅ Tailwind CSS 4 방식 */
```

### FSD 레이어 경로 설정

프로젝트 루트의 `tailwind.config.ts` 파일을 다음과 같이 수정:
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

**핵심 포인트:**
- FSD 6개 레이어 모두 포함
- `app/` 디렉토리도 포함 (Next.js 라우팅)

---

## Setup 2: React Query 설치

### 패키지 설치

```bash
npm install @tanstack/react-query
npm install -D @tanstack/react-query-devtools
```

### 설치 확인

```bash
npm list @tanstack/react-query @tanstack/react-query-devtools
```

**예상 출력:**
```
├── @tanstack/react-query@5.90.13
└── @tanstack/react-query-devtools@5.91.1
```

---

## Setup 3: 테스트 환경 설정

### 패키지 설치

```bash
npm install -D jest @types/jest \
  @testing-library/react \
  @testing-library/jest-dom \
  jest-environment-jsdom
```

### `jest.config.ts` 생성

```typescript
import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Next.js 앱의 경로를 제공하여 next.config.ts와 .env 파일을 로드
  dir: './',
});

const config: Config = {
  rootDir: '.',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@/entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@/features/(.*)$': '<rootDir>/src/features/$1',
    '^@/widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
  },
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/layout.tsx',
  ],
};

// createJestConfig는 async 함수이므로 export
export default createJestConfig(config);
```

### `jest.setup.ts` 생성

```typescript
import '@testing-library/jest-dom';
```

### `__tests__/` 디렉토리 구조 생성

```bash
mkdir -p __tests__/{shared,entities,features,widgets,pages}
```

### `package.json` 스크립트 추가

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

---

## Setup 4: ESLint + Prettier 설정

> **📝 참고**: 이 설정은 Airbnb JavaScript/React 스타일 가이드를 기반으로 합니다.

### 패키지 설치

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

### `eslint.config.mjs` 생성

프로젝트 루트에 `eslint.config.mjs` 파일을 생성:

```javascript
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
      // ===========================
      // React 컴포넌트 규칙
      // ===========================
      'react/function-component-definition': ['error', {
        namedComponents: 'function-declaration', // Airbnb: React 컴포넌트는 일반 함수 선언
        unnamedComponents: 'arrow-function', // 익명 컴포넌트는 arrow function 허용
      }],
      'react/react-in-jsx-scope': 'off', // Next.js/React 17+에서 불필요
      'react/prop-types': 'off', // TypeScript 사용으로 불필요
      'react/jsx-filename-extension': ['error', {
        extensions: ['.tsx', '.jsx'] // .tsx 파일 허용
      }],
      'react/no-array-index-key': 'warn', // 배열 인덱스를 key로 사용 경고

      // ===========================
      // Arrow Function 규칙 (Airbnb 8.1, 8.2, 8.4)
      // ===========================
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

      // ===========================
      // TypeScript 규칙
      // ===========================
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      // airbnb-typescript의 deprecated 규칙 비활성화
      '@typescript-eslint/lines-between-class-members': 'off',
      '@typescript-eslint/no-throw-literal': 'off',
      '@typescript-eslint/return-await': 'off',

      // ===========================
      // Import 규칙
      // ===========================
      'import/prefer-default-export': 'off', // Named export 허용 (Next.js 패턴)
      'import/extensions': ['error', 'ignorePackages', {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      }],

      // ===========================
      // 일반 JavaScript 규칙
      // ===========================
      'no-console': ['warn', {
        allow: ['warn', 'error'] // console.log는 경고, warn/error는 허용
      }],
      'no-debugger': 'error',

      // ===========================
      // Accessibility 규칙
      // ===========================
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/no-access-key': 'error',
    },
  }
);
```

### `.prettierrc.json` 생성

프로젝트 루트에 `.prettierrc.json` 파일을 생성:

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

### 핵심 포인트

#### 1. **React 컴포넌트는 function 선언**
```typescript
// ✅ Good (Airbnb 권장)
export default function Home() {
  return <div>Hello</div>;
}

// ❌ Bad
const Home = () => <div>Hello</div>;
```

#### 2. **콜백/익명 함수는 arrow function**
```typescript
// ✅ Good
const numbers = [1, 2, 3].map((num) => num * 2);

// ❌ Bad
const numbers = [1, 2, 3].map(function(num) {
  return num * 2;
});
```

#### 3. **단일 표현식은 implicit return**
```typescript
// ✅ Good
const double = (x) => x * 2;

// ❌ Bad (불필요한 중괄호와 return)
const double = (x) => {
  return x * 2;
};
```

---

## Setup 5: TypeScript Path Aliases

### `tsconfig.json` 수정

기존 `tsconfig.json` 파일을 열어 `compilerOptions`의 `paths` 섹션을 다음과 같이 수정:

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
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
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

### FSD 레이어별 Import 예시

```typescript
// shared layer
import { Button } from '@/shared/ui/Button';

// entities layer
import { ImageCard } from '@/entities/image/ui/ImageCard';

// features layer
import { useImageSearch } from '@/features/search-images/hooks/useImageSearch';

// widgets layer
import { ImageGallery } from '@/widgets/image-gallery';

// pages layer
import { SearchPage } from '@/pages/search-page';
```

---

## 검증

### 1. 테스트 실행

```bash
npm run test
```

**예상 출력:**
```
No tests found, exiting with code 0
```

### 2. Lint 실행

```bash
npm run lint
```

**예상 출력:** 에러 없이 통과

### 3. 빌드 실행

```bash
npm run build
```

**예상 출력:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (5/5)
✓ Collecting build traces
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    ...      ...
└ ○ /_not-found                          ...      ...
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속 → Next.js 기본 페이지 확인

---

## 설치된 패키지 전체 목록

### Dependencies

```json
{
  "@tanstack/react-query": "^5.90.13",
  "next": "16.1.1",
  "react": "19.2.3",
  "react-dom": "19.2.3"
}
```

### DevDependencies

```json
{
  "@eslint/eslintrc": "^3.3.3",
  "@tailwindcss/postcss": "^4",
  "@tanstack/react-query-devtools": "^5.91.1",
  "@testing-library/jest-dom": "^6.9.1",
  "@testing-library/react": "^16.3.1",
  "@types/jest": "^30.0.0",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "babel-plugin-react-compiler": "1.0.0",
  "eslint": "^9",
  "eslint-config-airbnb": "^19.0.4",
  "eslint-config-airbnb-typescript": "^18.0.0",
  "eslint-config-next": "16.1.1",
  "eslint-config-prettier": "^10.1.8",
  "eslint-plugin-import": "^2.32.0",
  "eslint-plugin-jsx-a11y": "^6.10.2",
  "eslint-plugin-prettier": "^5.5.4",
  "eslint-plugin-react": "^7.37.5",
  "eslint-plugin-react-hooks": "^7.0.1",
  "globals": "^16.5.0",
  "jest": "^30.2.0",
  "jest-environment-jsdom": "^30.2.0",
  "prettier": "^3.7.4",
  "tailwindcss": "^4",
  "typescript": "^5",
  "typescript-eslint": "^8.50.1"
}
```

---

## 참고 자료

### 공식 문서
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Jest Documentation](https://jestjs.io/)
- [Feature-Sliced Design](https://feature-sliced.design/)

### 코드 스타일 가이드
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/)

### 추가 자료
- [ESLint 9 Flat Config Migration Guide](https://eslint.org/docs/latest/use/configure/migration-guide)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Next.js ESLint Configuration](https://nextjs.org/docs/app/api-reference/config/eslint)

---

## 다음 단계

초기 설정이 완료되었습니다. 이제 TDD 방식으로 FSD 레이어별 구현을 시작할 수 있습니다:

### FSD 레이어 구현 순서

1. **Shared Layer**: 공통 유틸리티, UI 컴포넌트, API 클라이언트
2. **Entities Layer**: 도메인 엔티티 (타입, API, UI 컴포넌트)
3. **Features Layer**: 비즈니스 기능 (검색, 페이지네이션 등)
4. **Widgets Layer**: 복합 UI 컴포넌트 (갤러리, 헤더 등)
5. **Pages Layer**: 페이지 조합 (FSD Pages, Next.js App Router 아님)
6. **App Layer**: Next.js 통합 (라우팅, 레이아웃, 프로바이더)

### 권장 개발 방식

- **TDD (Test-Driven Development)**: Red → Green → Refactor
- **Tidy First**: 구조 변경과 기능 변경을 분리
- **작은 커밋**: 각 테스트 통과 시점에 커밋
- **린트 통과**: 모든 커밋 전 린트 및 타입 체크 확인
