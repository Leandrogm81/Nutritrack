import { WEEKDAY_IDS } from '../constants/domain';

export function getTodayIsoDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function createId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Math.random().toString(36).slice(2)}${Date.now()}`;
}

export function getCurrentWeekdayId(): string {
  return WEEKDAY_IDS[new Date().getDay()];
}
