import React, { useState } from 'react';
import { SavedDiet } from '../types';
import { Trash2, Calendar, FileText, ChevronRight, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';

interface SavedDietsListProps {
  diets: SavedDiet[];
  onDelete: (id: string) => void;
}

export default function SavedDietsList({ diets, onDelete }: SavedDietsListProps) {
  const [selectedDiet, setSelectedDiet] = useState<SavedDiet | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl">
          <FileText className="w-6 h-6 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Minhas Dietas Salvas</h2>
      </div>
      
      {(!diets || diets.length === 0) ? (
        <div className="bg-white dark:bg-zinc-900 p-12 rounded-[2.5rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center shadow-sm">
          <p className="text-zinc-400 dark:text-zinc-500 text-sm font-medium italic">Você ainda não salvou nenhuma dieta.</p>
          <p className="text-zinc-300 dark:text-zinc-600 text-[10px] mt-2 font-bold uppercase tracking-widest">As dietas geradas pelo nutricionista aparecerão aqui.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {diets.map((diet) => (
              <motion.div
                key={diet.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-zinc-900 p-6 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
              >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 pr-12">
                  <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-lg line-clamp-1">{diet.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-400 dark:text-zinc-500 mt-1.5 uppercase font-bold tracking-widest">
                    <Calendar className="w-3 h-3" />
                    {new Date(diet.timestamp).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  <AnimatePresence mode="wait">
                    {confirmDeleteId === diet.id ? (
                      <motion.div
                        key="confirm"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-2"
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDeleteId(null);
                          }}
                          className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-xl text-[10px] font-bold uppercase tracking-widest"
                        >
                          Não
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(diet.id);
                            setConfirmDeleteId(null);
                          }}
                          className="px-4 py-2 bg-rose-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-rose-500/20"
                        >
                          Sim
                        </button>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="trash"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setConfirmDeleteId(diet.id);
                        }}
                        className="p-3 text-zinc-400 dark:text-zinc-500 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all rounded-2xl bg-zinc-50 dark:bg-zinc-800/50"
                        title="Excluir dieta"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              <div className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-6 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl leading-relaxed">
                {diet.content}
              </div>

              <button 
                onClick={() => setSelectedDiet(diet)}
                className="w-full py-4 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 rounded-[1.5rem] text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm"
              >
                Ver Dieta Completa <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      )}

      {/* Diet Detail Modal */}
      <AnimatePresence>
        {selectedDiet && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDiet(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-zinc-900 w-full max-w-2xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-950/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white text-xl tracking-tight">{selectedDiet.title}</h3>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-bold tracking-widest mt-1">
                      Salvo em {new Date(selectedDiet.timestamp).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedDiet(null)}
                  className="p-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-all"
                >
                  <X className="w-6 h-6 text-zinc-400 dark:text-zinc-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 md:p-12 text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                <div className="markdown-body prose prose-zinc dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:tracking-tight">
                  <Markdown>{selectedDiet.content}</Markdown>
                </div>
              </div>

              <div className="p-8 bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    const blob = new Blob([selectedDiet.content], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${selectedDiet.title.replace(/\s+/g, '_')}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="flex-1 bg-zinc-900 dark:bg-emerald-500 text-white font-bold py-5 rounded-2xl hover:bg-zinc-800 dark:hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/10 dark:shadow-emerald-500/20 text-sm uppercase tracking-widest"
                >
                  <Download className="w-5 h-5" />
                  Baixar como .txt
                </button>
                <button
                  onClick={() => setSelectedDiet(null)}
                  className="px-10 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold py-5 rounded-2xl hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all text-sm uppercase tracking-widest"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
