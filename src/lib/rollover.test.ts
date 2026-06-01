import { describe, expect, it } from 'vitest';
import type { AppState } from '@/types/domain';
import { rollover } from './rollover';

function state(overrides: Partial<AppState> = {}): AppState {
  return {
    water: 5,
    movedToday: true,
    focusHabit: 'sugar',
    habitDays: { sugar: 3 },
    lastHabitDay: { sugar: '2026-03-09' },
    day: '2026-03-10',
    ...overrides,
  };
}

describe('rollover', () => {
  it('keeps the state unchanged on the same day', () => {
    const now = new Date(2026, 2, 10, 9, 0, 0);
    expect(rollover(state(), now)).toEqual(state());
  });

  it('resets water and movedToday on a new day', () => {
    const now = new Date(2026, 2, 11, 0, 1, 0);
    const next = rollover(state(), now);
    expect(next.water).toBe(0);
    expect(next.movedToday).toBe(false);
    expect(next.day).toBe('2026-03-11');
  });

  it('preserves habit progress across the rollover', () => {
    const now = new Date(2026, 2, 11, 12, 0, 0);
    const next = rollover(state(), now);
    expect(next.habitDays).toEqual({ sugar: 3 });
    expect(next.lastHabitDay).toEqual({ sugar: '2026-03-09' });
    expect(next.focusHabit).toBe('sugar');
  });

  it('handles a month boundary', () => {
    const next = rollover(state({ day: '2026-01-31' }), new Date(2026, 1, 1, 8, 0, 0));
    expect(next.day).toBe('2026-02-01');
    expect(next.water).toBe(0);
  });

  it('handles a year boundary', () => {
    const next = rollover(state({ day: '2025-12-31' }), new Date(2026, 0, 1, 0, 30, 0));
    expect(next.day).toBe('2026-01-01');
    expect(next.movedToday).toBe(false);
  });
});
