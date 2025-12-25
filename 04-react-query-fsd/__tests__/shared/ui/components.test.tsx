import { render, screen } from '@testing-library/react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Card, CardHeader, CardContent } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';

describe('shadcn/ui 컴포넌트', () => {
  describe('Button 컴포넌트', () => {
    it('default variant로 렌더링되어야 한다', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
    });

    it('destructive variant로 렌더링되어야 한다', () => {
      render(<Button variant="destructive">Delete</Button>);
      const button = screen.getByRole('button', { name: /delete/i });
      expect(button).toBeInTheDocument();
      expect(button.className).toContain('bg-destructive');
    });

    it('outline variant로 렌더링되어야 한다', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button', { name: /outline/i });
      expect(button).toBeInTheDocument();
      expect(button.className).toContain('border');
    });

    it('ghost variant로 렌더링되어야 한다', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button', { name: /ghost/i });
      expect(button).toBeInTheDocument();
      expect(button.className).toContain('hover:bg-accent');
    });

    it('sm size로 렌더링되어야 한다', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button', { name: /small/i });
      expect(button).toBeInTheDocument();
      expect(button.className).toContain('h-9');
    });

    it('lg size로 렌더링되어야 한다', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button', { name: /large/i });
      expect(button).toBeInTheDocument();
      expect(button.className).toContain('h-11');
    });
  });

  describe('Input 컴포넌트', () => {
    it('렌더링되어야 한다', () => {
      render(<Input placeholder="Enter text" />);
      const input = screen.getByPlaceholderText(/enter text/i);
      expect(input).toBeInTheDocument();
    });
  });

  describe('Card 컴포넌트', () => {
    it('렌더링되어야 한다', () => {
      render(
        <Card>
          <CardHeader>Header</CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Skeleton 컴포넌트', () => {
    it('렌더링되어야 한다', () => {
      const { container } = render(<Skeleton className="h-4 w-20" />);
      const skeleton = container.querySelector('.h-4');
      expect(skeleton).toBeInTheDocument();
    });
  });
});
