import React, { useState } from 'react';
import { SearchForm } from '@/features/search-images/ui/SearchForm';
import { ImageGallery } from '@/widgets/image-gallery/ui/ImageGallery';
import { Pagination } from '@/features/paginate-images/ui/Pagination';

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div data-testid="search-page" className="min-h-screen bg-white flex flex-col">
      <header className="flex-shrink-0">
        <h1 className="text-center p-5 text-gray-800 m-0 text-2xl font-normal">
          Image Search App
        </h1>
        <SearchForm onSearch={handleSearch} />
      </header>

      <main className="flex-1">
        {query && <ImageGallery query={query} page={page} />}
      </main>

      {query && (
        <footer className="flex-shrink-0">
          <div className="flex justify-center p-5">
            <Pagination
              currentPage={page}
              totalPages={10}
              onPageChange={handlePageChange}
            />
          </div>
        </footer>
      )}
    </div>
  );
};
