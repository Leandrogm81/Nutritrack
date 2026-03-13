import React, { useState } from 'react';
import { DailyData, Workout, Exercise, PlannedWorkout } from '../types';
import { Dumbbell, Sparkles, Loader2, Plus, Trash2, Save, ChevronRight, ChevronDown, Play, Wand2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { geminiService } from '../services/geminiService';

interface WorkoutGeneratorProps {
  data: DailyData;
  onSaveWorkout: (workout: Workout) => void;
  onSaveWeeklyPlan: (workouts: Workout[], planned: PlannedWorkout[]) => void;
}

export default function WorkoutGenerator({ data, onSaveWorkout, onSaveWeeklyPlan }: WorkoutGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<{ workouts: Workout[], plannedWorkouts: PlannedWorkout[] } | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isPastingWorkout, setIsPastingWorkout] = useState(false);
  const [workoutText, setWorkoutText] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const generateWorkout = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const plan = await geminiService.generateWeeklyWorkoutPlan(data, prompt);
      setGeneratedPlan(plan);
    } catch (error) {
      console.error("Erro ao gerar treino:", error);
      setMessage({ type: 'error', text: "Não foi possível gerar o treino agora. Tente novamente." });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handlePasteWorkout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workoutText.trim()) return;

    setLoading(true);
    try {
      const plan = await geminiService.parseWorkoutText(workoutText);
      onSaveWeeklyPlan(plan.workouts, plan.plannedWorkouts);
      setMessage({ type: 'success', text: 'Treino importado com sucesso!' });
      setIsPastingWorkout(false);
      setWorkoutText('');
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error parsing workout:', error);
      setMessage({ type: 'error', text: 'Erro ao analisar o texto. Tente novamente.' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
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

      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-black/5 dark:border-white/5 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">IA Personal Trainer</h3>
              <p className="text-sm text-zinc-500">Gere um plano completo para sua semana.</p>
            </div>
          </div>
          <button
            onClick={() => setIsPastingWorkout(true)}
            className="p-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-xl hover:scale-105 transition-all"
            title="Importar treino por texto"
          >
            <Wand2 className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Quero um treino ABCD focado em hipertrofia, ou treino Full Body 3x na semana..."
            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white resize-none h-24"
          />
          
          <button
            onClick={generateWorkout}
            disabled={loading || !prompt.trim()}
            className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Dumbbell className="w-5 h-5" />
                Gerar Plano de Treino
              </>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {generatedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between px-4">
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white">Plano Gerado</h4>
              <p className="text-sm text-zinc-500">{generatedPlan.workouts.length} treinos diferentes</p>
            </div>

            <div className="space-y-4">
              {generatedPlan.workouts.map((workout) => (
                <div key={workout.id} className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 border border-black/5 dark:border-white/5 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h5 className="font-bold text-zinc-900 dark:text-white">{workout.name}</h5>
                      <p className="text-xs text-zinc-500">{workout.description}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 bg-emerald-100 dark:bg-emerald-500/10 rounded-lg text-emerald-600 uppercase">
                      {workout.type}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {workout.exercises.slice(0, 3).map((ex) => (
                      <div key={ex.id} className="flex justify-between text-xs">
                        <span className="text-zinc-600 dark:text-zinc-400">{ex.name}</span>
                        <span className="font-bold text-zinc-900 dark:text-white">{ex.sets}x{ex.reps}</span>
                      </div>
                    ))}
                    {workout.exercises.length > 3 && (
                      <p className="text-[10px] text-zinc-400 italic">...e mais {workout.exercises.length - 3} exercícios</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                onSaveWeeklyPlan(generatedPlan.workouts, generatedPlan.plannedWorkouts);
                setGeneratedPlan(null);
                setPrompt('');
              }}
              className="w-full py-4 bg-zinc-900 dark:bg-emerald-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-zinc-900/20 dark:shadow-emerald-500/20"
            >
              <Save className="w-5 h-5" />
              Salvar Plano Completo na Agenda
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Import Modal */}
      <AnimatePresence>
        {isPastingWorkout && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !loading && setIsPastingWorkout(false)}
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
                Cole o texto do seu plano de treino abaixo. Nossa IA vai ler e organizar tudo automaticamente.
              </p>
              
              <form onSubmit={handlePasteWorkout} className="space-y-4">
                <textarea
                  value={workoutText}
                  onChange={e => setWorkoutText(e.target.value)}
                  className="w-full h-48 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 dark:text-white resize-none"
                  placeholder="Ex: Segunda: Peito (Supino 3x12...), Terça: Costas..."
                  required
                  disabled={loading}
                />
                
                <button
                  type="submit"
                  disabled={loading || !workoutText.trim()}
                  className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 transition-all mt-4 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
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
