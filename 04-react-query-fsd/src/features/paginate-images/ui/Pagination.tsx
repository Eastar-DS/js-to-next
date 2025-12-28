import React from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getPageNumbers = (currentPage: number, totalPages: number): number[] => {
  const maxVisible = 5;
  const pages: number[] = [];

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(i);
    }
  } else {
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i += 1) {
      pages.push(i);
    }
  }

  return pages;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav aria-label="페이지 네비게이션" className="flex justify-center items-center gap-2 my-6">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
        className="py-2 px-4 text-base font-medium text-[#2c3e50] bg-white border border-[#ecf0f1] rounded-[4px] cursor-pointer transition-all duration-200 ease-in-out
                   hover:bg-[#f8f9fa] hover:border-[#3498db]
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        이전
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          aria-label={`페이지 ${page}`}
          className={`min-w-[40px] py-2 px-4 text-base font-medium border rounded-[4px] cursor-pointer transition-all duration-200 ease-in-out ${
            page === currentPage
              ? 'bg-[#3498db] text-white border-[#3498db]'
              : 'bg-white text-[#2c3e50] border-[#ecf0f1] hover:bg-[#f8f9fa]'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
        className="py-2 px-4 text-base font-medium text-[#2c3e50] bg-white border border-[#ecf0f1] rounded-[4px] cursor-pointer transition-all duration-200 ease-in-out
                   hover:bg-[#f8f9fa] hover:border-[#3498db]
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        다음
      </button>
    </nav>
  );
};
