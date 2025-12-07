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

import React from 'react';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* @ts-nocheck */
// TypeScript checking disabled for this test file - intentional violations

// ============================================================================
// 1. Basic Rules
// ============================================================================

// 1.1 파일당 하나의 컴포넌트 (react/no-multi-comp)
// NOTE: Stateless 컴포넌트는 예외 (ignoreStateless: true)
// Airbnb 가이드: "However, multiple Stateless, or Pure, Components are allowed per file"
// 따라서 아래 Foo, Bar는 에러가 발생하지 않음 (의도된 동작)
// 실제 에러는 클래스 컴포넌트에서 감지됨 (섹션 10-14 참조)

interface FooProps {
  bar?: string;
  baz?: string;
  hidden?: boolean;
  variant?: string;
  ref?: string;
  children?: React.ReactNode;
}

const Foo = (_props: FooProps) => <div>Foo</div>;
const Bar = () => <div>Bar</div>;

// 1.2 PropTypes 명시적 정의 (react/forbid-prop-types)
// bad - any, array, object 사용
interface BadProps {
  items: any[]; // should use specific type
  config: object; // should use shape
}

// ============================================================================
// 2. Class vs Stateless
// ============================================================================

// 2.2 Stateless Function (react/prefer-stateless-function)
// bad - 불필요한 클래스 컴포넌트
interface ListingProps {
  hello: string;
}

class Listing extends React.Component<ListingProps> {
  render() {
    return <div>{this.props.hello}</div>;
  }
}

// ============================================================================
// 4. Naming
// ============================================================================

// 4.2 컴포넌트 명명 (Naming)
// bad - 컴포넌트는 PascalCase로 정의해야 함
const reservationCard = () => <div />;

// bad - 컴포넌트 인스턴스는 camelCase여야 하는데 PascalCase 사용
const ReservationItem = <Foo variant="stuff" />;

// 4.3 컴포넌트 참조 (camelCase/PascalCase)
// bad - snake_case 사용
const reservation_card = () => <div />;

// 4.4 HOC displayName (react/display-name)
// bad - displayName 누락
const withFoo = (WrappedComponent: React.ComponentType) => {
  const WithFoo = (props: any) => <WrappedComponent {...props} />;
  return WithFoo;
};

// ============================================================================
// 5. Declaration
// ============================================================================

// 5.1 함수 컴포넌트 정의 (react/function-component-definition)
// bad - function declaration
const FooFunc = () => <div />;

// ============================================================================
// 6. Alignment
// ============================================================================

// 6.1 닫는 괄호 위치 (react/jsx-closing-bracket-location)
// bad
const AlignmentBad1 = () => <Foo bar="bar" baz="baz" />;

// 6.2 닫는 태그 위치 (react/jsx-closing-tag-location)
// bad
const AlignmentBad2 = () => (
  <Foo>
    <Bar />
  </Foo>
);

// ============================================================================
// 7. Quotes
// ============================================================================

// 7.1 JSX 속성 따옴표 (jsx-quotes)
// bad - 작은따옴표
const QuotesBad = () => <Foo bar="bar" />;

// ============================================================================
// 8. Spacing
// ============================================================================

// 8.1 Self-closing 공백 (react/jsx-tag-spacing)
// bad - 공백 없음
const SpacingBad1 = () => <Foo />;

// bad - 공백 너무 많음
const SpacingBad2 = () => <Foo />;

// 8.2 중괄호 공백 (react/jsx-curly-spacing)
// bad
const baz = 'test';
const SpacingBad3 = () => <Foo bar={baz} />;

// ============================================================================
// 9. Props
// ============================================================================

// 9.1 Boolean Props (react/jsx-boolean-value)
// bad
const PropsBad1 = () => <Foo hidden />;

// 9.2 Alt 속성 (jsx-a11y/alt-text)
// bad
const PropsBad2 = () => <img src="hello.jpg" />;

// 9.3 Alt 텍스트 (jsx-a11y/img-redundant-alt)
// bad
const PropsBad3 = () => <img src="hello.jpg" alt="Picture of hello" />;

// 9.4 ARIA Role (jsx-a11y/aria-role)
// bad
const PropsBad4 = () => <div role="datepicker" />;

// 9.5 AccessKey (jsx-a11y/no-access-key)
// bad
const PropsBad5 = () => <div accessKey="h" />;

// 9.6 배열 인덱스 Key (react/no-array-index-key)
// bad
interface Item {
  id: string;
  name: string;
}

const items: Item[] = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
];

const PropsBad6 = () => (
  <div>
    {items.map((item, index) => (
      <div key={index}>{item.name}</div>
    ))}
  </div>
);

// 9.7 DefaultProps (react/require-default-props)
// bad - defaultProps 없음
interface FooPropsWithOptional {
  required: string;
  optional?: string;
}

const FooWithOptional = ({ required, optional }: FooPropsWithOptional) => (
  <div>
    {required} {optional}
  </div>
);

// 9.8 Props Naming - DOM prop names 재사용 금지
// bad - style prop을 다른 용도로 사용
interface MyComponentBadProps {
  style: string; // DOM의 style과 충돌
}

const MyComponentBad = ({ style }: MyComponentBadProps) => <div>{style}</div>;

// 9.9 Props Spreading - 불필요한 props spreading
// bad - 모든 props를 그대로 전달
interface WrapperBadProps {
  irrelevantProp: string;
  relevantProp: string;
}

const WrapperBad = (props: WrapperBadProps) => <div {...props}>Content</div>;

// ============================================================================
// 10. Refs
// ============================================================================

// 10.1 String Refs (react/no-string-refs)
// bad
class StringRefsBad extends React.Component {
  render() {
    return <Foo ref="myRef" />;
  }
}

// ============================================================================
// 11. Parentheses
// ============================================================================

// 11.1 여러 줄 JSX 괄호 (react/jsx-wrap-multilines)
// bad
class ParenthesesBad extends React.Component {
  render() {
    return (
      <div>
        <div>Child</div>
      </div>
    );
  }
}

// ============================================================================
// 12. Tags
// ============================================================================

// 12.1 Self-closing (react/self-closing-comp)
// bad
const TagsBad = () => <Foo variant="stuff" />;

// ============================================================================
// 13. Methods
// ============================================================================

// 13.1 Bind in render (react/jsx-no-bind)
// bad
class MethodsBad1 extends React.Component {
  handleClick() {
    // do something
  }

  render() {
    return <div onClick={this.handleClick.bind(this)} />;
  }
}

// 13.2 Render Return (react/require-render-return)
// bad
class MethodsBad2 extends React.Component {
  render() {
    <div />; // 누락된 return
  }
}

// 13.3 isMounted (react/no-is-mounted)
// bad
class MethodsBad3 extends React.Component {
  componentDidUpdate() {
    if (this.isMounted()) {
      // do something
    }
  }
}

// ============================================================================
// 14. Ordering
// ============================================================================

// 14.1 컴포넌트 메서드 순서 (react/sort-comp)
// bad - 잘못된 순서
class OrderingBad extends React.Component {
  render() {
    return <div />;
  }

  componentDidMount() {
    // lifecycle이 render 앞에 와야 함
  }

  static getDerivedStateFromProps() {
    // static이 가장 위에
    return null;
  }
}

export default Foo;
