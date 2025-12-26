import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchForm } from '@/features/search-images/ui/SearchForm';

describe('SearchForm 컴포넌트', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Input과 Button을 렌더링해야 한다', () => {
    render(<SearchForm onSearch={mockOnSearch} />);

    expect(screen.getByPlaceholderText(/검색/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /검색/i })).toBeInTheDocument();
  });

  it('검색어를 입력할 수 있어야 한다', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/검색/i);
    await user.type(input, 'nature');

    expect(input).toHaveValue('nature');
  });

  it('버튼 클릭 시 onSearch를 호출해야 한다', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/검색/i);
    const button = screen.getByRole('button', { name: /검색/i });

    await user.type(input, 'nature');
    await user.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('nature');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('Enter 키를 누르면 onSearch를 호출해야 한다', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/검색/i);

    await user.type(input, 'landscape');
    await user.keyboard('{Enter}');

    expect(mockOnSearch).toHaveBeenCalledWith('landscape');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('빈 검색어는 제출하지 않아야 한다', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} />);

    const button = screen.getByRole('button', { name: /검색/i });

    await user.click(button);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('공백만 있는 검색어는 제출하지 않아야 한다', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/검색/i);
    const button = screen.getByRole('button', { name: /검색/i });

    await user.type(input, '   ');
    await user.click(button);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('검색 후 입력 필드를 유지해야 한다', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/검색/i);
    const button = screen.getByRole('button', { name: /검색/i });

    await user.type(input, 'cats');
    await user.click(button);

    expect(input).toHaveValue('cats');
  });

  it('초기 검색어를 props로 받을 수 있어야 한다', () => {
    render(<SearchForm onSearch={mockOnSearch} initialQuery="dogs" />);

    const input = screen.getByPlaceholderText(/검색/i);
    expect(input).toHaveValue('dogs');
  });

  it('검색어 입력 중에는 Enter 키만 제출을 트리거해야 한다', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/검색/i);

    await user.type(input, 'a');
    await user.keyboard('{Backspace}');

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
