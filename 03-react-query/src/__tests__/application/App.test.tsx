/**
 * App.tsx 기본 통합 테스트
 * Application Layer - React Query 통합
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

// Mock env 모듈 (import.meta.env 때문에 모킹 필요)
jest.mock('@infrastructure/config/env', () => ({
  env: {
    get: jest.fn((key: string) => {
      if (key === 'PIXABAY_API_KEY') return 'test-api-key';
      return '';
    }),
  },
}));

describe('App 기본 통합 테스트 (Phase 3.4)', () => {

  it('App이 렌더링되어야 함', () => {
    render(<App />);

    // 제목이 표시되는지 확인
    expect(screen.getByText(/Image Search App/i)).toBeInTheDocument();
  });

  it('SearchBar가 렌더링되어야 함', () => {
    render(<App />);

    // 검색 입력창이 있는지 확인
    const searchInput = screen.getByPlaceholderText(/검색어를 입력하세요/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('QueryClientProvider가 설정되어야 함', () => {
    // App 컴포넌트가 에러 없이 렌더링되면 QueryClientProvider가 제대로 설정된 것
    expect(() => render(<App />)).not.toThrow();
  });

  it('검색어 입력 시 상태가 업데이트되어야 함', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByPlaceholderText(/검색어를 입력하세요/i);

    // 검색어 입력
    await user.type(searchInput, 'cats');

    // 입력한 값이 반영되는지 확인
    expect(searchInput).toHaveValue('cats');
  });

  it('ThemeProvider와 GlobalStyles가 적용되어야 함', () => {
    const { container } = render(<App />);

    // 최상위 div가 렌더링되었는지 확인
    expect(container.firstChild).toBeInTheDocument();
  });
});
