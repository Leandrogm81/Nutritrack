import { describe, expect, it } from 'vitest';
import { enforceSingleSlotPerMealType } from './planner';
import { PlannedMeal } from '../types';

describe('planner utils', () => {
  describe('enforceSingleSlotPerMealType', () => {
    it('returns empty array if input is empty', () => {
      expect(enforceSingleSlotPerMealType([])).toEqual([]);
    });

    it('returns the same meals if no duplicates exist', () => {
      const meals: PlannedMeal[] = [
        { id: '1', name: 'M1', calories: 100, protein: 10, carbs: 10, fats: 10, day: 'monday', type: 'cafe' },
        { id: '2', name: 'M2', calories: 200, protein: 10, carbs: 10, fats: 10, day: 'monday', type: 'almoco' },
      ];
      expect(enforceSingleSlotPerMealType(meals)).toEqual(meals);
    });

    it('keeps the last meal in case of duplicate day+type', () => {
      const meals: PlannedMeal[] = [
        { id: '1', name: 'M1', calories: 100, protein: 10, carbs: 10, fats: 10, day: 'monday', type: 'cafe' },
        { id: '2', name: 'M2', calories: 200, protein: 10, carbs: 10, fats: 10, day: 'monday', type: 'cafe' }, // Duplicate
        { id: '3', name: 'M3', calories: 300, protein: 10, carbs: 10, fats: 10, day: 'monday', type: 'almoco' },
      ];
      const result = enforceSingleSlotPerMealType(meals);
      expect(result).toHaveLength(2);
      expect(result.find(m => m.type === 'cafe')?.name).toBe('M2');
      expect(result.find(m => m.type === 'almoco')?.name).toBe('M3');
    });
  });
});
