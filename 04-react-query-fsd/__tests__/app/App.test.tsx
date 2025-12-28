import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '@/app/App';

// Mock QueryProvider to avoid React Query setup in tests
jest.mock('@/app/providers/QueryProvider', () => ({
  QueryProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="query-provider">{children}</div>
  ),
}));

// Mock SearchPage
jest.mock('@/pages/search/ui/SearchPage', () => ({
  SearchPage: () => <div data-testid="search-page">Search Page</div>,
}));

describe('App', () => {
  it('QueryProvider로 래핑되어야 한다', () => {
    render(<App />);

    expect(screen.getByTestId('query-provider')).toBeInTheDocument();
  });

  it('SearchPage를 렌더링해야 한다', () => {
    render(<App />);

    expect(screen.getByTestId('search-page')).toBeInTheDocument();
  });

  it('전역 레이아웃 구조를 가져야 한다', () => {
    render(<App />);

    const appContainer = screen.getByTestId('app-container');
    expect(appContainer).toBeInTheDocument();
  });

  it('header를 렌더링해야 한다', () => {
    render(<App />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('main을 렌더링해야 한다', () => {
    render(<App />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('앱 제목을 표시해야 한다', () => {
    render(<App />);

    expect(screen.getByText(/Pixabay Image Search/i)).toBeInTheDocument();
  });
});
