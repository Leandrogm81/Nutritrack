import { CardioLog } from '../types';

export const validateSteps = (steps: number | string | undefined | null): number => {
  if (steps === undefined || steps === null || steps === '') return 0;
  
  const parsed = typeof steps === 'string' ? Number.parseFloat(steps.replace(',', '.')) : steps;
  
  if (isNaN(parsed) || parsed < 0) return 0;
  
  // Passos devem ser inteiros
  return Math.floor(parsed);
};

export const validateCardio = (
  type: string,
  duration: number | string,
  intensity: CardioLog['intensity'] | string,
  calories: number | string,
  speed?: number | string
): Omit<CardioLog, 'id' | 'date'> | null => {
  const parsedDuration = typeof duration === 'string' ? Number.parseFloat(duration.replace(',', '.')) : duration;
  
  if (!type.trim() || isNaN(parsedDuration) || parsedDuration <= 0) {
    return null; // Duração obrigatória e tipo obrigatório
  }

  const validIntensities: CardioLog['intensity'][] = ['low', 'medium', 'high'];
  const validIntensity = validIntensities.includes(intensity as CardioLog['intensity'])
    ? (intensity as CardioLog['intensity'])
    : 'medium';

  // Calories devem ser informadas pelo usuário, sem inventar fórmulas
  const parsedCalories = typeof calories === 'string' ? Number.parseFloat(calories.replace(',', '.')) : calories;
  const safeCalories = isNaN(parsedCalories) || parsedCalories < 0 ? 0 : parsedCalories;

  let safeSpeed: number | undefined = undefined;
  if (speed !== undefined && speed !== '') {
    const parsedSpeed = typeof speed === 'string' ? Number.parseFloat(speed.replace(',', '.')) : speed;
    if (!isNaN(parsedSpeed) && parsedSpeed >= 0) {
      safeSpeed = parsedSpeed;
    }
  }

  return {
    type: type.trim(),
    duration: parsedDuration,
    intensity: validIntensity,
    calories: safeCalories,
    speed: safeSpeed,
  };
};
