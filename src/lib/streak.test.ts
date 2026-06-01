import { describe, expect, it } from 'vitest';
import type { AppState } from '@/types/domain';
import { isHabitMarkedToday, markHabit } from './streak';

const NOW = new Date(2026, 2, 10, 12, 0, 0); // day key "2026-03-10"

function state(overrides: Partial<AppState> = {}): AppState {
  return {
    water: 0,
    movedToday: false,
    focusHabit: 'sugar',
    habitDays: {},
    lastHabitDay: {},
    day: '2026-03-10',
    ...overrides,
  };
}

describe('markHabit', () => {
  it('starts a count at 1 the first time a habit is marked', () => {
    const next = markHabit(state(), 'sugar', NOW);
    expect(next.habitDays.sugar).toBe(1);
    expect(next.lastHabitDay.sugar).toBe('2026-03-10');
  });

  it('does not increment twice on the same day', () => {
    const once = markHabit(state(), 'sugar', NOW);
    const twice = markHabit(once, 'sugar', NOW);
    expect(twice.habitDays.sugar).toBe(1);
    expect(twice).toBe(once); // no-op returns the same reference
  });

  it('increments again on a new day', () => {
    const day1 = markHabit(state(), 'sugar', NOW);
    const day2 = markHabit(day1, 'sugar', new Date(2026, 2, 11, 8, 0, 0));
    expect(day2.habitDays.sugar).toBe(2);
    expect(day2.lastHabitDay.sugar).toBe('2026-03-11');
  });

  it('tracks each habit independently when the focus switches', () => {
    const a = markHabit(state(), 'sugar', NOW);
    const b = markHabit(a, 'walk', NOW);
    expect(b.habitDays).toEqual({ sugar: 1, walk: 1 });
  });
});

describe('isHabitMarkedToday', () => {
  it('is false before marking and true after', () => {
    const before = state();
    expect(isHabitMarkedToday(before, 'sugar', NOW)).toBe(false);
    const after = markHabit(before, 'sugar', NOW);
    expect(isHabitMarkedToday(after, 'sugar', NOW)).toBe(true);
  });
});
