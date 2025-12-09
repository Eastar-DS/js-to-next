/**
 * SearchBar 컴포넌트
 * Presentation Layer - Search Input Component
 */

import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import type { SearchBarProps } from '@presentation/components/types';
import { SearchForm, SearchInput, SearchButton } from './SearchBar.styles';

/**
 * 검색창 컴포넌트
 * 사용자 입력을 받아 검색 이벤트를 발생시킵니다.
 */
export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 빈 검색어는 제출하지 않음
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  /**
   * 입력 필드 변경 핸들러
   */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchInput
        type="text"
        placeholder="검색어를 입력하세요"
        value={query}
        onChange={handleInputChange}
        disabled={isLoading}
      />
      <SearchButton type="submit" disabled={isLoading}>
        {isLoading ? '검색 중...' : '검색'}
      </SearchButton>
    </SearchForm>
  );
};
