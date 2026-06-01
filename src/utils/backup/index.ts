import { DailyData } from '../../types';
import { BackupV1Envelope } from './schema';

export function createBackupString(data: DailyData): string {
  const envelope: BackupV1Envelope = {
    version: 1,
    timestamp: new Date().toISOString(),
    data
  };
  
  return JSON.stringify(envelope, null, 2);
}

export { parseAndValidateBackup } from './validateBackup';
export type { ValidationResult } from './validateBackup';
export type { BackupEnvelope, BackupV1Envelope } from './schema';
