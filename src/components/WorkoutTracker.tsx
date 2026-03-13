import React, { useState, useRef } from 'react';
import { Workout, WorkoutLog, Exercise } from '../types';
import { Dumbbell, Clock, CheckCircle2, ChevronRight, Play, Trash2, History, Plus, Camera, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { geminiService } from '../services/geminiService';

interface WorkoutTrackerProps {
  workouts: Workout[];
  onLogWorkout: (log: WorkoutLog) => void;
  onDeleteWorkout: (id: string) => void;
}

export default function WorkoutTracker({ workouts, onLogWorkout, onDeleteWorkout }: WorkoutTrackerProps) {
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [currentLog, setCurrentLog] = useState<Partial<WorkoutLog> | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  const [isEquipmentAnalysisOpen, setIsEquipmentAnalysisOpen] = useState(false);
  const [equipmentResult, setEquipmentResult] = useState<{ name: string, description: string, canSubstitute: boolean, substitutionReason: string } | null>(null);
  const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentExerciseForAnalysis, setCurrentExerciseForAnalysis] = useState<string | null>(null);

  const startWorkout = (workout: Workout) => {
    setActiveWorkout(workout);
    setStartTime(Date.now());
    setCurrentLog({
      workoutId: workout.id,
      workoutName: workout.name,
      exercises: workout.exercises.map(ex => ({ ...ex }))
    });
  };

  const finishWorkout = () => {
    if (!currentLog || !startTime) return;
    
    const duration = Math.round((Date.now() - startTime) / 60000);
    const finalLog: WorkoutLog = {
      id: Math.random().toString(36).substring(2, 9),
      workoutId: currentLog.workoutId!,
      workoutName: currentLog.workoutName!,
      date: new Date().toISOString().split('T')[0],
      exercises: currentLog.exercises as Exercise[],
      duration,
      mood: 'good'
    };

    onLogWorkout(finalLog);
    setActiveWorkout(null);
    setCurrentLog(null);
    setStartTime(null);
  };

  const updateExercise = (exerciseId: string, field: keyof Exercise, value: any) => {
    if (!currentLog) return;
    const updatedExercises = currentLog.exercises?.map(ex => 
      ex.id === exerciseId ? { ...ex, [field]: value } : ex
    );
    setCurrentLog({ ...currentLog, exercises: updatedExercises });
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleGymEquipmentCapture = (exerciseName: string) => {
    setCurrentExerciseForAnalysis(exerciseName);
    fileInputRef.current?.click();
  };

  const handleEquipmentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentExerciseForAnalysis) return;

    setIsEquipmentLoading(true);
    try {
      const base64 = await fileToBase64(file);
      const base64Data = base64.split(',')[1];
      
      const result = await geminiService.analyzeGymEquipment(base64Data, file.type, currentExerciseForAnalysis);
      setEquipmentResult(result);
      setIsEquipmentAnalysisOpen(true);
    } catch (error) {
      console.error('Erro ao analisar equipamento.');
    } finally {
      setIsEquipmentLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (activeWorkout) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6 pb-32"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{activeWorkout.name}</h3>
          <div className="flex items-center gap-2 text-emerald-500 font-mono font-bold">
            <Clock className="w-4 h-4" />
            Em andamento...
          </div>
        </div>

        <div className="space-y-4">
          {currentLog?.exercises?.map((ex, idx) => (
            <div key={ex.id} className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-black/5 dark:border-white/5 space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-zinc-900 dark:text-white">{ex.name}</h4>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleGymEquipmentCapture(ex.name)}
                    className="p-2 bg-emerald-100 dark:bg-emerald-500/10 rounded-full text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-500/20 transition-all"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] font-bold px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-400">
                    EXERCÍCIO {idx + 1}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Séries x Reps</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={ex.sets}
                      onChange={(e) => updateExercise(ex.id, 'sets', parseInt(e.target.value))}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-sm dark:text-white"
                    />
                    <span className="text-zinc-400">x</span>
                    <input 
                      type="text" 
                      value={ex.reps}
                      onChange={(e) => updateExercise(ex.id, 'reps', e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-sm dark:text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Carga (kg)</label>
                  <input 
                    type="number" 
                    value={ex.weight || ''}
                    placeholder="0"
                    onChange={(e) => updateExercise(ex.id, 'weight', parseFloat(e.target.value))}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-sm dark:text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleEquipmentImageUpload}
          accept="image/*"
          capture="environment"
          className="hidden"
        />

        <AnimatePresence>
          {isEquipmentAnalysisOpen && equipmentResult && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-zinc-900 rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-zinc-100 dark:border-zinc-800"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-lg dark:text-white">{equipmentResult.name}</h4>
                  <button onClick={() => setIsEquipmentAnalysisOpen(false)} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
                    <X className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">{equipmentResult.description}</p>
                <div className={`p-4 rounded-2xl mb-4 ${equipmentResult.canSubstitute ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-rose-50 dark:bg-rose-500/10'}`}>
                  <p className={`font-bold text-sm ${equipmentResult.canSubstitute ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                    {equipmentResult.canSubstitute ? 'Pode substituir!' : 'Não recomendado.'}
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">{equipmentResult.substitutionReason}</p>
                </div>
                <button 
                  onClick={() => setIsEquipmentAnalysisOpen(false)}
                  className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-sm"
                >
                  Entendido
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {isEquipmentLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
        )}

        <button
          onClick={finishWorkout}
          className="w-full py-6 bg-emerald-500 text-white rounded-[2rem] font-bold text-lg uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all"
        >
          Finalizar Treino
        </button>
        
        <button
          onClick={() => {
            setActiveWorkout(null);
            setCurrentLog(null);
            setStartTime(null);
          }}
          className="w-full py-4 text-rose-500 font-bold text-sm hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all"
        >
          Cancelar Treino
        </button>
      </motion.div>
    );
  }
// ... (rest of the file remains the same)

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Meus Treinos</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Escolha um treino para começar.</p>
        </div>
      </header>

      <div className="space-y-4">
        {workouts.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-dashed border-zinc-300 dark:border-zinc-700">
            <Dumbbell className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-500 font-medium">Nenhum treino salvo ainda.</p>
            <p className="text-xs text-zinc-400 mt-1">Use a IA para gerar seu primeiro treino!</p>
          </div>
        ) : (
          workouts.map((workout) => (
            <motion.div
              key={workout.id}
              layout
              className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-black/5 dark:border-white/5 shadow-sm group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-white">{workout.name}</h4>
                  <p className="text-xs text-zinc-500">{workout.exercises.length} exercícios • {workout.duration} min</p>
                </div>
                <button 
                  onClick={() => onDeleteWorkout(workout.id)}
                  className="p-2 text-zinc-300 hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                {workout.exercises.slice(0, 3).map(ex => (
                  <span key={ex.id} className="text-[10px] font-bold px-3 py-1 bg-zinc-50 dark:bg-zinc-800 rounded-full text-zinc-500 whitespace-nowrap">
                    {ex.name}
                  </span>
                ))}
                {workout.exercises.length > 3 && (
                  <span className="text-[10px] font-bold px-3 py-1 bg-zinc-50 dark:bg-zinc-800 rounded-full text-zinc-500">
                    +{workout.exercises.length - 3}
                  </span>
                )}
              </div>

              <button
                onClick={() => startWorkout(workout)}
                className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10"
              >
                <Play className="w-4 h-4 fill-current" />
                Iniciar Treino
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
