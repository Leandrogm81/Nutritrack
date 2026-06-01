import { describe, it, expect } from 'vitest';
import { parseAndValidateBackup } from './validateBackup';
import { createBackupString } from './index';
import { DailyData } from '../../types';

describe('validateBackup', () => {
  const validData: DailyData = {
    meals: [],
    waterMl: 0,
    steps: 0,
    goals: { calories: 2000, protein: 150, carbs: 200, fats: 50, water: 2000 },
    weightHistory: [],
    plannedMeals: [],
    plannedWorkouts: [],
    workouts: [],
    workoutLogs: [],
    cardioLogs: [],
    theme: 'light'
  };

  it('deve aceitar um backup válido criado pelo próprio sistema', () => {
    const backupString = createBackupString(validData);
    const result = parseAndValidateBackup(backupString);
    
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.goals.calories).toBe(2000);
    }
  });

  it('deve rejeitar JSON malformado', () => {
    const result = parseAndValidateBackup('{ json quebrado }');
    expect(result.success).toBe(false);
    expect((result as any).error).toContain('JSON');
  });

  it('deve rejeitar arquivo sem envelope de versão', () => {
    const rawData = JSON.stringify({ data: validData }); // sem version
    const result = parseAndValidateBackup(rawData);
    expect(result.success).toBe(false);
    expect((result as any).error).toContain('Nenhuma versão de backup encontrada');
  });

  it('deve rejeitar versão não suportada', () => {
    const unsupportedData = JSON.stringify({ version: 2, data: validData });
    const result = parseAndValidateBackup(unsupportedData);
    expect(result.success).toBe(false);
    expect((result as any).error).toContain('não suportada (v2)');
  });

  it('deve rejeitar payload com dados faltando (ex: sem meals)', () => {
    const invalidData = { ...validData } as any;
    delete invalidData.meals;
    
    const backupString = JSON.stringify({ version: 1, data: invalidData });
    const result = parseAndValidateBackup(backupString);
    
    expect(result.success).toBe(false);
    expect((result as any).error).toContain('refeições inválido');
  });
});
