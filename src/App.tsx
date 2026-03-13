import React, { useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DailyData, Meal, PlannedMeal } from './types';
import Dashboard from './components/Dashboard';
import MealForm from './components/MealForm';
import WaterTracker from './components/WaterTracker';
import { 
  Download, Trash2, Utensils, Activity,
  LayoutDashboard, 
  TrendingUp, Calendar as CalendarIcon, User as UserIcon, Sparkles
} from 'lucide-react';
import CoachInsights from './components/CoachInsights';
import RecipeSuggestions from './components/RecipeSuggestions';
import DietGenerator from './components/DietGenerator';
import HistoryCalendar from './components/HistoryCalendar';
import UserProfileForm from './components/UserProfileForm';
import Analytics from './components/Analytics';
import WeeklyPlanner from './components/WeeklyPlanner';
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
  weightHistory: [],
  plannedMeals: [],
  theme: 'light',
  lastActiveDate: new Date().toISOString().split('T')[0],
  history: {},
};

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950">
          <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-2xl text-center space-y-6 border border-black/5 dark:border-white/5">
            <div className="w-20 h-20 bg-rose-100 dark:bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto">
              <Activity className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold dark:text-white">Ops! Algo deu errado.</h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Ocorreu um erro inesperado. Tente recarregar a página ou limpar os dados.
            </p>
            <button 
              onClick={() => {
                localStorage.removeItem('nutritrack_data');
                window.location.reload();
              }}
              className="w-full py-4 bg-zinc-900 dark:bg-emerald-500 text-white rounded-2xl font-bold hover:scale-105 transition-all"
            >
              Resetar Aplicativo
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-2xl font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  const [data, setData] = useLocalStorage<DailyData>('nutritrack_data', INITIAL_DATA);
  const [activeSection, setActiveSection] = React.useState<Section>('dashboard');

  // Ensure data structure is up to date (migration)
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    
    setData(prev => {
      // Deep merge with INITIAL_DATA to ensure all keys exist
      const updated = { 
        ...INITIAL_DATA,
        ...prev,
        goals: { ...INITIAL_DATA.goals, ...(prev?.goals || {}) },
        history: prev?.history || {},
        meals: Array.isArray(prev?.meals) ? prev.meals : [],
        weightHistory: Array.isArray(prev?.weightHistory) ? prev.weightHistory : [],
        plannedMeals: Array.isArray(prev?.plannedMeals) ? prev.plannedMeals : [],
      };

      let changed = false;
      if (updated.lastActiveDate !== today) {
        if (updated.lastActiveDate) {
          updated.history[updated.lastActiveDate] = {
            meals: [...(updated.meals || [])],
            waterMl: updated.waterMl || 0
          };
        }
        updated.meals = [];
        updated.waterMl = 0;
        updated.lastActiveDate = today;
        changed = true;
      }

      // Check if we actually changed anything to avoid infinite loops
      const hasAllKeys = prev && prev.goals && prev.meals && prev.weightHistory && prev.plannedMeals;
      if (!hasAllKeys || changed) return updated;
      return prev;
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
        ...(Array.isArray(prev.weightHistory) ? prev.weightHistory : []),
        { id: Math.random().toString(36).substring(2, 9), weight: profile.weight || 0, timestamp: Date.now() }
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



  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 pb-32 transition-colors">
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
            <ThemeToggle theme={data.theme} onToggle={handleToggleTheme} />
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
              <Analytics data={data} history={data.history || {}} userProfile={data.profile || null} />
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

          {activeSection === 'profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12 pb-32 px-1"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Configurações</h2>
              </div>
              
              <UserProfileForm profile={data.profile} onSave={handleSaveProfile} />
              
              <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800">
                <HistoryCalendar history={data.history || {}} userProfile={data.profile || null} todayData={{ meals: data.meals, waterMl: data.waterMl }} />
              </div>
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
    </ErrorBoundary>
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
          scale: active ? 1.1 : 1,
          y: active ? -4 : 0,
          rotate: 0
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 25
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
        translate="no"
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
