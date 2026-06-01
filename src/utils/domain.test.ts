import { describe, expect, it } from 'vitest';
import { getTodayIsoDate, createId, getCurrentWeekdayId } from './domain';

describe('domain utils', () => {
  it('getTodayIsoDate returns ISO string date format', () => {
    const date = getTodayIsoDate();
    expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('createId returns a valid string id', () => {
    const id1 = createId();
    const id2 = createId();
    expect(typeof id1).toBe('string');
    expect(id1.length).toBeGreaterThan(0);
    expect(id1).not.toBe(id2);
  });

  it('getCurrentWeekdayId returns a string', () => {
    const weekdayId = getCurrentWeekdayId();
    expect(typeof weekdayId).toBe('string');
  });
});
