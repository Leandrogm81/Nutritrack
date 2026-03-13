import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Download } from 'lucide-react';
import { DailyData, UserProfile } from '../types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface HistoryCalendarProps {
  history: Record<string, { meals: any[], waterMl: number }>;
  userProfile: UserProfile | null;
  todayData: { meals: any[], waterMl: number };
}

export default function HistoryCalendar({ history, userProfile, todayData }: HistoryCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10 sm:h-12"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const isToday = new Date().toISOString().split('T')[0] === dateStr;
    const data = isToday ? todayData : history[dateStr];
    const hasData = !!data && Array.isArray(data.meals) && (data.meals.length > 0 || (data.waterMl || 0) > 0);
    const isSelected = selectedDate === dateStr;

    let statusColor = 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400';
    if (hasData && data) {
      const totalCals = (data.meals || []).reduce((sum, m) => sum + (m.calories || 0), 0);
      let goal = 2000;
      if (userProfile && userProfile.goal === 'lose') goal = 1800;
      if (userProfile && userProfile.goal === 'gain') goal = 2500;

      if (totalCals > goal * 1.1) {
        statusColor = 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold';
      } else if (totalCals < goal * 0.9) {
        statusColor = 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 font-bold';
      } else {
        statusColor = 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold';
      }
    }

    days.push(
      <button
        key={i}
        onClick={() => setSelectedDate(dateStr)}
        className={`h-10 sm:h-12 rounded-xl flex items-center justify-center text-xs sm:text-sm transition-all
          ${statusColor}
          ${isSelected ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-zinc-900' : ''}
          ${isToday && !isSelected ? 'border-2 border-emerald-500' : ''}
        `}
      >
        {i}
      </button>
    );
  }

  const selectedData = selectedDate ? (selectedDate === new Date().toISOString().split('T')[0] ? todayData : history[selectedDate]) : null;

  const exportPDF = () => {
    if (!userProfile) return;
    
    const doc = new jsPDF();
    const todayStr = new Date().toLocaleDateString('pt-BR');
    
    doc.setFontSize(20);
    doc.text('Relatório Nutricional - NutriTrack', 14, 22);
    
    doc.setFontSize(12);
    doc.text(`Paciente: ${userProfile.name || 'Não informado'}`, 14, 32);
    doc.text(`Data de Geração: ${todayStr}`, 14, 38);
    
    // Get last 7 days
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      last7Days.push(d.toISOString().split('T')[0]);
    }

    const tableData = last7Days.map(date => {
      const isToday = new Date().toISOString().split('T')[0] === date;
      const data = isToday ? todayData : history[date];
      if (!data || (data.meals.length === 0 && data.waterMl === 0)) return [date.split('-').reverse().join('/'), 'Sem dados', '-', '-', '-', '-'];
      
      const cals = data.meals.reduce((sum, m) => sum + m.calories, 0);
      const prot = data.meals.reduce((sum, m) => sum + m.protein, 0);
      const carbs = data.meals.reduce((sum, m) => sum + m.carbs, 0);
      const fats = data.meals.reduce((sum, m) => sum + m.fats, 0);
      
      let goalCals = 2000;
      if (userProfile && userProfile.goal === 'lose') goalCals = 1800;
      if (userProfile && userProfile.goal === 'gain') goalCals = 2500;

      return [
        date.split('-').reverse().join('/'),
        `${cals} / ${goalCals}`,
        `${prot}g`,
        `${carbs}g`,
        `${fats}g`,
        `${data.waterMl}ml`
      ];
    });

    autoTable(doc, {
      startY: 45,
      head: [['Data', 'Calorias', 'Proteínas', 'Carboidratos', 'Gorduras', 'Água']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] } // emerald-500
    });

    doc.save(`relatorio-nutritrack-${todayStr.replace(/\//g, '-')}.pdf`);
  };

  const exportCSV = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      last7Days.push(d.toISOString().split('T')[0]);
    }

    const csvRows = [];
    csvRows.push(['Data', 'Refeição', 'Calorias', 'Proteína (g)', 'Carboidratos (g)', 'Gorduras (g)', 'Água (ml)'].join(','));

    last7Days.forEach(date => {
      const isToday = new Date().toISOString().split('T')[0] === date;
      const data = isToday ? todayData : history[date];
      
      if (!data || (data.meals.length === 0 && data.waterMl === 0)) {
        csvRows.push([date.split('-').reverse().join('/'), 'Sem dados', '-', '-', '-', '-', '-'].join(','));
        return;
      }

      if (data.meals.length === 0) {
        csvRows.push([date.split('-').reverse().join('/'), 'Nenhuma refeição', '-', '-', '-', '-', data.waterMl].join(','));
      } else {
        data.meals.forEach((meal, index) => {
          csvRows.push([
            index === 0 ? date.split('-').reverse().join('/') : '',
            meal.name,
            meal.calories,
            meal.protein,
            meal.carbs,
            meal.fats,
            index === 0 ? data.waterMl : ''
          ].join(','));
        });
      }
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_nutricional_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white">
          <CalendarIcon className="w-6 h-6 text-emerald-500" />
          Histórico
        </h2>
        <div className="flex gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 active:scale-95 transition-all text-sm font-bold"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
          <button
            onClick={exportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-xl hover:bg-emerald-200 dark:hover:bg-emerald-500/20 active:scale-95 transition-all text-sm font-bold"
          >
            <Download className="w-4 h-4" />
            Exportar PDF (7 dias)
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-4 sm:p-6 shadow-sm border border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevMonth} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 dark:text-white" />
          </button>
          <h3 className="font-bold text-lg dark:text-white">
            {monthNames[month]} {year}
          </h3>
          <button onClick={nextMonth} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
            <ChevronRight className="w-5 h-5 dark:text-white" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {days}
        </div>
      </div>

      {selectedDate && (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-4 sm:p-6 shadow-sm border border-zinc-100 dark:border-zinc-800">
          <h3 className="font-bold text-lg mb-4 dark:text-white">
            Resumo de {selectedDate.split('-').reverse().join('/')}
          </h3>
          
          {selectedData ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Calorias</p>
                  <p className="font-bold text-lg dark:text-white">
                    {(selectedData.meals || []).reduce((sum, m) => sum + (m.calories || 0), 0)} kcal
                  </p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Proteínas</p>
                  <p className="font-bold text-lg dark:text-white">
                    {(selectedData.meals || []).reduce((sum, m) => sum + (m.protein || 0), 0)}g
                  </p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Carboidratos</p>
                  <p className="font-bold text-lg dark:text-white">
                    {(selectedData.meals || []).reduce((sum, m) => sum + (m.carbs || 0), 0)}g
                  </p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Gorduras</p>
                  <p className="font-bold text-lg dark:text-white">
                    {(selectedData.meals || []).reduce((sum, m) => sum + (m.fats || 0), 0)}g
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-sm mb-2 text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Refeições</h4>
                {Array.isArray(selectedData.meals) && selectedData.meals.length > 0 ? (
                  <div className="space-y-2">
                    {selectedData.meals.map(meal => (
                      <div key={meal.id} className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl">
                        <span className="font-medium text-sm dark:text-white">{meal.name}</span>
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{meal.calories} kcal</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Nenhuma refeição registrada.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-zinc-500 dark:text-zinc-400 text-center py-8">
              Nenhum dado registrado para esta data.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
