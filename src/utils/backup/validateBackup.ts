import { BackupEnvelope } from './schema';

export type ValidationResult = 
  | { success: true; data: BackupEnvelope['data'] }
  | { success: false; error: string };

export function parseAndValidateBackup(jsonString: string): ValidationResult {
  try {
    const parsed = JSON.parse(jsonString);

    if (!parsed || typeof parsed !== 'object') {
      return { success: false, error: 'Arquivo de backup corrompido ou formato inválido.' };
    }

    if (!('version' in parsed)) {
      return { success: false, error: 'Estrutura inválida. Nenhuma versão de backup encontrada.' };
    }

    if (parsed.version !== 1) {
      return { success: false, error: `Versão de backup não suportada (v${parsed.version}). Atualize o aplicativo se necessário.` };
    }

    if (!parsed.data || typeof parsed.data !== 'object') {
      return { success: false, error: 'Os dados do backup estão ausentes ou inválidos.' };
    }

    // Validação estrutural mínima
    const data = parsed.data;
    
    // Verificações essenciais para garantir que não vamos quebrar o App.tsx com dados completamente errados
    if (!Array.isArray(data.meals)) {
      return { success: false, error: 'Formato de refeições inválido no backup.' };
    }
    
    if (typeof data.waterMl !== 'number') {
      return { success: false, error: 'Formato de hidratação inválido no backup.' };
    }

    if (!data.goals || typeof data.goals !== 'object') {
      return { success: false, error: 'Metas diárias ausentes ou inválidas no backup.' };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'O arquivo selecionado não é um JSON válido.' };
  }
}
