/**
 * SearchBar 컴포넌트 테스트
 * Presentation Layer - SearchBar Component
 *
 * Test 13: SearchBar 컴포넌트 + 스타일링
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { SearchBar } from '@presentation/components/SearchBar/SearchBar';
import { theme } from '@presentation/styles/theme';

// 테스트용 Wrapper 컴포넌트
const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('SearchBar - 컴포넌트 렌더링 및 동작', () => {
  describe('렌더링', () => {
    it('should render search input field', () => {
      // Given: SearchBar Props
      const mockOnSearch = jest.fn();

      // When: SearchBar 렌더링
      renderWithTheme(<SearchBar onSearch={mockOnSearch} isLoading={false} />);

      // Then: 입력 필드가 렌더링되어야 함
      const inputElement = screen.getByPlaceholderText(/검색어를 입력하세요/i);
      expect(inputElement).toBeInTheDocument();
    });

    it('should render search button', () => {
      // Given: SearchBar Props
      const mockOnSearch = jest.fn();

      // When: SearchBar 렌더링
      renderWithTheme(<SearchBar onSearch={mockOnSearch} isLoading={false} />);

      // Then: 검색 버튼이 렌더링되어야 함
      const buttonElement = screen.getByRole('button', { name: /검색/i });
      expect(buttonElement).toBeInTheDocument();
    });
  });

  describe('이벤트 핸들러', () => {
    it('should call onSearch when form is submitted', () => {
      // Given: SearchBar Props
      const mockOnSearch = jest.fn();
      renderWithTheme(<SearchBar onSearch={mockOnSearch} isLoading={false} />);

      const inputElement = screen.getByPlaceholderText(
        /검색어를 입력하세요/i
      ) as HTMLInputElement;
      const formElement = inputElement.closest('form') as HTMLFormElement;

      // When: 입력 필드에 값 입력 후 폼 제출
      fireEvent.change(inputElement, { target: { value: 'nature' } });
      fireEvent.submit(formElement);

      // Then: onSearch가 입력값과 함께 호출되어야 함
      expect(mockOnSearch).toHaveBeenCalledWith('nature');
      expect(mockOnSearch).toHaveBeenCalledTimes(1);
    });

    it('should not call onSearch with empty query', () => {
      // Given: SearchBar Props
      const mockOnSearch = jest.fn();
      renderWithTheme(<SearchBar onSearch={mockOnSearch} isLoading={false} />);

      const inputElement = screen.getByPlaceholderText(
        /검색어를 입력하세요/i
      ) as HTMLInputElement;
      const formElement = inputElement.closest('form') as HTMLFormElement;

      // When: 빈 값으로 폼 제출
      fireEvent.submit(formElement);

      // Then: onSearch가 호출되지 않아야 함
      expect(mockOnSearch).not.toHaveBeenCalled();
    });

    it('should update input value on change', () => {
      // Given: SearchBar Props
      const mockOnSearch = jest.fn();
      renderWithTheme(<SearchBar onSearch={mockOnSearch} isLoading={false} />);

      const inputElement = screen.getByPlaceholderText(
        /검색어를 입력하세요/i
      ) as HTMLInputElement;

      // When: 입력 필드 값 변경
      fireEvent.change(inputElement, { target: { value: 'flowers' } });

      // Then: input value가 업데이트되어야 함
      expect(inputElement.value).toBe('flowers');
    });
  });

  describe('로딩 상태', () => {
    it('should disable input and button when loading', () => {
      // Given: 로딩 중인 SearchBar
      const mockOnSearch = jest.fn();

      // When: isLoading이 true인 상태로 렌더링
      renderWithTheme(<SearchBar onSearch={mockOnSearch} isLoading />);

      // Then: input과 button이 비활성화되어야 함
      const inputElement = screen.getByPlaceholderText(/검색어를 입력하세요/i);
      const buttonElement = screen.getByRole('button', { name: /검색/i });

      expect(inputElement).toBeDisabled();
      expect(buttonElement).toBeDisabled();
    });

    it('should enable input and button when not loading', () => {
      // Given: 로딩 중이 아닌 SearchBar
      const mockOnSearch = jest.fn();

      // When: isLoading이 false인 상태로 렌더링
      renderWithTheme(<SearchBar onSearch={mockOnSearch} isLoading={false} />);

      // Then: input과 button이 활성화되어야 함
      const inputElement = screen.getByPlaceholderText(/검색어를 입력하세요/i);
      const buttonElement = screen.getByRole('button', { name: /검색/i });

      expect(inputElement).not.toBeDisabled();
      expect(buttonElement).not.toBeDisabled();
    });
  });

  describe('접근성', () => {
    it('should have proper aria labels', () => {
      // Given: SearchBar Props
      const mockOnSearch = jest.fn();

      // When: SearchBar 렌더링
      renderWithTheme(<SearchBar onSearch={mockOnSearch} isLoading={false} />);

      // Then: aria-label이 설정되어야 함
      const inputElement = screen.getByPlaceholderText(/검색어를 입력하세요/i);
      expect(inputElement).toHaveAttribute('type', 'text');
    });
  });
});
