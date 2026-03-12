import React, { useState } from 'react';
import { Sparkles, Loader2, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { DailyData, PlannedMeal } from '../types';
import { geminiService } from '../services/geminiService';
import { motion } from 'motion/react';

interface DietGeneratorProps {
  data: DailyData;
  onUpdatePlanner: (meals: PlannedMeal[]) => void;
}

export default function DietGenerator({ data, onUpdatePlanner }: DietGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!data.profile) {
      setError("Por favor, preencha seu perfil na aba 'Perfil' antes de gerar uma dieta.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setSuccess(false);

    try {
      const generatedMeals = await geminiService.generateWeeklyDiet(data);
      
      const newPlannedMeals: PlannedMeal[] = generatedMeals.map((meal: any) => ({
        id: crypto.randomUUID(),
        name: meal.name,
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fats: meal.fats,
        type: meal.type,
        day: meal.day
      }));

      onUpdatePlanner(newPlannedMeals);
      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao gerar a dieta. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-black/5 dark:border-white/5 shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl">
          <Sparkles className="w-8 h-8 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Gerador de Dieta</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            Crie um plano alimentar completo para a semana baseado no seu perfil.
          </p>
        </div>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </motion.div>
      )}

      {success && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-start gap-3"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Dieta gerada com sucesso!</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Seu Planejador Semanal foi atualizado para todos os dias da semana.</p>
          </div>
        </motion.div>
      )}

      <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-6 mb-8">
        <h3 className="font-bold text-zinc-800 dark:text-zinc-200 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-zinc-400" />
          Como funciona
        </h3>
        <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
            A IA analisará seu peso, altura, idade e objetivo.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
            Criará um cardápio completo e variado para todos os 7 dias da semana (café, almoço, lanche e jantar).
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
            As refeições serão adicionadas automaticamente ao seu Planejador.
          </li>
        </ul>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full bg-emerald-500 text-white font-bold py-5 rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Gerando Dieta...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Gerar Dieta da Semana
          </>
        )}
      </button>
    </div>
  );
}
