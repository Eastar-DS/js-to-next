/**
 * 전체 검색 워크플로우 통합 테스트
 * Test 20: 타입 안전한 검색 플로우, 페이지네이션, 에러 핸들링, 스타일 렌더링
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@presentation/styles/theme';
import { SearchBar } from '@presentation/components/SearchBar/SearchBar';
import { ImageGrid } from '@presentation/components/ImageGrid/ImageGrid';
import { Pagination } from '@presentation/components/Pagination/Pagination';
import type { Image } from '@domain/entities/Image';
import type { Result } from '@domain/types';
import type { ImageRepository } from '@domain/repositories/ImageRepository';
import { SearchImagesUseCase } from '@domain/usecases/SearchImagesUseCase';
import { GetImagesByPageUseCase } from '@domain/usecases/GetImagesByPageUseCase';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

const mockImages: Image[] = [
  {
    id: 1,
    previewURL: 'https://example.com/1.jpg',
    largeImageURL: 'https://example.com/1-large.jpg',
    tags: 'nature, forest',
    views: 1000,
    downloads: 500,
    likes: 250,
    user: 'photographer1',
  },
  {
    id: 2,
    previewURL: 'https://example.com/2.jpg',
    largeImageURL: 'https://example.com/2-large.jpg',
    tags: 'ocean, beach',
    views: 2000,
    downloads: 1000,
    likes: 500,
    user: 'photographer2',
  },
];

describe('전체 검색 워크플로우 통합 테스트', () => {
  describe('타입 안전한 검색 플로우', () => {
    it('검색부터 결과 표시까지 전체 플로우가 타입 안전하게 동작해야 한다', async () => {
      // 1. Mock Repository
      const mockRepository: ImageRepository = {
        search: jest.fn().mockResolvedValue({
          success: true,
          data: mockImages,
        } as Result<Image[]>),
        getByPage: jest.fn(),
      };

      // 2. UseCase
      const searchUseCase = new SearchImagesUseCase(mockRepository);

      // 3. 검색 실행
      const handleSearch = async (query: string) => {
        const result = await searchUseCase.execute(query);
        return result;
      };

      const result = await handleSearch('nature');

      // 4. 타입 안전성 검증
      expect(result.success).toBe(true);
      if (result.success) {
        // 5. Presentation Layer에 전달
        const images: Image[] = result.data;
        renderWithTheme(
          <ImageGrid images={images} isLoading={false} error={null} />
        );

        // 6. UI 렌더링 검증
        const image1 = screen.getByAltText('nature, forest');
        const image2 = screen.getByAltText('ocean, beach');

        expect(image1).toBeInTheDocument();
        expect(image2).toBeInTheDocument();
      }
    });

    it('SearchBar에서 검색 입력 시 타입 안전한 핸들러가 호출되어야 한다', () => {
      const mockOnSearch = jest.fn((query: string) => {
        // 타입 안전성 검증: query는 string이어야 함
        expect(typeof query).toBe('string');
      });

      renderWithTheme(
        <SearchBar onSearch={mockOnSearch} isLoading={false} />
      );

      const input = screen.getByPlaceholderText(/검색어를 입력하세요/i);
      const button = screen.getByRole('button', { name: /검색/i });

      // 검색어 입력
      fireEvent.change(input, { target: { value: 'nature' } });
      fireEvent.click(button);

      expect(mockOnSearch).toHaveBeenCalledWith('nature');
      expect(mockOnSearch).toHaveBeenCalledTimes(1);
    });

    it('빈 검색어는 제출되지 않아야 한다', () => {
      const mockOnSearch = jest.fn();

      renderWithTheme(
        <SearchBar onSearch={mockOnSearch} isLoading={false} />
      );

      const button = screen.getByRole('button', { name: /검색/i });
      fireEvent.click(button);

      expect(mockOnSearch).not.toHaveBeenCalled();
    });
  });

  describe('페이지네이션 타입 체크', () => {
    it('페이지 변경 시 타입 안전한 핸들러가 호출되어야 한다', () => {
      const mockOnPageChange = jest.fn((page: number) => {
        // 타입 안전성 검증: page는 number여야 함
        expect(typeof page).toBe('number');
        expect(page).toBeGreaterThan(0);
      });

      renderWithTheme(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const page3Button = screen.getByRole('button', { name: /페이지 3/ });
      fireEvent.click(page3Button);

      expect(mockOnPageChange).toHaveBeenCalledWith(3);
    });

    it('페이지네이션 플로우가 타입 안전하게 동작해야 한다', async () => {
      const page2Images: Image[] = [
        {
          id: 21,
          previewURL: 'https://example.com/21.jpg',
          largeImageURL: 'https://example.com/21-large.jpg',
          tags: 'city',
          views: 500,
          downloads: 100,
          likes: 50,
          user: 'cityPhotographer',
        },
      ];

      // Mock Repository
      const mockRepository: ImageRepository = {
        search: jest.fn(),
        getByPage: jest.fn().mockResolvedValue({
          success: true,
          data: page2Images,
        } as Result<Image[]>),
      };

      // UseCase
      const getByPageUseCase = new GetImagesByPageUseCase(mockRepository);

      // 페이지 조회
      const result = await getByPageUseCase.execute('nature', 2);

      // 타입 검증
      expect(result.success).toBe(true);
      if (result.success) {
        const images: Image[] = result.data;
        renderWithTheme(
          <ImageGrid images={images} isLoading={false} error={null} />
        );

        const cityImage = screen.getByAltText('city');
        expect(cityImage).toBeInTheDocument();
      }
    });
  });

  describe('에러 핸들링 타입 검증', () => {
    it('Repository 에러가 UseCase를 거쳐 UI까지 타입 안전하게 전달되어야 한다', async () => {
      const errorMessage = 'Network error occurred';

      // Mock Repository (에러 케이스)
      const mockRepository: ImageRepository = {
        search: jest.fn().mockResolvedValue({
          success: false,
          error: new Error(errorMessage),
        } as Result<Image[]>),
        getByPage: jest.fn(),
      };

      // UseCase
      const searchUseCase = new SearchImagesUseCase(mockRepository);
      const result = await searchUseCase.execute('nature');

      // 타입 좁히기
      expect(result.success).toBe(false);
      if (!result.success) {
        const error: Error = result.error;

        // UI 렌더링
        renderWithTheme(
          <ImageGrid images={[]} isLoading={false} error={error} />
        );

        // 에러 메시지 표시 검증
        const errorElement = screen.getByRole('alert');
        expect(errorElement).toHaveTextContent(errorMessage);
      }
    });

    it('다양한 에러 타입이 올바르게 처리되어야 한다', async () => {
      const errors = [
        new Error('API Key Invalid'),
        new Error('Network timeout'),
        new Error('Rate limit exceeded'),
      ];

      for (const error of errors) {
        const mockRepository: ImageRepository = {
          search: jest.fn().mockResolvedValue({
            success: false,
            error,
          } as Result<Image[]>),
          getByPage: jest.fn(),
        };

        const useCase = new SearchImagesUseCase(mockRepository);
        const result = await useCase.execute('test');

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error).toBeInstanceOf(Error);
          expect(result.error.message).toBe(error.message);
        }
      }
    });
  });

  describe('스타일 렌더링 확인', () => {
    it('ThemeProvider를 통해 테마가 올바르게 적용되어야 한다', () => {
      renderWithTheme(
        <ImageGrid images={mockImages} isLoading={false} error={null} />
      );

      const gridContainer = screen.getByTestId('image-grid');
      expect(gridContainer).toBeInTheDocument();

      // 스타일이 적용되었는지 확인
      const styles = window.getComputedStyle(gridContainer);
      expect(styles.display).toBe('grid');
    });

    it('로딩 상태에서 스켈레톤 UI가 렌더링되어야 한다', () => {
      renderWithTheme(
        <ImageGrid images={[]} isLoading error={null} />
      );

      const skeletonCards = screen.getAllByLabelText(/로딩 중/i);
      expect(skeletonCards.length).toBeGreaterThan(0);
    });

    it('Pagination 컴포넌트가 올바른 스타일로 렌더링되어야 한다', () => {
      const { container } = renderWithTheme(
        <Pagination currentPage={2} totalPages={5} onPageChange={jest.fn()} />
      );

      const nav = container.querySelector('nav');
      expect(nav).toHaveAttribute('aria-label', '페이지 네비게이션');

      const activePage = screen.getByRole('button', { name: /페이지 2/ });
      expect(activePage).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('전체 워크플로우 시나리오', () => {
    it('검색 → 결과 표시 → 페이지 변경 전체 플로우가 동작해야 한다', async () => {
      let currentPage = 1;
      let currentImages: Image[] = mockImages;

      // Page 1 이미지
      const page1Repository: ImageRepository = {
        search: jest.fn().mockResolvedValue({
          success: true,
          data: mockImages,
        } as Result<Image[]>),
        getByPage: jest.fn(),
      };

      // 1. 초기 검색
      const searchUseCase = new SearchImagesUseCase(page1Repository);
      const searchResult = await searchUseCase.execute('nature');

      expect(searchResult.success).toBe(true);
      if (searchResult.success) {
        currentImages = searchResult.data;
        expect(currentImages).toHaveLength(2);
      }

      // 2. UI 렌더링
      const { rerender } = renderWithTheme(
        <div>
          <ImageGrid images={currentImages} isLoading={false} error={null} />
          <Pagination
            currentPage={currentPage}
            totalPages={3}
            onPageChange={(page) => {
              currentPage = page;
            }}
          />
        </div>
      );

      // 3. 첫 페이지 이미지 확인
      expect(screen.getByAltText('nature, forest')).toBeInTheDocument();
      expect(screen.getByAltText('ocean, beach')).toBeInTheDocument();

      // 4. 페이지 변경
      const page2Images: Image[] = [
        {
          id: 21,
          previewURL: 'https://example.com/21.jpg',
          largeImageURL: 'https://example.com/21-large.jpg',
          tags: 'mountain',
          views: 1500,
          downloads: 750,
          likes: 375,
          user: 'mountainPhotographer',
        },
      ];

      const page2Repository: ImageRepository = {
        search: jest.fn(),
        getByPage: jest.fn().mockResolvedValue({
          success: true,
          data: page2Images,
        } as Result<Image[]>),
      };

      const getByPageUseCase = new GetImagesByPageUseCase(page2Repository);
      const page2Result = await getByPageUseCase.execute('nature', 2);

      expect(page2Result.success).toBe(true);
      if (page2Result.success) {
        currentImages = page2Result.data;
        currentPage = 2;
      }

      // 5. UI 업데이트
      rerender(
        <ThemeProvider theme={theme}>
          <div>
            <ImageGrid images={currentImages} isLoading={false} error={null} />
            <Pagination
              currentPage={currentPage}
              totalPages={3}
              onPageChange={(page) => {
                currentPage = page;
              }}
            />
          </div>
        </ThemeProvider>
      );

      // 6. 두 번째 페이지 이미지 확인
      expect(screen.getByAltText('mountain')).toBeInTheDocument();
      expect(screen.queryByAltText('nature, forest')).not.toBeInTheDocument();
    });

    it('에러 발생 → 에러 표시 → 재검색 플로우가 동작해야 한다', async () => {
      // 1. 초기 에러 상태
      const errorRepository: ImageRepository = {
        search: jest.fn().mockResolvedValue({
          success: false,
          error: new Error('Network error'),
        } as Result<Image[]>),
        getByPage: jest.fn(),
      };

      const useCase = new SearchImagesUseCase(errorRepository);
      const errorResult = await useCase.execute('nature');

      expect(errorResult.success).toBe(false);
      let currentError: Error | null = null;
      if (!errorResult.success) {
        currentError = errorResult.error;
      }

      // 2. 에러 UI 렌더링
      const { rerender } = renderWithTheme(
        <ImageGrid images={[]} isLoading={false} error={currentError} />
      );

      expect(screen.getByRole('alert')).toHaveTextContent('Network error');

      // 3. 재검색 (성공)
      const successRepository: ImageRepository = {
        search: jest.fn().mockResolvedValue({
          success: true,
          data: mockImages,
        } as Result<Image[]>),
        getByPage: jest.fn(),
      };

      const retryUseCase = new SearchImagesUseCase(successRepository);
      const retryResult = await retryUseCase.execute('nature');

      expect(retryResult.success).toBe(true);
      let currentImages: Image[] = [];
      if (retryResult.success) {
        currentImages = retryResult.data;
        currentError = null;
      }

      // 4. 성공 UI 렌더링
      rerender(
        <ThemeProvider theme={theme}>
          <ImageGrid images={currentImages} isLoading={false} error={currentError} />
        </ThemeProvider>
      );

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.getByAltText('nature, forest')).toBeInTheDocument();
    });
  });
});
