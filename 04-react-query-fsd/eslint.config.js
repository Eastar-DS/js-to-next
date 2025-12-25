import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', '*.config.ts', '*.config.js', 'jest.setup.ts'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
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
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      prettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Prettier
      'prettier/prettier': 'error',

      // Console
      'no-console': 'off',

      // React
      'react/react-in-jsx-scope': 'off',
      'react/no-multi-comp': ['error', { ignoreStateless: true }],
      'react/jsx-pascal-case': [
        'error',
        {
          allowAllCaps: true,
          ignore: [],
        },
      ],
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'react/jsx-closing-tag-location': 'error',
      'react/jsx-tag-spacing': [
        'error',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'never',
        },
      ],
      'react/jsx-curly-spacing': ['error', { when: 'never' }],
      'react/jsx-boolean-value': ['error', 'never'],
      'react/no-array-index-key': 'error',
      'react/require-default-props': 'off', // React 19에서는 defaultProps 대신 매개변수 기본값 사용
      'react/no-string-refs': 'error',
      'react/jsx-wrap-multilines': [
        'error',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'parens-new-line',
        },
      ],
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'react/jsx-no-bind': [
        'error',
        {
          ignoreRefs: true,
          allowArrowFunctions: true,
          allowFunctions: false,
          allowBind: false,
          ignoreDOMComponents: false,
        },
      ],
      'react/require-render-return': 'error',
      'react/no-is-mounted': 'error',
      'react/sort-comp': [
        'error',
        {
          order: [
            'static-variables',
            'static-methods',
            'instance-variables',
            'lifecycle',
            'everything-else',
            'render',
          ],
        },
      ],

      // React Hooks
      ...reactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // JSX A11y
      'jsx-a11y/alt-text': [
        'error',
        {
          elements: ['img'],
          img: ['Image'],
        },
      ],
      'jsx-a11y/img-redundant-alt': [
        'error',
        {
          elements: ['img'],
          words: ['image', 'photo', 'picture'],
        },
      ],
      'jsx-a11y/aria-role': [
        'error',
        {
          ignoreNonDOM: false,
        },
      ],
      'jsx-a11y/no-access-key': 'error',

      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
          classes: true,
          variables: true,
          enums: true,
          typedefs: true,
        },
      ],

      // ES6+
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false }],
      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': ['error', 'always'],
      'prefer-const': [
        'error',
        {
          destructuring: 'all',
        },
      ],
      'no-var': 'error',
      'object-shorthand': [
        'error',
        'always',
        {
          ignoreConstructors: false,
          avoidQuotes: true,
        },
      ],
      'prefer-object-spread': 'error',
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: {
            array: false,
            object: true,
          },
          AssignmentExpression: {
            array: true,
            object: false,
          },
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      'prefer-template': 'error',
      'template-curly-spacing': ['error', 'never'],

      // Best Practices
      'no-eval': 'error',
      eqeqeq: ['error', 'always'],
      'no-case-declarations': 'error',
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'no-else-return': ['error', { allowElseIf: false }],

      // Stylistic
      'spaced-comment': [
        'error',
        'always',
        {
          line: {
            markers: ['/'],
            exceptions: ['-', '+'],
          },
          block: {
            markers: ['!'],
            exceptions: ['*'],
            balanced: true,
          },
        },
      ],
      'keyword-spacing': [
        'error',
        {
          before: true,
          after: true,
        },
      ],
      'space-before-blocks': 'error',
      'space-infix-ops': 'error',
      'eol-last': ['error', 'always'],
      'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
      'no-whitespace-before-property': 'error',
      'padded-blocks': ['error', 'never'],
      'no-multiple-empty-lines': [
        'error',
        { max: 1, maxBOF: 0, maxEOF: 0 },
      ],
      'space-in-parens': ['error', 'never'],
      'array-bracket-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'comma-spacing': ['error', { before: false, after: true }],
      'comma-style': ['error', 'last'],
      camelcase: [
        'error',
        {
          properties: 'never',
          ignoreDestructuring: false,
          ignoreImports: false,
          ignoreGlobals: false,
        },
      ],
      'new-cap': [
        'error',
        {
          newIsCap: true,
          newIsCapExceptions: [],
          capIsNew: false,
          capIsNewExceptions: [],
        },
      ],
      quotes: [
        'error',
        'single',
        { avoidEscape: true, allowTemplateLiterals: false },
      ],
      'jsx-quotes': ['error', 'prefer-double'],
    },
  }
);
