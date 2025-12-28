import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchPage } from '@/pages/search/ui/SearchPage';
import * as imageApi from '@/entities/image/api/imageApi';
import type { Image } from '@/entities/image/model/types';

jest.mock('@/entities/image/api/imageApi');

const mockImages: Image[] = [
  {
    id: 1,
    tags: ['nature', 'landscape'],
    previewURL: "https://example.com/preview.jpg",
    webformatURL: 'https://example.com/image1.jpg',
    largeImageURL: 'https://example.com/image1_large.jpg',
    user: 'photographer1',
    likes: 100,
    views: 1000,
  downloads: 25,
  },
];

describe('SearchPage', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    jest.clearAllMocks();
  });

  const renderWithQueryClient = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  it('SearchForm, ImageGallery, Pagination을 렌더링해야 한다', () => {
    renderWithQueryClient(<SearchPage />);

    expect(screen.getByPlaceholderText(/검색/i)).toBeInTheDocument();
  });

  it('검색어를 입력하고 검색하면 ImageGallery가 표시되어야 한다', async () => {
    (imageApi.getImagesByPage as jest.Mock).mockResolvedValueOnce(mockImages);

    const user = userEvent.setup();
    renderWithQueryClient(<SearchPage />);

    const input = screen.getByPlaceholderText(/검색/i);
    const button = screen.getByRole('button', { name: /검색/i });

    await user.type(input, 'nature');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('image-gallery')).toBeInTheDocument();
    });
  });

  it('검색 시 page를 1로 리셋해야 한다', async () => {
    (imageApi.getImagesByPage as jest.Mock).mockResolvedValue(mockImages);

    const user = userEvent.setup();
    renderWithQueryClient(<SearchPage />);

    const input = screen.getByPlaceholderText(/검색/i);
    const searchButton = screen.getByRole('button', { name: /검색/i });

    await user.type(input, 'nature');
    await user.click(searchButton);

    await waitFor(() => {
      expect(imageApi.getImagesByPage).toHaveBeenCalledWith('nature', 1);
    });
  });

  it('페이지 변경 버튼 클릭 시 page가 변경되어야 한다', async () => {
    (imageApi.getImagesByPage as jest.Mock).mockResolvedValue(mockImages);

    const user = userEvent.setup();
    renderWithQueryClient(<SearchPage />);

    const input = screen.getByPlaceholderText(/검색/i);
    const searchButton = screen.getByRole('button', { name: /검색/i });

    await user.type(input, 'nature');
    await user.click(searchButton);

    await waitFor(() => {
      expect(imageApi.getImagesByPage).toHaveBeenCalledWith('nature', 1);
    });

    const nextButton = screen.getByRole('button', { name: /다음/i });
    await user.click(nextButton);

    await waitFor(() => {
      expect(imageApi.getImagesByPage).toHaveBeenCalledWith('nature', 2);
    });
  });

  it('새로운 검색어로 검색하면 page가 1로 리셋되어야 한다', async () => {
    (imageApi.getImagesByPage as jest.Mock).mockResolvedValue(mockImages);

    const user = userEvent.setup();
    renderWithQueryClient(<SearchPage />);

    const input = screen.getByPlaceholderText(/검색/i);
    const searchButton = screen.getByRole('button', { name: /검색/i });

    // 첫 번째 검색
    await user.type(input, 'nature');
    await user.click(searchButton);

    await waitFor(() => {
      expect(imageApi.getImagesByPage).toHaveBeenCalledWith('nature', 1);
    });

    // 페이지 이동
    const nextButton = screen.getByRole('button', { name: /다음/i });
    await user.click(nextButton);

    await waitFor(() => {
      expect(imageApi.getImagesByPage).toHaveBeenCalledWith('nature', 2);
    });

    // 새로운 검색어로 검색
    await user.clear(input);
    await user.type(input, 'city');
    await user.click(searchButton);

    await waitFor(() => {
      expect(imageApi.getImagesByPage).toHaveBeenCalledWith('city', 1);
    });
  });

  it('초기 상태에서는 ImageGallery를 표시하지 않아야 한다', () => {
    renderWithQueryClient(<SearchPage />);

    expect(screen.queryByTestId('image-gallery')).not.toBeInTheDocument();
  });

  it('Tailwind Flexbox 레이아웃을 사용해야 한다', () => {
    renderWithQueryClient(<SearchPage />);

    const container = screen.getByTestId('search-page');
    expect(container).toHaveClass('flex', 'flex-col');
  });
});
