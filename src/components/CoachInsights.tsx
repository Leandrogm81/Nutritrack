import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { DailyData } from '../types';
import { geminiService } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';

interface CoachInsightsProps {
  data: DailyData;
}

export default function CoachInsights({ data }: CoachInsightsProps) {
  const [insight, setInsight] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInsight = async () => {
    if (data.meals.length === 0 && data.waterMl === 0) {
      setInsight("Comece seu dia registrando sua primeira refeição ou um copo d'água!");
      return;
    }

    setIsLoading(true);
    try {
      const result = await geminiService.generateDailyInsights(data);
      setInsight(result);
    } catch (error) {
      setInsight("Mantenha o foco nas suas metas de hoje!");
    } finally {
      setIsLoading(false);
    }
  };

  // Removido useEffect que chamava fetchInsight automaticamente

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-emerald-500 rounded-3xl sm:rounded-[2rem] p-5 sm:p-6 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Sparkles className="w-24 h-24" />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 fill-white/20" />
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">AI Coach Insight</span>
          </div>
          <button 
            onClick={fetchInsight}
            disabled={isLoading}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-12 flex items-center"
            >
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </motion.div>
          ) : (
            <motion.p 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-medium leading-tight"
            >
              {insight}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
