export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  timestamp: number;
}

export interface WeightEntry {
  id: string;
  weight: number;
  timestamp: number;
}

export interface PlannedMeal extends Omit<Meal, 'timestamp'> {
  day: string; // 'seg', 'ter', etc.
  type: 'cafe' | 'almoco' | 'jantar' | 'lanche';
}

export interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'lose' | 'maintain' | 'gain';
  dietType?: 'balanced' | 'low-carb' | 'ketogenic' | 'hypertrophy' | 'custom';
  customMacros?: {
    protein: number;
    carbs: number;
    fats: number;
  };
  dietaryRestrictions?: string;
}

export interface DailyData {
  meals: Meal[];
  waterMl: number;
  goals: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    water: number;
  };
  profile?: UserProfile;
  weightHistory: WeightEntry[];
  plannedMeals: PlannedMeal[];
  theme: 'light' | 'dark';
  lastActiveDate?: string;
  history?: Record<string, { meals: Meal[], waterMl: number }>;
}
