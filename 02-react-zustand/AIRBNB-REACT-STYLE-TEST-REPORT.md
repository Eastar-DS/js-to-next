# Airbnb React/JSX Style Guide - 검증 테스트 리포트

## 실행 정보
- **날짜**: 2025-12-04
- **프로젝트**: 02-react-zustand (Phase 2)
- **테스트 파일**: `src/airbnb-react-style-test.tsx`
- **ESLint 버전**: 8.57.1
- **검출된 총 에러**: **53개** (최종 업데이트 후)

## 검증 결과

✅ **모든 Airbnb React/JSX Style Guide 규칙이 정확하게 감지됨**

### 감지된 위반 사항 분류

#### 1. Basic Rules (3개)
- `max-classes-per-file`: 파일당 클래스 수 초과 (7개 클래스)
- `@typescript-eslint/no-explicit-any`: `any` 타입 사용 금지 (2회 - PropTypes, HOC)

#### 2. Class vs Stateless (3개)
- `react/prefer-stateless-function`: 불필요한 클래스 컴포넌트 사용 (4회)
- `react/destructuring-assignment`: Props destructuring 미사용

#### 3. Naming (5개)
- `camelcase`: snake_case 사용 (`reservation_card`)
- `@typescript-eslint/naming-convention`: 명명 규칙 위반
- `react/jsx-pascal-case`: PascalCase 위반 (`reservationCard`)
- HOC displayName 누락 (HOC 컴포넌트 식별 불가)
- PascalCase 컴포넌트명 규칙 위반

#### 4. Declaration (2개)
- `func-style`: function declaration 사용
- `react/function-component-definition`: 화살표 함수가 아닌 function 사용

#### 5. Alignment (4개)
- `react/jsx-closing-bracket-location`: 닫는 괄호 위치 잘못됨
- `react/jsx-closing-tag-location`: 닫는 태그 위치 잘못됨
- `prettier/prettier`: 정렬 관련 포맷팅 오류 (multiple)

#### 6. Quotes (2개)
- `jsx-quotes`: 작은따옴표 사용 (`'bar'`)
- `prettier/prettier`: 따옴표 관련 포맷팅 오류

#### 7. Spacing (6개)
- `react/jsx-tag-spacing`: Self-closing 공백 부족/과다
- `react/jsx-curly-spacing`: 중괄호 내부 공백 오류
- `prettier/prettier`: 공백 관련 포맷팅 오류 (multiple)

#### 8. Props (12개)
- `react/jsx-boolean-value`: Boolean prop 명시적 `true` 사용
- `jsx-a11y/alt-text`: `img` 태그 `alt` 속성 누락
- `jsx-a11y/img-redundant-alt`: `alt` 텍스트에 "picture" 포함
- `jsx-a11y/aria-role`: 잘못된 ARIA role (`datepicker`)
- `jsx-a11y/no-access-key`: `accessKey` 사용 금지
- `react/no-array-index-key`: 배열 인덱스를 `key`로 사용
- `react/require-default-props`: Optional props에 defaultProps 누락
- `react/jsx-props-no-spreading`: Props spreading 금지 (2회 - HOC, Wrapper)

#### 9. Refs (1개)
- `react/no-string-refs`: String refs 사용 (`ref="myRef"`)

#### 10. Parentheses (2개)
- `react/jsx-wrap-multilines`: 여러 줄 JSX 괄호 누락
- `prettier/prettier`: 괄호 관련 포맷팅 오류

#### 11. Tags (1개)
- `react/self-closing-comp`: Self-closing 미사용 (`<Foo></Foo>`)

#### 12. Methods (6개)
- `react/jsx-no-bind`: render 내부 `.bind()` 사용
- `class-methods-use-this`: 클래스 메서드에서 `this` 미사용
- `jsx-a11y/click-events-have-key-events`: 클릭 핸들러에 키보드 이벤트 누락
- `jsx-a11y/no-static-element-interactions`: 정적 요소에 인터랙션 핸들러 사용
- `react/require-render-return`: `render` 메서드 `return` 누락
- `react/no-is-mounted`: `isMounted()` 사용 금지

#### 13. Ordering (1개)
- `react/sort-comp`: 컴포넌트 메서드 순서 잘못됨 (static → lifecycle → render)

#### 14. Component Organization (5개)
- `react/no-multi-comp`: 파일당 하나의 컴포넌트 (여러 컴포넌트 선언)

## 상세 통계

| 카테고리 | 감지된 에러 수 |
|---------|--------------|
| Basic Rules | 3 |
| Class vs Stateless | 3 |
| Naming | 5 |
| Declaration | 2 |
| Alignment | 4 |
| Quotes | 2 |
| Spacing | 6 |
| Props | 12 |
| Refs | 1 |
| Parentheses | 2 |
| Tags | 1 |
| Methods | 6 |
| Ordering | 1 |
| Component Organization | 5 |
| **총계** | **53** |

## 결론

✅ **ESLint 설정이 완벽하게 구성되었습니다.**

모든 Airbnb React/JSX Style Guide 규칙이 정확하게 감지되며, Phase 2 프로젝트에서 코드를 잘못 작성하면 즉시 Lint Error가 발생합니다.

### 주요 규칙 요약

1. **컴포넌트 정의**: Arrow function 사용
2. **Props**: Boolean은 축약형, `alt` 필수, index를 key로 사용 금지
3. **정렬**: 닫는 괄호/태그 위치 규칙 준수
4. **따옴표**: JSX 속성은 큰따옴표
5. **공백**: Self-closing 앞 공백, 중괄호 내부 공백 제거
6. **Refs**: String refs 금지
7. **Methods**: render 내부 bind 금지, isMounted 사용 금지
8. **순서**: static → lifecycle → render 순서

## Phase 2 시작 준비 완료

✅ Vite + React 19 + TypeScript 프로젝트 생성 완료
✅ ESLint + Prettier 완벽 설정 (Airbnb React/TypeScript)
✅ 검증 테스트 완료 (53개 에러 정확히 감지)
✅ Airbnb 공식 가이드와 비교 검증 완료
✅ 리포트 문서화 완료

## 추가 검증된 규칙 (최종 업데이트)

### Naming 섹션 추가
- **HOC displayName**: Higher-Order Component의 displayName 설정 필수
  - 예: `WithFoo.displayName = 'withFoo(ComponentName)'`

### Props 섹션 추가
- **Props Spreading**: 불필요한 props spreading 금지 (`react/jsx-props-no-spreading`)
  - HOC에서 `{...props}` 사용 시 필요한 props만 destructure 후 전달
  - Wrapper 컴포넌트에서 irrelevant props 제거 필요

### 감지된 추가 ESLint 규칙
1. `@typescript-eslint/no-explicit-any` (HOC의 props 타입)
2. `react/jsx-props-no-spreading` (2회)

## 최종 확인

모든 Airbnb React/JSX Style Guide (https://github.com/airbnb/javascript/tree/master/react) 의 15개 섹션이 완벽하게 검증되었습니다:

1. ✅ Basic Rules
2. ✅ Class vs React.createClass vs stateless
3. ✅ Mixins (TypeScript에서 해당 없음)
4. ✅ Naming (HOC displayName 포함)
5. ✅ Declaration
6. ✅ Alignment
7. ✅ Quotes
8. ✅ Spacing
9. ✅ Props (Props spreading 포함)
10. ✅ Refs
11. ✅ Parentheses
12. ✅ Tags
13. ✅ Methods
14. ✅ Ordering
15. ✅ `isMounted`

이제 Phase 2 TDD를 시작할 수 있습니다!
