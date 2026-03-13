import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { DailyData, UserProfile, WorkoutLog } from '../types';
import { TrendingUp, Scale, PieChart, Calendar, Activity, Dumbbell } from 'lucide-react';
import { motion } from 'motion/react';

interface AnalyticsProps {
  data: DailyData;
  history: Record<string, { meals: any[], waterMl: number, workoutLogs?: WorkoutLog[] }>;
  userProfile: UserProfile | null;
}

export default function Analytics({ data, history, userProfile }: AnalyticsProps) {
  // Prepare workout frequency data (last 7 days)
  const workoutTrendData = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    let count = 0;
    if (i === 0) {
      count = data.workoutLogs?.filter(log => log.date === dateStr).length || 0;
    } else {
      const dayData = history[dateStr];
      count = dayData?.workoutLogs?.length || 0;
    }

    workoutTrendData.push({
      date: d.toLocaleDateString('pt-BR', { weekday: 'short' }),
      count
    });
  }

  // Prepare weight data
  const weightHistory = data.weightHistory || [];
  const weightData = weightHistory.map(entry => ({
    date: new Date(entry.timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    weight: entry.weight,
    muscle: entry.muscleMassPercentage,
    fat: entry.bodyFatPercentage,
    visceral: entry.visceralFat
  })).slice(-7); // Last 7 entries

  // Prepare macro data for today
  const totalMacros = data.meals.reduce((acc, meal) => ({
    protein: acc.protein + meal.protein,
    carbs: acc.carbs + meal.carbs,
    fats: acc.fats + meal.fats,
    calories: acc.calories + meal.calories
  }), { protein: 0, carbs: 0, fats: 0, calories: 0 });

  const macroDistribution = [
    { name: 'Proteína', value: totalMacros.protein, color: '#3b82f6' },
    { name: 'Carbo', value: totalMacros.carbs, color: '#f59e0b' },
    { name: 'Gordura', value: totalMacros.fats, color: '#f43f5e' }
  ];

  // Prepare calorie trend data (last 7 days)
  const calorieTrendData = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    let cals = 0;
    if (i === 0) {
      // Today
      cals = data.meals.reduce((sum, m) => sum + m.calories, 0);
    } else {
      // History
      const dayData = history[dateStr];
      cals = dayData ? dayData.meals.reduce((sum, m) => sum + m.calories, 0) : 0;
    }
    
    // Calculate goal calories safely
    let goalCals = 2000;
    if (userProfile && userProfile.goal === 'lose') goalCals = 1800;
    if (userProfile && userProfile.goal === 'gain') goalCals = 2500;
    if (data.goals && data.goals.calories) goalCals = data.goals.calories;

    calorieTrendData.push({
      date: d.toLocaleDateString('pt-BR', { weekday: 'short' }),
      calories: cals,
      goal: goalCals
    });
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-md">
          <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase mb-2 tracking-widest">{label}</p>
          <p className="text-lg font-bold text-zinc-900 dark:text-white">
            {payload[0].value} <span className="text-xs font-medium text-zinc-400">kg</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 pb-32">
      <header>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Progresso</h2>
        <p className="text-zinc-500 dark:text-zinc-400">Acompanhe sua evolução física e nutricional.</p>
      </header>

      {/* Calorie Trend Chart */}
      <section className="bg-white dark:bg-zinc-900 rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 border border-black/5 dark:border-white/5 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-2xl">
            <Activity className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white">Tendência de Calorias</h3>
            <p className="text-xs text-zinc-500">Últimos 7 dias</p>
          </div>
        </div>

        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={calorieTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-zinc-100 dark:text-zinc-800" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-md">
                        <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase mb-2 tracking-widest">{label}</p>
                        <p className="text-lg font-bold text-orange-500">
                          {payload[0].value} <span className="text-xs font-medium text-zinc-400">kcal</span>
                        </p>
                        <p className="text-xs font-bold text-zinc-500 mt-1">
                          Meta: {payload[1].value} kcal
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="calories" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Line type="monotone" dataKey="goal" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Workout Frequency Chart */}
      <section className="bg-white dark:bg-zinc-900 rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 border border-black/5 dark:border-white/5 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl">
            <Dumbbell className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white">Frequência de Treinos</h3>
            <p className="text-xs text-zinc-500">Últimos 7 dias</p>
          </div>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workoutTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-zinc-100 dark:text-zinc-800" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                allowDecimals={false}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-md">
                        <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase mb-2 tracking-widest">{label}</p>
                        <p className="text-lg font-bold text-emerald-500">
                          {payload[0].value} <span className="text-xs font-medium text-zinc-400">treinos</span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Weight Chart */}
      <section className="bg-white dark:bg-zinc-900 rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 border border-black/5 dark:border-white/5 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl">
              <Scale className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white">Evolução de Peso</h3>
              <p className="text-xs text-zinc-500">Últimas medições</p>
            </div>
          </div>
          {weightData.length > 1 && (
            <div className="text-right">
              <p className="text-sm font-bold text-emerald-500">
                {weightData[weightData.length - 1].weight - weightData[0].weight > 0 ? '+' : ''}
                {(weightData[weightData.length - 1].weight - weightData[0].weight).toFixed(1)} kg
              </p>
              <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">No período</p>
            </div>
          )}
        </div>

        <div className="h-[250px] w-full">
          {weightData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-zinc-100 dark:text-zinc-800" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  hide 
                  domain={['dataMin - 2', 'dataMax + 2']} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#10b981" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-zinc-300" />
              </div>
              <p className="text-sm text-zinc-400 font-medium max-w-[200px]">
                Registre seu peso no perfil para ver o gráfico de evolução.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bioimpedance Trends */}
      {weightData.some(d => d.muscle || d.fat || d.visceral) && (
        <section className="bg-white dark:bg-zinc-900 rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 border border-black/5 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-2xl">
              <Activity className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white">Bioimpedância</h3>
              <p className="text-xs text-zinc-500">Tendência de composição corporal</p>
            </div>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-zinc-100 dark:text-zinc-800" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  hide 
                  domain={[0, 'auto']} 
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-md">
                          <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase mb-2 tracking-widest">{label}</p>
                          <div className="space-y-1">
                            {payload.map((p: any) => (
                              <p key={p.name} className="text-sm font-bold" style={{ color: p.color }}>
                                {p.name}: {p.value}{p.name === 'Visceral' ? '' : '%'}
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line name="Músculo" type="monotone" dataKey="muscle" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} connectNulls />
                <Line name="Gordura" type="monotone" dataKey="fat" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} connectNulls />
                <Line name="Visceral" type="monotone" dataKey="visceral" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* Macro Distribution */}
      <section className="bg-white dark:bg-zinc-900 rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 border border-black/5 dark:border-white/5 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl">
            <PieChart className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white">Distribuição de Macros</h3>
            <p className="text-xs text-zinc-500">Consumo total de hoje</p>
          </div>
        </div>

        <div className="h-[200px] w-full">
          {totalMacros.calories > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={macroDistribution} layout="vertical" margin={{ left: 0, right: 40 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }}
                  width={80}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 p-3 rounded-xl shadow-xl backdrop-blur-md">
                          <p className="text-sm font-bold text-zinc-900 dark:text-white">{payload[0].value}g</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={32}>
                  {macroDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-sm text-zinc-400 font-medium">
                Adicione refeições hoje para ver a distribuição.
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {macroDistribution.map((macro) => (
            <div key={macro.name} className="text-center">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{macro.name}</p>
              <p className="text-lg font-bold dark:text-white" style={{ color: macro.color }}>{macro.value}g</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
