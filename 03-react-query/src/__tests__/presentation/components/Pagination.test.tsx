/**
 * Pagination 컴포넌트 테스트
 * Test 16: 페이지네이션 UI 컴포넌트
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Pagination } from '@presentation/components/Pagination/Pagination';
import { theme } from '@presentation/styles/theme';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('Pagination - 컴포넌트 렌더링 및 동작', () => {
  describe('렌더링', () => {
    it('페이지네이션이 렌더링되어야 한다', () => {
      const mockOnPageChange = jest.fn();
      const { container } = renderWithTheme(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('이전 버튼과 다음 버튼이 렌더링되어야 한다', () => {
      const mockOnPageChange = jest.fn();
      renderWithTheme(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const prevButton = screen.getByRole('button', { name: /이전/i });
      const nextButton = screen.getByRole('button', { name: /다음/i });

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it('페이지 번호 버튼들이 렌더링되어야 한다', () => {
      const mockOnPageChange = jest.fn();
      renderWithTheme(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const page1Button = screen.getByRole('button', { name: /페이지 1/ });
      const page2Button = screen.getByRole('button', { name: /페이지 2/ });

      expect(page1Button).toBeInTheDocument();
      expect(page2Button).toBeInTheDocument();
    });

    it('현재 페이지가 활성화 표시되어야 한다', () => {
      const mockOnPageChange = jest.fn();
      renderWithTheme(
        <Pagination
          currentPage={2}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const page2Button = screen.getByRole('button', { name: /페이지 2/ });
      expect(page2Button).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('이벤트 핸들러', () => {
    it('페이지 번호 클릭 시 onPageChange가 호출되어야 한다', () => {
      const mockOnPageChange = jest.fn();
      renderWithTheme(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const page3Button = screen.getByRole('button', { name: /페이지 3/ });
      fireEvent.click(page3Button);

      expect(mockOnPageChange).toHaveBeenCalledWith(3);
      expect(mockOnPageChange).toHaveBeenCalledTimes(1);
    });

    it('다음 버튼 클릭 시 다음 페이지로 이동해야 한다', () => {
      const mockOnPageChange = jest.fn();
      renderWithTheme(
        <Pagination
          currentPage={2}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const nextButton = screen.getByRole('button', { name: /다음/i });
      fireEvent.click(nextButton);

      expect(mockOnPageChange).toHaveBeenCalledWith(3);
    });

    it('이전 버튼 클릭 시 이전 페이지로 이동해야 한다', () => {
      const mockOnPageChange = jest.fn();
      renderWithTheme(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const prevButton = screen.getByRole('button', { name: /이전/i });
      fireEvent.click(prevButton);

      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it('현재 페이지 클릭 시 onPageChange가 호출되지 않아야 한다', () => {
      const mockOnPageChange = jest.fn();
      renderWithTheme(
        <Pagination
          currentPage={2}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const page2Button = screen.getByRole('button', { name: /페이지 2/ });
      fireEvent.click(page2Button);

      expect(mockOnPageChange).not.toHaveBeenCalled();
    });
  });

  describe('버튼 비활성화', () => {
    it('첫 페이지에서 이전 버튼이 비활성화되어야 한다', () => {
      const mockOnPageChange = jest.fn();
      renderWithTheme(
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
      const mockOnPageChange = jest.fn();
      renderWithTheme(
        <Pagination
          currentPage={5}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const nextButton = screen.getByRole('button', { name: /다음/i });
      expect(nextButton).toBeDisabled();
    });

    it('첫 페이지가 아니면 이전 버튼이 활성화되어야 한다', () => {
      const mockOnPageChange = jest.fn();
      renderWithTheme(
        <Pagination
          currentPage={2}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const prevButton = screen.getByRole('button', { name: /이전/i });
      expect(prevButton).not.toBeDisabled();
    });

    it('마지막 페이지가 아니면 다음 버튼이 활성화되어야 한다', () => {
      const mockOnPageChange = jest.fn();
      renderWithTheme(
        <Pagination
          currentPage={4}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const nextButton = screen.getByRole('button', { name: /다음/i });
      expect(nextButton).not.toBeDisabled();
    });
  });

  describe('페이지 표시 범위', () => {
    it('최대 5개의 페이지 번호를 표시해야 한다', () => {
      const mockOnPageChange = jest.fn();
      renderWithTheme(
        <Pagination
          currentPage={5}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      );

      const pageButtons = screen.getAllByRole('button').filter((button) => {
        const text = button.textContent;
        return text && /^\d+$/.test(text);
      });

      expect(pageButtons.length).toBeLessThanOrEqual(5);
    });
  });

  describe('접근성', () => {
    it('페이지네이션 영역에 적절한 aria-label이 있어야 한다', () => {
      const mockOnPageChange = jest.fn();
      const { container } = renderWithTheme(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const nav = container.querySelector('nav');
      expect(nav).toHaveAttribute('aria-label', '페이지 네비게이션');
    });
  });
});
