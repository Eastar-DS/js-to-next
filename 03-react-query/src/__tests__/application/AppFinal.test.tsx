/**
 * App.tsx 최종 통합 테스트
 * Phase 3.7: React Query + useImageSearch + DevTools 완성
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

// Mock env 모듈
jest.mock('@infrastructure/config/env', () => ({
  env: {
    get: jest.fn((key: string) => {
      if (key === 'PIXABAY_API_KEY') return 'test-api-key';
      return '';
    }),
  },
}));

// Mock fetch
global.fetch = jest.fn();

describe('App 최종 통합 테스트 (Phase 3.7)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('useImageSearch 훅이 올바르게 통합되어야 함', () => {
    render(<App />);

    // useImageSearch에서 제공하는 모든 요소가 렌더링되는지 확인
    expect(screen.getByText(/Image Search App/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/검색어를 입력하세요/i)).toBeInTheDocument();
  });

  it('검색 기능이 전체 플로우대로 동작해야 함', async () => {
    const user = userEvent.setup();

    // Mock API 응답
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        hits: [
          {
            id: 1,
            pageURL: 'https://pixabay.com/1',
            previewURL: 'https://preview1.jpg',
            largeImageURL: 'https://large1.jpg',
            tags: 'cat, cute',
            user: 'user1',
            likes: 100,
            views: 1000,
            downloads: 50,
          },
        ],
        total: 100,
        totalHits: 100,
      }),
    });

    render(<App />);

    const searchInput = screen.getByPlaceholderText(/검색어를 입력하세요/i);
    const searchButton = screen.getByRole('button', { name: /검색/i });

    // 검색어 입력
    await user.type(searchInput, 'cats');
    await user.click(searchButton);

    // 결과 렌더링 확인 (이미지 alt 속성으로 확인)
    await waitFor(() => {
      expect(screen.getByAltText(/cat, cute/i)).toBeInTheDocument();
    });
  });

  it('페이지네이션이 동작해야 함', async () => {
    const user = userEvent.setup();

    // Mock API 응답 - 첫 페이지
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        hits: [
          {
            id: 1,
            pageURL: 'https://pixabay.com/1',
            previewURL: 'https://preview1.jpg',
            largeImageURL: 'https://large1.jpg',
            tags: 'page 1',
            user: 'user1',
            likes: 100,
            views: 1000,
            downloads: 50,
          },
        ],
        total: 100,
        totalHits: 100,
      }),
    });

    render(<App />);

    const searchInput = screen.getByPlaceholderText(/검색어를 입력하세요/i);
    const searchButton = screen.getByRole('button', { name: /검색/i });

    // 검색
    await user.type(searchInput, 'test');
    await user.click(searchButton);

    // 첫 페이지 결과 확인
    await waitFor(() => {
      expect(screen.getByAltText(/page 1/i)).toBeInTheDocument();
    });

    // Mock API 응답 - 두 번째 페이지
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        hits: [
          {
            id: 2,
            pageURL: 'https://pixabay.com/2',
            previewURL: 'https://preview2.jpg',
            largeImageURL: 'https://large2.jpg',
            tags: 'page 2',
            user: 'user2',
            likes: 200,
            views: 2000,
            downloads: 100,
          },
        ],
        total: 100,
        totalHits: 100,
      }),
    });

    // 다음 페이지 클릭
    const nextButton = screen.getByRole('button', { name: /2/i });
    await user.click(nextButton);

    // 두 번째 페이지 결과 확인
    await waitFor(() => {
      expect(screen.getByAltText(/page 2/i)).toBeInTheDocument();
    });
  });

  it('ImageGrid 컴포넌트가 렌더링되어야 함', () => {
    render(<App />);

    // ImageGrid 컴포넌트가 렌더링되는지 확인
    const imageGrid = screen.getByTestId('image-grid');
    expect(imageGrid).toBeInTheDocument();
  });

  it('Pagination 컴포넌트가 조건부로 렌더링되어야 함', async () => {
    const user = userEvent.setup();

    // Mock API 응답
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        hits: [
          {
            id: 1,
            pageURL: 'https://pixabay.com/1',
            previewURL: 'https://preview1.jpg',
            largeImageURL: 'https://large1.jpg',
            tags: 'test',
            user: 'user1',
            likes: 100,
            views: 1000,
            downloads: 50,
          },
        ],
        total: 100,
        totalHits: 100,
      }),
    });

    render(<App />);

    // 초기에는 Pagination이 없어야 함 (images.length === 0)
    expect(screen.queryByRole('navigation', { name: /페이지 네비게이션/i })).not.toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/검색어를 입력하세요/i);
    const searchButton = screen.getByRole('button', { name: /검색/i });

    await user.type(searchInput, 'test');
    await user.click(searchButton);

    // 검색 후에는 Pagination이 나타나야 함
    await waitFor(() => {
      expect(screen.getByRole('navigation', { name: /페이지 네비게이션/i })).toBeInTheDocument();
    });
  });

  it('모든 컴포넌트가 올바르게 통합되어야 함', () => {
    render(<App />);

    // SearchBar 존재 확인
    expect(screen.getByPlaceholderText(/검색어를 입력하세요/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /검색/i })).toBeInTheDocument();

    // ThemeProvider와 GlobalStyles 적용 확인 (렌더링 에러 없음)
    expect(screen.getByText(/Image Search App/i)).toBeInTheDocument();
  });
});
