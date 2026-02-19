import { describe, it, expect, jest } from '@jest/globals';
import { cn, formatDate, formatDateTime, truncateText, calculatePercentage, validateEmail, validatePassword } from '@/lib/utils';

describe('Utils', () => {
  describe('cn', () => {
    it('combines class names correctly', () => {
      const result = cn('foo', 'bar', { baz: true, qux: false });
      expect(result).toContain('foo');
      expect(result).toContain('bar');
      expect(result).toContain('baz');
      expect(result).not.toContain('qux');
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date);
      expect(result).toBe('2024年1月15日');
    });
  });

  describe('formatDateTime', () => {
    it('formats date and time correctly', () => {
      const date = new Date('2024-01-15T10:30:00');
      const result = formatDateTime(date);
      expect(result).toContain('2024年1月15日');
      expect(result).toContain('10:30');
    });
  });

  describe('truncateText', () => {
    it('truncates long text', () => {
      const longText = 'This is a very long text that should be truncated';
      const result = truncateText(longText, 20);
      expect(result).toBe('This is a very long...');
    });

    it('does not truncate short text', () => {
      const shortText = 'Short';
      const result = truncateText(shortText, 10);
      expect(result).toBe('Short');
    });
  });

  describe('calculatePercentage', () => {
    it('calculates percentage correctly', () => {
      expect(calculatePercentage(50, 100)).toBe(50);
      expect(calculatePercentage(0, 100)).toBe(0);
      expect(calculatePercentage(100, 0)).toBe(0);
    });
  });

  describe('validateEmail', () => {
    it('validates valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('rejects invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('validates strong password', () => {
      const result = validatePassword('Password123');
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('rejects weak password', () => {
      const result = validatePassword('weak');
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(3);
    });
  });
});
