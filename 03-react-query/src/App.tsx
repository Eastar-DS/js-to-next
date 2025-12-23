/**
 * App 컴포넌트
 * Phase 3.5: React Query + Pagination 통합
 */

import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

// Application Layer
import { queryClient } from '@application/queryClient';
import { useImagesByPageQuery } from '@application/queries/useImagesByPageQuery';

// Domain Layer
import { GetImagesByPageUseCase } from '@domain/usecases/GetImagesByPageUseCase';

// Infrastructure Layer
import { PixabayDataSource } from '@infrastructure/datasources/PixabayDataSource';
import { PixabayImageRepository } from '@infrastructure/repositories/PixabayImageRepository';
import { env } from '@infrastructure/config/env';

// Presentation Layer
import { theme } from '@presentation/styles/theme';
import { GlobalStyles } from '@presentation/styles/GlobalStyles';
import { SearchBar } from '@presentation/components/SearchBar/SearchBar';
import { ImageGrid } from '@presentation/components/ImageGrid/ImageGrid';
import { Pagination } from '@presentation/components/Pagination/Pagination';

// Infrastructure 레이어 초기화 (앱 시작 시 한 번만)
const dataSource = new PixabayDataSource(env.get('PIXABAY_API_KEY'));
const repository = new PixabayImageRepository(dataSource);

// Domain 레이어 초기화
const getImagesByPageUseCase = new GetImagesByPageUseCase(repository);

/**
 * App 메인 컴포넌트
 * QueryClientProvider를 통해 React Query + Pagination 통합
 */
const AppContent = () => {
  // 검색어 및 페이지 상태 (useState 사용)
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  // useImagesByPageQuery 훅 사용 (React Query + Pagination)
  const { data: images = [], isLoading, error } = useImagesByPageQuery(
    query,
    page,
    getImagesByPageUseCase
  );

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1); // 새 검색 시 페이지를 1로 리셋
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: theme.colors.background,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <header style={{ flexShrink: 0 }}>
          <h1
            style={{
              textAlign: 'center',
              padding: '20px',
              color: theme.colors.text,
              margin: 0,
            }}
          >
            Image Search App
          </h1>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </header>
        <main style={{ flex: 1 }}>
          <ImageGrid images={images} isLoading={isLoading} error={error ?? null} />
        </main>
        {images.length > 0 && (
          <footer style={{ flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
              <Pagination
                currentPage={page}
                totalPages={5}
                onPageChange={handlePageChange}
              />
            </div>
          </footer>
        )}
      </div>
    </ThemeProvider>
  );
};

/**
 * App 루트 컴포넌트
 * QueryClientProvider로 React Query 제공
 */
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};

export default App;
