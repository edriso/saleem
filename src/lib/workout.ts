import type { Workout, WorkoutMove } from '@/types/domain';

/*
 * Pure workout-sequence logic for the guided player. A workout's moves repeat
 * for `rounds` rounds; this expands them into one flat sequence and exposes the
 * pure transitions (advance / which round) the timer hook drives. No React or
 * timers in here, so the sequencing is unit-testable.
 */

export interface WorkoutStep extends WorkoutMove {
  /** 1-based round this step belongs to. */
  round: number;
}

/** Expands `moves × rounds` into the flat step sequence the player walks. */
export function buildSequence(workout: Workout): WorkoutStep[] {
  const steps: WorkoutStep[] = [];
  for (let round = 1; round <= workout.rounds; round += 1) {
    for (const move of workout.moves) {
      steps.push({ ...move, round });
    }
  }
  return steps;
}

/** True when `index` is the last step in the sequence. */
export function isLastStep(sequence: WorkoutStep[], index: number): boolean {
  return index >= sequence.length - 1;
}

/** Progress (0..1) elapsed within the current step, given seconds remaining. */
export function stepProgress(secs: number, secondsLeft: number): number {
  if (secs <= 0) return 1;
  const done = (secs - Math.max(secondsLeft, 0)) / secs;
  return Math.max(0, Math.min(1, done));
}
