export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  timestamp: number;
}

export interface SavedDiet {
  id: string;
  title: string;
  content: string;
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
  savedDiets: SavedDiet[];
  profile?: UserProfile;
  weightHistory: WeightEntry[];
  plannedMeals: PlannedMeal[];
  streak: number;
  lastActiveDate?: string;
  theme: 'light' | 'dark';
}
