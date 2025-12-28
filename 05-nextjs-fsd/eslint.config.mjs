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
      // 대부분은 airbnb preset에 포함되어 있으므로
      // 명시적으로 추가/수정이 필요한 것만 작성
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
