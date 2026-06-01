import {
  type AppState,
  type PersistedState,
  persistedStateSchema,
  type Settings,
} from '@/types/domain';
import { todayKey } from './date';
import { rollover } from './rollover';

/*
 * The persistence seam. Components and the store never touch storage directly;
 * they go through this typed interface, backed by localStorage today (a
 * Dexie/IndexedDB version could slot in behind the same interface later).
 *
 * Persisted data is parsed with Zod, so a corrupt, partial, or out-of-date
 * shape safely falls back to sensible defaults instead of crashing. The daily
 * rollover is applied on read, so opening the app on a new day starts fresh.
 */

const STORAGE_KEY = 'saleem-v1';

export function createDefaultState(): PersistedState {
  return {
    version: 1,
    settings: {
      lang: 'en',
      theme: 'dark',
      accent: '#3fb27f',
      waterGoal: 8,
    },
    app: {
      water: 0,
      movedToday: false,
      focusHabit: 'sugar',
      habitDays: {},
      lastHabitDay: {},
      day: todayKey(),
    },
  };
}

export interface Repository {
  getState(now?: Date): PersistedState;
  saveState(state: PersistedState): void;
  setSettings(patch: Partial<Settings>): PersistedState;
  setApp(app: AppState): PersistedState;
  clear(): void;
}

export function createLocalStorageRepository(storage: Storage = localStorage): Repository {
  function read(): PersistedState {
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) {
        return createDefaultState();
      }
      const parsed = persistedStateSchema.safeParse(JSON.parse(raw));
      return parsed.success ? parsed.data : createDefaultState();
    } catch {
      return createDefaultState();
    }
  }

  function getState(now: Date = new Date()): PersistedState {
    const state = read();
    return { ...state, app: rollover(state.app, now) };
  }

  function saveState(state: PersistedState): void {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage can be unavailable (private mode, quota). The app still works
      // for this session; we just cannot persist.
    }
  }

  function setSettings(patch: Partial<Settings>): PersistedState {
    const current = read();
    const next: PersistedState = { ...current, settings: { ...current.settings, ...patch } };
    saveState(next);
    return next;
  }

  function setApp(app: AppState): PersistedState {
    const current = read();
    const next: PersistedState = { ...current, app };
    saveState(next);
    return next;
  }

  function clear(): void {
    try {
      storage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }
  }

  return { getState, saveState, setSettings, setApp, clear };
}

/** The app-wide repository instance, backed by the browser's localStorage. */
export const repository: Repository = createLocalStorageRepository();
