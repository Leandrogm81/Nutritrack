import { PlannedMeal } from '../types';

/**
 * Normaliza os itens do planner para garantir que exista no máximo 1 item por slot (dia + tipo).
 * PONTO DE DECISÃO: Se houver duplicidade pré-existente no array, a política atual
 * é manter o item mais recente (último do array) e gerar um aviso no console para evitar 
 * deleção silenciosa, alinhando o estado à UI que renderiza apenas um item por slot.
 */
export function enforceSingleSlotPerMealType(meals: PlannedMeal[]): PlannedMeal[] {
  const map = new Map<string, PlannedMeal>();
  
  for (const meal of meals) {
    const key = `${meal.day}-${meal.type}`;
    if (map.has(key)) {
      console.warn(`PONTO DE DECISÃO: Duplicidade encontrada para o slot ${key}. O item "${map.get(key)?.name}" será sobrescrito pelo item "${meal.name}".`);
    }
    map.set(key, meal);
  }
  
  return Array.from(map.values());
}
