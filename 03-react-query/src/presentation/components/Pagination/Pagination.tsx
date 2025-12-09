/**
 * Pagination 컴포넌트
 * Presentation Layer - Pagination Component
 */

import type { PaginationProps } from '@presentation/components/types';
import {
  PaginationContainer,
  PaginationButton,
  PageNumberButton,
} from './Pagination.styles';

/**
 * 표시할 페이지 번호 범위 계산
 */
const getPageNumbers = (currentPage: number, totalPages: number): number[] => {
  const maxVisible = 5;
  const pages: number[] = [];

  if (totalPages <= maxVisible) {
    // 전체 페이지가 5개 이하면 모두 표시
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(i);
    }
  } else {
    // 현재 페이지 기준으로 앞뒤 2개씩 표시
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);

    // 끝에 도달하면 start 조정
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i += 1) {
      pages.push(i);
    }
  }

  return pages;
};

/**
 * 페이지네이션 컴포넌트
 * 페이지 이동을 위한 버튼들을 표시합니다.
 */
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
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
    <PaginationContainer as="nav" aria-label="페이지 네비게이션">
      <PaginationButton
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        이전
      </PaginationButton>

      {pageNumbers.map((page) => (
        <PageNumberButton
          key={page}
          onClick={() => handlePageClick(page)}
          $isActive={page === currentPage}
          aria-current={page === currentPage ? 'page' : undefined}
          aria-label={`페이지 ${page}`}
        >
          {page}
        </PageNumberButton>
      ))}

      <PaginationButton
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
      >
        다음
      </PaginationButton>
    </PaginationContainer>
  );
};
