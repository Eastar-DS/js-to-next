import React from 'react';
import { Button } from '@/shared/ui/button';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
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

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        variant="outline"
      >
        이전
      </Button>
      <span className="text-sm">
        {currentPage} / {totalPages}
      </span>
      <Button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        variant="outline"
      >
        다음
      </Button>
    </div>
  );
};
