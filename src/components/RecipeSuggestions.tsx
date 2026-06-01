import React, { useState } from 'react';
import { ChefHat, Loader2, ArrowRight, UtensilsCrossed } from 'lucide-react';
import { DailyData } from '../types';
import { geminiService } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface RecipeSuggestionsProps {
  data: DailyData;
}

export default function RecipeSuggestions({ data }: RecipeSuggestionsProps) {
  const isOnline = useOnlineStatus();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchRecipes = async () => {
    const totalCalories = data.meals.reduce((sum, meal) => sum + meal.calories, 0);
    const totalProtein = data.meals.reduce((sum, meal) => sum + meal.protein, 0);
    const totalCarbs = data.meals.reduce((sum, meal) => sum + meal.carbs, 0);
    const totalFats = data.meals.reduce((sum, meal) => sum + meal.fats, 0);

    const remaining = {
      calories: Math.max(data.goals.calories - totalCalories, 0),
      protein: Math.max(data.goals.protein - totalProtein, 0),
      carbs: Math.max(data.goals.carbs - totalCarbs, 0),
      fats: Math.max(data.goals.fats - totalFats, 0),
    };

    setIsLoading(true);
    try {
      const result = await geminiService.suggestRecipes(remaining, data.profile);
      setRecipes(result);
      setHasLoaded(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToPlanner = (recipe: any) => {
    // Lógica para adicionar ao planejador (simulada por enquanto)
    alert(`Receita "${recipe.title}" adicionada ao planejador!`);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-50 dark:bg-amber-500/10 rounded-2xl">
            <ChefHat className="w-6 h-6 text-amber-500" />
          </div>
          <h3 className="font-bold text-zinc-900 dark:text-white text-xl tracking-tight">O que comer agora?</h3>
        </div>
        {!isLoading && (
          <button 
            onClick={fetchRecipes}
            disabled={!isOnline}
            className="text-xs font-bold text-amber-500 uppercase tracking-widest hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {hasLoaded ? 'Atualizar' : 'Sugerir'}
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white dark:bg-zinc-900 p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 flex flex-col items-center justify-center gap-6 shadow-sm"
          >
            <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
            <p className="text-sm text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest">Chef IA elaborando receitas...</p>
          </motion.div>
        ) : recipes.length > 0 ? (
          <motion.div 
            key="recipes"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4 overflow-x-auto pb-6 -mx-6 px-6 no-scrollbar"
          >
            {recipes.map((recipe, idx) => (
              <div 
                key={idx}
                className="min-w-[300px] bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-sm border border-black/5 dark:border-white/5 space-y-4 group"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-zinc-900 dark:text-white text-lg leading-tight pr-4">{recipe.title}</h4>
                  <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase bg-zinc-50 dark:bg-zinc-800 px-3 py-1.5 rounded-xl shrink-0">
                    {recipe.time}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">{recipe.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-50 dark:border-zinc-800">
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">{recipe.macros}</span>
                  <button 
                    onClick={() => addToPlanner(recipe)}
                    className="p-3 bg-amber-50 dark:bg-amber-500/10 rounded-2xl text-amber-500 group-hover:scale-110 transition-transform"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        ) : hasLoaded ? (
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-black/5 dark:border-white/5 text-center shadow-sm">
            <p className="text-sm text-zinc-400 dark:text-zinc-500 font-medium">Nenhuma sugestão encontrada para seus macros atuais.</p>
          </div>
        ) : (
          <button 
            onClick={fetchRecipes}
            disabled={!isOnline}
            className="w-full bg-white dark:bg-zinc-900 p-12 rounded-[2.5rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all group shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-3xl group-hover:scale-110 transition-transform">
              <UtensilsCrossed className="w-8 h-8 text-zinc-300 dark:text-zinc-600" />
            </div>
            <span className="text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              {isOnline ? 'Clique para receber sugestões personalizadas' : 'IA Offline'}
            </span>
          </button>
        )}
      </AnimatePresence>
    </section>
  );
}
