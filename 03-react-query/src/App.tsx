/**
 * App 컴포넌트
 * Phase 3.4: React Query 기본 통합
 */

import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

// Application Layer
import { queryClient } from '@application/queryClient';
import { useImagesQuery } from '@application/queries/useImagesQuery';

// Domain Layer
import { SearchImagesUseCase } from '@domain/usecases/SearchImagesUseCase';

// Infrastructure Layer
import { PixabayDataSource } from '@infrastructure/datasources/PixabayDataSource';
import { PixabayImageRepository } from '@infrastructure/repositories/PixabayImageRepository';
import { env } from '@infrastructure/config/env';

// Presentation Layer
import { theme } from '@presentation/styles/theme';
import { GlobalStyles } from '@presentation/styles/GlobalStyles';
import { SearchBar } from '@presentation/components/SearchBar/SearchBar';
import { ImageGrid } from '@presentation/components/ImageGrid/ImageGrid';

// Infrastructure 레이어 초기화 (앱 시작 시 한 번만)
const dataSource = new PixabayDataSource(env.get('PIXABAY_API_KEY'));
const repository = new PixabayImageRepository(dataSource);

// Domain 레이어 초기화
const searchImagesUseCase = new SearchImagesUseCase(repository);

/**
 * App 메인 컴포넌트
 * QueryClientProvider를 통해 React Query 통합
 */
const AppContent = () => {
  // 검색어 상태 (useState 사용)
  const [query, setQuery] = useState('');

  // useImagesQuery 훅 사용 (React Query)
  const { data: images = [], isLoading, error } = useImagesQuery(query, searchImagesUseCase);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
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
