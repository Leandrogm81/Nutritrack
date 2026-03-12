import React, { useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DailyData, Meal, PlannedMeal } from './types';
import Dashboard from './components/Dashboard';
import MealForm from './components/MealForm';
import WaterTracker from './components/WaterTracker';
import { 
  Download, Trash2, Utensils, History, Clock, Activity, 
  LayoutDashboard, UtensilsCrossed, MessageSquare, ClipboardList,
  TrendingUp, Calendar as CalendarIcon, User as UserIcon, Award, Moon, Sun, Sparkles
} from 'lucide-react';
import CoachInsights from './components/CoachInsights';
import RecipeSuggestions from './components/RecipeSuggestions';
import DietGenerator from './components/DietGenerator';
import SavedDietsList from './components/SavedDietsList';
import UserProfileForm from './components/UserProfileForm';
import Analytics from './components/Analytics';
import WeeklyPlanner from './components/WeeklyPlanner';
import Achievements from './components/Achievements';
import ThemeToggle from './components/ThemeToggle';
import { motion, AnimatePresence } from 'motion/react';

type Section = 'dashboard' | 'recipes' | 'chat' | 'history' | 'analytics' | 'planner' | 'profile';

const INITIAL_DATA: DailyData = {
  meals: [],
  waterMl: 0,
  goals: {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fats: 65,
    water: 2500,
  },
  savedDiets: [],
  weightHistory: [],
  plannedMeals: [],
  streak: 0,
  theme: 'light',
};

export default function App() {
  const [data, setData] = useLocalStorage<DailyData>('nutritrack_data', INITIAL_DATA);
  const [activeSection, setActiveSection] = React.useState<Section>('dashboard');

  // Ensure data structure is up to date (migration)
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    
    setData(prev => {
      let updated = { ...prev };
      let changed = false;

      if (!updated.savedDiets) { updated.savedDiets = []; changed = true; }
      if (!updated.weightHistory) { updated.weightHistory = []; changed = true; }
      if (!updated.plannedMeals) { updated.plannedMeals = []; changed = true; }
      if (updated.streak === undefined) { updated.streak = 0; changed = true; }
      if (updated.theme === undefined) { updated.theme = 'light'; changed = true; }

      // Streak logic
      if (updated.lastActiveDate !== today) {
        const lastDate = updated.lastActiveDate ? new Date(updated.lastActiveDate) : null;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate && lastDate.toLocaleDateString() === yesterday.toLocaleDateString()) {
          updated.streak += 1;
        } else if (!lastDate) {
          updated.streak = 1;
        } else {
          updated.streak = 1; // Reset if missed a day
        }
        updated.lastActiveDate = today;
        changed = true;
      }

      return changed ? updated : prev;
    });
  }, []);

  // Handle theme
  useEffect(() => {
    if (data.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [data.theme]);

  const handleAddMeal = (mealData: Omit<Meal, 'id' | 'timestamp'>) => {
    const id = (typeof crypto !== 'undefined' && crypto.randomUUID) 
      ? crypto.randomUUID() 
      : Math.random().toString(36).substring(2, 15) + Date.now();

    const newMeal: Meal = {
      ...mealData,
      id,
      timestamp: Date.now(),
    };
    setData((prev) => ({
      ...prev,
      meals: [newMeal, ...prev.meals],
    }));
  };

  const handleAddWater = (amount: number) => {
    setData((prev) => ({
      ...prev,
      waterMl: prev.waterMl + amount,
    }));
  };

  const handleSaveProfile = (profile: any, goals: any) => {
    setData(prev => ({
      ...prev,
      profile,
      goals,
      weightHistory: [
        ...prev.weightHistory,
        { id: Math.random().toString(36).substring(2, 9), weight: profile.weight, timestamp: Date.now() }
      ]
    }));
  };

  const handleToggleTheme = (theme: 'light' | 'dark') => {
    setData(prev => ({ ...prev, theme }));
  };

  const handleRemoveMeal = (id: string) => {
    setData((prev) => ({
      ...prev,
      meals: prev.meals.filter((m) => m.id !== id),
    }));
  };

  const savedDietsRef = React.useRef<HTMLDivElement>(null);

  const handleSaveDiet = (content: string) => {
    try {
      console.log('Attempting to save diet. Content length:', content.length);
      if (!content || content.trim().length === 0) {
        console.warn('Empty content provided to handleSaveDiet');
        return;
      }

      // Check for duplicates
      const isDuplicate = data.savedDiets.some(d => d.content === content);
      if (isDuplicate) {
        console.log('Esta dieta já está salva!');
        return;
      }

      const title = content.split('\n')[0].substring(0, 40) || 'Nova Dieta';
      const id = typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : Math.random().toString(36).substring(2, 15);
        
      const newDiet = {
        id,
        title: title.replace(/[#*]/g, '').trim(),
        content,
        timestamp: Date.now(),
      };

      setData((prev) => {
        const currentDiets = Array.isArray(prev.savedDiets) ? prev.savedDiets : [];
        return {
          ...prev,
          savedDiets: [newDiet, ...currentDiets],
        };
      });

      console.log('Diet saved successfully with ID:', id);
    } catch (error) {
      console.error('Error in handleSaveDiet:', error);
    }
  };

  const handleUpdatePlanner = (meals: PlannedMeal[]) => {
    setData(prev => {
      const mealsWithIds = meals.map(m => ({
        ...m,
        id: m.id || Math.random().toString(36).substring(2, 9)
      }));
      
      return {
        ...prev,
        plannedMeals: mealsWithIds
      };
    });
  };

  const handleDeleteDiet = (id: string) => {
    console.log('Deleting diet with ID:', id);
    setData((prev) => {
      const currentDiets = Array.isArray(prev.savedDiets) ? prev.savedDiets : [];
      const newDiets = currentDiets.filter((d) => d.id !== id);
      return {
        ...prev,
        savedDiets: newDiets,
      };
    });
  };

  const handleReset = () => {
    console.log('Resetting daily data...');
    setData(prev => ({
      ...prev,
      meals: [],
      waterMl: 0,
    }));
    console.log('Daily data reset complete.');
  };

  // Daily reset logic: check if the last meal/water was on a different day
  useEffect(() => {
    const lastUpdate = localStorage.getItem('nutritrack_last_update');
    const today = new Date().toLocaleDateString();

    if (lastUpdate && lastUpdate !== today) {
      // It's a new day! Reset daily metrics but keep goals and saved diets
      setData(prev => ({
        ...prev,
        meals: [],
        waterMl: 0,
      }));
    }
    localStorage.setItem('nutritrack_last_update', today);
  }, []);

  const handleExport = () => {
    const payload = {
      summary: {
        totalCalories: data.meals.reduce((s, m) => s + m.calories, 0),
        totalWater: data.waterMl,
        mealCount: data.meals.length,
      },
      raw: data,
      exportedAt: new Date().toISOString(),
    };
    console.log('Exporting Data Payload:', JSON.stringify(payload, null, 2));
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 pb-32">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-zinc-50/80 backdrop-blur-md border-b border-black/5 px-4 sm:px-6 py-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">NutriTrack</h1>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleExport}
              className="p-2 hover:bg-zinc-100 rounded-xl text-zinc-500 transition-colors"
              title="Exportar Dados"
            >
              <Download className="w-5 h-5" />
            </button>
            <button 
              onClick={handleReset}
              className="p-2 hover:bg-zinc-100 rounded-xl text-zinc-500 transition-colors"
              title="Resetar Dia"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 sm:px-6 pt-8 pb-32 space-y-8">
        <AnimatePresence mode="wait">
          {activeSection === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8 pb-32"
            >
              <Dashboard data={data} />
              <WaterTracker currentMl={data.waterMl} onAddWater={handleAddWater} />
              <CoachInsights data={data} />
              
              <section className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
                    <Utensils className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-zinc-900 dark:text-white">Refeições de Hoje</h3>
                </div>

                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {data.meals.length === 0 ? (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8 text-zinc-400 text-sm italic"
                      >
                        Nenhuma refeição registrada ainda.
                      </motion.p>
                    ) : (
                      data.meals.slice(0, 3).map((meal) => (
                        <motion.div
                          key={meal.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-black/5 dark:border-white/5 flex justify-between items-center"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <div>
                              <h4 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">{meal.name}</h4>
                              <p className="text-xs text-zinc-400">{meal.calories} kcal</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleRemoveMeal(meal.id)}
                            className="p-2 text-zinc-300 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </section>
            </motion.div>
          )}

          {activeSection === 'analytics' && (
            <motion.div 
              key="analytics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-1"
            >
              <Analytics data={data} />
            </motion.div>
          )}

          {activeSection === 'planner' && (
            <motion.div 
              key="planner"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8 pb-32 px-1"
            >
              <WeeklyPlanner 
                data={data} 
                onUpdatePlanner={handleUpdatePlanner} 
                onLogMeal={handleAddMeal}
              />
              
              <div ref={savedDietsRef}>
                <SavedDietsList 
                  diets={data.savedDiets} 
                  onDelete={handleDeleteDiet} 
                />
              </div>
            </motion.div>
          )}

          {activeSection === 'recipes' && (
            <motion.div 
              key="recipes"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="pb-32"
            >
              <RecipeSuggestions data={data} />
            </motion.div>
          )}

          {activeSection === 'chat' && (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8 pb-32 px-1"
            >
              <DietGenerator 
                data={data} 
                onUpdatePlanner={handleUpdatePlanner}
              />
            </motion.div>
          )}

          {activeSection === 'history' && (
            <motion.div 
              key="history"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8 pb-32 px-1"
            >
              <header>
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Histórico</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Suas refeições registradas recentemente.</p>
              </header>
              <div className="grid grid-cols-1 gap-4">
                {data.meals.length === 0 ? (
                  <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-[2rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                    <History className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                    <p className="text-zinc-400 font-medium">Nenhuma refeição registrada ainda.</p>
                  </div>
                ) : (
                  data.meals.map((meal) => (
                    <motion.div 
                      key={meal.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] shadow-sm border border-black/5 dark:border-white/5 group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-colors">
                            <Utensils className="w-6 h-6 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                          </div>
                          <div>
                            <h4 className="font-bold text-zinc-900 dark:text-white">{meal.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                              <Clock className="w-3 h-3" />
                              {new Date(meal.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleRemoveMeal(meal.id)}
                          className="p-2 text-zinc-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2 pt-2 border-t border-zinc-50 dark:border-zinc-800 text-center">
                        <div>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase">Kcal</p>
                          <p className="text-sm font-bold text-emerald-600">{meal.calories}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase">Prot</p>
                          <p className="text-sm font-bold text-blue-600">{meal.protein}g</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase">Carb</p>
                          <p className="text-sm font-bold text-amber-600">{meal.carbs}g</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase">Gord</p>
                          <p className="text-sm font-bold text-rose-600">{meal.fats}g</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeSection === 'profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8 pb-32 px-1"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Configurações</h2>
                <ThemeToggle theme={data.theme} onToggle={handleToggleTheme} />
              </div>
              
              <Achievements data={data} />

              <UserProfileForm profile={data.profile} onSave={handleSaveProfile} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 sm:bottom-4 left-0 sm:left-4 right-0 sm:right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-t sm:border border-black/5 dark:border-white/5 px-4 py-3 z-50 rounded-none sm:rounded-[2rem] shadow-2xl shadow-black/5">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <NavButton 
            active={activeSection === 'dashboard'} 
            onClick={() => setActiveSection('dashboard')}
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Início"
          />
          <NavButton 
            active={activeSection === 'analytics'} 
            onClick={() => setActiveSection('analytics')}
            icon={<TrendingUp className="w-5 h-5" />}
            label="Progresso"
          />
          <NavButton 
            active={activeSection === 'planner'} 
            onClick={() => setActiveSection('planner')}
            icon={<CalendarIcon className="w-5 h-5" />}
            label="Plano"
          />
          <NavButton 
            active={activeSection === 'chat'} 
            onClick={() => setActiveSection('chat')}
            icon={<Sparkles className="w-5 h-5" />}
            label="Dieta"
          />
          <NavButton 
            active={activeSection === 'profile'} 
            onClick={() => setActiveSection('profile')}
            icon={<UserIcon className="w-5 h-5" />}
            label="Perfil"
          />
        </div>
      </nav>

      {/* Floating Action Button & Form (only on dashboard) */}
      {activeSection === 'dashboard' && (
        <MealForm onAddMeal={handleAddMeal} plannedMeals={data.plannedMeals} />
      )}
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 transition-all relative group ${active ? 'text-emerald-500' : 'text-zinc-400 dark:text-zinc-500'}`}
    >
      <motion.div 
        animate={{ 
          scale: active ? 1.25 : 1,
          y: active ? -8 : 0,
          rotate: active ? [0, -10, 10, 0] : 0
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 25,
          rotate: { duration: 0.4, ease: "easeInOut" }
        }}
        className={`p-3 rounded-2xl transition-all duration-300 ${
          active 
            ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/30' 
            : 'bg-transparent group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800'
        }`}
      >
        {icon}
      </motion.div>
      <motion.span 
        animate={{ 
          opacity: active ? 1 : 0.5,
          scale: active ? 1.1 : 1,
          y: active ? -2 : 0
        }}
        className="text-[10px] font-bold uppercase tracking-widest"
      >
        {label}
      </motion.span>
      {active && (
        <motion.div 
          layoutId="nav-indicator"
          className="absolute -bottom-2 w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />
      )}
    </button>
  );
}

// End of file
