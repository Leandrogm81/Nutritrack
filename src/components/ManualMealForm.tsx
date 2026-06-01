import React from 'react';
import { Meal } from '../types';

interface ManualMealFormProps {
  name: string;
  setName: (name: string) => void;
  calories: string;
  setCalories: (calories: string) => void;
  protein: string;
  setProtein: (protein: string) => void;
  carbs: string;
  setCarbs: (carbs: string) => void;
  fats: string;
  setFats: (fats: string) => void;
  baseNutrients: Omit<Meal, 'id' | 'timestamp'> | null;
  portionAmount: string;
  onPortionChange: (amount: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBackToAi: () => void;
}

export default function ManualMealForm({
  name, setName,
  calories, setCalories,
  protein, setProtein,
  carbs, setCarbs,
  fats, setFats,
  baseNutrients,
  portionAmount,
  onPortionChange,
  onSubmit,
  onBackToAi
}: ManualMealFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Nome do Alimento</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
          required
        />
      </div>

      {baseNutrients && (
        <div>
          <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Porção Consumida (g)</label>
          <input
            type="number"
            value={portionAmount}
            onChange={(e) => onPortionChange(e.target.value)}
            className="w-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white font-bold text-emerald-700 dark:text-emerald-400"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Calorias (kcal)</label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Proteína (g)</label>
          <input
            type="number"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Carboidratos (g)</label>
          <input
            type="number"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Gorduras (g)</label>
          <input
            type="number"
            value={fats}
            onChange={(e) => setFats(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
          />
        </div>
      </div>

      <div className="flex gap-3 sm:gap-4 pt-4 sm:pt-6">
        <button
          type="submit"
          className="flex-1 bg-emerald-500 text-white font-bold py-4 sm:py-5 rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 text-[10px] sm:text-sm uppercase tracking-widest"
        >
          Salvar Refeição
        </button>
        <button
          type="button"
          onClick={onBackToAi}
          className="px-6 sm:px-8 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold py-4 sm:py-5 rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all text-[10px] sm:text-sm uppercase tracking-widest"
        >
          Voltar IA
        </button>
      </div>
    </form>
  );
}
