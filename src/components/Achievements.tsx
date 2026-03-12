import React from 'react';
import { DailyData } from '../types';
import { Trophy, Flame, Droplets, Target, Zap, Star, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface AchievementsProps {
  data: DailyData;
}

export default function Achievements({ data }: AchievementsProps) {
  const achievements = [
    {
      id: 'streak_3',
      title: 'Fogo no Prato',
      description: '3 dias seguidos de registro',
      icon: <Flame className="w-6 h-6 text-orange-500" />,
      unlocked: data.streak >= 3,
      progress: Math.min((data.streak / 3) * 100, 100)
    },
    {
      id: 'water_goal',
      title: 'Hidratado',
      description: 'Bateu a meta de água hoje',
      icon: <Droplets className="w-6 h-6 text-blue-500" />,
      unlocked: data.waterMl >= data.goals.water,
      progress: Math.min((data.waterMl / data.goals.water) * 100, 100)
    },
    {
      id: 'macro_master',
      title: 'Mestre dos Macros',
      description: 'Bateu todas as metas de macros hoje',
      icon: <Target className="w-6 h-6 text-emerald-500" />,
      unlocked: false, // Logic would be complex, simplified for now
      progress: 0
    },
    {
      id: 'ai_user',
      title: 'Visionário',
      description: 'Usou a IA para registrar 5 refeições',
      icon: <Zap className="w-6 h-6 text-purple-500" />,
      unlocked: data.meals.length >= 5,
      progress: Math.min((data.meals.length / 5) * 100, 100)
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-50 dark:bg-amber-500/10 rounded-2xl">
            <Trophy className="w-6 h-6 text-amber-500" />
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Conquistas</h3>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-500/10 px-4 py-2 rounded-2xl border border-orange-100 dark:border-orange-500/20">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
          <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{data.streak} dias</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {achievements.map((ach) => (
          <div 
            key={ach.id}
            className={`p-6 rounded-[2.5rem] border-2 transition-all flex items-center gap-6 ${
              ach.unlocked 
                ? 'bg-white dark:bg-zinc-900 border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl' 
                : 'bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-100 dark:border-zinc-800 opacity-60 grayscale'
            }`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm ${
              ach.unlocked ? 'bg-zinc-50 dark:bg-zinc-800' : 'bg-zinc-100 dark:bg-zinc-900'
            }`}>
              {ach.icon}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight tracking-tight">{ach.title}</h4>
                {ach.unlocked && <Award className="w-5 h-5 text-amber-500" />}
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 font-medium">{ach.description}</p>
              
              <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${ach.progress}%` }}
                  className={`h-full rounded-full shadow-sm ${ach.unlocked ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-zinc-300 dark:bg-zinc-700'}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
