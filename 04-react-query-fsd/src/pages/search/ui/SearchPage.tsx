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
    <div data-testid="search-page" className="flex flex-col gap-6 p-6">
      <SearchForm onSearch={handleSearch} />

      {query && (
        <>
          <ImageGallery query={query} page={page} />
          <Pagination
            currentPage={page}
            totalPages={10}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
