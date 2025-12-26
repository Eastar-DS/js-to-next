import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryProvider } from '@/app/providers/QueryProvider';

describe('QueryProvider', () => {
  it('children을 렌더링해야 한다', () => {
    render(
      <QueryProvider>
        <div data-testid="test-child">Test Child</div>
      </QueryProvider>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('QueryClientProvider를 제공해야 한다', () => {
    const TestComponent = () => {
      return <div data-testid="query-test">Query Provider Test</div>;
    };

    render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>
    );

    expect(screen.getByTestId('query-test')).toBeInTheDocument();
  });

  it('React Query를 사용하는 컴포넌트를 래핑할 수 있어야 한다', () => {
    const TestComponent = () => {
      return <div>Wrapped Component</div>;
    };

    const { container } = render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
