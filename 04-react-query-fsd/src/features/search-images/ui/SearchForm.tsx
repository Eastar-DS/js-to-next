import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit} className="flex gap-[8px] w-full max-w-[600px] mx-auto px-[24px] py-[16px] pb-[24px]">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 py-[8px] px-[16px] text-base text-[#2c3e50] bg-white border-2 border-[#ecf0f1] rounded-[8px] transition-all duration-200 ease-in-out
                   focus:outline-none focus:border-[#3498db] focus:shadow-[0_0_0_3px_rgba(52,152,219,0.1)]
                   placeholder:text-[#ecf0f1]"
      />
      <button
        type="submit"
        className="py-[8px] px-[24px] text-base font-medium text-white bg-[#3498db] border-none rounded-[8px] cursor-pointer transition-all duration-200 ease-in-out whitespace-nowrap
                   hover:bg-[#2ecc71] hover:-translate-y-[1px] hover:shadow-[0_1px_3px_rgba(0,0,0,0.12)]
                   active:translate-y-0"
      >
        검색
      </button>
    </form>
  );
};
