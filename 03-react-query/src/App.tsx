/**
 * App 컴포넌트
 * Phase 3.6: React Query + useImageSearch 커스텀 훅
 */

import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

// Application Layer
import { queryClient } from '@application/queryClient';
import { useImageSearch } from '@application/hooks/useImageSearch';

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
 * QueryClientProvider를 통해 React Query + useImageSearch 커스텀 훅 통합
 */
const AppContent = () => {
  // useImageSearch 커스텀 훅 사용 (상태 관리 로직 캡슐화)
  const { images, isLoading, error, currentPage, search, goToPage } = useImageSearch(
    getImagesByPageUseCase
  );

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
          <SearchBar onSearch={search} isLoading={isLoading} />
        </header>
        <main style={{ flex: 1 }}>
          <ImageGrid images={images} isLoading={isLoading} error={error ?? null} />
        </main>
        {images.length > 0 && (
          <footer style={{ flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
              <Pagination
                currentPage={currentPage}
                totalPages={5}
                onPageChange={goToPage}
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
