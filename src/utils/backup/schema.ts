import { DailyData } from '../../types';

export interface BackupV1Envelope {
  version: 1;
  timestamp: string;
  data: DailyData;
}

export type BackupEnvelope = BackupV1Envelope;
