import type { AppState } from '@/types/domain';
import { todayKey } from './date';

/*
 * Daily rollover. The water and "moved today" counters belong to a single
 * calendar day; when the day changes they reset. Habit progress (habitDays /
 * lastHabitDay) is cumulative and is deliberately left untouched. Pure so the
 * month / year / midnight edges are easy to test.
 */
export function rollover(state: AppState, now: Date = new Date()): AppState {
  const key = todayKey(now);
  if (state.day === key) {
    return state;
  }
  return { ...state, day: key, water: 0, movedToday: false };
}
