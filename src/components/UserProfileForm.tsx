import React, { useState } from 'react';
import { UserProfile, DailyData } from '../types';
import { User, Scale, Ruler, Calendar, Activity, Target, Save, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface UserProfileFormProps {
  profile?: UserProfile;
  onSave: (profile: UserProfile, goals: DailyData['goals']) => void;
}

export default function UserProfileForm({ profile, onSave }: UserProfileFormProps) {
  const [formData, setFormData] = useState<UserProfile>(profile || {
    name: '',
    age: 30,
    weight: 70,
    height: 170,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintain'
  });

  const [saved, setSaved] = useState(false);

  const calculateGoals = (p: UserProfile) => {
    // Mifflin-St Jeor Equation
    let bmr = (10 * p.weight) + (6.25 * p.height) - (5 * p.age);
    bmr = p.gender === 'male' ? bmr + 5 : bmr - 161;

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    let tdee = bmr * activityMultipliers[p.activityLevel];

    if (p.goal === 'lose') tdee -= 500;
    if (p.goal === 'gain') tdee += 500;

    const calories = Math.round(tdee);
    
    // Macros
    // Protein: 2g per kg
    const protein = Math.round(p.weight * 2);
    const proteinKcal = protein * 4;
    
    // Fats: 25% of total calories
    const fatsKcal = calories * 0.25;
    const fats = Math.round(fatsKcal / 9);
    
    // Carbs: Remaining
    const carbsKcal = calories - proteinKcal - fatsKcal;
    const carbs = Math.round(carbsKcal / 4);

    return {
      calories,
      protein,
      carbs,
      fats,
      water: Math.round(p.weight * 35) // 35ml per kg
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const goals = calculateGoals(formData);
    onSave(formData, goals);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 pb-32">
      <header>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Seu Perfil</h2>
        <p className="text-zinc-500 dark:text-zinc-400">Personalize suas metas com base no seu biotipo.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 border border-black/5 dark:border-white/5 shadow-sm space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                <User className="w-3 h-3" /> Nome Completo
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                placeholder="Seu nome"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                <Calendar className="w-3 h-3" /> Idade
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={e => setFormData({ ...formData, age: parseInt(e.target.value) })}
                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-8">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                <Scale className="w-3 h-3" /> Peso Atual (kg)
              </label>
              <input
                type="number"
                value={formData.weight}
                onChange={e => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                <Ruler className="w-3 h-3" /> Altura (cm)
              </label>
              <input
                type="number"
                value={formData.height}
                onChange={e => setFormData({ ...formData, height: parseInt(e.target.value) })}
                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Gênero Biológico</label>
            <div className="flex gap-4">
              {['male', 'female'].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: g as any })}
                  className={`flex-1 py-4 rounded-2xl font-bold transition-all border-2 ${
                    formData.gender === g 
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-500/20' 
                      : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
                  }`}
                >
                  {g === 'male' ? 'Masculino' : 'Feminino'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              <Activity className="w-3 h-3" /> Nível de Atividade Física
            </label>
            <div className="relative">
              <select
                value={formData.activityLevel}
                onChange={e => setFormData({ ...formData, activityLevel: e.target.value as any })}
                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white appearance-none cursor-pointer"
              >
                <option value="sedentary">Sedentário (Pouco ou nenhum exercício)</option>
                <option value="light">Leve (Exercício 1-3 dias/semana)</option>
                <option value="moderate">Moderado (Exercício 3-5 dias/semana)</option>
                <option value="active">Ativo (Exercício 6-7 dias/semana)</option>
                <option value="very_active">Muito Ativo (Atleta, trabalho físico)</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                <Save className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              <Target className="w-3 h-3" /> Seu Objetivo Principal
            </label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'lose', label: 'Perder Peso' },
                { id: 'maintain', label: 'Manter Peso' },
                { id: 'gain', label: 'Ganhar Massa' }
              ].map((obj) => (
                <button
                  key={obj.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, goal: obj.id as any })}
                  className={`py-4 rounded-2xl text-[10px] font-bold transition-all border-2 uppercase tracking-widest ${
                    formData.goal === obj.id 
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-500/20' 
                      : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
                  }`}
                >
                  {obj.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-zinc-900 dark:bg-emerald-500 dark:text-white text-white font-bold py-6 rounded-[2rem] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-black/10 dark:shadow-emerald-500/20 text-lg uppercase tracking-widest"
        >
          {saved ? (
            <>
              <CheckCircle2 className="w-7 h-7 text-emerald-500 dark:text-white" />
              Perfil Atualizado!
            </>
          ) : (
            <>
              <Save className="w-7 h-7" />
              Calcular Minhas Metas
            </>
          )}
        </button>
      </form>
    </div>
  );
}
