import React from 'react';
import { Activity, Droplets, PieChart } from 'lucide-react';
import { DailyData } from '../types';
import { motion } from 'motion/react';

interface DashboardProps {
  data: DailyData;
}

export default function Dashboard({ data }: DashboardProps) {
  const totalCalories = data.meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = data.meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = data.meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFats = data.meals.reduce((sum, meal) => sum + meal.fats, 0);

  const calPercentage = Math.min((totalCalories / data.goals.calories) * 100, 100);
  const waterPercentage = Math.min((data.waterMl / data.goals.water) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Header with Streak */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Olá, {data.profile?.name || 'NutriTracker'}!</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Vamos bater as metas de hoje?</p>
        </div>
        <div className="flex items-center gap-1 bg-orange-50 dark:bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-100 dark:border-orange-500/20">
          <span className="text-orange-500 font-bold text-sm">{data.streak}</span>
          <span className="text-orange-500">🔥</span>
        </div>
      </div>

      {/* Calories Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 shadow-sm border border-black/5 dark:border-white/5 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-3xl" />
        
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div>
            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Calorias Consumidas</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {totalCalories} 
              <span className="text-lg sm:text-xl font-medium text-zinc-400 dark:text-zinc-500 ml-2">/ {data.goals.calories} kcal</span>
            </h2>
          </div>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl shadow-lg shadow-emerald-500/10">
            <Activity className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        
        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-5 rounded-full overflow-hidden p-1 relative z-10">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${calPercentage}%` }}
            className="bg-emerald-500 h-full rounded-full shadow-lg shadow-emerald-500/20"
          />
        </div>
      </motion.div>

      {/* Macros Grid */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Proteína', value: totalProtein, goal: data.goals.protein, color: 'bg-blue-500', textColor: 'text-blue-500' },
          { label: 'Carbos', value: totalCarbs, goal: data.goals.carbs, color: 'bg-amber-500', textColor: 'text-amber-500' },
          { label: 'Gorduras', value: totalFats, goal: data.goals.fats, color: 'bg-rose-500', textColor: 'text-rose-500' },
        ].map((macro) => {
          const percentage = Math.min((macro.value / macro.goal) * 100, 100);
          return (
            <motion.div 
              key={macro.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{macro.label}</span>
                <span className={`text-[10px] font-bold ${macro.textColor}`}>{Math.round((macro.value / macro.goal) * 100)}%</span>
              </div>
              
              <div className="mb-3">
                <span className="text-lg font-bold text-zinc-900 dark:text-white">{macro.value}</span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 ml-1">/ {macro.goal}g</span>
              </div>

              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  className={`${macro.color} h-full rounded-full`} 
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Water Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-zinc-900 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 shadow-sm border border-black/5 dark:border-white/5 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl" />
        
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div>
            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Hidratação Diária</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {data.waterMl} 
              <span className="text-lg sm:text-xl font-medium text-zinc-400 dark:text-zinc-500 ml-2">/ {data.goals.water} ml</span>
            </h2>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-2xl shadow-lg shadow-blue-500/10">
            <Droplets className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-5 rounded-full overflow-hidden p-1 relative z-10">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${waterPercentage}%` }}
            className="bg-blue-500 h-full rounded-full shadow-lg shadow-blue-500/20"
          />
        </div>
      </motion.div>
    </div>
  );
}
