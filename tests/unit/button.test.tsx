import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import { Button } from '@/components/ui/simple-button';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center');
  });

  it('renders different variants', () => {
    const variants = ['default', 'destructive', 'outline', 'kid', 'success'];
    variants.forEach((variant) => {
      const { unmount } = render(<Button variant={variant as any}>Test</Button>);
      const button = screen.getByRole('button', { name: /test/i });
      expect(button).toBeInTheDocument();
      unmount();
    });
  });

  it('renders different sizes', () => {
    const sizes = ['default', 'sm', 'lg', 'xl'];
    sizes.forEach((size) => {
      const { unmount } = render(<Button size={size as any}>Test</Button>);
      const button = screen.getByRole('button', { name: /test/i });
      expect(button).toBeInTheDocument();
      unmount();
    });
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
  });
});
