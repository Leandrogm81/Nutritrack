import React, { useState } from 'react';
import { UserProfile, DailyData } from '../types';
import { User, Scale, Ruler, Calendar, Activity, Target, Save, CheckCircle2, Utensils, Download, Upload, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { createBackupString, parseAndValidateBackup } from '../utils/backup';

interface UserProfileFormProps {
  profile?: UserProfile;
  onSave: (profile: UserProfile, goals: DailyData['goals']) => void;
  fullData: DailyData;
  onImportData: (data: DailyData) => void;
}

export default function UserProfileForm({ profile, onSave, fullData, onImportData }: UserProfileFormProps) {
  const [formData, setFormData] = useState<UserProfile>(profile || {
    name: '',
    age: 30,
    weight: 70,
    height: 170,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintain',
    dietType: 'balanced',
    dietaryRestrictions: '',
    customMacros: { protein: 0, carbs: 0, fats: 0 }
  });

  const [saved, setSaved] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const calculateGoals = (p: UserProfile) => {
    const weight = p.weight || 70;
    const height = p.height || 170;
    const age = p.age || 30;

    // Mifflin-St Jeor Equation
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr = p.gender === 'male' ? bmr + 5 : bmr - 161;

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    const multiplier = activityMultipliers[p.activityLevel] || 1.2;
    let tdee = bmr * multiplier;

    if (p.goal === 'lose') tdee -= 500;
    if (p.goal === 'gain') tdee += 500;

    const calories = Math.max(1200, Math.round(tdee));
    
    // Macros
    let protein = 0;
    let fats = 0;
    let carbs = 0;

    if (p.dietType === 'custom' && p.customMacros) {
      protein = p.customMacros.protein || 0;
      carbs = p.customMacros.carbs || 0;
      fats = p.customMacros.fats || 0;
    } else {
      // Default: Balanced
      let proteinRatio = 0.3;
      let fatsRatio = 0.25;
      let carbsRatio = 0.45;

      if (p.dietType === 'low-carb') {
        proteinRatio = 0.4;
        fatsRatio = 0.4;
        carbsRatio = 0.2;
      } else if (p.dietType === 'ketogenic') {
        proteinRatio = 0.2;
        fatsRatio = 0.75;
        carbsRatio = 0.05;
      } else if (p.dietType === 'hypertrophy') {
        proteinRatio = 0.35;
        fatsRatio = 0.2;
        carbsRatio = 0.45;
      }

      protein = Math.round((calories * proteinRatio) / 4);
      fats = Math.round((calories * fatsRatio) / 9);
      carbs = Math.round((calories * carbsRatio) / 4);
    }

    return {
      calories: isNaN(calories) ? 2000 : calories,
      protein: isNaN(protein) ? 150 : protein,
      carbs: isNaN(carbs) ? 250 : carbs,
      fats: isNaN(fats) ? 65 : fats,
      water: isNaN(weight) ? 2500 : Math.round(weight * 35)
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure numeric values are valid
    const cleanData = {
      ...formData,
      age: isNaN(formData.age) ? 30 : formData.age,
      weight: isNaN(formData.weight) ? 70 : formData.weight,
      height: isNaN(formData.height) ? 170 : formData.height,
      customMacros: formData.customMacros ? {
        protein: isNaN(formData.customMacros.protein) ? 0 : formData.customMacros.protein,
        carbs: isNaN(formData.customMacros.carbs) ? 0 : formData.customMacros.carbs,
        fats: isNaN(formData.customMacros.fats) ? 0 : formData.customMacros.fats,
      } : undefined
    };

    const goals = calculateGoals(cleanData);
    onSave(cleanData, goals);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExport = () => {
    const dataStr = createBackupString(fullData);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `nutritrack_backup_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = parseAndValidateBackup(e.target?.result as string);
      
      if (result.success) {
        if (window.confirm('Isso irá substituir todos os seus dados atuais pelo backup. Deseja continuar?')) {
          onImportData(result.data);
          alert('Dados importados com sucesso!');
        }
      } else {
        alert(`Erro na importação do backup: ${(result as {success: false, error: string}).error}`);
      }
    };
    reader.readAsText(file);
    
    // Clear the input so the same file can be selected again
    event.target.value = '';
  };

  return (
    <div className="space-y-8 pb-32">
      <header>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Seu Perfil</h2>
        <p className="text-zinc-500 dark:text-zinc-400">Personalize suas metas com base no seu biotipo.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 border border-black/5 dark:border-white/5 shadow-sm space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                <User className="w-3 h-3" /> Nome Completo
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                placeholder="Seu nome"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                <Calendar className="w-3 h-3" /> Idade
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={e => setFormData({ ...formData, age: parseInt(e.target.value) })}
                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-8">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                <Scale className="w-3 h-3" /> Peso Atual (kg)
              </label>
              <input
                type="number"
                value={formData.weight}
                onChange={e => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                <Ruler className="w-3 h-3" /> Altura (cm)
              </label>
              <input
                type="number"
                value={formData.height}
                onChange={e => setFormData({ ...formData, height: parseInt(e.target.value) })}
                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                required
              />
            </div>
          </div>

          {/* Bioimpedance Section */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
            <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-6">Dados de Bioimpedância (Opcional)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  % Músculo
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.muscleMassPercentage || ''}
                  onChange={e => setFormData({ ...formData, muscleMassPercentage: parseFloat(e.target.value) || undefined })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                  placeholder="Ex: 35.5"
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  % Gordura
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.bodyFatPercentage || ''}
                  onChange={e => setFormData({ ...formData, bodyFatPercentage: parseFloat(e.target.value) || undefined })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                  placeholder="Ex: 18.2"
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  Gordura Visceral
                </label>
                <input
                  type="number"
                  value={formData.visceralFat || ''}
                  onChange={e => setFormData({ ...formData, visceralFat: parseInt(e.target.value) || undefined })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                  placeholder="Ex: 5"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Gênero Biológico</label>
            <div className="flex gap-4">
              {['male', 'female'].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: g as any })}
                  className={`flex-1 py-4 rounded-2xl font-bold transition-all border-2 ${
                    formData.gender === g 
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-500/20' 
                      : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
                  }`}
                >
                  {g === 'male' ? 'Masculino' : 'Feminino'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              <Activity className="w-3 h-3" /> Nível de Atividade Física
            </label>
            <div className="relative">
              <select
                value={formData.activityLevel}
                onChange={e => setFormData({ ...formData, activityLevel: e.target.value as any })}
                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white appearance-none cursor-pointer"
              >
                <option value="sedentary">Sedentário (Pouco ou nenhum exercício)</option>
                <option value="light">Leve (Exercício 1-3 dias/semana)</option>
                <option value="moderate">Moderado (Exercício 3-5 dias/semana)</option>
                <option value="active">Ativo (Exercício 6-7 dias/semana)</option>
                <option value="very_active">Muito Ativo (Atleta, trabalho físico)</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                <Save className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              <Target className="w-3 h-3" /> Seu Objetivo Principal
            </label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'lose', label: 'Perder Peso' },
                { id: 'maintain', label: 'Manter Peso' },
                { id: 'gain', label: 'Ganhar Massa' }
              ].map((obj) => (
                <button
                  key={obj.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, goal: obj.id as any })}
                  className={`py-4 rounded-2xl text-[10px] font-bold transition-all border-2 uppercase tracking-widest ${
                    formData.goal === obj.id 
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-500/20' 
                      : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
                  }`}
                >
                  {obj.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              <Utensils className="w-3 h-3" /> Tipo de Dieta
            </label>
            <div className="relative">
              <select
                value={formData.dietType || 'balanced'}
                onChange={e => setFormData({ ...formData, dietType: e.target.value as any })}
                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white appearance-none cursor-pointer"
              >
                <option value="balanced">Balanceada</option>
                <option value="low-carb">Low Carb</option>
                <option value="ketogenic">Cetogênica</option>
                <option value="hypertrophy">Hipertrofia</option>
                <option value="custom">Personalizada (Sugerir Macros)</option>
              </select>
            </div>
          </div>

          {formData.dietType === 'custom' && (
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  Proteína (g)
                </label>
                <input
                  type="number"
                  value={formData.customMacros?.protein || 0}
                  onChange={e => setFormData({ ...formData, customMacros: { ...formData.customMacros!, protein: parseInt(e.target.value) || 0 } })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  Carbo (g)
                </label>
                <input
                  type="number"
                  value={formData.customMacros?.carbs || 0}
                  onChange={e => setFormData({ ...formData, customMacros: { ...formData.customMacros!, carbs: parseInt(e.target.value) || 0 } })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  Gordura (g)
                </label>
                <input
                  type="number"
                  value={formData.customMacros?.fats || 0}
                  onChange={e => setFormData({ ...formData, customMacros: { ...formData.customMacros!, fats: parseInt(e.target.value) || 0 } })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white"
                />
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              Restrições ou Sugestões Alimentares
            </label>
            <textarea
              value={formData.dietaryRestrictions || ''}
              onChange={e => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
              className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-white resize-none h-24"
              placeholder="Ex: Sou vegano, não gosto de brócolis, alergia a amendoim..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-zinc-900 dark:bg-emerald-500 dark:text-white text-white font-bold py-6 rounded-[2rem] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-black/10 dark:shadow-emerald-500/20 text-lg uppercase tracking-widest"
        >
          {saved ? (
            <>
              <CheckCircle2 className="w-7 h-7 text-emerald-500 dark:text-white" />
              Perfil Atualizado!
            </>
          ) : (
            <>
              <Save className="w-7 h-7" />
              Calcular Minhas Metas
            </>
          )}
        </button>

        <div className="pt-12 border-t border-zinc-100 dark:border-zinc-800 mt-12 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Backup de Dados</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
              Exporte seus dados para um arquivo para salvá-los em outro lugar ou importe um backup anterior para recuperar seu histórico.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleExport}
                className="flex items-center justify-center gap-3 py-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl font-bold border border-emerald-100 dark:border-emerald-500/20 hover:bg-emerald-100 transition-all"
              >
                <Download className="w-5 h-5" />
                Exportar Backup
              </button>
              
              <label className="flex items-center justify-center gap-3 py-4 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 rounded-2xl font-bold border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 cursor-pointer transition-all">
                <Upload className="w-5 h-5" />
                Importar Backup
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={handleImport} 
                  className="hidden" 
                />
              </label>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Zona de Perigo</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
              Se o aplicativo estiver apresentando erros visuais ou travamentos, você pode resetar todos os dados locais. Isso apagará seu histórico e perfil permanentemente.
            </p>
            
            {!showResetConfirm ? (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="w-full py-4 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl font-bold border border-rose-100 dark:border-rose-500/20 hover:bg-rose-100 transition-all"
              >
                Limpar Todos os Dados e Resetar
              </button>
            ) : (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="p-4 bg-rose-50 dark:bg-rose-500/10 rounded-2xl border border-rose-100 dark:border-rose-500/20">
                  <p className="text-sm font-bold text-rose-600 dark:text-rose-400 text-center">
                    VOCÊ TEM CERTEZA? <br/>
                    <span className="font-normal opacity-80">Esta ação não pode ser desfeita.</span>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem('nutritrack_data');
                      window.location.reload();
                    }}
                    className="py-4 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20"
                  >
                    Sim, Apagar Tudo
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(false)}
                    className="py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-2xl font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-start gap-4 p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl border border-emerald-100 dark:border-emerald-500/20">
              <Shield className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">Privacidade Local e IA</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Seus dados de saúde ficam salvos apenas neste dispositivo. Apenas as descrições e as imagens que você envia explicitamente à Inteligência Artificial saem temporariamente do aparelho para processamento, mas nunca são armazenadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
