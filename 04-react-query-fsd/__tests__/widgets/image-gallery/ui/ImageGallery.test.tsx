import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ImageGallery } from '@/widgets/image-gallery/ui/ImageGallery';
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
  {
    id: 2,
    tags: ['city', 'urban'],
    previewURL: "https://example.com/preview.jpg",
    webformatURL: 'https://example.com/image2.jpg',
    largeImageURL: 'https://example.com/image2_large.jpg',
    user: 'photographer2',
    likes: 200,
    views: 2000,
  downloads: 25,
  },
];

describe('ImageGallery 위젯', () => {
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

  it('query와 page props를 받아 렌더링해야 한다', () => {
    (imageApi.getImagesByPage as jest.Mock).mockResolvedValueOnce(mockImages);

    renderWithQueryClient(<ImageGallery query="nature" page={1} />);

    expect(screen.getByTestId('image-gallery')).toBeInTheDocument();
  });

  it('로딩 상태일 때 로딩 메시지를 표시해야 한다', () => {
    (imageApi.getImagesByPage as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    renderWithQueryClient(<ImageGallery query="nature" page={1} />);

    expect(screen.getByText(/로딩/i)).toBeInTheDocument();
  });

  it('에러 상태일 때 에러 메시지를 표시해야 한다', async () => {
    (imageApi.getImagesByPage as jest.Mock).mockRejectedValueOnce(
      new Error('API Error')
    );

    renderWithQueryClient(<ImageGallery query="nature" page={1} />);

    await waitFor(() => {
      expect(screen.getByText(/에러/i)).toBeInTheDocument();
    });
  });

  it('성공 상태일 때 ImageGrid를 렌더링해야 한다', async () => {
    (imageApi.getImagesByPage as jest.Mock).mockResolvedValueOnce(mockImages);

    renderWithQueryClient(<ImageGallery query="nature" page={1} />);

    await waitFor(() => {
      expect(screen.getByTestId('image-grid')).toBeInTheDocument();
    });
  });

  it('성공 시 이미지 데이터를 ImageGrid에 전달해야 한다', async () => {
    (imageApi.getImagesByPage as jest.Mock).mockResolvedValueOnce(mockImages);

    renderWithQueryClient(<ImageGallery query="nature" page={1} />);

    await waitFor(() => {
      expect(screen.getByAltText('nature, landscape')).toBeInTheDocument();
      expect(screen.getByAltText('city, urban')).toBeInTheDocument();
    });
  });

  it('빈 query일 때는 아무것도 렌더링하지 않아야 한다', () => {
    renderWithQueryClient(<ImageGallery query="" page={1} />);

    expect(screen.queryByTestId('image-gallery')).not.toBeInTheDocument();
    expect(imageApi.getImagesByPage).not.toHaveBeenCalled();
  });

  it('page가 변경되면 새로운 데이터를 가져와야 한다', async () => {
    (imageApi.getImagesByPage as jest.Mock).mockResolvedValue(mockImages);

    const { rerender } = renderWithQueryClient(
      <ImageGallery query="nature" page={1} />
    );

    await waitFor(() => {
      expect(imageApi.getImagesByPage).toHaveBeenCalledWith('nature', 1);
    });

    rerender(
      <QueryClientProvider client={queryClient}>
        <ImageGallery query="nature" page={2} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(imageApi.getImagesByPage).toHaveBeenCalledWith('nature', 2);
    });
  });

  it('데이터가 비어있을 때 빈 상태를 표시해야 한다', async () => {
    (imageApi.getImagesByPage as jest.Mock).mockResolvedValueOnce([]);

    renderWithQueryClient(<ImageGallery query="nature" page={1} />);

    await waitFor(() => {
      expect(screen.getByText(/이미지가 없습니다/i)).toBeInTheDocument();
    });
  });
});
