import React from 'react';
import { Droplets, Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface WaterTrackerProps {
  currentMl: number;
  onAddWater: (amount: number) => void;
}

export default function WaterTracker({ currentMl, onAddWater }: WaterTrackerProps) {
  const quickAmounts = [250, 500];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 shadow-sm border border-black/5 dark:border-white/5">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl">
          <Droplets className="w-6 h-6 text-blue-500" />
        </div>
        <h3 className="font-bold text-zinc-900 dark:text-white">Adicionar Água</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {quickAmounts.map((amount) => (
          <motion.button
            key={amount}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddWater(amount)}
            className="flex flex-col items-center justify-center p-6 bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/20 rounded-[1.5rem] hover:bg-blue-100 dark:hover:bg-blue-500/10 transition-all group"
          >
            <Plus className="w-6 h-6 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold text-blue-700 dark:text-blue-400">+{amount}ml</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
