import type { DailyData } from '../types';

export function applyDailyRollover(data: DailyData, today: string): { data: DailyData; changed: boolean } {
  if (data.lastActiveDate === today) {
    return { data, changed: false };
  }

  const updated: DailyData = { ...data };

  if (updated.lastActiveDate) {
    updated.history = {
      ...(updated.history || {}),
      [updated.lastActiveDate]: {
        meals: [...(updated.meals || [])],
        waterMl: updated.waterMl || 0,
        workoutLogs: [...(updated.workoutLogs || [])],
        cardioLogs: [...(updated.cardioLogs || [])],
        steps: updated.steps || 0,
        goals: { ...(updated.goals || { calories: 2000, protein: 150, carbs: 250, fats: 65, water: 2500 }) },
      },
    };
  }

  updated.meals = [];
  updated.waterMl = 0;
  updated.steps = 0;
  updated.workoutLogs = [];
  updated.cardioLogs = [];
  updated.lastActiveDate = today;

  return { data: updated, changed: true };
}
