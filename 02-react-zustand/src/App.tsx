import { ThemeProvider } from 'styled-components';
import { theme } from '@presentation/styles/theme';
import { GlobalStyles } from '@presentation/styles/GlobalStyles';
import { SearchBar } from '@presentation/components/SearchBar/SearchBar';
import { ImageGrid } from '@presentation/components/ImageGrid/ImageGrid';
import { Pagination } from '@presentation/components/Pagination/Pagination';

// Domain Layer
import { SearchImagesUseCase } from '@domain/usecases/SearchImagesUseCase';
import { GetImagesByPageUseCase } from '@domain/usecases/GetImagesByPageUseCase';

// Infrastructure Layer
import { PixabayDataSource } from '@infrastructure/datasources/PixabayDataSource';
import { PixabayImageRepository } from '@infrastructure/repositories/PixabayImageRepository';
import { env } from '@infrastructure/config/env';

// Application Layer
import { createImageStore } from '@application/store/useImageStore';
import { useImageSearch } from '@application/hooks/useImageSearch';

// Infrastructure 레이어 초기화 (앱 시작 시 한 번만)
const dataSource = new PixabayDataSource(
  env.get('PIXABAY_API_KEY')
);
const repository = new PixabayImageRepository(dataSource);

// Domain 레이어 초기화
const searchImagesUseCase = new SearchImagesUseCase(repository);
const getImagesByPageUseCase = new GetImagesByPageUseCase(repository);

// Application 레이어 초기화
const useImageStore = createImageStore(
  searchImagesUseCase,
  getImagesByPageUseCase
);

const App = () => {
  // Custom Hook을 통해 상태 및 액션 가져오기
  const { images, isLoading, error, currentPage, totalPages, search, goToPage } =
    useImageSearch(useImageStore);

  // 디버깅: 이미지 개수 확인
  console.log('📊 Images count:', images.length);
  console.log('🖼️ Images:', images);

  const handleSearch = (query: string) => {
    search(query);
  };

  const handlePageChange = (page: number) => {
    goToPage(page);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <header style={{ flexShrink: 0 }}>
          <h1 style={{ textAlign: 'center', padding: '20px', color: theme.colors.text, margin: 0 }}>
            Image Search App
          </h1>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </header>
        <main style={{ flex: 1 }}>
          <ImageGrid images={images} isLoading={isLoading} error={error} />
        </main>
        {images.length > 0 && (
          <footer style={{ flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages || 5}
                onPageChange={handlePageChange}
              />
            </div>
          </footer>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
