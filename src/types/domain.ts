import { z } from 'zod';

/** A string that exists in both app languages. All content carries one. */
export interface Localized {
  en: string;
  ar: string;
}

/** The two supported languages. `en` is LTR, `ar` (Egyptian Arabic) is RTL. */
export const LANGS = ['en', 'ar'] as const;
export const langSchema = z.enum(LANGS);
export type Lang = z.infer<typeof langSchema>;

export const THEMES = ['dark', 'light'] as const;
export const themeSchema = z.enum(THEMES);
export type Theme = z.infer<typeof themeSchema>;

/** Accent swatches. Green is the signature; the rest are offered alternatives. */
export const ACCENTS = ['#3fb27f', '#2e9e6a', '#3a86c8', '#d9a23b', '#c44f3d'] as const;
export const accentSchema = z.enum(ACCENTS);
export type Accent = z.infer<typeof accentSchema>;

/** Which hand measures a portion. */
export const HANDS = ['palm', 'fist', 'cupped', 'thumb'] as const;
export type Hand = (typeof HANDS)[number];

/** A tone tag on a dish: a champion, fine in portion, or worth watching. */
export const TONES = ['good', 'ok', 'watch'] as const;
export type Tone = (typeof TONES)[number];

// ---- Content types (typed bilingual constants, see lib/content.ts) --------

export interface PortionItem {
  id: string;
  /** The message id for the food-group name (protein / veg / carbs / fats). */
  key: 'protein' | 'veg' | 'carbs' | 'fats';
  hand: Hand;
  color: string;
  icon: string;
  tip: Localized;
}

export interface Dish {
  id: string;
  name: Localized;
  icon: string;
  tone: Tone;
  verdict: Localized;
  swap: Localized;
  why: Localized;
}

export interface WorkoutMove {
  name: Localized;
  secs: number;
  rest?: boolean;
}

export interface Workout {
  id: string;
  name: Localized;
  mins: number;
  rounds: number;
  blurb: Localized;
  moves: WorkoutMove[];
}

export interface Habit {
  id: string;
  icon: string;
  name: Localized;
  why: Localized;
}

// ---- Persisted state (validated with Zod) ---------------------------------

/** Language and look preferences. */
export const settingsSchema = z.object({
  lang: langSchema,
  theme: themeSchema,
  accent: accentSchema,
  waterGoal: z.number().int().min(4).max(12),
});
export type Settings = z.infer<typeof settingsSchema>;

/** Daily counters and habit progress. `day` is the local day key these belong to. */
export const appStateSchema = z.object({
  water: z.number().int().nonnegative(),
  movedToday: z.boolean(),
  focusHabit: z.string(),
  habitDays: z.record(z.string(), z.number().int().nonnegative()),
  lastHabitDay: z.record(z.string(), z.string()),
  day: z.string(),
});
export type AppState = z.infer<typeof appStateSchema>;

/** Everything we persist, wrapped with a version for safe future migrations. */
export const persistedStateSchema = z.object({
  version: z.literal(1),
  settings: settingsSchema,
  app: appStateSchema,
});
export type PersistedState = z.infer<typeof persistedStateSchema>;
