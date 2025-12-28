# TypeScript + React 프로젝트를 위한 ESLint 9 Flat Config 설정 가이드

Airbnb JavaScript/React 스타일 가이드를 기반으로 한 **ESLint 9 Flat Config 형식**의 TypeScript + React 프로젝트 설정 가이드입니다.

> **⚠️ 중요**: 이 가이드는 **ESLint 9+ Flat Config** 방식을 사용합니다. 구버전 `.eslintrc` 방식이 아닙니다.
>
> **ESLint 10 (2025년 말 예정)에서 `.eslintrc` 형식은 완전히 제거됩니다.**

## 목차

1. [왜 Flat Config인가?](#1-왜-flat-config인가)
2. [패키지 설치](#2-패키지-설치)
3. [ESLint 설정 파일 (eslint.config.js)](#3-eslint-설정-파일-eslintconfigjs)
4. [핵심 규칙 설명](#4-핵심-규칙-설명)
5. [Ignores 설정](#5-ignores-설정)
6. [package.json 스크립트](#6-packagejson-스크립트)
7. [IDE 설정 (VS Code)](#7-ide-설정-vs-code)
8. [주요 규칙 커스터마이징 가이드](#8-주요-규칙-커스터마이징-가이드)
9. [Airbnb Config 네이티브 지원 시 마이그레이션](#9-airbnb-config-네이티브-지원-시-마이그레이션)

---

## 1. 왜 Flat Config인가?

### 구버전 (.eslintrc) vs Flat Config 비교

| 항목 | 구버전 (.eslintrc) | Flat Config (eslint.config.js) |
|------|-------------------|--------------------------------|
| **파일 형식** | JSON, YAML, JS | JavaScript만 |
| **설정 방식** | 객체 병합 (extends) | 배열 (순차 적용) |
| **플러그인 로드** | 문자열 (`"react"`) | import (`import react`) |
| **복잡도** | 높음 (병합 로직) | 낮음 (명시적) |
| **ESLint 버전** | ≤ 8.x (deprecated) | 9.x+ (공식) |
| **ESLint 10** | ❌ 제거됨 | ✅ 유일한 방식 |

### Flat Config의 장점

1. **명시적 import**: 어떤 플러그인을 사용하는지 명확
2. **예측 가능한 병합**: 배열 순서대로 적용
3. **TypeScript 지원**: 타입 안전성
4. **동적 설정**: JavaScript이므로 조건부 설정 가능
5. **No Cascading**: 단일 파일로 모든 설정 관리

---

## 2. 패키지 설치

### 2.1 기본 패키지 (모든 프로젝트)

```bash
# ESLint 9 + TypeScript
npm install -D eslint@9 globals typescript-eslint

# React 플러그인
npm install -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y

# Prettier 통합 (선택)
npm install -D eslint-config-prettier eslint-plugin-prettier prettier
```

### 2.2 Airbnb 호환 레이어 (FlatCompat 사용)

> **현재 상황**: `eslint-config-airbnb`와 `eslint-config-airbnb-typescript`는 아직 Flat Config 네이티브 지원 없음

```bash
# FlatCompat 유틸리티
npm install -D @eslint/eslintrc

# Airbnb Config (레거시 형식)
npm install -D eslint-config-airbnb eslint-config-airbnb-typescript

# Airbnb 의존 플러그인
npm install -D eslint-plugin-import @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### 2.3 Next.js 프로젝트 추가 패키지

```bash
npm install -D @next/eslint-plugin-next
```

### 패키지 설명

- **eslint**: ESLint 코어 패키지 (v9+)
- **globals**: 전역 변수 정의 (browser, node 등)
- **typescript-eslint**: TypeScript 파서 + 플러그인 통합 패키지
- **@eslint/eslintrc**: 레거시 config를 Flat Config로 변환 (FlatCompat)
- **eslint-config-airbnb**: Airbnb JavaScript 스타일 가이드
- **eslint-config-airbnb-typescript**: Airbnb TypeScript 확장
- **eslint-plugin-react**: React 전용 린팅 규칙
- **eslint-plugin-react-hooks**: React Hooks 규칙
- **eslint-plugin-jsx-a11y**: JSX 접근성 규칙
- **eslint-plugin-import**: ES6+ import/export 검증
- **eslint-config-prettier**: Prettier와 충돌하는 ESLint 규칙 비활성화
- **eslint-plugin-prettier**: Prettier를 ESLint 규칙으로 실행

---

## 3. ESLint 설정 파일 (eslint.config.js)

### 3.1 기본 설정 (React + TypeScript)

프로젝트 루트에 `eslint.config.js` 생성:

```javascript
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  // 1. Ignores (첫 번째 객체)
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'out/**',
      '*.config.js',
      '*.config.mjs',
      'coverage/**',
    ],
  },

  // 2. 기본 JavaScript 규칙
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // 3. TypeScript 설정
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommended,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },

  // 4. React 설정
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // React 17+
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.jsx', '.tsx'] },
      ],
      'react/prop-types': 'off', // TypeScript 사용
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // 5. Prettier (마지막에 적용)
  prettierConfig,
  {
    plugins: { prettier },
    rules: {
      'prettier/prettier': 'error',
    },
  }
);
```

### 3.2 Airbnb 규칙 포함 (FlatCompat 사용)

```javascript
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

// FlatCompat으로 Airbnb Config 로드
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '*.config.js',
      '*.config.mjs',
    ],
  },

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      // Airbnb Config를 FlatCompat으로 변환
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
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      prettier,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // Prettier
      'prettier/prettier': 'error',

      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // React
      'react/react-in-jsx-scope': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      // Import
      'import/prefer-default-export': 'off',
    },
  }
);
```

### 3.3 Next.js 프로젝트 설정

```javascript
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import nextPlugin from '@next/eslint-plugin-next';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'node_modules/**',
      '*.config.js',
      '*.config.mjs',
      'jest.setup.ts',
    ],
  },

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...compat.extends('airbnb', 'airbnb-typescript', 'airbnb/hooks'),
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
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      '@next/next': nextPlugin,
      prettier,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      '@next/next/no-html-link-for-pages': 'error',
      'import/prefer-default-export': 'off',
    },
  }
);
```

---

## 4. 핵심 규칙 설명

### 4.1 JavaScript 기본 규칙

#### 변수 선언
- **`prefer-const`**: 재할당하지 않는 변수는 `const` 사용
- **`no-var`**: `var` 금지, `let`/`const` 사용
- **`no-unused-vars`**: 사용하지 않는 변수 금지

#### 함수
- **`prefer-arrow-callback`**: 콜백에서 화살표 함수 권장
- **`arrow-parens`**: 화살표 함수 매개변수 괄호 필수
- **`arrow-body-style`**: 간결한 화살표 함수 본문

#### 제어 구조
- **`eqeqeq`**: `===`/`!==` 사용 강제
- **`no-else-return`**: 불필요한 `else` 제거
- **`no-nested-ternary`**: 중첩 삼항 연산자 금지

### 4.2 TypeScript 규칙

- **`@typescript-eslint/no-unused-vars`**: 사용하지 않는 변수 감지
  - `argsIgnorePattern: "^_"`: `_`로 시작하는 매개변수 무시
- **`@typescript-eslint/no-explicit-any`**: `any` 타입 경고
- **`@typescript-eslint/explicit-function-return-type`**: 함수 반환 타입 (off 권장)

### 4.3 React 규칙

- **`react/react-in-jsx-scope`**: `off` (React 17+ JSX 변환)
- **`react/function-component-definition`**: 컴포넌트 정의 방식 강제
- **`react/prop-types`**: `off` (TypeScript 사용)
- **`react-hooks/rules-of-hooks`**: Hooks 규칙 강제
- **`react-hooks/exhaustive-deps`**: 의존성 배열 완전성 검사

### 4.4 접근성 (a11y)

- **`jsx-a11y/alt-text`**: 이미지 alt 속성 필수
- **`jsx-a11y/aria-role`**: 유효한 ARIA role
- **`jsx-a11y/no-access-key`**: accessKey 사용 금지

---

## 5. Ignores 설정

Flat Config에서는 `.eslintignore` 파일 대신 설정 객체의 `ignores` 필드 사용:

```javascript
export default [
  {
    ignores: [
      // 의존성
      'node_modules/**',

      // 빌드 결과물
      'dist/**',
      'build/**',
      'out/**',
      '.next/**',

      // 설정 파일
      '*.config.js',
      '*.config.mjs',
      '*.config.cjs',

      // 테스트 커버리지
      'coverage/**',

      // 캐시
      '.cache/**',
      '.parcel-cache/**',

      // 기타
      '*.min.js',
      'public/**',
    ],
  },
  // ... 나머지 설정
];
```

---

## 6. package.json 스크립트

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "lint:strict": "eslint . --max-warnings 0",
    "type-check": "tsc --noEmit",
    "check": "npm run type-check && npm run lint:strict"
  }
}
```

### 스크립트 설명

- **`lint`**: 모든 파일 검사
- **`lint:fix`**: 자동 수정 가능한 문제 수정
- **`lint:strict`**: 경고를 에러로 처리 (CI/CD용)
- **`type-check`**: TypeScript 타입 검사
- **`check`**: 타입 검사 + 린팅 동시 실행

---

## 7. IDE 설정 (VS Code)

### 7.1 필수 확장 프로그램

1. **ESLint** (dbaeumer.vscode-eslint) - v3.0.0 이상 (Flat Config 지원)
2. **Prettier** (esbenp.prettier-vscode) - 선택사항

### 7.2 .vscode/settings.json

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.formatOnSave": false,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "eslint.experimental.useFlatConfig": true,
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

### 설정 설명

- **`source.fixAll.eslint`**: 저장 시 ESLint 자동 수정
- **`eslint.experimental.useFlatConfig`**: Flat Config 명시적 활성화 (최신 버전에서는 자동)
- **`editor.formatOnSave`**: Prettier 대신 ESLint로 포맷팅

---

## 8. 주요 규칙 커스터마이징 가이드

### 8.1 TypeScript 엄격도 조정

```javascript
{
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
  },
}
```

### 8.2 파일별 규칙 분리

```javascript
export default [
  // 기본 설정
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // 일반 규칙
    },
  },

  // 테스트 파일 전용
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },

  // 설정 파일 전용
  {
    files: ['**/*.config.{js,ts}'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
```

### 8.3 동적 설정 (환경별 규칙)

```javascript
const isDevelopment = process.env.NODE_ENV === 'development';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-console': isDevelopment ? 'off' : ['error', { allow: ['warn', 'error'] }],
      'no-debugger': isDevelopment ? 'warn' : 'error',
    },
  },
];
```

### 8.4 Import 순서 커스터마이징

```javascript
{
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
}
```

---

## 9. Airbnb Config 네이티브 지원 시 마이그레이션

### 9.1 현재 상황 (2025년 1월 기준)

- `eslint-config-airbnb` 및 `eslint-config-airbnb-typescript`는 **아직 Flat Config 네이티브 지원 없음**
- 공식 저장소에 [PR #3061](https://github.com/airbnb/javascript/pull/3061)이 진행 중
- `eslint-config-airbnb-typescript`는 [2025년 5월에 아카이브됨](https://github.com/iamturns/eslint-config-airbnb-typescript/issues/331)

### 9.2 네이티브 지원 시 예상 마이그레이션

#### Before (FlatCompat 사용)

```javascript
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends('airbnb', 'airbnb-typescript', 'airbnb/hooks'),
];
```

#### After (네이티브 지원)

```javascript
import airbnb from 'eslint-config-airbnb';
import airbnbTypeScript from 'eslint-config-airbnb-typescript';

export default [
  ...airbnb,
  ...airbnbTypeScript,
];
```

### 9.3 대안: eslint-config-airbnb-extended

네이티브 Flat Config를 지원하는 커뮤니티 대안:

```bash
npm install -D eslint-config-airbnb-extended
```

```javascript
import airbnbExtended from 'eslint-config-airbnb-extended';

export default [
  ...airbnbExtended,
];
```

### 9.4 마이그레이션 체크리스트

네이티브 지원이 추가되면:

1. ✅ `@eslint/eslintrc` 패키지 제거
2. ✅ `FlatCompat` 관련 코드 제거
3. ✅ `eslint-config-airbnb` 최신 버전으로 업데이트
4. ✅ 직접 import로 변경
5. ✅ 설정 파일 간소화
6. ✅ 린트 실행 확인: `npm run lint`

**예상 시기**: 2025년 중반~후반 (공식 PR 진행 상황에 따라 변동)

---

## 추가 권장 사항

### 1. Prettier 설정 (.prettierrc.json)

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

### 2. Husky + lint-staged (Git Hooks)

```bash
npm install -D husky lint-staged
npx husky init
```

`.husky/pre-commit`:

```bash
npx lint-staged
```

`package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "git add"]
  }
}
```

### 3. 점진적 도입 전략

기존 프로젝트에 도입 시:

1. **경고 모드**: 모든 규칙을 `"warn"`으로 설정
2. **파일별 적용**: `files` 필드로 디렉토리별 적용
3. **단계적 엄격화**: 점진적으로 `"error"`로 변경

---

## 참고 자료

### 공식 문서
- [ESLint Flat Config Migration Guide](https://eslint.org/docs/latest/use/configure/migration-guide)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Next.js ESLint Configuration](https://nextjs.org/docs/app/api-reference/config/eslint)

### 추가 자료
- [ESLint 9 Flat Config Tutorial](https://dev.to/aolyang/eslint-9-flat-config-tutorial-2bm5)
- [Airbnb Flat Config PR #3061](https://github.com/airbnb/javascript/pull/3061)
- [ESLint Flat Config Rollout Plans](https://eslint.org/blog/2023/10/flat-config-rollout-plans/)
