# Airbnb React/JSX Style Guide - 검증 테스트 파일 계획

이 문서는 Phase 2 시작 전에 작성할 `airbnb-react-style-test.tsx` 파일의 계획입니다.

## 목적
- Airbnb React/JSX Style Guide의 모든 규칙을 의도적으로 위반하는 테스트 파일 작성
- ESLint가 각 규칙을 정확하게 감지하는지 검증
- Phase 2 시작 전에 ESLint 설정이 완벽한지 확인

## 테스트 파일 구조

```typescript
/**
 * Airbnb React/JSX Style Guide 위반 사항 테스트 파일
 *
 * 이 파일은 Airbnb React/JSX Style Guide의 "bad" 예제들을 포함하여
 * ESLint가 제대로 에러를 감지하는지 확인합니다.
 *
 * 출처: https://github.com/airbnb/javascript/tree/master/react
 *
 * 이 파일은 의도적으로 모든 규칙을 위반합니다.
 * ESLint가 제대로 작동하는지 확인하기 위한 테스트 파일입니다.
 */
```

## 검증할 규칙 목록

### 1. Basic Rules

**1.1 파일당 하나의 컴포넌트** (`react/no-multi-comp`)
```tsx
// bad - 여러 컴포넌트 정의
const Foo = () => <div>Foo</div>;
const Bar = () => <div>Bar</div>;
```

**1.2 PropTypes 명시적 정의** (`react/forbid-prop-types`)
```tsx
// bad - any, array, object 사용
interface BadProps {
  items: any[];  // should use specific type
  config: object;  // should use shape
}
```

### 2. Class vs Stateless

**2.1 클래스 사용** (`react/prefer-es6-class`)
```tsx
// bad - React.createClass (TypeScript에서는 사용 불가)
// 이 규칙은 TypeScript에서 자동으로 충족됨
```

**2.2 Stateless Function** (`react/prefer-stateless-function`)
```tsx
// bad - 불필요한 클래스 컴포넌트
class Listing extends React.Component {
  render() {
    return <div>{this.props.hello}</div>;
  }
}
```

### 4. Naming

**4.1 파일 확장자** (`react/jsx-filename-extension`)
```tsx
// bad - .js 파일에 JSX 사용 (테스트 시 .js로 생성하여 확인)
```

**4.2 PascalCase 컴포넌트** (`react/jsx-pascal-case`)
```tsx
// bad
const reservationCard = () => <div />;
```

**4.3 컴포넌트 참조** (`react/jsx-pascal-case`)
```tsx
// bad
import reservationCard from './ReservationCard';
```

### 5. Declaration

**5.1 함수 컴포넌트 정의** (`react/function-component-definition`)
```tsx
// bad - function declaration
function Foo() {
  return <div />;
}

// good - arrow function
const Bar = () => <div />;
```

### 6. Alignment

**6.1 닫는 괄호 위치** (`react/jsx-closing-bracket-location`)
```tsx
// bad
<Foo
  bar="bar"
  baz="baz" />

// good
<Foo
  bar="bar"
  baz="baz"
/>
```

**6.2 닫는 태그 위치** (`react/jsx-closing-tag-location`)
```tsx
// bad
<Foo>
  <Bar /></Foo>

// good
<Foo>
  <Bar />
</Foo>
```

### 7. Quotes

**7.1 JSX 속성 따옴표** (`jsx-quotes`)
```tsx
// bad - 작은따옴표
<Foo bar='bar' />

// good - 큰따옴표
<Foo bar="bar" />
```

### 8. Spacing

**8.1 Self-closing 공백** (`react/jsx-tag-spacing`)
```tsx
// bad - 공백 없음
<Foo/>

// bad - 공백 너무 많음
<Foo     />

// good
<Foo />
```

**8.2 중괄호 공백** (`react/jsx-curly-spacing`)
```tsx
// bad
<Foo bar={ baz } />

// good
<Foo bar={baz} />
```

### 9. Props

**9.1 Boolean Props** (`react/jsx-boolean-value`)
```tsx
// bad
<Foo hidden={true} />

// good
<Foo hidden />
```

**9.2 Alt 속성** (`jsx-a11y/alt-text`)
```tsx
// bad
<img src="hello.jpg" />

// good
<img src="hello.jpg" alt="Hello" />
```

**9.3 Alt 텍스트** (`jsx-a11y/img-redundant-alt`)
```tsx
// bad
<img src="hello.jpg" alt="Picture of hello" />

// good
<img src="hello.jpg" alt="Hello" />
```

**9.4 ARIA Role** (`jsx-a11y/aria-role`)
```tsx
// bad
<div role="datepicker" />

// good
<div role="button" />
```

**9.5 AccessKey** (`jsx-a11y/no-access-key`)
```tsx
// bad
<div accessKey="h" />
```

**9.6 배열 인덱스 Key** (`react/no-array-index-key`)
```tsx
// bad
{items.map((item, index) => (
  <div key={index}>{item}</div>
))}

// good
{items.map(item => (
  <div key={item.id}>{item}</div>
))}
```

**9.7 DefaultProps** (`react/require-default-props`)
```tsx
// bad - defaultProps 없음
interface FooProps {
  required: string;
  optional?: string;
}

const Foo = ({ required, optional }: FooProps) => (
  <div>{required} {optional}</div>
);

// good
Foo.defaultProps = {
  optional: 'default',
};
```

### 10. Refs

**10.1 String Refs** (`react/no-string-refs`)
```tsx
// bad
<Foo ref="myRef" />

// good
<Foo ref={(ref) => { this.myRef = ref; }} />
```

### 11. Parentheses

**11.1 여러 줄 JSX 괄호** (`react/jsx-wrap-multilines`)
```tsx
// bad
render() {
  return <MyComponent variant="long">
           <MyChild />
         </MyComponent>;
}

// good
render() {
  return (
    <MyComponent variant="long">
      <MyChild />
    </MyComponent>
  );
}
```

### 12. Tags

**12.1 Self-closing** (`react/self-closing-comp`)
```tsx
// bad
<Foo variant="stuff"></Foo>

// good
<Foo variant="stuff" />
```

### 13. Methods

**13.1 Bind in render** (`react/jsx-no-bind`)
```tsx
// bad
class Foo extends React.Component {
  render() {
    return <div onClick={this.handleClick.bind(this)} />;
  }
}

// good
class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return <div onClick={this.handleClick} />;
  }
}
```

**13.2 Render Return** (`react/require-render-return`)
```tsx
// bad
class Foo extends React.Component {
  render() {
    (<div />);  // 누락된 return
  }
}

// good
class Foo extends React.Component {
  render() {
    return (<div />);
  }
}
```

**13.3 isMounted** (`react/no-is-mounted`)
```tsx
// bad
class Foo extends React.Component {
  componentDidUpdate() {
    if (this.isMounted()) {
      // do something
    }
  }
}
```

### 14. Ordering

**14.1 컴포넌트 메서드 순서** (`react/sort-comp`)
```tsx
// bad - 잘못된 순서
class Foo extends React.Component {
  render() { return <div />; }

  componentDidMount() { }  // lifecycle이 render 앞에 와야 함

  static getDerivedStateFromProps() { }  // static이 가장 위에
}

// good
class Foo extends React.Component {
  static getDerivedStateFromProps() { }

  componentDidMount() { }

  render() { return <div />; }
}
```

## 예상 검출 결과

모든 규칙을 위반하면 다음과 같은 결과가 예상됩니다:
- **50+ errors**: 필수 규칙 위반
- **10+ warnings**: 권장 사항 위반

## 검증 절차

1. `02-react-zustand` 프로젝트 생성 후 테스트 파일 작성
2. `npm run lint -- airbnb-react-style-test.tsx` 실행
3. 모든 규칙이 정확하게 감지되는지 확인
4. 검증 리포트 작성 (`AIRBNB-REACT-STYLE-TEST-REPORT.md`)

## Phase 2 시작 조건

✅ 모든 Airbnb React/JSX 규칙이 ESLint에 정확히 설정됨
✅ 테스트 파일로 모든 규칙 감지 확인
✅ 리포트 문서화 완료

이후 Phase 2 TDD를 시작할 수 있습니다.
