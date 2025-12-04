# 프로젝트 초기 설정 가이드

이 문서는 각 Phase별 프로젝트 초기 설정 방법을 안내합니다.

---

## Phase 1: Vanilla JavaScript

### 1. 프로젝트 초기화
```bash
mkdir 01-vanilla-js
cd 01-vanilla-js
npm init -y
```

### 2. ESLint + Prettier 설정 (Airbnb Style Guide)
```bash
npm install --save-dev \
  eslint \
  eslint-config-airbnb-base \
  eslint-plugin-import \
  prettier \
  eslint-config-prettier \
  eslint-plugin-prettier
```

### 3. 설정 파일 생성

**.eslintrc.json**
```json
{
  "extends": [
    "airbnb-base",
    "plugin:prettier/recommended"
  ],
  "env": {
    "browser": true,
    "es2024": true,
    "jest": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-console": "off",
    "import/extensions": ["error", "always"]
  }
}
```

**.prettierrc**
```json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "es5",
  "arrowParens": "always"
}
```

**.vscode/settings.json** (VSCode 사용자)
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "javascript.preferences.quoteStyle": "single"
}
```

### 4. Jest 설정
```bash
npm install --save-dev jest @types/jest jest-environment-jsdom
```

**jest.config.js**
```javascript
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
```

**jest.setup.js**
```javascript
// Jest setup file

// Set test environment variables
process.env.PIXABAY_API_KEY = 'test_api_key_12345';
```

### 5. package.json scripts 추가

package.json에 `"type": "module"`을 추가하고 scripts를 설정합니다:

```json
{
  "type": "module",
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
    "test:watch": "node --experimental-vm-modules node_modules/jest/bin/jest.js --watch"
  }
}
```

---

## Phase 2: React 19 + Zustand + TypeScript (Clean Architecture)

### 1. 프로젝트 생성 (Vite + React + TypeScript)
```bash
npm create vite@latest 02-react-zustand -- --template react-ts
cd 02-react-zustand
npm install
```

### 2. ESLint + Prettier 설정 (Airbnb + TypeScript)
```bash
npm install --save-dev \
  eslint \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint-config-airbnb \
  eslint-config-airbnb-typescript \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-jsx-a11y \
  eslint-plugin-import \
  prettier \
  eslint-config-prettier \
  eslint-plugin-prettier
```

### 3. 설정 파일 생성/수정

**.eslintrc.json** (모든 Airbnb React/JSX 규칙 명시적 적용)
```json
{
  "extends": [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    // ===== React 19 호환성 =====
    "react/react-in-jsx-scope": "off",

    // ===== Airbnb React/JSX Style Guide 명시적 규칙 =====

    // 1. Basic Rules
    "react/no-multi-comp": ["error", { "ignoreStateless": true }],
    "react/forbid-prop-types": ["error", {
      "forbid": ["any", "array", "object"],
      "checkContextTypes": true,
      "checkChildContextTypes": true
    }],

    // 2. Class vs Stateless
    "react/prefer-es6-class": ["error", "always"],
    "react/prefer-stateless-function": ["error", { "ignorePureComponents": true }],

    // 4. Naming
    "react/jsx-filename-extension": ["error", { "extensions": [".tsx", ".jsx"] }],
    "react/jsx-pascal-case": ["error", {
      "allowAllCaps": true,
      "ignore": []
    }],

    // 5. Declaration
    "react/function-component-definition": ["error", {
      "namedComponents": "arrow-function",
      "unnamedComponents": "arrow-function"
    }],

    // 6. Alignment
    "react/jsx-closing-bracket-location": ["error", "line-aligned"],
    "react/jsx-closing-tag-location": "error",

    // 7. Quotes
    "jsx-quotes": ["error", "prefer-double"],

    // 8. Spacing
    "react/jsx-tag-spacing": ["error", {
      "closingSlash": "never",
      "beforeSelfClosing": "always",
      "afterOpening": "never",
      "beforeClosing": "never"
    }],
    "react/jsx-curly-spacing": ["error", "never", { "allowMultiline": true }],

    // 9. Props
    "react/jsx-boolean-value": ["error", "never", { "always": [] }],
    "jsx-a11y/alt-text": ["error", {
      "elements": ["img", "object", "area", "input[type=\"image\"]"],
      "img": [],
      "object": [],
      "area": [],
      "input[type=\"image\"]": []
    }],
    "jsx-a11y/img-redundant-alt": "error",
    "jsx-a11y/aria-role": ["error", { "ignoreNonDOM": false }],
    "jsx-a11y/no-access-key": "error",
    "react/no-array-index-key": "error",
    "react/require-default-props": ["error", {
      "forbidDefaultForRequired": true,
      "ignoreFunctionalComponents": false
    }],
    "react/default-props-match-prop-types": ["error", {
      "allowRequiredDefaults": false
    }],

    // 10. Refs
    "react/no-string-refs": "error",

    // 11. Parentheses
    "react/jsx-wrap-multilines": ["error", {
      "declaration": "parens-new-line",
      "assignment": "parens-new-line",
      "return": "parens-new-line",
      "arrow": "parens-new-line",
      "condition": "parens-new-line",
      "logical": "parens-new-line",
      "prop": "parens-new-line"
    }],

    // 12. Tags
    "react/self-closing-comp": ["error", {
      "component": true,
      "html": true
    }],

    // 13. Methods
    "react/jsx-no-bind": ["error", {
      "ignoreRefs": true,
      "allowArrowFunctions": true,
      "allowFunctions": false,
      "allowBind": false,
      "ignoreDOMComponents": true
    }],
    "react/require-render-return": "error",
    "react/no-is-mounted": "error",

    // 14. Ordering
    "react/sort-comp": ["error", {
      "order": [
        "static-variables",
        "static-methods",
        "instance-variables",
        "lifecycle",
        "/^handle.+$/",
        "/^on.+$/",
        "getters",
        "setters",
        "/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/",
        "instance-methods",
        "everything-else",
        "rendering"
      ],
      "groups": {
        "lifecycle": [
          "displayName",
          "propTypes",
          "contextTypes",
          "childContextTypes",
          "mixins",
          "statics",
          "defaultProps",
          "constructor",
          "getDefaultProps",
          "getInitialState",
          "state",
          "getChildContext",
          "getDerivedStateFromProps",
          "componentWillMount",
          "UNSAFE_componentWillMount",
          "componentDidMount",
          "componentWillReceiveProps",
          "UNSAFE_componentWillReceiveProps",
          "shouldComponentUpdate",
          "componentWillUpdate",
          "UNSAFE_componentWillUpdate",
          "getSnapshotBeforeUpdate",
          "componentDidUpdate",
          "componentDidCatch",
          "componentWillUnmount"
        ],
        "rendering": [
          "/^render.+$/",
          "render"
        ]
      }
    }],

    // ===== TypeScript 관련 =====
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_"
    }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "error",

    // ===== Import 관련 =====
    "import/prefer-default-export": "off",
    "import/extensions": ["error", "ignorePackages", {
      "ts": "never",
      "tsx": "never"
    }],

    // ===== Hooks =====
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

**.prettierrc** (Phase 1과 동일)

### 4. Airbnb React/JSX Style Guide 검증 (Phase 1과 동일한 절차)

**중요**: Phase 2 TDD를 시작하기 전에 반드시 ESLint 설정이 모든 Airbnb React/JSX 규칙을 정확하게 감지하는지 검증해야 합니다.

#### 4.1 테스트 파일 작성

프로젝트 루트에 `airbnb-react-style-test.tsx` 파일을 생성하고, Airbnb React/JSX Style Guide의 모든 "bad" 예제를 포함시킵니다.

자세한 계획은 [REACT-STYLE-GUIDE-TEST-PLAN.md](./REACT-STYLE-GUIDE-TEST-PLAN.md)를 참조하세요.

```tsx
/**
 * Airbnb React/JSX Style Guide 위반 사항 테스트 파일
 *
 * 출처: https://github.com/airbnb/javascript/tree/master/react
 *
 * 이 파일은 의도적으로 모든 규칙을 위반합니다.
 */

import React from 'react';

// 1. Basic Rules - react/no-multi-comp
const Foo = () => <div>Foo</div>;
const Bar = () => <div>Bar</div>;

// 2. Class vs Stateless - react/prefer-stateless-function
class Listing extends React.Component {
  render() {
    return <div>{this.props.hello}</div>;
  }
}

// 4. Naming - react/jsx-pascal-case
const reservationCard = () => <div />;

// 5. Declaration - react/function-component-definition
function BadDeclaration() {
  return <div />;
}

// 6. Alignment - react/jsx-closing-bracket-location
const BadAlignment = () => (
  <div
    foo="bar"
    baz="qux" />
);

// 7. Quotes - jsx-quotes
const BadQuotes = () => <div className='bad' />;

// 8. Spacing - react/jsx-tag-spacing, react/jsx-curly-spacing
const BadSpacing = () => <div/>;
const BadCurly = () => <div className={ 'bad' } />;

// 9. Props - react/jsx-boolean-value
const BadBoolean = () => <div hidden={true} />;

// 9. Props - jsx-a11y/alt-text
const BadAlt = () => <img src="test.jpg" />;

// 9. Props - jsx-a11y/img-redundant-alt
const BadAltText = () => <img src="test.jpg" alt="Picture of test" />;

// 9. Props - jsx-a11y/no-access-key
const BadAccessKey = () => <div accessKey="h" />;

// 9. Props - react/no-array-index-key
const BadKey = ({ items }) => (
  <div>
    {items.map((item, index) => (
      <div key={index}>{item}</div>
    ))}
  </div>
);

// 10. Refs - react/no-string-refs
class BadRefs extends React.Component {
  render() {
    return <div ref="myRef" />;
  }
}

// 11. Parentheses - react/jsx-wrap-multilines
const BadParens = () => {
  return <div>
    <span>Test</span>
  </div>;
};

// 12. Tags - react/self-closing-comp
const BadSelfClosing = () => <div></div>;

// 13. Methods - react/jsx-no-bind
class BadBind extends React.Component {
  handleClick() {}

  render() {
    return <div onClick={this.handleClick.bind(this)} />;
  }
}

// 13. Methods - react/require-render-return
class BadReturn extends React.Component {
  render() {
    (<div />);
  }
}

// 14. Ordering - react/sort-comp
class BadOrdering extends React.Component {
  render() {
    return <div />;
  }

  componentDidMount() {}

  static getDerivedStateFromProps() {}
}

export default Foo;
```

#### 4.2 ESLint 실행 및 검증

```bash
# 테스트 파일에 대해 ESLint 실행
npm run lint -- airbnb-react-style-test.tsx

# 예상 결과: 50+ problems (errors and warnings)
```

#### 4.3 검증 리포트 작성

검증 결과를 `AIRBNB-REACT-STYLE-TEST-REPORT.md`에 문서화합니다:

```markdown
# Airbnb React/JSX Style Guide - ESLint 검증 리포트

## 검증 결과

✅ **총 XX개의 위반 사항이 정확하게 감지됨** (XX errors, XX warnings)

### 감지된 규칙 위반 (Rule Violations)

#### 1. Basic Rules ✅
- `react/no-multi-comp` - 파일당 하나의 컴포넌트
- `react/forbid-prop-types` - PropTypes 명시적 정의

#### 2. Class vs Stateless ✅
- `react/prefer-stateless-function` - 불필요한 클래스 금지

...

## 결론

✅ **모든 Airbnb React/JSX Style Guide 규칙이 정확하게 적용되어 있습니다!**
```

#### 4.4 검증 완료 후

- ✅ 모든 규칙이 정확하게 감지되는지 확인
- ✅ 리포트 문서화 완료
- ✅ Phase 2 TDD 시작 준비 완료

### 5. TypeScript 설정 (Clean Architecture paths)

**tsconfig.json** (compilerOptions에 추가)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@domain/*": ["src/domain/*"],
      "@application/*": ["src/application/*"],
      "@infrastructure/*": ["src/infrastructure/*"],
      "@presentation/*": ["src/presentation/*"]
    }
  },
  "include": ["src"]
}
```

### 5. Vite 설정 (path alias)

**vite.config.ts**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@domain': path.resolve(__dirname, './src/domain'),
      '@application': path.resolve(__dirname, './src/application'),
      '@infrastructure': path.resolve(__dirname, './src/infrastructure'),
      '@presentation': path.resolve(__dirname, './src/presentation'),
    },
  },
});
```

### 6. Zustand 설치
```bash
npm install zustand
```

### 7. Jest + TypeScript 설정
```bash
npm install --save-dev \
  jest \
  @types/jest \
  ts-jest \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  jest-environment-jsdom
```

**jest.config.ts**
```typescript
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
```

**jest.setup.ts**
```typescript
import '@testing-library/jest-dom';
```

### 8. package.json scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx}\"",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

---

## Phase 3: React 19 + React Query + TypeScript (Clean Architecture 심화)

### 1. 프로젝트 생성 (Phase 2 복사 또는 새로 생성)
```bash
npm create vite@latest 03-react-query -- --template react-ts
cd 03-react-query
npm install
```

### 2. ESLint + Prettier 설정 (Phase 2와 동일)
Phase 2의 설정을 그대로 사용합니다.

### 3. React Query 설치
```bash
npm install @tanstack/react-query
npm install --save-dev @tanstack/eslint-plugin-query
```

### 4. ESLint 설정 업데이트 (.eslintrc.json)
```json
{
  "extends": [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": ["@tanstack/query"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/function-component-definition": [
      "error",
      {
        "namedComponents": "arrow-function"
      }
    ],
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "import/prefer-default-export": "off"
  }
}
```

### 5. 나머지 설정은 Phase 2와 동일
- tsconfig.json (paths 설정)
- vite.config.ts (alias 설정)
- jest.config.ts
- package.json scripts

---

## Phase 4: Next.js 16 + Tailwind CSS + TypeScript (Feature-Sliced Design)

### 1. 프로젝트 생성 (Next.js 16 + TypeScript)
```bash
npx create-next-app@latest 04-nextjs-tailwind \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"
cd 04-nextjs-tailwind
```

### 2. ESLint + Prettier 설정 (Next.js + Airbnb)
Next.js는 이미 ESLint가 설정되어 있으므로 추가 패키지만 설치:

```bash
npm install --save-dev \
  eslint-config-airbnb \
  eslint-config-airbnb-typescript \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  prettier \
  eslint-config-prettier \
  eslint-plugin-prettier
```

### 3. 설정 파일 생성/수정

**.eslintrc.json**
```json
{
  "extends": [
    "next/core-web-vitals",
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/function-component-definition": [
      "error",
      {
        "namedComponents": "arrow-function"
      }
    ],
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "import/prefer-default-export": "off",
    "react/jsx-props-no-spreading": "off"
  }
}
```

**.prettierrc**
```json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "es5",
  "arrowParens": "always",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

```bash
npm install --save-dev prettier-plugin-tailwindcss
```

### 4. tsconfig.json paths 설정 (FSD 구조)
```json
{
  "compilerOptions": {
    "target": "ES2017",
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
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@app/*": ["./src/app/*"],
      "@pages/*": ["./src/pages/*"],
      "@widgets/*": ["./src/widgets/*"],
      "@features/*": ["./src/features/*"],
      "@entities/*": ["./src/entities/*"],
      "@shared/*": ["./src/shared/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 5. React Query 및 추가 의존성 설치
```bash
npm install @tanstack/react-query
npm install --save-dev @tanstack/eslint-plugin-query
```

### 6. Playwright 설치 (E2E 테스트)
```bash
npm init playwright@latest
```

### 7. package.json scripts
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx}\"",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

---

## Phase 5: Next.js 16 + Styled Components + TypeScript (FSD 심화)

### 1. 프로젝트 생성 (Phase 4 복사 또는 새로 생성)
```bash
npx create-next-app@latest 05-nextjs-styled-components \
  --typescript \
  --app \
  --src-dir \
  --import-alias "@/*"
cd 05-nextjs-styled-components
```

### 2. Styled Components 설치
```bash
npm install styled-components
npm install --save-dev \
  @types/styled-components \
  babel-plugin-styled-components
```

### 3. Next.js + Styled Components 설정

**next.config.mjs**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
```

### 4. TypeScript 타입 정의

**src/styled.d.ts**
```typescript
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}
```

### 5. ESLint 설정 (Phase 4와 동일 + Styled Components)

**.eslintrc.json**
```json
{
  "extends": [
    "next/core-web-vitals",
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/function-component-definition": [
      "error",
      {
        "namedComponents": "arrow-function"
      }
    ],
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "import/prefer-default-export": "off",
    "react/jsx-props-no-spreading": "off"
  }
}
```

### 6. tsconfig.json (Phase 4와 동일한 FSD paths)

### 7. package.json scripts (Phase 4와 동일)

---

## 공통 참고 사항

### 환경 변수 설정
모든 Phase에서 루트 디렉토리에 `.env` 파일을 생성하고 Pixabay API 키를 설정하세요:

```bash
PIXABAY_API_KEY=your_api_key_here
```

### VSCode 확장 프로그램 권장
- ESLint
- Prettier - Code formatter
- TypeScript Vue Plugin (Volar)

### Git 설정
각 Phase 디렉토리에 `.gitignore` 파일 추가:

```
node_modules/
.env
dist/
build/
.next/
coverage/
*.log
.DS_Store
```

### 문제 해결

#### ESLint 에러 발생 시
```bash
npm run lint:fix
```

#### TypeScript 에러 발생 시
```bash
npx tsc --noEmit
```

#### 의존성 충돌 시
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 다음 단계

설정을 완료한 후 [plan.md](./plan.md)로 돌아가서 각 Phase의 TDD 테스트를 시작하세요.

**Ready? Say "go" to begin!**
