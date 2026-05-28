import React, { useEffect, useMemo, useState } from 'react';
import { CardioLog } from '../types';
import { Activity, Flame, Footprints, HeartPulse, Plus, Save, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ActivityTrackerProps {
  steps: number;
  cardioLogs: CardioLog[];
  onSaveSteps: (steps: number) => void;
  onAddCardio: (cardio: Omit<CardioLog, 'id' | 'date'>) => void;
  onRemoveCardio: (id: string) => void;
}

const STEP_DATA = [
  { steps: 4000, kcal: 356 },
  { steps: 5000, kcal: 445 },
  { steps: 6000, kcal: 534 },
  { steps: 7000, kcal: 623 },
  { steps: 8000, kcal: 712 },
  { steps: 9000, kcal: 801 },
  { steps: 10000, kcal: 890 },
  { steps: 11000, kcal: 979 },
  { steps: 12000, kcal: 1068 },
  { steps: 13000, kcal: 1157 },
  { steps: 14000, kcal: 1246 },
  { steps: 15000, kcal: 1335 },
];

export const calculateStepCalories = (steps: number): number => {
  if (steps <= 0) return 0;

  const previous = [...STEP_DATA].reverse().find((point) => point.steps <= steps);
  const next = STEP_DATA.find((point) => point.steps > steps);

  if (previous && next) {
    return previous.kcal + ((steps - previous.steps) * (next.kcal - previous.kcal)) / (next.steps - previous.steps);
  }

  if (previous) {
    const beforePrevious = STEP_DATA[STEP_DATA.length - 2];
    const slope = (previous.kcal - beforePrevious.kcal) / (previous.steps - beforePrevious.steps);
    return previous.kcal + (steps - previous.steps) * slope;
  }

  const first = STEP_DATA[0];
  return (steps / first.steps) * first.kcal;
};

const parseNumber = (value: string): number => Number.parseFloat(value.replace(',', '.')) || 0;

const estimateCardioCalories = (duration: number, intensity: CardioLog['intensity']) => {
  const rateByIntensity = {
    low: 4,
    medium: 7,
    high: 10,
  };

  return Math.round(duration * rateByIntensity[intensity]);
};

const intensityLabels: Record<CardioLog['intensity'], string> = {
  low: 'Baixa',
  medium: 'Media',
  high: 'Alta',
};

export default function ActivityTracker({ steps, cardioLogs, onSaveSteps, onAddCardio, onRemoveCardio }: ActivityTrackerProps) {
  const [stepInput, setStepInput] = useState(String(steps || ''));
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('30');
  const [intensity, setIntensity] = useState<CardioLog['intensity']>('medium');
  const [calories, setCalories] = useState('');
  const [speed, setSpeed] = useState('');

  useEffect(() => {
    setStepInput(steps ? String(steps) : '');
  }, [steps]);

  const stepCalories = Math.round(calculateStepCalories(steps || 0));
  const cardioCalories = useMemo(
    () => cardioLogs.reduce((sum, log) => sum + (log.calories || 0), 0),
    [cardioLogs]
  );
  const cardioMinutes = useMemo(
    () => cardioLogs.reduce((sum, log) => sum + (log.duration || 0), 0),
    [cardioLogs]
  );
  const estimatedCalories = estimateCardioCalories(parseNumber(duration), intensity);

  const handleStepSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSaveSteps(parseNumber(stepInput));
  };

  const handleStepShortcut = (amount: number) => {
    const nextValue = Math.max(0, (steps || 0) + amount);
    setStepInput(String(nextValue));
    onSaveSteps(nextValue);
  };

  const handleCardioSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const parsedDuration = parseNumber(duration);
    if (!type.trim() || parsedDuration <= 0) return;

    onAddCardio({
      type: type.trim(),
      duration: parsedDuration,
      intensity,
      calories: parseNumber(calories) || estimatedCalories,
      speed: speed.trim() ? parseNumber(speed) : undefined,
    });

    setType('');
    setDuration('30');
    setIntensity('medium');
    setCalories('');
    setSpeed('');
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Atividade</h2>
        <p className="text-zinc-500 dark:text-zinc-400">Passos, cardio e gasto estimado de hoje.</p>
      </header>

      <section className="grid grid-cols-2 gap-3">
        <SummaryTile icon={<Footprints className="w-5 h-5" />} label="Passos" value={steps.toLocaleString('pt-BR')} tone="emerald" />
        <SummaryTile icon={<Flame className="w-5 h-5" />} label="Gasto" value={`${(stepCalories + cardioCalories).toLocaleString('pt-BR')} kcal`} tone="rose" />
        <SummaryTile icon={<HeartPulse className="w-5 h-5" />} label="Cardio" value={`${cardioMinutes} min`} tone="blue" />
        <SummaryTile icon={<Activity className="w-5 h-5" />} label="Sessoes" value={String(cardioLogs.length)} tone="amber" />
      </section>

      <form onSubmit={handleStepSubmit} className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 border border-black/5 dark:border-white/5 shadow-sm space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white">Passos do Dia</h3>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">{stepCalories.toLocaleString('pt-BR')} kcal estimadas</p>
          </div>
          <Footprints className="w-7 h-7 text-emerald-500" />
        </div>

        <div className="flex gap-3">
          <input
            type="number"
            min="0"
            value={stepInput}
            onChange={(event) => setStepInput(event.target.value)}
            className="min-w-0 flex-1 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
            placeholder="0"
          />
          <button
            type="submit"
            className="px-5 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
            title="Salvar passos"
          >
            <Save className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[1000, 3000, 5000].map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handleStepShortcut(amount)}
              className="py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all"
            >
              +{amount.toLocaleString('pt-BR')}
            </button>
          ))}
        </div>
      </form>

      <form onSubmit={handleCardioSubmit} className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 border border-black/5 dark:border-white/5 shadow-sm space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white">Cardio</h3>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">Estimativa atual: {estimatedCalories} kcal</p>
          </div>
          <HeartPulse className="w-7 h-7 text-rose-500" />
        </div>

        <input
          type="text"
          value={type}
          onChange={(event) => setType(event.target.value)}
          className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
          placeholder="Corrida, caminhada, bike..."
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            min="1"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
            placeholder="Min"
            required
          />
          <select
            value={intensity}
            onChange={(event) => setIntensity(event.target.value as CardioLog['intensity'])}
            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
          >
            <option value="low">Baixa</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            min="0"
            value={calories}
            onChange={(event) => setCalories(event.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
            placeholder="Kcal"
          />
          <input
            type="number"
            min="0"
            step="0.1"
            value={speed}
            onChange={(event) => setSpeed(event.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
            placeholder="Km/h"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-zinc-900 dark:bg-emerald-500 text-white rounded-2xl font-bold py-4 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-zinc-900/10 dark:shadow-emerald-500/20"
        >
          <Plus className="w-5 h-5" />
          Adicionar Cardio
        </button>
      </form>

      <section className="space-y-3">
        <h3 className="font-bold text-zinc-900 dark:text-white">Cardio de Hoje</h3>
        <AnimatePresence mode="popLayout">
          {cardioLogs.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-zinc-400 text-sm italic"
            >
              Nenhuma atividade registrada hoje.
            </motion.p>
          ) : (
            cardioLogs.map((log) => (
              <motion.div
                key={log.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-black/5 dark:border-white/5 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="min-w-0 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white truncate">{log.type}</h4>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                      {log.duration} min · {intensityLabels[log.intensity]} · {log.calories} kcal
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveCardio(log.id)}
                  className="p-2 text-zinc-300 hover:text-rose-500 transition-colors"
                  title="Remover cardio"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

function SummaryTile({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: 'emerald' | 'rose' | 'blue' | 'amber' }) {
  const toneClasses = {
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    rose: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-black/5 dark:border-white/5 shadow-sm">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${toneClasses[tone]}`}>
        {icon}
      </div>
      <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-lg font-bold text-zinc-900 dark:text-white truncate">{value}</p>
    </div>
  );
}
