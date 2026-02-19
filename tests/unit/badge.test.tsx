import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import { Badge } from '@/components/ui/badge';

describe('Badge', () => {
  it('renders with default variant', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full');
  });

  it('renders different variants', () => {
    const variants = ['default', 'secondary', 'outline', 'success', 'warning'];
    variants.forEach((variant) => {
      const { unmount } = render(<Badge variant={variant as any}>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toBeInTheDocument();
      unmount();
    });
  });
});
