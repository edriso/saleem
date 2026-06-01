import { describe, expect, it } from 'vitest';
import { DISHES, FACTS, HABITS, PLATE, WORKOUTS } from '@/lib/content';
import { LANGS, type Localized } from '@/types/domain';
import { messages } from './messages';

/*
 * The app's signature guarantee: every user-facing string exists, non-empty, in
 * BOTH languages. A missing or blank translation in either the UI catalog or any
 * content item fails the build here, so the two languages can never drift.
 */

function assertComplete(label: string, entry: Localized) {
  for (const lang of LANGS) {
    const value = entry[lang];
    expect(typeof value, `${label} [${lang}] must be a string`).toBe('string');
    expect(value.trim().length, `${label} [${lang}] must not be empty`).toBeGreaterThan(0);
  }
}

describe('UI message catalog', () => {
  it('has a non-empty en and ar for every message id', () => {
    for (const [id, entry] of Object.entries(messages)) {
      assertComplete(`messages.${id}`, entry);
    }
  });
});

describe('content data', () => {
  it('has both languages on every plate tip', () => {
    PLATE.forEach((item) => assertComplete(`plate.${item.id}.tip`, item.tip));
  });

  it('has both languages on every dish field', () => {
    DISHES.forEach((dish) => {
      assertComplete(`dish.${dish.id}.name`, dish.name);
      assertComplete(`dish.${dish.id}.verdict`, dish.verdict);
      assertComplete(`dish.${dish.id}.swap`, dish.swap);
      assertComplete(`dish.${dish.id}.why`, dish.why);
    });
  });

  it('has both languages on every workout and move', () => {
    WORKOUTS.forEach((workout) => {
      assertComplete(`workout.${workout.id}.name`, workout.name);
      assertComplete(`workout.${workout.id}.blurb`, workout.blurb);
      workout.moves.forEach((move, index) =>
        assertComplete(`workout.${workout.id}.move[${index}]`, move.name),
      );
    });
  });

  it('has both languages on every habit', () => {
    HABITS.forEach((habit) => {
      assertComplete(`habit.${habit.id}.name`, habit.name);
      assertComplete(`habit.${habit.id}.why`, habit.why);
    });
  });

  it('has both languages on every fact', () => {
    FACTS.forEach((fact, index) => assertComplete(`fact[${index}]`, fact));
  });
});
