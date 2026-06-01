import { create } from 'zustand';
import { repository } from '@/lib/repository';
import { markHabit } from '@/lib/streak';
import type { Accent, AppState, Lang, Settings, Theme } from '@/types/domain';

interface SaleemState {
  settings: Settings;
  app: AppState;
  // Settings actions.
  setLang: (lang: Lang) => void;
  setTheme: (theme: Theme) => void;
  setAccent: (accent: Accent) => void;
  setWaterGoal: (goal: number) => void;
  // Daily actions.
  addWater: () => void;
  completeWorkout: () => void;
  // Habit actions.
  setFocusHabit: (id: string) => void;
  markHabit: (id: string) => void;
}

const initial = repository.getState();

export const useSaleemStore = create<SaleemState>((set, get) => {
  function patchSettings(patch: Partial<Settings>): void {
    set({ settings: repository.setSettings(patch).settings });
  }

  function patchApp(next: AppState): void {
    set({ app: repository.setApp(next).app });
  }

  return {
    settings: initial.settings,
    app: initial.app,

    setLang: (lang) => patchSettings({ lang }),
    setTheme: (theme) => patchSettings({ theme }),
    setAccent: (accent) => patchSettings({ accent }),
    setWaterGoal: (waterGoal) => patchSettings({ waterGoal }),

    addWater: () => patchApp({ ...get().app, water: Math.min(get().app.water + 1, 20) }),
    completeWorkout: () => patchApp({ ...get().app, movedToday: true }),

    setFocusHabit: (id) => patchApp({ ...get().app, focusHabit: id }),
    markHabit: (id) => patchApp(markHabit(get().app, id)),
  };
});
