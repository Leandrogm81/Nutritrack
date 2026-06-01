import type { PlannedMeal } from '../types';

export const WEEKDAY_IDS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'] as const;

export const WEEK_DAYS = [
  { id: 'seg', label: 'Segunda' },
  { id: 'ter', label: 'Terça' },
  { id: 'qua', label: 'Quarta' },
  { id: 'qui', label: 'Quinta' },
  { id: 'sex', label: 'Sexta' },
  { id: 'sab', label: 'Sábado' },
  { id: 'dom', label: 'Domingo' },
] as const;

export const MEAL_TYPES: Array<{ id: PlannedMeal['type']; label: string; icon: string }> = [
  { id: 'cafe', label: 'Café da Manhã', icon: '☕' },
  { id: 'almoco', label: 'Almoço', icon: '🍱' },
  { id: 'lanche', label: 'Lanche', icon: '🍎' },
  { id: 'jantar', label: 'Jantar', icon: '🥗' },
];
