import { describe, expect, it } from 'vitest';
import { validateSteps, validateCardio } from './activity';

describe('activity utils', () => {
  describe('validateSteps', () => {
    it('returns 0 for invalid or empty inputs', () => {
      expect(validateSteps(undefined)).toBe(0);
      expect(validateSteps(null)).toBe(0);
      expect(validateSteps('')).toBe(0);
      expect(validateSteps('abc')).toBe(0);
      expect(validateSteps(-5)).toBe(0);
    });

    it('returns parsed integer for valid inputs', () => {
      expect(validateSteps(5000)).toBe(5000);
      expect(validateSteps('5000')).toBe(5000);
      expect(validateSteps(5000.5)).toBe(5000); // Should floor
      expect(validateSteps('5000,5')).toBe(5000); // Should floor and handle comma
    });
  });

  describe('validateCardio', () => {
    it('returns null if duration or type is invalid', () => {
      expect(validateCardio('', 30, 'medium', 200)).toBeNull();
      expect(validateCardio('Running', -5, 'medium', 200)).toBeNull();
      expect(validateCardio('Running', 'abc', 'medium', 200)).toBeNull();
    });

    it('validates and returns cardio log data', () => {
      const result = validateCardio('Running', '30,5', 'high', '200,5', '10,5');
      expect(result).not.toBeNull();
      expect(result?.type).toBe('Running');
      expect(result?.duration).toBe(30.5);
      expect(result?.intensity).toBe('high');
      expect(result?.calories).toBe(200.5);
      expect(result?.speed).toBe(10.5);
    });

    it('defaults intensity to medium if invalid', () => {
      const result = validateCardio('Walk', 30, 'extreme' as any, 100);
      expect(result?.intensity).toBe('medium');
    });
  });
});
