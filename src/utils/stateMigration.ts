import type { DailyData } from '../types';
import { INITIAL_DAILY_DATA } from '../constants/state';

export function normalizeDailyData(prev: DailyData | undefined | null): DailyData {
  return {
    ...INITIAL_DAILY_DATA,
    ...prev,
    goals: { ...INITIAL_DAILY_DATA.goals, ...(prev?.goals || {}) },
    history: prev?.history || {},
    meals: Array.isArray(prev?.meals) ? prev.meals : [],
    steps: Number.isFinite(prev?.steps) ? prev.steps : 0,
    weightHistory: Array.isArray(prev?.weightHistory) ? prev.weightHistory : [],
    plannedMeals: Array.isArray(prev?.plannedMeals) ? prev.plannedMeals : [],
    plannedWorkouts: Array.isArray(prev?.plannedWorkouts) ? prev.plannedWorkouts : [],
    workouts: Array.isArray(prev?.workouts) ? prev.workouts : [],
    workoutLogs: Array.isArray(prev?.workoutLogs) ? prev.workoutLogs : [],
    cardioLogs: Array.isArray(prev?.cardioLogs) ? prev.cardioLogs : [],
  };
}

export function isDailyDataMissingRequiredKeys(prev: DailyData | undefined | null): boolean {
  return !(
    prev &&
    prev.goals &&
    prev.meals &&
    prev.weightHistory &&
    prev.plannedMeals &&
    prev.workouts &&
    prev.workoutLogs &&
    prev.cardioLogs &&
    typeof prev.steps === 'number'
  );
}
