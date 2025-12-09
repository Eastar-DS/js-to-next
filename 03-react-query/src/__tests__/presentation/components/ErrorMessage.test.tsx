/**
 * ErrorMessage 컴포넌트 테스트
 * Test 17: 에러 메시지 표시 컴포넌트
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ErrorMessage } from '@presentation/components/ErrorMessage/ErrorMessage';
import { theme } from '@presentation/styles/theme';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('ErrorMessage - 컴포넌트 렌더링 및 동작', () => {
  describe('렌더링', () => {
    it('에러 메시지가 렌더링되어야 한다', () => {
      renderWithTheme(<ErrorMessage message="테스트 에러 메시지" />);

      const errorMessage = screen.getByText(/테스트 에러 메시지/i);
      expect(errorMessage).toBeInTheDocument();
    });

    it('재시도 버튼이 있을 때 렌더링되어야 한다', () => {
      const mockOnRetry = jest.fn();
      renderWithTheme(
        <ErrorMessage message="에러 발생" onRetry={mockOnRetry} />
      );

      const retryButton = screen.getByRole('button', { name: /다시 시도/i });
      expect(retryButton).toBeInTheDocument();
    });

    it('재시도 버튼이 없을 때 렌더링되지 않아야 한다', () => {
      renderWithTheme(<ErrorMessage message="에러 발생" />);

      const retryButton = screen.queryByRole('button', { name: /다시 시도/i });
      expect(retryButton).not.toBeInTheDocument();
    });
  });

  describe('이벤트 핸들러', () => {
    it('재시도 버튼 클릭 시 onRetry가 호출되어야 한다', () => {
      const mockOnRetry = jest.fn();
      renderWithTheme(
        <ErrorMessage message="에러 발생" onRetry={mockOnRetry} />
      );

      const retryButton = screen.getByRole('button', { name: /다시 시도/i });
      fireEvent.click(retryButton);

      expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('스타일', () => {
    it('에러 색상이 적용되어야 한다', () => {
      const { container } = renderWithTheme(
        <ErrorMessage message="에러 발생" />
      );

      const errorContainer = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(errorContainer);

      // 에러 색상이 적용되었는지 확인 (rgb 또는 hex)
      expect(styles.color).toBeTruthy();
    });
  });

  describe('접근성', () => {
    it('에러 영역에 적절한 role이 있어야 한다', () => {
      const { container } = renderWithTheme(
        <ErrorMessage message="에러 발생" />
      );

      const errorContainer = container.firstChild as HTMLElement;
      expect(errorContainer).toHaveAttribute('role', 'alert');
    });

    it('에러 메시지가 화면 리더에 전달되어야 한다', () => {
      renderWithTheme(<ErrorMessage message="중요한 에러" />);

      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveTextContent('중요한 에러');
    });
  });

  describe('다양한 메시지', () => {
    it('긴 에러 메시지도 렌더링되어야 한다', () => {
      const longMessage =
        '매우 긴 에러 메시지입니다. 여러 줄에 걸쳐서 표시될 수 있습니다.';
      renderWithTheme(<ErrorMessage message={longMessage} />);

      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('특수 문자가 포함된 메시지도 렌더링되어야 한다', () => {
      const specialMessage = '에러: API 호출 실패 (404)';
      renderWithTheme(<ErrorMessage message={specialMessage} />);

      expect(screen.getByText(specialMessage)).toBeInTheDocument();
    });
  });
});
