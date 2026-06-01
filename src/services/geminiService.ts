import { Meal, DailyData, UserProfile, PlannedMeal, Workout, Exercise, PlannedWorkout } from "../types";

// SECURITY: getApiKey() returns undefined intentionally.
// All AI calls must go through the Vercel server-side proxy (/api/openrouter-proxy).
// The OPENROUTER_API_KEY secret is kept exclusively on the server (no VITE_ prefix).
// See: /api/openrouter-proxy.ts and /docs/audit/final-audit.md section 5.
const getApiKey = () => undefined;
const getModel = () => (import.meta as any).env?.VITE_OPENROUTER_MODEL || process.env.VITE_OPENROUTER_MODEL || 'xiaomi/mimo-v2.5';

async function openRouterCompletion(payload: any) {
  // Always route through the proxy — no direct client-side API key.
  const url = '/api/openrouter-proxy';
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Authorization is handled server-side by the proxy; never added here.

  // Ensure model is set
  if (!payload.model) {
    payload.model = getModel();
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data;
}

export const geminiService = {
  async parseMealDescription(description: string): Promise<Omit<Meal, 'id' | 'timestamp'>> {
    const prompt = `Analise a seguinte descrição de refeição e extraia os valores nutricionais estimados (calorias, proteínas, carboidratos e gorduras). 
Descrição: "${description}"

Se a descrição for vaga, use valores médios padrão para porções normais. 
Responda APENAS com um objeto JSON válido no formato exato:
{
  "name": "Nome simplificado do alimento",
  "calories": 0,
  "protein": 0,
  "carbs": 0,
  "fats": 0
}`;

    const response = await openRouterCompletion({
      messages: [{ role: "user", content: prompt }]
    });

    try {
      let content = response.choices[0].message.content;
      // Strip markdown code blocks if any
      content = content.replace(/```json\n?|\n?```/gi, '').trim();
      return JSON.parse(content);
    } catch (e) {
      throw new Error("Falha ao processar descrição da IA");
    }
  },

  async analyzeImage(base64Image: string, mimeType: string): Promise<Omit<Meal, 'id' | 'timestamp'>> {
    const prompt = `Analise esta imagem. Identifique se é um prato de comida, um rótulo nutricional ou um código de barras. 
Se for um prato ou rótulo, extraia ou estime os valores nutricionais (calorias, proteínas, carboidratos e gorduras).
Se for um código de barras, tente ler o número e me dê os dados nutricionais.
Responda APENAS com um objeto JSON no formato exato: { "name": "Nome", "calories": 0, "protein": 0, "carbs": 0, "fats": 0 }`;

    const response = await openRouterCompletion({
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64Image}` } }
          ]
        }
      ]
    });

    try {
      let content = response.choices[0].message.content;
      content = content.replace(/```json\n?|\n?```/gi, '').trim();
      return JSON.parse(content);
    } catch (e) {
      throw new Error("Falha ao analisar imagem com IA");
    }
  },

  async analyzeGymEquipment(base64Image: string, mimeType: string, currentWorkout: string): Promise<{ name: string, description: string, canSubstitute: boolean, substitutionReason: string }> {
    const prompt = `Analise esta imagem de um equipamento de academia. 
1. Identifique o nome do equipamento.
2. Verifique se ele pode ser usado como substituto para o exercício atual: "${currentWorkout}".
3. Dê uma breve explicação.
Responda APENAS com um objeto JSON no formato exato: { "name": "Nome", "description": "Breve desc", "canSubstitute": true, "substitutionReason": "Razão" }`;

    const response = await openRouterCompletion({
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64Image}` } }
          ]
        }
      ]
    });

    try {
      let content = response.choices[0].message.content;
      content = content.replace(/```json\n?|\n?```/gi, '').trim();
      return JSON.parse(content);
    } catch (e) {
      throw new Error("Falha ao analisar equipamento com IA");
    }
  },

  async parseDietText(text: string): Promise<PlannedMeal[]> {
    const prompt = `Analise o seguinte texto que contém um plano de dieta e extraia as refeições planejadas para a semana.
Texto: "${text}"

Regras:
1. Identifique o dia da semana ('seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'). Se não for especificado, assuma 'seg' ou distribua logicamente.
2. Identifique o tipo de refeição ('cafe', 'almoco', 'lanche', 'jantar').
3. Extraia ou estime as calorias (kcal) e os macronutrientes (proteínas, carboidratos, gorduras) em gramas.
4. O nome deve ser um resumo curto do prato.

Responda APENAS com um array JSON válido contendo objetos neste formato exato (apenas o array JSON, sem marcação extra):
[
  {
    "name": "Nome da Refeição",
    "calories": 400,
    "protein": 30,
    "carbs": 40,
    "fats": 15,
    "day": "seg",
    "type": "cafe"
  }
]`;

    const response = await openRouterCompletion({
      messages: [{ role: "user", content: prompt }]
    });

    try {
      let content = response.choices[0].message.content;
      content = content.replace(/```json\n?|\n?```/gi, '').trim();
      const parsed = JSON.parse(content);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      throw new Error("Falha ao processar o texto da dieta com a IA");
    }
  },

  async generateDailyInsights(data: DailyData): Promise<string> {
    const totalCalories = data.meals.reduce((sum, meal) => sum + meal.calories, 0);
    const totalProtein = data.meals.reduce((sum, meal) => sum + meal.protein, 0);
    const waterPercentage = Math.round((data.waterMl / data.goals.water) * 100);

    const profileContext = data.profile ? `
Perfil do Usuário:
- Nome: ${data.profile.name}
- Objetivo: ${data.profile.goal === 'lose' ? 'Perder peso' : data.profile.goal === 'gain' ? 'Ganhar massa' : 'Manter peso'}
- Peso: ${data.profile.weight}kg, Altura: ${data.profile.height}cm, Idade: ${data.profile.age} anos
- Nível de Atividade: ${data.profile.activityLevel}
` : '';

    const prompt = `Atue como um coach nutricional pessoal. ${profileContext}
Dados de consumo de hoje:
- Calorias consumidas: ${totalCalories} / ${data.goals.calories}
- Proteína: ${totalProtein}g / ${data.goals.protein}g
- Água: ${waterPercentage}% da meta atingida

Dê um conselho curto (máximo 2 frases), motivador e prático para o restante do dia, chamando o usuário pelo nome se disponível.`;

    const response = await openRouterCompletion({
      messages: [{ role: "user", content: prompt }]
    });

    return response.choices[0].message.content || "Continue focado nos seus objetivos!";
  },

  async suggestRecipes(remaining: { calories: number, protein: number, carbs: number, fats: number }, profile?: UserProfile): Promise<any[]> {
    const profileContext = profile ? `
Contexto do Usuário:
- Nome: ${profile.name}
- Objetivo: ${profile.goal}
- Restrições/Preferências implícitas: Baseie-se no perfil (Peso: ${profile.weight}kg, Idade: ${profile.age})
` : '';

    const prompt = `Sugira 2 receitas rápidas e saudáveis. ${profileContext}
Macros restantes para o dia:
- Calorias: ${remaining.calories} kcal
- Proteína: ${remaining.protein}g
- Carboidratos: ${remaining.carbs}g
- Gorduras: ${remaining.fats}g

Responda APENAS com um array JSON de objetos no formato exato: 
[
  { "title": "Nome", "time": "15 min", "description": "Breve desc", "macros": "300 kcal | 20g P | 30g C | 10g G" }
]`;

    const response = await openRouterCompletion({
      messages: [{ role: "user", content: prompt }]
    });

    try {
      let content = response.choices[0].message.content;
      content = content.replace(/```json\n?|\n?```/gi, '').trim();
      return JSON.parse(content);
    } catch (e) {
      return [];
    }
  },

  async generateWeeklyDiet(currentData: DailyData) {
    const profile = currentData.profile;
    
    if (!profile) {
      throw new Error("Perfil não preenchido. Preencha seu perfil antes de gerar uma dieta.");
    }

    const recentMealsList: string[] = [];
    if (currentData.meals) {
      currentData.meals.forEach(m => recentMealsList.push(m.name));
    }
    
    if (currentData.history) {
      Object.values(currentData.history).forEach(day => {
        if (day.meals) {
          day.meals.forEach(m => recentMealsList.push(m.name));
        }
      });
    }
    
    const uniqueMeals = Array.from(new Set(recentMealsList)).slice(0, 20).join(', ');

    const habitsContext = uniqueMeals ? `
HÁBITOS ALIMENTARES RECENTES DO USUÁRIO:
O usuário tem consumido recentemente: ${uniqueMeals}.
Use essas informações para entender as preferências do usuário. Tente incluir alimentos semelhantes ou os mesmos alimentos (se saudáveis e adequados aos macros) na nova dieta, para que seja mais fácil de seguir e mais personalizada.
` : '';

    const prompt = `Você é um Nutricionista Digital.
Gere um cardápio ideal para UMA SEMANA COMPLETA (7 dias), com refeições variadas para cada dia (café da manhã, almoço, lanche, jantar), baseado no perfil do usuário.

DADOS DO PERFIL DO USUÁRIO:
- Nome: ${profile.name}
- Idade: ${profile.age} anos
- Peso: ${profile.weight} kg
- Altura: ${profile.height} cm
- Gênero: ${profile.gender === 'male' ? 'Masculino' : 'Feminino'}
- Nível de Atividade: ${profile.activityLevel}
- Objetivo: ${profile.goal === 'lose' ? 'Perder peso' : profile.goal === 'gain' ? 'Ganhar massa' : 'Manter peso'}
- Tipo de Dieta: ${profile.dietType || 'balanceada'}
- Restrições Alimentares: ${profile.dietaryRestrictions || 'Nenhuma'}

${habitsContext}

IMPORTANTE: A nova dieta deve substituir completamente qualquer dieta anterior.

Retorne APENAS um JSON válido contendo uma lista de TODAS as refeições da semana (4 refeições por dia x 7 dias = 28 refeições).
Use o seguinte formato exato para cada objeto no array:
[
  {
    "name": "Nome da refeição e alimentos",
    "calories": 300,
    "protein": 20,
    "carbs": 30,
    "fats": 10,
    "type": "cafe",
    "day": "seg"
  }
]
Os dias permitidos são apenas: 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'.
Os tipos permitidos são apenas: 'cafe', 'almoco', 'lanche', 'jantar'.
Não inclua nenhum texto adicional além do array JSON.`;

    const response = await openRouterCompletion({
      messages: [{ role: "user", content: prompt }]
    });

    const text = response.choices[0].message.content;
    if (!text) throw new Error("Falha ao gerar dieta");
    
    try {
      const content = text.replace(/```json\n?|\n?```/gi, '').trim();
      const meals = JSON.parse(content);
      return meals;
    } catch(e) {
      throw new Error("Formato de dieta inválido recebido da IA");
    }
  },

  async parseWorkoutText(text: string): Promise<{ workouts: Workout[], plannedWorkouts: PlannedWorkout[] }> {
    const prompt = `Analise o seguinte texto que contém um plano de treino e extraia os treinos e a programação semanal.
Texto: "${text}"

Regras:
1. Identifique os treinos individuais (ex: Treino A, Treino B, Treino de Peito, etc.).
2. Para cada treino, extraia a lista de exercícios com séries, repetições e notas.
3. Identifique em quais dias da semana cada treino deve ser realizado ('seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom').

Responda APENAS com um objeto JSON válido no seguinte formato exato (sem formatação extra ou blocos markdown):
{
  "workouts": [
    {
      "name": "Nome do Treino",
      "description": "Breve descrição",
      "type": "strength",
      "duration": 60,
      "exercises": [
        { "name": "Supino", "sets": 3, "reps": "12", "notes": "Carga moderada" }
      ]
    }
  ],
  "plannedWorkouts": [
    { "workoutName": "Nome do Treino", "day": "seg" }
  ]
}`;

    const response = await openRouterCompletion({
      messages: [{ role: "user", content: prompt }]
    });

    try {
      let content = response.choices[0].message.content;
      content = content.replace(/```json\n?|\n?```/gi, '').trim();
      const parsed = JSON.parse(content);
      
      const workouts = (parsed.workouts || []).map((w: any) => ({
        ...w,
        id: Math.random().toString(36).substring(2, 9),
        exercises: (w.exercises || []).map((e: any) => ({
          ...e,
          id: Math.random().toString(36).substring(2, 9)
        }))
      }));

      const plannedWorkouts = (parsed.plannedWorkouts || []).map((pw: any) => {
        const workout = workouts.find((w: any) => w.name === pw.workoutName);
        return {
          id: Math.random().toString(36).substring(2, 9),
          workoutId: workout ? workout.id : '',
          day: pw.day
        };
      }).filter((pw: any) => pw.workoutId);

      return { workouts, plannedWorkouts };
    } catch (e) {
      throw new Error("Falha ao processar o texto do treino com a IA");
    }
  },

  async generateWeeklyWorkoutPlan(currentData: DailyData, promptMsg: string): Promise<{ workouts: Workout[], plannedWorkouts: PlannedWorkout[] }> {
    const profile = currentData.profile;
    
    if (!profile) {
      throw new Error("Perfil não preenchido. Preencha seu perfil antes de gerar um treino.");
    }

    const fullPrompt = `Você é um Treinador de Elite (Personal Trainer).
Gere um plano de treino semanal completo baseado no pedido do usuário e no seu perfil físico.

PEDIDO DO USUÁRIO: "${promptMsg}"

DADOS DO PERFIL DO USUÁRIO:
- Nome: ${profile.name}
- Idade: ${profile.age} anos
- Peso: ${profile.weight} kg
- Altura: ${profile.height} cm
- Gênero: ${profile.gender === 'male' ? 'Masculino' : 'Feminino'}
- Nível de Atividade: ${profile.activityLevel}
- Objetivo: ${profile.goal === 'lose' ? 'Perder peso' : profile.goal === 'gain' ? 'Ganhar massa' : 'Manter peso'}
- Percentual de Gordura: ${profile.bodyFatPercentage || 'Não informado'}%
- Massa Muscular: ${profile.muscleMassPercentage || 'Não informado'}%

REGRAS IMPORTANTES:
1. Se o usuário pedir um split (ex: ABC, ABCD, Full Body 3x), você DEVE criar treinos DIFERENTES para cada letra/dia.
2. Não misture todos os exercícios em um único treino se o usuário pediu uma divisão.
3. Defina claramente qual treino (pelo nome) deve ser feito em cada dia da semana ('seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom').

Retorne APENAS um objeto JSON válido no formato exato:
{
  "workouts": [
    {
      "name": "Treino A - Peito e Tríceps",
      "description": "Foco em empurrar",
      "type": "strength",
      "duration": 60,
      "exercises": [
        { "name": "Supino Reto", "sets": 4, "reps": "10-12", "notes": "Descanso de 60s" }
      ]
    }
  ],
  "plannedWorkouts": [
    { "workoutName": "Treino A - Peito e Tríceps", "day": "seg" },
    { "workoutName": "Treino B - Costas e Bíceps", "day": "ter" }
  ]
}`;

    const response = await openRouterCompletion({
      messages: [{ role: "user", content: fullPrompt }]
    });

    try {
      let content = response.choices[0].message.content;
      content = content.replace(/```json\n?|\n?```/gi, '').trim();
      const parsed = JSON.parse(content);
      
      const workouts = (parsed.workouts || []).map((w: any) => ({
        ...w,
        id: Math.random().toString(36).substring(2, 9),
        exercises: (w.exercises || []).map((e: any) => ({
          ...e,
          id: Math.random().toString(36).substring(2, 9)
        }))
      }));

      const plannedWorkouts = (parsed.plannedWorkouts || []).map((pw: any) => {
        const workout = workouts.find((w: any) => w.name === pw.workoutName);
        return {
          id: Math.random().toString(36).substring(2, 9),
          workoutId: workout ? workout.id : '',
          day: pw.day
        };
      }).filter((pw: any) => pw.workoutId);

      return { workouts, plannedWorkouts };
    } catch (e) {
      throw new Error("Falha ao gerar plano de treino");
    }
  }
};
