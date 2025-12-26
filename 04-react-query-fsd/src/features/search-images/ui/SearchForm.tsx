import React, { useState } from 'react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

export interface SearchFormProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedQuery = query.trim();
    if (trimmedQuery.length === 0) {
      return;
    }

    onSearch(trimmedQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="이미지 검색..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1"
      />
      <Button type="submit">검색</Button>
    </form>
  );
};
