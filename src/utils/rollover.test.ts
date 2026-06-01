import { describe, expect, it } from 'vitest';
import { applyDailyRollover } from './rollover';
import type { DailyData } from '../types';

describe('applyDailyRollover', () => {
  const dummyData: DailyData = {
    meals: [{ id: '1', name: 'Meal 1', calories: 500, protein: 30, carbs: 40, fats: 10, timestamp: 12345 }],
    waterMl: 1000,
    steps: 5000,
    goals: { calories: 2000, protein: 150, carbs: 250, fats: 65, water: 2500 },
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

  it('does not change data if today is the same as lastActiveDate', () => {
    const { data, changed } = applyDailyRollover(dummyData, '2023-01-01');
    expect(changed).toBe(false);
    expect(data).toBe(dummyData);
  });

  it('performs rollover if today is different', () => {
    const { data, changed } = applyDailyRollover(dummyData, '2023-01-02');
    expect(changed).toBe(true);
    expect(data.lastActiveDate).toBe('2023-01-02');
    expect(data.meals.length).toBe(0);
    expect(data.waterMl).toBe(0);
    expect(data.steps).toBe(0);
    expect(data.history['2023-01-01']).toBeDefined();
    expect(data.history['2023-01-01'].waterMl).toBe(1000);
    expect(data.history['2023-01-01'].meals.length).toBe(1);
  });
});
