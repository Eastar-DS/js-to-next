import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '@/features/paginate-images/ui/Pagination';

describe('Pagination 컴포넌트', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('이전/다음 버튼과 페이지 정보를 렌더링해야 한다', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByRole('button', { name: /이전/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /다음/i })).toBeInTheDocument();
    expect(screen.getByText(/2/)).toBeInTheDocument();
    expect(screen.getByText(/5/)).toBeInTheDocument();
  });

  it('현재 페이지 정보를 표시해야 한다', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText(/3/)).toBeInTheDocument();
    expect(screen.getByText(/10/)).toBeInTheDocument();
  });

  it('다음 버튼 클릭 시 onPageChange를 호출해야 한다', async () => {
    const user = userEvent.setup();
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByRole('button', { name: /다음/i });
    await user.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
  });

  it('이전 버튼 클릭 시 onPageChange를 호출해야 한다', async () => {
    const user = userEvent.setup();
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByRole('button', { name: /이전/i });
    await user.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
  });

  it('첫 페이지에서 이전 버튼이 비활성화되어야 한다', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByRole('button', { name: /이전/i });
    expect(prevButton).toBeDisabled();
  });

  it('마지막 페이지에서 다음 버튼이 비활성화되어야 한다', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByRole('button', { name: /다음/i });
    expect(nextButton).toBeDisabled();
  });

  it('비활성화된 버튼 클릭 시 onPageChange를 호출하지 않아야 한다', async () => {
    const user = userEvent.setup();
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByRole('button', { name: /이전/i });
    await user.click(prevButton);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('페이지가 1개만 있을 때 양쪽 버튼이 모두 비활성화되어야 한다', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByRole('button', { name: /이전/i });
    const nextButton = screen.getByRole('button', { name: /다음/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
});
