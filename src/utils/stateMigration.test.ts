import { describe, expect, it } from 'vitest';
import { normalizeDailyData, isDailyDataMissingRequiredKeys } from './stateMigration';
import { INITIAL_DAILY_DATA } from '../constants/state';
import type { DailyData } from '../types';

describe('stateMigration', () => {
  describe('normalizeDailyData', () => {
    it('returns default data when prev is null', () => {
      const data = normalizeDailyData(null);
      expect(data).toMatchObject(INITIAL_DAILY_DATA);
    });

    it('merges previous data with defaults', () => {
      const prev = { waterMl: 1000 } as DailyData;
      const data = normalizeDailyData(prev);
      expect(data.waterMl).toBe(1000);
      expect(data.steps).toBe(0); // From default or fixed logic
      expect(data.goals).toBeDefined();
      expect(Array.isArray(data.meals)).toBe(true);
    });
  });

  describe('isDailyDataMissingRequiredKeys', () => {
    it('returns true if missing keys', () => {
      expect(isDailyDataMissingRequiredKeys(null)).toBe(true);
      expect(isDailyDataMissingRequiredKeys({} as DailyData)).toBe(true);
    });

    it('returns false if all keys are present', () => {
      const valid: DailyData = {
        meals: [],
        waterMl: 0,
        steps: 0,
        goals: INITIAL_DAILY_DATA.goals,
        weightHistory: [],
        plannedMeals: [],
        plannedWorkouts: [],
        workouts: [],
        workoutLogs: [],
        cardioLogs: [],
        theme: 'light',
        lastActiveDate: '2023-01-01',
        history: {},
      };
      expect(isDailyDataMissingRequiredKeys(valid)).toBe(false);
    });
  });
});
