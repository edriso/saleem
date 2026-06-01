import { create } from 'zustand';
import type { Workout } from '@/types/domain';

/*
 * Ephemeral UI state that is not persisted: the open settings overlay and the
 * active workout in the player. Kept separate from the saved app state so a
 * reload never reopens an overlay.
 */
interface UiState {
  activeWorkout: Workout | null;
  settingsOpen: boolean;
  openWorkout: (workout: Workout) => void;
  closeWorkout: () => void;
  openSettings: () => void;
  closeSettings: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  activeWorkout: null,
  settingsOpen: false,
  openWorkout: (workout) => set({ activeWorkout: workout }),
  closeWorkout: () => set({ activeWorkout: null }),
  openSettings: () => set({ settingsOpen: true }),
  closeSettings: () => set({ settingsOpen: false }),
}));
