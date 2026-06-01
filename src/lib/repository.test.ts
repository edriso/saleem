import { beforeEach, describe, expect, it } from 'vitest';
import { createLocalStorageRepository, type Repository } from './repository';

function memoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (key: string) => map.get(key) ?? null,
    key: (index: number) => Array.from(map.keys())[index] ?? null,
    removeItem: (key: string) => {
      map.delete(key);
    },
    setItem: (key: string, value: string) => {
      map.set(key, value);
    },
  } as Storage;
}

const NOW = new Date(2026, 2, 10, 12, 0, 0);

describe('localStorage repository', () => {
  let repo: Repository;
  let storage: Storage;

  beforeEach(() => {
    storage = memoryStorage();
    repo = createLocalStorageRepository(storage);
  });

  it('returns sensible defaults when nothing is stored', () => {
    const state = repo.getState(NOW);
    expect(state.version).toBe(1);
    expect(state.settings.lang).toBe('en');
    expect(state.settings.theme).toBe('dark');
    expect(state.settings.waterGoal).toBe(8);
    expect(state.app.focusHabit).toBe('sugar');
  });

  it('falls back to defaults on corrupt JSON', () => {
    storage.setItem('saleem-v1', 'not json at all');
    expect(repo.getState(NOW).settings.accent).toBe('#3fb27f');
  });

  it('falls back to defaults on a valid-JSON but wrong shape', () => {
    storage.setItem('saleem-v1', JSON.stringify({ version: 1 }));
    expect(repo.getState(NOW).settings.theme).toBe('dark');
  });

  it('rejects an out-of-range water goal as a wrong shape', () => {
    storage.setItem(
      'saleem-v1',
      JSON.stringify({
        version: 1,
        settings: { lang: 'ar', theme: 'light', accent: '#3a86c8', waterGoal: 99 },
        app: {
          water: 0,
          movedToday: false,
          focusHabit: 'water',
          habitDays: {},
          lastHabitDay: {},
          day: '2026-03-10',
        },
      }),
    );
    // Invalid waterGoal -> whole shape rejected -> defaults.
    expect(repo.getState(NOW).settings.waterGoal).toBe(8);
  });

  it('round-trips settings and app changes', () => {
    repo.setSettings({ lang: 'ar', accent: '#d9a23b' });
    const after = repo.getState(NOW);
    expect(after.settings.lang).toBe('ar');
    expect(after.settings.accent).toBe('#d9a23b');

    repo.setApp({ ...after.app, water: 4 });
    expect(repo.getState(NOW).app.water).toBe(4);
  });

  it('applies the daily rollover on read', () => {
    repo.setApp({
      water: 6,
      movedToday: true,
      focusHabit: 'sugar',
      habitDays: { sugar: 2 },
      lastHabitDay: { sugar: '2026-03-09' },
      day: '2026-03-09',
    });
    // Reading on a later day resets the daily counters but keeps habit progress.
    const next = repo.getState(NOW);
    expect(next.app.water).toBe(0);
    expect(next.app.movedToday).toBe(false);
    expect(next.app.habitDays.sugar).toBe(2);
  });
});
