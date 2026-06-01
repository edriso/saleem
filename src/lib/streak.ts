import type { AppState } from '@/types/domain';
import { todayKey } from './date';

/*
 * Habit-streak logic. Marking a habit increments its day-count once per local
 * day; marking the same habit again the same day is a no-op. Each habit tracks
 * its own count and last-marked day, so switching the focus habit never loses
 * progress. Pure and kept out of components.
 */
export function markHabit(state: AppState, habitId: string, now: Date = new Date()): AppState {
  const key = todayKey(now);
  if (state.lastHabitDay[habitId] === key) {
    return state;
  }
  return {
    ...state,
    habitDays: { ...state.habitDays, [habitId]: (state.habitDays[habitId] ?? 0) + 1 },
    lastHabitDay: { ...state.lastHabitDay, [habitId]: key },
  };
}

/** True when the focus habit has already been marked for the given day. */
export function isHabitMarkedToday(
  state: AppState,
  habitId: string,
  now: Date = new Date(),
): boolean {
  return state.lastHabitDay[habitId] === todayKey(now);
}
