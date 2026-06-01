import React, { useState } from 'react';
import { DailyData, Workout, PlannedWorkout, WorkoutDraft } from '../types';
import { Dumbbell, Sparkles, Loader2, Plus, Trash2, Save, ChevronRight, ChevronDown, Play, Wand2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { geminiService } from '../services/geminiService';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface WorkoutGeneratorProps {
  data: DailyData;
  onSaveWorkout: (workout: Workout) => void;
  onDraftWorkouts: (draft: WorkoutDraft) => void;
}

export default function WorkoutGenerator({ data, onSaveWorkout, onDraftWorkouts }: WorkoutGeneratorProps) {
  const isOnline = useOnlineStatus();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isPastingWorkout, setIsPastingWorkout] = useState(false);
  const [workoutText, setWorkoutText] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const generateWorkout = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const plan = await geminiService.generateWeeklyWorkoutPlan(data, prompt);
      onDraftWorkouts(plan);
      setPrompt('');
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
      onDraftWorkouts(plan);
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
            disabled={!isOnline}
            className={`p-3 rounded-xl transition-all ${!isOnline ? 'bg-zinc-100/50 text-zinc-400 cursor-not-allowed' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:scale-105'}`}
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
            disabled={loading || !prompt.trim() || !isOnline}
            className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Dumbbell className="w-5 h-5" />
                {isOnline ? 'Gerar Plano de Treino' : 'IA Offline'}
              </>
            )}
          </button>
        </div>
      </div>



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
                  disabled={loading || !workoutText.trim() || !isOnline}
                  className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 transition-all mt-4 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analisando treino...
                    </>
                  ) : (
                    isOnline ? 'Importar Treino' : 'IA Offline'
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
