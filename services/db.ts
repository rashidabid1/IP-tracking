import { AccessRecord } from '../types';

const KEY = 'ip_track_logs_v1';

export function saveRecord(r: AccessRecord) {
  const arr = getRecords();
  arr.unshift(r);
  localStorage.setItem(KEY, JSON.stringify(arr));
}

export function getRecords(): AccessRecord[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function clearRecords() {
  localStorage.removeItem(KEY);
}
