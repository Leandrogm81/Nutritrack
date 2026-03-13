import React, { useState } from 'react';
import { UserProfile, DailyData } from '../types';
import { User, Scale, Ruler, Calendar, Activity, Target, Save, CheckCircle2, Utensils } from 'lucide-react';
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
    goal: 'maintain',
    dietType: 'balanced',
    dietaryRestrictions: '',
    customMacros: { protein: 0, carbs: 0, fats: 0 }
  });

  const [saved, setSaved] = useState(false);

  const calculateGoals = (p: UserProfile) => {
    const weight = p.weight || 70;
    const height = p.height || 170;
    const age = p.age || 30;

    // Mifflin-St Jeor Equation
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr = p.gender === 'male' ? bmr + 5 : bmr - 161;

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    const multiplier = activityMultipliers[p.activityLevel] || 1.2;
    let tdee = bmr * multiplier;

    if (p.goal === 'lose') tdee -= 500;
    if (p.goal === 'gain') tdee += 500;

    const calories = Math.max(1200, Math.round(tdee));
    
    // Macros
    let protein = 0;
    let fats = 0;
    let carbs = 0;

    if (p.dietType === 'custom' && p.customMacros) {
      protein = p.customMacros.protein || 0;
      carbs = p.customMacros.carbs || 0;
      fats = p.customMacros.fats || 0;
    } else {
      // Default: Balanced
      let proteinRatio = 0.3;
      let fatsRatio = 0.25;
      let carbsRatio = 0.45;

      if (p.dietType === 'low-carb') {
        proteinRatio = 0.4;
        fatsRatio = 0.4;
        carbsRatio = 0.2;
      } else if (p.dietType === 'ketogenic') {
        proteinRatio = 0.2;
        fatsRatio = 0.75;
        carbsRatio = 0.05;
      } else if (p.dietType === 'hypertrophy') {
        proteinRatio = 0.35;
        fatsRatio = 0.2;
        carbsRatio = 0.45;
      }

      protein = Math.round((calories * proteinRatio) / 4);
      fats = Math.round((calories * fatsRatio) / 9);
      carbs = Math.round((calories * carbsRatio) / 4);
    }

    return {
      calories: isNaN(calories) ? 2000 : calories,
      protein: isNaN(protein) ? 150 : protein,
      carbs: isNaN(carbs) ? 250 : carbs,
      fats: isNaN(fats) ? 65 : fats,
      water: isNaN(weight) ? 2500 : Math.round(weight * 35)
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure numeric values are valid
    const cleanData = {
      ...formData,
      age: isNaN(formData.age) ? 30 : formData.age,
      weight: isNaN(formData.weight) ? 70 : formData.weight,
      height: isNaN(formData.height) ? 170 : formData.height,
      customMacros: formData.customMacros ? {
        protein: isNaN(formData.customMacros.protein) ? 0 : formData.customMacros.protein,
        carbs: isNaN(formData.customMacros.carbs) ? 0 : formData.customMacros.carbs,
        fats: isNaN(formData.customMacros.fats) ? 0 : formData.customMacros.fats,
      } : undefined
    };

    const goals = calculateGoals(cleanData);
    onSave(cleanData, goals);
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

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              <Utensils className="w-3 h-3" /> Tipo de Dieta
            </label>
            <div className="relative">
              <select
                value={formData.dietType || 'balanced'}
                onChange={e => setFormData({ ...formData, dietType: e.target.value as any })}
                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white appearance-none cursor-pointer"
              >
                <option value="balanced">Balanceada</option>
                <option value="low-carb">Low Carb</option>
                <option value="ketogenic">Cetogênica</option>
                <option value="hypertrophy">Hipertrofia</option>
                <option value="custom">Personalizada (Sugerir Macros)</option>
              </select>
            </div>
          </div>

          {formData.dietType === 'custom' && (
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  Proteína (g)
                </label>
                <input
                  type="number"
                  value={formData.customMacros?.protein || 0}
                  onChange={e => setFormData({ ...formData, customMacros: { ...formData.customMacros!, protein: parseInt(e.target.value) || 0 } })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  Carbo (g)
                </label>
                <input
                  type="number"
                  value={formData.customMacros?.carbs || 0}
                  onChange={e => setFormData({ ...formData, customMacros: { ...formData.customMacros!, carbs: parseInt(e.target.value) || 0 } })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  Gordura (g)
                </label>
                <input
                  type="number"
                  value={formData.customMacros?.fats || 0}
                  onChange={e => setFormData({ ...formData, customMacros: { ...formData.customMacros!, fats: parseInt(e.target.value) || 0 } })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                />
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              Restrições ou Sugestões Alimentares
            </label>
            <textarea
              value={formData.dietaryRestrictions || ''}
              onChange={e => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
              className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white resize-none h-24"
              placeholder="Ex: Sou vegano, não gosto de brócolis, alergia a amendoim..."
            />
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
