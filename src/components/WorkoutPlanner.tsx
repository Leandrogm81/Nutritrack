import React, { useState } from 'react';
import { DailyData, PlannedWorkout, Workout, WorkoutLog } from '../types';
import { Calendar, Plus, Trash2, Dumbbell, ChevronRight, ChevronLeft, CheckCircle2, Wand2, Loader2, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { geminiService } from '../services/geminiService';

interface WorkoutPlannerProps {
  data: DailyData;
  onUpdatePlanner: (planned: PlannedWorkout[]) => void;
  onStartWorkout: (workout: Workout) => void;
  onLogWorkout: (log: WorkoutLog) => void;
  onImportWorkouts: (workouts: Workout[], planned: PlannedWorkout[]) => void;
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

export default function WorkoutPlanner({ data, onUpdatePlanner, onStartWorkout, onLogWorkout, onImportWorkouts }: WorkoutPlannerProps) {
  const [selectedDay, setSelectedDay] = useState('seg');
  const [isAdding, setIsAdding] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isPastingWorkout, setIsPastingWorkout] = useState(false);
  const [workoutText, setWorkoutText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [selectedWorkoutId, setSelectedWorkoutId] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleClearAll = () => {
    onUpdatePlanner([]);
    setIsClearing(false);
    setMessage({ type: 'success', text: 'Planejamento limpo com sucesso!' });
    setTimeout(() => setMessage(null), 3000);
  };

  const handlePasteWorkout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workoutText.trim()) return;

    setIsGenerating(true);
    try {
      const { workouts, plannedWorkouts } = await geminiService.parseWorkoutText(workoutText);
      
      if (workouts.length === 0) {
        throw new Error("Nenhum treino encontrado no texto.");
      }

      onImportWorkouts(workouts, plannedWorkouts);
      setMessage({ type: 'success', text: 'Treinos importados com sucesso!' });
      setIsPastingWorkout(false);
      setWorkoutText('');
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error parsing workout:', error);
      setMessage({ type: 'error', text: 'Erro ao analisar o texto. Tente novamente.' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkoutId) return;

    const id = Math.random().toString(36).substring(2, 9);
    onUpdatePlanner([...data.plannedWorkouts, { id, workoutId: selectedWorkoutId, day: selectedDay }]);
    setIsAdding(false);
    setSelectedWorkoutId('');
  };

  const handleRemoveWorkout = (id: string) => {
    onUpdatePlanner(data.plannedWorkouts.filter(w => w.id !== id));
  };

  const dayWorkouts = data.plannedWorkouts.filter(w => w.day === selectedDay);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Agenda</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Organize seus treinos da semana.</p>
        </div>
        <div className="flex items-center gap-2">
          {data.plannedWorkouts && data.plannedWorkouts.length > 0 && (
            <button
              onClick={() => setIsClearing(true)}
              className="p-4 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-2xl hover:scale-105 transition-all"
              title="Limpar todo o planejamento"
            >
              <Trash2 className="w-6 h-6" />
            </button>
          )}
          <button
            onClick={() => setIsPastingWorkout(true)}
            className="p-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-2xl hover:scale-105 transition-all"
            title="Importar treino por texto (IA)"
          >
            <Wand2 className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsAdding(true)}
            className="p-4 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
            title="Agendar treino"
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

      {/* Planned Workouts List */}
      <div className="space-y-6">
        {dayWorkouts.length > 0 ? (
          dayWorkouts.map((pw) => {
            const workout = data.workouts.find(w => w.id === pw.workoutId);
            if (!workout) return null;
            return (
              <div 
                key={pw.id}
                className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border-2 border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-2xl shadow-sm">
                      🏋️‍♂️
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">{workout.type}</p>
                      <h4 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                        {workout.name}
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{workout.exercises.length} exercícios • {workout.duration} min</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => onStartWorkout(workout)}
                      className="p-3 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-2xl transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                      title="Iniciar este treino agora com cronômetro"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      <span className="hidden sm:inline">Treinar</span>
                    </button>
                    <button 
                      onClick={() => {
                        const log: WorkoutLog = {
                          id: Math.random().toString(36).substring(2, 9),
                          workoutId: workout.id,
                          workoutName: workout.name,
                          date: new Date().toISOString().split('T')[0],
                          exercises: workout.exercises.map(ex => ({ ...ex })),
                          duration: workout.duration,
                          mood: 'good'
                        };
                        onLogWorkout(log);
                        setMessage({ type: 'success', text: 'Treino registrado com sucesso!' });
                        setTimeout(() => setMessage(null), 3000);
                      }}
                      className="p-3 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-2xl transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                      title="Registrar treino concluído sem cronômetro"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="hidden sm:inline">Registrar</span>
                    </button>
                    <button 
                      onClick={() => handleRemoveWorkout(pw.id)}
                      className="p-3 text-zinc-300 dark:text-zinc-600 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 rounded-[2.5rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center">
            <Dumbbell className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">Nenhum treino agendado para hoje.</p>
            <button 
              onClick={() => setIsAdding(true)}
              className="mt-4 text-emerald-500 font-bold text-sm hover:underline"
            >
              Agendar um treino
            </button>
          </div>
        )}
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
              <h3 className="text-xl font-bold mb-6 dark:text-white">Agendar Treino</h3>
              <form onSubmit={handleAddWorkout} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase">Selecione o Treino</label>
                  <select
                    value={selectedWorkoutId}
                    onChange={e => setSelectedWorkoutId(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 dark:text-white"
                    required
                  >
                    <option value="">Escolha um treino...</option>
                    {data.workouts.map(w => (
                      <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase">Dia da Semana</label>
                  <select
                    value={selectedDay}
                    onChange={e => setSelectedDay(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 outline-none dark:text-white"
                  >
                    {DAYS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!selectedWorkoutId}
                  className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 transition-all mt-4 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  Agendar para {DAYS.find(d => d.id === selectedDay)?.label}
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
              <h3 className="text-xl font-bold mb-2 dark:text-white">Limpar Agenda?</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                Tem certeza que deseja apagar todos os treinos agendados para a semana?
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

      {/* Paste Workout Modal */}
      <AnimatePresence>
        {isPastingWorkout && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isGenerating && setIsPastingWorkout(false)}
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
                Importar Treino com IA
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                Cole o texto do seu plano de treino abaixo. Nossa IA vai organizar tudo automaticamente na sua agenda.
              </p>
              
              <form onSubmit={handlePasteWorkout} className="space-y-4">
                <textarea
                  value={workoutText}
                  onChange={e => setWorkoutText(e.target.value)}
                  className="w-full h-48 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 dark:text-white resize-none"
                  placeholder="Ex: Treino A (Segunda): Supino 3x12, Agachamento 4x10... Treino B (Terça)..."
                  required
                  disabled={isGenerating}
                />
                
                <button
                  type="submit"
                  disabled={isGenerating || !workoutText.trim()}
                  className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 transition-all mt-4 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analisando treino...
                    </>
                  ) : (
                    'Importar Treino'
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
