import React, { useState, useRef } from 'react';
import { Plus, X, Sparkles, Loader2, Camera, Upload, ScanLine, CheckCircle2, Barcode } from 'lucide-react';
import { Meal, PlannedMeal } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { geminiService } from '../services/geminiService';
import BarcodeScanner from './BarcodeScanner';

interface MealFormProps {
  onAddMeal: (meal: Omit<Meal, 'id' | 'timestamp'>) => void;
  plannedMeals: PlannedMeal[];
}

export default function MealForm({ onAddMeal, plannedMeals }: MealFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAiMode, setIsAiMode] = useState(true);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [aiInput, setAiInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const labelInputRef = useRef<HTMLInputElement>(null);
  
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');

  const daysMap = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
  const todayId = daysMap[new Date().getDay()];
  const todaysMeals = plannedMeals.filter(m => m.day === todayId);

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    setIsAiLoading(true);
    try {
      const result = await geminiService.parseMealDescription(aiInput);
      fillManualForm(result);
    } catch (error) {
      console.error('Erro ao processar com IA. Tente descrever de outra forma.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, mode: 'dish' | 'label') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAiLoading(true);
    try {
      const base64 = await fileToBase64(file);
      const base64Data = base64.split(',')[1];
      
      const result = mode === 'dish' 
        ? await geminiService.analyzeMealImage(base64Data, file.type)
        : await geminiService.scanNutritionalLabel(base64Data, file.type);
        
      fillManualForm(result);
    } catch (error) {
      console.error(mode === 'dish' ? 'Erro ao analisar imagem.' : 'Erro ao ler rótulo.');
    } finally {
      setIsAiLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (labelInputRef.current) labelInputRef.current.value = '';
    }
  };

  const handleBarcodeScan = async (barcode: string) => {
    setIsScannerOpen(false);
    setIsAiLoading(true);
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const data = await response.json();
      
      if (data.status === 1 && data.product) {
        const product = data.product;
        const nutriments = product.nutriments || {};
        
        fillManualForm({
          name: product.product_name || 'Produto Desconhecido',
          calories: Math.round(nutriments['energy-kcal_100g'] || 0),
          protein: Math.round(nutriments.proteins_100g || 0),
          carbs: Math.round(nutriments.carbohydrates_100g || 0),
          fats: Math.round(nutriments.fat_100g || 0)
        });
      } else {
        setErrorMessage('Produto não encontrado na base de dados.');
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      setErrorMessage('Erro ao buscar produto.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const fillManualForm = (result: Omit<Meal, 'id' | 'timestamp'>) => {
    setName(result.name);
    setCalories(result.calories.toString());
    setProtein(result.protein.toString());
    setCarbs(result.carbs.toString());
    setFats(result.fats.toString());
    setIsAiMode(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !calories) return;

    onAddMeal({
      name,
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fats: Number(fats) || 0,
    });

    resetForm();
    setIsOpen(false);
  };

  const resetForm = () => {
    setName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFats('');
    setAiInput('');
    setIsAiMode(true);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-6 w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-600 transition-colors z-40 shadow-emerald-500/20"
      >
        <Plus className="w-8 h-8" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="relative bg-white dark:bg-zinc-900 w-full max-w-md rounded-t-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 shadow-2xl max-h-[94vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex justify-between items-center mb-6 sm:mb-8">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                    {isAiMode ? 'Registro Inteligente' : 'Confirmar Dados'}
                  </h3>
                  {isAiMode && <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 fill-emerald-500/20" />}
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 sm:p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all">
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400 dark:text-zinc-500" />
                </button>
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900/50 rounded-2xl flex justify-between items-center">
                  <span className="text-red-600 dark:text-red-400 text-sm font-medium">{errorMessage}</span>
                  <button onClick={() => setErrorMessage(null)} className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full transition-colors">
                    <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              )}

              {isAiMode && todaysMeals.length > 0 && (
                <div className="mb-6 sm:mb-8">
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2 sm:mb-3">Sugestões do seu Plano de Hoje</p>
                  <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {todaysMeals.map(meal => (
                      <button
                        key={meal.id}
                        onClick={() => {
                          onAddMeal({
                            name: meal.name,
                            calories: meal.calories,
                            protein: meal.protein,
                            carbs: meal.carbs,
                            fats: meal.fats
                          });
                          setIsOpen(false);
                        }}
                        className="flex-shrink-0 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-xl sm:rounded-2xl p-2 sm:p-3 text-left hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all min-w-[120px] sm:min-w-[140px]"
                      >
                        <p className="font-bold text-emerald-900 dark:text-emerald-100 text-xs sm:text-sm line-clamp-1">{meal.name}</p>
                        <p className="text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400 mt-0.5 sm:mt-1">{meal.calories} kcal</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isAiMode ? (
                <div className="space-y-6 sm:space-y-8">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center justify-center gap-2 p-3 sm:p-6 bg-emerald-50 dark:bg-emerald-500/5 border-2 border-dashed border-emerald-200 dark:border-emerald-500/20 rounded-2xl sm:rounded-[2rem] hover:bg-emerald-100 dark:hover:bg-emerald-500/10 transition-all group"
                    >
                      <div className="p-2 sm:p-4 bg-white dark:bg-zinc-800 rounded-xl sm:rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                        <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-500" />
                      </div>
                      <span className="text-[8px] sm:text-[10px] font-bold text-emerald-700 dark:text-emerald-500 uppercase tracking-widest text-center">Foto</span>
                    </button>
                    <button
                      onClick={() => labelInputRef.current?.click()}
                      className="flex flex-col items-center justify-center gap-2 p-3 sm:p-6 bg-blue-50 dark:bg-blue-500/5 border-2 border-dashed border-blue-200 dark:border-blue-500/20 rounded-2xl sm:rounded-[2rem] hover:bg-blue-100 dark:hover:bg-blue-500/10 transition-all group"
                    >
                      <div className="p-2 sm:p-4 bg-white dark:bg-zinc-800 rounded-xl sm:rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                        <ScanLine className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-500" />
                      </div>
                      <span className="text-[8px] sm:text-[10px] font-bold text-blue-700 dark:text-blue-500 uppercase tracking-widest text-center">Rótulo</span>
                    </button>
                    <button
                      onClick={() => setIsScannerOpen(true)}
                      className="flex flex-col items-center justify-center gap-2 p-3 sm:p-6 bg-purple-50 dark:bg-purple-500/5 border-2 border-dashed border-purple-200 dark:border-purple-500/20 rounded-2xl sm:rounded-[2rem] hover:bg-purple-100 dark:hover:bg-purple-500/10 transition-all group"
                    >
                      <div className="p-2 sm:p-4 bg-white dark:bg-zinc-800 rounded-xl sm:rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                        <Barcode className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-500" />
                      </div>
                      <span className="text-[8px] sm:text-[10px] font-bold text-purple-700 dark:text-purple-500 uppercase tracking-widest text-center">Código</span>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => handleImageUpload(e, 'dish')}
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                    />
                    <input
                      type="file"
                      ref={labelInputRef}
                      onChange={(e) => handleImageUpload(e, 'label')}
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-zinc-100 dark:border-zinc-800"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                      <span className="bg-white dark:bg-zinc-900 px-4 text-zinc-400 dark:text-zinc-500 font-bold">Ou descreva</span>
                    </div>
                  </div>

                  <form onSubmit={handleAiSubmit} className="space-y-6">
                    <textarea
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      placeholder="Ex: Comi 2 ovos cozidos e uma fatia de pão integral..."
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-[1.5rem] px-6 py-4 sm:py-6 h-24 sm:h-32 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none dark:text-white leading-relaxed"
                    />
                    <div className="flex gap-3 sm:gap-4">
                      <button
                        type="submit"
                        disabled={isAiLoading || !aiInput.trim()}
                        className="flex-1 bg-emerald-500 text-white font-bold py-4 sm:py-5 rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 text-[10px] sm:text-sm uppercase tracking-widest"
                      >
                        {isAiLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                            Analisando...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                            Analisar Texto
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAiMode(false)}
                        className="px-6 sm:px-8 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold py-4 sm:py-5 rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all text-[10px] sm:text-sm uppercase tracking-widest"
                      >
                        Manual
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Nome do Alimento</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Calorias (kcal)</label>
                      <input
                        type="number"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Proteína (g)</label>
                      <input
                        type="number"
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Carboidratos (g)</label>
                      <input
                        type="number"
                        value={carbs}
                        onChange={(e) => setCarbs(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Gorduras (g)</label>
                      <input
                        type="number"
                        value={fats}
                        onChange={(e) => setFats(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 sm:gap-4 pt-4 sm:pt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-emerald-500 text-white font-bold py-4 sm:py-5 rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 text-[10px] sm:text-sm uppercase tracking-widest"
                    >
                      Salvar Refeição
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAiMode(true)}
                      className="px-6 sm:px-8 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold py-4 sm:py-5 rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all text-[10px] sm:text-sm uppercase tracking-widest"
                    >
                      Voltar IA
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isScannerOpen && (
          <BarcodeScanner 
            onScan={handleBarcodeScan} 
            onClose={() => setIsScannerOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
