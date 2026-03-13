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
  muscleMassPercentage?: number;
  bodyFatPercentage?: number;
  visceralFat?: number;
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
  muscleMassPercentage?: number;
  bodyFatPercentage?: number;
  visceralFat?: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: number;
  rest?: number; // in seconds
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  description?: string;
  exercises: Exercise[];
  type: 'strength' | 'cardio' | 'flexibility' | 'other';
  duration?: number; // estimated minutes
}

export interface WorkoutLog {
  id: string;
  workoutId: string;
  workoutName: string;
  date: string;
  exercises: Exercise[]; // Actual performed sets/reps/weight
  duration?: number;
  mood?: 'great' | 'good' | 'tired' | 'bad';
}

export interface PlannedWorkout {
  id: string;
  workoutId: string;
  day: string; // 'seg', 'ter', etc.
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
  plannedWorkouts: PlannedWorkout[];
  workouts: Workout[];
  workoutLogs: WorkoutLog[];
  theme: 'light' | 'dark';
  lastActiveDate?: string;
  history?: Record<string, { meals: Meal[], waterMl: number, workoutLogs?: WorkoutLog[] }>;
}
