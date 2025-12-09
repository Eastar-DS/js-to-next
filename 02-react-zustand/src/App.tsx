import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@presentation/styles/theme';
import { GlobalStyles } from '@presentation/styles/GlobalStyles';
import { SearchBar } from '@presentation/components/SearchBar/SearchBar';
import { ImageGrid } from '@presentation/components/ImageGrid/ImageGrid';
import { Pagination } from '@presentation/components/Pagination/Pagination';
import type { Image } from '@domain/entities/Image';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images] = useState<Image[]>([]);
  const [error] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (query: string) => {
    console.log('검색어:', query);
    setIsLoading(true);
    // TODO: 실제 검색 기능은 나중에 구현
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handlePageChange = (page: number) => {
    console.log('페이지 변경:', page);
    setCurrentPage(page);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div style={{ minHeight: '100vh', backgroundColor: theme.colors.background }}>
        <h1 style={{ textAlign: 'center', padding: '20px', color: theme.colors.text }}>
          Image Search App (Components Preview)
        </h1>
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        <ImageGrid images={images} isLoading={isLoading} error={error} />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <Pagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
