import { GoogleGenAI, Type, GenerateContentResponse, FunctionDeclaration } from "@google/genai";
import { Meal, DailyData, UserProfile, PlannedMeal, Workout, Exercise, PlannedWorkout } from "../types";

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

export const geminiService = {
  async parseMealDescription(description: string): Promise<Omit<Meal, 'id' | 'timestamp'>> {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise a seguinte descrição de refeição e extraia os valores nutricionais estimados (calorias, proteínas, carboidratos e gorduras). 
      Descrição: "${description}"
      
      Se a descrição for vaga, use valores médios padrão para porções normais. 
      Responda APENAS com o JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Nome simplificado do alimento" },
            calories: { type: Type.NUMBER, description: "Calorias totais em kcal" },
            protein: { type: Type.NUMBER, description: "Proteínas totais em gramas" },
            carbs: { type: Type.NUMBER, description: "Carboidratos totais em gramas" },
            fats: { type: Type.NUMBER, description: "Gorduras totais em gramas" },
          },
          required: ["name", "calories", "protein", "carbs", "fats"],
        },
      },
    });

    try {
      return JSON.parse(response.text || "{}");
    } catch (e) {
      throw new Error("Falha ao processar descrição da IA");
    }
  },

  async analyzeImage(base64Image: string, mimeType: string): Promise<Omit<Meal, 'id' | 'timestamp'>> {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType
          }
        },
        {
          text: `Analise esta imagem. Identifique se é um prato de comida, um rótulo nutricional ou um código de barras. 
          Se for um prato ou rótulo, extraia ou estime os valores nutricionais (calorias, proteínas, carboidratos e gorduras).
          Se for um código de barras, tente ler o número e me dê os dados nutricionais.
          Responda APENAS com o JSON no formato: { "name": string, "calories": number, "protein": number, "carbs": number, "fats": number }`
        }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    try {
      return JSON.parse(response.text || "{}");
    } catch (e) {
      throw new Error("Falha ao analisar imagem com IA");
    }
  },

  async analyzeGymEquipment(base64Image: string, mimeType: string, currentWorkout: string): Promise<{ name: string, description: string, canSubstitute: boolean, substitutionReason: string }> {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType
          }
        },
        {
          text: `Analise esta imagem de um equipamento de academia. 
          1. Identifique o nome do equipamento.
          2. Verifique se ele pode ser usado como substituto para o exercício atual: "${currentWorkout}".
          3. Dê uma breve explicação.
          Responda APENAS com o JSON no formato: { "name": string, "description": string, "canSubstitute": boolean, "substitutionReason": string }`
        }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    try {
      return JSON.parse(response.text || "{}");
    } catch (e) {
      throw new Error("Falha ao analisar equipamento com IA");
    }
  },

  async parseDietText(text: string): Promise<PlannedMeal[]> {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise o seguinte texto que contém um plano de dieta e extraia as refeições planejadas para a semana.
      Texto: "${text}"
      
      Regras:
      1. Identifique o dia da semana ('seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'). Se não for especificado, assuma 'seg' ou distribua logicamente.
      2. Identifique o tipo de refeição ('cafe', 'almoco', 'lanche', 'jantar').
      3. Extraia ou estime as calorias (kcal) e os macronutrientes (proteínas, carboidratos, gorduras) em gramas.
      4. O nome deve ser um resumo curto do prato.
      
      Responda APENAS com um array JSON de objetos, onde cada objeto tem o seguinte formato:
      {
        "name": "Nome da Refeição",
        "calories": 400,
        "protein": 30,
        "carbs": 40,
        "fats": 15,
        "day": "seg",
        "type": "cafe"
      }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              calories: { type: Type.NUMBER },
              protein: { type: Type.NUMBER },
              carbs: { type: Type.NUMBER },
              fats: { type: Type.NUMBER },
              day: { type: Type.STRING, enum: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'] },
              type: { type: Type.STRING, enum: ['cafe', 'almoco', 'lanche', 'jantar'] },
            },
            required: ["name", "calories", "protein", "carbs", "fats", "day", "type"],
          }
        }
      }
    });

    try {
      const parsed = JSON.parse(response.text || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      throw new Error("Falha ao processar o texto da dieta com a IA");
    }
  },

  async generateDailyInsights(data: DailyData): Promise<string> {
    const ai = getAiClient();
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

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Atue como um coach nutricional pessoal. ${profileContext}
      Dados de consumo de hoje:
      - Calorias consumidas: ${totalCalories} / ${data.goals.calories}
      - Proteína: ${totalProtein}g / ${data.goals.protein}g
      - Água: ${waterPercentage}% da meta atingida
      
      Dê um conselho curto (máximo 2 frases), motivador e prático para o restante do dia, chamando o usuário pelo nome se disponível.`,
    });

    return response.text || "Continue focado nos seus objetivos!";
  },

  async suggestRecipes(remaining: { calories: number, protein: number, carbs: number, fats: number }, profile?: UserProfile): Promise<any[]> {
    const ai = getAiClient();
    const profileContext = profile ? `
      Contexto do Usuário:
      - Nome: ${profile.name}
      - Objetivo: ${profile.goal}
      - Restrições/Preferências implícitas: Baseie-se no perfil (Peso: ${profile.weight}kg, Idade: ${profile.age})
    ` : '';

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Sugira 2 receitas rápidas e saudáveis. ${profileContext}
      Macros restantes para o dia:
      - Calorias: ${remaining.calories} kcal
      - Proteína: ${remaining.protein}g
      - Carboidratos: ${remaining.carbs}g
      - Gorduras: ${remaining.fats}g
      
      Responda APENAS com um array JSON de objetos: { "title": string, "time": string, "description": string, "macros": string }`,
      config: {
        responseMimeType: "application/json"
      }
    });

    try {
      return JSON.parse(response.text || "[]");
    } catch (e) {
      return [];
    }
  },

  async scanNutritionalLabel(base64Image: string, mimeType: string): Promise<Omit<Meal, 'id' | 'timestamp'>> {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType
          }
        },
        {
          text: "Extraia os dados nutricionais desta tabela/rótulo. Foque nos valores por porção. Responda APENAS com o JSON: { \"name\": string, \"calories\": number, \"protein\": number, \"carbs\": number, \"fats\": number }"
        }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    try {
      return JSON.parse(response.text || "{}");
    } catch (e) {
      throw new Error("Falha ao ler rótulo com IA");
    }
  },

  async chatWithNutritionist(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[], currentData: DailyData): Promise<AsyncGenerator<GenerateContentResponse>> {
    const ai = getAiClient();
    const totalCalories = currentData.meals.reduce((sum, meal) => sum + meal.calories, 0);
    const totalProtein = currentData.meals.reduce((sum, meal) => sum + meal.protein, 0);
    
    const profile = currentData.profile;
    const profileInfo = profile ? `
      DADOS DO PERFIL DO USUÁRIO (OBRIGATÓRIO USAR PARA MONTAR DIETAS):
      - Nome: ${profile.name}
      - Idade: ${profile.age} anos
      - Peso: ${profile.weight} kg
      - Altura: ${profile.height} cm
      - Gênero: ${profile.gender === 'male' ? 'Masculino' : 'Feminino'}
      - Nível de Atividade: ${profile.activityLevel}
      - Objetivo: ${profile.goal === 'lose' ? 'Perder peso' : profile.goal === 'gain' ? 'Ganhar massa' : 'Manter peso'}
      - Tipo de Dieta: ${profile.dietType || 'balanceada'}
      - Restrições Alimentares: ${profile.dietaryRestrictions || 'Nenhuma'}
    ` : 'ATENÇÃO: Perfil não preenchido. Peça para o usuário preencher na aba "Perfil" antes de montar qualquer dieta.';

    const plannerFunction: FunctionDeclaration = {
      name: "updateWeeklyPlanner",
      description: "Atualiza o planejador semanal com novas refeições sugeridas. Use isso quando o usuário pedir para montar um plano ou dieta para a semana ou para dias específicos.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          meals: {
            type: Type.ARRAY,
            description: "Lista de refeições planejadas",
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Nome da refeição" },
                calories: { type: Type.NUMBER, description: "Calorias" },
                protein: { type: Type.NUMBER, description: "Proteínas (g)" },
                carbs: { type: Type.NUMBER, description: "Carboidratos (g)" },
                fats: { type: Type.NUMBER, description: "Gorduras (g)" },
                day: { type: Type.STRING, description: "Dia da semana (seg, ter, qua, qui, sex, sab, dom)" },
                type: { type: Type.STRING, description: "Tipo da refeição (cafe, almoco, lanche, jantar)" }
              },
              required: ["name", "calories", "protein", "carbs", "fats", "day", "type"]
            }
          }
        },
        required: ["meals"]
      }
    };

    const context = `
      Você é o Nutricionista Digital do NutriTrack, um especialista em nutrição clínica e esportiva.
      
      Suas capacidades:
      1. Analisar o consumo atual do usuário.
      2. Montar DIETAS e PLANOS ALIMENTARES personalizados (diários ou semanais).
      3. Sugerir substituições de alimentos.
      4. Calcular necessidades nutricionais com base nas metas do usuário.
      5. ATUALIZAR O PLANEJADOR SEMANAL do usuário diretamente usando a ferramenta 'updateWeeklyPlanner'.
      
      ${profileInfo}
      
      Dados do Usuário (Metas e Consumo de Hoje):
      - Metas Diárias: ${currentData.goals.calories}kcal (P:${currentData.goals.protein}g, C:${currentData.goals.carbs}g, G:${currentData.goals.fats}g)
      - Consumo Atual: ${totalCalories}kcal consumidas hoje.
      - Água: ${currentData.waterMl}ml / ${currentData.goals.water}ml
      - Histórico de hoje: ${currentData.meals.map(m => m.name).join(', ')}
      
      Diretrizes:
      - OBRIGATÓRIO: Você DEVE consultar os DADOS DO PERFIL DO USUÁRIO (idade, peso, altura, objetivo, etc.) para calcular e montar qualquer dieta ou plano alimentar. Se o perfil não estiver preenchido, RECUSE-SE a montar a dieta e peça para o usuário preencher na aba "Perfil" primeiro.
      - Calcule e explique brevemente as necessidades calóricas baseadas no perfil antes de sugerir a dieta.
      - Seja conciso e direto. Não repita informações desnecessariamente.
      - Use o nome do usuário para tornar a conversa mais pessoal.
      - Ao montar dietas, use tabelas ou listas claras.
      - Sempre incentive o consumo de água.
      - Se o usuário pedir um plano ou dieta, você DEVE usar a ferramenta 'updateWeeklyPlanner' para salvar as refeições no sistema dele. 
      - Após usar a ferramenta, informe ao usuário que o plano já está disponível na aba "Plano" e que ele pode clicar em "Registrar" em cada refeição para adicioná-la ao histórico diário facilmente.
      - Se o usuário pedir para "colocar no planejador", use a ferramenta imediatamente.
      - NÃO liste as dietas que o usuário já salvou anteriormente, a menos que ele peça especificamente.
      - Se o usuário estiver confuso sobre como apagar a conversa, informe que há um ícone de lixeira no topo da janela do chat.
    `;

    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: context,
        tools: [{ functionDeclarations: [plannerFunction] }]
      },
      history: history,
    });

    return chat.sendMessageStream({ message });
  },

  async generateWeeklyDiet(currentData: DailyData) {
    const ai = getAiClient();
    const profile = currentData.profile;
    
    if (!profile) {
      throw new Error("Perfil não preenchido. Preencha seu perfil antes de gerar uma dieta.");
    }

    // Extract recent meals to understand habits
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
    
    // Get unique meal names to avoid a massive string
    const uniqueMeals = Array.from(new Set(recentMealsList)).slice(0, 20).join(', ');

    const habitsContext = uniqueMeals ? `
      HÁBITOS ALIMENTARES RECENTES DO USUÁRIO:
      O usuário tem consumido recentemente: ${uniqueMeals}.
      Use essas informações para entender as preferências do usuário. Tente incluir alimentos semelhantes ou os mesmos alimentos (se saudáveis e adequados aos macros) na nova dieta, para que seja mais fácil de seguir e mais personalizada.
    ` : '';

    const prompt = `
      Você é um Nutricionista Digital.
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
      Para cada refeição, especifique o dia da semana usando exatamente um destes valores: 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Nome da refeição e alimentos" },
              calories: { type: Type.NUMBER, description: "Calorias totais" },
              protein: { type: Type.NUMBER, description: "Proteínas em gramas" },
              carbs: { type: Type.NUMBER, description: "Carboidratos em gramas" },
              fats: { type: Type.NUMBER, description: "Gorduras em gramas" },
              type: { type: Type.STRING, description: "Deve ser exatamente 'cafe', 'almoco', 'lanche', ou 'jantar'" },
              day: { type: Type.STRING, description: "Deve ser exatamente 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', ou 'sab'" }
            },
            required: ["name", "calories", "protein", "carbs", "fats", "type", "day"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Falha ao gerar dieta");
    
    const meals = JSON.parse(text);
    return meals;
  },

  async parseWorkoutText(text: string): Promise<{ workouts: Workout[], plannedWorkouts: PlannedWorkout[] }> {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise o seguinte texto que contém um plano de treino e extraia os treinos e a programação semanal.
      Texto: "${text}"
      
      Regras:
      1. Identifique os treinos individuais (ex: Treino A, Treino B, Treino de Peito, etc.).
      2. Para cada treino, extraia a lista de exercícios com séries, repetições e notas.
      3. Identifique em quais dias da semana cada treino deve ser realizado ('seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom').
      
      Responda APENAS com um objeto JSON no seguinte formato:
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
      }`,
      config: {
        responseMimeType: "application/json"
      }
    });

    try {
      const parsed = JSON.parse(response.text || "{}");
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

  async generateWeeklyWorkoutPlan(currentData: DailyData, prompt: string): Promise<{ workouts: Workout[], plannedWorkouts: PlannedWorkout[] }> {
    const ai = getAiClient();
    const profile = currentData.profile;
    
    if (!profile) {
      throw new Error("Perfil não preenchido. Preencha seu perfil antes de gerar um treino.");
    }

    const fullPrompt = `
      Você é um Treinador de Elite (Personal Trainer).
      Gere um plano de treino semanal completo baseado no pedido do usuário e no seu perfil físico.
      
      PEDIDO DO USUÁRIO: "${prompt}"
      
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
      
      Retorne APENAS um JSON no formato:
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
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    try {
      const parsed = JSON.parse(response.text || "{}");
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
  },

  async chatWithTrainer(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[], currentData: DailyData): Promise<AsyncGenerator<GenerateContentResponse>> {
    const ai = getAiClient();
    const profile = currentData.profile;
    const profileInfo = profile ? `
      DADOS DO PERFIL DO USUÁRIO:
      - Nome: ${profile.name}
      - Idade: ${profile.age} anos
      - Peso: ${profile.weight} kg
      - Altura: ${profile.height} cm
      - Gênero: ${profile.gender === 'male' ? 'Masculino' : 'Feminino'}
      - Nível de Atividade: ${profile.activityLevel}
      - Objetivo: ${profile.goal === 'lose' ? 'Perder peso' : profile.goal === 'gain' ? 'Ganhar massa' : 'Manter peso'}
    ` : 'Perfil não preenchido.';

    const workoutPlannerFunction: FunctionDeclaration = {
      name: "updateWorkoutPlanner",
      description: "Atualiza o planejador de treinos semanal com novos treinos sugeridos.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          workouts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['strength', 'cardio', 'flexibility', 'other'] },
                duration: { type: Type.NUMBER },
                exercises: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      sets: { type: Type.NUMBER },
                      reps: { type: Type.STRING },
                      notes: { type: Type.STRING }
                    },
                    required: ["name", "sets", "reps"]
                  }
                }
              },
              required: ["name", "exercises", "type"]
            }
          },
          plannedWorkouts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                workoutName: { type: Type.STRING },
                day: { type: Type.STRING, description: "seg, ter, qua, qui, sex, sab, dom" }
              },
              required: ["workoutName", "day"]
            }
          }
        },
        required: ["workouts", "plannedWorkouts"]
      }
    };

    const context = `
      Você é o Treinador Digital do NutriTrack, um especialista em musculação e performance.
      
      Suas capacidades:
      1. Montar PLANOS DE TREINO personalizados (ABC, ABCD, etc.).
      2. Sugerir exercícios e técnicas avançadas.
      3. ATUALIZAR O PLANEJADOR DE TREINOS do usuário usando a ferramenta 'updateWorkoutPlanner'.
      
      ${profileInfo}
      
      Diretrizes:
      - OBRIGATÓRIO: Use os dados do perfil para montar treinos adequados.
      - Se o usuário pedir um plano semanal, use a ferramenta 'updateWorkoutPlanner'.
      - Explique a lógica do treino antes de salvá-lo.
      - Após salvar, informe que o plano está na aba "Plano" dentro da seção de Treino.
    `;

    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: context,
        tools: [{ functionDeclarations: [workoutPlannerFunction] }]
      },
      history: history,
    });

    return chat.sendMessageStream({ message });
  }
};
