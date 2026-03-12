import React, { useState } from 'react';
import { DailyData, PlannedMeal, Meal } from '../types';
import { Calendar, Plus, Trash2, Clock, Utensils, ChevronRight, ChevronLeft, CheckCircle2, Wand2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { geminiService } from '../services/geminiService';

interface WeeklyPlannerProps {
  data: DailyData;
  onUpdatePlanner: (meals: PlannedMeal[]) => void;
  onLogMeal: (meal: Omit<Meal, 'id' | 'timestamp'>) => void;
}

const DAYS = [
  { id: 'seg', label: 'Segunda' },
  { id: 'ter', label: 'Terça' },
  { id: 'qua', label: 'Quarta' },
  { id: 'qui', label: 'Quinta' },
  { id: 'sex', label: 'Sexta' },
  { id: 'sab', label: 'Sábado' },
  { id: 'dom', label: 'Domingo' }
];

const MEAL_TYPES = [
  { id: 'cafe', label: 'Café da Manhã', icon: '☕' },
  { id: 'almoco', label: 'Almoço', icon: '🍱' },
  { id: 'lanche', label: 'Lanche', icon: '🍎' },
  { id: 'jantar', label: 'Jantar', icon: '🥗' }
];

export default function WeeklyPlanner({ data, onUpdatePlanner, onLogMeal }: WeeklyPlannerProps) {
  const [selectedDay, setSelectedDay] = useState('seg');
  const [isAdding, setIsAdding] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isPastingDiet, setIsPastingDiet] = useState(false);
  const [dietText, setDietText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [newMeal, setNewMeal] = useState<Omit<PlannedMeal, 'id'>>({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    day: 'seg',
    type: 'cafe'
  });
  
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleClearAll = () => {
    onUpdatePlanner([]);
    setIsClearing(false);
    setMessage({ type: 'success', text: 'Planejamento limpo com sucesso!' });
    setTimeout(() => setMessage(null), 3000);
  };

  const handlePasteDiet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dietText.trim()) return;

    setIsGenerating(true);
    try {
      const parsedMeals = await geminiService.parseDietText(dietText);
      
      if (parsedMeals.length === 0) {
        throw new Error("Nenhuma refeição encontrada no texto.");
      }

      const newMeals = parsedMeals.map((meal: any) => ({
        ...meal,
        id: Math.random().toString(36).substring(2, 9)
      }));

      onUpdatePlanner(newMeals);
      setMessage({ type: 'success', text: 'Dieta importada com sucesso!' });
      setIsPastingDiet(false);
      setDietText('');
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error parsing diet:', error);
      setMessage({ type: 'error', text: 'Erro ao analisar o texto. Tente novamente.' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substring(2, 9);
    onUpdatePlanner([...data.plannedMeals, { ...newMeal, id, day: selectedDay }]);
    setIsAdding(false);
    setNewMeal({ ...newMeal, name: '', calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  const handleRemoveMeal = (id: string) => {
    onUpdatePlanner(data.plannedMeals.filter(m => m.id !== id));
  };

  const dayMeals = data.plannedMeals.filter(m => m.day === selectedDay);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Planejador</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Organize suas refeições da semana.</p>
        </div>
        <div className="flex items-center gap-2">
          {data.plannedMeals && data.plannedMeals.length > 0 && (
            <button
              onClick={() => setIsClearing(true)}
              className="p-4 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-2xl hover:scale-105 transition-all"
              title="Limpar todo o planejamento"
            >
              <Trash2 className="w-6 h-6" />
            </button>
          )}
          <button
            onClick={() => setIsPastingDiet(true)}
            className="p-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-2xl hover:scale-105 transition-all"
            title="Importar dieta por texto (IA)"
          >
            <Wand2 className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsAdding(true)}
            className="p-4 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
            title="Adicionar refeição"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-2xl text-sm font-medium flex items-center gap-2 ${
              message.type === 'success' 
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' 
                : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'
            }`}
          >
            {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Day Selector */}
      <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4">
        {DAYS.map((day) => (
          <button
            key={day.id}
            onClick={() => setSelectedDay(day.id)}
            className={`flex-shrink-0 px-8 py-4 rounded-[1.5rem] font-bold text-sm transition-all border-2 ${
              selectedDay === day.id
                ? 'bg-zinc-900 dark:bg-emerald-500 text-white border-zinc-900 dark:border-emerald-500 shadow-xl shadow-zinc-900/20 dark:shadow-emerald-500/20'
                : 'bg-white dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 border-black/5 dark:border-white/5 hover:border-zinc-200 dark:hover:border-zinc-800'
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>

      {/* Planned Meals List */}
      <div className="space-y-6">
        {MEAL_TYPES.map((type) => {
          const meal = dayMeals.find(m => m.type === type.id);
          return (
            <div 
              key={type.id}
              className={`p-8 rounded-[2.5rem] border-2 transition-all ${
                meal 
                  ? 'bg-white dark:bg-zinc-900 border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl' 
                  : 'bg-zinc-50/50 dark:bg-zinc-900/30 border-dashed border-zinc-200 dark:border-zinc-800'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${meal ? 'bg-zinc-50 dark:bg-zinc-800' : 'bg-transparent'}`}>
                    {type.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">{type.label}</p>
                    <h4 className={`text-lg font-bold tracking-tight ${meal ? 'text-zinc-900 dark:text-white' : 'text-zinc-300 dark:text-zinc-700'}`}>
                      {meal ? meal.name : 'Não planejado'}
                    </h4>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {meal && (
                    <>
                      <button 
                        onClick={() => {
                          onLogMeal({
                            name: meal.name,
                            calories: meal.calories,
                            protein: meal.protein,
                            carbs: meal.carbs,
                            fats: meal.fats
                          });
                        }}
                        className="p-3 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-2xl transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                        title="Registrar no Histórico de Hoje"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="hidden sm:inline">Registrar</span>
                      </button>
                      <button 
                        onClick={() => handleRemoveMeal(meal.id)}
                        className="p-3 text-zinc-300 dark:text-zinc-600 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              {meal && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-center">
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">KCAL</p>
                    <p className="text-sm font-bold text-emerald-500">{meal.calories}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">PROT</p>
                    <p className="text-sm font-bold text-blue-500">{meal.protein}g</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">CARB</p>
                    <p className="text-sm font-bold text-amber-500">{meal.carbs}g</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">GORD</p>
                    <p className="text-sm font-bold text-rose-500">{meal.fats}g</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-zinc-900 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-6 dark:text-white">Planejar Refeição</h3>
              <form onSubmit={handleAddMeal} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase">Nome da Refeição</label>
                  <input
                    type="text"
                    value={newMeal.name}
                    onChange={e => setNewMeal({ ...newMeal, name: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 dark:text-white"
                    placeholder="Ex: Frango com Batata Doce"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase">Tipo</label>
                    <select
                      value={newMeal.type}
                      onChange={e => setNewMeal({ ...newMeal, type: e.target.value as any })}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 outline-none dark:text-white"
                    >
                      {MEAL_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase">Calorias</label>
                    <input
                      type="number"
                      value={newMeal.calories || ''}
                      onChange={e => setNewMeal({ ...newMeal, calories: parseInt(e.target.value) || 0 })}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 outline-none dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase">Prot (g)</label>
                    <input
                      type="number"
                      value={newMeal.protein || ''}
                      onChange={e => setNewMeal({ ...newMeal, protein: parseInt(e.target.value) || 0 })}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-2 outline-none dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase">Carb (g)</label>
                    <input
                      type="number"
                      value={newMeal.carbs || ''}
                      onChange={e => setNewMeal({ ...newMeal, carbs: parseInt(e.target.value) || 0 })}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-2 outline-none dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase">Gord (g)</label>
                    <input
                      type="number"
                      value={newMeal.fats || ''}
                      onChange={e => setNewMeal({ ...newMeal, fats: parseInt(e.target.value) || 0 })}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-2 outline-none dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 transition-all mt-4 shadow-lg shadow-emerald-500/20"
                >
                  Adicionar ao Plano
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Clear Confirmation Modal */}
      <AnimatePresence>
        {isClearing && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsClearing(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-zinc-900 w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-rose-100 dark:bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Limpar Planejamento?</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                Tem certeza que deseja apagar todas as refeições planejadas para a semana? Esta ação não pode ser desfeita.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsClearing(false)}
                  className="flex-1 py-3 rounded-2xl font-bold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex-1 py-3 rounded-2xl font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20"
                >
                  Limpar Tudo
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Paste Diet Modal */}
      <AnimatePresence>
        {isPastingDiet && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isGenerating && setIsPastingDiet(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-zinc-900 w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-2 dark:text-white flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-emerald-500" />
                Importar Dieta com IA
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                Cole o texto da sua dieta abaixo. Nossa IA vai ler e organizar tudo automaticamente no seu planejador.
              </p>
              
              <form onSubmit={handlePasteDiet} className="space-y-4">
                <textarea
                  value={dietText}
                  onChange={e => setDietText(e.target.value)}
                  className="w-full h-48 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 dark:text-white resize-none"
                  placeholder="Ex: Segunda-feira: Café da manhã - 2 ovos (150kcal, 12g prot...), Almoço..."
                  required
                  disabled={isGenerating}
                />
                
                <button
                  type="submit"
                  disabled={isGenerating || !dietText.trim()}
                  className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 transition-all mt-4 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analisando dieta...
                    </>
                  ) : (
                    'Importar Dieta'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
