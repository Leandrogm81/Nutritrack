import type { DailyData } from '../types';
import { getTodayIsoDate } from '../utils/domain';

export const INITIAL_DAILY_DATA: DailyData = {
  meals: [],
  waterMl: 0,
  steps: 0,
  goals: {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fats: 65,
    water: 2500,
  },
  weightHistory: [],
  plannedMeals: [],
  plannedWorkouts: [],
  workouts: [],
  workoutLogs: [],
  cardioLogs: [],
  theme: 'light',
  lastActiveDate: getTodayIsoDate(),
  history: {},
};
